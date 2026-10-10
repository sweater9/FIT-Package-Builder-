import { destinations, transferOptions } from './destinations.ts';

export type QuoteInput = {
  clientName?: string;
  destinationId: string;
  destinationName: string;
  nights: number;
  hotelId: number;
  hotel: { id: number; name: string; stars: number; nightly: number; room: string };
  experiencePrice: number;
  transferPrices: Record<string, number>;
  startDate: string;
  adults: number;
  children: number;
  infants: number;
  transfer: string;
  insurance: boolean;
  addOns: string[];
};

function record(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
function integer(value: unknown, min: number, max: number): boolean {
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= min && value <= max;
}
function price(value: unknown): boolean {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 1_000_000_000;
}
function text(value: unknown, max: number): boolean {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= max;
}
export function validTravelDate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const timestamp = Date.parse(`${value}T00:00:00Z`);
  return Number.isFinite(timestamp) && new Date(timestamp).toISOString().slice(0, 10) === value;
}
export function validQuoteInput(value: unknown): value is QuoteInput {
  if (!record(value)) return false;
  const destination = destinations.find(item => item.id === value.destinationId);
  if (!destination || value.destinationName !== `${destination.city}, ${destination.country}`) return false;
  if (value.clientName !== undefined && (typeof value.clientName !== 'string' || value.clientName.length > 200)) return false;
  if (!integer(value.nights, 2, 14) || !integer(value.adults, 1, 8) || !integer(value.children, 0, 6) || !integer(value.infants, 0, 4)) return false;
  if (!integer(value.hotelId, 1, Number.MAX_SAFE_INTEGER) || !record(value.hotel)) return false;
  const hotel = value.hotel;
  // Hotels and rates are intentionally editable; validate their snapshot rather
  // than restricting them to the starter catalogue.
  if (hotel.id !== value.hotelId || !text(hotel.name, 200) || !text(hotel.room, 200) || !integer(hotel.stars, 1, 5) || !price(hotel.nightly)) return false;
  if (!price(value.experiencePrice) || !record(value.transferPrices)) return false;
  const transferPrices = value.transferPrices;
  const transferIds = transferOptions.map(item => item.id);
  if (Object.keys(transferPrices).length !== transferIds.length || !transferIds.every(id => Object.hasOwn(transferPrices, id) && price(transferPrices[id]))) return false;
  if (typeof value.transfer !== 'string' || !transferIds.includes(value.transfer) || typeof value.insurance !== 'boolean' || !validTravelDate(value.startDate)) return false;
  if (!Array.isArray(value.addOns) || new Set(value.addOns).size !== value.addOns.length || !value.addOns.every(id => typeof id === 'string' && destination.highlights.some((_, index) => id === `experience-${index}`))) return false;
  return true;
}
export function calculateQuoteTotal(data: QuoteInput): number {
  const rooms = Math.max(1, Math.ceil((data.adults + data.children) / 2));
  const hotelTotal = data.hotel.nightly * data.nights * rooms;
  const experiences = data.addOns.length * Math.round(data.experiencePrice * (data.adults + data.children * 0.5));
  const transfers = data.transferPrices[data.transfer] * (data.adults + data.children);
  const insurance = data.insurance ? 25 * (data.adults + data.children + data.infants) * (data.nights + 1) : 0;
  return Math.round(hotelTotal + experiences + transfers + insurance - Math.round(hotelTotal * 0.1));
}
export function validQuoteRequest(body: unknown): body is { data: QuoteInput; total: number } {
  return record(body) && validQuoteInput(body.data) && typeof body.total === 'number' && Number.isFinite(body.total) && body.total >= 0 && Math.round(body.total) === calculateQuoteTotal(body.data);
}
