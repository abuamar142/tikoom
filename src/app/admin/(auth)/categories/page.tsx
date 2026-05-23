import { requireAdmin } from "@/services/api/auth";
import { CategoriesClient } from "./CategoriesClient";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kelola Kategori",
  description: "Kelola kategori event di platform Tikoom. Tambah, edit, dan hapus kategori.",
};

export default async function CategoriesPage() {
  await requireAdmin();

  return (
    <div className="p-6 lg:p-8 w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-surface-900">Kategori</h1>
        <p className="mt-1 text-surface-500">
          Kelola kategori event platform
        </p>
      </div>

      <CategoriesClient />
    </div>
  );
}
