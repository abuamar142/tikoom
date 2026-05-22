"use client";

import { SectionHeader } from "@/components/molecules/SectionHeader/SectionHeader";
import { Search, MapPin, Share2 } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    step: "01",
    title: "Cari Event",
    description: "Jelajahi ribuan event dari berbagai kategori. Gunakan filter untuk menemukan yang paling sesuai.",
    color: "from-primary-500 to-primary-600",
    bgColor: "bg-primary-50",
    iconColor: "text-primary-600",
  },
  {
    icon: MapPin,
    step: "02",
    title: "Lihat Lokasi",
    description: "Lihat detail lokasi event di peta. Rencanakan perjalananmu dengan informasi lengkap.",
    color: "from-secondary-500 to-secondary-600",
    bgColor: "bg-secondary-50",
    iconColor: "text-secondary-600",
  },
  {
    icon: Share2,
    step: "03",
    title: "Bagikan",
    description: "Temukan event seru? Bagikan langsung ke teman via WhatsApp dan ajak mereka ikut!",
    color: "from-accent-500 to-accent-600",
    bgColor: "bg-accent-50",
    iconColor: "text-accent-600",
  },
];

export function LandingHowItWorks() {
  return (
    <section className="py-20 bg-surface-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Cara Kerja"
          subtitle="Tiga langkah mudah untuk menemukan event impianmu"
          centered
        />

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-primary-200 via-secondary-200 to-accent-200" />

          {STEPS.map((step) => (
            <div key={step.title} className="relative flex flex-col items-center text-center">
              {/* Step Number Badge */}
              <div className={`relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl ${step.bgColor} shadow-soft mb-6`}>
                <step.icon className={`h-8 w-8 ${step.iconColor}`} />
                <span className={`absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br ${step.color} text-white text-xs font-bold shadow-md`}>
                  {step.step}
                </span>
              </div>

              <h3 className="text-xl font-bold text-surface-900">{step.title}</h3>
              <p className="mt-3 text-surface-500 leading-relaxed max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
