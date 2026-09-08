import React from "react";

export const Footer = () => {
  return (
    <footer id="footer" className="w-full bg-[#08152c] border-t border-slate-800 text-slate-400 py-4 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm">
        {/* Left: Gold Dot + Rotary Club of Erode Central */}
        <div className="flex items-center gap-2 text-slate-200 font-medium">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] inline-block shadow-[0_0_6px_#D4AF37]" />
          <span className="tracking-wide">Rotary Club of Erode Central</span>
        </div>

        {/* Right: Copyright */}
        <div className="text-slate-400 text-xs">
          © 2026 All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};
