import React from "react";

export const Hero = () => {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-[#0B3C8A] via-[#082D68] to-[#062354] text-white pt-10 pb-12 sm:pt-14 sm:pb-16">
      {/* Abstract Background Pattern (Rotary Gear & Concentric Geometric Circles) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none select-none overflow-hidden">
        <div className="absolute -right-24 -top-24 w-96 h-96 lg:w-[32rem] lg:h-[32rem] rounded-full border-[12px] border-dashed border-[#D4AF37] animate-[spin_120s_linear_infinite]" />
        <div className="absolute -left-28 -bottom-28 w-80 h-80 lg:w-[28rem] lg:h-[28rem] rounded-full border-[8px] border-dotted border-white/40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-display mb-3">
          Welcome to <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-[#F5E6BE]">
            Rotary Club of Erode Central
          </span>
        </h1>

        {/* Gold Accent Divider Line */}
        <div className="flex items-center justify-center gap-2 my-4">
          <div className="h-[2px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
          <div className="h-[2px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-blue-100/90 font-medium leading-relaxed">
          <span className="text-[#D4AF37] font-semibold italic">"Service Above Self"</span> — Connecting Leaders, Building Communities, Creating Lasting Impact.
        </p>
      </div>
    </section>
  );
};
