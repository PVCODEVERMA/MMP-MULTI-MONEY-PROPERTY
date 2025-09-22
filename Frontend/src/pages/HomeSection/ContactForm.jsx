import React from "react";

const ContactForm = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-lg relative animate-slideUp">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">Contact Owner/Broker</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 border rounded-lg"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full px-4 py-3 border rounded-lg"
          />
          <textarea
            placeholder="Message"
            className="w-full px-4 py-3 border rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-[#FF9C00] text-white py-3 rounded-lg font-bold hover:bg-[#164058]"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
