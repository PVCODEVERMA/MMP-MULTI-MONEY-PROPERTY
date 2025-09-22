import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MOCK } from "../../components/advancedSearch/Allproperties.jsx";
import toast from "react-hot-toast";
import TrendingInCards from "../propertyCards/TrendingInCards.jsx";

export default function PropertyDetail() {
  const { id } = useParams();
  const property = MOCK.find((p) => p.id === Number(id));

  const [currentImg, setCurrentImg] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!property)
    return <p className="text-center text-xl mt-10">Property not found</p>;

  const handlePrev = () =>
    setCurrentImg((prev) => (prev === 0 ? property.imgs.length - 1 : prev - 1));
  const handleNext = () =>
    setCurrentImg((prev) => (prev === property.imgs.length - 1 ? 0 : prev + 1));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  console.log("Form submitted:", formData);

  // Show toast
  toast.success("Your message has been sent successfully!");

  setFormSubmitted(true);

  // Reset form
  setFormData({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Hide success message after 3 seconds
  setTimeout(() => {
    setFormSubmitted(false);
  }, 3000);
};


  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleSave = () => {
    toast.success("Property saved to favorites!");
  };

  const handleShare = async () => {
    setShowShareOptions(!showShareOptions);
  };

  const url = encodeURIComponent(window.location.href);

  return (
    <>
    <div className="max-w-6xl mx-auto py-20 px-4">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-6">
        <a href="/" className="hover:text-orange-500">
          Home
        </a>{" "}
        &gt;
        <a href="/properties" className="hover:text-orange-500 mx-1">
          Properties
        </a>{" "}
        &gt;
        <span className="ml-1">{property.title}</span>
      </nav>

      {/* Title & Price */}
      <div className=" pb-6">
        <h1 className="text-3xl md:text-4xl font-bold">{property.title}</h1>
        <p className="text-xl text-orange-600 mt-2 font-semibold">
          {property.price}
        </p>
        <p className="mt-1 text-gray-500 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {property.location}
        </p>
        <p className="text-gray-400 text-sm mt-2">
          Posted: {property.postedTime}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        {/* Image Section */}
        <div>
          {/* Main Image Carousel */}
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <img
              src={property.imgs[currentImg]}
              alt={`Property-${currentImg}`}
              className="w-full h-80 md:h-96 object-cover cursor-pointer"
              onClick={() => setShowModal(true)}
            />

            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
              {currentImg + 1} / {property.imgs.length}
            </div>

            {/* Prev/Next Buttons */}
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 text-[#FF9C00] p-2 rounded-full  hover:bg-[#FF9C00] hover:text-white cursor-pointer transition-colors shadow-md "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 text-[#FF9C00] p-2 rounded-full  hover:bg-[#FF9C00] hover:text-white cursor-pointer transition-colors shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {property.imgs.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                className={`w-20 h-16 object-cover rounded-lg cursor-pointer transition-all duration-200 ${
                  idx === currentImg
                    ? "ring-2 ring-orange-500 scale-105"
                    : "opacity-70 hover:opacity-100"
                }`}
                onClick={() => setCurrentImg(idx)}
              />
            ))}
          </div>

          {/* Property Details */}
          <div className="mt-8 bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Property Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-orange-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <span className="text-gray-600">Type:</span>
                <span className="ml-2 font-medium">{property.tag}</span>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-orange-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span className="text-gray-600">BHK:</span>
                <span className="ml-2 font-medium">
                  {property.bhk || "N/A"}
                </span>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-orange-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-gray-600">Photos:</span>
                <span className="ml-2 font-medium">{property.images}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-6 md:mt-0">
          <div className="mb-3 border-gray-200">
            <h3 className="font-semibold text-gray-700 mb-2">Quick Actions</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleSave}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-[#FF9C00] hover:text-white cursor-pointer transition text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 inline mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              Save
              </button>
              <button
                onClick={handleShare}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg  hover:bg-[#FF9C00] hover:text-white cursor-pointer transition text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 inline mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                Share
              </button>
            </div>
            {/* Share options dropdown */}
            {showShareOptions && (
              <div className="absolute mt-2 bg-white shadow-lg rounded-lg p-3 w-48 z-10">
                <p className="text-gray-600 text-sm mb-2">Share via</p>
                <div className="flex flex-col gap-2 text-sm">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#1877F2]"
                  >
                    📘 Facebook
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#1DA1F2]"
                  >
                    🐦 Twitter
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#0077B5]"
                  >
                    💼 Linkedin
                  </a>
                  <a
                    href={`https://t.me/share/url?url=${url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#0088cc]"
                  >
                    📩 Telegram
                  </a>
                  <a
                    href={`https://api.whatsapp.com/send?text=${url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#25D366]"
                  >
                    💬 WhatsApp
                  </a>
                </div>
              </div>
            )}
          </div>
          <div className="sticky top-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Contact Seller
              </h2>

              

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                    placeholder="Enter your message to the seller"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors shadow-md cursor-pointer"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Large Image */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex justify-center items-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <div className="relative max-w-4xl w-full">
              <motion.img
                src={property.imgs[currentImg]}
                alt={`large-${currentImg}`}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="w-full max-h-[80vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />

              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 bg-black/70 text-white p-2 rounded-full hover:bg-black transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 text-black p-2 rounded-full hover:bg-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 text-black p-2 rounded-full hover:bg-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                {currentImg + 1} / {property.imgs.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
        {/* tranding card component  */}
          <TrendingInCards />
     </>
  );
}
