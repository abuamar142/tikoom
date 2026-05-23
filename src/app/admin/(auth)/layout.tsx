import { redirect } from "next/navigation";
import { getUserRole } from "@/services/api/auth";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userRole = await getUserRole();

  if (!userRole) {
    redirect("/admin/login");
  }

  return <AdminShell userRole={userRole}>{children}</AdminShell>;
}
