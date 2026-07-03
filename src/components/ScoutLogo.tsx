import React from 'react';

interface ScoutLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export function ScoutLogo({ className = '', size = 48, showText = false }: ScoutLogoProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-1.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm select-none"
      >
        {/* White backing circle to ensure clear contrast in any UI container */}
        <circle cx="50" cy="50" r="48" fill="#ffffff" className="dark:fill-[#121612]" />

        {/* --- 1. OUTER BRAIDED ROPE BORDER (TUNISIAN RED) --- */}
        <circle cx="50" cy="50" r="45" stroke="#e01e2e" strokeWidth="2.2" fill="none" />
        <circle cx="50" cy="50" r="42" stroke="#e01e2e" strokeWidth="0.8" strokeDasharray="3 2.5" fill="none" />

        {/* --- 2. CO-AXIAL TWO-TONE FLEUR-DE-LIS (RED & WHITE) --- */}
        
        {/* Left Wing - Solid Tunisian Red */}
        <path
          d="M 50,56 C 42,56 22,54 20,40 C 18.5,28 32,22 38,32 C 44,42 48,50 50,56 Z"
          fill="#e01e2e"
        />

        {/* Right Wing - White with Red Outline */}
        <path
          d="M 50,56 C 58,56 78,54 80,40 C 81.5,28 68,22 62,32 C 56,42 52,50 50,56 Z"
          fill="#ffffff"
          className="dark:fill-[#121612]"
          stroke="#e01e2e"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Center Petal Left Half - Solid Tunisian Red */}
        <path
          d="M 50,8 C 45,18 41,34 41,56 L 50,56 Z"
          fill="#e01e2e"
        />

        {/* Center Petal Right Half - White with Red Outline */}
        <path
          d="M 50,8 C 55,18 59,34 59,56 L 50,56 Z"
          fill="#ffffff"
          className="dark:fill-[#121612]"
          stroke="#e01e2e"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Bottom Collar (Uniting Band) */}
        <path
          d="M 37,53 C 42,56 58,56 63,53 L 60,59 C 55,62 45,62 40,59 Z"
          fill="#e01e2e"
        />
        
        {/* Lower Points of the Flower */}
        <path
          d="M 44,59 L 50,68 L 56,59 Z"
          fill="#e01e2e"
        />

        {/* --- 3. NATIONAL EMBLEM (STAR & CRESCENT WHITE DISK) --- */}
        <circle
          cx="50"
          cy="44"
          r="10.5"
          fill="#ffffff"
          className="dark:fill-[#121612]"
          stroke="#e01e2e"
          strokeWidth="2.5"
        />
        
        {/* Red Crescent pointing towards upper right */}
        <path
          d="M 46,39 C 42,43 43,49 48,51 C 52,52.5 54,50 55,48.5 C 51.5,49.5 47,47 47,43 C 47,40.5 49,38.5 50.5,38 C 49,38.2 47.5,38.5 46,39 Z"
          fill="#e01e2e"
        />

        {/* Red Star inside the Crescent */}
        <polygon
          points="51.5,41 52.2,42.5 53.8,42.5 52.5,43.4 53,45 51.5,44.1 50,45 50.5,43.4 49.2,42.5 50.8,42.5"
          fill="#e01e2e"
        />

        {/* --- 4. RED SCROLL/RIBBON WITH "استعد" --- */}
        {/* Folded wings of ribbon */}
        <path d="M 22,70 L 26,78 L 18,74 Z" fill="#b0121e" />
        <path d="M 78,70 L 74,78 L 82,74 Z" fill="#b0121e" />

        {/* Main Ribbon Body */}
        <path
          d="M 22,70 Q 50,78 78,70 L 74,78 Q 50,85 26,78 Z"
          fill="#e01e2e"
          stroke="#e01e2e"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />

        {/* Text "استعد" inside the ribbon */}
        <text
          x="50"
          y="77.5"
          fill="#ffffff"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="6"
          fontWeight="900"
          textAnchor="middle"
        >
          استعد
        </text>

        {/* --- 5. REEF KNOT (SCOUT LEADER KNOT) AT THE BOTTOM --- */}
        <path
          d="M 44,90 C 42,88 40,88 38,90 C 36,92 40,94 44,93 Q 48,92 50,89 Q 52,92 56,93 C 60,94 64,92 62,90 C 60,88 58,88 56,90 C 54,92 50,91 49,89 C 48,91 46,92 44,90 Z"
          fill="none"
          stroke="#e01e2e"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
      {showText && (
        <div className="text-center">
          <span className="text-[13px] font-black text-red-600 dark:text-red-400 block tracking-tight">الكشافة التونسية</span>
          <span className="text-[9px] font-semibold text-gray-400 dark:text-gray-500 block uppercase font-mono tracking-wider">Tunisian Scouts</span>
        </div>
      )}
    </div>
  );
}
