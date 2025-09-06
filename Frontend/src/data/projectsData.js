import ahmedabaadImag from "../assets/projectListing/Ahmedabad.avif";
import bangaloreImag from "../assets/projectListing/Bangalore.avif";
import bangaloreImag02 from "../assets/projectListing/Bangalore02.avif";
import chennaiImag from "../assets/projectListing/chennai.avif";
import hadapsarImag from "../assets/projectListing/Hadapsar.avif";
import mumbaiImag from "../assets/projectListing/mumbai.avif";
import gurgaonImg from "../assets/projectListing/Gurgaon.avif";

export const projectsData = [
  { 
    id: 1, 
    name: "Godrej Greens", 
    city: "Ahmedabad", 
    area: "Prahlad Nagar",
    priceRange: "₹60L - 1.2Cr", 
    description: "Luxury apartments with modern amenities and green spaces",
    photo: ahmedabaadImag,
    type: "apartment",
    bedrooms: 3,
    bathrooms: 2,
    size: "1200 sq ft",
    featured: true,
    sponsored: false,
    leads: 42,
    date: "2023-10-15",
    developer: "Godrej Properties",
    status: "Under Construction",
    possession: "Dec 2024",
    amenities: ["Swimming Pool", "Gym", "Park", "Clubhouse", "Children's Play Area", "24/7 Security"],
    overview: "Godrej Greens offers luxurious 3 BHK apartments in the prime location of Prahlad Nagar, Ahmedabad.",
    hasSubscriptionPlans: true,
    subscriptionPlans: [
      {
        id: 1,
        name: "Basic View",
        price: "₹299",
        duration: "7 days",
        features: ["View Contact Details", "Direct Call Access", "Basic Property Info"]
      },
      {
        id: 2,
        name: "Premium Access", 
        price: "₹999",
        duration: "30 days",
        features: ["All Basic Features", "Virtual Tour Access", "Exclusive Offers", "Priority Support"]
      },
      {
        id: 3,
        name: "VIP Package",
        price: "₹2499",
        duration: "90 days",
        features: ["All Premium Features", "Site Visit Coordination", "Negotiation Support", "Loan Assistance"]
      }
    ],
    images: [ahmedabaadImag, bangaloreImag, chennaiImag]
  },
  { 
    id: 2, 
    name: "DLF Park", 
    city: "Gurgaon", 
    area: "Sector 56",
    priceRange: "₹80L - 2.0Cr", 
    description: "Premium residential complex with world-class facilities",
    photo: gurgaonImg,
    type: "villa",
    bedrooms: 4,
    bathrooms: 3,
    size: "2400 sq ft",
    featured: true,
    sponsored: true,
    leads: 38,
    date: "2023-11-05",
    developer: "DLF Limited",
    status: "Ready to Move",
    possession: "Immediate",
    hasSubscriptionPlans: false,
    landPlans: {
      totalArea: "50 acres",
      plotSizes: ["30x40 ft", "40x60 ft", "60x80 ft"],
      amenities: ["Club House", "Swimming Pool", "Tennis Court", "Jogging Track"],
      infrastructure: ["Wide Roads", "Underground Electricity", "Sewage System", "Water Supply"],
      pricing: {
        "30x40": "₹45L",
        "40x60": "₹75L", 
        "60x80": "₹1.2Cr"
      }
    },
    images: [gurgaonImg, bangaloreImag]
  },
  { 
    id: 3, 
    name: "Sobha Elite", 
    city: "Bangalore", 
    area: "Whitefield",
    priceRange: "₹1Cr - 3Cr", 
    description: "Elegant living spaces with panoramic city views",
    photo: bangaloreImag,
    type: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    size: "1100 sq ft",
    featured: true,
    sponsored: false,
    leads: 56,
    date: "2023-09-22",
    hasSubscriptionPlans: true,
    subscriptionPlans: [
      {
        id: 1,
        name: "Starter Plan",
        price: "₹499",
        duration: "15 days",
        features: ["Contact Details", "Floor Plans", "Amenity Details"]
      },
      {
        id: 2,
        name: "Explorer Plan",
        price: "₹1299",
        duration: "45 days", 
        features: ["All Starter Features", "3D Virtual Tour", "Builder Connect", "Price Negotiation Tips"]
      }
    ],
    images: [bangaloreImag, chennaiImag]
  },
  // Add more projects...
];

export const cities = [...new Set(projectsData.map(project => project.city))];
export const propertyTypes = [...new Set(projectsData.map(project => project.type))];
