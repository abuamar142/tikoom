import { getUser } from "@/services/api/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/atoms/Button/Button";
import { Card } from "@/components/atoms/Card/Card";
import { LogOut, User, Mail, Calendar, Shield } from "lucide-react";
import { logout } from "@/services/api/auth";

export const metadata = {
  title: "Dashboard",
  description: "Your personal dashboard",
};

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-surface-50">
      {/* Header */}
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

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 animate-fade-in">
          <h2 className="text-2xl font-bold text-surface-900">
            Welcome back! 👋
          </h2>
          <p className="mt-1 text-surface-500">
            Here&apos;s your account overview
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 animate-slide-up">
          {/* Profile Card */}
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center">
                <User className="w-7 h-7 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-surface-900">Account</h3>
                <p className="text-sm text-surface-500">Your profile info</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-50">
                <Mail className="w-5 h-5 text-surface-400 shrink-0" />
                <div>
                  <p className="text-xs font-medium text-surface-400">Email</p>
                  <p className="text-sm font-medium text-surface-900">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-50">
                <Calendar className="w-5 h-5 text-surface-400 shrink-0" />
                <div>
                  <p className="text-xs font-medium text-surface-400">Joined</p>
                  <p className="text-sm font-medium text-surface-900">
                    {new Date(user.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Status Card */}
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                <Shield className="w-7 h-7 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-surface-900">Security</h3>
                <p className="text-sm text-surface-500">Account status</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-50">
                <span className="text-sm font-medium text-surface-700">Status</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-50">
                <span className="text-sm font-medium text-surface-700">Auth Provider</span>
                <span className="text-sm font-medium text-surface-900">Email / Password</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-50">
                <span className="text-sm font-medium text-surface-700">User ID</span>
                <span className="text-xs font-mono text-surface-500 truncate max-w-[120px]">
                  {user.id}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
