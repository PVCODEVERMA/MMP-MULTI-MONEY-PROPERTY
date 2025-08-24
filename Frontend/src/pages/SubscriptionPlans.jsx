import React, { useState, useEffect } from "react";
import FAQSection from "./FAQSection";
// import TrustedBySection from "./TrustedBySection";

const packages = [
  {
    id: "starter",
    name: "Starter",
    monthly: 5000,
    yearly: 5000 * 12 * 0.67,
    quota: 10,
    description: "Ideal for new brokers just getting started.",
    features: [
      "2000 active Leads",
      "6000 Emails per month",
      "Unlimited Email Warm Up",
      "Unlimited Email Accounts",
      "Dynamic IP Addresses",
      "Centralised Master Inbox",
      "Dynamic Sequences",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    monthly: 10000,
    yearly: 10000 * 12 * 0.67,
    quota: 25,
    description: "Recommended for brokers scaling up their business.",
    features: [
      "up to 12M Active Lead Credits",
      "Dynamic Sequences",
      "up to 60M Email Credits (p/m)",
      "Custom CRM",
      "Unlimited Email Warm Up",
      "Email Guide Assistance",
      "Unlimited Email Accounts",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    monthly: 20000,
    yearly: 20000 * 12 * 0.67,
    quota: 60,
    description: "Perfect for high-volume brokers with priority support.",
    recommended: true,
    features: [
      "up to 12M Active Lead Credits",
      "Dynamic Sequences",
      "up to 60M Email Credits (p/m)",
      "Custom CRM",
      "Unlimited Email Warm Up",
      "Email Guide Assistance",
      "Unlimited Email Accounts",
    ],
  },
];

export default function SubscriptionPlans() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingType, setBillingType] = useState("monthly");
  const [isAnimating, setIsAnimating] = useState(false);

  // Animation for billing toggle
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [billingType]);

  const handleBuyNow = (e, plan) => {
    e.stopPropagation();
    
    // Animation effect
    const button = e.target;
    button.classList.add("animate-ping");
    
    setTimeout(() => {
      button.classList.remove("animate-ping");
      alert(
        `Selected plan: ${plan.name}\nBilling: ${
          billingType.charAt(0).toUpperCase() + billingType.slice(1)
        }`
      );
    }, 600);
  };

  return (
    <>
      {/* Pricing Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6 animate-fade-in-down">
          Choose Your Subscription Plan
        </h1>
        <p className="text-center text-gray-600 mb-10 animate-fade-in-up">
          Flexible plans for every stage of your growth
        </p>

        {/* Billing toggle */}
        <div className="flex justify-center items-center mb-10">
          <span
            className={`mr-2 font-semibold transition-colors duration-300 ${
              billingType === "monthly" ? "text-blue-700" : "text-gray-500"
            }`}
          >
            Monthly
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={billingType === "yearly"}
              onChange={() =>
                setBillingType(
                  billingType === "monthly" ? "yearly" : "monthly"
                )
              }
              className="sr-only"
            />
            <div className={`w-14 h-7 bg-gray-300 rounded-full p-1 transition-all duration-300 ${isAnimating ? 'scale-110' : ''}`}>
              <div
                className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-all duration-300 ${
                  billingType === "yearly" ? "translate-x-7 bg-green-500" : ""
                }`}
              ></div>
            </div>
          </label>
          <span
            className={`ml-2 font-semibold transition-colors duration-300 ${
              billingType === "yearly" ? "text-green-700" : "text-gray-500"
            }`}
          >
            Yearly{" "}
            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded ml-1 animate-pulse">
              Save 33%
            </span>
          </span>
        </div>

        {/* Plans */}
        <div className="grid gap-8 md:grid-cols-3">
          {packages.map((plan, index) => {
            const price =
              billingType === "monthly" ? plan.monthly : Math.round(plan.yearly);

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`cursor-pointer border rounded-2xl p-8 shadow-md transition-all duration-300 relative overflow-hidden
                  ${selectedPlan === plan.id
                    ? "border-blue-600 bg-blue-50 scale-105 shadow-lg"
                    : "border-gray-200 bg-white hover:scale-105"
                  }
                  ${plan.recommended ? "ring-2 ring-green-500" : ""}
                  animate-fade-in-up
                `}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.recommended && (
                  <div className="absolute top-0 right-0">
                    <div className="absolute transform rotate-45 bg-green-500 text-center text-white font-semibold py-1 right-[-35px] top-[20px] w-[170px]">
                      Recommended
                    </div>
                  </div>
                )}
                
                <div className="relative">
                  <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <div className="mb-4">
                    <p className="text-4xl font-extrabold text-indigo-700 mb-0">
                      ₹{price.toLocaleString()}
                    </p>
                    <p className="text-lg font-medium text-gray-500 -mt-1">
                      {billingType === "yearly" ? "per year" : "per month"}
                    </p>
                  </div>
                  <p className="mb-6 text-green-600 font-semibold flex items-center">
                    <span className="mr-2">Lead Quota:</span>
                    <span className="text-xl animate-bounce">{plan.quota}</span>
                    <span className="ml-1">/month</span>
                  </p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-gray-700 transition-transform duration-200 hover:translate-x-1"
                      >
                        <span className="text-green-500 text-xl">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-3 rounded-xl font-semibold text-lg mt-2 transition-all duration-300 relative overflow-hidden group
                      ${selectedPlan === plan.id
                        ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg cursor-default"
                        : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl"
                      }
                    `}
                    disabled={selectedPlan === plan.id}
                    onClick={(e) => handleBuyNow(e, plan)}
                  >
                    <span className="relative z-10">
                      {selectedPlan === plan.id ? (
                        <span className="flex items-center justify-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          Selected
                        </span>
                      ) : (
                        "Buy Now"
                      )}
                    </span>
                    
                    {/* Animated background effect for button */}
                    {selectedPlan !== plan.id && (
                      <>
                        <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                        <span className="absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white to-transparent opacity-40"></span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trusted By */}
      {/* <TrustedBySection /> */}

      {/* FAQ */}
      <FAQSection />

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16 px-6 text-center mt-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 animate-pulse">
          Ready to see if we're a good fit?
        </h2>
        <p className="text-gray-600 mb-8 text-lg">
          Start your 30-day free trial today — no credit card or commitment
          required.
        </p>
        <button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
          Get Started
        </button>
      </div>

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-down {
          animation: fadeInDown 0.6s ease-out forwards;
        }
        
        .animate-fade-in-up {
          opacity: 0;
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </>
  );
}