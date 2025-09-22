import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import dummyProperties from "../findByPropertyleads/dummyProperties";
import { FaCalendarAlt } from "react-icons/fa";

const LeadsPropertyDetails = () => {
  const { location, id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  const property = dummyProperties.find(
    (p) =>
      p.id === Number(id) &&
      p.location?.city?.toLowerCase() === location.toLowerCase()
  );

  if (!property) {
    return (
      <p className="text-red-500 text-center mt-10 text-lg">
        Property not found!
      </p>
    );
  }

  const nextImage = () =>
    setCurrentImageIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1
    );

  const prevImage = () =>
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 mt-20 mb-20">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6 flex items-center">
        <Link
          to="/home/leads"
          className="hover:text-[#ff9c00] flex items-center"
        >
          Home <FaAngleRight className="mx-1" />
        </Link>
        <span>{property.location.city}</span>
        <FaAngleRight className="mx-1" />
        <span>{property.location.locality}</span>
        <FaAngleRight className="mx-1" />
        <span className="text-[#154056] font-semibold">
          Property #{property.id}
        </span>
      </div>

      {/* Title & Location */}
      <h2 className="property-hero-title text-[#154056] mb-2">
        {property.title}
      </h2>
      <div className="flex items-center gap-6 mb-4 ">
        
        <p className="text-lg font-semibold text-[#ff9c00]  property-hero-title">{property.price}</p>
      </div>
      <p className="text-gray-600 mb-6 text-base md:text-lg">
        {property.location.locality}, {property.location.city}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-2">
          {/* Main Image */}
          <div className="relative mb-4 rounded-xl overflow-hidden">
            <img
              src={property.images[currentImageIndex]}
              alt={property.title}
              className="w-full h-72 md:h-[450px] object-cover cursor-pointer"
              onClick={() => setShowLightbox(true)}
            />
            {property.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 text-[#ff9c00] p-2 rounded-full shadow-md hover:bg-[#ff9c00] hover:text-white cursor-pointer"
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 text-[#ff9c00] p-2 rounded-full shadow-md hover:bg-[#ff9c00] hover:text-white cursor-pointer"
                >
                  ›
                </button>
              </>
            )}
            <span className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {property.images.length}
            </span>
          </div>

          {/* Thumbnails */}
          {property.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2 mb-6">
              {property.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${property.title}-${i}`}
                  onClick={() => setCurrentImageIndex(i)}
                  className={`h-20 w-full object-cover rounded-md cursor-pointer border-2 ${
                    currentImageIndex === i
                      ? "border-[#154056]"
                      : "border-transparent"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Property Info */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-6">
            <h3 className="text-xl font-semibold text-[#154056] mb-4">
              Property Details
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-gray-500 text-sm">Price</p>
                <p className="text-lg font-semibold">{property.price}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">BHK</p>
                <p className="text-lg font-semibold">{property.bhk}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Status</p>
                <p className="text-lg font-semibold">{property.status}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Intent</p>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    property.intent === "high"
                      ? "bg-red-500 text-white"
                      : property.intent === "medium"
                      ? "bg-yellow-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {property.intent.toUpperCase()}
                </span>
              </div>
            </div>

            {/* More Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-sm">
              <p>
                <span className="font-semibold">Built-up Area:</span>{" "}
                {property.area?.builtUp}
              </p>
              <p>
                <span className="font-semibold">Carpet Area:</span>{" "}
                {property.carpetArea}
              </p>
              <p>
                <span className="font-semibold">Price per sq.ft:</span>{" "}
                {property.pricePerSqft}
              </p>
              <p>
                <span className="font-semibold">Maintenance:</span>{" "}
                {property.maintenance || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Car Parking:</span>{" "}
                {property.carParking}
              </p>
              <p>
                <span className="font-semibold">Posted On:</span>{" "}
                {property.postedOn} (
                {new Date(property.postedAt).toDateString()})
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-6">
            <h3 className="text-xl font-semibold text-[#154056] mb-4">
              Description
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Highlights */}
          {property.highlights && (
            <div className="bg-white p-6 rounded-xl shadow-md mb-6">
              <h3 className="text-xl font-semibold text-[#154056] mb-4">
                Highlights
              </h3>
              <ul className=" list-inside text-gray-700 space-y-1 ">
                {property.highlights.map((h, i) => (
                  <li className="flex gap-2" key={i}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 512 512"
                    >
                      <circle cx="256" cy="256" r="256" fill="#ff9c00" />
                      <path
                        fill="#fff"
                        d="M362.7 181.3c6.2 6.2 6.2 16.4 0 22.6l-144 144c-6.2 6.2-16.4 6.2-22.6 0l-72-72c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L208 312.4l132.1-132.1c6.2-6.2 16.4-6.2 22.6 0z"
                      />
                    </svg>{" "}
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Amenities */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-6">
            <h3 className="text-xl font-semibold text-[#154056] mb-4">
              Amenities
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {(property.amenities || []).map((item, i) => (
                <span
                  key={i}
                  className="flex items-center text-gray-600 text-sm gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 512 512"
                  >
                    <circle cx="256" cy="256" r="256" fill="#ff9c00" />
                    <path
                      fill="#fff"
                      d="M362.7 181.3c6.2 6.2 6.2 16.4 0 22.6l-144 144c-6.2 6.2-16.4 6.2-22.6 0l-72-72c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L208 312.4l132.1-132.1c6.2-6.2 16.4-6.2 22.6 0z"
                    />
                  </svg>
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Legal Clearance */}
          {property.legalClearance && (
            <div className="bg-white p-6 rounded-xl shadow-md mb-6">
              <h3 className="text-xl font-semibold text-[#154056] mb-4">
                Legal Clearances
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {property.legalClearance.map((l, i) => (
                  <li className="list-none flex gap-2" key={i}>
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 512 512"
                    >
                      <circle cx="256" cy="256" r="256" fill="#ff9c00" />
                      <path
                        fill="#fff"
                        d="M362.7 181.3c6.2 6.2 6.2 16.4 0 22.6l-144 144c-6.2 6.2-16.4 6.2-22.6 0l-72-72c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L208 312.4l132.1-132.1c6.2-6.2 16.4-6.2 22.6 0z"
                      />
                    </svg>
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Floor Plan */}
          {property.floorPlan && (
            <div className="bg-white p-6 rounded-xl shadow-md mb-6">
              <h3 className="text-xl font-semibold text-[#154056] mb-4">
                Floor Plan
              </h3>
              <img
                src={property.floorPlan}
                alt="Floor Plan"
                className="w-full rounded-lg"
              />
            </div>
          )}

          {/* Map */}
          {property.mapLocation && (
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-[#154056] mb-4">
                Location Map
              </h3>
              <iframe
                title="Google Map"
                width="100%"
                height="350"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps?q=${property.mapLocation.lat},${property.mapLocation.lng}&hl=es;z=14&output=embed`}
              ></iframe>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="bg-white p-6 rounded-xl shadow-md h-fit sticky top-10">
          <h3 className="text-xl font-semibold text-[#154056] mb-4">
            Contact Broker
          </h3>
          <div className="p-4 bg-blue-50 rounded-lg mb-6">
            <p className="font-semibold">{property.contact?.name}</p>
            <p className="text-sm text-gray-500">Property Consultant</p>
            <p className="mt-2 text-gray-700">{property.contact?.phone}</p>
            <p className="text-gray-700">{property.contact?.email}</p>
          </div>
          <a
            href={`tel:${property.contact?.phone}`}
            className="block w-full bg-[#154056] text-white text-center py-3 rounded-lg font-semibold hover:bg-[#0f3042] transition mb-3"
          >
            Call Now
          </a>
          <a
            href={property.contact?.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="block w-full border border-[#154056] text-[#154056] text-center py-3 rounded-lg font-semibold hover:bg-[#ff9c00] hover:text-white transition mb-3"
          >
            WhatsApp
          </a>
          <a
            // href={property.contact?.scheduleVisitLink}
            href="https://calendly.com/app/admin/dashboard"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#FF9C00] text-white text-center py-3 rounded-lg font-semibold hover:bg-[#e58a00] transition"
          >
            <FaCalendarAlt className="text-lg" />
            Book Site Visit
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {showLightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowLightbox(false)}
        >
          <div className="relative max-w-5xl w-full">
            <button
              className="absolute -top-10 right-0 text-white text-4xl hover:text-[#ff9c00]"
              onClick={() => setShowLightbox(false)}
            >
              ×
            </button>
            <img
              src={property.images[currentImageIndex]}
              alt={property.title}
              className="w-full h-auto max-h-screen object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsPropertyDetails;
