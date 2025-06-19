"use client";

export function FeaturesSection() {
  return (
    <section id="features" className="min-h-screen py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#D291BC]">
          Fitur Unggulan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature Cards */}
          <FeatureCard
            title="Pemantauan Kehamilan"
            description="Pantau perkembangan kehamilan Anda dengan mudah dan terstruktur"
          />
          <FeatureCard
            title="Jadwal Kontrol"
            description="Atur dan pantau jadwal kontrol kehamilan Anda"
          />
          <FeatureCard
            title="Informasi Kesehatan"
            description="Akses informasi kesehatan ibu dan anak yang terpercaya"
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 rounded-xl bg-[#FFE3EC]/10 hover:bg-[#FFE3EC]/20 transition-colors">
      <h3 className="text-xl font-semibold text-[#D291BC] mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
} 