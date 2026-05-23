"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/atoms/Button/Button";
import { Card } from "@/components/atoms/Card/Card";
import { useLogin } from "@/hooks/auth/useLogin";
import { AuthLayout } from "@/components/molecules/AuthLayout";
import { AuthErrorAlert } from "@/components/molecules/AuthErrorAlert";
import { LoginFormFields } from "@/components/molecules/LoginFormFields";
import { ArrowRight, Shield } from "lucide-react";

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Masukkan email yang valid")
    .required("Email wajib diisi"),
  password: yup
    .string()
    .min(6, "Password minimal 6 karakter")
    .required("Password wajib diisi"),
});

type LoginFormData = yup.InferType<typeof loginSchema>;

export default function AdminLoginPage() {
  const { login, isLoading, error } = useLogin({ redirectTo: "/admin" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    await login(data);
  };

  return (
    <AuthLayout
      branding={{
        headline: "Panel Administrasi",
        description:
          "Kelola event, kategori, dan pengguna platform Tikoom dari satu dashboard terpusat.",
        showStats: false,
      }}
      form={{
        title: "Masuk ke Panel Admin",
        subtitle: "Hanya untuk administrator yang berwenang",
      }}
      footer={
        <span className="text-sm text-surface-500">
          <Shield className="inline h-4 w-4 mr-1 text-primary-500" />
          Area terproteksi. Akses hanya untuk admin.
        </span>
      }
    >
      <Card className="p-6 sm:p-8 shadow-xl shadow-surface-900/5">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <AuthErrorAlert message={error} />
          <LoginFormFields register={register} errors={errors} />
          <Button
            type="submit"
            size="lg"
            className="w-full"
            isLoading={isLoading}
            rightIcon={!isLoading && <ArrowRight size={18} />}
          >
            Masuk sebagai Admin
          </Button>
        </form>
      </Card>
    </AuthLayout>
  );
}
