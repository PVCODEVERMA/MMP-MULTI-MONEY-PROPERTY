import { useState } from "react";
import toast from "react-hot-toast";
import { PhoneInput, isValidPhoneNumber } from "react-international-phone";
import "react-international-phone/style.css";

export default function Content({ onClose }) {
  const [role, setRole] = useState("broker");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [contactOk, setContactOk] = useState(true);
  const [devMode, setDevMode] = useState(false);
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  /* ---------- validation ---------- */
  const errors = {
    name:
      touched.name && name.trim().length < 2
        ? "Please enter a valid name"
        : "",
    phone:
      touched.phone && !isValidPhoneNumber(phone)
        ? "Please enter a valid phone number"
        : "",
    city: touched.city && city.trim() === "" ? "City is required" : "",
    consent: !contactOk ? "Consent is required" : "",
  };

  const isValid =
    !errors.name && !errors.phone && !errors.city && !errors.consent;

  /* ---------- handle submit ---------- */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    setLoading(true);

    const payload = { role, name, email, phone, city, contactOk, devMode };

    // fake API call promise (replace with axios/fetch later)
    const fakeApi = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.2) {
          resolve("Success");
        } else {
          reject("Something went wrong");
        }
      }, 1500);
    });

    toast.promise(fakeApi, {
      loading: "Submitting your details...",
      success: "Thanks for reaching out! We will get back to you soon.",
      error: "Failed to submit. Please try again!",
    });

    fakeApi.finally(() => {
      setLoading(false);
      onClose?.();
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white p-6 rounded-2xl space-y-5"
    >
      <h1 className="text-2xl font-bold text-center text-[#154056]">
        Please provide your details
      </h1>

      {/* Role toggle */}
      <label className="block text-xs font-semibold text-gray-500">I am</label>
      <div className="flex gap-3">
        {["broker", "developer"].map((r) => (
          <button
            type="button"
            key={r}
            onClick={() => setRole(r)}
            className={`flex-1 py-2 rounded-full transition cursor-pointer
              ${
                role === r
                  ? "bg-[#ff9c00] text-white"
                  : "border hover:bg-gray-50"
              }`}
          >
            {r[0].toUpperCase() + r.slice(1)}
          </button>
        ))}
      </div>

      {/* Name */}
      <div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, name: true }))}
          placeholder="Name"
          className={`w-full border-b p-2 outline-none ${
            errors.name && "border-[#ff9c00]"
          }`}
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
      </div>

      {/* Email (optional) */}
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email ID (optional)"
        className="w-full border-b p-2 outline-none"
      />

      {/* Phone */}
      <div>
        <PhoneInput
          defaultCountry="in"
          value={phone}
          onChange={setPhone}
          onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
          inputClassName={`!border-b !w-full !py-2 !outline-none ${
            errors.phone ? "!border-red-500" : ""
          }`}
        />
        {errors.phone && (
          <p className="text-red-500 text-xs">{errors.phone}</p>
        )}
      </div>

      {/* City */}
      <div>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, city: true }))}
          placeholder="City"
          className={`w-full border-b p-2 outline-none ${
            errors.city && "border-red-500"
          }`}
        />
        {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
      </div>

      {/* Checkboxes */}
      <label className="flex items-start gap-3 text-sm">
        <input
          type="checkbox"
          checked={contactOk}
          onChange={(e) => setContactOk(e.target.checked)}
          className="mt-1 accent-[#ff9c00] text-white cursor-pointer"
        />
        I agree to be contacted by MULTI MONEY PROPERTY and agents via
        WhatsApp, SMS, phone, email etc.
      </label>
      {errors.consent && (
        <p className="text-red-500 text-xs">{errors.consent}</p>
      )}

      <label className="flex items-start gap-3 text-sm">
        <input
          type="checkbox"
          checked={devMode}
          onChange={(e) => setDevMode(e.target.checked)}
          className="mt-1 accent-[#ff9c00]  text-white cursor-pointer"
        />
        Do you wish to proceed as a Developer?
      </label>

      {/* Submit */}
      <button
        type="submit"
        disabled={!isValid || loading}
        className={`w-full py-3 rounded-lg text-white font-medium transition cursor-pointer
          ${
            isValid
              ? "bg-gradient-to-r from-[#ff9c00] to-[#ff9c00] hover:brightness-110"
              : "bg-gray-300 cursor-not-allowed"
          }`}
      >
        {loading ? "Submitting…" : "Submit"}
      </button>
    </form>
  );
}
