import React, { useState, useEffect } from "react";
import rotaryLogo from "../assets/rotary-logo.png";
import aathmaLogo from "../assets/aathma-logo-white-stroke.png";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "bg-[#0B3C8A]/95 backdrop-blur-md shadow-lg border-b border-[#D4AF37]/30"
          : "bg-[#0B3C8A] border-b border-[#0B3C8A]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-2 sm:py-3 md:py-4 min-h-[5.5rem] sm:min-h-[7rem] md:min-h-[8.5rem]">
          {/* Centered Grouped Header Banner */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center justify-center gap-2 sm:gap-5 md:gap-7 lg:gap-8 group cursor-pointer text-center max-w-full"
          >
            {/* Left: Rotary Emblem / Silver Jubilee Logo */}
            <div className="relative flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shrink-0">
              <img
                src={rotaryLogo}
                alt="Rotary Club of Erode Central - Silver Jubilee Logo"
                className="h-16 sm:h-24 md:h-28 lg:h-32 w-auto object-contain drop-shadow-lg"
              />
            </div>

            {/* Center: Brand Name */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 md:gap-3 text-center shrink">
              <span className="text-white font-extrabold text-xs sm:text-xl md:text-2xl lg:text-3xl tracking-tight font-display whitespace-nowrap drop-shadow-sm">
                ROTARY CLUB OF
              </span>
              <span className="text-[#D4AF37] font-extrabold text-xs sm:text-xl md:text-2xl lg:text-3xl tracking-tight font-display whitespace-nowrap drop-shadow-sm">
                ERODE CENTRAL
              </span>
            </div>

            {/* Right: Aathma Theme Logo (Crisp White/Gold Silhouette Stroke, No Box) */}
            <div className="relative flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shrink-0">
              {/* Subtle ambient soft backlight glow */}
              <div className="absolute inset-0 rounded-full bg-white/10 blur-xl pointer-events-none" />
              <img
                src={aathmaLogo}
                alt="Rotary Aathma Logo"
                className="h-16 sm:h-24 md:h-28 lg:h-32 w-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
              />
            </div>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

