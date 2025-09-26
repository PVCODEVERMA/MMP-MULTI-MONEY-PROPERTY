import { DummyLeads } from "../../../data/DummyLeads.js";
import { useLeadsFilter } from "../LeadsFilterContext.jsx";

export default function TrendingLeads() {
  const { city, setCity } = useLeadsFilter();

  // Top 3 high-intent leads
  const trending = DummyLeads.filter((l) => l.intent === "high").slice(0, 3);

  return (
    <section className="mb-6">
      <h4 className="mb-3 font-semibold text-[#154056]">Trending Leads</h4>
      <ul className="space-y-2">
        {trending.map((l) => (
          <li key={l.id}>
            <button
              onClick={() => setCity(l.location.city)}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm transition
                ${city === l.location.city ? "bg-orange-100 text-orange-600 font-semibold" : "hover:bg-[#f7f7f7] hover:text-[#ff9c00]"}`}
            >
              {l.propertyType} • {l.location.city}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
