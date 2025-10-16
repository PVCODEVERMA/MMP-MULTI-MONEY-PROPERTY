import { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import logo from "../../assets/componyLogos/logo.jpg";
import SubscribeForm from "../../pages/HomeSection/SubscribeForm";

const footerSections = [
  {
    title: "About & Info",
    links: [
      { name: "About Us", href: "/about" },
      { name: "FAQs", href: "/faqs" },
      { name: "How It Works / Process", href: "/how-it-works" },
      { name: "Testimonials / Reviews", href: "/testimonials" },
    ],
  },
  {
    title: "Property Leads",
    links: [
      { name: "All Properties", href: "/properties" },
      { name: "Buy Leads", href: "/buy-leads" },
      { name: "Sell Leads", href: "/sell-leads" },
      { name: "Featured Leads", href: "/featured-leads" },
    ],
  },
  {
    title: "Pricing / Plans",
    links: [
      { name: "Pricing / Subscription Plans", href: "/plans" },
      { name: "Custom Plan", href: "/plans" },
      { name: "Free Trial / Demo", href: "/plans" },
    ],
  },
  {
    title: "Dashboard / User Links",
    links: [
      { name: "Dashboard (view)", href: "/dashboard" },
      { name: "My Leads", href: "/my-leads" },
      { name: "Saved Properties", href: "/saved-properties" },
    ],
  },
  {
    title: "Support & Contact",
    links: [
      { name: "Contact Us", href: "/contact" },
      { name: "Support / Help Center", href: "/support" },
      { name: "Live Chat / WhatsApp", href: "/live-chat" },
    ],
  },
  {
    title: "Legal / Policy",
    links: [
      { name: "Terms & Conditions", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Refund / Cancellation Policy", href: "/refund-policy" },
    ],
  },
  // {
  //   title: "Extras / Marketing",
  //   links: [
  //     { name: "Blog / News", href: "/blog" },
  //     { name: "Partner With Us", href: "/partner" },
  //     { name: "Promotions / Offers", href: "/promotions" },
  //   ],
  // },
];

export default function FindByLeadsFooter() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <footer className="relative  isolate overflow-hidden bg-[#144155] text-neutral-300
                       before:absolute before:inset-0 before:-skew-y-3
                       before:bg-[linear-gradient(135deg,#113647_25%,transparent_25%),linear-gradient(135deg,transparent_75%,#113647_75%)]
                       before:bg-[length:100%_100%] before:opacity-60">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

        {/* MOBILE VIEW */}
        <div className="lg:hidden space-y-6">
          {/* Logo & Contact */}
          <div className="flex flex-col  gap-4 pb-4 border-b border-neutral-700">
            <img src={logo} className="w-32 h-auto  " alt="Multi Money Property" />
            <p className="text-sm text-neutral-200">
              Get buyer inquiries straight to your dashboard.
            </p>
            
            <div className="space-y-2 text-sm">
              <a href="tel:+919876543210" className="flex items-center gap-3 hover:text-[#ff9c00] transition-colors group">
                <span className="w-6 text-center">📞</span>
                +91 98765 43210
              </a>
              <a href="mailto:support@mmp.com" className="flex items-center gap-3 hover:text-[#ff9c00] transition-colors group">
                <span className="w-6 text-center">✉️</span>
                support@mmp.com
              </a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" 
                 className="flex items-center gap-3 text-[#ff9c00] hover:underline group">
                <span className="w-6 text-center">💬</span>
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Accordion Sections */}
          {footerSections.map((section, index) => (
            <div key={index} className="border-b border-neutral-700 pb-4">
              <button
                className="flex justify-between items-center w-full text-left text-white font-semibold py-2 hover:text-[#ff9c00] transition-colors"
                onClick={() => handleToggle(index)}
              >
                {section.title}
                <span className="text-[#ff9c00]">
                  {openIndex === index ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-48" : "max-h-0"
                }`}
              >
                <ul className="space-y-2 py-2 pl-4">
                  {section.links.map((link, liIndex) => (
                    <li key={liIndex}>
                      <a
                        href={link.href}
                        className="text-sm hover:text-[#ff9c00] transition-colors block py-1"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {/* Newsletter */}
          <div className="pt-4">
            <h3 className="text-lg font-semibold text-white mb-4">Your Property Updates</h3>
            <SubscribeForm />
          </div>
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden lg:grid grid-cols-12 gap-4">
          {/* Brand & Contact */}
          <div className="col-span-2 flex flex-col gap-4">
            <img src={logo} className="w-40 h-auto" alt="Multi Money Property" />
            <p className="text-sm text-neutral-200 leading-relaxed">
              Get Fresh Buyer Inquiries, Straight to Your Dashboard
            </p>
            
            <div className="mt-2 space-y-3">
              <a href="tel:+919876543210" className="flex items-center gap-3 hover:text-white transition-colors group">
                <span className="text-[#ff9c00] group-hover:scale-110 transition-transform">📞</span>
                <span>+91 98765 43210</span>
              </a>
              <a href="mailto:support@mmp.com" className="flex items-center gap-3 hover:text-white transition-colors group">
                <span className="text-[#ff9c00] group-hover:scale-110 transition-transform">✉️</span>
                <span>support@mmp.com</span>
              </a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" 
                 className="flex items-center gap-3 text-[#ff9c00] hover:underline group">
                <span className="group-hover:scale-110 transition-transform">💬</span>
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="col-span-7 grid grid-cols-3 gap-8">
            {footerSections.map((section, index) => (
              <div key={index} className="group">
                <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide border-b border-[#ff9c00] pb-2">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link, liIndex) => (
                    <li key={liIndex}>
                      <a
                        href={link.href}
                        className="text-sm hover:text-[#ff9c00] transition-colors block py-1 hover:translate-x-1 transform duration-200"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="w-85">
            <div className="bg-[#113647] rounded-lg p-6 border border-[#1e556d]">
              <h3 className="text-white font-semibold mb-4 text-lg">Remain Updated</h3>
              <p className="text-sm text-neutral-300 mb-4">
                Get the latest property leads and market insights delivered to your inbox.
              </p>
             <SubscribeForm />
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="relative border-t border-neutral-700 bg-[#113647]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-neutral-400 text-center sm:text-left">
              © {new Date().getFullYear()} MULTI MONEY PROPERTY. All rights reserved.
            </p>
            
            <div className="flex gap-4 text-lg">
              {[
                { Icon: FaYoutube, href: "https://www.youtube.com/@MMPProperty" },
                { Icon: FaFacebookF, href: "https://www.facebook.com/profile.php?id=61551135478843" },
                { Icon: FaTwitter, href: "https://x.com/MMP_8527" },
                { Icon: FaLinkedinIn, href: "https://www.linkedin.com/in/mmp-property-9b42b8387/" },
                { Icon: FaInstagram, href: "https://www.instagram.com/multimoneyproperty/" },
                { Icon: FaPinterestP, href: "https://www.pinterest.com/multimoneyproperty_8527/" },
              ].map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#144155] flex items-center justify-center 
                             hover:bg-[#ff9c00] hover:text-white transition-all duration-300 
                             border border-[#1e556d] hover:border-[#ff9c00] hover:scale-110"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}