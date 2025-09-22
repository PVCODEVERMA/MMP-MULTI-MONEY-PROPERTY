import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../utils/api";
import { useAuth } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";

export default function Login() {
  const nav = useNavigate();
  const { login } = useAuth();
  const [form, set] = useState({ email: "", password: "" });
  const [busy, setBusy] = useState(false);

  const submit = async e => {
    e.preventDefault();
    setBusy(true);
    try {
      await login(form.email, form.password);
      toast.success("Welcome 👋");
      nav("/");
    } catch (err) {
      toast.error(err.message || "Login failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={submit} className="bg-white p-8 rounded-xl shadow-md w-80">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign in</h1>

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => set({ ...form, email: e.target.value })}
          className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => set({ ...form, password: e.target.value })}
          className="w-full mb-6 px-4 py-2 border rounded-md focus:outline-none"
          required
        />

        <button
          disabled={busy}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-medium"
        >
          {busy ? "Signing in..." : "Login"}
        </button>

        <div className="text-center mt-4 text-sm">
          <Link to="/forgot-password" className="text-orange-600 hover:underline">
            Forgot password?
          </Link>
        </div>

        <p className="mt-6 text-center text-sm">
          No account?{" "}
          <Link to="/register" className="text-orange-600 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </section>
  );
}
