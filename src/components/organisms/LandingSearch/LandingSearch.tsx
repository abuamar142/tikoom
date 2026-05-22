"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

const CATEGORIES = [
  "Semua",
  "Musik",
  "Teknologi",
  "Bisnis",
  "Seni",
  "Olahraga",
  "Kuliner",
  "Pendidikan",
];

export function LandingSearch() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="relative -mt-8 z-10 mx-auto max-w-4xl px-4 sm:px-6">
      <div className="bg-white rounded-2xl shadow-elevated border border-surface-200 p-4 sm:p-6">
        {/* Search Input */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-surface-400" />
            <input
              type="text"
              placeholder="Cari event, konser, workshop..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-surface-200 bg-surface-50 pl-11 pr-4 py-3 text-sm text-surface-900 placeholder:text-surface-400 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 rounded-xl border border-surface-200 text-surface-600 hover:bg-surface-50 transition-colors text-sm font-medium">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>

        {/* Category Chips */}
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-primary-600 text-white shadow-sm"
                  : "bg-surface-100 text-surface-600 hover:bg-surface-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
