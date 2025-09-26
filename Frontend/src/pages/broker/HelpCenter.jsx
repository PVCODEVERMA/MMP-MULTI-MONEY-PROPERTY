
import { useState } from "react";
import { Mail, Phone, MessageSquareText } from "lucide-react";

const FAQ_DATA = [
  { q: "How quickly are new buyer leads delivered?", a: "Leads land in your dashboard & WhatsApp within 30s of form submission." },
  { q: "What locations do you cover?", a: "Currently Delhi-NCR, Mumbai-MMR & Pune; more cities roll out each quarter." },
  { q: "Are the leads exclusive?", a: "You choose: Exclusive (only you) or Shared (max 3 brokers) on every package." },
  { q: "Can I pause my subscription?", a: "Yes—pause anytime from Billing › Subscriptions. Unused balance stays intact." },
  { q: "How is lead quality ensured?", a: "We run duplicate checks, phone validation & intent scoring before delivery." },
];

export default function HelpCenter() {
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState(null);

  const filtered = FAQ_DATA.filter(
    (f) => f.q.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* hero */}
      <section className="bg-gradient-to-r from-[#FF9C00] to-[#ff6b00] text-white py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold">Help & Support</h1>
          <p className="mt-3 text-lg opacity-90">
            Answers to common questions—and real humans when you need them.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search FAQs…"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF9C00] outline-none"
          />
        </div>

        <div className="space-y-4">
          {filtered.map((item, i) => (
            <div key={i} className="border rounded-lg">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-center px-4 py-3 text-left font-medium text-[#154056] hover:bg-gray-50"
              >
                {item.q}
                <span className={`transition-transform ${open === i ? "rotate-180" : ""}`}>⌄</span>
              </button>
              {open === i && (
                <p className="px-4 pb-4 text-gray-700">{item.a}</p>
              )}
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="text-center text-gray-500">No results found.</p>
          )}
        </div>
      </section>

      {/* contact cards */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <h2 className="text-xl font-semibold text-[#154056] mb-6">
          Still need help?
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          <Card icon={Mail} title="Email" sub="support@mmp.com" />
          <Card icon={Phone} title="Call" sub="+91 99999 12345" />
          <Card icon={MessageSquareText} title="WhatsApp" sub="+91 99999 12345" />
        </div>
      </section>
    </div>
  );
}

/* simple icon-card */
function Card({ icon: Icon, title, sub }) {
  return (
    <div className="bg-white border rounded-xl p-6 text-center shadow-sm">
      <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-orange-100 text-[#FF6B00] mb-4">
        <Icon size={24} />
      </div>
      <h3 className="font-semibold text-[#154056]">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{sub}</p>
    </div>
  );
}
