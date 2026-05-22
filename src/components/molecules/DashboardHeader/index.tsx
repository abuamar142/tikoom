import { Button } from "@/components/atoms/Button/Button";
import { LogOut, Calendar, Home } from "lucide-react";
import { logout } from "@/services/api/auth";
import Link from "next/link";

export function DashboardHeader() {
  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-surface-200/80 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-glow">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-surface-900">Tikoom</span>
          </Link>
          <div className="hidden sm:flex items-center gap-1 ml-8">
            <Link href="/" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-surface-500 hover:text-surface-900 hover:bg-surface-50 transition-colors">
              <Home className="h-4 w-4" />
              Beranda
            </Link>
            <span className="px-3 py-2 rounded-lg text-sm font-medium text-surface-900 bg-surface-100">
              Dashboard
            </span>
          </div>
        </div>
        <form action={logout}>
          <Button
            type="submit"
            variant="outline"
            size="sm"
            leftIcon={<LogOut size={16} />}
          >
            Keluar
          </Button>
        </form>
      </div>
    </header>
  );
}
