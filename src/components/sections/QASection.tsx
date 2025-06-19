"use client";

export function QASection() {
  return (
    <section id="qa" className="min-h-screen py-20 bg-[#FFE3EC]/20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#D291BC]">
          Tanya Jawab
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <QAItem
            question="Apa itu Velora?"
            answer="Velora adalah platform digital yang membantu ibu hamil dalam memantau dan mendokumentasikan perjalanan kehamilannya, menggantikan buku KIA konvensional dalam format digital yang lebih praktis."
          />
          <QAItem
            question="Apakah Velora aman digunakan?"
            answer="Ya, Velora mengutamakan keamanan data pengguna dengan menggunakan enkripsi data dan mematuhi standar keamanan yang ketat."
          />
          <QAItem
            question="Bagaimana cara menggunakan Velora?"
            answer="Cukup daftar akun, isi data kehamilan Anda, dan mulai gunakan fitur-fitur yang tersedia seperti pemantauan kehamilan, jadwal kontrol, dan akses informasi kesehatan."
          />
        </div>
      </div>
    </section>
  );
}

function QAItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="p-6 rounded-xl bg-white shadow-sm">
      <h3 className="text-lg font-semibold text-[#D291BC] mb-2">{question}</h3>
      <p className="text-gray-600">{answer}</p>
    </div>
  );
} 