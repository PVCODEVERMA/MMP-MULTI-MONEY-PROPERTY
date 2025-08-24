import React, { useState } from "react";

const dummyUser = {
  name: "Shyam Makwana",
  walletBalance: 1450,
  planQuota: 20,
};

const dummyLeads = [
  { id: 1, name: "Amit Jain", phone: "9888321110", status: "New", project: "Godrej Greens" },
  { id: 2, name: "Ria Singh", phone: "9123456789", status: "Contacted", project: "DLF Park" },
];

export default function BrokerDashboard() {
  const [user, setUser] = useState(dummyUser);
  const [leads] = useState(dummyLeads);

  const handleRecharge = () => {
    alert("Recharge wallet functionality to be implemented.");
  };

  const handleUpgrade = () => {
    alert("Upgrade package functionality to be implemented.");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="bg-blue-600 text-white p-8 rounded-b-3xl shadow-md mb-8">
        <h2 className="text-3xl font-bold">{`Welcome, ${user.name}`}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4 text-center font-semibold">
          <div className="bg-blue-500 rounded py-6 shadow">
            <div>Wallet Balance</div>
            <div className="text-xl pt-2">₹{user.walletBalance}</div>
          </div>
          <div className="bg-blue-500 rounded py-6 shadow">
            <div>Plan Quota</div>
            <div className="text-xl pt-2">{user.planQuota} Leads</div>
          </div>
          <button
            onClick={handleRecharge}
            className="bg-yellow-400 text-gray-800 rounded py-3 font-semibold shadow hover:bg-yellow-500"
          >
            Recharge Wallet
          </button>
          <button
            onClick={handleUpgrade}
            className="bg-green-500 text-white rounded py-3 font-semibold shadow hover:bg-green-600"
          >
            Upgrade Plan
          </button>
        </div>
      </header>

      <section className="bg-white p-6 rounded-lg shadow">
        <h3 className="font-semibold text-xl mb-4">My Leads</h3>
        {leads.length === 0 ? (
          <div className="text-gray-500">No leads available.</div>
        ) : (
          <table className="min-w-full border border-gray-300 rounded overflow-hidden">
            <thead className="bg-blue-100">
              <tr>
                <th className="border p-3 text-left">Name</th>
                <th className="border p-3 text-left">Phone</th>
                <th className="border p-3 text-left">Status</th>
                <th className="border p-3 text-left">Project</th>
                <th className="border p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-blue-50">
                  <td className="border p-3">{lead.name}</td>
                  <td className="border p-3">{lead.phone}</td>
                  <td className="border p-3">{lead.status}</td>
                  <td className="border p-3">{lead.project}</td>
                  <td className="border p-3 space-x-3">
                    <button className="text-green-600 hover:underline">Mark Verified</button>
                    <button className="text-gray-600 hover:underline">Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
