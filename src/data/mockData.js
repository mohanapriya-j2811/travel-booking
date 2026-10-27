export const destinations = [
  { id: 1, name: "Bali", country: "Indonesia", category: "Beach", image: "/images/bali.jpg", rating: 4.8,
    description: "Temples, rice terraces and golden beaches make Bali a perfect tropical escape." },
  { id: 2, name: "Paris", country: "France", category: "City", image: "/images/paris.jpg", rating: 4.7,
    description: "The city of love, art, cafes and the iconic Eiffel Tower." },
  { id: 3, name: "Maldives", country: "Maldives", category: "Beach", image: "/images/maldives.jpg", rating: 4.9,
    description: "Crystal clear lagoons and luxury overwater villas." },
  { id: 4, name: "Switzerland", country: "Switzerland", category: "Mountain", image: "/images/switzerland.jpg", rating: 4.9,
    description: "Snow-capped Alps, scenic trains and charming mountain villages." },
  { id: 5, name: "Dubai", country: "UAE", category: "City", image: "/images/dubai.jpg", rating: 4.6,
    description: "Futuristic skyline, desert safaris and world-class shopping." },
  { id: 6, name: "Goa", country: "India", category: "Beach", image: "/images/goa.jpg", rating: 4.5,
    description: "Sunny beaches, seafood, nightlife and Portuguese heritage." },
  { id: 7, name: "Kerala", country: "India", category: "Nature", image: "/images/kerala.jpg", rating: 4.8,
    description: "Peaceful backwaters, houseboats, tea gardens and Ayurveda." },
  { id: 8, name: "Jaipur", country: "India", category: "Heritage", image: "/images/jaipur.jpg", rating: 4.6,
    description: "The Pink City of palaces, forts and vibrant bazaars." },
];

export const packages = [
  { id: 1, destinationId: 1, title: "Bali Tropical Escape", days: 5, price: 48000, rating: 4.8,
    inclusions: ["Return flights", "4-star resort stay", "Daily breakfast", "Airport transfers", "Ubud & Uluwatu tour"],
    itinerary: ["Arrival & beach evening", "Ubud temples & rice terraces", "Mount Batur sunrise trek", "Uluwatu temple & Kecak dance", "Departure"] },
  { id: 2, destinationId: 2, title: "Paris Romantic Getaway", days: 6, price: 95000, rating: 4.7,
    inclusions: ["Return flights", "Boutique hotel", "Seine river cruise", "Louvre entry ticket", "Breakfast"],
    itinerary: ["Arrival & Montmartre walk", "Eiffel Tower & Seine cruise", "Louvre & Latin Quarter", "Day trip to Versailles", "Shopping & free time", "Departure"] },
  { id: 3, destinationId: 3, title: "Maldives Luxury Retreat", days: 4, price: 120000, rating: 4.9,
    inclusions: ["Return flights", "Water villa stay", "All meals", "Speedboat transfers", "Snorkeling session"],
    itinerary: ["Arrival & villa check-in", "Snorkeling & sandbank picnic", "Sunset cruise & spa", "Departure"] },
  { id: 4, destinationId: 4, title: "Swiss Alps Adventure", days: 7, price: 135000, rating: 4.9,
    inclusions: ["Return flights", "Swiss travel pass", "Mountain hotels", "Jungfraujoch trip", "Breakfast & dinner"],
    itinerary: ["Arrival in Zurich", "Lucerne & Mount Pilatus", "Interlaken", "Jungfraujoch", "Zermatt & Matterhorn", "Scenic Glacier Express", "Departure"] },
  { id: 5, destinationId: 5, title: "Dubai Luxury Holiday", days: 5, price: 62000, rating: 4.6,
    inclusions: ["Return flights", "5-star hotel", "Desert safari with dinner", "Burj Khalifa entry", "City tour"],
    itinerary: ["Arrival & Marina walk", "Dubai city tour", "Burj Khalifa & Dubai Mall", "Desert safari", "Departure"] },
  { id: 6, destinationId: 6, title: "Goa Beach Vibes", days: 4, price: 18000, rating: 4.5,
    inclusions: ["Beach resort stay", "Breakfast", "North & South Goa tour", "Water sports pass"],
    itinerary: ["Arrival & Calangute beach", "North Goa forts & markets", "South Goa churches & beaches", "Departure"] },
  { id: 7, destinationId: 7, title: "Kerala Backwaters Bliss", days: 5, price: 26000, rating: 4.8,
    inclusions: ["Houseboat stay", "Munnar resort", "All breakfasts", "Private cab", "Ayurveda massage"],
    itinerary: ["Arrival in Kochi", "Munnar tea gardens", "Thekkady spice plantation", "Alleppey houseboat", "Departure"] },
  { id: 8, destinationId: 8, title: "Royal Rajasthan Jaipur", days: 3, price: 15000, rating: 4.6,
    inclusions: ["Heritage hotel", "Breakfast", "Amber Fort entry", "Local sightseeing cab"],
    itinerary: ["Arrival & Hawa Mahal", "Amber Fort & City Palace", "Bazaar shopping & departure"] },
];

export const getDestination = (id) => destinations.find((d) => d.id === Number(id));
export const getPackage = (id) => packages.find((p) => p.id === Number(id));
export const getPackageByDestination = (destId) => packages.find((p) => p.destinationId === destId);