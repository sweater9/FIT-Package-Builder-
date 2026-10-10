import test from 'node:test';
import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import { destinations } from '../lib/destinations.ts';
import { validQuoteInput, validQuoteRequest, validTravelDate, calculateQuoteTotal } from '../lib/quote-input.ts';

function input(destination = destinations[0]) {
  return {
    clientName: 'Sample client', destinationId: destination.id,
    destinationName: `${destination.city}, ${destination.country}`,
    nights: 5, hotelId: destination.hotels[0].id, hotel: { ...destination.hotels[0] },
    experiencePrice: 180, transferPrices: { shared: 0, private: 180, luxury: 420 },
    startDate: '2026-11-10', adults: 2, children: 0, infants: 0,
    transfer: 'shared', insurance: false, addOns: [],
  };
}
test('every supported destination passes with its own name and hotel', () => {
  assert.ok(destinations.length > 1);
  for (const destination of destinations) assert.equal(validQuoteInput(input(destination)), true, destination.id);
  const custom = input(); custom.hotel = { id: 999999, name: 'Custom hotel', room: 'Suite', stars: 5, nightly: 650 }; custom.hotelId = custom.hotel.id;
  assert.equal(validQuoteInput(custom), true);
});
test('rejects malformed bodies without throwing', () => {
  for (const value of [null, undefined, 7, 'quote', [], {}, { data: null }, { data: input(), total: '100' }]) {
    assert.equal(validQuoteRequest(value), false);
  }
});
test('checks destination identity, hotel snapshot and finite nonnegative prices', () => {
  for (const patch of [
    { destinationId: 'unknown' }, { destinationName: 'Different country' }, { hotelId: 0 },
    { hotel: null }, { hotel: [] }, { hotel: { ...input().hotel, id: 1234 } },
    { hotel: { ...input().hotel, name: '  ' } }, { hotel: { ...input().hotel, room: '' } },
    { hotel: { ...input().hotel, stars: 7 } }, { hotel: { ...input().hotel, nightly: -10 } },
    { experiencePrice: -1 }, { experiencePrice: Infinity }, { transferPrices: [] },
    { transferPrices: { shared: 0, private: -1, luxury: 420 } },
    { transferPrices: { shared: 0, private: 180 } }, { transfer: 'helicopter' },
    { clientName: 7 }, { insurance: 'yes' },
  ]) assert.equal(validQuoteInput({ ...input(), ...patch }), false, JSON.stringify(patch));
});
test('enforces guest and night ranges and rejects duplicate or unknown experiences', () => {
  for (const patch of [
    { nights: 1 }, { nights: 15 }, { nights: 2.5 }, { adults: 0 }, { adults: 9 },
    { children: -1 }, { children: 7 }, { infants: 5 }, { infants: 0.5 },
    { addOns: ['experience-0', 'experience-0'] }, { addOns: ['experience-999'] }, { addOns: [null] },
  ]) assert.equal(validQuoteInput({ ...input(), ...patch }), false);
  assert.equal(validQuoteInput({ ...input(), adults: 8, children: 6, infants: 4, nights: 14, addOns: ['experience-0'] }), true);
});
test('validates calendar dates rather than just YYYY-MM-DD shape', () => {
  for (const date of ['2026-02-30', '2026-02-29', '2026-13-01', '', 'not a date']) assert.equal(validTravelDate(date), false);
  assert.equal(validTravelDate('2028-02-29'), true);
  assert.equal(validQuoteInput({ ...input(), startDate: '2026-02-30' }), false);
});
test('computes total from editable rates and rejects tampered client totals', () => {
  const quote = { ...input(), hotel: { ...input().hotel, nightly: 100 }, adults: 2, children: 1, infants: 1, transfer: 'private', insurance: true, addOns: ['experience-0', 'experience-1'] };
  // Two rooms: 1000 - 100 discount; experiences 900; transfers 540; insurance 600.
  assert.equal(calculateQuoteTotal(quote), 2940);
  assert.equal(validQuoteRequest({ data: quote, total: 2940 }), true);
  for (const total of [-1, 1, Infinity, NaN, '2940']) assert.equal(validQuoteRequest({ data: quote, total }), false);
});
test('persistence and returned quotation use the selected destination and server total', async () => {
  const bindings = [];
  const db = { prepare: () => ({ bind(...values) { bindings.push(values); return this; }, async run() {} }) };
  globalThis.__quoteTestDB = db;
  const hooks = registerHooks({ resolve(specifier, context, next) {
    if (specifier === 'cloudflare:workers') return { url: 'data:text/javascript,export const env = { DB: globalThis.__quoteTestDB };', shortCircuit: true };
    return next(specifier, context);
  } });
  try {
    const { createQuote } = await import('../lib/quotes.ts');
    const data = input(destinations.at(-1));
    const saved = await createQuote('sample@example.test', data);
    assert.equal(saved.destination, data.destinationName);
    assert.equal(bindings[0][4], data.destinationName);
    assert.equal(saved.total, calculateQuoteTotal(data));
    assert.equal(bindings[0][6], saved.total);
    await assert.rejects(createQuote('sample@example.test', { ...data, adults: -1 }), /Invalid quotation/);
    assert.equal(bindings.length, 1);
  } finally { hooks.deregister(); delete globalThis.__quoteTestDB; }
});

test('travel dates remain calendar dates across timezones and invalid input stays renderable', async () => {
  const { addDays, longDate } = await import('../lib/travel-dates.ts');
  const prior = process.env.TZ;
  try {
    for (const zone of ['Asia/Dubai', 'Pacific/Kiritimati', 'America/Los_Angeles']) {
      process.env.TZ = zone;
      assert.equal(addDays('2028-02-28', 2), '2028-03-01');
      assert.equal(addDays('2026-12-31', 1), '2027-01-01');
      assert.equal(longDate('2026-11-10'), 'Tue, 10 Nov 2026');
      assert.equal(addDays('', 5), '');
      assert.equal(longDate('2026-02-30'), 'Choose a valid date');
    }
  } finally { if (prior === undefined) delete process.env.TZ; else process.env.TZ = prior; }
});
