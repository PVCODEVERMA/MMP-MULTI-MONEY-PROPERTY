import { useEffect } from "react";

/**
 * Renders the Phone.Email “Sign in with Phone” button.
 * - Loads the vendor script once.
 * - Calls window.log_in_with_phone with your options.
 * - Redirects to /pe/success after OTP verification.
 */
export default function PhoneEmailButton() {
  const CLIENT_ID = import.meta.env.VITE_PE_CLIENT_ID;   // set in .env

  useEffect(() => {
    // 1️⃣ inject external script only once
    const src = "https://auth.phone.email/login_automated_v1_2.js";
    if (!document.querySelector(`script[src="${src}"]`)) {
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      document.body.appendChild(s);
      s.onload = init;
      return () => document.body.removeChild(s);
    }
    init();                                              // already present
  }, []);

  const init = () => {
    if (window.log_in_with_phone == null) return;        // script not ready
    const opts = {
      client_id: CLIENT_ID,
      button_text: "Sign in with Phone",
      button_position: "left",
      email_notification: "icon",
      success_url: `${window.location.origin}/pe/success`
    };
    window.log_in_with_phone(JSON.stringify(opts));
  };

  // vendor script injects its own <iframe> & button into #pheIncludedContent
  return <div id="pheIncludedContent" />;
}
