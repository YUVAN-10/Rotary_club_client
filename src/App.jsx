import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { PremiumLoader } from "./components/PremiumLoader";

export function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="flex flex-col min-h-screen selection:bg-[#D4AF37]/30 selection:text-[#0B3C8A] relative bg-[#F8FAFC]">
      {/* Full-screen Luxury Loader (Completely opaque & solid) */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <PremiumLoader
            key="premium-loader"
            minDuration={2800}
            onComplete={() => setIsLoading(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Website Content - hidden completely until loading finishes, then smoothly fades in */}
      {!isLoading ? (
        <motion.div
          key="main-content"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col min-h-screen w-full"
        >
          <Navbar />
          <Home />
          <Footer />
        </motion.div>
      ) : (
        /* Hidden placeholder to avoid layout shift before entrance */
        <div className="opacity-0 pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
          <Navbar />
        </div>
      )}
    </div>
  );
}

export default App;
