// components/Shared/BackToTop.jsx
import React, { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-2 left-5 bg-[#FF9C00] hover:bg-white text-white hover:text-[#FF9C00] text-4xl p-3 rounded-full shadow-lg transition z-40 cursor-pointer"
    >
      <ChevronUp size={24} />
    </button>
  );
};

export default BackToTop;
