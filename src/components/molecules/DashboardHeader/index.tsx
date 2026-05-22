import { Button } from "@/components/atoms/Button/Button";
import { LogOut, Shield } from "lucide-react";
import { logout } from "@/services/api/auth";

export function DashboardHeader() {
  return (
    <header className="bg-white border-b border-surface-200 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-lg font-bold text-surface-900">Tikoom</h1>
        </div>
        <form action={logout}>
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            leftIcon={<LogOut size={16} />}
          >
            Sign Out
          </Button>
        </form>
      </div>
    </header>
  );
}
