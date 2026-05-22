"use client";

import { Calendar, LayoutDashboard, LogOut, Settings, Tag, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminShellProps {
  children: React.ReactNode;
  userRole: string | null;
}

const ALL_SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Calendar, label: "Events", href: "/admin/events" },
  { icon: Tag, label: "Kategori", href: "/admin/categories" },
  { icon: Users, label: "Pengguna", href: "/admin/users", adminOnly: true },
  { icon: Settings, label: "Pengaturan", href: "/admin/settings" },
];

export function AdminShell({ children, userRole }: AdminShellProps) {
  const pathname = usePathname();

  // Don't render admin shell for login page
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-surface-50">{children}</div>;
  }

  const sidebarItems = ALL_SIDEBAR_ITEMS.filter(
    (item) => !item.adminOnly || userRole === "super_admin"
  );

  return (
    <div className="min-h-screen bg-surface-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-surface-200 hidden lg:flex flex-col">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-surface-900">Tikoom</span>
          </Link>
          <p className="mt-1 text-xs text-surface-400 font-medium uppercase tracking-wider">
            Panel Admin
          </p>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary-700 bg-primary-50"
                    : "text-surface-600 hover:text-surface-900 hover:bg-surface-50"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-surface-200 space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-surface-600 hover:text-surface-900 hover:bg-surface-50 transition-colors"
          >
            <LayoutDashboard className="h-5 w-5" />
            User Dashboard
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-surface-600 hover:text-surface-900 hover:bg-surface-50 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Keluar
          </Link>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-surface-200 h-14 flex items-center px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-600">
            <Calendar className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-surface-900">Tikoom Admin</span>
        </Link>
      </div>

      {/* Main Content */}
      <main className="flex-1 lg:ml-0 mt-14 lg:mt-0">
        {children}
      </main>
    </div>
  );
}
