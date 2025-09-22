import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PropertyDetailsModal from "../components/propertyCards/PropertyDetailsModal.jsx";
import BlurText from "../shadcnComponent/BlurText.jsx";

import MainContentSection from "../components/contentHomeSection/MainContentSection.jsx";
import FAQSection from "./FAQSection.jsx";
import PropertyTypesSection from "../components/propertyCards/PropertyTypesSection.jsx";
import TestimonialsSection from "../components/reviewComponents/TestimonialsSection.jsx";
import PropertyCategories from "../components/propertyCategories/PropertyCategories.jsx";
import Cta from "../components/ctaSection/Cta.jsx";
import Ads from "../components/ctaSection/Ads.jsx";
import PropertyExplore from "../components/catalog/PropertyExplore.jsx";
import TopProjects from "../components/propertyCards/TopProjects.jsx";
import TrendingInCards from "../components/propertyCards/TrendingInCards.jsx";
import ServicesSection from "./ServicesSection.jsx";
import HomeSection from "./HomeSection.jsx";

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

        

        {/* Exclusive Owner Properties in New Delhi sections */}
        {/* <ExclusiveOwnerProperties
          handleGetStarted={handleGetStarted}
          handleBookDemo={handleBookDemo}
          reduceMotion={reduceMotion}
        /> */}
        <PropertyCategories />

        <ServicesSection />

        <Cta />

        <MainContentSection
          handleGetStarted={handleGetStarted}
          handleBookDemo={handleBookDemo}
        />

        {/* Property modal */}
        <PropertyDetailsModal
          isOpen={isPropertyModalOpen}
          onClose={() => setIsPropertyModalOpen(false)}
          property={selectedProperty}
        />
      </div>
      <TestimonialsSection />
      <PropertyExplore />
      <FAQSection />

       {/* tranding card component  */}
        {/* <TrendingInCards /> */}

        {/* top projects card component  */}
        {/* <TopProjects /> */}
    </>
  );
};

export default Home;
