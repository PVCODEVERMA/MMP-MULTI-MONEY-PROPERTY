import React from "react";

const circleClasses =
  "absolute top-1/2 left-1/2 w-5 h-5 bg-[#FF9C00] rounded-full opacity-0 transition-all duration-700 ease-out group-hover:w-56 group-hover:h-56 group-hover:opacity-20 -translate-x-1/2 -translate-y-1/2";

const svgBaseClasses = "absolute w-6 transition-all duration-700 ease-out";

const ActionButtons = ({
  primaryText = "Get Started",
  onPrimaryClick,
  secondaryText = "Book a Demo",
  onSecondaryClick,
  variant = "horizontal",
}) => {
  const containerClass =
    variant === "vertical"
      ? "flex flex-col gap-3"
      : "flex flex-col sm:flex-row gap-3";

  const buttonClass =
    variant === "vertical"
      ? "w-full px-6 py-2"
      : "w-full sm:w-auto px-6 sm:px-24 py-2";

  const renderButton = (text, onClick) => (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex items-center justify-center gap-2 font-semibold rounded-full text-[#FF9C00] bg-[#F7F7F7] border-2 border-[#FF9C00] shadow-md overflow-hidden transition-all duration-500 ease-out hover:bg-[#FF9C00] hover:text-[#F7F7F7] active:scale-95 cursor-pointer ${buttonClass}`}
    >
      {/* Left Arrow */}
      <svg
        viewBox="0 0 24 24"
        className={`${svgBaseClasses} left-[-25%] group-hover:left-4`}
      >
        <path
          d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
          fill="#FF9C00"
          className="group-hover:fill-white"
        />
      </svg>

      {/* Text */}
      <span className="relative z-10 font-body transform group-hover:translate-x-3 transition-all duration-700">
        {text}
      </span>

      {/* Expanding Circle */}
      <span className={circleClasses}></span>

      {/* Right Arrow */}
      <svg
        viewBox="0 0 24 24"
        className={`${svgBaseClasses} right-4 group-hover:right-[-25%]`}
      >
        <path
          d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
          fill="#FF9C00"
          className="group-hover:fill-white"
        />
      </svg>
    </button>
  );

  return (
    <div className={containerClass}>
      {onPrimaryClick && renderButton(primaryText, onPrimaryClick)}
      {onSecondaryClick && renderButton(secondaryText, onSecondaryClick)}
    </div>
  );
};

export default ActionButtons;
