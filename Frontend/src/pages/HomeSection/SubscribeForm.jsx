import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";

export default function SubscribeForm() {
  const recaptchaRef = useRef();
  const [verified, setVerified] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!verified) {
      toast.error("Please verify that you are not a robot!");
      return;
    }

    toast.success("Thank you for subscribing!");

    // Reset captcha
    recaptchaRef.current.reset();
    setVerified(false);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Your email address"
        required
        className="rounded border border-neutral-600 bg-transparent px-4 py-2 text-sm placeholder-white focus:border-orange-500 focus:outline-none"
      />

      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey="6Lf2ntYrAAAAAAfA24Mm5fvJJa9aJKiknoLPWSfW"
        onChange={() => setVerified(true)}
      />

      <button type="submit" className="btn-17">
        <span className="text-container ">
          <span className="text ">Subscribe</span>
        </span>
      </button>
    </form>
  );
}
