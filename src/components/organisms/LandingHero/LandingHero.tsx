"use client";

import { Button } from "@/components/atoms/Button/Button";
import { ArrowRight, Calendar, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-surface-50 via-white to-primary-50/30">
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-primary-200/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-[5%] w-96 h-96 bg-secondary-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center max-w-4xl mx-auto">
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-sm font-medium mb-8 animate-fade-in">
            <Sparkles className="h-4 w-4" />
            Platform Event Discovery Terbaik di Indonesia
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-surface-900 tracking-tight leading-tight animate-slide-up">
            Temukan Event{" "}
            <span className="text-gradient">Seru</span>{" "}
            di Sekitarmu
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg sm:text-xl text-surface-500 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Dari konser, workshop, festival, hingga seminar — temukan dan bagikan
            pengalaman tak terlupakan bersama ribuan orang.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Link href="/#events">
              <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                Jelajahi Event
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" size="lg">
                Daftar Gratis
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            {[
              { icon: Calendar, value: "500+", label: "Event Aktif" },
              { icon: MapPin, value: "50+", label: "Kota" },
              { icon: Sparkles, value: "10K+", label: "Pengguna" },
              { icon: Calendar, value: "100+", label: "Kategori" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-surface-200/60"
              >
                <stat.icon className="h-5 w-5 text-primary-500 mb-2" />
                <p className="text-2xl font-bold text-surface-900">{stat.value}</p>
                <p className="text-sm text-surface-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
