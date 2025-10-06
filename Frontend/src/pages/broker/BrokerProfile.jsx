import { useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, X, MapPin, Phone, Mail, Building, User } from "lucide-react";

export default function BrokerProfile() {
  /* demo state – replace with real data fetching */
  const [profile, setProfile] = useState({
    name: "Rohit Sharma",
    company: "MMP Realty",
    phone: "+91 98765 43210",
    email: "rohit@mmprealty.com",
    city: "Gurgaon",
    experience: "8 years",
    propertiesListed: "125",
    rating: "4.8",
    avatar:
      "https://ui-avatars.com/api/?name=Rohit+Sharma&background=FF9C00&color=fff&bold=true&size=128",
  });
  const [drawer, setDrawer] = useState(false);

  /* update handler */
  const saveChanges = (e) => {
    e.preventDefault();
    // TODO: call API → setProfile(...)
    setDrawer(false);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Broker <span className="text-[#FF9C00]">Profile</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage your professional profile and connect with potential clients
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Card Header with Gradient */}
          <div className="bg-gradient-to-r from-[#164057] to-[#0f2d3d] px-6 py-8 sm:px-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="h-24 w-24 sm:h-28 sm:w-28 rounded-full border-4 border-white/20 shadow-2xl"
                />
                <div className="absolute -bottom-2 -right-2 bg-[#FF9C00] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  PRO
                </div>
              </div>

              {/* Profile Info */}
              <div className="text-center sm:text-left flex-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {profile.name}
                </h2>
                <div className="flex items-center justify-center sm:justify-start text-white/90 mb-3">
                  <Building size={18} className="mr-2" />
                  <span className="text-lg">{profile.company}</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start text-white/80">
                  <MapPin size={16} className="mr-1" />
                  <span>{profile.city}</span>
                </div>
              </div>

              {/* Edit Button */}
              <button
                onClick={() => setDrawer(true)}
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 backdrop-blur-sm border border-white/20 hover:scale-105"
                aria-label="Edit profile"
              >
                <Pencil size={18} />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-gray-50 border-b">
            <div className="text-center p-4 bg-white rounded-xl shadow-sm border">
              <div className="text-2xl font-bold text-[#164057]">{profile.experience}</div>
              <div className="text-sm text-gray-600 mt-1">Experience</div>
            </div>
            <div className="text-center p-4 bg-white rounded-xl shadow-sm border">
              <div className="text-2xl font-bold text-[#164057]">{profile.propertiesListed}</div>
              <div className="text-sm text-gray-600 mt-1">Properties Listed</div>
            </div>
            <div className="text-center p-4 bg-white rounded-xl shadow-sm border">
              <div className="text-2xl font-bold text-[#164057]">{profile.rating}/5</div>
              <div className="text-sm text-gray-600 mt-1">Client Rating</div>
            </div>
            <div className="text-center p-4 bg-white rounded-xl shadow-sm border">
              <div className="text-2xl font-bold text-[#164057]">98%</div>
              <div className="text-sm text-gray-600 mt-1">Response Rate</div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="p-6 sm:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <User size={20} />
              Contact Information
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Phone */}
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Phone size={20} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Phone Number
                  </h4>
                  <p className="text-lg text-gray-800 font-medium">{profile.phone}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-xl border border-orange-100">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Mail size={20} className="text-orange-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Email Address
                  </h4>
                  <p className="text-lg text-gray-800 font-medium break-all">{profile.email}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
              <Link
                to="/broker/settings"
                className="flex-1 bg-gradient-to-r from-[#FF9C00] to-[#ff7b00] text-white font-semibold py-4 px-6 rounded-xl text-center hover:from-[#ff7b00] hover:to-[#FF9C00] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Account Settings
              </Link>
              <Link
                to="/broker/properties"
                className="flex-1 bg-white text-[#164057] font-semibold py-4 px-6 rounded-xl text-center border-2 border-[#164057] hover:bg-[#164057] hover:text-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                View Properties
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ───────── Edit Drawer ───────── */}
      {drawer && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-end backdrop-blur-sm">
          <form
            onSubmit={saveChanges}
            className="w-full max-w-md bg-white h-full p-6 overflow-y-auto shadow-2xl animate-in slide-in-from-right-4"
          >
            {/* Drawer Header */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Edit Profile</h3>
                <p className="text-gray-600 mt-1">Update your professional information</p>
              </div>
              <button 
                onClick={() => setDrawer(false)} 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Full Name
                </label>
                <input
                  defaultValue={profile.name}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF9C00] focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Company Name
                </label>
                <input
                  defaultValue={profile.company}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF9C00] focus:border-transparent transition-all"
                  placeholder="Enter your company name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Phone Number
                </label>
                <input
                  defaultValue={profile.phone}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF9C00] focus:border-transparent transition-all"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Email Address
                </label>
                <input
                  defaultValue={profile.email}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF9C00] focus:border-transparent transition-all"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  City
                </label>
                <input
                  defaultValue={profile.city}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF9C00] focus:border-transparent transition-all"
                  placeholder="Enter your city"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setDrawer(false)}
                className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-6 bg-gradient-to-r from-[#FF9C00] to-[#ff7b00] text-white font-semibold rounded-xl hover:from-[#ff7b00] hover:to-[#FF9C00] transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}