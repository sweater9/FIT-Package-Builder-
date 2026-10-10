export type Hotel = { id: number; name: string; stars: number; nightly: number; room: string };
type Highlight = { title: string; description: string; period: string; note: string };
export type Destination = {
  id: string;
  city: string;
  country: string;
  region: string;
  tagline: string;
  image: string;
  hotels: Hotel[];
  highlights: Highlight[];
};
export const destinations: Destination[] = [
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
  {
    id: "abu-dhabi", city: "Abu Dhabi", country: "UAE", region: "Middle East",
    tagline: "Grand architecture, culture and island leisure",
    image: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=1600&q=85",
    hotels: [
      { id: 1301, name: "Premier Inn Abu Dhabi Capital Centre", stars: 3, nightly: 310, room: "Standard Room" },
      { id: 1302, name: "Novotel Abu Dhabi Al Bustan", stars: 4, nightly: 470, room: "Superior Room" },
      { id: 1303, name: "Emirates Palace Mandarin Oriental", stars: 5, nightly: 1850, room: "Deluxe City View Room" },
    ],
    highlights: [
      { title: "Abu Dhabi City Tour", period: "Morning", description: "Sheikh Zayed Grand Mosque, Corniche and Heritage Village.", note: "Modest dress is required at the mosque; complimentary attire may be available." },
      { title: "Louvre Abu Dhabi", period: "Afternoon", description: "Explore the galleries and iconic dome on Saadiyat Island.", note: "The museum is generally closed on Mondays." },
      { title: "Yas Island", period: "Full day", description: "Choose Ferrari World, Warner Bros. World or SeaWorld Abu Dhabi.", note: "Operating hours vary by attraction and season." },
      { title: "Desert Experience", period: "Afternoon", description: "Dune drive, camel experience and dinner at a desert camp.", note: "Not recommended for guests with certain medical conditions or infants." },
    ],
  },
  {
    id: "doha", city: "Doha", country: "Qatar", region: "Middle East",
    tagline: "Waterfront elegance, museums and desert landscapes",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1600&q=85",
    hotels: [
      { id: 1401, name: "Premier Inn Doha Airport", stars: 3, nightly: 260, room: "Double Room" },
      { id: 1402, name: "Radisson Blu Hotel Doha", stars: 4, nightly: 450, room: "Superior Room" },
      { id: 1403, name: "The St. Regis Doha", stars: 5, nightly: 980, room: "Grand Deluxe Room" },
    ],
    highlights: [
      { title: "Doha City Highlights", period: "Morning", description: "Corniche, Katara Cultural Village, The Pearl and West Bay.", note: "Outdoor stops may be shortened during the hottest hours." },
      { title: "Museum of Islamic Art", period: "Afternoon", description: "Discover Islamic art followed by a walk through MIA Park.", note: "Museum opening hours differ on Fridays." },
      { title: "Souq Waqif Evening", period: "Evening", description: "Guided walk through the traditional market and dining quarter.", note: "The souq is liveliest after sunset." },
      { title: "Inland Sea Safari", period: "Full day", description: "4x4 dune experience to Khor Al Adaid near the Saudi border.", note: "Passport details may be required and routing is weather dependent." },
    ],
  },
  {
    id: "muscat", city: "Muscat", country: "Oman", region: "Middle East",
    tagline: "Mountain scenery, forts and a graceful coastline",
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1600&q=85",
    hotels: [
      { id: 1501, name: "Ramada Encore by Wyndham Muscat Al-Ghubra", stars: 3, nightly: 240, room: "King Room" },
      { id: 1502, name: "Crowne Plaza Muscat", stars: 4, nightly: 520, room: "Sea View Room" },
      { id: 1503, name: "Al Bustan Palace, a Ritz-Carlton Hotel", stars: 5, nightly: 1100, room: "Deluxe Mountain View" },
    ],
    highlights: [
      { title: "Muscat City Tour", period: "Morning", description: "Sultan Qaboos Grand Mosque, Mutrah Souq and the old city.", note: "The mosque has restricted visitor hours and a modest dress code." },
      { title: "Nizwa & Jabal Akhdar", period: "Full day", description: "Historic fort, traditional souq and mountain viewpoints.", note: "A 4x4 vehicle is required for the upper mountain road." },
      { title: "Wadi Shab", period: "Full day", description: "Coastal drive and guided hike through a dramatic wadi.", note: "Good mobility and suitable footwear are essential." },
      { title: "Dolphin Watching", period: "Morning", description: "Boat trip along Muscat's rugged coastline.", note: "Sailing is subject to sea conditions; sightings are not guaranteed." },
    ],
  },
  {
    id: "cairo", city: "Cairo", country: "Egypt", region: "Africa",
    tagline: "Ancient wonders and energetic city culture",
    image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1600&q=85",
    hotels: [
      { id: 1601, name: "Steigenberger Hotel El Tahrir", stars: 3, nightly: 310, room: "Superior City View" },
      { id: 1602, name: "Cairo Marriott Hotel", stars: 4, nightly: 520, room: "Deluxe Room" },
      { id: 1603, name: "Marriott Mena House Cairo", stars: 5, nightly: 980, room: "Deluxe Pyramid View" },
    ],
    highlights: [
      { title: "Giza Pyramids & Sphinx", period: "Morning", description: "Guided visit to the Giza plateau and its ancient monuments.", note: "Interior pyramid tickets are limited and sold separately." },
      { title: "Grand Egyptian Museum", period: "Afternoon", description: "Explore Egypt's extraordinary archaeological collection.", note: "Gallery access and operating hours may change during phased openings." },
      { title: "Old Cairo", period: "Morning", description: "Citadel, historic mosques and Coptic Cairo landmarks.", note: "Modest dress is recommended at religious sites." },
      { title: "Nile Dinner Cruise", period: "Evening", description: "Evening cruise with dinner and live entertainment.", note: "Boarding normally begins 30–45 minutes before sailing." },
    ],
  },
  {
    id: "amman", city: "Amman", country: "Jordan", region: "Middle East",
    tagline: "Roman heritage and gateways to Jordan's wonders",
    image: "https://images.unsplash.com/photo-1539650116574-4b3e7e981ad6?auto=format&fit=crop&w=1600&q=85",
    hotels: [
      { id: 1701, name: "ibis Amman", stars: 3, nightly: 230, room: "Standard Double Room" },
      { id: 1702, name: "Amman Rotana", stars: 4, nightly: 480, room: "Classic Room" },
      { id: 1703, name: "Four Seasons Hotel Amman", stars: 5, nightly: 1080, room: "Deluxe Room" },
    ],
    highlights: [
      { title: "Amman Heritage Tour", period: "Morning", description: "Citadel, Roman Theatre and downtown food streets.", note: "The Citadel is exposed; sun protection is recommended." },
      { title: "Petra", period: "Full day", description: "Walk through the Siq to the Treasury and ancient city.", note: "The visit involves considerable walking on uneven ground." },
      { title: "Dead Sea", period: "Full day", description: "Relax at a resort beach on the lowest point on Earth.", note: "Avoid swimming after shaving or with open cuts." },
      { title: "Jerash", period: "Morning", description: "Explore one of the region's best-preserved Roman cities.", note: "Comfortable walking shoes and water are advised." },
    ],
  },
  {
    id: "mauritius", city: "Mauritius", country: "Mauritius", region: "Indian Ocean",
    tagline: "Lagoon beaches, mountain scenery and island culture",
    image: "https://images.unsplash.com/photo-1589197331516-4d84b72ebde3?auto=format&fit=crop&w=1600&q=85",
    hotels: [
      { id: 1801, name: "Veranda Grand Baie Hotel & Spa", stars: 3, nightly: 470, room: "Comfort Room" },
      { id: 1802, name: "Lagoon Attitude", stars: 4, nightly: 820, room: "Couple Room" },
      { id: 1803, name: "LUX* Belle Mare", stars: 5, nightly: 1450, room: "Junior Suite" },
    ],
    highlights: [
      { title: "South Island Discovery", period: "Full day", description: "Chamarel, waterfalls, volcanic landscapes and scenic viewpoints.", note: "Mountain weather can change quickly." },
      { title: "Île aux Cerfs", period: "Full day", description: "Boat excursion to beaches and lagoon activities.", note: "Boat timings depend on sea conditions." },
      { title: "Pamplemousses & Port Louis", period: "Morning", description: "Botanical garden, waterfront and central market.", note: "The central market is busiest before midday." },
      { title: "Catamaran Cruise", period: "Full day", description: "Sailing, snorkelling and lunch in a sheltered lagoon.", note: "Route and swimming stops are weather dependent." },
    ],
  },
  {
    id: "kuala-lumpur", city: "Kuala Lumpur", country: "Malaysia", region: "Asia",
    tagline: "Skyline landmarks, food streets and rainforest escapes",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1600&q=85",
    hotels: [
      { id: 1901, name: "Holiday Inn Express Kuala Lumpur City Centre", stars: 3, nightly: 220, room: "Standard Room" },
      { id: 1902, name: "Traders Hotel Kuala Lumpur", stars: 4, nightly: 450, room: "Deluxe Room" },
      { id: 1903, name: "Mandarin Oriental Kuala Lumpur", stars: 5, nightly: 760, room: "Park View Room" },
    ],
    highlights: [
      { title: "Kuala Lumpur Highlights", period: "Morning", description: "Petronas Towers, Merdeka Square and historic districts.", note: "Petronas observation tickets require timed reservations." },
      { title: "Batu Caves", period: "Morning", description: "Visit the colourful Hindu shrine and limestone caves.", note: "The main cave is reached by 272 steps; modest dress is advised." },
      { title: "Genting Highlands", period: "Full day", description: "Mountain resort visit with cable-car views and leisure time.", note: "Cable-car operation is subject to weather and maintenance." },
      { title: "Food & Night Market", period: "Evening", description: "Explore Jalan Alor and Kuala Lumpur's evening food culture.", note: "Bring cash for smaller market vendors." },
    ],
  },
  {
    id: "phuket", city: "Phuket", country: "Thailand", region: "Asia",
    tagline: "Andaman beaches, island cruises and lively evenings",
    image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1600&q=85",
    hotels: [
      { id: 2001, name: "ibis Phuket Patong", stars: 3, nightly: 230, room: "Standard Room" },
      { id: 2002, name: "Four Points by Sheraton Phuket Patong Beach", stars: 4, nightly: 460, room: "Superior Room" },
      { id: 2003, name: "The Shore at Katathani", stars: 5, nightly: 1320, room: "Pool Villa" },
    ],
    highlights: [
      { title: "Phuket Island Tour", period: "Morning", description: "Old Town, hilltop viewpoints and Wat Chalong.", note: "Temple visits require respectful clothing." },
      { title: "Phi Phi Islands", period: "Full day", description: "Speedboat cruise with swimming and island stops.", note: "Routing is subject to marine-park rules and sea conditions." },
      { title: "Phang Nga Bay", period: "Full day", description: "Explore limestone scenery and sea-cave lagoons.", note: "Canoeing depends on tides and weather." },
      { title: "Siam Niramit", period: "Evening", description: "Cultural performance with optional dinner and transfers.", note: "Show days vary; advance reservation is recommended." },
    ],
  },
  {
    id: "hanoi", city: "Hanoi", country: "Vietnam", region: "Asia",
    tagline: "Old-quarter character and spectacular northern landscapes",
    image: "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&w=1600&q=85",
    hotels: [
      { id: 2101, name: "La Siesta Classic Ma May", stars: 3, nightly: 250, room: "Deluxe Room" },
      { id: 2102, name: "Pan Pacific Hanoi", stars: 4, nightly: 460, room: "Deluxe Lake View" },
      { id: 2103, name: "Sofitel Legend Metropole Hanoi", stars: 5, nightly: 1050, room: "Luxury Room" },
    ],
    highlights: [
      { title: "Hanoi City Discovery", period: "Morning", description: "Old Quarter, Temple of Literature and Hoan Kiem Lake.", note: "Some monuments close for lunch." },
      { title: "Street Food Walk", period: "Evening", description: "Guided tastings through Hanoi's atmospheric old streets.", note: "Dietary requirements should be advised in advance." },
      { title: "Ha Long Bay Cruise", period: "Full day", description: "Cruise among limestone islands with lunch and cave visits.", note: "The itinerary is subject to port authority and weather conditions." },
      { title: "Ninh Binh", period: "Full day", description: "River sampan journey through karst scenery and countryside.", note: "Sun protection is recommended for the open boat journey." },
    ],
  },
  {
    id: "seoul", city: "Seoul", country: "South Korea", region: "Asia",
    tagline: "Royal heritage, design districts and Korean flavours",
    image: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=1600&q=85",
    hotels: [
      { id: 2201, name: "Nine Tree Hotel Myeongdong", stars: 3, nightly: 330, room: "Standard Double" },
      { id: 2202, name: "L7 Hongdae", stars: 4, nightly: 520, room: "Superior Room" },
      { id: 2203, name: "Signiel Seoul", stars: 5, nightly: 1450, room: "Premier Room" },
    ],
    highlights: [
      { title: "Royal Seoul", period: "Morning", description: "Gyeongbokgung Palace, Bukchon and Insadong.", note: "Gyeongbokgung is generally closed on Tuesdays." },
      { title: "Modern Seoul", period: "Afternoon", description: "Gangnam, COEX and a Han River viewpoint.", note: "Traffic can affect transfer times." },
      { title: "DMZ Excursion", period: "Full day", description: "Guided visit to key Korean Demilitarized Zone sites.", note: "Passport is mandatory and sites may close without notice." },
      { title: "Markets & Korean Food", period: "Evening", description: "Gwangjang Market tastings and vibrant evening streets.", note: "Many vendors accept cash or local payment methods." },
    ],
  },
  {
    id: "amsterdam", city: "Amsterdam", country: "Netherlands", region: "Europe",
    tagline: "Canals, masterpieces and charming neighbourhoods",
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1600&q=85",
    hotels: [
      { id: 2301, name: "ibis Amsterdam Centre", stars: 3, nightly: 520, room: "Standard Room" },
      { id: 2302, name: "Park Centraal Amsterdam", stars: 4, nightly: 780, room: "Deluxe Room" },
      { id: 2303, name: "Conservatorium Hotel", stars: 5, nightly: 1750, room: "Deluxe Guest Room" },
    ],
    highlights: [
      { title: "Canal Cruise & Old Centre", period: "Morning", description: "Cruise the canal ring and explore historic central streets.", note: "Boat routes may change during major events." },
      { title: "Van Gogh Museum", period: "Afternoon", description: "Timed museum visit followed by Museumplein leisure.", note: "Advance timed admission is essential." },
      { title: "Zaanse Schans", period: "Morning", description: "Windmills, traditional crafts and Dutch countryside.", note: "Some workshops operate reduced winter hours." },
      { title: "Keukenhof & Tulip Fields", period: "Full day", description: "Seasonal excursion to spring gardens and flower landscapes.", note: "Available only during the spring opening season." },
    ],
  },
  {
    id: "barcelona", city: "Barcelona", country: "Spain", region: "Europe",
    tagline: "Gaudí landmarks, Mediterranean streets and coastal energy",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1600&q=85",
    hotels: [
      { id: 2401, name: "Hotel Jazz Barcelona", stars: 3, nightly: 460, room: "Double Room" },
      { id: 2402, name: "H10 Madison", stars: 4, nightly: 760, room: "Classic Room" },
      { id: 2403, name: "Mandarin Oriental Barcelona", stars: 5, nightly: 1950, room: "Deluxe Garden Room" },
    ],
    highlights: [
      { title: "Gaudí Barcelona", period: "Morning", description: "Sagrada Família and Passeig de Gràcia architectural icons.", note: "Timed admission and passport details may be required." },
      { title: "Gothic Quarter", period: "Afternoon", description: "Walk medieval lanes, plazas and the historic cathedral area.", note: "The route is mostly pedestrian and includes uneven paving." },
      { title: "Park Güell & Montjuïc", period: "Full day", description: "Colourful Gaudí design followed by panoramic city viewpoints.", note: "Park Güell monumental-zone admission is timed." },
      { title: "Montserrat", period: "Full day", description: "Mountain monastery excursion with spectacular scenery.", note: "Mountain weather can be cooler than Barcelona." },
    ],
  },
  {
    id: "zurich", city: "Zurich", country: "Switzerland", region: "Europe",
    tagline: "Lakeside elegance and easy Alpine escapes",
    image: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&w=1600&q=85",
    hotels: [
      { id: 2501, name: "ibis Styles Zurich City Center", stars: 3, nightly: 560, room: "Standard Room" },
      { id: 2502, name: "Hotel St. Gotthard", stars: 4, nightly: 820, room: "Comfort Room" },
      { id: 2503, name: "Baur au Lac", stars: 5, nightly: 2100, room: "Deluxe Room" },
    ],
    highlights: [
      { title: "Zurich Old Town", period: "Morning", description: "Guided walk through medieval lanes, Bahnhofstrasse and the lakefront.", note: "Most shops are closed on Sundays." },
      { title: "Rhine Falls", period: "Afternoon", description: "Scenic excursion to Europe's most powerful waterfall.", note: "Boat operations are seasonal and weather dependent." },
      { title: "Mount Titlis", period: "Full day", description: "Alpine journey with revolving cable car and snow experiences.", note: "High-altitude weather may affect cable-car operations." },
      { title: "Lucerne", period: "Full day", description: "Visit Chapel Bridge, the lake promenade and historic centre.", note: "Optional lake cruises follow seasonal timetables." },
    ],
  },
  {
    id: "vienna", city: "Vienna", country: "Austria", region: "Europe",
    tagline: "Imperial palaces, music and café culture",
    image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1600&q=85",
    hotels: [
      { id: 2601, name: "Motel One Wien-Staatsoper", stars: 3, nightly: 480, room: "Queen Room" },
      { id: 2602, name: "Austria Trend Hotel Europa Wien", stars: 4, nightly: 680, room: "Comfort Room" },
      { id: 2603, name: "Hotel Sacher Wien", stars: 5, nightly: 1800, room: "Deluxe Room" },
    ],
    highlights: [
      { title: "Imperial Vienna", period: "Morning", description: "Ringstrasse, Hofburg courtyards and St Stephen's Cathedral.", note: "Cathedral access may be restricted during services." },
      { title: "Schönbrunn Palace", period: "Afternoon", description: "Tour the imperial rooms and landscaped palace grounds.", note: "Timed palace admission is recommended." },
      { title: "Danube Valley", period: "Full day", description: "Explore the Wachau landscapes, villages and Melk Abbey.", note: "River cruises are seasonal." },
      { title: "Vienna Concert", period: "Evening", description: "Classical performance in an elegant historic venue.", note: "Dress code and programme vary by venue." },
    ],
  },
  {
    id: "prague", city: "Prague", country: "Czechia", region: "Europe",
    tagline: "Gothic spires, castle views and riverside charm",
    image: "https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=1600&q=85",
    hotels: [
      { id: 2701, name: "ibis Praha Old Town", stars: 3, nightly: 350, room: "Standard Room" },
      { id: 2702, name: "Hotel Kings Court", stars: 4, nightly: 590, room: "Deluxe Room" },
      { id: 2703, name: "Four Seasons Hotel Prague", stars: 5, nightly: 1550, room: "Deluxe Room" },
    ],
    highlights: [
      { title: "Prague Old Town", period: "Morning", description: "Astronomical Clock, Old Town Square and Jewish Quarter.", note: "The route is pedestrian with cobbled surfaces." },
      { title: "Prague Castle", period: "Afternoon", description: "Castle courtyards, St Vitus Cathedral and Golden Lane.", note: "Security queues can be longer during peak season." },
      { title: "Vltava Dinner Cruise", period: "Evening", description: "Evening cruise with buffet dinner and illuminated landmarks.", note: "Boarding begins before the published sailing time." },
      { title: "Český Krumlov", period: "Full day", description: "Day trip to the UNESCO-listed riverside town.", note: "The castle interiors have seasonal opening dates." },
    ],
  },
  {
    id: "athens", city: "Athens", country: "Greece", region: "Europe",
    tagline: "Ancient landmarks and lively Mediterranean streets",
    image: "https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=1600&q=85",
    hotels: [
      { id: 2801, name: "Athens Center Square Hotel", stars: 3, nightly: 360, room: "Standard Room" },
      { id: 2802, name: "Electra Metropolis Athens", stars: 4, nightly: 690, room: "Classic Room" },
      { id: 2803, name: "Hotel Grande Bretagne", stars: 5, nightly: 1450, room: "Deluxe Room" },
    ],
    highlights: [
      { title: "Acropolis & Museum", period: "Morning", description: "Guided Acropolis visit followed by its celebrated museum.", note: "Early entry is recommended in summer heat." },
      { title: "Athens City Highlights", period: "Afternoon", description: "Syntagma Square, Plaka and panoramic city landmarks.", note: "Changing of the Guard takes place hourly." },
      { title: "Cape Sounion", period: "Afternoon", description: "Coastal drive to the Temple of Poseidon for sunset.", note: "Sunset timing varies considerably by season." },
      { title: "Saronic Islands Cruise", period: "Full day", description: "Cruise to picturesque islands with onboard lunch.", note: "Island sequence is subject to port conditions." },
    ],
  },
  {
    id: "lisbon", city: "Lisbon", country: "Portugal", region: "Europe",
    tagline: "Colourful hills, coastal history and Atlantic flavours",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1600&q=85",
    hotels: [
      { id: 2901, name: "Hotel Gat Rossio", stars: 3, nightly: 390, room: "Standard Room" },
      { id: 2902, name: "Lisboa Pessoa Hotel", stars: 4, nightly: 620, room: "Double Room" },
      { id: 2903, name: "Four Seasons Hotel Ritz Lisbon", stars: 5, nightly: 1700, room: "Deluxe City View" },
    ],
    highlights: [
      { title: "Historic Lisbon", period: "Morning", description: "Belém Tower, Jerónimos area and riverside monuments.", note: "Jerónimos Monastery is generally closed on Mondays." },
      { title: "Alfama & Tram Districts", period: "Afternoon", description: "Explore viewpoints and atmospheric old neighbourhoods.", note: "The route includes steep slopes and uneven paving." },
      { title: "Sintra & Cascais", period: "Full day", description: "Palaces, forested hills and the Atlantic coast.", note: "Pena Palace requires a timed entry slot." },
      { title: "Fado Evening", period: "Evening", description: "Traditional Portuguese dinner with a live Fado performance.", note: "Performances commonly begin after 20:00." },
    ],
  },
  {
    id: "copenhagen", city: "Copenhagen", country: "Denmark", region: "Europe",
    tagline: "Nordic design, canals and storybook streets",
    image: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=1600&q=85",
    hotels: [
      { id: 3001, name: "Wakeup Copenhagen Borgergade", stars: 3, nightly: 480, room: "Standard Room" },
      { id: 3002, name: "Tivoli Hotel", stars: 4, nightly: 720, room: "Superior Room" },
      { id: 3003, name: "Hotel d'Angleterre", stars: 5, nightly: 1950, room: "Deluxe Room" },
    ],
    highlights: [
      { title: "Copenhagen Highlights", period: "Morning", description: "Nyhavn, Amalienborg, the Little Mermaid and old harbour.", note: "Changing of the Guard is normally around midday." },
      { title: "Canal Cruise", period: "Afternoon", description: "See palaces, churches and modern waterfront architecture.", note: "Some departures are reduced during winter." },
      { title: "Tivoli Gardens", period: "Evening", description: "Historic amusement gardens, dining and seasonal entertainment.", note: "Tivoli has seasonal opening periods." },
      { title: "North Zealand Castles", period: "Full day", description: "Visit Kronborg and Frederiksborg castles.", note: "Castle opening days vary outside summer." },
    ],
  },
  {
    id: "belgrade", city: "Belgrade", country: "Serbia", region: "Europe",
    tagline: "Fortress history and energetic riverside culture",
    image: "https://images.unsplash.com/photo-1569959220744-ff553533f492?auto=format&fit=crop&w=1600&q=85",
    hotels: [
      { id: 3101, name: "Hotel Bohemian Garni", stars: 3, nightly: 260, room: "Standard Room" },
      { id: 3102, name: "Hotel Moskva", stars: 4, nightly: 480, room: "Premium Room" },
      { id: 3103, name: "Saint Ten Hotel", stars: 5, nightly: 820, room: "Executive Room" },
    ],
    highlights: [
      { title: "Belgrade City Tour", period: "Morning", description: "Republic Square, Knez Mihailova and historic quarters.", note: "Central touring is mainly on foot." },
      { title: "Kalemegdan Fortress", period: "Afternoon", description: "Explore the fortress and Danube–Sava viewpoints.", note: "Some museum sections close on Mondays." },
      { title: "Danube Evening Cruise", period: "Evening", description: "Relax on the rivers with city lights and dinner options.", note: "Cruises are seasonal and weather dependent." },
      { title: "Novi Sad", period: "Full day", description: "Visit Petrovaradin Fortress and the city's elegant centre.", note: "Festival dates can affect access and traffic." },
    ],
  },
  {
    id: "tirana", city: "Tirana", country: "Albania", region: "Europe",
    tagline: "Colourful capital and gateways to Adriatic heritage",
    image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1600&q=85",
    hotels: [
      { id: 3201, name: "Hotel Opera Tirana", stars: 3, nightly: 250, room: "Standard Room" },
      { id: 3202, name: "Maritim Hotel Plaza Tirana", stars: 4, nightly: 440, room: "Deluxe Room" },
      { id: 3203, name: "Rogner Hotel Tirana", stars: 5, nightly: 620, room: "Superior Room" },
    ],
    highlights: [
      { title: "Tirana Discovery", period: "Morning", description: "Skanderbeg Square, Bunk'Art and the colourful city centre.", note: "Museum closure days vary." },
      { title: "Dajti Mountain", period: "Afternoon", description: "Cable-car journey for panoramic views and leisure time.", note: "Cable-car operation is weather dependent." },
      { title: "Berat", period: "Full day", description: "Explore the UNESCO-listed city of a thousand windows.", note: "The castle area includes steep cobbled paths." },
      { title: "Krujë", period: "Morning", description: "Historic castle, museum and traditional bazaar.", note: "Many bazaar shops prefer cash payments." },
    ],
  },
  {
    id: "cape-town", city: "Cape Town", country: "South Africa", region: "Africa",
    tagline: "Mountain drama, vineyards and ocean scenery",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1600&q=85",
    hotels: [
      { id: 3301, name: "StayEasy Cape Town City Bowl", stars: 3, nightly: 310, room: "Standard Room" },
      { id: 3302, name: "The President Hotel", stars: 4, nightly: 580, room: "Classic Room" },
      { id: 3303, name: "One&Only Cape Town", stars: 5, nightly: 1650, room: "Marina Harbour Room" },
    ],
    highlights: [
      { title: "Cape Town City & Table Mountain", period: "Morning", description: "City highlights with cableway access to Table Mountain.", note: "Cableway operation depends on wind and visibility." },
      { title: "Cape Peninsula", period: "Full day", description: "Chapman's Peak, Cape Point and the penguins at Boulders Beach.", note: "The coastal route may change during road closures." },
      { title: "Winelands", period: "Full day", description: "Stellenbosch and Franschhoek scenery with cellar tastings.", note: "Guests must meet the legal drinking age for tastings." },
      { title: "Robben Island", period: "Afternoon", description: "Ferry and guided historical tour of the island.", note: "Ferries are frequently affected by sea conditions." },
    ],
  },
  {
    id: "nairobi", city: "Nairobi", country: "Kenya", region: "Africa",
    tagline: "Urban energy and unforgettable wildlife gateways",
    image: "https://images.unsplash.com/photo-1611348586804-61bf6c080437?auto=format&fit=crop&w=1600&q=85",
    hotels: [
      { id: 3401, name: "ibis Styles Nairobi Westlands", stars: 3, nightly: 280, room: "Standard Room" },
      { id: 3402, name: "Sarova Panafric", stars: 4, nightly: 480, room: "Deluxe Room" },
      { id: 3403, name: "Hemingways Nairobi", stars: 5, nightly: 1150, room: "Deluxe Suite" },
    ],
    highlights: [
      { title: "Nairobi National Park", period: "Morning", description: "Game drive with city-skyline views beyond the savannah.", note: "Wildlife sightings vary and early departure is recommended." },
      { title: "Giraffe Centre & Karen Blixen", period: "Afternoon", description: "Conservation encounter and historic museum visit.", note: "Animal interactions follow conservation-centre rules." },
      { title: "Lake Naivasha", period: "Full day", description: "Great Rift Valley scenery and optional boat safari.", note: "Boat operation depends on lake and weather conditions." },
      { title: "Maasai Mara Extension", period: "Full day", description: "Fly or drive to Kenya's celebrated wildlife reserve.", note: "A minimum two-night extension is recommended." },
    ],
  },
  {
    id: "colombo", city: "Colombo", country: "Sri Lanka", region: "Asia",
    tagline: "Coastal culture and gateways to a tropical island",
    image: "https://images.unsplash.com/photo-1588258524675-c619e2f82da2?auto=format&fit=crop&w=1600&q=85",
    hotels: [
      { id: 3501, name: "Fairway Colombo", stars: 3, nightly: 230, room: "Superior Room" },
      { id: 3502, name: "Cinnamon Lakeside Colombo", stars: 4, nightly: 420, room: "Premium Room" },
      { id: 3503, name: "Shangri-La Colombo", stars: 5, nightly: 720, room: "Deluxe Ocean View" },
    ],
    highlights: [
      { title: "Colombo City Tour", period: "Morning", description: "Fort district, temples, markets and Galle Face Green.", note: "Religious sites require modest clothing and footwear removal." },
      { title: "Galle Fort", period: "Full day", description: "Coastal journey to the UNESCO-listed Dutch fort.", note: "Southern highway travel time depends on traffic." },
      { title: "Kandy", period: "Full day", description: "Hill-country scenery and the Temple of the Sacred Tooth.", note: "Temple visitors must cover shoulders and knees." },
      { title: "Bentota Coast", period: "Full day", description: "Beach leisure with optional river safari and water sports.", note: "Water activities depend on monsoon and sea conditions." },
    ],
  },
  {
    id: "siem-reap", city: "Siem Reap", country: "Cambodia", region: "Asia",
    tagline: "Angkor temples and warm Khmer hospitality",
    image: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=1600&q=85",
    hotels: [
      { id: 3601, name: "Central Suite Residence", stars: 3, nightly: 210, room: "Deluxe Room" },
      { id: 3602, name: "Borei Angkor Resort & Spa", stars: 4, nightly: 390, room: "Landmark Room" },
      { id: 3603, name: "Raffles Grand Hotel d'Angkor", stars: 5, nightly: 920, room: "State Room" },
    ],
    highlights: [
      { title: "Angkor Wat Sunrise", period: "Morning", description: "Early visit to Angkor Wat followed by major temple sites.", note: "A valid Angkor pass and modest clothing are required." },
      { title: "Angkor Thom & Ta Prohm", period: "Afternoon", description: "Explore ancient gates, Bayon faces and jungle-covered ruins.", note: "Temple paths are uneven with steps." },
      { title: "Tonlé Sap Lake", period: "Afternoon", description: "Boat journey through a seasonal floating-village landscape.", note: "Routes change substantially with water levels." },
      { title: "Khmer Dining & Dance", period: "Evening", description: "Dinner accompanied by a traditional Apsara performance.", note: "Advance seating reservation is recommended." },
    ],
  },
  {
    id: "almaty", city: "Almaty", country: "Kazakhstan", region: "Central Asia",
    tagline: "Mountain horizons, lakes and Silk Road character",
    image: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=1600&q=85",
    hotels: [
      { id: 3701, name: "ibis Almaty Jetisu", stars: 3, nightly: 240, room: "Standard Room" },
      { id: 3702, name: "Novotel Almaty City Center", stars: 4, nightly: 430, room: "Superior Room" },
      { id: 3703, name: "The Ritz-Carlton Almaty", stars: 5, nightly: 1050, room: "Deluxe Mountain View" },
    ],
    highlights: [
      { title: "Almaty City & Kok Tobe", period: "Afternoon", description: "City landmarks, mountain views and cable-car experience.", note: "Cable-car operation depends on weather and maintenance." },
      { title: "Medeu & Shymbulak", period: "Full day", description: "High-mountain sporting landmarks and scenic gondola rides.", note: "Warm layers are recommended even outside winter." },
      { title: "Charyn Canyon", period: "Full day", description: "Explore dramatic rock formations east of Almaty.", note: "The excursion involves a long drive and uneven walking." },
      { title: "Kolsai Lakes", period: "Full day", description: "Mountain-lake landscapes and guided nature walks.", note: "Road and trail access are seasonal." },
    ],
  },
  {
    id: "hong-kong", city: "Hong Kong", country: "Hong Kong SAR", region: "Asia",
    tagline: "Harbour skylines, markets and island scenery",
    image: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?auto=format&fit=crop&w=1600&q=85",
    hotels: [
      { id: 3801, name: "Eaton HK", stars: 3, nightly: 420, room: "Eaton Room" },
      { id: 3802, name: "The Royal Pacific Hotel", stars: 4, nightly: 650, room: "Premier Room" },
      { id: 3803, name: "The Peninsula Hong Kong", stars: 5, nightly: 1850, room: "Deluxe Courtyard Room" },
    ],
    highlights: [
      { title: "Hong Kong Island", period: "Morning", description: "Victoria Peak, Aberdeen and Central district landmarks.", note: "Peak views depend on cloud and visibility." },
      { title: "Kowloon Markets", period: "Evening", description: "Temple Street, neon streets and local food discoveries.", note: "Market activity is strongest after sunset." },
      { title: "Lantau Island", period: "Full day", description: "Ngong Ping cable car, Big Buddha and Tai O village.", note: "Cable-car operation is weather dependent." },
      { title: "Macau Day Trip", period: "Full day", description: "Ferry excursion to UNESCO heritage streets and resorts.", note: "Passport and entry eligibility must be checked in advance." },
    ],
  },
  {
    id: "new-york", city: "New York", country: "United States", region: "North America",
    tagline: "Iconic skylines, neighbourhoods and world-class culture",
    image: "https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=1600&q=85",
    hotels: [
      { id: 3901, name: "Pod Times Square", stars: 3, nightly: 690, room: "Full Pod Room" },
      { id: 3902, name: "New York Marriott Marquis", stars: 4, nightly: 1150, room: "Deluxe Room" },
      { id: 3903, name: "The Plaza New York", stars: 5, nightly: 2800, room: "Plaza Room" },
    ],
    highlights: [
      { title: "Manhattan Highlights", period: "Full day", description: "Times Square, Fifth Avenue, Central Park and downtown icons.", note: "Traffic may require changes to the touring sequence." },
      { title: "Statue of Liberty & Ellis Island", period: "Morning", description: "Ferry visit to New York's harbour landmarks.", note: "Security screening is mandatory; crown access is limited." },
      { title: "Broadway Evening", period: "Evening", description: "Theatre performance with pre-show Times Square leisure.", note: "Show schedules and dark days vary." },
      { title: "Brooklyn Discovery", period: "Afternoon", description: "Brooklyn Bridge, DUMBO and waterfront skyline views.", note: "The walking route is exposed in poor weather." },
    ],
  },
  {
    id: "toronto", city: "Toronto", country: "Canada", region: "North America",
    tagline: "Cosmopolitan neighbourhoods and spectacular falls",
    image: "https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=1600&q=85",
    hotels: [
      { id: 4001, name: "Chelsea Hotel Toronto", stars: 3, nightly: 570, room: "Chelsea Room" },
      { id: 4002, name: "Sheraton Centre Toronto Hotel", stars: 4, nightly: 820, room: "Guest Room" },
      { id: 4003, name: "The Ritz-Carlton Toronto", stars: 5, nightly: 1550, room: "Deluxe Lake View" },
    ],
    highlights: [
      { title: "Toronto City Highlights", period: "Morning", description: "CN Tower district, waterfront and major city landmarks.", note: "CN Tower visibility depends on weather." },
      { title: "Niagara Falls", period: "Full day", description: "Falls viewpoints, seasonal boat cruise and Niagara-on-the-Lake.", note: "Boat cruises operate seasonally; winter itineraries differ." },
      { title: "Toronto Islands", period: "Afternoon", description: "Ferry ride for parks and skyline panoramas.", note: "Ferry schedules and island services vary by season." },
      { title: "Multicultural Toronto", period: "Evening", description: "Explore Kensington Market, Chinatown and dining districts.", note: "Some market businesses close earlier on weekdays." },
    ],
  },
];

export const transferOptions = [
  { id: "shared", name: "Shared airport transfers", price: 0 },
  { id: "private", name: "Private transfers", price: 180 },
  { id: "luxury", name: "Luxury car transfers", price: 420 },
];

