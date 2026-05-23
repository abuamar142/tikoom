"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/atoms/Button/Button";
import { Card } from "@/components/atoms/Card/Card";
import { Input } from "@/components/atoms/Input/Input";
import { AuthLayout } from "@/components/molecules/AuthLayout";
import { Lock, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { createBrowserSupabaseClient } from "@/services/config/supabase";

const schema = yup.object({
  password: yup
    .string()
    .min(6, "Password minimal 6 karakter")
    .required("Password wajib diisi"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password tidak cocok")
    .required("Konfirmasi password wajib diisi"),
});

type FormData = yup.InferType<typeof schema>;

export default function ResetPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createBrowserSupabaseClient();
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      setIsSubmitted(true);
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      branding={{
        headline: "Reset Kata Sandi",
        description:
          "Buat kata sandi baru yang kuat untuk melindungi akun Anda.",
        showStats: false,
      }}
      form={{
        title: "Kata Sandi Baru",
        subtitle: "Masukkan kata sandi baru Anda",
      }}
      footer={
        <Link
          href="/login"
          className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors inline-flex items-center gap-1"
        >
          <ArrowLeft size={16} />
          Kembali ke Login
        </Link>
      }
    >
      <Card className="p-6 sm:p-8 shadow-xl shadow-surface-900/5">
        {isSubmitted ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-success-50 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-success-600" />
            </div>
            <h3 className="text-lg font-semibold text-surface-900 mb-2">
              Password Berhasil Diubah
            </h3>
            <p className="text-sm text-surface-500">
              Silakan login dengan kata sandi baru Anda.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
                {error}
              </div>
            )}
            <Input
              label="Kata Sandi Baru"
              type="password"
              placeholder="Minimal 6 karakter"
              leftIcon={<Lock className="w-[18px] h-[18px]" />}
              error={errors.password?.message ?? ""}
              {...register("password")}
            />
            <Input
              label="Konfirmasi Kata Sandi"
              type="password"
              placeholder="Ulangi kata sandi"
              leftIcon={<Lock className="w-[18px] h-[18px]" />}
              error={errors.confirmPassword?.message ?? ""}
              {...register("confirmPassword")}
            />
            <Button
              type="submit"
              size="lg"
              className="w-full"
              isLoading={isLoading}
            >
              Ubah Kata Sandi
            </Button>
          </form>
        )}
      </Card>
    </AuthLayout>
  );
}
