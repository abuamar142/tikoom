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
import { SocialAuthButtons } from "@/components/molecules/SocialAuthButtons";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

type LoginFormData = yup.InferType<typeof loginSchema>;

export default function Login() {
  const { login, isLoading, error } = useLogin();

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

  const footer = (
    <>
      Don&apos;t have an account?{" "}
      <Link
        href="/register"
        className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
      >
        Create one now
      </Link>
    </>
  );

  return (
    <AuthLayout
      branding={{
        headline: "Secure, fast, and simple",
        description:
          "Experience the next generation of authentication with Tikoom. Built with security and user experience in mind.",
        showStats: true,
      }}
      form={{
        title: "Welcome back",
        subtitle: "Sign in to your account to continue",
      }}
      footer={footer}
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
            Sign In
          </Button>
        </form>
        <SocialAuthButtons />
      </Card>
    </AuthLayout>
  );
}
