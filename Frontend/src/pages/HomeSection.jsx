import React, { useEffect, useState } from 'react';
import Ads from '../components/ctaSection/Ads';

const HomeSection = () => {
  const [showHeading, setShowHeading] = useState(false);

  
  
  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setShowHeading(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className=" flex items-center justify-center bg-[#f7f7f7] p-6">
      <div className='flex gap-48'>
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated Heading */}
          <h2 className={`text-4xl md:text-5xl font-bold text-[#15056] mb-12 overflow-hidden`}>
            <span className={`text-[#154056] inline-block transition-all duration-700 ease-out ${showHeading ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
              Find What You're Looking For
            </span>
          </h2>
          
          <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-12">
            {/* Find By Property Button */}
            <a 
              href="/all-properties" 
              className="group relative w-full md:w-1/2 max-w-md"
            >
              <div className="relative h-24 overflow-hidden rounded-2xl bg-[#F7F7F7] shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl">
                {/* Multi-color animated border */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#FF9C00] via-[#154056] to-[#F7F7F7] opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-border-rotate"></div>
                
                <div className="absolute inset-0 bg-gradient-to-r from-[#F7F7F7] to-[#e8e8e8] opacity-100 group-hover:opacity-0 transition-opacity duration-500 rounded-2xl"></div>
                
                <div className="relative h-full flex items-center justify-between px-8 z-10 bg-[#F7F7F7] rounded-2xl m-0.5">
                  <span className="text-2xl font-bold text-[#154056]">Find By Property</span>
                  
                  <div className="flex items-center">
                    <div className="relative w-14 h-12 flex items-center justify-center overflow-hidden">
                      {/* Original arrow that hides on hover */}
                      <div className="w-12 h-12 rounded-full bg-[#FF9C00] flex items-center justify-center transform transition-all duration-500 ease-out group-hover:opacity-0 group-hover:translate-x-7">
                        <svg 
                          className="w-6 h-6 text-white transform transition-transform duration-300" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                      {/* Secondary arrow that appears on hover */}
                      <div className="absolute right-0 w-12 h-12 rounded-full bg-[#154056] flex items-center justify-center transform translate-x-12 group-hover:translate-x-0 transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100">
                        <svg 
                          className="w-6 h-6 text-white" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
            
            {/* Find By Leads Button */}
            <a 
              href="/home/leads" 
              className="group relative w-full md:w-1/2 max-w-md"
            >
              <div className="relative h-24 overflow-hidden rounded-2xl bg-[#F7F7F7] shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl">
                {/* Multi-color animated border */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#FF9C00] via-[#154056] to-[#F7F7F7] opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-border-rotate"></div>
                
                <div className="absolute inset-0 bg-gradient-to-l from-[#F7F7F7] to-[#e8e8e8] opacity-100 group-hover:opacity-0 transition-opacity duration-500 rounded-2xl"></div>
                
                <div className="relative h-full flex items-center justify-between px-8 z-10 bg-[#F7F7F7] rounded-2xl m-0.5">
                  <span className="text-2xl font-bold text-[#154056]">Find By Leads</span>
                  
                  <div className="flex items-center">
                    <div className="relative w-14 h-12 flex items-center justify-center overflow-hidden">
                      {/* Original arrow that hides on hover */}
                      <div className="w-12 h-12 rounded-full bg-[#FF9C00] flex items-center justify-center transform transition-all duration-500 ease-out group-hover:opacity-0 group-hover:translate-x-7">
                        <svg 
                          className="w-6 h-6 text-white transform transition-transform duration-300" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                      {/* Secondary arrow that appears on hover */}
                      <div className="absolute right-0 w-12 h-12 rounded-full bg-[#154056] flex items-center justify-center transform translate-x-12 group-hover:translate-x-0 transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100">
                        <svg 
                          className="w-6 h-6 text-white" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>

        <div className="hidden sm:block mt-4 sm:mt-0 sm:ml-6">
          <Ads />
        </div>
      </div>
      
      <style jsx>{`
        @keyframes border-rotate {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .animate-border-rotate {
          background-size: 200% 200%;
          animation: border-rotate 2s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default HomeSection;