"use client";

import { AuthLayout } from "@/components/molecules/AuthLayout";
import { VerifyEmailContent } from "@/components/molecules/VerifyEmailContent";

export default function VerifyEmail() {
  return (
    <AuthLayout
      branding={{
        tagline: "Secure Authentication",
        headline: "Almost there",
        description:
          "Just one more step to complete your registration and secure your account.",
        showStats: false,
      }}
      form={{
        title: "Check your email",
        subtitle: "We sent a verification link to your email address",
      }}
    >
      <VerifyEmailContent />
    </AuthLayout>
  );
}
