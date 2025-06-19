"use client";

export function ContactSection() {
  return (
    <section id="contact" className="min-h-screen py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#D291BC]">
          Hubungi Kami
        </h2>
        <div className="max-w-xl mx-auto">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nama
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D291BC] focus:border-transparent"
                placeholder="Masukkan nama Anda"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D291BC] focus:border-transparent"
                placeholder="Masukkan email Anda"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Pesan
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D291BC] focus:border-transparent"
                placeholder="Tulis pesan Anda"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#D291BC] text-white py-2 px-4 rounded-lg hover:bg-[#D291BC]/90 transition-colors"
            >
              Kirim Pesan
            </button>
          </form>
        </div>
      </div>
    </section>
  );
} 