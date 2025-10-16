
import {
  DummyLeads,
  TrendingLeads,
  PopularLeads,
} from "../../../data/DummyLeads.js";

import LeadCard      from "../../../components/findByPropertyleads/leadsExplorer/LeadCard.jsx";
import { useLeadsFilter } from "../../../components/findByPropertyleads/LeadsFilterContext.jsx";
import { Link }      from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";

/* map dataset + nice title from source prop */
const DATASET_BY_SOURCE = {
  all:       { data: DummyLeads,   title: "All Leads" },
  trending:  { data: TrendingLeads, title: "Trending Leads" },
  popular:   { data: PopularLeads,  title: "Popular Leads" },
};

export default function RightPane({ source = "all", hasPaid = false }) {
  /* live filters from context */
  const { search, intent, city } = useLeadsFilter();

  /* pick dataset + title */
  const { data: dataset, title } = DATASET_BY_SOURCE[source] || DATASET_BY_SOURCE.all;

  /* helper: ascii-safe string */
  const norm = (s = "") =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  /* apply filters */
  const filtered = dataset
    .filter((l) =>
      norm(
        `${l.name} ${l.propertyType} ${l.location.city} ${l.location.locality}`
      ).includes(norm(search))
    )
    .filter((l) => (intent ? l.intent === intent : true))
    .filter((l) => (city ? l.location.city === city : true));

  /* early empty state */
  if (filtered.length === 0)
    return (
      <section className="p-10 text-center text-gray-500">
        No leads match your criteria.
      </section>
    );

  /* render */
  return (
    <section className="p-4 space-y-6">
      {/* ── BREADCRUMB ───────────────────────── */}
      <nav
        aria-label="Breadcrumb"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 text-sm text-gray-600"
      >
        <ol className="flex items-center space-x-2">
          <li>
            <Link
              to="/home/leads"
              className="hover:text-[#ff9c00] transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <FaAngleRight className="text-gray-400" />
          </li>
          <li className="font-medium text-[#ff9c00]">{title}</li>
        </ol>
      </nav>

      {/* ── HEADING ──────────────────────────── */}
      <h1 className="text-center text-2xl sm:text-3xl font-semibold text-[#ff9c00]">
        Get Fresh Buyer Inquiries, Straight to Your Dashboard
      </h1>

      {/* ── CARD GRID ───────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((lead) => (
          <LeadCard key={lead.id} lead={lead} hasPaid={hasPaid} />
        ))}
      </div>
    </section>
  );
}
