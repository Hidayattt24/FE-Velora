"use client";

import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { QASection } from "@/components/sections/QASection";
import { ContactSection } from "@/components/sections/ContactSection";
import { SplashScreen } from "@/components/SplashScreen";
import { useState, useEffect } from "react";

export default function Home() {
  const [isSplashComplete, setIsSplashComplete] = useState(false);

  // Function to handle splash screen completion
  const handleSplashComplete = () => {
    setIsSplashComplete(true);
  };

  return (
    <main>
      <SplashScreen onComplete={handleSplashComplete} />
      <div className={`transition-opacity duration-500 ${isSplashComplete ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <QASection />
        <ContactSection />
      </div>
    </main>
  );
}
