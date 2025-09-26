
import { useLeadsFilter } from "../../../components/findByPropertyleads/leads";
import { useFilterWriter }  from "../../../utils/urlFilters.js";

export default function IntentSidebar() {
  const { intent }     = useLeadsFilter();   // live value from URL
  const setQueryParam  = useFilterWriter();

  const INTENTS = ["", "high", "medium", "low"];
  const LABELS  = { "": "All", high: "High", medium: "Medium", low: "Low" };

  return (
    <aside className="space-y-2">
      {INTENTS.map((v) => (
        <button
          key={v || "all"}
          onClick={() => setQueryParam("intent", v)}           
          className={`w-full py-2 rounded-lg text-left
            ${intent === v ? "bg-[#FF9C00]/10 text-[#FF9C00]" : "hover:bg-gray-100"}`}
        >
          {LABELS[v]}
        </button>
      ))}
    </aside>
  );
}
