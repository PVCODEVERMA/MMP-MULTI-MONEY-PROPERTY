import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
} from "react-icons/fa";
import logo from "../../assets/componyLogos/logo.jpg";
import SubscribeForm from "../../pages/HomeSection/SubscribeForm";
import BackToTop from "../../common/BackToTop";
import ChatBot from "../../chatBot/ChatBot";

export default function Footer() {
  return (
    <footer
      className="relative isolate overflow-hidden bg-[#144155] text-neutral-300
                 before:absolute before:inset-0 before:-skew-y-3
                 before:bg-[linear-gradient(135deg,#113647_25%,transparent_25%),linear-gradient(135deg,transparent_75%,#113647_75%)]
                 before:bg-[length:100%_100%] before:opacity-60"
    >
      <div className="relative mx-auto max-w-7xl px-6 py-5">
        {/* MOBILE VIEW */}
        <div className="flex flex-col lg:hidden w-full px-4 py-6 space-y-8 bg-[#144155] text-gray-300">
          {/* 🔹 Logo + Quick Links */}
          <div className="flex justify-between items-start">
            <img src={logo} className="w-45 h-auto" alt="Logo" />

            <div>
              <h3 className="text-base font-semibold text-white mb-2">
                Quick Links
              </h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <a href="/" className="hover:text-[#ff9c00]">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/properties" className="hover:text-[#ff9c00]">
                    All Properties
                  </a>
                </li>
                <li>
                  <a href="/agents" className="hover:text-[#ff9c00]">
                    Find an Agent
                  </a>
                </li>
                <li>
                  <a href="/blog" className="hover:text-[#ff9c00]">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-[#ff9c00]">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* 🔹 Contact Info */}
          <div className="space-y-3 text-sm">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 hover:text-[#ff9c00]"
            >
              📞 +91 85278 59176
            </a>
            <a
              href="mailto:support@mmp.com"
              className="flex items-center gap-2 hover:text-[#ff9c00]"
            >
              ✉️ support@mmp.com
            </a>
           
            <a
              href="https://wa.me/918527859176"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#ff9c00]"
            >
              💬 Chat on WhatsApp
            </a>
          </div>

          {/* 🔹 Property Categories */}
          <div>
            <h3 className="text-base font-semibold text-white mb-2">
              MULTI MONEY{" "}
              <span className="lowercase font-playfair">property</span>
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              <li>
                <a href="/dashboard" className="hover:text-[#ff9c00]">
                  Plot
                </a>
              </li>
              <li>
                <a href="/plans" className="hover:text-[#ff9c00]">
                  House
                </a>
              </li>
              <li>
                <a href="/flat-apartment" className="hover:text-[#ff9c00]">
                  Flat/Apartment
                </a>
              </li>
              <li>
                <a href="/independent-villa" className="hover:text-[#ff9c00]">
                  Independent Villa
                </a>
              </li>
              <li>
                <a href="/from-house-land" className="hover:text-[#ff9c00]">
                  Farm House/Land
                </a>
              </li>
              <li>
                <a href="/co-working-space" className="hover:text-[#ff9c00]">
                  Co-Working Space
                </a>
              </li>
            </ul>
          </div>

          {/* 🔹 Newsletter */}
          <div className="w-full">
            <h3 className="mb-3 text-base font-semibold text-white">
              Your Property Updates
            </h3>
            <SubscribeForm />
          </div>
        </div>

        {/* LARGE SCREEN VIEW */}
        <div className="hidden lg:grid grid-cols-4 gap-8">
          {/* COL-1: Brand */}
          <div className="flex flex-col gap-4">
            <img src={logo} className="w-25 h-20" alt="Logo" />
            <p className="text-sm text-neutral-200">
              Get buyer inquiries straight to your dashboard.
            </p>

            {/* Contact Info with SVG Icons */}
            <div className="mt-4 text-sm space-y-3">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path d="M2.003 5.884l3.6-.9a1 1 0 0 1 1.142.316l2.2 2.6a1 1 0 0 1-.09 1.34l-1.3 1.3a16.018 16.018 0 0 0 6.292 6.292l1.3-1.3a1 1 0 0 1 1.34-.09l2.6 2.2a1 1 0 0 1 .316 1.142l-.9 3.6a1 1 0 0 1-.978.732A19.992 19.992 0 0 1 2 6.862a1 1 0 0 1 .003-0.978z" />
                </svg>
                +91 85278 59176
              </a>

              <a
                href="mailto:support@mmp.com"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path d="M2.25 4.5A2.25 2.25 0 0 1 4.5 2.25h15A2.25 2.25 0 0 1 21.75 4.5v15a2.25 2.25 0 0 1-2.25 2.25h-15A2.25 2.25 0 0 1 2.25 19.5v-15zm2.25.75v13.5l7.5-6.75-7.5-6.75zm1.5 0l6 5.4 6-5.4H5.25zm13.5 0l-7.5 6.75 7.5 6.75V5.25z" />
                </svg>
                support@mmp.com
              </a>

              <a
                href="https://wa.me/918527859176"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#ff9c00] hover:underline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.113.553 4.084 1.513 5.81L0 24l6.378-1.512A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm5.016 16.312c-.217.606-1.267 1.174-1.732 1.243-.463.068-1.04.095-1.79-.137-2.37-.738-3.905-2.536-4.018-2.666-.113-.13-.95-1.03-.95-1.97 0-.94.48-1.44.65-1.637.17-.196.372-.245.497-.245.124 0 .25 0 .36.002.115.003.268-.05.42.2.153.252.52.922.563.993.043.072.072.157.01.252-.062.094-.095.144-.185.242-.09.098-.192.22-.28.33-.088.11-.183.238-.075.463.108.226.6.995 1.285 1.61.888.826 1.468 1.035 1.635 1.145.166.11.26.09.35-.057.09-.146.386-.583.487-.797.1-.214.205-.174.342-.106.137.07.85.486.994.58.143.095.24.15.158.303z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* COL-2: Quick Links */}
          <div className="flex flex-col gap-2">
            <h3 className="uppercase text-white">Our Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-[#ff9c00] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/properties"
                  className="hover:text-[#ff9c00] transition-colors"
                >
                  All Properties
                </a>
              </li>
              <li>
                <a
                  href="/agents"
                  className="hover:text-[#ff9c00] transition-colors"
                >
                  Find an Agent
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="hover:text-[#ff9c00] transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="hover:text-[#ff9c00] transition-colors"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-[#ff9c00] transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* COL-3: Dashboard Links */}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold tracking-wide text-white">
              <span className="uppercase">MULTI MONEY</span>{" "}
              <span className="lowercase font-playfair">property</span>
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/dashboard"
                  className="hover:text-[#ff9c00] transition-colors"
                >
                  Plot
                </a>
              </li>
              <li>
                <a
                  href="/plans"
                  className="hover:text-[#ff9c00] transition-colors"
                >
                  House
                </a>
              </li>
              <li>
                <a
                  href="/flat-apartment"
                  className="hover:text-[#ff9c00] transition-colors"
                >
                  Flat/Apartment
                </a>
              </li>
              <li>
                <a
                  href="/independent-villa"
                  className="hover:text-[#ff9c00] transition-colors"
                >
                  Independent Villa
                </a>
              </li>
              <li>
                <a
                  href="/from-house-land"
                  className="hover:text-[#ff9c00] transition-colors"
                >
                  Farm House/Land
                </a>
              </li>
              <li>
                <a
                  href="/co-working-space"
                  className="hover:text-[#ff9c00] transition-colors"
                >
                  Co-Working Space
                </a>
              </li>
            </ul>
          </div>

          {/* COL-4: Newsletter */}
          <div className="w-full max-w-xs">
            <h3 className="mb-4 text-lg font-semibold text-white">
              Remain Updated
            </h3>
            <SubscribeForm />
          </div>
        </div>
      </div>

      {/* SOCIAL + LEGAL */}
      <div className="relative border-t border-neutral-700">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-6 sm:flex-row">
          <p className="text-xs">
            © {new Date().getFullYear()} MULTI MONEY PROPERTY. All rights
            reserved.
          </p>

          <div className="flex gap-5 text-lg">
            <a
              href="https://www.youtube.com/@MMPProperty"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:text-white transition-colors"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61551135478843"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:text-white transition-colors"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://x.com/MMP_8527"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:text-white transition-colors"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.linkedin.com/in/mmp-property-9b42b8387/"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:text-white transition-colors"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://www.instagram.com/multimoneyproperty/"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:text-white transition-colors"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.pinterest.com/multimoneyproperty_8527/"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:text-white transition-colors"
            >
              <FaPinterestP />
            </a>
          </div>
        </div>
      </div>

        {/* Floating Actions */}
      <BackToTop />
      {/* <ChatBot  /> */}
    </footer>
  );
}
