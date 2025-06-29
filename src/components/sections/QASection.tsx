"use client";

import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";

const reviews = [
  {
    name: "Anisa",
    username: "@anisa_mom",
    body: "Velora sangat membantu saya memantau kehamilan. Fitur jurnal kesehatan jiwa benar-benar yang saya butuhkan!",
    img: "https://avatar.vercel.sh/anisa",
  },
  {
    name: "Dina",
    username: "@dina_healthy",
    body: "Linimasa visual memudahkan saya memahami perkembangan janin setiap minggunya. Terima kasih Velora!",
    img: "https://avatar.vercel.sh/dina",
  },
  {
    name: "Sarah",
    username: "@sarah_bumil",
    body: "Pengingat vitamin dan tracking berat badan sangat membantu. Aplikasi yang wajib dimiliki ibu hamil.",
    img: "https://avatar.vercel.sh/sarah",
  },
  {
    name: "Ratna",
    username: "@ratna_sehat",
    body: "Suka banget sama fitur galeri foto progres kehamilan, bisa dokumentasikan momen spesial dengan rapi.",
    img: "https://avatar.vercel.sh/ratna",
  },
  {
    name: "Maya",
    username: "@maya_mom2be",
    body: "Checklist dan anjuran membantu saya tidak lupa hal-hal penting selama kehamilan. Recommended!",
    img: "https://avatar.vercel.sh/maya",
  },
  {
    name: "Lina",
    username: "@lina_happy",
    body: "Kalkulator HPL dan tracking kehamilan sangat akurat. Interface-nya juga cantik dan mudah digunakan.",
    img: "https://avatar.vercel.sh/lina",
  },
];

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-[250px] sm:w-[280px] md:w-[300px] shrink-0 cursor-pointer overflow-hidden rounded-xl border p-3 sm:p-4",
        "border-[#FFE3EC] bg-white hover:bg-[#FFE3EC]/10",
        "transition-colors duration-300"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img
          className="rounded-full border-2 border-[#D291BC]"
          width="32"
          height="32"
          alt={name}
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-[#D291BC]">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-gray-500">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
        {body}
      </blockquote>
    </figure>
  );
};

export function QASection() {
  return (
    <section
      id="testimonials"
      className="relative py-12 sm:py-16 md:py-20 bg-white"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#D291BC]">
            Apa Kata Mereka?
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Dengarkan pengalaman para ibu yang telah menggunakan Velora dalam
            perjalanan kehamilannya
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden gap-4 sm:gap-6 md:gap-8">
          <Marquee className="[--duration:40s] [--gap:1rem]" pauseOnHover>
            {[...reviews, ...reviews].map((review, index) => (
              <ReviewCard key={`${review.username}-${index}`} {...review} />
            ))}
          </Marquee>
          <Marquee
            reverse
            className="[--duration:35s] [--gap:1rem]"
            pauseOnHover
          >
            {[...reviews, ...reviews].map((review, index) => (
              <ReviewCard key={`${review.username}-${index}`} {...review} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white"></div>
        </div>
      </div>

      {/* Gradient transition to footer */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-[#D291BC] opacity-20"></div>
    </section>
  );
}
