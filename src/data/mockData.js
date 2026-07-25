export const INITIAL_BOOKINGS = [
  {
    id: 'BK-2026-8812',
    userId: 'user-01',
    userName: 'Samantha Reed',
    userEmail: 'samantha.reed@example.com',
    serviceId: 'srv-01',
    serviceName: 'Grand Royal Wedding Stage & Canopy',
    serviceCategory: 'Wedding',
    serviceImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
    amount: 1850,
    serviceType: 'On-Site Decoration',
    date: '2026-08-15',
    time: '14:00',
    location: '742 Grand View Ballroom, Metropolitan District',
    specialNotes: 'Focus on warm blush orchids and golden accent candlesticks for head table.',
    status: 'Setup in Progress',
    decoratorId: 'dec-01',
    decoratorName: 'Elena Rostova',
    paymentStatus: 'Paid',
    paymentMethod: 'Stripe Card (**** 4242)',
    createdAt: '2026-07-20T10:15:00Z',
    statusHistory: [
      { status: 'Assigned', timestamp: '2026-07-20T10:15:00Z', note: 'Booking confirmed and assigned to Lead Designer Elena Rostova.' },
      { status: 'Planning Phase', timestamp: '2026-07-21T09:00:00Z', note: '3D spatial plan and floral selection finalized.' },
      { status: 'Materials Prepared', timestamp: '2026-07-23T14:30:00Z', note: 'Fresh orchids loaded and stage trusses checked.' },
      { status: 'On the Way', timestamp: '2026-07-24T08:00:00Z', note: 'Design team en route to Grand View Ballroom.' },
      { status: 'Setup in Progress', timestamp: '2026-07-24T10:00:00Z', note: 'Chandelier rigging and backdrop erection underway.' }
    ]
  },
  {
    id: 'BK-2026-9043',
    userId: 'user-02',
    userName: 'David Miller',
    userEmail: 'david.m@example.com',
    serviceId: 'srv-02',
    serviceName: 'Ethereal Pastels Birthday Party Setup',
    serviceCategory: 'Birthday',
    serviceImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=1200',
    amount: 650,
    serviceType: 'On-Site Decoration',
    date: '2026-07-28',
    time: '11:00',
    location: '18 West Sunset Drive, Apt 4B',
    specialNotes: 'Child turning 5! Prefers dusty rose and sage green colors.',
    status: 'Planning Phase',
    decoratorId: 'dec-05',
    decoratorName: 'Sophia Martinez',
    paymentStatus: 'Paid',
    paymentMethod: 'Stripe Card (**** 8888)',
    createdAt: '2026-07-22T16:20:00Z',
    statusHistory: [
      { status: 'Assigned', timestamp: '2026-07-22T16:20:00Z', note: 'Assigned to Sophia Martinez.' },
      { status: 'Planning Phase', timestamp: '2026-07-23T11:00:00Z', note: 'Color swatch approved by client.' }
    ]
  },
  {
    id: 'BK-2026-9110',
    userId: 'user-01',
    userName: 'Samantha Reed',
    userEmail: 'samantha.reed@example.com',
    serviceId: 'srv-04',
    serviceName: 'Boho Minimalist Housewarming Decor',
    serviceCategory: 'Housewarming',
    serviceImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200',
    amount: 480,
    serviceType: 'Consultation',
    date: '2026-08-02',
    time: '16:00',
    location: 'Virtual Zoom Consultation',
    specialNotes: 'Advice on indoor plant placement and fairy lights.',
    status: 'Assigned',
    decoratorId: 'dec-03',
    decoratorName: 'Aria Sterling',
    paymentStatus: 'Paid',
    paymentMethod: 'Google Pay',
    createdAt: '2026-07-24T09:00:00Z',
    statusHistory: [
      { status: 'Assigned', timestamp: '2026-07-24T09:00:00Z', note: 'Consultation session scheduled.' }
    ]
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev-01',
    serviceId: 'srv-01',
    userName: 'Charlotte Harrison',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: 'StyleDecor exceeded all our wedding expectations! Elena and the team transformed our venue into a magical fairytale. Every guest was taking photos at the stage!',
    date: 'July 18, 2026'
  },
  {
    id: 'rev-02',
    serviceId: 'srv-01',
    userName: 'Liam Thorne',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: 'Punctual, super professional, and the attention to lighting detail was incredible. Highly recommend their royal canopy package.',
    date: 'June 30, 2026'
  },
  {
    id: 'rev-03',
    serviceId: 'srv-02',
    userName: 'Jessica Taylor',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    rating: 4.8,
    comment: 'The balloon garland was huge and stayed perfect for two whole days after the party. The neon sign added such a fun vibe!',
    date: 'July 10, 2026'
  }
];

export const COVERAGE_ZONES = [
  {
    id: 'cz-01',
    name: 'Metropolitan Downtown Core',
    coordinates: [37.7749, -122.4194],
    radiusKm: 15,
    activeDecorators: 12,
    description: 'Full 24/7 priority dispatch for hotels, ballrooms, and corporate high-rises.'
  },
  {
    id: 'cz-02',
    name: 'North Bay Estates',
    coordinates: [37.8044, -122.2712],
    radiusKm: 25,
    activeDecorators: 8,
    description: 'Specialized outdoor vineyard setups, estate weddings, and garden pavilions.'
  },
  {
    id: 'cz-03',
    name: 'Westside Residential & Coast',
    coordinates: [37.7599, -122.4820],
    radiusKm: 20,
    activeDecorators: 10,
    description: 'Beachfront setups, luxury residential housewarmings, and birthday lounge decor.'
  },
  {
    id: 'cz-04',
    name: 'East Valley Tech & Business Hub',
    coordinates: [37.6879, -122.1562],
    radiusKm: 30,
    activeDecorators: 7,
    description: 'Corporate annual galas, tech summits, and stage installations.'
  }
];

export const FAQ_ITEMS = [
  {
    category: 'Booking & Scheduling',
    question: 'How far in advance should I book my decoration service?',
    answer: 'We recommend booking grand wedding stages and corporate galas 4–8 weeks in advance. Birthday party and housewarming setups can usually be scheduled with 3–5 days notice subject to decorator availability.'
  },
  {
    category: 'On-Site Setup',
    question: 'Do I need to provide tools or ladders for the setup team?',
    answer: 'No! Our decorators bring full professional gear including scaffolding, LED controllers, heavy-duty rigging, steamers, and fresh floral preservers. We handle everything end-to-end.'
  },
  {
    category: 'Customization & Pricing',
    question: 'Can I request custom color palettes or specific flower types?',
    answer: 'Absolutely! Every service package can be customized. You can discuss specific color codes, brand colors, or rare floral imports directly with your assigned Lead Designer during the planning phase.'
  },
  {
    category: 'Cancellations & Refunds',
    question: 'What is StyleDecor’s cancellation policy?',
    answer: 'Cancellations made 7+ days prior to the event date receive a 100% full refund. Cancellations within 48–72 hours receive an 80% refund due to custom floral order lock-in.'
  },
  {
    category: 'Service Area',
    question: 'What happens if my event venue is outside your coverage map?',
    answer: 'We frequently accommodate destination events and venues beyond our core radius! Contact our support team for a custom travel logistics quote.'
  }
];

export const MONTHLY_REVENUE_DATA = [
  { month: 'Jan', revenue: 18400, bookings: 24 },
  { month: 'Feb', revenue: 22100, bookings: 31 },
  { month: 'Mar', revenue: 26500, bookings: 38 },
  { month: 'Apr', revenue: 31000, bookings: 42 },
  { month: 'May', revenue: 42500, bookings: 58 },
  { month: 'Jun', revenue: 54000, bookings: 72 },
  { month: 'Jul', revenue: 49800, bookings: 66 }
];

export const SERVICE_DEMAND_DATA = [
  { category: 'Wedding', count: 84, percentage: 38 },
  { category: 'Birthday', count: 52, percentage: 24 },
  { category: 'Corporate', count: 35, percentage: 16 },
  { category: 'Festival', count: 28, percentage: 12 },
  { category: 'Luxury Gala', count: 22, percentage: 10 }
];

export const BOOKINGS_HISTOGRAM_DATA = [
  { day: 'Mon', count: 6 },
  { day: 'Tue', count: 8 },
  { day: 'Wed', count: 12 },
  { day: 'Thu', count: 18 },
  { day: 'Fri', count: 34 },
  { day: 'Sat', count: 48 },
  { day: 'Sun', count: 39 }
];
