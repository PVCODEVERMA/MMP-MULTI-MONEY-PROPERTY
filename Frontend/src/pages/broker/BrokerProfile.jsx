
import { useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, X } from "lucide-react";

export default function BrokerProfile() {
  /* demo state – replace with real data fetching */
  const [profile, setProfile] = useState({
    name: "Rohit Sharma",
    company: "MMP Realty",
    phone: "+91 98765 43210",
    email: "rohit@mmprealty.com",
    city:  "Gurgaon",
    avatar:
      "https://ui-avatars.com/api/?name=Rohit+Sharma&background=FF9C00&color=fff",
  });
  const [drawer, setDrawer] = useState(false);

  /* update handler */
  const saveChanges = (e) => {
    e.preventDefault();
    // TODO: call API → setProfile(...)
    setDrawer(false);
  };

  return (
    <div className=" bg-[#f7f7f7] p-6 sm:p-8 my-16">
      {/* card */}
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 relative">
        {/* edit button */}
        <button
          onClick={() => setDrawer(true)}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100"
          aria-label="Edit profile"
        >
          <Pencil size={18} />
        </button>

        {/* header */}
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="h-28 w-28 rounded-full border-4 border-white shadow-md"
          />
          <div>
            <h2 className="text-2xl font-bold text-[#154056]">{profile.name}</h2>
            <p className="text-sm text-gray-500">{profile.company}</p>
            <p className="mt-2">
              <span className="font-medium">City :</span> {profile.city}
            </p>
          </div>
        </div>

        {/* contact grid */}
        <div className="grid sm:grid-cols-2 gap-6 mt-8">
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Phone
            </h3>
            <p className="mt-1 text-gray-800">{profile.phone}</p>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Email
            </h3>
            <p className="mt-1 text-gray-800 break-all">{profile.email}</p>
          </div>
        </div>

        {/* call to action */}
        <Link
          to="/broker/settings"
          className="block w-max mt-10 px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#FF9C00] to-[#ff6b00] text-white font-medium shadow hover:brightness-110"
        >
          Account Settings
        </Link>
      </div>

      {/* ───────── Edit-drawer ───────── */}
      {drawer && (
        <div className="fixed inset-0 z-50 bg-black/30 flex justify-end">
          <form
            onSubmit={saveChanges}
            className="w-full max-w-sm bg-white h-full p-6 overflow-y-auto shadow-xl animate-in slide-in-from-right-4"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Edit Profile</h3>
              <button onClick={() => setDrawer(false)} className="p-2">
                <X size={20} />
              </button>
            </div>

            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              defaultValue={profile.name}
              className="w-full px-4 py-2.5 border rounded-lg mb-4"
            />

            <label className="block text-sm font-medium mb-2">Company</label>
            <input
              defaultValue={profile.company}
              className="w-full px-4 py-2.5 border rounded-lg mb-4"
            />

            <label className="block text-sm font-medium mb-2">Phone</label>
            <input
              defaultValue={profile.phone}
              className="w-full px-4 py-2.5 border rounded-lg mb-4"
            />

            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              defaultValue={profile.email}
              className="w-full px-4 py-2.5 border rounded-lg mb-6"
            />

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#FF9C00] to-[#ff6b00] text-white font-medium"
            >
              Save Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
