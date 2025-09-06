
// Property Packages for Brokers
export const BROKER_PACKAGES = [
  {
    id: 1,
    name: 'Starter Pack',
    credits: 50,
    price: 2999,
    validity: 30,
    popular: false,
    description: 'Perfect for new brokers',
    features: [
      'WhatsApp notifications',
      'Email alerts',
      'Basic lead scoring',
      '24/7 support'
    ]
  },
  {
    id: 2,
    name: 'Professional Pack',
    credits: 150,
    price: 7999,
    validity: 30,
    popular: true,
    description: 'Most popular choice',
    features: [
      'Priority lead distribution',
      'Advanced lead scoring',
      'Detailed analytics',
      'WhatsApp & Email notifications',
      'Lead replacement guarantee'
    ]
  },
  {
    id: 3,
    name: 'Enterprise Pack',
    credits: 500,
    price: 19999,
    validity: 30,
    popular: false,
    description: 'For high-volume brokers',
    features: [
      'Premium lead quality',
      'Instant notifications',
      'Custom reporting',
      'Dedicated support manager',
      'API access'
    ]
  }
];

// Property Requirements (User submissions)
export const PROPERTY_REQUIREMENTS = [
  {
    id: 1,
    fullName: 'Priya Sharma',
    email: 'priya@gmail.com',
    phone: '+91 9876543210',
    propertyType: 'Apartment',
    transactionType: 'buy',
    budgetMin: 2500000,
    budgetMax: 3500000,
    bhkType: '3 BHK',
    city: 'Mumbai',
    state: 'Maharashtra',
    urgency: 'immediate',
    status: 'pending_verification',
    leadScore: 85,
    submittedAt: '2025-08-25T10:30:00Z',
    verifiedAt: null,
    assignedBrokers: []
  },
  {
    id: 2,
    fullName: 'Amit Patel',
    email: 'amit@yahoo.com',
    phone: '+91 9123456789',
    propertyType: 'Independent House',
    transactionType: 'rent',
    budgetMin: 25000,
    budgetMax: 40000,
    bhkType: '4 BHK',
    city: 'Pune',
    state: 'Maharashtra',
    urgency: '1-3 months',
    status: 'verified',
    leadScore: 72,
    submittedAt: '2025-08-24T15:45:00Z',
    verifiedAt: '2025-08-25T09:15:00Z',
    assignedBrokers: [3, 5, 7]
  }
];

// Brokers Database
export const BROKERS_DATA = [
  {
    id: 3,
    name: 'Rajesh Kumar',
    email: 'rajesh@email.com',
    phone: '+91 9988776655',
    companyId: 1,
    wallet: { balance: 15000, credits: 25 },
    specializations: ['Residential', 'Commercial'],
    locations: ['Mumbai', 'Pune'],
    performance: {
      totalLeads: 150,
      convertedLeads: 28,
      conversionRate: 18.7,
      avgResponseTime: 15, // minutes
      rating: 4.5
    },
    joinedAt: '2025-01-15T00:00:00Z',
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=f97316&color=fff'
  },
  {
    id: 5,
    name: 'Sneha Gupta',
    email: 'sneha@email.com',
    phone: '+91 8877665544',
    companyId: 1,
    wallet: { balance: 8500, credits: 12 },
    specializations: ['Residential'],
    locations: ['Delhi', 'Gurgaon'],
    performance: {
      totalLeads: 89,
      convertedLeads: 21,
      conversionRate: 23.6,
      avgResponseTime: 12,
      rating: 4.3
    },
    joinedAt: '2025-02-20T00:00:00Z',
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Sneha+Gupta&background=ec4899&color=fff'
  }
];

// Properties Database
export const PROPERTIES_DATA = [
  {
    id: 1,
    title: '3 BHK Luxury Apartment in Bandra',
    type: 'Apartment',
    price: 3200000,
    transactionType: 'buy',
    location: 'Bandra West, Mumbai',
    bhk: '3 BHK',
    area: 1200,
    amenities: ['Swimming Pool', 'Gym', 'Parking', 'Security'],
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400'
    ],
    status: 'approved',
    ownerId: 4,
    verifiedBy: 2,
    verifiedAt: '2025-08-20T10:00:00Z',
    submittedAt: '2025-08-18T14:30:00Z'
  },
  {
    id: 2,
    title: '2 BHK Modern Flat for Rent',
    type: 'Apartment',
    price: 35000,
    transactionType: 'rent',
    location: 'Koramangala, Bangalore',
    bhk: '2 BHK',
    area: 900,
    amenities: ['Elevator', 'Power Backup', 'CCTV'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400'
    ],
    status: 'pending_verification',
    ownerId: 4,
    verifiedBy: null,
    verifiedAt: null,
    submittedAt: '2025-08-25T09:15:00Z'
  }
];

// Lead Distribution History
export const LEAD_DISTRIBUTION_HISTORY = [
  {
    id: 1,
    leadId: 1,
    brokerId: 3,
    distributedAt: '2025-08-25T11:30:00Z',
    status: 'delivered',
    brokerResponse: 'contacted',
    responseTime: 8, // minutes
    feedback: 'genuine_lead'
  },
  {
    id: 2,
    leadId: 1,
    brokerId: 5,
    distributedAt: '2025-08-25T11:30:00Z',
    status: 'delivered',
    brokerResponse: 'pending',
    responseTime: null,
    feedback: null
  }
];

// Companies Database
export const COMPANIES_DATA = [
  {
    id: 1,
    name: 'Elite Properties Mumbai',
    adminId: 2,
    location: 'Mumbai, Maharashtra',
    activeBrokers: 15,
    totalLeads: 1240,
    revenue: 125000,
    status: 'active',
    subscription: 'premium',
    joinedAt: '2024-12-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Prime Realty Delhi',
    adminId: 6,
    location: 'Delhi, NCR',
    activeBrokers: 22,
    totalLeads: 1890,
    revenue: 189000,
    status: 'active',
    subscription: 'enterprise',
    joinedAt: '2024-11-15T00:00:00Z'
  }
];

// Analytics Data
export const ANALYTICS_DATA = {
  superAdmin: {
    totalCompanies: 12,
    totalBrokers: 186,
    totalLeads: 15420,
    totalRevenue: 2450000,
    monthlyGrowth: 23.5,
    leadQualityAvg: 78.2,
    conversionRate: 19.8,
    revenueByMonth: [
      { month: 'Jan', revenue: 180000 },
      { month: 'Feb', revenue: 220000 },
      { month: 'Mar', revenue: 195000 },
      { month: 'Apr', revenue: 285000 },
      { month: 'May', revenue: 320000 },
      { month: 'Jun', revenue: 298000 },
      { month: 'Jul', revenue: 355000 },
      { month: 'Aug', revenue: 425000 }
    ],
    leadsBySource: [
      { source: 'Website', leads: 8500, percentage: 55.1 },
      { source: 'Google Ads', leads: 3200, percentage: 20.8 },
      { source: 'Facebook', leads: 2100, percentage: 13.6 },
      { source: 'Referral', leads: 1620, percentage: 10.5 }
    ]
  },
  subAdmin: {
    totalBrokers: 15,
    totalLeads: 1240,
    revenue: 125000,
    avgLeadScore: 82.5,
    conversionRate: 21.3,
    topBrokers: [
      { name: 'Rajesh Kumar', leads: 150, conversion: 18.7 },
      { name: 'Sneha Gupta', leads: 89, conversion: 23.6 }
    ]
  },
  broker: {
    totalLeads: 150,
    convertedLeads: 28,
    pendingLeads: 8,
    rejectedLeads: 5,
    conversionRate: 18.7,
    avgResponseTime: 15,
    rating: 4.5,
    earnings: 84000,
    leadsThisMonth: [
      { date: '2025-08-01', leads: 5 },
      { date: '2025-08-05', leads: 8 },
      { date: '2025-08-10', leads: 12 },
      { date: '2025-08-15', leads: 6 },
      { date: '2025-08-20', leads: 10 },
      { date: '2025-08-25', leads: 4 }
    ]
  }
};
