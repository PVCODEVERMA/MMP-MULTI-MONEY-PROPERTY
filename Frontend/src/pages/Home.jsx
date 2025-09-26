import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PropertyDetailsModal from "../components/propertyCards/PropertyDetailsModal.jsx";


import FAQSection from "./FAQSection.jsx";
import PropertyTypesSection from "../components/propertyCards/PropertyTypesSection.jsx";
import TestimonialsSection from "../components/reviewComponents/TestimonialsSection.jsx";
import PropertyCategories from "../components/propertyCategories/PropertyCategories.jsx";
import Cta from "../components/ctaSection/Cta.jsx";

import PropertyExplore from "../components/catalog/PropertyExplore.jsx";

import ServicesSection from "./ServicesSection.jsx";
import HomeSection from "./HomeSection.jsx";
import TopProjects from "../components/propertyCards/TopProjects.jsx";
import TrendingInCards from "../components/propertyCards/TrendingInCards.jsx";

const Home = () => {
  const navigate = useNavigate();

  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);

  const handleGetStarted = () => navigate("/get-started");
  const handleBookDemo = () => navigate("/book-demo");

  return (
    <>
      <div className="min-h-screen bg-[#F7F7F7]">
        <HomeSection />

        {/* Property Types Section */}
        <PropertyTypesSection handleBookDemo={handleBookDemo} />

        <PropertyCategories />

       

        <Cta />
        <TopProjects />
          <PropertyDetailsModal
          isOpen={isPropertyModalOpen}
          onClose={() => setIsPropertyModalOpen(false)}
          property={selectedProperty}
        />
      </div>
       <TrendingInCards />
       <ServicesSection />
       <PropertyExplore />
      
      
    </>
  );
};

export default Home;
