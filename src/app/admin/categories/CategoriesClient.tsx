"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/atoms/Button/Button";
import { Card } from "@/components/atoms/Card/Card";
import { Input } from "@/components/atoms/Input/Input";
import { Modal } from "@/components/atoms/Modal/Modal";
import { ConfirmDialog } from "@/components/molecules/ConfirmDialog/ConfirmDialog";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  type Category,
  type CategoryFormData,
} from "@/services/api/categories";
import {
  Plus,
  Pencil,
  Trash2,
  Tag,
  AlertTriangle,
  Search,
} from "lucide-react";
import { toast } from "react-toastify";

const categorySchema = yup.object({
  name: yup.string().required("Nama kategori wajib diisi").min(2, "Minimal 2 karakter"),
  description: yup.string().default(""),
});

interface CategoryFormValues {
  name: string;
  description: string;
}

interface CategoriesClientProps {
  initialCategories: Category[];
  initialError: string | null;
}

export function CategoriesClient({
  initialCategories,
  initialError,
}: CategoriesClientProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: yupResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cat.description?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  const openCreateModal = () => {
    setEditingCategory(null);
    reset({ name: "", description: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    reset({
      name: category.name,
      description: category.description || "",
    });
    setIsModalOpen(true);
  };

  const openDeleteConfirm = (category: Category) => {
    setDeletingCategory(category);
    setIsConfirmOpen(true);
  };

  const onSubmit = async (data: CategoryFormValues) => {
    setIsSubmitting(true);

    const formData: CategoryFormData = {
      name: data.name,
      description: data.description || "",
    };

    if (editingCategory) {
      const { data: updated, error } = await updateCategory(editingCategory.id, formData);
      if (error) {
        toast.error(error);
      } else if (updated) {
        setCategories((prev) =>
          prev.map((cat) => (cat.id === updated.id ? updated : cat))
        );
        toast.success("Kategori berhasil diperbarui");
        setIsModalOpen(false);
      }
    } else {
      const { data: created, error } = await createCategory(formData);
      if (error) {
        toast.error(error);
      } else if (created) {
        setCategories((prev) => [created, ...prev]);
        toast.success("Kategori berhasil ditambahkan");
        setIsModalOpen(false);
      }
    }

    setIsSubmitting(false);
  };

  const handleDelete = async () => {
    if (!deletingCategory) return;

    setIsDeleting(true);
    const { success, error } = await deleteCategory(deletingCategory.id);

    if (error) {
      toast.error(error);
    } else if (success) {
      setCategories((prev) => prev.filter((cat) => cat.id !== deletingCategory.id));
      toast.success("Kategori berhasil dihapus");
      setIsConfirmOpen(false);
    }

    setIsDeleting(false);
  };

  if (initialError) {
    return (
      <Card className="p-8 text-center">
        <AlertTriangle className="h-12 w-12 text-danger-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-surface-700">Gagal memuat kategori</h3>
        <p className="mt-1 text-surface-500">{initialError}</p>
      </Card>
    );
  }

  return (
    <>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
          <input
            type="text"
            placeholder="Cari kategori..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-surface-200 bg-white pl-10 pr-4 py-2.5 text-sm text-surface-900 placeholder:text-surface-400 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 transition-all"
          />
        </div>
        <Button onClick={openCreateModal} leftIcon={<Plus className="h-4 w-4" />}>
          Tambah Kategori
        </Button>
      </div>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-200 bg-surface-50/50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">
                  Deskripsi
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">
                  Dibuat
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-surface-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <Tag className="h-10 w-10 text-surface-300 mx-auto mb-3" />
                    <p className="text-surface-500 font-medium">
                      {searchQuery ? "Tidak ada kategori yang cocok" : "Belum ada kategori"}
                    </p>
                    <p className="text-sm text-surface-400 mt-1">
                      {searchQuery
                        ? "Coba kata kunci lain"
                        : "Tambahkan kategori pertama"}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredCategories.map((category) => (
                  <tr
                    key={category.id}
                    className="hover:bg-surface-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="font-medium text-surface-900">
                        {category.name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-surface-500 line-clamp-2 max-w-xs">
                        {category.description || "—"}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-surface-500">
                        {new Date(category.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(category)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-surface-400 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => openDeleteConfirm(category)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-surface-400 hover:text-danger-600 hover:bg-danger-50 transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? "Edit Kategori" : "Tambah Kategori"}
        description={
          editingCategory
            ? "Perbarui informasi kategori"
            : "Buat kategori baru untuk mengelompokkan event"
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Nama Kategori"
            placeholder="Contoh: Musik, Teknologi, Olahraga"
            error={errors.name?.message}
            {...register("name")}
          />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-surface-700">
              Deskripsi
            </label>
            <textarea
              {...register("description")}
              rows={3}
              placeholder="Deskripsi singkat kategori..."
              className="w-full rounded-xl border border-surface-200 bg-white px-4 py-3 text-sm text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 transition-all resize-none"
            />
          </div>
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button
              type="submit"
              isLoading={isSubmitting}
            >
              {editingCategory ? "Simpan Perubahan" : "Tambah Kategori"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Hapus Kategori?"
        description={`Kategori "${deletingCategory?.name}" akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel="Hapus"
        isLoading={isDeleting}
      />
    </>
  );
}
