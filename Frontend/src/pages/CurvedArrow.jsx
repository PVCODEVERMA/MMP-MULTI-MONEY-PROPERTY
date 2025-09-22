import React, { useState } from "react";

const CurvedArrow = ({ 
  className = "w-16 h-16 text-black",
  animated = true,
  animationType = "draw",
  speed = "normal",
  color = "currentColor",
  onClick 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Animation speed settings
  const speedSettings = {
    slow: { draw: "3s", bounce: "2s" },
    normal: { draw: "1.5s", bounce: "1s" },
    fast: { draw: "0.7s", bounce: "0.5s" }
  };
  
  const selectedSpeed = speedSettings[speed] || speedSettings.normal;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      stroke={color}
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${className} ${isHovered ? 'cursor-pointer' : ''} transition-opacity`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Curved Path with animation */}
      <path 
        d="M20 40 C 40 80, 80 60, 80 80" 
        className={
          animated && animationType === "draw" 
            ? `animate-draw stroke-dasharray-100 stroke-dashoffset-100 ${isHovered ? 'animate-draw-hover' : ''}`
            : ""
        }
        style={
          animated && animationType === "draw" 
            ? { 
                animationDuration: selectedSpeed.draw,
                animationPlayState: isHovered ? 'paused' : 'running'
              } 
            : {}
        }
      />

      {/* Arrow Head with animation */}
      <path 
        d="M75 70 L85 80 L75 90" 
        className={
          animated && animationType === "draw" 
            ? `animate-draw stroke-dasharray-30 stroke-dashoffset-30 ${isHovered ? 'animate-draw-hover' : ''}`
            : animated && animationType === "bounce"
            ? `animate-bounce ${isHovered ? 'animate-pulse' : ''}`
            : ""
        }
        style={
          animated && animationType === "draw" 
            ? { 
                animationDuration: selectedSpeed.draw,
                animationDelay: animationType === "draw" ? selectedSpeed.draw : "0s",
                animationPlayState: isHovered ? 'paused' : 'running'
              } 
            : animated && animationType === "bounce"
            ? { animationDuration: selectedSpeed.bounce }
            : {}
        }
      />
      
      {/* Add CSS animations via style tag */}
      <style>
        {`
          @keyframes draw {
            to {
              stroke-dashoffset: 0;
            }
          }
          .animate-draw {
            animation: draw linear forwards;
          }
          .animate-draw-hover {
            animation-play-state: paused;
          }
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-5px);
            }
          }
          .animate-bounce {
            animation: bounce ease-in-out infinite;
          }
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.7;
            }
          }
          .animate-pulse {
            animation: pulse 0.5s ease-in-out infinite;
          }
          .stroke-dasharray-100 {
            stroke-dasharray: 100;
          }
          .stroke-dashoffset-100 {
            stroke-dashoffset: 100;
          }
          .stroke-dasharray-30 {
            stroke-dasharray: 30;
          }
          .stroke-dashoffset-30 {
            stroke-dashoffset: 30;
          }
        `}
      </style>
    </svg>
  );
};

export default CurvedArrow;