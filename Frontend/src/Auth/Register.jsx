import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast }            from "react-hot-toast";
import { useAuth }          from "../context/AuthContext.jsx";
import api                  from "../lib/api";

export default function Register() {
  const [form, setForm]       = useState({ name:"", email:"", password:"" });
  const [loading, setLoading] = useState(false);
  const nav  = useNavigate();
  const { login } = useAuth();

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/register", form);
      toast.success("Account created! Verify by email.");
      await login();           // optional auto-login when cookies set
      nav("/dashboard", { replace:true });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally { setLoading(false); }
  };

  return (
    <section className="w-full max-w-sm">
      <h1 className="text-2xl font-bold mb-6 text-center">Create account</h1>
      <form onSubmit={submit} className="space-y-4">
        <input type="text"  className="input" placeholder="Full name" required
               value={form.name}
               onChange={e=>setForm({...form,name:e.target.value})}/>
        <input type="email" className="input" placeholder="Email" required
               value={form.email}
               onChange={e=>setForm({...form,email:e.target.value})}/>
        <input type="password" className="input" placeholder="Password" required minLength={6}
               value={form.password}
               onChange={e=>setForm({...form,password:e.target.value})}/>
        <button className="btn-primary w-full" disabled={loading}>
          {loading?"Creating…":"Sign up"}
        </button>
      </form>

      <p className="text-xs text-center mt-4">
        Already registered? <Link to="/login" className="link">Sign in</Link>
      </p>
    </section>
  );
}
