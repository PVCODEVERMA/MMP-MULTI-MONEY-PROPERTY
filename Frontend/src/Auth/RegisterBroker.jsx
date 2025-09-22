
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function RegisterBroker() {
  const nav = useNavigate();
  const [busy, setBusy] = useState(false);
  const [form, set] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    password: "",
    confirm: "",
  });

  const update = (k) => (e) => set({ ...form, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast.error("Passwords do not match");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/auth/register-broker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, role: "broker" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");
      toast.success("Broker account created — wait for approval");
      nav("/login");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={submit}
        className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Broker Registration
        </h1>

        <input
          className="input"
          placeholder="Full name"
          value={form.name}
          onChange={update("name")}
          required
        />
        <input
          className="input"
          type="email"
          placeholder="Work email"
          value={form.email}
          onChange={update("email")}
          required
        />
        <input
          className="input"
          type="tel"
          placeholder="Phone"
          value={form.phone}
          onChange={update("phone")}
          required
        />
        <input
          className="input"
          placeholder="Company / Brokerage"
          value={form.company}
          onChange={update("company")}
          required
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={update("password")}
          required
        />
        <input
          className="input mb-6"
          type="password"
          placeholder="Confirm password"
          value={form.confirm}
          onChange={update("confirm")}
          required
        />

        <button
          disabled={busy}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-medium transition"
        >
          {busy ? "Creating…" : "Create broker account"}
        </button>

        <p className="mt-6 text-center text-sm">
          Already registered?{" "}
          <Link to="/login" className="text-orange-600 hover:underline">
            Sign in
          </Link>
        </p>
      </form>

      {/* Tailwind shortcuts for input fields */}
      <style jsx>{`
        .input {
          @apply w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400;
        }
      `}</style>
    </section>
  );
}
