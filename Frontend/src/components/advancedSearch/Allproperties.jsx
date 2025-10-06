import { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import {
  FunnelIcon,
  MagnifyingGlassIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Squares2X2Icon, Bars3Icon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import LocationSelector from "../locationSelector/LocationSelector.jsx";

// Importing images
import image01 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_01.avif";
import image02 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_02.avif";
import image03 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_03.avif";
import image04 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_04.avif";
import image05 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_05.avif";
import image06 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_06.avif";
import image07 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_07.avif";
import image08 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_08.avif";
import image09 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_09.avif";
import image10 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_10.avif";
import image11 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_11.avif";
import image12 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_12.avif";
import image13 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_13.avif";
import image14 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_14.avif";
import image15 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_15.avif";
import image16 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_16.avif";
import image17 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_17.avif";
import image18 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_18.avif";
import image19 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_19.avif";
import image20 from "../../assets/phome_Image/ExclusivePropertiesImg/photo_20.avif";

/* brand palette */
const C = { orange: "#ff9c00", navy: "#164057", bg: "#f7f7f7" };

/* ─── mock data ──────────────────────────────────────────── */

export const MOCK = [
  {
    id: 1,
    title: "Luxury Villa sale in OMR || Gated Community || Northeast",
    price: "₹2.55 Cr",
    bhk: "2 BHK Flat",
    tag: "Residential",
    images: 10,
    imgs: [image01, image02, image03],
    postedTime: "Today",
    location: "Delhi NCR",
  },
  {
    id: 2,
    title: "Farm Land for Sale || Nr Arakkonam || 4 Bore || Low Budget",
    price: "₹35 L",
    tag: "Commercial",
    images: 6,
    imgs: [image02],
    postedTime: "Yesterday",
    location: "New Delhi",
  },
  {
    id: 3,
    title: "Modern Apartment with City View || Prime Location",
    price: "₹1.2 Cr",
    tag: "Residential",
    images: 8,
    imgs: [image03],
    postedTime: "2 days ago",
    location: "Noida",
  },
  {
    id: 4,
    title: "Commercial Space in Business District || High ROI",
    price: "₹3.75 Cr",
    tag: "Commercial",
    images: 5,
    imgs: [image04],
    postedTime: "3 days ago",
    location: "Gurgaon",
  },
  {
    id: 5,
    title: "Spacious 3BHK Apartment || Family Friendly",
    price: "₹85 L",
    tag: "Residential",
    images: 7,
    imgs: [image05],
    postedTime: "Today",
    location: "Faridabad",
  },
  {
    id: 6,
    title: "Retail Shop in Mall || High Footfall Area",
    price: "₹1.5 Cr",
    tag: "Commercial",
    images: 4,
    imgs: [image06],
    postedTime: "Yesterday",
    location: "Mumbai",
  },
  {
    id: 7,
    title: "Luxury Penthouse with Terrace || Sea View",
    price: "₹4.2 Cr",
    tag: "Residential",
    images: 12,
    imgs: [image07],
    postedTime: "4 days ago",
    location: "Dubai",
  },
  {
    id: 8,
    title: "Warehouse for Rent || Logistics Hub",
    price: "₹2.1 Cr",
    tag: "Commercial",
    images: 3,
    imgs: [image08],
    postedTime: "1 week ago",
    location: "Delhi NCR",
  },
  {
    id: 9,
    title: "Villa with Private Pool || Gated Community",
    price: "₹3.8 Cr",
    tag: "Residential",
    images: 9,
    imgs: [image09],
    postedTime: "4 days ago",
    location: "New Delhi",
  },
  {
    id: 10,
    title: "Office Space in Tech Park || Ready to Move",
    price: "₹2.9 Cr",
    tag: "Commercial",
    images: 5,
    imgs: [image10],
    postedTime: "2 days ago",
    location: "Noida",
  },
  {
    id: 11,
    title: "2BHK Apartment || Green Surroundings",
    price: "₹65 L",
    tag: "Residential",
    images: 6,
    imgs: [image11],
    postedTime: "Today",
    location: "Gurgaon",
  },
  {
    id: 12,
    title: "Showroom on Main Road || High Visibility",
    price: "₹1.8 Cr",
    tag: "Commercial",
    images: 4,
    imgs: [image12],
    postedTime: "Yesterday",
    location: "Faridabad",
  },
  {
    id: 13,
    title: "Farmhouse with Organic Farm || Weekend Getaway",
    price: "₹2.5 Cr",
    tag: "Residential",
    images: 8,
    imgs: [image13],
    postedTime: "3 days ago",
    location: "Mumbai",
  },
  {
    id: 14,
    title: "Industrial Plot || Development Zone",
    price: "₹4.5 Cr",
    tag: "Commercial",
    images: 2,
    imgs: [image14],
    postedTime: "1 week ago",
    location: "Dubai",
  },
  {
    id: 15,
    title: "Studio Apartment || City Center",
    price: "₹45 L",
    tag: "Residential",
    images: 5,
    imgs: [image15],
    postedTime: "Yesterday",
    location: "Delhi NCR",
  },
  {
    id: 16,
    title: "Medical Clinic Space || Hospital Vicinity",
    price: "₹1.1 Cr",
    tag: "Commercial",
    images: 3,
    imgs: [image16],
    postedTime: "4 days ago",
    location: "New Delhi",
  },
  {
    id: 17,
    title: "Duplex Apartment || Modern Design",
    price: "₹1.7 Cr",
    tag: "Residential",
    images: 7,
    imgs: [image17],
    postedTime: "2 days ago",
    location: "Noida",
  },
  {
    id: 18,
    title: "Hotel for Sale || Tourist Destination",
    price: "₹5.2 Cr",
    tag: "Commercial",
    images: 11,
    imgs: [image18],
    postedTime: "1 week ago",
    location: "Gurgaon",
  },
  {
    id: 19,
    title: "4BHK Luxury Apartment || Premium Amenities",
    price: "₹2.3 Cr",
    tag: "Residential",
    images: 9,
    imgs: [image19],
    postedTime: "Today",
    location: "Faridabad",
  },
  {
    id: 20,
    title: "Commercial Land || Future Development Area",
    price: "₹3.2 Cr",
    tag: "Commercial",
    images: 4,
    imgs: [image20],
    postedTime: "3 days ago",
    location: "Mumbai",
  },
  {
    id: 21,
    title: "Luxury 2BHK Apartment || Gated Community",
    price: "₹2.55 Cr",
    bhk: "2 BHK Flat",
    tag: "Residential",
    images: 10,
    imgs: [image01, image02, image03],
    postedTime: "Today",
    location: "Delhi NCR",
  },
  {
    id: 22,
    title: "Modern 3BHK Apartment || City View",
    price: "₹1.9 Cr",
    bhk: "3 BHK Flat",
    tag: "Residential",
    images: 8,
    imgs: [image01, image02, image03],
    postedTime: "Yesterday",
    location: "Delhi NCR",
  },
  {
    id: 23,
    title: "Commercial Office Space || Tech Park",
    price: "₹3.2 Cr",
    tag: "Commercial",
    images: 6,
    imgs: [image01, image02, image03],
    postedTime: "2 days ago",
    location: "Delhi NCR",
  },
  {
    id: 24,
    title: "Villa with Garden || Premium Society",
    price: "₹4.5 Cr",
    bhk: "4 BHK Villa",
    tag: "Residential",
    images: 9,
    imgs: [image07, image08],
    postedTime: "3 days ago",
    location: "Delhi NCR",
  },
  {
    id: 25,
    title: "Retail Shop in Mall || High Footfall",
    price: "₹1.5 Cr",
    tag: "Commercial",
    images: 5,
    imgs: [image09],
    postedTime: "Yesterday",
    location: "Delhi NCR",
  },
  {
    id: 26,
    title: "Studio Apartment || Near Metro",
    price: "₹75 L",
    bhk: "1 BHK Flat",
    tag: "Residential",
    images: 4,
    imgs: [image10],
    postedTime: "Today",
    location: "Delhi NCR",
  },
  {
    id: 27,
    title: "Warehouse for Rent || Industrial Area",
    price: "₹2.1 Cr",
    tag: "Commercial",
    images: 6,
    imgs: [image11],
    postedTime: "1 week ago",
    location: "Delhi NCR",
  },
  {
    id: 28,
    title: "Luxury Penthouse || City Center",
    price: "₹5.2 Cr",
    bhk: "4 BHK Flat",
    tag: "Residential",
    images: 12,
    imgs: [image12, image13],
    postedTime: "2 days ago",
    location: "Delhi NCR",
  },
  {
    id: 29,
    title: "Medical Clinic Space || Prime Location",
    price: "₹1.1 Cr",
    tag: "Commercial",
    images: 3,
    imgs: [image14],
    postedTime: "3 days ago",
    location: "Delhi NCR",
  },
  {
    id: 30,
    title: "Duplex Apartment || Modern Interiors",
    price: "₹1.7 Cr",
    bhk: "3 BHK Duplex",
    tag: "Residential",
    images: 7,
    imgs: [image15],
    postedTime: "Yesterday",
    location: "Delhi NCR",
  },
  {
    id: 31,
    title: "Office Space in Business District",
    price: "₹2.9 Cr",
    tag: "Commercial",
    images: 5,
    imgs: [image16],
    postedTime: "2 days ago",
    location: "Delhi NCR",
  },
  {
    id: 32,
    title: "3BHK Apartment || Green Surroundings",
    price: "₹1.2 Cr",
    bhk: "3 BHK Flat",
    tag: "Residential",
    images: 8,
    imgs: [image17],
    postedTime: "Today",
    location: "Delhi NCR",
  },
  {
    id: 33,
    title: "Showroom on Main Road || High Visibility",
    price: "₹1.8 Cr",
    tag: "Commercial",
    images: 4,
    imgs: [image18],
    postedTime: "Yesterday",
    location: "Delhi NCR",
  },
  {
    id: 34,
    title: "Farmhouse with Organic Farm || Weekend Getaway",
    price: "₹2.5 Cr",
    bhk: "4 BHK Villa",
    tag: "Residential",
    images: 8,
    imgs: [image19],
    postedTime: "3 days ago",
    location: "Delhi NCR",
  },
  {
    id: 35,
    title: "Retail Space || Prime Market Area",
    price: "₹1.3 Cr",
    tag: "Commercial",
    images: 5,
    imgs: [image20],
    postedTime: "Today",
    location: "Delhi NCR",
  },
  {
    id: 36,
    title: "Luxury Apartment || Premium Amenities",
    price: "₹2.3 Cr",
    bhk: "3 BHK Flat",
    tag: "Residential",
    images: 9,
    imgs: [image20],
    postedTime: "Yesterday",
    location: "Delhi NCR",
  },
  {
    id: 37,
    title: "Industrial Plot || Development Zone",
    price: "₹4.5 Cr",
    tag: "Commercial",
    images: 3,
    imgs: [image02],
    postedTime: "1 week ago",
    location: "Delhi NCR",
  },
  {
    id: 38,
    title: "4BHK Luxury Apartment || Central Location",
    price: "₹3.8 Cr",
    bhk: "4 BHK Flat",
    tag: "Residential",
    images: 10,
    imgs: [image04],
    postedTime: "2 days ago",
    location: "Delhi NCR",
  },
  {
    id: 39,
    title: "Office Building || Fully Furnished",
    price: "₹5.2 Cr",
    tag: "Commercial",
    images: 12,
    imgs: [image02],
    postedTime: "3 days ago",
    location: "Delhi NCR",
  },
  {
    id: 40,
    title: "Penthouse Apartment || Sea View || Premium",
    price: "₹6.0 Cr",
    bhk: "5 BHK Flat",
    tag: "Residential",
    images: 12,
    imgs: [image01, image02, image03],
    postedTime: "Today",
    location: "Delhi NCR",
  },
  {
    id: 41,
    title: "Budget 1BHK Flat || Perfect for Singles",
    price: "₹28 L",
    bhk: "1 BHK Flat",
    tag: "Residential",
    images: 4,
    imgs: [image05],
    postedTime: "Today",
    location: "Noida",
  },
  {
    id: 42,
    title: "Restaurant Space || Food Court",
    price: "₹95 L",
    tag: "Commercial",
    images: 6,
    imgs: [image06],
    postedTime: "2 days ago",
    location: "Gurgaon",
  },
  {
    id: 43,
    title: "Luxury Farmhouse || Swimming Pool",
    price: "₹8.5 Cr",
    tag: "Residential",
    images: 15,
    imgs: [image07, image08],
    postedTime: "1 week ago",
    location: "New Delhi",
  },
  {
    id: 44,
    title: "Co-working Space || Fully Equipped",
    price: "₹1.4 Cr",
    tag: "Commercial",
    images: 7,
    imgs: [image09],
    postedTime: "Today",
    location: "Mumbai",
  },
  {
    id: 45,
    title: "2BHK Resale Flat || Well Maintained",
    price: "₹52 L",
    bhk: "2 BHK Flat",
    tag: "Residential",
    images: 5,
    imgs: [image10],
    postedTime: "Yesterday",
    location: "Faridabad",
  },
  {
    id: 46,
    title: "Gym Space || Commercial Complex",
    price: "₹75 L",
    tag: "Commercial",
    images: 4,
    imgs: [image11],
    postedTime: "3 days ago",
    location: "Dubai",
  },
  {
    id: 47,
    title: "Builder Floor || Independent Unit",
    price: "₹1.1 Cr",
    bhk: "3 BHK Floor",
    tag: "Residential",
    images: 6,
    imgs: [image12],
    postedTime: "Today",
    location: "Delhi NCR",
  },
  {
    id: 48,
    title: "Car Showroom || Main Road",
    price: "₹2.8 Cr",
    tag: "Commercial",
    images: 8,
    imgs: [image13],
    postedTime: "4 days ago",
    location: "Noida",
  },
  {
    id: 49,
    title: "Studio Apartment || Fully Furnished",
    price: "₹38 L",
    bhk: "1 BHK Flat",
    tag: "Residential",
    images: 5,
    imgs: [image14],
    postedTime: "Yesterday",
    location: "Gurgaon",
  },
  {
    id: 50,
    title: "Warehouse with Office || Industrial Area",
    price: "₹3.5 Cr",
    tag: "Commercial",
    images: 9,
    imgs: [image15],
    postedTime: "1 week ago",
    location: "New Delhi",
  }
];

export default function AllProperties() {
  const reduceMotion = useReducedMotion();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const propertyType = searchParams.get("propertyType");
  const itemsPerPage = 20;

  /* search + filter state */
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [q, setQ] = useState({
    location: "",
    propertyType: propertyType || "",
    budget: "",
    searchQuery: "",
    bhk: "",
    area: "",
    possession: "",
    postedBy: "",
    propertyAge: "",
    date: "",
  });

  const [cols, setCols] = useState(4);
  const toggleCols = () => setCols((c) => (c === 4 ? 2 : 4));
  const [sort, setSort] = useState("default");

  /* default date on first load */
  useEffect(() => {
    if (!q.date) {
      const today = new Date().toISOString().split("T")[0];
      setQ((s) => ({ ...s, date: today }));
    }
  }, []);

  /* helpers */
  const clearAdvanced = () =>
    setQ((s) => ({
      ...s,
      bhk: "",
      area: "",
      possession: "",
      postedBy: "",
      propertyAge: "",
    }));

  // Filter and sort properties based on search criteria
  const filteredProperties = useMemo(() => {
    let result = [...MOCK];

    // Apply search filters
    if (q.location) {
      result = result.filter((property) =>
        property.location.toLowerCase().includes(q.location.toLowerCase())
      );
    }

    if (q.propertyType) {
      result = result.filter(
        (property) =>
          property.tag.toLowerCase().includes(q.propertyType.toLowerCase()) ||
          (property.bhk &&
            property.bhk.toLowerCase().includes(q.propertyType.toLowerCase()))
      );
    }

    if (q.searchQuery) {
      const query = q.searchQuery.toLowerCase();
      result = result.filter(
        (property) =>
          property.title.toLowerCase().includes(query) ||
          property.location.toLowerCase().includes(query) ||
          property.tag.toLowerCase().includes(query)
      );
    }

    if (q.bhk) {
      result = result.filter(
        (property) =>
          property.bhk &&
          property.bhk.toLowerCase().includes(q.bhk.toLowerCase())
      );
    }

    if (q.budget) {
      result = result.filter((property) => {
        // Extract numeric price (convert Lakh/Cr to Lakhs)
        let price = parseFloat(property.price.replace(/[^0-9.]/g, ""));
        if (property.price.includes("Cr")) price = price * 100; // 1 Cr = 100 Lakhs

        if (q.budget === "Under 25 Lakhs") return price < 25;
        if (q.budget === "25-50 Lakhs") return price >= 25 && price <= 50;
        if (q.budget === "50-75 Lakhs") return price >= 50 && price <= 75;
        if (q.budget === "75L-1 Crore") return price >= 75 && price <= 100;
        if (q.budget === "1-2 Crores") return price >= 100 && price <= 200;
        if (q.budget === "2-5 Crores") return price >= 200 && price <= 500;
        if (q.budget === "5+ Crores") return price > 500;

        return true;
      });
    }

    if (q.postedBy) {
      // This would need actual data about who posted the property
      if (q.postedBy === "broker") {
        result = result.filter((property) => property.id % 2 === 0);
      } else if (q.postedBy === "user") {
        result = result.filter((property) => property.id % 2 !== 0);
      }
    }

    // Apply sorting
    if (sort === "latest") {
      // Sort by most recently posted (assuming id represents recency)
      result.sort((a, b) => b.id - a.id);
    } else if (sort === "low") {
      // Sort by price low to high
      result.sort((a, b) => {
        const priceA =
          parseFloat(a.price.replace(/[^0-9.]/g, "")) *
          (a.price.includes("Cr") ? 100 : 1);
        const priceB =
          parseFloat(b.price.replace(/[^0-9.]/g, "")) *
          (b.price.includes("Cr") ? 100 : 1);
        return priceA - priceB;
      });
    } else if (sort === "high") {
      // Sort by price high to low
      result.sort((a, b) => {
        const priceA =
          parseFloat(a.price.replace(/[^0-9.]/g, "")) *
          (a.price.includes("Cr") ? 100 : 1);
        const priceB =
          parseFloat(b.price.replace(/[^0-9.]/g, "")) *
          (b.price.includes("Cr") ? 100 : 1);
        return priceB - priceA;
      });
    }

    return result;
  }, [q, sort]);

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  // Calculate paginated data
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedData = filteredProperties.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Reset to first page when filters change
  useEffect(() => {
    setPage(1);
  }, [q, sort]);

  const pageButtons = () => {
    const buttons = [];
    const maxVisiblePages = 4;

    // Always show first page
    buttons.push(
      <button
        key={1}
        onClick={() => setPage(1)}
        className={`mx-1 px-3 py-1 rounded text-sm font-medium transition-colors cursor-pointer ${
          page === 1
            ? "bg-[#ff9c00] text-white shadow-md"
            : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
        }`}
      >
        1
      </button>
    );

    // Calculate start and end of visible page range
    let startPage = Math.max(2, page - 1);
    let endPage = Math.min(totalPages - 1, page + 1);

    // Adjust if we're near the beginning
    if (page <= 3) {
      endPage = Math.min(totalPages - 1, maxVisiblePages);
    }

    // Adjust if we're near the end
    if (page >= totalPages - 2) {
      startPage = Math.max(2, totalPages - maxVisiblePages + 1);
    }

    // Add ellipsis after first page if needed
    if (startPage > 2) {
      buttons.push(
        <span key="ellipsis1" className="mx-1 text-gray-600">
          …
        </span>
      );
    }

    // Add page numbers in the middle
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`mx-1 px-3 py-1 rounded text-sm font-medium transition-colors cursor-pointer ${
            page === i
              ? "bg-[#ff9c00] text-white shadow-md"
              : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          {i}
        </button>
      );
    }

    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      buttons.push(
        <span key="ellipsis2" className="mx-1 text-gray-600">
          …
        </span>
      );
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      buttons.push(
        <button
          key={totalPages}
          onClick={() => setPage(totalPages)}
          className={`mx-1 px-3 py-1 rounded text-sm font-medium transition-colors cursor-pointer ${
            page === totalPages
              ? "bg-[#ff9c00] text-white shadow-md"
              : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  /* ───────────────────────── render ───────────────────────── */
  return (
    <>
      <section className=" bg-[#f7f7f7] py-10">
        {/* search bar */}
        <div className="">
          <div className="text-sm flex items-center ml-5 lg:ml-40 ">
            <Link
              to="/"
              className="text-[#FF9C00] text-sm"
            >
              Home
            </Link>
            <button
              onClick={() => navigate(-1)}
              className=" transition-colors duration-200 cursor-pointer"
              aria-label="Back"
            >
              <div className="text-[#FF9C00]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
            </button>
            Advanced Search
          </div>
          <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-3 lg:gap-4">
            {/* Location - always visible */}
            <div className="w-full lg:flex-1">
              <LocationSelector
                selectedLocation={q.location}
                onLocationChange={(loc) =>
                  setQ((s) => ({ ...s, location: loc }))
                }
                onClear={() => setQ((s) => ({ ...s, location: "" }))}
                placeholder="Search location…"
              />
            </div>

            {/* Property type - hidden on mobile */}
            <div className="relative w-full lg:w-48 hidden lg:block">
              <HomeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#ff9c00]" />
              <select
                value={q.propertyType}
                onChange={(e) =>
                  setQ((s) => ({ ...s, propertyType: e.target.value }))
                }
                className="w-full pl-12 pr-3 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-[#ff9c00] focus:border-[#e49618] transition-colors cursor-pointer"
              >
                <option className="cursor-pointer" value="">
                  Property type...
                </option>
                {["Residential", "Commercial"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Budget - hidden on mobile */}
            <div className="relative w-full lg:w-48 hidden lg:block">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-[#ff9c00]">
                ₹
              </span>
              <select
                value={q.budget}
                onChange={(e) =>
                  setQ((s) => ({ ...s, budget: e.target.value }))
                }
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl bg-white cursor-pointer focus:ring-2 focus:ring-[#ff9c00] focus:border-[#e89918] transition-colors"
              >
                <option value="">Budget...</option>
                {[
                  "Under 25 Lakhs",
                  "25-50 Lakhs",
                  "50-75 Lakhs",
                  "75L-1 Crore",
                  "1-2 Crores",
                  "2-5 Crores",
                  "5+ Crores",
                ].map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Keyword - hidden on mobile */}
            <div className="relative w-full lg:w-64 hidden lg:block">
              <input
                type="text"
                placeholder="Enter city, area, or property name…"
                value={q.searchQuery}
                onChange={(e) =>
                  setQ((s) => ({ ...s, searchQuery: e.target.value }))
                }
                className="w-full pr-12 pl-4 py-3 border border-gray-300 bg-white rounded-xl focus:ring-2 focus:ring-[#ff9c00] focus:border-[#ff9c00] transition-colors"
              />
              <MagnifyingGlassIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#FF9c00]  font-bold" />
            </div>

            {/* Mobile search - visible only on mobile */}
            <div className="flex gap-1">
              <div className="relative w-[87%] lg:hidden">
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={q.searchQuery}
                  onChange={(e) =>
                    setQ((s) => ({ ...s, searchQuery: e.target.value }))
                  }
                  className="w-full pr-12 pl-4 py-3 border border-gray-300 bg-white rounded-xl focus:ring-2 focus:ring-[#ff9c00] focus:border-[#ff9c00] transition-colors"
                />
                <MagnifyingGlassIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
              </div>

              {/* Filters toggle */}
              <button
                onClick={() => setShowAdvanced((s) => !s)}
                className="lg:w-auto flex items-center  gap-2 px-4 py-3 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-800 hover:text-white cursor-pointer transition-colors"
              >
                <FunnelIcon className="w-5 h-5" />
                <span className="hidden lg:inline">Filters</span>
              </button>
            </div>
          </div>

          {/* advanced filters */}
          <AnimatePresence>
            {showAdvanced && (
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={reduceMotion ? false : { opacity: 0, height: 0 }}
                className="border-t border-gray-200"
              >
                <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {/* Close button for mobile */}
                  <button
                    onClick={() => setShowAdvanced(false)}
                    className="absolute top-4 right-4 lg:hidden p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors cursor-pointer"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>

                  {/* BHK */}
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      BHK Type
                    </label>
                    <select
                      value={q.bhk}
                      onChange={(e) =>
                        setQ((s) => ({ ...s, bhk: e.target.value }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg cursor-pointer focus:ring-2 focus:ring-[#ff9c00] focus:border-[#ff9c00] transition-colors"
                    >
                      <option value="">Any</option>
                      {["1", "2", "3", "4", "4+"].map((n) => (
                        <option key={n} value={n}>
                          {n} BHK
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Area */}
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Area (sq.ft)
                    </label>
                    <select
                      value={q.area}
                      onChange={(e) =>
                        setQ((s) => ({ ...s, area: e.target.value }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg cursor-pointer focus:ring-2 focus:ring-[#ff9c00] focus:border-[#ff9c00] transition-colors"
                    >
                      <option value="">Any</option>
                      {[
                        "0-500",
                        "500-1000",
                        "1000-1500",
                        "1500-2000",
                        "2000+",
                      ].map((r) => (
                        <option key={r}>{r}</option>
                      ))}
                    </select>
                  </div>

                  {/* Property Type (visible in advanced filters on mobile) */}
                  <div className="lg:hidden">
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Property Type
                    </label>
                    <select
                      value={q.propertyType}
                      onChange={(e) =>
                        setQ((s) => ({ ...s, propertyType: e.target.value }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg cursor-pointer focus:ring-2 focus:ring-[#ff9c00] focus:border-[#ff9c00] transition-colors"
                    >
                      <option value="">Any</option>
                      {[
                        "Residential",
                        "Commercial",
                        "1 BHK",
                        "2 BHK",
                        "3 BHK",
                        "4+ BHK",
                        "Villa",
                        "Plot",
                        "Office Space",
                        "Shop/Retail",
                        "Warehouse",
                      ].map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  {/* Budget (visible in advanced filters on mobile) */}
                  <div className="lg:hidden">
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Budget
                    </label>
                    <select
                      value={q.budget}
                      onChange={(e) =>
                        setQ((s) => ({ ...s, budget: e.target.value }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg cursor-pointer focus:ring-2 focus:ring-[#ff9c00] focus:border-[#ff9c00] transition-colors"
                    >
                      <option value="">Any</option>
                      {[
                        "Under 25 Lakhs",
                        "25-50 Lakhs",
                        "50-75 Lakhs",
                        "75L-1 Crore",
                        "1-2 Crores",
                        "2-5 Crores",
                        "5+ Crores",
                      ].map((b) => (
                        <option key={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  {/* Posted By */}
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Posted By
                    </label>
                    <select
                      value={q.postedBy}
                      onChange={(e) =>
                        setQ((s) => ({ ...s, postedBy: e.target.value }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9c00] focus:border-[#ff9c00] transition-colors cursor-pointer"
                    >
                      <option value="">Anyone</option>
                      <option value="broker">Broker</option>
                      <option value="user">User</option>
                    </select>
                  </div>

                  {/* Property Age */}
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Property Age
                    </label>
                    <select
                      value={q.propertyAge}
                      onChange={(e) =>
                        setQ((s) => ({ ...s, propertyAge: e.target.value }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9c00] focus:border-[#ff9c00] transition-colors cursor-pointer"
                    >
                      <option value="">Any</option>
                      {["0-1", "1-5", "5-10", "10+"].map((a) => (
                        <option key={a} value={a}>
                          {a} yrs
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Apply */}
                  <div className="flex items-end col-span-full sm:col-span-1 md:col-span-2 lg:col-span-1">
                    <button
                      onClick={() => setShowAdvanced(false)}
                      className="w-full px-4 py-2 bg-[#ff9c00] text-white rounded-lg hover:bg-[#ff9c00] transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* reset */}
                <div className="max-w-7xl mx-auto px-4 pb-4 text-right">
                  <button
                    onClick={clearAdvanced}
                    className="text-sm text-gray-500 hover:text-[#ff9c00] transition-colors cursor-pointer py-2 "
                  >
                    Clear filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* main content */}
        <div className="max-w-7xl mx-auto px-4 gap-2">
          {/* header */}
          <header className="">
            <h2 className="text-3xl font-semibold text-gray-800 relative inline-block group">
              Property listing
              <span className="absolute left-0 bottom-0 h-1 w-[4%] bg-[#ff9c00] transition-all duration-500 group-hover:w-full"></span>
            </h2>

            <p className="text-gray-500 mt-1">
              {filteredProperties.length === MOCK.length
                ? `There are currently ${MOCK.length} properties.`
                : `Showing ${filteredProperties.length} of ${MOCK.length} properties.`}
            </p>
          </header>

          {/* sort + layout toggle */}
          <div className="flex flex-row sm:flex-row justify-end gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-gray-700 text-sm">Sort by:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-[#ff9c00] focus:border-[#ff9c00] transition-colors cursor-pointer"
              >
                <option value="default">Default sorting</option>
                <option value="latest">Latest</option>
                <option value="low">Price: Low → High</option>
                <option value="high">Price: High → Low</option>
              </select>
            </div>

            <button
              onClick={toggleCols}
              className="p-2 border border-gray-300 rounded-lg bg-white shadow-sm hover:bg-gray-50 transition-colors flex items-center gap-2 self-start sm:self-auto cursor-pointer"
              title={cols === 4 ? "Switch to list view" : "Switch to grid view"}
            >
              {cols === 4 ? (
                <>
                  <Bars3Icon className="h-5 w-5 text-gray-600" />
                  <span className="text-sm text-gray-700">List View</span>
                </>
              ) : (
                <>
                  <Squares2X2Icon className="h-5 w-5 text-gray-600" />
                  <span className="text-sm text-gray-700">Grid View</span>
                </>
              )}
            </button>
          </div>

          {/* cards grid */}
          {filteredProperties.length > 0 ? (
            <div
              className={`grid gap-6 ${
                cols === 4
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1 lg:grid-cols-2"
              }`}
            >
            {/* path="/all-properties/:location" */}

              {paginatedData.map((card) => (
                <Link  
                  key={card.id}
                  to={`/property/${card.id}`}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow block"
                >
                  <div className="relative">
                    <img
                      src={card.imgs?.[0]}
                      alt={card.title}
                      className="h-48 w-full object-cover"
                    />
                    {/* badges */}
                    <span className="absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded text-white bg-[#ff9c00]">
                      {card.tag}
                    </span>
                    <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
                      {card.images} photos
                    </span>
                    <span className="absolute bottom-2 left-2 bg-white px-2 py-1 text-sm font-bold rounded text-gray-800 shadow-sm">
                      {card.price}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800">
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {card.location}
                    </p>
                    <p className="text-xs text-gray-400">{card.postedTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No properties found matching your criteria.
              </p>
              <button
                onClick={() =>
                  setQ({
                    location: "",
                    propertyType: "",
                    budget: "",
                    searchQuery: "",
                    bhk: "",
                    area: "",
                    possession: "",
                    postedBy: "",
                    propertyAge: "",
                    date: q.date,
                  })
                }
                className="mt-4 px-6 py-2 bg-[#FF9C00] text-white rounded-lg hover:bg-[#ff9c00] transition-colors cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* pagination footer */}
          {filteredProperties.length > 0 && totalPages > 1 && (
            <div className="flex justify-center items-center mt-10 gap-2">
              {/* Prev Button */}
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors cursor-pointer ${
                  page === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                Prev
              </button>

              {/* Page Numbers */}
              {pageButtons()}

              {/* Next Button */}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors cursor-pointer ${
                  page === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}