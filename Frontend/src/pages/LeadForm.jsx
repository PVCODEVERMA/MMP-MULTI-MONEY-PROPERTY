import React, { useState } from "react";
import HelpAndContact from "./HelpAndContact";
import toast, { Toaster } from "react-hot-toast";
const initialForm = {
  name: "",
  email: "",
  organization: "",
  phone: "",
  type: "",
  persona: "",
  message: "",
  math: "",
  captcha: false,
};

const typeOptions = [
  "Support", "Sales Inquiry", "Partnership", "Feedback", "Other"
];
const personaOptions = [
  "An existing customer", "Prospective customer", "General visitor to this web site", "Other"
];

export default function ContactUs() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState({});

  function validate() {
    const newErrors = {};
    
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = "Email is invalid";
    if (!form.organization.trim()) newErrors.organization = "Organization is required";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(form.phone)) newErrors.phone = "Phone must be 10 digits";
    if (!form.type) newErrors.type = "Type is required";
    if (!form.persona) newErrors.persona = "Please select an option";
    if (!form.message.trim()) newErrors.message = "Message is required";
    if (form.math.trim() !== "7") newErrors.math = "Incorrect answer";
    if (!form.captcha) newErrors.captcha = "Please verify you're not a robot";
    
    setError(Object.keys(newErrors).length ? "Please fix the errors below" : "");
    return Object.keys(newErrors).length === 0;
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    
    // Clear error when user starts typing
    if (error && touched[name]) {
      setError("");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({
      name: true, email: true, organization: true, phone: true,
      type: true, persona: true, message: true, math: true, captcha: true
    });
    
    if (!validate()) return;
    
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Thank you! Your message has been sent.");
      setForm(initialForm);
      setTouched({});
    }, 1200);
  }

  return (
    <>
      <section className="max-w-4xl mx-auto py-12 px-6 bg-white rounded-xl shadow-lg mt-8 mb-16">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-emerald-800 mb-4 flex items-center justify-center gap-3">
            <svg className="w-10 h-10 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Us
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Before contacting us, you can <span className="font-bold text-emerald-700">ask Linda</span> and she can answer most of the frequently asked questions.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                className={`w-full px-4 py-3 rounded-lg border ${touched.name && !form.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition`}
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.name && !form.name && <p className="mt-1 text-sm text-red-600">Name is required</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email ID *</label>
              <input
                type="email"
                id="email"
                name="email"
                className={`w-full px-4 py-3 rounded-lg border ${touched.email && !form.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition`}
                placeholder="your.email@example.com"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && !form.email && <p className="mt-1 text-sm text-red-600">Email is required</p>}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">Organization Name *</label>
              <input
                type="text"
                id="organization"
                name="organization"
                className={`w-full px-4 py-3 rounded-lg border ${touched.organization && !form.organization ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition`}
                placeholder="Your company name"
                value={form.organization}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.organization && !form.organization && <p className="mt-1 text-sm text-red-600">Organization is required</p>}
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <div className="flex">
                <span className="inline-flex items-center px-4 border border-r-0 rounded-l-lg bg-gray-50 text-gray-600 text-sm">
                  <img src="https://cdn.jsdelivr.net/gh/hjnilsson/country-flags/svg/in.svg" alt="IN" className="w-5 h-5 mr-2" /> +91
                </span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={`w-full px-4 py-3 rounded-r-lg border ${touched.phone && !form.phone ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition`}
                  placeholder="08123456789"
                  maxLength={10}
                  value={form.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {touched.phone && !form.phone && <p className="mt-1 text-sm text-red-600">Phone is required</p>}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Type of Inquiry *</label>
              <select
                id="type"
                name="type"
                className={`w-full px-4 py-3 rounded-lg border ${touched.type && !form.type ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white`}
                value={form.type}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select an option</option>
                {typeOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              {touched.type && !form.type && <p className="mt-1 text-sm text-red-600">Please select a type</p>}
            </div>
            
            <div>
              <label htmlFor="persona" className="block text-sm font-medium text-gray-700 mb-1">I am *</label>
              <select
                id="persona"
                name="persona"
                className={`w-full px-4 py-3 rounded-lg border ${touched.persona && !form.persona ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white`}
                value={form.persona}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select an option</option>
                {personaOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              {touched.persona && !form.persona && <p className="mt-1 text-sm text-red-600">Please select an option</p>}
            </div>
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
            <textarea
              id="message"
              name="message"
              className={`w-full px-4 py-3 rounded-lg border ${touched.message && !form.message ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition min-h-[120px]`}
              placeholder="How can we help you?"
              value={form.message}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.message && !form.message && <p className="mt-1 text-sm text-red-600">Message is required</p>}
          </div>
          
          <div className="bg-gray-50 p-5 rounded-lg">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
              <span className="text-lg font-medium text-gray-800">I <span className="text-red-500">♥</span> Math: 1 + 6 =</span>
              <input
                type="text"
                name="math"
                className={`w-24 px-4 py-2 rounded border ${touched.math && form.math.trim() !== "7" ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition`}
                value={form.math}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
              />
              {touched.math && form.math.trim() !== "7" && <p className="text-sm text-red-600">Incorrect answer</p>}
            </div>
            
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="robot"
                name="captcha"
                checked={form.captcha}
                onChange={handleChange}
                onBlur={handleBlur}
                className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label htmlFor="robot" className="text-sm text-gray-700">
                I'm not a robot
              </label>
              {touched.captcha && !form.captcha && <p className="ml-auto text-sm text-red-600">Please verify</p>}
            </div>
          </div>
          
          {error && <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="text-red-700 font-medium">{error}</p>
          </div>}
          
          <div className="flex items-center justify-between pt-4">
            <p className="text-sm text-gray-600">* All fields are required</p>
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg text-base font-semibold transition shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={submitting}
            >
              {submitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : "Send Message"}
            </button>
          </div>
        </form>
      </section>
      <HelpAndContact />
      <Toaster
  position="top-center"

/>
    </>
  );
}