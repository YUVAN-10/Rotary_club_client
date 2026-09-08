import React, { useState, useEffect } from "react";

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
        <div className="flex items-center justify-center h-16 sm:h-20">
          {/* Centered Single-Line Logo & Brand */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer text-center"
          >
            {/* Rotary Emblem Logo */}
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] p-0.5 shadow-md group-hover:scale-105 transition-transform duration-300 shrink-0">
              <div className="w-full h-full bg-[#0B3C8A] rounded-full flex items-center justify-center p-1.5 overflow-hidden">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full text-[#D4AF37] fill-current animate-[spin_20s_linear_infinite]"
                >
                  <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="6" />
                  <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="4" />
                  <circle cx="50" cy="50" r="14" fill="currentColor" />
                  <circle cx="50" cy="50" r="6" fill="#0B3C8A" />
                  {[0, 60, 120, 180, 240, 300].map((deg) => (
                    <rect
                      key={deg}
                      x="46"
                      y="2"
                      width="8"
                      height="12"
                      rx="2"
                      transform={`rotate(${deg} 50 50)`}
                      fill="currentColor"
                    />
                  ))}
                  {[0, 60, 120, 180, 240, 300].map((deg) => (
                    <line
                      key={`spoke-${deg}`}
                      x1="50"
                      y1="22"
                      x2="50"
                      y2="36"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                      transform={`rotate(${deg} 50 50)`}
                    />
                  ))}
                </svg>
              </div>
            </div>

            {/* Single-Line Brand Name */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center">
              <span className="text-white font-extrabold text-sm sm:text-lg tracking-tight font-display whitespace-nowrap">
                ROTARY CLUB OF
              </span>
              <span className="text-[#D4AF37] font-extrabold text-sm sm:text-lg tracking-tight font-display whitespace-nowrap">
                ERODE CENTRAL
              </span>
            </div>
          </a>
        </div>
      </div>
    </header>
  );
};
