"use client";

import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { QASection } from "@/components/sections/QASection";
import { ContactSection } from "@/components/sections/ContactSection";
import { useState, useEffect } from "react";

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Wait for 5 seconds before showing the content
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      {showContent && <Navbar />}
      <HeroSection />
      <FeaturesSection />
      <QASection />
      <ContactSection />
    </div>
  );
}
