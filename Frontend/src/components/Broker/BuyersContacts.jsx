import React from "react";

const dummyBuyers = [
  {
    id: 701,
    name: "Priya Kapoor",
    phone: "+91 9911223344",
    email: "priya.kapoor@example.com",
    preferredLocation: "Noida",
    createdAt: "13 Oct 2025",
    budget: "₹85 Lakh",
  },
  {
    id: 702,
    name: "Amit Sharma",
    phone: "+91 9988998877",
    email: "amit.sharma@example.com",
    preferredLocation: "Gurgaon",
    createdAt: "12 Oct 2025",
    budget: "₹1.2 Crore",
  },
  {
    id: 703,
    name: "Sunita Rao",
    phone: "+91 9001122400",
    email: "sunita.rao@example.com",
    preferredLocation: "Delhi NCR",
    createdAt: "14 Oct 2025",
    budget: "₹62 Lakh",
  },
];

const BuyersContacts = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Buyers Contacts</h2>
    <table className="min-w-full bg-white rounded-lg shadow">
      <thead>
        <tr>
          <th className="px-3 py-2 border">Name</th>
          <th className="px-3 py-2 border">Phone</th>
          <th className="px-3 py-2 border">Email</th>
          <th className="px-3 py-2 border">Preferred Location</th>
          <th className="px-3 py-2 border">Budget</th>
          <th className="px-3 py-2 border">Created At</th>
        </tr>
      </thead>
      <tbody>
        {dummyBuyers.map((buyer) => (
          <tr key={buyer.id}>
            <td className="px-3 py-2 border">{buyer.name}</td>
            <td className="px-3 py-2 border">{buyer.phone}</td>
            <td className="px-3 py-2 border">{buyer.email}</td>
            <td className="px-3 py-2 border">{buyer.preferredLocation}</td>
            <td className="px-3 py-2 border">{buyer.budget}</td>
            <td className="px-3 py-2 border">{buyer.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default BuyersContacts;
