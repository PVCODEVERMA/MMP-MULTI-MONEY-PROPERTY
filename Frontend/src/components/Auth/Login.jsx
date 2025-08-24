import React, { useState } from "react";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    alert("Logged in (dummy)");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <form onSubmit={submit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-center text-2xl font-bold text-blue-700 mb-6">Login</h2>
        <input type="text" required placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 mb-4 border rounded" />
        <input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border rounded" />
        <button className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 font-semibold">Login</button>
      </form>
    </div>
  );
}
