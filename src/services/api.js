import axios from 'axios';

export const DB_SERVER = import.meta.env.VITE_DB_SERVER || 'https://style-decore-server-dun.vercel.app/';

// Format base URL ensuring trailing slash handling
const getBaseUrl = () => {
  let url = DB_SERVER.trim();
  if (!url.endsWith('/')) {
    url += '/';
  }
  return url;
};

const apiClient = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Generic helper with endpoint fallbacks
async function fetchWithFallback(endpoints, fallbackData = []) {
  for (const ep of endpoints) {
    try {
      const response = await apiClient.get(ep);
      if (response.data) {
        if (Array.isArray(response.data) && response.data.length > 0) {
          return response.data;
        } else if (response.data.services && Array.isArray(response.data.services)) {
          return response.data.services;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          return response.data.data;
        }
      }
    } catch (err) {
      // Continue to next endpoint attempt
    }
  }
  return fallbackData;
}

// Default MongoDB Services collection (matches MongoDB Atlas 'diddy' database 'Services' collection)
export const MONGODB_SERVICES = [
  {
    _id: "6a63b04a55c3223af2c66fba",
    id: "srv-06",
    name: "Sunset Waterfront Luxury Gala Pavilion",
    category: "Luxury Gala",
    price: 3200,
    rating: 5.0,
    reviewCount: 15,
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "An ultra-luxurious outdoor pavilion experience equipped with mirrored ambient lighting, crystal chandeliers, floral arches, VIP lounge seating, and automated stage pyrotechnics for unforgettable gala events.",
    whatsIncluded: [
      "Mirrored Ambient Lighting",
      "Crystal Chandeliers & Floral Arches",
      "VIP Lounge Seating",
      "Stage Pyrotechnics & Audio"
    ],
    popular: true,
    newest: true,
    estimatedDuration: "8 Hours Setup",
    availableDecorators: ["dec-1", "dec-3"]
  },
  {
    _id: "6a63b04a55c3223af2c66fbb",
    id: "srv-05",
    name: "Grand Festival Illuminations & Light Show",
    category: "Festival",
    price: 890,
    rating: 4.85,
    reviewCount: 31,
    image: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Breathtaking light installation for Christmas, New Year, Diwali, or seasonal grand celebrations.",
    whatsIncluded: [
      "LED Canopy",
      "Custom Light Sculptures",
      "Sound-Synced Controller",
      "Safety Inspection"
    ],
    popular: true,
    newest: false,
    estimatedDuration: "4 Hours Setup",
    availableDecorators: ["dec-2", "dec-4"]
  },
  {
    _id: "6a63b04a55c3223af2c66fc1",
    id: "srv-01",
    name: "Royal Opulence Wedding Canopy",
    category: "Wedding",
    price: 2450,
    rating: 4.95,
    reviewCount: 48,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Transform your wedding venue into a fairytale palace with floor-to-ceiling silk drapes, crystal chandeliers, floral mandap arches, and ambient fairy light pathways.",
    whatsIncluded: [
      "Silk Drapery",
      "Crystal Chandeliers",
      "Fresh Floral Arch",
      "RGB Ambient Lighting"
    ],
    popular: true,
    newest: false,
    estimatedDuration: "6 Hours Setup",
    availableDecorators: ["dec-1", "dec-2"]
  },
  {
    _id: "6a63b04a55c3223af2c66fc2",
    id: "srv-02",
    name: "Ethereal Celestial Birthday Lounge",
    category: "Birthday",
    price: 1200,
    rating: 4.88,
    reviewCount: 29,
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "A magical night-sky themed birthday installation featuring neon custom signboards, balloon garlands, velvet seating, and holographic backdrop walls.",
    whatsIncluded: [
      "Custom LED Neon Name",
      "Organic Balloon Garland",
      "Velvet Couch Lounge",
      "Photo Wall Backdrop"
    ],
    popular: true,
    newest: true,
    estimatedDuration: "3.5 Hours Setup",
    availableDecorators: ["dec-2", "dec-3"]
  },
  {
    _id: "6a63b04a55c3223af2c66fc3",
    id: "srv-03",
    name: "Executive Corporate Gala Stage",
    category: "Corporate",
    price: 1850,
    rating: 4.90,
    reviewCount: 19,
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Sleek, modern corporate event stage design with LED video wall frames, branded podiums, minimalist geometric arches, and high-impact spotlighting.",
    whatsIncluded: [
      "Branded Stage Backdrop",
      "Spotlight Towers",
      "VIP Speaker Podium",
      "Modular Lounge Furniture"
    ],
    popular: false,
    newest: false,
    estimatedDuration: "5 Hours Setup",
    availableDecorators: ["dec-1", "dec-4"]
  },
  {
    _id: "6a63b04a55c3223af2c66fc4",
    id: "srv-04",
    name: "Boho Chic Outdoor Garden Soirée",
    category: "Outdoor",
    price: 950,
    rating: 4.92,
    reviewCount: 42,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Organic bohemian garden setup with macramé tapestries, low picnic tables, floor cushions, pampa grass arrangements, and string light canopies.",
    whatsIncluded: [
      "Low Picnic Seating",
      "Pampa Grass Florals",
      "String Lighting Canopy",
      "Rug & Cushion Styling"
    ],
    popular: true,
    newest: false,
    estimatedDuration: "3 Hours Setup",
    availableDecorators: ["dec-3", "dec-4"]
  }
];

export const apiService = {
  // Services
  getServices: async (fallback = []) => {
    const remoteData = await fetchWithFallback(
      [
        'services',
        'Services',
        'service',
        'Service',
        'all-services',
        'allServices',
        'services/all',
        'service/all',
        'api/services',
        'api/Services',
        'Services/find',
        'services/find'
      ],
      []
    );

    if (Array.isArray(remoteData) && remoteData.length > 0) {
      return remoteData;
    }

    if (Array.isArray(fallback) && fallback.length > 0) {
      return fallback;
    }

    return MONGODB_SERVICES;
  },

  addService: async (serviceData) => {
    const endpoints = ['services', 'Services', 'add-service', 'service'];
    for (const ep of endpoints) {
      try {
        const res = await apiClient.post(ep, serviceData);
        if (res.data) return res.data;
      } catch (e) {
        console.warn(`Failed POST to ${ep}`, e.message);
      }
    }
    return serviceData;
  },

  // Bookings
  getBookings: async (fallback = []) => {
    return await fetchWithFallback(['bookings', 'Bookings', 'booking', 'my-bookings', 'all-bookings'], fallback);
  },

  addBooking: async (bookingData) => {
    const endpoints = ['bookings', 'Bookings', 'add-booking', 'booking'];
    for (const ep of endpoints) {
      try {
        const res = await apiClient.post(ep, bookingData);
        if (res.data) return res.data;
      } catch (e) {
        console.warn(`Failed POST to ${ep}`, e.message);
      }
    }
    return bookingData;
  },

  updateBooking: async (bookingId, updatedFields) => {
    const endpoints = [`bookings/${bookingId}`, `booking/${bookingId}`, `Bookings/${bookingId}`];
    for (const ep of endpoints) {
      try {
        const res = await apiClient.put(ep, updatedFields);
        if (res.data) return res.data;
      } catch (e) {
        console.warn(`Failed PUT to ${ep}`, e.message);
      }
    }
    return { id: bookingId, ...updatedFields };
  },

  // Decorators
  getDecorators: async (fallback = []) => {
    return await fetchWithFallback(['decorators', 'Decorators', 'decorator'], fallback);
  },

  addDecorator: async (decoratorData) => {
    const endpoints = ['decorators', 'Decorators', 'decorator'];
    for (const ep of endpoints) {
      try {
        const res = await apiClient.post(ep, decoratorData);
        if (res.data) return res.data;
      } catch (e) {
        console.warn(`Failed POST to ${ep}`, e.message);
      }
    }
    return decoratorData;
  },

  // Reviews
  getReviews: async (fallback = []) => {
    return await fetchWithFallback(['reviews', 'Reviews', 'review'], fallback);
  },

  addReview: async (reviewData) => {
    const endpoints = ['reviews', 'Reviews', 'review'];
    for (const ep of endpoints) {
      try {
        const res = await apiClient.post(ep, reviewData);
        if (res.data) return res.data;
      } catch (e) {
        console.warn(`Failed POST to ${ep}`, e.message);
      }
    }
    return reviewData;
  }
};
