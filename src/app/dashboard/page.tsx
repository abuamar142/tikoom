import { getUser } from "@/services/api/auth";
import { redirect } from "next/navigation";
import Dashboard from "@/components/organisms/Dashboard";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Dashboard personal Tikoom. Kelola event favorit dan lihat aktivitas terbaru.",
};

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return <Dashboard user={user} />;
}
