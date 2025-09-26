
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoLockClosed } from "react-icons/io5";
import Modal from "../../../components/findByPropertyleads/leadsExplorer/Modal.jsx";

export default function LeadCard({ lead, hasPaid = false }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { propertyType, location, intent, contact } = lead;

  /* badge color map */
  const badge = {
    high: "bg-orange-50  border-orange-200  text-orange-700",
    medium: "bg-blue-50   border-blue-200   text-blue-700",
    low: "bg-gray-100 border-gray-200 text-gray-600",
  };

  /* click → open modal or redirect to plans */
  const handleClick = () => {
    hasPaid ? setOpen(true) : navigate("/home/leads/plans");
  };

  /* mask helpers */
  const maskPhone = (p) => p?.replace(/(\d{4})\d{4}(.*)/, "$1XXXX$2") ?? "No phone";
  const maskName = (n) => {
    if (!n) return "Unknown";
    const parts = n.split(" ");
    return parts.length > 1 ? `${parts[0]} XXXX` : parts[0];
  };

  return (
    <>
      {/* card */}
      <div
        onClick={handleClick}
        className="group relative flex flex-col justify-between rounded-2xl
                   bg-white border border-gray-200 shadow-sm hover:shadow-lg
                   transition-all duration-300 cursor-pointer
                   w-full max-w-[280px] mx-auto hover:scale-[1.02]"
      >
        <div className="p-5 flex flex-col gap-4 relative">
          {/* locked overlay */}
          {!hasPaid && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px]
                            flex items-center justify-center rounded-2xl">
              <IoLockClosed className="text-3xl text-[#ff9c00]" />
            </div>
          )}

          {/* property type */}
          <h3 className="text-center font-semibold text-[#154056] text-lg truncate">
            {propertyType}
          </h3>

          {/* intent */}
          <div className="flex justify-center">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold uppercase
                          tracking-wide border ${badge[intent]}`}
            >
              {intent} Intent
            </span>
          </div>

          <hr className="border-dashed border-gray-300" />

          {/* contact snippet */}
          <div className="text-center space-y-1">
            <p className="font-medium text-[#154056] truncate">
              {maskName(contact?.name)}
            </p>
            <p className="text-gray-600 text-sm font-mono">
              {maskPhone(contact?.phone)}
            </p>
            <p className="text-gray-400 text-sm italic truncate">
              {location?.locality?.split(" ")[0]}, {location?.city?.split(" ")[0]}
            </p>
          </div>
        </div>

        {/* footer strip */}
        <div
          className="flex items-center justify-center
                     bg-gradient-to-r from-orange-500 to-orange-600 text-white
                     text-sm font-semibold px-4 py-3 rounded-b-2xl
                     transition-all duration-300
                     group-hover:from-orange-600 group-hover:to-orange-700"
        >
          {hasPaid ? "See lead details →" : "Locked"}
        </div>
      </div>

      {/* modal */}
      {hasPaid && (
        <Modal open={open} onClose={() => setOpen(false)}>
          <div className="p-6 space-y-6">
            {/* heading */}
            <h2 className="text-xl font-bold text-[#154056] text-center">
              Lead Details
            </h2>

            {/* contact */}
            <section className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-[#154056] mb-3 text-center">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <p>
                    <span className="text-gray-500">Name:</span> {contact?.name || "N/A"}
                  </p>
                  <p>
                    <span className="text-gray-500">Phone:</span>{" "}
                    {contact?.phone || "N/A"}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <p>
                    <span className="text-gray-500">Email:</span>{" "}
                    <span className="text-blue-600">{contact?.email || "N/A"}</span>
                  </p>
                </div>
              </div>
            </section>

            {/* property */}
            <section className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <p>
                  <span className="text-gray-500">Type:</span> {propertyType}
                </p>
                <p>
                  <span className="text-gray-500">Intent:</span>{" "}
                  <span className={`px-2 py-1 rounded-full text-xs ${badge[intent]}`}>
                    {intent}
                  </span>
                </p>
                <p className="sm:col-span-2">
                  <span className="text-gray-500">Location:</span>{" "}
                  {location?.locality}, {location?.city}
                  {location?.landmark && ` (${location.landmark})`}
                </p>
              </div>
            </section>

            {/* actions */}
            <div className="space-y-3">
              {contact?.whatsapp && (
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center rounded-lg
                             bg-[#25D366] text-white font-semibold py-3 px-4
                             hover:bg-[#ff9c00] transition-colors"
                >
                  Contact via WhatsApp
                </a>
              )}
              <button
                onClick={() => setOpen(false)}
                className="w-full rounded-lg bg-gray-100 hover:bg-gray-200
                           text-[#154056] font-medium py-3 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
