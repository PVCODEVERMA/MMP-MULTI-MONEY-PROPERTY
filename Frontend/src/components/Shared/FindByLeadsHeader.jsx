import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X, Star, ExternalLink, User, LogOut, Settings } from "lucide-react";
import logo from "../../assets/componyLogos/logo.jpg";
import { useAuth } from "../../context/AuthContext";

/* ------------- dropdown data ------------- */
const solutionsDropdownGrid = [
  [
    { icon: "", title: "Real Estate Buyer Leads (India)", description: "Delhi, Noida, Gurgaon, Faridabad & Mumbai location-based inquiries", href: "/home/leads/real-estate-leads", featured: true },
    { icon: "", title: "City/Area Targeting", description: "Exclusive or shared leads by city, area, or project", href: "/home/leads/location-leads" },
  ],
  [
    { icon: "", title: "Lead Distribution Engine", description: "Shared (up to 3) or Exclusive delivery with smart routing", href: "/home/leads/lead-distribution" },
    { icon: "", title: "WhatsApp/Email Delivery", description: "Instant delivery via Interakt/Gupshup + Email + Broker Dashboard", href: "/home/leads/lead-delivery" },
  ],
  [
    { icon: "", title: "Broker CRM Dashboard", description: "My Leads, status, downloads, analytics & performance", href: "/home/leads/dashboard/home", featured: true },
    { icon: "", title: "Packages & Wallet Billing", description: "Razorpay checkout, per-lead wallet, GST invoices & reports", href: "/home/leads/billing" },
  ],
  [
    { icon: "", title: "Lead Verification", description: "Duplicate checks, basic tele-verification & scoring", href: "/home/leads/lead-verification" },
    { icon: "", title: "Webhooks & Automation", description: "CRM webhooks, inactivity auto-pause, SMS/alerts workflows", href: "/home/leads/integrations" },
  ],
  [
    { icon: "", title: "Listings & SEO Pages", description: "Project, city & area pages, featured tags and blog traffic", href: "/home/leads/listings-seo" },
  ],
];

const FindByLeadsHeader = () => {
  const { user, isAuthenticated, logout } = useAuth();

  /* desktop dropdown toggles */
  const [solOpen, setSolOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  /* mobile toggles */
  const [mobMenu, setMobMenu] = useState(false);
  const [mobSol, setMobSol] = useState(false);
  const [mobProfile, setMobProfile] = useState(false);

  /* refs for outside-click close */
  const solRef = useRef(null);
  const profileRef = useRef(null);
  const solTimeout = useRef(null);

  /* outside-click for desktop */
  useEffect(() => {
    const close = e => {
      if (solRef.current && !solRef.current.contains(e.target)) setSolOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const closeMobile = () => { setMobMenu(false); setMobSol(false); setMobProfile(false); };
  // const showDashboard =
  //   user &&
  //   ["Developer", "Builder", "Broker", "SubAdmin", "SuperAdmin"].includes(user.role);

  return (
    <header className="bg-[#f7f7f7] fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo + mobile menu */}
          <div className="flex items-center">
            <button className="md:hidden mr-3 p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setMobMenu(!mobMenu)} aria-label="Toggle menu">
              {mobMenu ? <X size={24}/> : <Menu size={24}/>}
            </button>
            <Link to="/home/leads"><img src={logo} alt="MMP" className="h-20 w-auto" /></Link>
          </div>

          {/* Desktop navigation */}
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
                Solutions <ChevronDown size={16} className={`duration-200 ${solOpen ? "rotate-180" : ""}`} />
              </button>
              {solOpen && (
                <div
                  onMouseEnter={() => { clearTimeout(solTimeout.current); setSolOpen(true); }}
                  onMouseLeave={() => { solTimeout.current = setTimeout(() => setSolOpen(false), 500); }}
                  className="absolute top-full left-1/2 -translate-x-1/2 bg-white w-[95vw] max-w-4xl mt-2 p-6 rounded-2xl shadow-2xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in-0 zoom-in-95"
                >
                  {solutionsDropdownGrid.flat().map((it,i) => (
                    <Link key={i} to={it.href} className={`flex gap-3 p-4 rounded-xl group transition-all ${it.featured?"bg-orange-50 border border-orange-200":"hover:bg-gray-50"}`}>
                      <span className="text-2xl">{it.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold group-hover:text-[#FF9C00]">{it.title}</h4>
                          {it.featured && <Star size={14} className="text-yellow-500 fill-current"/>}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{it.description}</p>
                      </div>
                      <ExternalLink size={16} className="text-gray-400 group-hover:text-[#FF9C00]" />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/home/leads/plans" className="px-3 py-2 hover:text-[#FF9C00] hover:bg-gray-100 rounded-lg">Pricing</Link>
            <Link to="/home/leads/about" className="px-3 py-2 hover:text-[#FF9C00] hover:bg-gray-100 rounded-lg">About</Link>

           
          </nav>

          {/* Profile dropdown - IMPROVED UI */}
            {isAuthenticated ? (
              <div ref={profileRef} className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-all duration-200"
                >
                  <div className="relative">
                    <img 
                      src={user.profileImage || "/default-avatar.png"} 
                      alt={user.fullName} 
                      className="w-8 h-8 rounded-full object-cover border-2 border-gray-300 hover:border-[#FF9C00] transition-colors" 
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <span className="font-medium text-gray-800">Hi,{user.fullName}</span>
                  <ChevronDown size={14} className={`duration-200 text-gray-500 ${profileOpen ? "rotate-180" : ""}`} />
                </button>
                
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-xl border border-gray-200 p-0 z-50 overflow-hidden">
                    {/* Profile Header */}
                    

                    

                    {/* Menu Items */}
                    <div className="p-2 border-t border-gray-100">
                      <Link 
                        to="/broker/dashboard" 
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-orange-50 text-gray-700 transition-colors group"
                      >
                        <User size={18} className="text-gray-500 group-hover:text-[#FF9C00]" />
                        <span className="font-medium">Leads Dashboard </span>
                        
                      </Link>
                      <Link 
                        to="/home/leads/profile" 
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-orange-50 text-gray-700 transition-colors group"
                      >
                        <User size={18} className="text-gray-500 group-hover:text-[#FF9C00]" />
                        <span className="font-medium">My Profile</span>
                        
                      </Link>
                      
                      <Link 
                        to="/settings" 
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-orange-50 text-gray-700 transition-colors group"
                      >
                        <Settings size={18} className="text-gray-500 group-hover:text-[#FF9C00]" />
                        <div className="border-t border-gray-100 my-2"></div>
                        <span className="font-medium">Settings</span>
                      </Link>
                    </div>

                    {/* Logout */}
                    <div className="p-2 border-t border-gray-100">
                      <button 
                        onClick={() => { logout(); setProfileOpen(false); }}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors group cursor-pointer"
                      >
                        <LogOut size={18} className="group-hover:text-red-700" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/login" 
                className="px-4 py-2 hover:text-[#FF9C00] hover:bg-gray-100 rounded-lg transition-colors font-medium"
              >
                Sign In / Join Free
              </Link>
            )}


        </div>
      </div>

      {/* Mobile overlay - IMPROVED UI */}
      {mobMenu && (
        <div className="md:hidden fixed inset-0 bg-[#f7f7f7] z-50 overflow-y-auto">
          <div className="sticky top-0 flex justify-between items-center p-4 bg-white border-b border-gray-200">
            <Link to="/home/leads" onClick={closeMobile}>
              <img className='h-16 w-auto' src={logo} alt="MMP" />
            </Link>
            <button onClick={closeMobile} className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
              <X size={24}/>
            </button>
          </div>
          
          <div className="p-4 space-y-1">
            <Link to="/home/leads" onClick={closeMobile} className="block py-4 font-medium text-gray-700 hover:bg-orange-50 rounded-lg px-4">
              Home
            </Link>

            <button onClick={()=>setMobSol(!mobSol)} className="flex w-full justify-between items-center py-4 font-medium text-gray-700 hover:bg-orange-50 rounded-lg px-4">
              <span>Solutions</span>
              <ChevronDown size={18} className={`duration-200 cursor-pointer ${mobSol?"rotate-180":""}`} />
            </button>
            
            {mobSol && (
              <div className="pl-6 space-y-1 bg-gray-50 rounded-lg mx-4 p-2">
                {solutionsDropdownGrid.flat().map((it,i)=>(
                  <Link key={i} to={it.href} onClick={closeMobile}
                    className={`block py-3 px-4 rounded-lg text-gray-700 transition-colors ${
                      it.featured ? "bg-orange-50 border-l-4 border-orange-400" : "hover:bg-orange-50 border-l-2 border-orange-200"
                    }`}>
                    <div className="font-medium flex items-center gap-2">
                      {it.title}
                      {it.featured && <Star size={14} className="text-yellow-500 fill-current" />}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{it.description}</div>
                  </Link>
                ))}
              </div>
            )}

            <Link to="/home/leads/plans" onClick={closeMobile} className="block py-4 font-medium text-gray-700 hover:bg-orange-50 rounded-lg px-4">
              Pricing
            </Link>
            
            <Link to="/home/leads/about" onClick={closeMobile} className="block py-4 font-medium text-gray-700 hover:bg-orange-50 rounded-lg px-4">
              About
            </Link>

            {/* Mobile profile - IMPROVED UI */}
            {isAuthenticated ? (
              <div className="border-t border-gray-200 mt-4 pt-4">
                <button onClick={()=>setMobProfile(!mobProfile)} 
                  className="flex w-full justify-between items-center py-4 font-medium text-gray-700 hover:bg-orange-50 rounded-lg px-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={user.profileImage || "/default-avatar.png"} 
                      alt={user.fullName} 
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-300" 
                    />
                    <span>My Account</span>
                  </div>
                  <ChevronDown size={18} className={`duration-200 cursor-pointer ${mobProfile?"rotate-180":""}`} />
                </button>
                
                {mobProfile && (
                  <div className="pl-6 space-y-4 bg-gray-50 rounded-lg mx-4 p-4">
                    {/* User Info */}
                    <div className="space-y-2">
                      <p className="text-gray-900 font-bold text-lg">{user.fullName}</p>
                      <p className="text-gray-600 text-sm">{user.email}</p>
                      {user.phone && <p className="text-gray-600 text-sm">{user.phone}</p>}
                      {user.city && <p className="text-gray-600 text-sm"> {user.city}</p>}
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                        {user.role}
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="space-y-2">

            
                      <Link
                        to="/dashboardAll"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-orange-50 text-gray-700 transition-colors group"
                      >
                        <LayoutDashboard
                          size={18}
                          className="text-gray-500 group-hover:text-[#FF9C00]"
                        />
                        <span className="font-medium">My Dashboard</span>
                      </Link>
                  

                      <Link to="/profile" onClick={closeMobile} 
                        className="flex items-center gap-3 py-3 text-gray-700 hover:text-[#FF9C00] transition-colors">
                        <User size={18} />
                        <span>My Profile</span>
                      </Link>
                      
                      <Link to="/settings" onClick={closeMobile} 
                        className="flex items-center gap-3 py-3 text-gray-700 hover:text-[#FF9C00] transition-colors">
                        <Settings size={18} />
                        <span>Settings</span>
                      </Link>

                      
                    </div>

                    {/* Logout */}
                    <button onClick={()=>{logout(); closeMobile();}} 
                      className="flex items-center gap-3 w-full py-3 text-red-600 hover:text-red-700 transition-colors font-medium">
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" onClick={closeMobile} 
                className="block py-4 font-medium text-gray-700 hover:bg-orange-50 rounded-lg px-4 border-t border-gray-200 mt-4 pt-4 btn">
                Sign In / Join Free
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default FindByLeadsHeader;