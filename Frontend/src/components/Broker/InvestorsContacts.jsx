import React from "react";

const dummyInvestors = [
  {
    id: 801,
    name: "Ritu Pathak",
    phone: "+91 9988776655",
    email: "ritu.pathak@example.com",
    preferredLocation: "Gurgaon",
    investmentBudget: "₹3 Crore",
    createdAt: "11 Oct 2025",
  },
  {
    id: 802,
    name: "Manish Grover",
    phone: "+91 9122334455",
    email: "manish.grover@example.com",
    preferredLocation: "Noida",
    investmentBudget: "₹1.5 Crore",
    createdAt: "12 Oct 2025",
  },
  {
    id: 803,
    name: "Anjana Desai",
    phone: "+91 9900112233",
    email: "anjana.desai@example.com",
    preferredLocation: "Delhi NCR",
    investmentBudget: "₹5 Crore",
    createdAt: "13 Oct 2025",
  },
];

const InvestorsContacts = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Investors Contacts</h2>
    <table className="min-w-full bg-white rounded-lg shadow">
      <thead>
        <tr>
          <th className="px-3 py-2 border">Name</th>
          <th className="px-3 py-2 border">Phone</th>
          <th className="px-3 py-2 border">Email</th>
          <th className="px-3 py-2 border">Preferred Location</th>
          <th className="px-3 py-2 border">Investment Budget</th>
          <th className="px-3 py-2 border">Created At</th>
        </tr>
      </thead>
      <tbody>
        {dummyInvestors.map((investor) => (
          <tr key={investor.id}>
            <td className="px-3 py-2 border">{investor.name}</td>
            <td className="px-3 py-2 border">{investor.phone}</td>
            <td className="px-3 py-2 border">{investor.email}</td>
            <td className="px-3 py-2 border">{investor.preferredLocation}</td>
            <td className="px-3 py-2 border">{investor.investmentBudget}</td>
            <td className="px-3 py-2 border">{investor.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default InvestorsContacts;
