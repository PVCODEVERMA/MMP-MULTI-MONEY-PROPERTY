import React, { useState } from "react";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });

  const submit = (e) => {
    e.preventDefault();
    alert("Signed up (dummy)");
  };

  const change = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <form onSubmit={submit} className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-4">
        <h2 className="text-center text-2xl font-bold text-blue-700 mb-6">Sign Up</h2>
        <input name="name" required placeholder="Name" value={form.name} onChange={change}
          className="w-full p-3 border rounded" />
        <input name="email" type="email" required placeholder="Email" value={form.email} onChange={change}
          className="w-full p-3 border rounded" />
        <input name="phone" required placeholder="Phone" value={form.phone} onChange={change}
          className="w-full p-3 border rounded" />
        <input name="password" type="password" required placeholder="Password" value={form.password} onChange={change}
          className="w-full p-3 border rounded" />
        <button className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 font-semibold">Sign Up</button>
      </form>
    </div>
  );
}
