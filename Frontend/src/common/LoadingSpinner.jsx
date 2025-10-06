import React from "react";
import logo from "../assets/componyLogos/logo.jpg";

export default function LoadingSpinner({
  message = "Loading...",
  spinnerSize = 80,          // outer circle size (px)
  spinnerColor = "orange-500", // Tailwind color name or hex
  logoSize = 40              // inner logo size (px)
}) {
  // Map Tailwind color to hex fallback
  const colorMap = {
    "orange-500": "#F97316",
    "blue-500": "#3B82F6",
    "green-500": "#22C55E",
    "red-500": "#EF4444",
    "yellow-500": "#EAB308",
    "gray-500": "#6B7280"
  };

  const resolvedColor = colorMap[spinnerColor] || spinnerColor;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      {/* Spinner wrapper */}
      <div className="relative">
        {/* Outer spinning ring */}
        <div
          className="rounded-full border-4 animate-spin"
          style={{
            width: spinnerSize,
            height: spinnerSize,
            borderColor: resolvedColor,
            borderTopColor: "transparent",
          }}
        />

        {/* Logo inside circle */}
        <img
          src={logo}
          alt="Logo"
          style={{ width: logoSize, height: logoSize }}
          className="absolute inset-0 m-auto rounded-full object-contain"
        />
      </div>

      {/* Loading text */}
      <p className="mt-4 text-gray-600 font-medium animate-pulse text-center">
        {message}
      </p>
    </div>
  );
}
