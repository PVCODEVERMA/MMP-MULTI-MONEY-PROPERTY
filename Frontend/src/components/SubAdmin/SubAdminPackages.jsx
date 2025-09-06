import React, { useState } from "react";
import { PencilSquareIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";

const initialPackages = [
  { id: 1, name: "Starter", price: 5000, quota: 10, description: "Ideal for new brokers" },
  { id: 2, name: "Growth", price: 10000, quota: 25, description: "For scaling agencies" },
  { id: 3, name: "Premium", price: 20000, quota: 60, description: "High volume plan" },
];

export default function AdminPackages() {
  const [pkgs, setPkgs] = useState(initialPackages);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", price: "", quota: "", description: "" });

  const handleEdit = (pkg) => {
    setEditing(pkg.id);
    setForm(pkg);
  };
  const handleSave = () => {
    setPkgs(pkgs.map((p) => (p.id === editing ? { ...form, id: editing } : p)));
    setEditing(null);
    setForm({ name: "", price: "", quota: "", description: "" });
  };
  const handleDelete = (id) => setPkgs(pkgs.filter((p) => p.id !== id));
  const handleAdd = () => {
    setPkgs([...pkgs, { ...form, id: Date.now() }]);
    setForm({ name: "", price: "", quota: "", description: "" });
  };

  return (
    <section className=" mx-auto bg-white rounded-xl shadow p-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <PlusIcon className="w-6 h-6 mr-2 text-indigo-500" />
        Manage Packages
      </h2>
      {/* Add/Edit Form */}
      <div className="mb-8 bg-gray-50 p-4 rounded-lg border">
        <div className="grid md:grid-cols-4 gap-4 mb-3">
          <input value={form.name} name="name" onChange={(e) => setForm((v) => ({ ...v, name: e.target.value }))}
            className="border rounded px-3 py-2 w-full" placeholder="Name" />
          <input value={form.price} name="price" type="number" onChange={(e) => setForm((v) => ({ ...v, price: e.target.value }))}
            className="border rounded px-3 py-2 w-full" placeholder="Price" />
          <input value={form.quota} name="quota" type="number" onChange={(e) => setForm((v) => ({ ...v, quota: e.target.value }))}
            className="border rounded px-3 py-2 w-full" placeholder="Leads/Month" />
          <input value={form.description} name="description" onChange={(e) => setForm((v) => ({ ...v, description: e.target.value }))}
            className="border rounded px-3 py-2 w-full" placeholder="Description" />
        </div>
        <div className="flex gap-3">
          {editing ? (
            <button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-800 text-white px-5 py-2 rounded font-semibold">Save</button>
          ) : (
            <button onClick={handleAdd} className="bg-green-600 hover:bg-green-800 text-white px-5 py-2 rounded font-semibold">Add</button>
          )}
          {editing && (
            <button onClick={() => { setEditing(null); setForm({ name: "", price: "", quota: "", description: "" }) }}
              className="bg-gray-300 text-gray-700 px-5 py-2 rounded font-semibold">Cancel</button>
          )}
        </div>
      </div>

      {/* Packages Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Price</th>
              <th className="py-2 px-4 text-left">Quota</th>
              <th className="py-2 px-4 text-left">Description</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pkgs.map((pkg) => (
              <tr key={pkg.id} className={editing === pkg.id ? "bg-blue-50" : ""}>
                <td className="py-2 px-4">{pkg.name}</td>
                <td className="py-2 px-4">₹{pkg.price}</td>
                <td className="py-2 px-4">{pkg.quota}</td>
                <td className="py-2 px-4">{pkg.description}</td>
                <td className="py-2 px-4 flex gap-2">
                  <button onClick={() => handleEdit(pkg)}><PencilSquareIcon className="w-5 h-5 text-blue-600" /></button>
                  <button onClick={() => handleDelete(pkg.id)}><TrashIcon className="w-5 h-5 text-red-500" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
