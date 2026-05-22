import { getUser } from "@/services/api/auth";
import { redirect } from "next/navigation";
import Dashboard from "@/components/organisms/Dashboard";

export const metadata = {
  title: "Dashboard",
  description: "Your personal dashboard",
};

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return <Dashboard user={user} />;
}
