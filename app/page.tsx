"use client";

import { useEffect, useMemo, useState } from "react";

type Hotel = { id: number; name: string; stars: number; nightly: number; room: string };
type Highlight = { title: string; description: string; period: string; note: string };
type Destination = {
  id: string;
  city: string;
  country: string;
  region: string;
  tagline: string;
  image: string;
  hotels: Hotel[];
  highlights: Highlight[];
};
type QuoteData = {
  destinationId: string;
  destinationName: string;
  nights: number;
  hotelId: number;
  hotel: Hotel;
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

const destinations: Destination[] = [
  {
    id: "dubai", city: "Dubai", country: "UAE", region: "Middle East",
    tagline: "Skyline, desert and Arabian hospitality",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=85",
    hotels: [
      { id: 101, name: "Citymax Hotel Bur Dubai", stars: 3, nightly: 368, room: "Standard Room, Double Bed" },
      { id: 102, name: "Novotel Bur Dubai", stars: 4, nightly: 552, room: "Executive Room, King Bed" },
      { id: 103, name: "JW Marriott Marquis Dubai", stars: 5, nightly: 740, room: "Deluxe Room, City View" },
    ],
    highlights: [
      { title: "Old & Modern Dubai", period: "Morning", description: "Guided city tour from Al Fahidi and the souks to Palm Jumeirah.", note: "Souks operate daily; some shops close during Friday prayer." },
      { title: "Desert Safari", period: "Afternoon", description: "Dune drive, camel experience and BBQ dinner with entertainment.", note: "Pickup typically 14:30–15:30; not recommended for infants." },
      { title: "Burj Khalifa & Dubai Mall", period: "Evening", description: "At The Top admission followed by the Dubai Fountain district.", note: "Timed ticket required; sunset slots carry a supplement." },
      { title: "Marina Dinner Cruise", period: "Evening", description: "Two-hour dhow cruise with buffet dinner and skyline views.", note: "Boarding usually begins 45 minutes before departure." },
    ],
  },
  {
    id: "bangkok", city: "Bangkok", country: "Thailand", region: "Asia",
    tagline: "Temples, markets and vibrant street life",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1600&q=85",
    hotels: [
      { id: 201, name: "Ibis Styles Bangkok Silom", stars: 3, nightly: 245, room: "Standard Room" },
      { id: 202, name: "Novotel Bangkok Sukhumvit 20", stars: 4, nightly: 390, room: "Superior Room" },
      { id: 203, name: "The Landmark Bangkok", stars: 5, nightly: 610, room: "Premium Room" },
    ],
    highlights: [
      { title: "Grand Palace & Wat Pho", period: "Morning", description: "Explore Bangkok’s royal landmarks with a local guide.", note: "Modest dress is mandatory; closes around 15:30." },
      { title: "Canal & Chinatown Tour", period: "Afternoon", description: "Long-tail boat ride followed by Yaowarat food discoveries.", note: "Boat operation depends on river conditions." },
      { title: "Ayutthaya Heritage Day", period: "Full day", description: "Visit the temples and ruins of Thailand’s former capital.", note: "Most temples open 08:00–18:00." },
      { title: "Floating Market", period: "Morning", description: "Colourful market visit with traditional paddleboat experience.", note: "Early departure recommended for lighter crowds." },
    ],
  },
  {
    id: "bali", city: "Bali", country: "Indonesia", region: "Asia",
    tagline: "Temples, rice terraces and tropical calm",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=85",
    hotels: [
      { id: 301, name: "FRii Bali Echo Beach", stars: 3, nightly: 210, room: "Deluxe Room" },
      { id: 302, name: "The Anvaya Beach Resort", stars: 4, nightly: 420, room: "Premier Room" },
      { id: 303, name: "The Kayon Jungle Resort", stars: 5, nightly: 860, room: "Jungle Suite" },
    ],
    highlights: [
      { title: "Ubud & Rice Terraces", period: "Full day", description: "Tegallalang landscapes, artisan villages and Ubud centre.", note: "Rice terrace paths can be slippery after rain." },
      { title: "Uluwatu Sunset", period: "Afternoon", description: "Clifftop temple visit and traditional Kecak performance.", note: "Temple opens daily; secure loose belongings from monkeys." },
      { title: "Nusa Penida", period: "Full day", description: "Fast-boat excursion to dramatic coastal viewpoints.", note: "Subject to sea conditions and an early departure." },
      { title: "Bali Wellness", period: "Morning", description: "Balinese massage and a relaxed beach afternoon.", note: "Advance spa reservation recommended." },
    ],
  },
  {
    id: "singapore", city: "Singapore", country: "Singapore", region: "Asia",
    tagline: "Garden city, food culture and futuristic design",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1600&q=85",
    hotels: [
      { id: 401, name: "Hotel Mi Bencoolen", stars: 3, nightly: 420, room: "Superior Room" },
      { id: 402, name: "Oasia Hotel Downtown", stars: 4, nightly: 650, room: "Deluxe Room" },
      { id: 403, name: "Marina Bay Sands", stars: 5, nightly: 1650, room: "Deluxe City View" },
    ],
    highlights: [
      { title: "Singapore City Highlights", period: "Morning", description: "Merlion Park, Civic District, Chinatown and Little India.", note: "Outdoor routing may change during heavy rain." },
      { title: "Gardens by the Bay", period: "Afternoon", description: "Cloud Forest, Flower Dome and evening Supertree show.", note: "Conservatories normally open daily 09:00–21:00." },
      { title: "Sentosa Island", period: "Full day", description: "Choose Universal Studios, beaches or island attractions.", note: "Attraction operating days vary; booking is essential." },
      { title: "Night Safari", period: "Evening", description: "Tram journey through nocturnal wildlife habitats.", note: "First admission typically starts after 19:00." },
    ],
  },
  {
    id: "istanbul", city: "Istanbul", country: "Türkiye", region: "Europe",
    tagline: "Imperial landmarks across two continents",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1600&q=85",
    hotels: [
      { id: 501, name: "Hampton by Hilton Old City", stars: 3, nightly: 330, room: "Queen Room" },
      { id: 502, name: "The Marmara Pera", stars: 4, nightly: 520, room: "City View Room" },
      { id: 503, name: "Swissôtel The Bosphorus", stars: 5, nightly: 930, room: "Bosphorus View Room" },
    ],
    highlights: [
      { title: "Sultanahmet Classics", period: "Full day", description: "Hagia Sophia, Blue Mosque, Hippodrome and Topkapi area.", note: "Topkapi Palace is generally closed on Tuesdays." },
      { title: "Bosphorus Cruise", period: "Afternoon", description: "Cruise between Europe and Asia with waterfront palaces.", note: "Sailing schedule is weather dependent." },
      { title: "Grand Bazaar & Spice Market", period: "Morning", description: "Guided shopping walk through historic covered markets.", note: "Grand Bazaar is normally closed on Sundays." },
      { title: "Asian Side Discovery", period: "Afternoon", description: "Explore Üsküdar and lively Kadıköy food streets.", note: "Ferry times vary by season." },
    ],
  },
  {
    id: "baku", city: "Baku", country: "Azerbaijan", region: "Europe",
    tagline: "Silk Road heritage meets the Caspian coast",
    image: "https://images.unsplash.com/photo-1608138223775-161bcac3c5f3?auto=format&fit=crop&w=1600&q=85",
    hotels: [
      { id: 601, name: "Central Park Hotel Baku", stars: 3, nightly: 230, room: "Standard Room" },
      { id: 602, name: "Courtyard by Marriott Baku", stars: 4, nightly: 410, room: "Deluxe Room" },
      { id: 603, name: "Fairmont Baku Flame Towers", stars: 5, nightly: 760, room: "Fairmont Room" },
    ],
    highlights: [
      { title: "Baku Old City", period: "Morning", description: "Maiden Tower, Shirvanshahs’ Palace and medieval lanes.", note: "Museums may close on Mondays." },
      { title: "Gobustan & Mud Volcanoes", period: "Full day", description: "Rock-art reserve and Azerbaijan’s unusual landscapes.", note: "Mud volcano access depends on road conditions." },
      { title: "Absheron Peninsula", period: "Afternoon", description: "Ateshgah Fire Temple and the burning hillside of Yanar Dag.", note: "Sites normally operate until early evening." },
      { title: "Highland Park & Boulevard", period: "Evening", description: "Panoramic city views followed by the Caspian promenade.", note: "Best timed shortly before sunset." },
    ],
  },
  {
    id: "maldives", city: "Maldives", country: "Maldives", region: "Indian Ocean",
    tagline: "Private islands and clear-water escapes",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=85",
    hotels: [
      { id: 701, name: "Kaani Palm Beach", stars: 3, nightly: 480, room: "Seaview Room" },
      { id: 702, name: "Meeru Maldives Resort Island", stars: 4, nightly: 980, room: "Beach Villa" },
      { id: 703, name: "Cinnamon Velifushi Maldives", stars: 5, nightly: 1580, room: "Water Bungalow" },
    ],
    highlights: [
      { title: "Lagoon & Reef Day", period: "Morning", description: "Guided snorkelling over a colourful house reef.", note: "Visibility and route depend on sea conditions." },
      { title: "Sandbank Picnic", period: "Afternoon", description: "Private boat outing with a beach picnic.", note: "Subject to tides and weather." },
      { title: "Sunset Dolphin Cruise", period: "Evening", description: "Cruise in search of spinner dolphins at golden hour.", note: "Wildlife sightings cannot be guaranteed." },
      { title: "Island Leisure", period: "Full day", description: "Unstructured time for spa, water sports or the beach.", note: "Motorised activities are charged separately." },
    ],
  },
  {
    id: "london", city: "London", country: "United Kingdom", region: "Europe",
    tagline: "Royal landmarks, theatre and neighbourhood culture",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=85",
    hotels: [
      { id: 801, name: "Point A Hotel Kings Cross", stars: 3, nightly: 520, room: "Cosy Double" },
      { id: 802, name: "Park Plaza Westminster Bridge", stars: 4, nightly: 880, room: "Superior Room" },
      { id: 803, name: "The Savoy", stars: 5, nightly: 2450, room: "Deluxe King" },
    ],
    highlights: [
      { title: "Royal London", period: "Morning", description: "Westminster, Buckingham Palace and St James’s Park.", note: "Changing of the Guard operates on selected days." },
      { title: "Tower & Thames", period: "Afternoon", description: "Tower of London visit followed by a river cruise.", note: "Last Tower admission is usually mid-afternoon." },
      { title: "West End Evening", period: "Evening", description: "Covent Garden exploration and an optional theatre show.", note: "Performance schedules vary; dark days are common on Sundays." },
      { title: "Windsor Excursion", period: "Full day", description: "Visit historic Windsor and its royal castle.", note: "Castle closures occur during official events." },
    ],
  },
  {
    id: "paris", city: "Paris", country: "France", region: "Europe",
    tagline: "Art, boulevards and timeless romance",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=85",
    hotels: [
      { id: 901, name: "ibis Paris Tour Eiffel Cambronne", stars: 3, nightly: 490, room: "Standard Room" },
      { id: 902, name: "Novotel Paris Les Halles", stars: 4, nightly: 820, room: "Executive Room" },
      { id: 903, name: "Hôtel du Louvre", stars: 5, nightly: 1850, room: "Deluxe Room" },
    ],
    highlights: [
      { title: "Paris Icons", period: "Morning", description: "Eiffel Tower district, Arc de Triomphe and Champs-Élysées.", note: "Eiffel Tower entry requires a timed reservation." },
      { title: "Louvre & Seine", period: "Afternoon", description: "Louvre highlights followed by an evening river cruise.", note: "The Louvre is generally closed on Tuesdays." },
      { title: "Montmartre", period: "Morning", description: "Sacré-Cœur, artists’ square and neighbourhood lanes.", note: "Walking route includes slopes and steps." },
      { title: "Versailles", period: "Full day", description: "Palace apartments, Hall of Mirrors and gardens.", note: "The palace is generally closed on Mondays." },
    ],
  },
  {
    id: "rome", city: "Rome", country: "Italy", region: "Europe",
    tagline: "Ancient monuments and Italian flavour",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1600&q=85",
    hotels: [
      { id: 1001, name: "Hotel Nord Nuova Roma", stars: 3, nightly: 450, room: "Classic Room" },
      { id: 1002, name: "UNAHOTELS Decò Roma", stars: 4, nightly: 690, room: "Superior Room" },
      { id: 1003, name: "Anantara Palazzo Naiadi", stars: 5, nightly: 1550, room: "Premium Room" },
    ],
    highlights: [
      { title: "Ancient Rome", period: "Morning", description: "Colosseum, Roman Forum and Palatine Hill with a guide.", note: "Named, timed admission is required." },
      { title: "Vatican Museums", period: "Morning", description: "Museum highlights, Sistine Chapel and St Peter’s Square.", note: "Vatican Museums are normally closed on Sundays." },
      { title: "Baroque Rome", period: "Afternoon", description: "Trevi Fountain, Spanish Steps and Piazza Navona.", note: "Best explored on foot; comfortable shoes advised." },
      { title: "Tivoli Villas", period: "Full day", description: "Day trip to Villa d’Este and Hadrian’s Villa.", note: "Opening hours vary seasonally." },
    ],
  },
  {
    id: "tokyo", city: "Tokyo", country: "Japan", region: "Asia",
    tagline: "Tradition, technology and extraordinary food",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1600&q=85",
    hotels: [
      { id: 1101, name: "Hotel Gracery Shinjuku", stars: 3, nightly: 510, room: "Double Room" },
      { id: 1102, name: "Shibuya Excel Hotel Tokyu", stars: 4, nightly: 760, room: "City View Room" },
      { id: 1103, name: "The Prince Gallery Tokyo", stars: 5, nightly: 1580, room: "Deluxe King" },
    ],
    highlights: [
      { title: "Classic Tokyo", period: "Morning", description: "Meiji Shrine, Asakusa and Senso-ji Temple.", note: "Temple grounds open daily; shops open later in the morning." },
      { title: "Modern Tokyo", period: "Afternoon", description: "Shibuya, Harajuku and a city observation deck.", note: "Observation entry is timed and weather dependent." },
      { title: "Mount Fuji & Hakone", period: "Full day", description: "Scenic excursion with lake and mountain viewpoints.", note: "Fuji visibility cannot be guaranteed." },
      { title: "Tsukiji & Ginza", period: "Morning", description: "Food-market tasting walk followed by Ginza shopping.", note: "Many market shops close on Wednesdays and Sundays." },
    ],
  },
  {
    id: "sydney", city: "Sydney", country: "Australia", region: "Oceania",
    tagline: "Harbour icons, beaches and coastal nature",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1600&q=85",
    hotels: [
      { id: 1201, name: "ibis Styles Sydney Central", stars: 3, nightly: 470, room: "Standard Room" },
      { id: 1202, name: "Novotel Sydney Darling Square", stars: 4, nightly: 720, room: "Superior Room" },
      { id: 1203, name: "Shangri-La Sydney", stars: 5, nightly: 1120, room: "Darling Harbour View" },
    ],
    highlights: [
      { title: "Sydney Harbour", period: "Morning", description: "Opera House precinct, The Rocks and harbour cruise.", note: "Cruise timetables vary by day." },
      { title: "Bondi Coastal Walk", period: "Afternoon", description: "Bondi Beach and a scenic clifftop walking route.", note: "Route may be adjusted in severe weather." },
      { title: "Blue Mountains", period: "Full day", description: "Lookouts, forest scenery and mountain villages.", note: "Visibility is weather dependent." },
      { title: "Wildlife & Darling Harbour", period: "Morning", description: "Australian wildlife encounter and waterfront leisure.", note: "Attractions usually close by early evening." },
    ],
  },
];

const transferOptions = [
  { id: "shared", name: "Shared airport transfers", price: 0 },
  { id: "private", name: "Private transfers", price: 180 },
  { id: "luxury", name: "Luxury car transfers", price: 420 },
];

function dateValue(date: Date) { return date.toISOString().slice(0, 10); }
function addDays(value: string, days: number) {
  const date = new Date(`${value}T12:00:00`);
  date.setDate(date.getDate() + days);
  return dateValue(date);
}
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

  useEffect(() => {
    function restore(data: Partial<QuoteData>) {
      const restoredDestination = destinations.find((item) => item.id === data.destinationId) ?? destinations[0];
      setDestinationId(restoredDestination.id);
      setNights(Math.min(Math.max(Number(data.nights) || 5, 2), 14));
      if (data.hotel && typeof data.hotel.name === "string") {
        setHotelCatalog((current) => ({
          ...current,
          [restoredDestination.id]: [
            data.hotel as Hotel,
            ...(current[restoredDestination.id] ?? restoredDestination.hotels).filter((item) => item.id !== data.hotel?.id),
          ],
        }));
        setHotelId(data.hotel.id);
      } else {
        setHotelId(restoredDestination.hotels.some((item) => item.id === data.hotelId) ? Number(data.hotelId) : restoredDestination.hotels[0].id);
      }
      if (Number.isFinite(data.experiencePrice)) setExperiencePrice(Math.max(0, Number(data.experiencePrice)));
      if (data.transferPrices && typeof data.transferPrices === "object") {
        setTransferPrices((current) => ({ ...current, ...data.transferPrices }));
      }
      if (data.startDate && /^\d{4}-\d{2}-\d{2}$/.test(data.startDate)) setStartDate(data.startDate);
      setAdults(Math.min(Math.max(Number(data.adults) || 2, 1), 8));
      setChildren(Math.min(Math.max(Number(data.children) || 0, 0), 6));
      setInfants(Math.min(Math.max(Number(data.infants) || 0, 0), 4));
      if (transferOptions.some((item) => item.id === data.transfer)) setTransfer(String(data.transfer));
      setInsurance(Boolean(data.insurance));
      setSelectedAddOns(Array.isArray(data.addOns) ? data.addOns.filter((id) => restoredDestination.highlights.some((_, i) => `experience-${i}` === id)) : []);
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
  async function saveQuote() {
    setSaving(true);
    try {
      const response = await fetch("/api/quotes", {
        method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ data: quoteData, total }),
      });
      if (response.status === 401) {
        window.location.assign(`/signin-with-chatgpt?return_to=${encodeURIComponent("/")}`);
        return null;
      }
      if (!response.ok) throw new Error();
      const saved = await response.json();
      setQuoteReference(saved.quoteNumber);
      flash(`Quotation ${saved.quoteNumber} saved permanently.`);
      return saved as { quoteNumber: string; publicToken: string };
    } catch {
      flash("The quotation could not be saved. Please try again.");
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
            <div className="actions"><button className="primary" disabled={saving} onClick={shareQuote}>{saving ? "Saving…" : "Publish & copy link"}</button><button className="secondary" disabled={saving} onClick={saveQuote}>{saving ? "Saving…" : "Save quotation"}</button><button className="ghost" onClick={() => window.print()}>Print / Save PDF</button></div>
          </div>
        </aside>
      </main>
      <div className="mobile-total"><span><small>{destination.city} total</small><strong>{money(total)}</strong></span><button onClick={shareQuote}>Share package</button></div>
    </>
  );
}
