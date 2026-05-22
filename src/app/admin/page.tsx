"use client";

import { Card } from "@/components/atoms/Card/Card";
import {
  Calendar,
  Users,
  Ticket,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const STATS = [
  {
    icon: Calendar,
    label: "Total Event",
    value: "156",
    change: "+12%",
    trend: "up",
    color: "text-primary-600",
    bgColor: "bg-primary-50",
  },
  {
    icon: Users,
    label: "Pengguna",
    value: "8,432",
    change: "+8%",
    trend: "up",
    color: "text-secondary-600",
    bgColor: "bg-secondary-50",
  },
  {
    icon: Ticket,
    label: "Tiket Terjual",
    value: "24.5K",
    change: "+23%",
    trend: "up",
    color: "text-accent-600",
    bgColor: "bg-accent-50",
  },
  {
    icon: TrendingUp,
    label: "Pendapatan",
    value: "Rp 1.2M",
    change: "-2%",
    trend: "down",
    color: "text-rose-600",
    bgColor: "bg-rose-50",
  },
];

const RECENT_EVENTS = [
  {
    id: "1",
    title: "JavaScript Conference Indonesia 2025",
    date: "15 Jun 2025",
    status: "Aktif",
    attendees: 1200,
  },
  {
    id: "2",
    title: "Jazz Festival Bandung",
    date: "22 Jun 2025",
    status: "Aktif",
    attendees: 3500,
  },
  {
    id: "3",
    title: "Workshop UI/UX Design",
    date: "28 Jun 2025",
    status: "Draft",
    attendees: 0,
  },
];

const RECENT_USERS = [
  { name: "Ahmad Rizki", email: "ahmad@email.com", date: "2 jam lalu" },
  { name: "Budi Santoso", email: "budi@email.com", date: "5 jam lalu" },
  { name: "Citra Dewi", email: "citra@email.com", date: "1 hari lalu" },
];

export default function AdminPage() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-surface-900">Dashboard</h1>
        <p className="mt-1 text-surface-500">
          Ringkasan performa platform hari ini
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map((stat) => (
          <Card key={stat.label} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-surface-500">{stat.label}</p>
                <p className="text-2xl font-bold text-surface-900 mt-1">
                  {stat.value}
                </p>
              </div>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bgColor}`}
              >
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1">
              {stat.trend === "up" ? (
                <ArrowUpRight className="h-4 w-4 text-success-600" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-danger-600" />
              )}
              <span
                className={`text-sm font-medium ${
                  stat.trend === "up" ? "text-success-600" : "text-danger-600"
                }`}
              >
                {stat.change}
              </span>
              <span className="text-sm text-surface-400">vs bulan lalu</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Events */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-surface-900">
              Event Terbaru
            </h2>
            <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
              Lihat Semua
            </button>
          </div>
          <div className="space-y-3">
            {RECENT_EVENTS.map((event) => (
              <div
                key={event.id}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-50 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600 shrink-0">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-surface-900 truncate">
                    {event.title}
                  </p>
                  <p className="text-xs text-surface-500">
                    {event.date} · {event.attendees.toLocaleString()} peserta
                  </p>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    event.status === "Aktif"
                      ? "bg-success-50 text-success-700"
                      : "bg-surface-100 text-surface-600"
                  }`}
                >
                  {event.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Users */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-surface-900">
              Pengguna Baru
            </h2>
            <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
              Lihat Semua
            </button>
          </div>
          <div className="space-y-3">
            {RECENT_USERS.map((user) => (
              <div
                key={user.email}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-50 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-50 text-secondary-600 shrink-0">
                  <Users className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-surface-900">
                    {user.name}
                  </p>
                  <p className="text-xs text-surface-500 truncate">
                    {user.email}
                  </p>
                </div>
                <span className="text-xs text-surface-400">{user.date}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
