import React, { useEffect, useState } from "react";
import {
  CheckIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import {
  VideoCameraIcon,
  PaintBrushIcon,
  ChatBubbleLeftRightIcon,
  MegaphoneIcon,
  HeartIcon,
  PhoneIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/solid";

// data
export const ADD_ONS = [
  {
    name: "Landing Page Creation",
    price: "₹5,999/-",
    description: "Custom designed landing page for your campaign",
    popular: true,
    icon: <BuildingStorefrontIcon className="h-6 w-6" />,
  },
  {
    name: "Video Editing Creation (30–60 sec)",
    price: "₹799/-",
    description: "Professional video editing for social media",
    icon: <VideoCameraIcon className="h-6 w-6" />,
  },
  {
    name: "Poster/Creative Design",
    price: "₹299/-",
    description: "Eye-catching designs for your marketing needs",
    icon: <PaintBrushIcon className="h-6 w-6" />,
  },
  {
    name: "Bulk WhatsApp Broadcast Tool",
    price: "₹0.13/paise",
    description: "Reach multiple contacts at once",
    popular: true,
    icon: <MegaphoneIcon className="h-6 w-6" />,
  },
  {
    name: "WhatsApp Chatbot Setup",
    price: "₹9,000/-",
    description: "Automate customer interactions",
    effective: true,
    icon: <ChatBubbleLeftRightIcon className="h-6 w-6" />,
  },
  {
    name: "Google & YouTube Ads",
    price: "₹15,000/-",
    description: "Maximize your reach with targeted ads",
    icon: <HeartIcon className="h-6 w-6" />,
  },
  {
    name: "Facebook & Instagram Ads",
    price: "₹12,000/-",
    description: "Engage your audience on social media",
    icon: <HeartIcon className="h-6 w-6" />,
  },
  {
    name: "Lead Nurturing Follow-up Service",
    price: "₹7,000/-",
    description: "Convert leads into customers",
    icon: <HeartIcon className="h-6 w-6" />,
  },
  {
    name: "Toll-Free Number + IVR (1 Year)",
    price: "₹17,000/-",
    description: "Professional customer service solution",
    icon: <PhoneIcon className="h-6 w-6" />,
  },
];

export default function AddOnsPricing({ brand }) {
  const theme = {
    primary: brand?.primary ?? "#164058",
    accent: brand?.accent ?? "#FF9C00",
    light: brand?.light ?? "#E1EFFE",
  };

  const [visibleItems, setVisibleItems] = useState([]);
  const [selected, setSelected] = useState(() => new Set());

  useEffect(() => {
    const timers = [];
    ADD_ONS.forEach((_, i) => {
      const t = setTimeout(() => {
        setVisibleItems((v) => {
          if (v.includes(i)) return v;
          return [...v, i];
        });
      }, 100 * i + 200);
      timers.push(t);
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  const toggleSelect = (index) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const calculateTotal = () => {
    let total = 0;
    selected.forEach((index) => {
      const priceText = ADD_ONS[index].price;
      const priceValue = parseFloat(priceText.replace(/[^0-9.]/g, ""));
      if (!isNaN(priceValue)) {
        total += priceValue;
      }
    });
    return total.toLocaleString("en-IN", { maximumFractionDigits: 2 });
  };

  const navigate = useNavigate();

  const [sliderRef] = useKeenSlider({
    loop: false,
    slides: { perView: 1.1, spacing: 12 },
    breakpoints: {
      "(min-width: 640px)": { slides: { perView: 2, spacing: 16 } },
      "(min-width: 1024px)": { slides: { perView: 3, spacing: 20 } },
    },
  });

  return (
    <section className="mt-8 md:mt-12 bg-[#f7f7f7] py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-[#164058]">
              MMP <span className="text-[#ff9c00]">Add-On </span> Services
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl">
              Enhance your marketing efforts with our premium add-on services.
              Real-time leads with 30-minute contact guarantee.
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex justify-center md:justify-end">
            <div className="flex items-center bg-[#0F2C3A] rounded-xl px-4 py-3 shadow-sm animate-pulse">
              <InformationCircleIcon className="h-6 w-6 text-orange-500 mr-2" />
              <span className="text-sm font-medium text-white">
                Contact within 30 minutes of leads received!
              </span>
            </div>
          </div>
        </div>

        {/* Slider wrapper */}
        <div
          ref={sliderRef}
          className="keen-slider block sm:hidden bg-white rounded-2xl border border-gray-100 p-6 shadow-lg sm:shadow-none"
        >
          {ADD_ONS.map(
            ({ name, price, description, popular, effective, icon }, i) => {
              const isVisible = visibleItems.includes(i);
              const isSelected = selected.has(i);

              return (
                <div key={name} className="keen-slider__slide block sm:hidden  ">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => toggleSelect(i)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleSelect(i);
                      }
                    }}
                    className={`flex flex-col border-2 rounded-xl p-5 transition-all duration-500 ease-out cursor-pointer h-full
                    ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }
                    ${
                      isSelected
                        ? "ring-4 scale-[1.02]"
                        : "border-gray-200 hover:border-orange-300 hover:shadow-lg"
                    }
                  `}
                    style={{
                      transformOrigin: "center",
                      boxShadow: isSelected
                        ? `0 10px 40px ${theme.primary}30`
                        : undefined,
                      transitionDelay: `${i * 50}ms`,
                      borderColor: isSelected ? theme.accent : "",
                      background: isSelected
                        ? `linear-gradient(${theme.light}20, white)`
                        : "white",
                    }}
                  >
                    {/* Card content */}
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div
                            className="p-2 rounded-lg mr-3"
                            style={{
                              backgroundColor: isSelected
                                ? `${theme.accent}20`
                                : `${theme.primary}10`,
                              color: isSelected ? theme.accent : theme.primary,
                            }}
                          >
                            {icon}
                          </div>
                          <h4 className="font-semibold text-gray-800 text-lg">
                            {name}
                          </h4>
                        </div>
                        {(popular || effective) && (
                          <div
                            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                              popular
                                ? "bg-[#ff9c00] text-white"
                                : "bg-amber-400 text-white"
                            } animate-bounce`}
                          >
                            {popular ? "Popular" : "Effective"}
                          </div>
                        )}
                      </div>
                      <p className="text-gray-500 text-sm mt-3 pl-11">
                        {description}
                      </p>
                    </div>

                    {/* Bottom: price + button */}
                    <div className="mt-auto pt-6 flex items-center justify-between">
                      <span
                        className="text-xl font-bold"
                        style={{ color: theme.primary }}
                      >
                        {price}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSelect(i);
                        }}
                        className={`text-sm font-semibold rounded-lg px-4 py-2.5 transition-all duration-300 cursor-pointer flex items-center
                        ${
                          isSelected
                            ? "bg-orange-500 text-white hover:bg-orange-600"
                            : "bg-gray-800 text-white hover:bg-orange-500"
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <CheckIcon className="h-4 w-4 mr-1" />
                            Selected
                          </>
                        ) : (
                          "Add"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>

        {/* Tablet & Desktop: Grid visible */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-6 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
          {ADD_ONS.map(
            ({ name, price, description, popular, effective, icon }, i) => {
              const isVisible = visibleItems.includes(i);
              const isSelected = selected.has(i);

              return (
                <div key={name} className="keen-slider__slide">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => toggleSelect(i)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleSelect(i);
                      }
                    }}
                    className={`flex flex-col border-2 rounded-xl p-5 transition-all duration-500 ease-out cursor-pointer h-full
                    ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }
                    ${
                      isSelected
                        ? "ring-4 scale-[1.02]"
                        : "border-gray-200 hover:border-orange-300 hover:shadow-lg"
                    }
                  `}
                    style={{
                      transformOrigin: "center",
                      boxShadow: isSelected
                        ? `0 10px 40px ${theme.primary}30`
                        : undefined,
                      transitionDelay: `${i * 50}ms`,
                      borderColor: isSelected ? theme.accent : "",
                      background: isSelected
                        ? `linear-gradient(${theme.light}20, white)`
                        : "white",
                    }}
                  >
                    {/* Card content */}
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div
                            className="p-2 rounded-lg mr-3"
                            style={{
                              backgroundColor: isSelected
                                ? `${theme.accent}20`
                                : `${theme.primary}10`,
                              color: isSelected ? theme.accent : theme.primary,
                            }}
                          >
                            {icon}
                          </div>
                          <h4 className="font-semibold text-gray-800 text-lg">
                            {name}
                          </h4>
                        </div>
                        {(popular || effective) && (
                          <div
                            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                              popular
                                ? "bg-[#ff9c00] text-white"
                                : "bg-amber-400 text-white"
                            } animate-bounce`}
                          >
                            {popular ? "Popular" : "Effective"}
                          </div>
                        )}
                      </div>
                      <p className="text-gray-500 text-sm mt-3 pl-11">
                        {description}
                      </p>
                    </div>

                    {/* Bottom: price + button */}
                    <div className="mt-auto pt-6 flex items-center justify-between">
                      <span
                        className="text-xl font-bold"
                        style={{ color: theme.primary }}
                      >
                        {price}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSelect(i);
                        }}
                        className={`text-sm font-semibold rounded-lg px-4 py-2.5 transition-all duration-300 cursor-pointer flex items-center
                        ${
                          isSelected
                            ? "bg-orange-500 text-white hover:bg-orange-600"
                            : "bg-gray-800 text-white hover:bg-orange-500"
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <CheckIcon className="h-4 w-4 mr-1" />
                            Selected
                          </>
                        ) : (
                          "Add"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>

        {/* Footer actions */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-gray-800 text-lg">
              <span className="font-medium">
                {selected.size} add-on(s) selected
              </span>
              {selected.size > 0 && (
                <span className="ml-2 font-bold">
                  - Total: ₹{calculateTotal()}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSelected(new Set())}
                className="text-sm px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-red-500 hover:text-white hover:border-red-500 cursor-pointer transition-all duration-300 flex items-center"
                disabled={selected.size === 0}
              >
                <XMarkIcon className="h-4 w-4 mr-1" />
                Clear All
              </button>
              <button
                type="button"
                onClick={() => {
                  const picked = Array.from(selected).map((i) => ADD_ONS[i]);
                  navigate(`/payment?plan=Starter Plan`, {
                    state: { addOns: picked },
                  });
                }}
                className="text-sm px-5 py-3 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-all duration-300 font-medium cursor-pointer shadow-md hover:shadow-lg transform hover:scale-105"
                disabled={selected.size === 0}
              >
                Continue with {selected.size} Add-ons
              </button>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-6 text-center">
          Prices are exclusive of 18% GST. GST will be added at invoice.
        </p>
      </div>
    </section>
  );
}
