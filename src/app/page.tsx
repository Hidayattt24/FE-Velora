import { Navbar } from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      
      {/* Home Section */}
      <section id="home" className="min-h-screen pt-16 flex items-center justify-center bg-gradient-to-b from-[#FFE3EC] to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-8">
            <Image
              src="/landing/logononame.svg"
              alt="Velora Logo"
              width={160}
              height={160}
              priority
              className="mb-4"
            />
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 text-[#D291BC]">
              Buku KIA Digital
            </h1>
            <p className="text-lg md:text-xl text-center text-gray-600 max-w-2xl mx-auto">
              Platform digital interaktif untuk memantau dan mendampingi perjalanan kehamilan Anda
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="min-h-screen py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#D291BC]">
            Fitur Unggulan
          </h2>
          {/* Feature content will go here */}
        </div>
      </section>

      {/* Q&A Section */}
      <section id="qa" className="min-h-screen py-20 bg-[#FFE3EC]/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#D291BC]">
            Tanya Jawab
          </h2>
          {/* Q&A content will go here */}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#D291BC]">
            Hubungi Kami
          </h2>
          {/* Contact form will go here */}
        </div>
      </section>
    </div>
  );
}
