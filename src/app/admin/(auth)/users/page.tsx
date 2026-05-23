import { requireSuperAdmin } from "@/services/api/auth";
import { UsersClient } from "./UsersClient";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kelola Pengguna",
  description: "Kelola pengguna platform Tikoom. Lihat, ubah role, dan aktifkan/nonaktifkan pengguna.",
};

export default async function UsersPage() {
  await requireSuperAdmin();

  return (
    <div className="p-6 lg:p-8 w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-surface-900">Kelola Pengguna</h1>
        <p className="mt-1 text-surface-500">
          Lihat dan kelola pengguna platform
        </p>
      </div>

      <UsersClient />
    </div>
  );
}
