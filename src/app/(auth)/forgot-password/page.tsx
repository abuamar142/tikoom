"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/atoms/Button/Button";
import { Card } from "@/components/atoms/Card/Card";
import { Input } from "@/components/atoms/Input/Input";
import { AuthLayout } from "@/components/molecules/AuthLayout";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { createBrowserSupabaseClient } from "@/services/config/supabase";

const schema = yup.object({
  email: yup
    .string()
    .email("Masukkan email yang valid")
    .required("Email wajib diisi"),
});

type FormData = yup.InferType<typeof schema>;

export default function ForgotPasswordPage() {
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
      const { error } = await supabase.auth.resetPasswordForEmail(
        data.email,
        {
          redirectTo: `${window.location.origin}/reset-password`,
        }
      );

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
          "Jangan khawatir, kami akan membantu Anda mengatur ulang kata sandi.",
        showStats: false,
      }}
      form={{
        title: "Lupa Kata Sandi?",
        subtitle: "Masukkan email Anda untuk menerima link reset",
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
              Email Terkirim
            </h3>
            <p className="text-sm text-surface-500">
              Periksa kotak masuk Anda untuk link reset kata sandi. Link akan
              kadaluarsa dalam 1 jam.
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
              label="Alamat Email"
              type="email"
              placeholder="anda@contoh.com"
              leftIcon={<Mail className="w-[18px] h-[18px]" />}
              error={errors.email?.message ?? ""}
              {...register("email")}
            />
            <Button
              type="submit"
              size="lg"
              className="w-full"
              isLoading={isLoading}
            >
              Kirim Link Reset
            </Button>
          </form>
        )}
      </Card>
    </AuthLayout>
  );
}
