import React, { useState, useEffect } from "react";
import rotaryLogo from "../assets/rotary-logo.png";
import aathmaLogo from "../assets/aathma-logo.png";

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
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-2 sm:py-3 md:py-4 min-h-[6rem] sm:min-h-[7.5rem] md:min-h-[9rem] lg:min-h-[10rem]">
          {/* Centered Grouped Header Banner */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center justify-center gap-2 sm:gap-5 md:gap-7 lg:gap-9 group cursor-pointer text-center max-w-full"
          >
            {/* Left: Rotary Emblem / Silver Jubilee Logo */}
            <div className="relative flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shrink-0">
              <img
                src={rotaryLogo}
                alt="Rotary Club of Erode Central - Silver Jubilee Logo"
                className="h-20 sm:h-28 md:h-32 lg:h-36 w-auto object-contain drop-shadow-xl"
              />
            </div>

            {/* Center: Brand Name */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 md:gap-3 text-center shrink">
              <span className="text-white font-extrabold text-xs sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl tracking-tight font-display whitespace-nowrap drop-shadow-sm">
                ROTARY CLUB OF
              </span>
              <span className="text-[#D4AF37] font-extrabold text-xs sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl tracking-tight font-display whitespace-nowrap drop-shadow-sm">
                ERODE CENTRAL
              </span>
            </div>

            {/* Right: Aathma Theme Logo with White Background Badge */}
            <div className="relative flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl md:rounded-3xl p-1.5 sm:p-2 md:p-2.5 shadow-lg border border-[#D4AF37]/50 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <img
                src={aathmaLogo}
                alt="Rotary Aathma Logo"
                className="h-18 sm:h-25 md:h-29 lg:h-33 w-auto object-contain drop-shadow-sm"
              />
            </div>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;


