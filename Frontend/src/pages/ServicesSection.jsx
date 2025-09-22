import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

import BuyIcon from "../assets/serviceSectionicon/icons/home_02.svg";
import SellIcon from "../assets/serviceSectionicon/icons/home_03.svg";
import PostIcon from "../assets/serviceSectionicon/icons/add-property.svg";
import BannerImage from "../assets/serviceSectionicon/icons/BannerImage.png";
import ModelImage from "../assets/serviceSectionicon/icons/ModelImage.png";

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: "Buy a new home",
      desc: "Find your dream home with MMP. We make the buying process smooth and stress-free.",
      cta: "Buy a house",
      link: "/all-properties",
      image: BuyIcon,
    },
     {
      id: 2,
      title: "Post a new property",
      desc: "List your property on MMP and reach thousands of buyers and renters quickly and securely.",
      cta: "Post property",
      link: "/post-property",
      image: PostIcon,
    },
    {
      id: 3,
      title: "Find a Broker",
      desc: "Connect with trusted brokers on MMP to help you buy, sell, or rent properties with confidence.",
      cta: "View brokers",
      link: "/brokers",
      image: SellIcon,
    },
   
  ];

  return (
    <section className="bg-[#f7f7f7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        
        {/* Cards section */}
        <div>
          {/* Desktop stacked cards */}
          <div className="hidden sm:flex flex-col space-y-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl shadow-md p-6 flex items-start gap-4 hover:shadow-lg transition-all"
              >
                <img src={service.image} alt={service.title} className="w-16 h-16 object-contain" />
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#164057] mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-3">{service.desc}</p>
                  <a
                    href={service.link}
                    className="text-[#ff9c00] font-semibold inline-flex items-center hover:underline"
                  >
                    {service.cta}
                    <ArrowRightIcon className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile horizontal scroll */}
          <div className="sm:hidden flex gap-6 overflow-x-auto snap-x snap-mandatory px-2 scrollbar-hide">
            {services.map((service) => (
              <div
                key={service.id}
                className="w-[90%] bg-white rounded-2xl shadow-lg p-6 flex-shrink-0 snap-center flex items-start gap-4 mx-auto"
              >
                <img src={service.image} alt={service.title} className="w-14 h-14 object-contain" />
                <div>
                  <h3 className="text-base font-bold text-[#164057] mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{service.desc}</p>
                  <a
                    href={service.link}
                    className="text-[#ff9c00] font-semibold inline-flex items-center hover:underline text-sm"
                  >
                    {service.cta}
                    <ArrowRightIcon className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side with background + model overlay */}
        <div className="relative w-full h-96 sm:h-[500px] lg:min-h-[600px]">
          <img
            src={BannerImage}
            alt="City view"
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
          />
          <img
            src={ModelImage}
            alt="Smiling woman holding house frame"
            className="absolute bottom-0 -translate-x-12 max-h-[90%] object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
