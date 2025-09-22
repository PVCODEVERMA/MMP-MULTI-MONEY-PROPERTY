import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const { token } = useParams();
  const nav = useNavigate();
  const [pw, setPw] = useState("");
  const [busy, setBusy] = useState(false);

  const change = async e => {
    e.preventDefault(); setBusy(true);
    try{
      const res = await fetch("/api/auth/reset-password/"+token,{
        method:"POST",
        headers:{ "Content-Type":"application/json"},
        body: JSON.stringify({ password: pw })
      });
      if(!res.ok) throw new Error("Failed");
      toast.success("Password updated. Please sign in");
      nav("/login");
    }catch(err){toast.error(err.message||"Error");}
    finally{setBusy(false);}
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={change} className="bg-white p-8 rounded-xl shadow w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Reset password</h1>

        <input
          type="password"
          placeholder="New password"
          value={pw}
          onChange={e=>setPw(e.target.value)}
          className="w-full mb-6 px-4 py-2 border rounded-md"
          required
        />

        <button
          disabled={busy}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md"
        >
          {busy ? "Updating..." : "Update password"}
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
