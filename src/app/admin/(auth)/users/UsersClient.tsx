"use client";

import { useState } from "react";
import { Button } from "@/components/atoms/Button/Button";
import { Card } from "@/components/atoms/Card/Card";
import { Modal } from "@/components/atoms/Modal/Modal";
import { ConfirmDialog } from "@/components/molecules/ConfirmDialog/ConfirmDialog";
import {
  useUsers,
  useUpdateUserRole,
  useToggleUserStatus,
} from "@/hooks/useUsers";
import {
  Search,
  Users,
  AlertTriangle,
  Shield,
  User,
  Calendar,
  Mail,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";
import { toast } from "react-toastify";

const ROLES = [
  { value: "user", label: "User", color: "bg-surface-100 text-surface-700" },
  { value: "admin", label: "Admin", color: "bg-primary-50 text-primary-700" },
  {
    value: "super_admin",
    label: "Super Admin",
    color: "bg-accent-50 text-accent-700",
  },
];

const ITEMS_PER_PAGE = 10;

export function UsersClient() {
  const { data: users = [], isLoading, error: queryError } = useUsers();
  const updateUserRole = useUpdateUserRole();
  const toggleUserStatus = useToggleUserStatus();

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [detailUser, setDetailUser] = useState<
    (typeof users)[number] | null
  >(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<
    (typeof users)[number] | null
  >(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [togglingUser, setTogglingUser] = useState<
    (typeof users)[number] | null
  >(null);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "active"
          ? user.is_active
          : !user.is_active;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const openDetail = (user: (typeof users)[number]) => {
    setDetailUser(user);
    setIsDetailOpen(true);
  };

  const openRoleModal = (user: (typeof users)[number]) => {
    setEditingUser(user);
    setSelectedRole(user.role);
    setIsRoleModalOpen(true);
  };

  const openToggleConfirm = (user: (typeof users)[number]) => {
    setTogglingUser(user);
    setIsConfirmOpen(true);
  };

  const handleRoleChange = async () => {
    if (!editingUser) return;

    updateUserRole.mutate(
      { userId: editingUser.id, roleName: selectedRole },
      {
        onSuccess: () => {
          toast.success("Role pengguna berhasil diperbarui");
          setIsRoleModalOpen(false);
        },
        onError: (err) => toast.error(err.message),
      }
    );
  };

  const handleToggleStatus = async () => {
    if (!togglingUser) return;

    const newStatus = !togglingUser.is_active;
    toggleUserStatus.mutate(
      { userId: togglingUser.id, isActive: newStatus },
      {
        onSuccess: () => {
          toast.success(
            `Pengguna berhasil ${newStatus ? "diaktifkan" : "dinonaktifkan"}`
          );
          setIsConfirmOpen(false);
        },
        onError: (err) => toast.error(err.message),
      }
    );
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = ROLES.find((r) => r.value === role);
    return (
      <span
        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${roleConfig?.color || "bg-surface-100 text-surface-700"}`}
      >
        {roleConfig?.label || role}
      </span>
    );
  };

  if (queryError) {
    return (
      <Card className="p-8 text-center">
        <AlertTriangle className="h-12 w-12 text-danger-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-surface-700">
          Gagal memuat pengguna
        </h3>
        <p className="mt-1 text-surface-500">{queryError.message}</p>
      </Card>
    );
  }

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          {
            label: "Total Pengguna",
            value: users.length,
            icon: Users,
            color: "text-primary-600",
            bg: "bg-primary-50",
          },
          {
            label: "Super Admin",
            value: users.filter((u) => u.role === "super_admin").length,
            icon: Shield,
            color: "text-accent-600",
            bg: "bg-accent-50",
          },
          {
            label: "Admin",
            value: users.filter((u) => u.role === "admin").length,
            icon: User,
            color: "text-secondary-600",
            bg: "bg-secondary-50",
          },
          {
            label: "Aktif",
            value: users.filter((u) => u.is_active).length,
            icon: CheckCircle2,
            color: "text-success-600",
            bg: "bg-success-50",
          },
        ].map((stat) => (
          <Card key={stat.label} className="p-4">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`}
              >
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-surface-900">{stat.value}</p>
                <p className="text-xs text-surface-500">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
          <input
            type="text"
            placeholder="Cari nama atau email..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-xl border border-surface-200 bg-white pl-10 pr-4 py-2.5 text-sm text-surface-900 placeholder:text-surface-400 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 transition-all"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-xl border border-surface-200 bg-white px-3 py-2.5 text-sm text-surface-700 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20"
          >
            <option value="all">Semua Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="super_admin">Super Admin</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-xl border border-surface-200 bg-white px-3 py-2.5 text-sm text-surface-700 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20"
          >
            <option value="all">Semua Status</option>
            <option value="active">Aktif</option>
            <option value="inactive">Nonaktif</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="animate-pulse space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-surface-200 rounded-xl" />
          ))}
        </div>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-surface-200 bg-surface-50/50">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">
                    Pengguna
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider whitespace-nowrap">
                    Bergabung
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-surface-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100">
                {paginatedUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <Users className="h-10 w-10 text-surface-300 mx-auto mb-3" />
                      <p className="text-surface-500 font-medium">
                        Tidak ada pengguna
                      </p>
                    </td>
                  </tr>
                ) : (
                  paginatedUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-surface-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white font-semibold text-sm">
                            {user.name?.charAt(0).toUpperCase() ||
                              user.email.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-surface-900">
                              {user.name || "—"}
                            </p>
                            <p className="text-sm text-surface-500">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => openToggleConfirm(user)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                            user.is_active
                              ? "bg-success-50 text-success-700 hover:bg-success-100"
                              : "bg-danger-50 text-danger-700 hover:bg-danger-100"
                          }`}
                        >
                          {user.is_active ? (
                            <>
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              Aktif
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3.5 w-3.5" />
                              Nonaktif
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-surface-500">
                          {new Date(user.created_at).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => openDetail(user)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-surface-400 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                            title="Detail"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => openRoleModal(user)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-surface-400 hover:text-secondary-600 hover:bg-secondary-50 transition-colors"
                            title="Ganti Role"
                          >
                            <Shield className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-surface-100">
              <p className="text-sm text-surface-500">
                Menampilkan {(currentPage - 1) * ITEMS_PER_PAGE + 1} -{" "}
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)}{" "}
                dari {filteredUsers.length} pengguna
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-surface-200 text-surface-600 hover:bg-surface-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-sm text-surface-600">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-surface-200 text-surface-600 hover:bg-surface-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Detail Modal */}
      <Modal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        title="Detail Pengguna"
      >
        {detailUser && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white font-bold text-xl">
                {detailUser.name?.charAt(0).toUpperCase() ||
                  detailUser.email.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-lg font-semibold text-surface-900">
                  {detailUser.name || "—"}
                </p>
                <p className="text-sm text-surface-500">{detailUser.email}</p>
              </div>
            </div>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-50">
                <Shield className="h-5 w-5 text-primary-500" />
                <div>
                  <p className="text-xs text-surface-400">Role</p>
                  <p className="text-sm font-medium text-surface-900">
                    {getRoleBadge(detailUser.role)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-50">
                {detailUser.is_active ? (
                  <CheckCircle2 className="h-5 w-5 text-success-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-danger-500" />
                )}
                <div>
                  <p className="text-xs text-surface-400">Status</p>
                  <p className="text-sm font-medium text-surface-900">
                    {detailUser.is_active ? "Aktif" : "Nonaktif"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-50">
                <Calendar className="h-5 w-5 text-secondary-500" />
                <div>
                  <p className="text-xs text-surface-400">Bergabung</p>
                  <p className="text-sm font-medium text-surface-900">
                    {new Date(detailUser.created_at).toLocaleDateString(
                      "id-ID",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-50">
                <Mail className="h-5 w-5 text-accent-500" />
                <div>
                  <p className="text-xs text-surface-400">User ID</p>
                  <p className="text-sm font-medium text-surface-900 font-mono">
                    {detailUser.id.slice(0, 8)}...
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Change Role Modal */}
      <Modal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        title="Ganti Role"
        description={`Pilih role baru untuk ${editingUser?.name || editingUser?.email}`}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            {ROLES.map((role) => (
              <button
                key={role.value}
                onClick={() => setSelectedRole(role.value)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-colors ${
                  selectedRole === role.value
                    ? "border-primary-500 bg-primary-50"
                    : "border-surface-200 hover:border-surface-300"
                }`}
              >
                <Shield
                  className={`h-5 w-5 ${
                    selectedRole === role.value
                      ? "text-primary-600"
                      : "text-surface-400"
                  }`}
                />
                <div className="text-left">
                  <p
                    className={`font-medium ${
                      selectedRole === role.value
                        ? "text-primary-700"
                        : "text-surface-900"
                    }`}
                  >
                    {role.label}
                  </p>
                </div>
              </button>
            ))}
          </div>
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => setIsRoleModalOpen(false)}
              disabled={updateUserRole.isPending}
            >
              Batal
            </Button>
            <Button
              onClick={handleRoleChange}
              isLoading={updateUserRole.isPending}
            >
              Simpan
            </Button>
          </div>
        </div>
      </Modal>

      {/* Toggle Status Confirm */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleToggleStatus}
        title={togglingUser?.is_active ? "Nonaktifkan Pengguna?" : "Aktifkan Pengguna?"}
        description={
          togglingUser?.is_active
            ? `Pengguna "${togglingUser.name || togglingUser.email}" akan dinonaktifkan dan tidak bisa login.`
            : `Pengguna "${togglingUser?.name || togglingUser?.email}" akan diaktifkan kembali.`
        }
        confirmLabel={togglingUser?.is_active ? "Nonaktifkan" : "Aktifkan"}
        isLoading={toggleUserStatus.isPending}
      />
    </>
  );
}
