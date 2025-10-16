import React from "react";

const dummyContacts = [
  {
    id: 601,
    name: "Priya Kapoor",
    phone: "+91 9911223344",
    email: "priya.kapoor@example.com",
    type: "Buyer",
    preferredLocation: "Noida",
    createdAt: "13 Oct 2025",
  },
  {
    id: 602,
    name: "Sunil Mehta",
    phone: "+91 9001122334",
    email: "sunil.mehta@example.com",
    type: "Seller",
    preferredLocation: "Delhi NCR",
    createdAt: "10 Oct 2025",
  },
  {
    id: 603,
    name: "Ritu Pathak",
    phone: "+91 9988776655",
    email: "ritu.pathak@example.com",
    type: "Investor",
    preferredLocation: "Gurgaon",
    createdAt: "11 Oct 2025",
  },
];

const AllContacts = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">All Contacts</h2>
    <table className="min-w-full bg-white rounded-lg shadow">
      <thead>
        <tr>
          <th className="px-3 py-2 border">Name</th>
          <th className="px-3 py-2 border">Phone</th>
          <th className="px-3 py-2 border">Email</th>
          <th className="px-3 py-2 border">Type</th>
          <th className="px-3 py-2 border">Preferred Location</th>
          <th className="px-3 py-2 border">Created At</th>
        </tr>
      </thead>
      <tbody>
        {dummyContacts.map((contact) => (
          <tr key={contact.id}>
            <td className="px-3 py-2 border">{contact.name}</td>
            <td className="px-3 py-2 border">{contact.phone}</td>
            <td className="px-3 py-2 border">{contact.email}</td>
            <td className="px-3 py-2 border">{contact.type}</td>
            <td className="px-3 py-2 border">{contact.preferredLocation}</td>
            <td className="px-3 py-2 border">{contact.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AllContacts;
