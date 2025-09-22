import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../utils/api";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const send = async e => {
    e.preventDefault(); setBusy(true);
    try{
      const res = await api.post
        ? undefined
        : await fetch("/api/auth/forgot-password", {
            method: "POST",
            headers: { "Content-Type":"application/json"},
            body: JSON.stringify({ email })
          });
      if (!res.ok) throw new Error("Failed");
      toast.success("Reset link sent. Check your inbox");
    }catch(err){toast.error(err.message||"Error");}
    finally{setBusy(false);}
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={send} className="bg-white p-8 rounded-xl shadow-md w-80">
        <h1 className="text-xl font-bold mb-6 text-center">Forgot password</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          className="w-full mb-6 px-4 py-2 border rounded-md"
          required
        />

        <button
          disabled={busy}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md"
        >
          {busy ? "Sending..." : "Send reset link"}
        </button>

        <p className="mt-6 text-center text-sm">
          <Link to="/login" className="text-orange-600 hover:underline">
            Back to sign in
          </Link>
        </p>
      </form>
    </section>
  );
}
