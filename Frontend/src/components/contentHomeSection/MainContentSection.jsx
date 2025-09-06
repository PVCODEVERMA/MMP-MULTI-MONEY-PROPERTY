
import React from "react";
import EnhancedCardsSection from "./EnhancedCardsSection";
import RightSidebar from "./RightSidebar";


const MainContentSection = ({ handleGetStarted, handleBookDemo }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
        {/* Enhanced Cards Section - Left Side */}
        <div className="flex-1">
          

          <EnhancedCardsSection 
            handleGetStarted={handleGetStarted}
            handleBookDemo={handleBookDemo}
          />
        </div>

        {/* Right Sidebar */}
        <RightSidebar 
          handleGetStarted={handleGetStarted}
          handleBookDemo={handleBookDemo}
        />
      </div>
    </div>
  );
};

export default MainContentSection;
