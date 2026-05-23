"use client";

import { DashboardHeader } from "@/components/molecules/DashboardHeader";
import { EventCard } from "@/components/molecules/EventCard/EventCard";
import { Card } from "@/components/atoms/Card/Card";
import { Button } from "@/components/atoms/Button/Button";
import {
  Calendar,
  Heart,
  Ticket,
  User,
  MapPin,
  Bell,
  Search,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface DashboardProps {
  user: {
    id: string;
    email?: string | undefined;
    created_at: string;
  };
}

const QUICK_STATS = [
  {
    icon: Calendar,
    label: "Event Diikuti",
    value: "0",
    color: "text-primary-600",
    bgColor: "bg-primary-50",
  },
  {
    icon: Heart,
    label: "Disimpan",
    value: "0",
    color: "text-rose-600",
    bgColor: "bg-rose-50",
  },
  {
    icon: Ticket,
    label: "Tiket Aktif",
    value: "0",
    color: "text-secondary-600",
    bgColor: "bg-secondary-50",
  },
  {
    icon: Bell,
    label: "Notifikasi",
    value: "0",
    color: "text-accent-600",
    bgColor: "bg-accent-50",
  },
];

// TODO: Ganti dengan data dari API saat fitur event tersedia
const SAVED_EVENTS: typeof EventCard.prototype.event[] = [];

export default function Dashboard({ user }: DashboardProps) {
  return (
    <div className="min-h-screen bg-surface-50">
      <DashboardHeader />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl font-bold text-surface-900">
            Halo, {user.email?.split("@")[0] || "Pengguna"}! 👋
          </h2>
          <p className="mt-1 text-surface-500">
            Ini ringkasan aktivitas eventmu hari ini
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-slide-up">
          {QUICK_STATS.map((stat) => (
            <Card
              key={stat.label}
              className="p-5 hover:shadow-soft transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.bgColor}`}
                >
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-surface-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-surface-500">{stat.label}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Saved Events */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-surface-900">
                  Event Tersimpan
                </h3>
                <Link
                  href="/"
                  className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1 group"
                >
                  Lihat Semua
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
              {SAVED_EVENTS.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  {SAVED_EVENTS.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <Heart className="h-12 w-12 text-surface-300 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-surface-700">
                    Belum ada event tersimpan
                  </h4>
                  <p className="mt-1 text-surface-500 text-sm">
                    Cari event menarik dan simpan untuk dilihat nanti
                  </p>
                  <Link href="/" className="inline-block mt-4">
                    <Button size="sm" leftIcon={<Search className="h-4 w-4" />}>
                      Jelajahi Event
                    </Button>
                  </Link>
                </Card>
              )}
            </section>

            {/* Upcoming Events */}
            <section>
              <h3 className="text-lg font-bold text-surface-900 mb-6">
                Event Akan Datang
              </h3>
              <Card className="p-8 text-center">
                <Calendar className="h-12 w-12 text-surface-300 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-surface-700">
                  Belum ada event terdaftar
                </h4>
                <p className="mt-1 text-surface-500 text-sm">
                  Daftar ke event favoritmu dan lihat jadwalnya di sini
                </p>
                <Link href="/" className="inline-block mt-4">
                  <Button size="sm" leftIcon={<Search className="h-4 w-4" />}>
                    Cari Event
                  </Button>
                </Link>
              </Card>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <Card className="p-5">
              <h3 className="text-sm font-semibold text-surface-500 uppercase tracking-wider mb-4">
                Profil
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-600">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-surface-900 truncate">
                    {user.email?.split("@")[0] || "Pengguna"}
                  </p>
                  <p className="text-xs text-surface-500 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-surface-600">
                  <MapPin className="h-4 w-4 text-surface-400 shrink-0" />
                  <span>Indonesia</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-surface-600">
                  <Calendar className="h-4 w-4 text-surface-400 shrink-0" />
                  <span>
                    Bergabung{" "}
                    {new Date(user.created_at).toLocaleDateString("id-ID", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-5">
              <h3 className="text-sm font-semibold text-surface-500 uppercase tracking-wider mb-4">
                Aksi Cepat
              </h3>
              <div className="space-y-2">
                <Link href="/">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    leftIcon={<Search className="h-4 w-4" />}
                  >
                    Cari Event
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  leftIcon={<Heart className="h-4 w-4" />}
                >
                  Event Tersimpan
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  leftIcon={<Bell className="h-4 w-4" />}
                >
                  Notifikasi
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
