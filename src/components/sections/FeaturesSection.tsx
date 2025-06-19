"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingCarousel } from "@/components/ui/loading-carousel"

export function FeaturesSection() {
  return (
    <section id="features" className="min-h-screen py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#D291BC]">
          Fitur Unggulan
        </h2>
        
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Main Feature Carousel */}
          <Card>
            <CardContent className="p-6">
              <LoadingCarousel
                aspectRatio="wide"
                backgroundGradient={true}
                showNavigation={true}
                autoplayInterval={5000}
              />
            </CardContent>
          </Card>

          {/* Additional Feature Views */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Interactive Timeline View */}
            <Card>
              <CardHeader>
                <CardTitle>Linimasa Interaktif</CardTitle>
              </CardHeader>
              <CardContent>
                <LoadingCarousel
                  aspectRatio="square"
                  textPosition="top"
                  showIndicators={false}
                  autoplayInterval={4000}
                />
              </CardContent>
            </Card>

            {/* Digital Journal View */}
            <Card>
              <CardHeader>
                <CardTitle>Jurnal Digital</CardTitle>
              </CardHeader>
              <CardContent>
                <LoadingCarousel
                  aspectRatio="square"
                  backgroundTips={true}
                  showProgress={false}
                  shuffleTips={true}
                  autoplayInterval={3000}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
} 