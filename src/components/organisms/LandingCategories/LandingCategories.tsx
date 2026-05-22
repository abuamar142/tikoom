"use client";

import { SectionHeader } from "@/components/molecules/SectionHeader/SectionHeader";
import {
  Briefcase,
  GraduationCap,
  Guitar,
  Landmark,
  Music,
  Palette,
  UtensilsCrossed,
  Dumbbell,
} from "lucide-react";

const CATEGORIES = [
  { icon: Music, name: "Musik", count: "120+ event", color: "bg-rose-50 text-rose-600 border-rose-200" },
  { icon: Dumbbell, name: "Olahraga", count: "85+ event", color: "bg-emerald-50 text-emerald-600 border-emerald-200" },
  { icon: GraduationCap, name: "Pendidikan", count: "200+ event", color: "bg-blue-50 text-blue-600 border-blue-200" },
  { icon: Palette, name: "Seni", count: "95+ event", color: "bg-violet-50 text-violet-600 border-violet-200" },
  { icon: UtensilsCrossed, name: "Kuliner", count: "150+ event", color: "bg-amber-50 text-amber-600 border-amber-200" },
  { icon: Briefcase, name: "Bisnis", count: "70+ event", color: "bg-sky-50 text-sky-600 border-sky-200" },
  { icon: Guitar, name: "Festival", count: "40+ event", color: "bg-pink-50 text-pink-600 border-pink-200" },
  { icon: Landmark, name: "Budaya", count: "60+ event", color: "bg-teal-50 text-teal-600 border-teal-200" },
];

export function LandingCategories() {
  return (
    <section id="categories" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Jelajahi Kategori"
          subtitle="Pilih kategori favoritmu dan temukan event yang sesuai minat"
          centered
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((category) => (
            <button
              key={category.name}
              className={`group flex flex-col items-center p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-soft hover:-translate-y-1 ${category.color}`}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/80 backdrop-blur-sm shadow-sm mb-4 group-hover:scale-110 transition-transform">
                <category.icon className="h-7 w-7" />
              </div>
              <h3 className="text-base font-bold">{category.name}</h3>
              <p className="mt-1 text-sm opacity-80">{category.count}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
