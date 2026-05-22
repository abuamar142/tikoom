import { requireAdmin } from "@/services/api/auth";
import { getCategories } from "@/services/api/categories";
import { CategoriesClient } from "./CategoriesClient";

export const metadata = {
  title: "Kategori",
};

export default async function CategoriesPage() {
  await requireAdmin();
  const { data: categories, error } = await getCategories();

  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-surface-900">Kategori</h1>
        <p className="mt-1 text-surface-500">
          Kelola kategori event platform
        </p>
      </div>

      <CategoriesClient
        initialCategories={categories || []}
        initialError={error}
      />
    </div>
  );
}
