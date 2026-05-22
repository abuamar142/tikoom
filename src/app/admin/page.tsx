import { requireAdmin } from "@/services/api/auth";
import { getCategories } from "@/services/api/categories";
import { createServerSupabaseClient } from "@/services/config/supabase-server";
import { Card } from "@/components/atoms/Card/Card";
import {
  Calendar,
  Users,
  Tag,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export const metadata = {
  title: "Admin Dashboard",
};

export default async function AdminPage() {
  await requireAdmin();

  const supabase = await createServerSupabaseClient();

  // Get real counts from Supabase
  const { count: userCount } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  const { data: categories } = await getCategories();

  const stats = [
    {
      icon: Calendar,
      label: "Total Event",
      value: "0",
      change: "+0%",
      trend: "up" as const,
      color: "text-primary-600",
      bgColor: "bg-primary-50",
    },
    {
      icon: Users,
      label: "Pengguna",
      value: userCount?.toString() || "0",
      change: "+8%",
      trend: "up" as const,
      color: "text-secondary-600",
      bgColor: "bg-secondary-50",
    },
    {
      icon: Tag,
      label: "Kategori",
      value: categories?.length.toString() || "0",
      change: "+12%",
      trend: "up" as const,
      color: "text-accent-600",
      bgColor: "bg-accent-50",
    },
    {
      icon: TrendingUp,
      label: "Pendapatan",
      value: "Rp 0",
      change: "0%",
      trend: "down" as const,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
    },
  ];

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
        {stats.map((stat) => (
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
        {/* Categories Overview */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-surface-900">
              Kategori
            </h2>
            <a href="/admin/categories" className="text-sm font-medium text-primary-600 hover:text-primary-700">
              Kelola
            </a>
          </div>
          <div className="space-y-3">
            {categories && categories.length > 0 ? (
              categories.slice(0, 5).map((category) => (
                <div
                  key={category.id}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-50 transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600 shrink-0">
                    <Tag className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-surface-900">
                      {category.name}
                    </p>
                    <p className="text-xs text-surface-500 truncate">
                      {category.description || "Tidak ada deskripsi"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-surface-500 text-center py-4">
                Belum ada kategori
              </p>
            )}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-5">
          <h2 className="text-lg font-bold text-surface-900 mb-4">
            Aksi Cepat
          </h2>
          <div className="space-y-2">
            <a
              href="/admin/categories"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-50 transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-50 text-accent-600">
                <Tag className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-surface-900">Kelola Kategori</p>
                <p className="text-xs text-surface-500">Tambah, edit, hapus kategori</p>
              </div>
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
