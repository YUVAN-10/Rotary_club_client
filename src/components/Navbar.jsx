import React, { useState, useEffect } from "react";
import rotaryLogo from "../assets/rotary-logo.png";

export const Navbar = () => {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-2 sm:py-3 min-h-[5.25rem] sm:min-h-[6.25rem] md:min-h-[7rem]">
          {/* Centered Single-Line Logo & Brand */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-3.5 sm:gap-5 group cursor-pointer text-center"
          >
            {/* Rotary Emblem Logo */}
            <div className="relative flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shrink-0">
              <img
                src={rotaryLogo}
                alt="Rotary Club of Erode Central - Silver Jubilee Logo"
                className="h-16 sm:h-20 md:h-24 w-auto object-contain drop-shadow-lg"
              />
            </div>

            {/* Single-Line Brand Name */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
              <span className="text-white font-extrabold text-base sm:text-xl md:text-2xl tracking-tight font-display whitespace-nowrap drop-shadow-sm">
                ROTARY CLUB OF
              </span>
              <span className="text-[#D4AF37] font-extrabold text-base sm:text-xl md:text-2xl tracking-tight font-display whitespace-nowrap drop-shadow-sm">
                ERODE CENTRAL
              </span>
            </div>
          </a>
        </div>
      </div>
    </header>
  );
};
