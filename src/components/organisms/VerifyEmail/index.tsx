"use client";

import { AuthLayout } from "@/components/molecules/AuthLayout";
import { VerifyEmailContent } from "@/components/molecules/VerifyEmailContent";

export default function VerifyEmail() {
  return (
    <AuthLayout
      branding={{
        tagline: "Verifikasi Akun",
        headline: "Hampir Selesai",
        description:
          "Satu langkah lagi untuk menyelesaikan pendaftaranmu dan mulai menjelajahi event menarik.",
        showStats: false,
      }}
      form={{
        title: "Periksa emailmu",
        subtitle: "Kami telah mengirim link verifikasi ke alamat emailmu",
      }}
    >
      <VerifyEmailContent />
    </AuthLayout>
  );
}
