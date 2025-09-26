import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X, Star, ExternalLink } from "lucide-react";
import logo from "../../assets/componyLogos/logo.jpg";
import ProfileMenu from "./ProfileMenu";

/* ------------- dropdown data ------------- */
const solutionsDropdownGrid = [
  [
    { icon: "", title: "Real Estate Buyer Leads (India)",
      description: "Delhi, Noida, Gurgaon, Faridabad & Mumbai location-based inquiries",
      href: "/home/leads/solutions/real-estate-leads", featured: true },
    { icon: "", title: "City/Area Targeting",
      description: "Exclusive or shared leads by city, area, or project",
      href: "/home/leads/solutions/location-leads" },
  ],
  [
    { icon: "", title: "Lead Distribution Engine",
      description: "Shared (up to 3) or Exclusive delivery with smart routing",
      href: "/home/leads/solutions/lead-distribution" },
    { icon: "", title: "WhatsApp/Email Delivery",
      description: "Instant delivery via Interakt/Gupshup + Email + Broker Dashboard",
      href: "/home/leads/solutions/lead-delivery" },
  ],
  [
    { icon: "", title: "Broker CRM Dashboard",
      description: "My Leads, status, downloads, analytics & performance",
      href: "/home/leads/solutions/broker/dashboard/home", featured: true },
    { icon: "", title: "Packages & Wallet Billing",
      description: "Razorpay checkout, per-lead wallet, GST invoices & reports",
      href: "/home/leads/solutions/billing" },
  ],
  [
    { icon: "", title: "Lead Verification",
      description: "Duplicate checks, basic tele-verification & scoring",
      href: "/home/leads/solutions/lead-verification" },
    { icon: "", title: "Webhooks & Automation",
      description: "CRM webhooks, inactivity auto-pause, SMS/alerts workflows",
      href: "/home/leads/solutions/integrations" },
  ],
  [
    { icon: "", title: "Listings & SEO Pages",
      description: "Project, city & area pages, featured tags and blog traffic",
      href: "/home/leads/solutions/listings-seo" },
  ],
];


/* ------------- header component ------------- */
const FindByLeadsHeader = () => {
  /* desktop dropdown toggles */
  const [solOpen, setSolOpen] = useState(false);
  const [resOpen, setResOpen] = useState(false);

  /* mobile toggles */
  const [mobMenu, setMobMenu] = useState(false);
  const [mobSol, setMobSol] = useState(false);
  const [mobRes, setMobRes] = useState(false);

  /* refs for outside-click close */
  const solRef = useRef(null);
  const resRef = useRef(null);

  /* timeout refs for delayed close */
  const solTimeout = useRef(null);

  /* outside-click for desktop */
  useEffect(() => {
    const close = e => {
      if (solRef.current && !solRef.current.contains(e.target)) setSolOpen(false);
      if (resRef.current && !resRef.current.contains(e.target)) setResOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  /* helpers */
  const closeMobile = () => { setMobMenu(false); setMobSol(false); setMobRes(false); };

  return (
    <header className="bg-[#f7f7f7] fixed top-0 left-0 w-full z-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* ║ Logo + mobile hamburger ║ */}
          <div className="flex items-center">
            <button
              className="md:hidden mr-3 p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setMobMenu(!mobMenu)} aria-label="Toggle menu"
            >
              {mobMenu ? <X size={24}/> : <Menu size={24}/>}
            </button>
            <Link to="/findByLeads"><img src={logo} alt="MMP" className="h-20  w-auto"/></Link>
          </div>

          {/* ║ Desktop navigation ║ */}
          <nav className="hidden md:flex items-center space-x-3 lg:space-x-4 text-gray-700">
            <Link to="/home/leads" className="hover:text-[#FF9C00] px-3 py-2">Home</Link>

            {/* Solutions dropdown */}
            <div ref={solRef} className="relative">
              <button
                onClick={() => setSolOpen(!solOpen)}
                onMouseEnter={() => { clearTimeout(solTimeout.current); setSolOpen(true); }}
                onMouseLeave={() => { solTimeout.current = setTimeout(() => setSolOpen(false), 500); }}
                className="flex items-center gap-1 px-3 py-2 rounded-lg hover:text-[#FF9C00] hover:bg-gray-100 cursor-pointer"
              >
                Solutions
                <ChevronDown size={16} className={`duration-200 ${solOpen ? "rotate-180" : ""}`} />
              </button>
              {solOpen && (
                <div
                  onMouseEnter={() => { clearTimeout(solTimeout.current); setSolOpen(true); }}
                  onMouseLeave={() => { solTimeout.current = setTimeout(() => setSolOpen(false), 500); }}
                  className="absolute top-full left-1/2 -translate-x-1/2 bg-white w-[95vw] max-w-4xl mt-2 p-6 rounded-2xl shadow-2xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in-0 zoom-in-95"
                >
                  {solutionsDropdownGrid.flat().map((it,i)=>(
                    <Link key={i} to={it.href}
                      className={`flex gap-3 p-4 rounded-xl group transition-all ${it.featured?
                        "bg-orange-50 border border-orange-200":"hover:bg-gray-50"}`}>
                      <span className="text-2xl">{it.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold group-hover:text-[#FF9C00]">{it.title}</h4>
                          {it.featured && <Star size={14} className="text-yellow-500 fill-current"/>}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{it.description}</p>
                      </div>
                      <ExternalLink size={16} className="text-gray-400 group-hover:text-[#FF9C00]"/>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            

            {/* Simple links */}
            <Link to="/home/leads/plans"  className="px-3 py-2 hover:text-[#FF9C00] hover:bg-gray-100 rounded-lg">Pricing</Link>
            <Link to="/home/leads/about"  className="px-3 py-2 hover:text-[#FF9C00] hover:bg-gray-100 rounded-lg">About</Link>
          </nav>

          {/* ║ Profile ║ */}
          <ProfileMenu/>
        </div>
      </div>

      {/* ║ Mobile overlay ║ */}
      {mobMenu && (
        <div className="md:hidden fixed inset-0 bg-[#f7f7f7] z-50 overflow-y-auto">
          <div className="sticky top-0 flex justify-between items-center p-4">
            <Link to="/findByLeads" onClick={closeMobile}><img className='text-[#f7f7f7] h-16 w-auto ' src={logo} alt="MMP" /></Link>
            <button onClick={closeMobile} className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"><X size={24}/></button>
          </div>
          <div className="p-4 space-y-1">
            <div className=" pb-2">
              <button onClick={()=>setMobSol(!mobSol)} className="flex w-full justify-between py-4 font-medium">
                <span>Solutions</span><ChevronDown size={18} className={`duration-200 cursor-pointer ${mobSol?"rotate-180":""}`}/>
              </button>
              {mobSol && (
                <div className="pl-4 space-y-1">
                  {solutionsDropdownGrid.flat().map((it,i)=>(
                    <Link key={i} to={it.href} onClick={closeMobile}
                      className="block py-3 px-4 hover:bg-orange-50 rounded-lg text-gray-700 border-l-2 border-orange-200">
                      <div className="font-medium">{it.title}</div>
                      <div className="text-sm text-gray-600">{it.description}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <Link to="/home/leads/plans" onClick={closeMobile} className="block py-4 font-medium">Pricing</Link>
            <Link to="/home/leads/about" onClick={closeMobile} className="block py-4 font-medium">About</Link>
          </div>
        </div>
      )}

      
    </header>
  );
};

export default FindByLeadsHeader;
