import { getUserRole } from "@/services/api/auth";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userRole = await getUserRole();

  return <AdminShell userRole={userRole}>{children}</AdminShell>;
}
