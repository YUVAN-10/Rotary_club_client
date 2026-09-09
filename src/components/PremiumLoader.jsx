import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import rotaryLogo from "../assets/rotary-logo.png";

export const PremiumLoader = ({ onComplete, minDuration = 2800 }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Lock body scrolling while loader is active
    document.body.style.overflow = "hidden";

    const startTime = performance.now();
    let animationFrameId;

    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / minDuration, 1);

      // Custom smooth easing curve for luxury experience
      const easeProgress = Math.min(
        Math.round(
          rawProgress < 0.7
            ? rawProgress * 1.15 * 100
            : 80.5 + (rawProgress - 0.7) * 65
        ),
        100
      );

      setProgress(easeProgress);

      if (rawProgress < 1) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        // Brief hold at 100% to let gold completion pulse take effect
        setTimeout(() => {
          document.body.style.overflow = "";
          if (onComplete) onComplete();
        }, 300);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.body.style.overflow = "";
    };
  }, [minDuration, onComplete]);

  // Subtle floating background particles
  const particles = [
    { top: "12%", left: "15%", size: 4, delay: 0, duration: 4 },
    { top: "18%", left: "85%", size: 5, delay: 0.8, duration: 5 },
    { top: "75%", left: "14%", size: 5, delay: 1.2, duration: 4.5 },
    { top: "82%", left: "84%", size: 4, delay: 0.4, duration: 6 },
    { top: "45%", left: "8%", size: 3, delay: 1.6, duration: 3.8 },
    { top: "48%", left: "91%", size: 4, delay: 2, duration: 5.2 },
    { top: "15%", left: "50%", size: 4, delay: 1, duration: 4.2 },
    { top: "88%", left: "50%", size: 3, delay: 0.6, duration: 5.5 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.02,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
      }}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden select-none bg-white px-4 py-8"
      style={{
        backgroundColor: "#FFFFFF",
        backgroundImage:
          "radial-gradient(circle at 50% 42%, #FDFBF5 0%, #F5F7FC 40%, #FFFFFF 85%)",
      }}
    >
      {/* Ambient Radial Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] sm:w-[40rem] sm:h-[40rem] rounded-full bg-gradient-to-tr from-[#0B3C8A]/10 via-[#D4AF37]/15 to-transparent blur-3xl pointer-events-none"
        />
      </div>

      {/* Floating Gold & Blue Ambient Particles */}
      {particles.map((p, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0.2, 0.7, 0.2],
            y: [-10, 10, -10],
            x: [-5, 5, -5],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            background:
              index % 2 === 0
                ? "radial-gradient(circle, #D4AF37 0%, rgba(212, 175, 55, 0) 70%)"
                : "radial-gradient(circle, #0B3C8A 0%, rgba(11, 60, 138, 0) 70%)",
            boxShadow:
              index % 2 === 0
                ? "0 0 8px 1px rgba(212, 175, 55, 0.4)"
                : "0 0 6px 1px rgba(11, 60, 138, 0.25)",
          }}
        />
      ))}

      {/* Center Main Stage */}
      <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto z-10">
        {/* Stage 1: Logo & Concentric Rotating Orbit Rings */}
        <div className="relative flex items-center justify-center w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mb-8 sm:mb-10 md:mb-12 shrink-0">
          {/* Outer Dashed Chronometer Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-dashed border-[#D4AF37]/30 pointer-events-none"
          />

          {/* Middle Rotating Metallic Gold Conic Gradient Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            className="absolute w-[82%] h-[82%] rounded-full pointer-events-none"
            style={{
              border: "1.5px solid transparent",
              backgroundImage:
                "linear-gradient(#FFFFFF, #FFFFFF), conic-gradient(from 0deg, #D4AF37 0%, rgba(212,175,55,0.1) 40%, #0B3C8A 65%, #FFF2A7 85%, #D4AF37 100%)",
              backgroundOrigin: "border-box",
              backgroundClip: "content-box, border-box",
              boxShadow: "0 0 14px rgba(212, 175, 55, 0.15)",
            }}
          >
            {/* Orbiting Gold Bead 1 */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-[#B89020] to-[#FFF2A7] shadow-[0_0_8px_#D4AF37]" />
            {/* Orbiting Blue Bead 2 */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#0B3C8A] shadow-[0_0_6px_rgba(11,60,138,0.5)]" />
          </motion.div>

          {/* Inner Golden Orbit Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute w-[66%] h-[66%] rounded-full border border-[#D4AF37]/35 pointer-events-none"
          >
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_6px_#D4AF37]" />
          </motion.div>

          {/* Soft Radial Backlight for Logo */}
          <motion.div
            animate={{
              scale: [0.95, 1.15, 0.95],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-[55%] h-[55%] rounded-full bg-radial from-[#D4AF37]/25 via-[#0B3C8A]/10 to-transparent blur-xl pointer-events-none"
          />

          {/* Center Logo Container with Floating, Glow Pulse & Light Sweep */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: [-3, 3, -3],
            }}
            transition={{
              scale: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.8, ease: "easeOut" },
              y: {
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.9,
              },
            }}
            className="relative z-10 w-[50%] h-[50%] flex items-center justify-center p-1.5 rounded-2xl"
          >
            {/* Golden Pulsing Glow behind Logo */}
            <motion.div
              animate={{
                opacity: [0.35, 0.75, 0.35],
                scale: [0.98, 1.05, 0.98],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                filter: "drop-shadow(0 0 14px rgba(212, 175, 55, 0.45))",
              }}
            />

            {/* Rotary Logo with Light Sweep Overlay */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl">
              <img
                src={rotaryLogo}
                alt="Rotary Club of Erode Central"
                className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(11,60,138,0.15)]"
              />

              {/* Golden Light Sweep Passing Across Logo */}
              <motion.div
                initial={{ x: "-160%" }}
                animate={{ x: "220%" }}
                transition={{
                  repeat: Infinity,
                  duration: 2.2,
                  ease: "easeInOut",
                  repeatDelay: 1.2,
                }}
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 25%, rgba(255, 255, 255, 0.75) 48%, rgba(212, 175, 55, 0.8) 52%, transparent 75%)",
                  mixBlendMode: "overlay",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Stage 2: Typography Section (Cleanly separated with ample margin) */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center px-4 mb-7 sm:mb-9 w-full"
        >
          {/* Main Title */}
          <h1 className="text-sm sm:text-lg md:text-xl font-extrabold font-display tracking-[0.2em] sm:tracking-[0.26em] uppercase flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <span className="text-[#0B3C8A]">ROTARY CLUB OF</span>
            <span className="text-[#B89020]">ERODE CENTRAL</span>
          </h1>

          {/* Subtitle with Flanking Gold Lines */}
          <div className="flex items-center justify-center gap-3 mt-2 sm:mt-2.5 w-full max-w-xs">
            <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-[#D4AF37]" />
            <motion.p
              animate={{
                opacity: [0.85, 1, 0.85],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-[10px] sm:text-xs font-semibold tracking-[0.28em] uppercase text-[#AA771C] font-sans whitespace-nowrap"
            >
              Service Above Self
            </motion.p>
            <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#D4AF37]/50 to-[#D4AF37]" />
          </div>
        </motion.div>

        {/* Stage 3: Luxury Progress Bar Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center w-52 sm:w-64 md:w-72 px-2"
        >
          {/* Outer Track */}
          <div className="relative w-full h-1.5 sm:h-2 bg-[#0B3C8A]/10 rounded-full overflow-hidden p-[1px] border border-[#D4AF37]/35 shadow-inner">
            {/* Progress Fill Bar */}
            <motion.div
              className="h-full rounded-full relative overflow-hidden"
              style={{
                width: `${progress}%`,
                background:
                  "linear-gradient(90deg, #0B3C8A 0%, #B89020 30%, #D4AF37 70%, #FFF2A7 100%)",
                boxShadow: "0 0 10px rgba(212, 175, 55, 0.6)",
              }}
              transition={{ ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
            </motion.div>
          </div>

          {/* Percentage & Status Label */}
          <div className="flex items-center justify-between w-full mt-2.5 px-0.5 text-[10px] sm:text-[11px] font-mono font-medium text-slate-500">
            <span className="tracking-widest uppercase text-[#0B3C8A]/80 font-sans font-semibold text-[9px] sm:text-[10px]">
              {progress < 100 ? "Loading Experience..." : "Welcome"}
            </span>
            <span className="text-[#B89020] font-bold tabular-nums">
              {progress}%
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PremiumLoader;
