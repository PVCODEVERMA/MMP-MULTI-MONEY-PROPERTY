import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function PeSuccess() {
  const [q]   = useSearchParams();          // phone.email appends ?user_json_url=
  const nav   = useNavigate();
  const url   = q.get("user_json_url");

  useEffect(() => {
    (async () => {
      if (!url) return toast.error("Missing user_json_url");
      try {
        const r = await fetch("/api/auth/pe/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_json_url: url })
        });
        const data = await r.json();
        if (!r.ok) throw new Error(data.message);
        toast.success("Logged in ✔");
        nav("/dashboard");                 // go wherever you like
      } catch (e) {
        toast.error(e.message);
        nav("/login");
      }
    })();
  }, [url, nav]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-600">Verifying phone…</p>
    </div>
  );
}
