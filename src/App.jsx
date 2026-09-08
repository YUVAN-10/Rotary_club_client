import React from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";

export function App() {
  return (
    <div className="flex flex-col min-h-screen selection:bg-[#D4AF37]/30 selection:text-[#0B3C8A]">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
