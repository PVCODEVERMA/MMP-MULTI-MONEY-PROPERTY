import { DummyLeads } from "../../../data/DummyLeads.js";
import { useLeadsFilter } from "../LeadsFilterContext.jsx";

export default function PopularLeads() {
  const { city, setCity } = useLeadsFilter();

  // Count leads per city
  const counts = DummyLeads.reduce((m, l) => {
    const c = l.location.city;
    m[c] = (m[c] || 0) + 1;
    return m;
  }, {});

  const popular = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <section className="mb-6">
      <h4 className="mb-3 font-semibold text-[#154056]">Popular Cities</h4>
      <ul className="space-y-2">
        {popular.map(([c, total]) => (
          <li key={c}>
            <button
              onClick={() => setCity(c)}
              className={`flex w-full justify-between px-3 py-2 rounded-md text-left text-sm transition 
                ${city === c ? "bg-orange-100 text-orange-600 font-semibold" : "hover:bg-[#f7f7f7] hover:text-[#ff9c00]"}`}
            >
              <span>{c}</span>
              <span className="text-gray-500">{total}</span>
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => setCity("")}
            className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:underline rounded-md"
          >
            View All Cities
          </button>
        </li>
      </ul>
    </section>
  );
}
