import { DashboardHeader } from "@/components/molecules/DashboardHeader";
import { ProfileCard } from "@/components/molecules/ProfileCard";
import { SecurityCard } from "@/components/molecules/SecurityCard";

interface DashboardProps {
  user: {
    id: string;
    email?: string | undefined;
    created_at: string;
  };
}

export default function Dashboard({ user }: DashboardProps) {
  return (
    <main className="min-h-screen bg-surface-50">
      <DashboardHeader />

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
          <ProfileCard email={user.email} createdAt={user.created_at} />
          <SecurityCard userId={user.id} />
        </div>
      </div>
    </main>
  );
}
