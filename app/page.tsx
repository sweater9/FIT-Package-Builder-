"use client";

import { useEffect, useMemo, useState } from "react";

import { destinations, transferOptions, type Hotel, type Destination } from "../lib/destinations";
import { validQuoteInput, calculateQuoteTotal, type QuoteInput } from "../lib/quote-input";
import { dateValue, addDays, longDate } from "../lib/travel-dates";
type QuoteData = QuoteInput & { clientName: string };

function money(value: number) {
  return new Intl.NumberFormat("en-AE", { style: "currency", currency: "AED", maximumFractionDigits: 0 }).format(value);
}

export default function Home() {
  const defaultDate = useMemo(() => {
    const value = new Date();
    value.setDate(value.getDate() + 30);
    return dateValue(value);
  }, []);
  const [destinationId, setDestinationId] = useState("dubai");
  const [clientName, setClientName] = useState("");
  const [destinationSearch, setDestinationSearch] = useState("");
  const [nights, setNights] = useState(5);
  const [hotelId, setHotelId] = useState(101);
  const [hotelCatalog, setHotelCatalog] = useState<Record<string, Hotel[]>>(() =>
    Object.fromEntries(destinations.map((item) => [item.id, item.hotels.map((hotel) => ({ ...hotel }))])),
  );
  const [experiencePrice, setExperiencePrice] = useState(180);
  const [transferPrices, setTransferPrices] = useState<Record<string, number>>(() =>
    Object.fromEntries(transferOptions.map((item) => [item.id, item.price])),
  );
  const [startDate, setStartDate] = useState(defaultDate);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [transfer, setTransfer] = useState("shared");
  const [insurance, setInsurance] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const [quoteReference, setQuoteReference] = useState("");
  const [saving, setSaving] = useState(false);

  const destination = destinations.find((item) => item.id === destinationId) ?? destinations[0];
  const availableHotels = hotelCatalog[destination.id] ?? destination.hotels;
  const hotel = availableHotels.find((item) => item.id === hotelId) ?? availableHotels[0];
  const rooms = Math.max(1, Math.ceil((adults + children) / 2));
  const chargedGuests = adults + children * 0.5;
  const hotelTotal = hotel.nightly * nights * rooms;
  const experienceTotal = selectedAddOns.length * Math.round(experiencePrice * chargedGuests);
  const transferPrice = transferPrices[transfer] ?? 0;
  const transferTotal = transferPrice * (adults + children);
  const insuranceTotal = insurance ? 25 * (adults + children + infants) * (nights + 1) : 0;
  const subtotal = hotelTotal + experienceTotal + transferTotal + insuranceTotal;
  const discount = Math.round(hotelTotal * 0.1);
  const total = subtotal - discount;
  const filteredDestinations = destinations.filter((item) =>
    `${item.city} ${item.country} ${item.region}`.toLowerCase().includes(destinationSearch.toLowerCase()),
  );
  const itinerary = Array.from({ length: nights + 1 }, (_, index) => {
    if (index === 0) return { day: 1, title: `Arrival in ${destination.city}`, period: "Arrival", description: "Airport welcome, transfer to the hotel and assisted check-in.", note: "Final pickup details are confirmed with the flight schedule." };
    if (index === nights) return { day: nights + 1, title: "Departure", period: "Departure", description: "Hotel check-out and transfer to the airport.", note: "Standard hotel check-out is usually before midday." };
    const highlight = destination.highlights[(index - 1) % destination.highlights.length];
    return { day: index + 1, ...highlight };
  });
  const quoteData: QuoteData = {
    clientName,
    destinationId,
    destinationName: `${destination.city}, ${destination.country}`,
    nights,
    hotelId: hotel.id,
    hotel,
    experiencePrice,
    transferPrices,
    startDate,
    adults,
    children,
    infants,
    transfer,
    insurance,
    addOns: selectedAddOns,
  };
  const proposalReference = quoteReference || `FIT-${destination.city.replace(/\s+/g, "").slice(0, 4).toUpperCase()}-${startDate.replaceAll("-", "")}`;
  const preparedFor = clientName.trim() || "Valued Client";
  const perAdult = Math.round(total / Math.max(1, adults));
  const selectedTransfer = transferOptions.find((item) => item.id === transfer) ?? transferOptions[0];

  useEffect(() => {
    function restore(data: Partial<QuoteData>) {
      if (!validQuoteInput(data)) throw new Error("Invalid saved quotation");
      const restoredDestination = destinations.find((item) => item.id === data.destinationId)!;
      setDestinationId(restoredDestination.id);
      setClientName(data.clientName ?? "");
      setNights(data.nights);
      setHotelCatalog((current) => ({
        ...current,
        [restoredDestination.id]: [data.hotel, ...(current[restoredDestination.id] ?? restoredDestination.hotels).filter(item => item.id !== data.hotel.id)],
      }));
      setHotelId(data.hotelId);
      setExperiencePrice(data.experiencePrice);
      setTransferPrices({ ...data.transferPrices });
      setStartDate(data.startDate);
      setAdults(data.adults);
      setChildren(data.children);
      setInfants(data.infants);
      setTransfer(data.transfer);
      setInsurance(data.insurance);
      setSelectedAddOns([...data.addOns]);
    }
    const params = new URLSearchParams(window.location.search);
    const proposal = params.get("proposal");
    if (proposal) {
      fetch(`/api/quotes/${encodeURIComponent(proposal)}`)
        .then(async (response) => { if (!response.ok) throw new Error(); return response.json(); })
        .then((quote) => { restore(quote.data); setQuoteReference(quote.quoteNumber); setNotice(`Quotation ${quote.quoteNumber} loaded.`); })
        .catch(() => setNotice("This saved quotation could not be loaded."));
    }
  }, []);

  function flash(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3200);
  }
  function chooseDestination(item: Destination) {
    setDestinationId(item.id);
    setHotelId((hotelCatalog[item.id] ?? item.hotels)[0].id);
    setSelectedAddOns([]);
    setQuoteReference("");
  }
  function toggleAddOn(id: string) {
    setSelectedAddOns((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }
  function updateHotel(id: number, field: keyof Omit<Hotel, "id">, value: string | number) {
    setHotelCatalog((current) => ({
      ...current,
      [destination.id]: availableHotels.map((item) => item.id === id ? { ...item, [field]: value } : item),
    }));
  }
  function addHotel() {
    const id = Date.now();
    const newHotel: Hotel = { id, name: "New hotel", stars: 4, nightly: 500, room: "Standard Room" };
    setHotelCatalog((current) => ({ ...current, [destination.id]: [...availableHotels, newHotel] }));
    setHotelId(id);
  }
  function removeHotel(id: number) {
    if (availableHotels.length === 1) return;
    const remaining = availableHotels.filter((item) => item.id !== id);
    setHotelCatalog((current) => ({ ...current, [destination.id]: remaining }));
    if (hotelId === id) setHotelId(remaining[0].id);
  }
  function printProposal() {
    if (!validQuoteInput(quoteData)) { flash("Check the destination, travel date, guests and prices before printing."); return; }
    const originalTitle = document.title;
    const safeClient = clientName.trim().replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "");
    document.title = `Global-Holidayz-${destination.city}-${safeClient || "Proposal"}`;
    window.print();
    window.setTimeout(() => { document.title = originalTitle; }, 500);
  }
  async function saveQuote() {
    if (!validQuoteInput(quoteData)) { flash("Check the destination, travel date, guests and prices before saving."); return null; }
    setSaving(true);
    try {
      const response = await fetch("/api/quotes", {
        method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ data: quoteData, total: calculateQuoteTotal(quoteData) }),
      });
      if (response.status === 401) {
        window.location.assign(`/signin-with-chatgpt?return_to=${encodeURIComponent("/")}`);
        return null;
      }
      if (!response.ok) {
        const failure = await response.json().catch(() => null);
        throw new Error(failure?.error || "The quotation could not be saved. Please try again.");
      }
      const saved = await response.json();
      setQuoteReference(saved.quoteNumber);
      flash(`Quotation ${saved.quoteNumber} saved permanently.`);
      return saved as { quoteNumber: string; publicToken: string };
    } catch (error) {
      flash(error instanceof Error ? error.message : "The quotation could not be saved. Please try again.");
      return null;
    } finally { setSaving(false); }
  }
  async function shareQuote() {
    const saved = await saveQuote();
    if (!saved) return;
    const url = new URL(window.location.href);
    url.search = "";
    url.searchParams.set("proposal", saved.publicToken);
    try { await navigator.clipboard.writeText(url.toString()); flash("Permanent proposal link copied."); }
    catch { window.prompt("Copy this quotation link:", url.toString()); }
  }

  return (
    <>
      <header className="topbar">
        <div className="brand"><span className="brand-mark">GH</span><span><strong>Global Holidayz</strong><small>FIT Package Builder</small></span></div>
        <div className="topbar-actions"><a href="/quotes">Saved quotations</a><div className="trip-chip">{destination.city}, {destination.country}</div></div>
      </header>
      {notice && <div className="notice" role="status">{notice}</div>}

      <main className="layout">
        <div className="content">
          <section className="destination-panel">
            <div className="destination-title">
              <div><span className="eyebrow">Build a trip</span><h1>Where would your client like to go?</h1></div>
              <label className="destination-search"><span>Search destinations</span><input value={destinationSearch} onChange={(event) => setDestinationSearch(event.target.value)} placeholder="City, country or region" /></label>
            </div>
            <div className="destination-list">
              {filteredDestinations.map((item) => (
                <button className={item.id === destinationId ? "destination-pill active" : "destination-pill"} key={item.id} onClick={() => chooseDestination(item)}>
                  <strong>{item.city}</strong><small>{item.country} · {item.region}</small>
                </button>
              ))}
              {filteredDestinations.length === 0 && <p className="no-results">No matching destination yet.</p>}
            </div>
          </section>

          <section className="hero">
            <img src={destination.image} alt={`${destination.city}, ${destination.country}`} />
            <div className="hero-shade" />
            <div className="hero-copy"><span>Customisable package</span><h2>{destination.city}</h2><p>{nights} nights / {nights + 1} days · {destination.tagline}</p></div>
          </section>

          <section className="card">
            <div className="card-heading"><div><span className="eyebrow">Travel plan</span><h2>Trip details</h2></div><span className="status">{nights} nights</span></div>
            <div className="duration-control">
              <div><strong>Package duration</strong><small>Automatically rebuilds the day-by-day itinerary</small></div>
              <div className="stepper"><button aria-label="Reduce nights" onClick={() => setNights((value) => Math.max(2, value - 1))}>−</button><span><b>{nights}</b> nights</span><button aria-label="Add nights" onClick={() => setNights((value) => Math.min(14, value + 1))}>+</button></div>
            </div>
            <div className="form-grid">
              <label className="client-field">Prepared for / client name<input value={clientName} onChange={(event) => setClientName(event.target.value)} placeholder="Enter client name" /></label>
              <label>Check-in<input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} /></label>
              <label>Check-out<input type="date" value={addDays(startDate, nights)} readOnly /></label>
              <label>Adults<select value={adults} onChange={(event) => setAdults(Number(event.target.value))}>{[1,2,3,4,5,6,7,8].map((value) => <option key={value}>{value}</option>)}</select></label>
              <label>Children<select value={children} onChange={(event) => setChildren(Number(event.target.value))}>{[0,1,2,3,4,5,6].map((value) => <option key={value}>{value}</option>)}</select></label>
              <label>Infants<select value={infants} onChange={(event) => setInfants(Number(event.target.value))}>{[0,1,2,3,4].map((value) => <option key={value}>{value}</option>)}</select></label>
              <label>Rooms<input value={rooms} readOnly /></label>
            </div>
          </section>

          <section className="card">
            <div className="card-heading"><div><span className="eyebrow">Accommodation</span><h2>Edit hotels & room rates</h2></div><button className="add-hotel" onClick={addHotel}>+ Add hotel</button></div>
            <div className="hotel-selected">
              <div className="hotel-placeholder"><span>{destination.city}</span><b>{hotel.stars}★</b></div>
              <div><div className="stars">{"★".repeat(hotel.stars)}<span>{"☆".repeat(5 - hotel.stars)}</span></div><h3>{hotel.name}</h3><p>{hotel.room} · Breakfast included</p><strong>{money(hotel.nightly)} <small>per room/night</small></strong></div>
            </div>
            <div className="hotel-editor">
              {availableHotels.map((item) => (
                <div className={item.id === hotel.id ? "hotel-edit-row active" : "hotel-edit-row"} key={item.id}>
                  <button className="hotel-select" aria-label={`Select ${item.name}`} onClick={() => setHotelId(item.id)}>{item.id === hotel.id ? "✓" : "○"}</button>
                  <label>Hotel name<input value={item.name} onChange={(event) => updateHotel(item.id, "name", event.target.value)} /></label>
                  <label>Room type<input value={item.room} onChange={(event) => updateHotel(item.id, "room", event.target.value)} /></label>
                  <label>Stars<select value={item.stars} onChange={(event) => updateHotel(item.id, "stars", Number(event.target.value))}>{[1,2,3,4,5].map((star) => <option key={star} value={star}>{star}★</option>)}</select></label>
                  <label>Nightly AED<input type="number" min="0" step="10" value={item.nightly} onChange={(event) => updateHotel(item.id, "nightly", Math.max(0, Number(event.target.value)))} /></label>
                  <button className="remove-hotel" disabled={availableHotels.length === 1} aria-label={`Remove ${item.name}`} onClick={() => removeHotel(item.id)}>×</button>
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <div className="card-heading"><div><span className="eyebrow">Transport</span><h2>Transfers</h2></div></div>
            <div className="choice-list">
              {transferOptions.map((item) => <label className={transfer === item.id ? "choice selected" : "choice"} key={item.id}><input type="radio" name="transfer" checked={transfer === item.id} onChange={() => setTransfer(item.id)} /><span><strong>{item.name}</strong><small>{transferPrices[item.id] ? `+ ${money(transferPrices[item.id])} per traveller` : "Included"}</small></span></label>)}
            </div>
            <div className="price-editor-grid">
              {transferOptions.map((item) => <label key={item.id}>{item.name}<span><b>AED</b><input type="number" min="0" step="10" value={transferPrices[item.id] ?? 0} onChange={(event) => setTransferPrices((current) => ({ ...current, [item.id]: Math.max(0, Number(event.target.value)) }))} /></span></label>)}
            </div>
          </section>

          <section className="card">
            <div className="card-heading"><div><span className="eyebrow">Experiences</span><h2>Optional add-ons</h2></div><label className="inline-price">Price per person <span><b>AED</b><input type="number" min="0" step="10" value={experiencePrice} onChange={(event) => setExperiencePrice(Math.max(0, Number(event.target.value)))} /></span></label></div>
            <div className="addons">
              {destination.highlights.map((item, index) => {
                const id = `experience-${index}`;
                return <label className={selectedAddOns.includes(id) ? "addon selected" : "addon"} key={id}><input type="checkbox" checked={selectedAddOns.includes(id)} onChange={() => toggleAddOn(id)} /><span><strong>{item.title}</strong><small>{item.period}</small></span><b>{money(experiencePrice)}</b></label>;
              })}
            </div>
            <label className="insurance"><input type="checkbox" checked={insurance} onChange={(event) => setInsurance(event.target.checked)} /><span><strong>Add travel insurance</strong><small>Medical, baggage and cancellation cover</small></span><b>AED 25/person/day</b></label>
          </section>

          <section className="card itinerary">
            <div className="card-heading"><div><span className="eyebrow">Journey</span><h2>{nights + 1}-day itinerary</h2></div><span className="status">Updates with duration</span></div>
            {itinerary.map((day) => (
              <article key={day.day}><div className="day-number">Day {day.day}</div><div><h3>{day.title}</h3><div className="activity"><span>{day.period}</span><p>{day.description}</p></div><div className="operation-note"><b>Operating note</b><span>{day.note}</span></div></div></article>
            ))}
          </section>

          <section className="card terms">
            <div className="card-heading"><div><span className="eyebrow">Important</span><h2>Terms & conditions</h2></div></div>
            <ul><li>Hotel rooms and services remain subject to availability until confirmation.</li><li>Local city or tourism taxes may be payable directly at the hotel.</li><li>Attraction schedules and operating days may change locally.</li><li>Final cancellation terms depend on the selected hotel and suppliers.</li><li>Final pricing is confirmed when the quotation is accepted and booked.</li></ul>
          </section>
        </div>

        <aside className="summary">
          <div className="summary-head"><span>Quotation summary</span><strong>{quoteReference || "Draft"}</strong></div>
          <div className="summary-body">
            <div className="route"><strong>{destination.city}, {destination.country}</strong><span>{startDate} – {addDays(startDate, nights)}</span><span>{nights} nights · {rooms} room(s) · {adults} adult(s) · {children} child(ren)</span></div>
            <dl><div><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div><div className="saving"><dt>Package discount</dt><dd>− {money(discount)}</dd></div><div><dt>Hotel</dt><dd>{money(hotelTotal)}</dd></div><div><dt>Experiences</dt><dd>{money(experienceTotal)}</dd></div><div><dt>Transfers</dt><dd>{money(transferTotal)}</dd></div>{insurance && <div><dt>Insurance</dt><dd>{money(insuranceTotal)}</dd></div>}</dl>
            <div className="total"><span>Total price</span><strong>{money(total)}</strong><small>Illustrative price in AED</small></div>
            <div className="actions"><button className="primary" disabled={saving} onClick={shareQuote}>{saving ? "Saving…" : "Publish & copy link"}</button><button className="secondary" disabled={saving} onClick={saveQuote}>{saving ? "Saving…" : "Save quotation"}</button><button className="ghost" onClick={printProposal}>Print / Save PDF</button></div>
          </div>
        </aside>
      </main>

      <div className="print-document" aria-hidden="true">
        <section className="print-page print-cover" style={{ backgroundImage: `url("${destination.image}")` }}>
          <div className="print-cover-overlay" />
          <div className="print-cover-content">
            <div className="print-cover-brand"><span>GH</span><strong>GLOBAL HOLIDAYZ</strong></div>
            <div className="print-cover-main">
              <p className="print-kicker">Bespoke travel proposal</p>
              <h1>Trip to {destination.city}</h1>
              <p className="print-reference">Reference Number: <strong>{proposalReference}</strong></p>
              <div className="print-cover-rule" />
              <ul>
                <li><b>●</b> {destination.city}, {destination.country} - {nights} nights</li>
                <li><b>●</b> {longDate(startDate)} - {nights} nights/{nights + 1} days</li>
                <li><b>●</b> {rooms} room(s), {adults} adult(s){children ? `, ${children} child(ren)` : ""}{infants ? `, ${infants} infant(s)` : ""}</li>
              </ul>
            </div>
            <p className="print-cover-by">Specially prepared by <strong>GLOBAL HOLIDAYZ</strong></p>
          </div>
        </section>

        <section className="print-page print-prepared">
          <div className="print-page-inner">
            <p className="print-kicker blue">Specially prepared for</p>
            <h1>{preparedFor}</h1>
            <div className="print-prepared-card">
              <div className="print-logo-large">GH</div>
              <div>
                <p>Specially prepared by</p>
                <h2>GLOBAL HOLIDAYZ</h2>
                <p>+971 58 554 8199</p>
                <p>info@globalholidayz.com</p>
              </div>
            </div>
            <div className="print-advisory">
              <strong>Important proposal information</strong>
              <p>This itinerary is a preliminary proposal prepared exclusively for {preparedFor}. Please review all dates, services, room details and traveller information carefully and advise us of any changes.</p>
              <p>No services are being held unless specifically confirmed. Hotels, activities, transfers and prices remain subject to availability and possible currency fluctuations until booking confirmation and payment.</p>
            </div>
          </div>
          <footer>Global Holidayz · {proposalReference}</footer>
        </section>

        <section className="print-page print-itinerary-overview">
          <div className="print-page-inner">
            <p className="print-kicker blue">Your journey at a glance</p>
            <h1>Itinerary</h1>
            <div className="print-table">
              <div className="print-table-head"><span>Date</span><span>Product</span><span>Description</span></div>
              {itinerary.map((day, index) => (
                <div className="print-table-row" key={`overview-${day.day}`}>
                  <div><strong>{longDate(addDays(startDate, index))}</strong></div>
                  <div>
                    <b>{index === 0 ? "Hotel & Transfer" : index === nights ? "Transfer" : "Activity"}</b>
                    <strong>{day.title}</strong>
                    {index === 0 && <small>{hotel.name} · {nights} nights</small>}
                  </div>
                  <div>
                    <p>{day.description}</p>
                    <span className="print-tag">{day.period}</span>
                    {(index === 0 || index === nights) && <span className="print-tag green">{selectedTransfer.name}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <footer>{longDate(startDate)} · Ref: {proposalReference}</footer>
        </section>

        <section className="print-page print-hotel-page">
          <header className="print-band"><h1>{destination.city}</h1><span>{nights} nights / {longDate(startDate)} - {longDate(addDays(startDate, nights))}</span></header>
          <div className="print-page-inner">
            <div className="print-hotel-layout">
              <div className="print-hotel-visual" style={{ backgroundImage: `url("${destination.image}")` }} />
              <div className="print-hotel-content">
                <div className="print-stars">{"★".repeat(hotel.stars)}{"☆".repeat(5 - hotel.stars)}</div>
                <h1>{hotel.name}</h1>
                <p>{destination.city}, {destination.country}</p>
                <div className="print-stay-dates">
                  <div><b>Check-in</b><span>{longDate(startDate)}</span></div>
                  <strong>{nights} nights</strong>
                  <div><b>Check-out</b><span>{longDate(addDays(startDate, nights))}</span></div>
                </div>
                <div className="print-info-box">
                  <h3>Accommodation details</h3>
                  <ul>
                    <li>{rooms} × {hotel.room}</li>
                    <li>Breakfast included</li>
                    <li>{hotel.stars}-star accommodation</li>
                    <li>Nightly room rate: {money(hotel.nightly)}</li>
                    <li>Hotel total: {money(hotelTotal)}</li>
                    <li>Room and bedding remain subject to confirmation</li>
                  </ul>
                </div>
                <div className="print-info-box pale">
                  <h3>What to know</h3>
                  <p>Standard check-in is generally from 15:00 and check-out before 12:00. Local city or tourism taxes may be payable directly to the hotel. Early check-in, late check-out, adjoining rooms and specific bedding are subject to availability.</p>
                </div>
              </div>
            </div>
          </div>
          <footer>{longDate(startDate)} · Ref: {proposalReference}</footer>
        </section>

        {itinerary.map((day, index) => (
          <section className="print-page print-day-page" key={`detail-${day.day}`}>
            <header className="print-band"><h1>Day {day.day} - {longDate(addDays(startDate, index))}</h1></header>
            <div className="print-day-image" style={{ backgroundImage: `url("${destination.image}")` }} />
            <div className="print-day-copy">
              <p className="print-kicker blue">{day.period}</p>
              <h1>{day.title}</h1>
              <p className="print-day-description">{day.description}</p>
              <div className="print-day-detail">
                <h3>Detailed programme</h3>
                <p>{index === 0
                  ? `Welcome to ${destination.city}. On arrival, meet the local representative and continue by ${selectedTransfer.name.toLowerCase()} to ${hotel.name}. Complete check-in and settle into your ${hotel.room.toLowerCase()}. The remainder of the day is planned at a comfortable pace.`
                  : index === nights
                    ? `After breakfast, check out from ${hotel.name}. Your ${selectedTransfer.name.toLowerCase()} will collect the travellers for the journey to the airport. Pickup will be coordinated against the confirmed flight schedule.`
                    : `${day.description} The programme is arranged as a ${day.period.toLowerCase()} experience and will be coordinated from ${hotel.name}. Final pickup timing, routing and inclusions will be reconfirmed before travel.`}
                </p>
              </div>
              <div className="print-operation-note"><b>Operating note</b><span>{day.note}</span></div>
              {index > 0 && index < nights && (
                <div className="print-inclusions">
                  <span>✓ Guided experience</span><span>✓ Local coordination</span>
                  {selectedAddOns.includes(`experience-${(index - 1) % destination.highlights.length}`) && <span>✓ Included in package price</span>}
                </div>
              )}
            </div>
            <footer>{destination.city} · Day {day.day} · Ref: {proposalReference}</footer>
          </section>
        ))}

        <section className="print-page print-pricing-page">
          <div className="print-pricing-pattern" />
          <div className="print-pricing-content">
            <p className="print-kicker blue">Your package investment</p>
            <h1>Pricing Summary</h1>
            <div className="print-price-lines">
              <div><span>Accommodation</span><strong>{money(hotelTotal)}</strong></div>
              <div><span>Experiences</span><strong>{money(experienceTotal)}</strong></div>
              <div><span>Transfers</span><strong>{money(transferTotal)}</strong></div>
              {insurance && <div><span>Travel insurance</span><strong>{money(insuranceTotal)}</strong></div>}
              <div><span>Package discount</span><strong>- {money(discount)}</strong></div>
              <div className="per-person"><span>Price per adult</span><strong>{money(perAdult)}</strong></div>
              <div className="grand-total"><span>Total Price<small>INCLUDING APPLICABLE TAXES</small></span><strong>{money(total)}</strong></div>
            </div>
            <p className="print-price-note">Price calculated for {adults} adult(s){children ? ` and ${children} child(ren)` : ""}, {rooms} room(s), for travel from {longDate(startDate)}. Price remains subject to availability until confirmed.</p>
          </div>
          <footer>{longDate(startDate)} · Ref: {proposalReference}</footer>
        </section>

        <section className="print-page print-terms-page">
          <header className="print-band"><h1>Terms and Conditions</h1></header>
          <div className="print-page-inner print-terms-columns">
            <div>
              <h3>Package inclusions</h3>
              <ul>
                <li>{nights} nights at {hotel.name}</li>
                <li>{rooms} × {hotel.room} with breakfast</li>
                <li>{selectedTransfer.name}</li>
                <li>{selectedAddOns.length ? `${selectedAddOns.length} selected experience(s)` : "Day-by-day itinerary and local coordination"}</li>
                {insurance && <li>Travel insurance as selected</li>}
              </ul>
              <h3>Exclusions</h3>
              <ul>
                <li>Flights, visas and passport costs unless explicitly included</li>
                <li>Local tourism or city taxes payable at the property</li>
                <li>Meals, drinks, tips and personal expenses not stated as included</li>
                <li>Optional upgrades, additional sightseeing and excess baggage</li>
                <li>Early check-in or late check-out unless confirmed in writing</li>
              </ul>
            </div>
            <div>
              <h3>Hotels, tours and transfers</h3>
              <ul>
                <li>All rooms and services remain subject to availability until confirmation.</li>
                <li>Shared transfers may include additional hotel pickup points and waiting time.</li>
                <li>Private transfers are point-to-point and do not place the vehicle at disposal.</li>
                <li>Pickup times and tour sequences may change because of traffic, weather or operational requirements.</li>
                <li>Guests must be ready in the hotel lobby before the advised pickup time.</li>
              </ul>
              <h3>Booking conditions</h3>
              <p>A deposit constitutes acceptance of the final confirmed itinerary, supplier conditions and cancellation policy. Global Holidayz acts as the travel organiser and coordinates services supplied by independent hotels, transport operators and activity providers.</p>
              <p>Schedules may be modified because of force majeure, weather, traffic, supplier changes, closures or government restrictions. Suitable alternatives will be offered whenever reasonably possible.</p>
            </div>
          </div>
          <footer>Prepared for {preparedFor} by Global Holidayz · Ref: {proposalReference}</footer>
        </section>
      </div>

      <div className="mobile-total"><span><small>{destination.city} total</small><strong>{money(total)}</strong></span><button onClick={shareQuote}>Share package</button></div>
    </>
  );
}
