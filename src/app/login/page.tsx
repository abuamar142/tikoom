"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { Card } from "@/components/atoms/Card/Card";
import { useLogin } from "@/hooks/auth/useLogin";
import { Mail, Lock, Shield, Sparkles, ArrowRight } from "lucide-react";
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

export default function LoginPage() {
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

  return (
    <div className="min-h-screen bg-surface-50 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-surface-900">
        {/* Abstract Background Shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary-400/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
          <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-primary-500/15 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="relative z-10 flex flex-col justify-between h-full p-12 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Tikoom</span>
          </div>

          <div className="space-y-8 max-w-md">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
                <Sparkles className="w-4 h-4 text-primary-300" />
                <span className="text-sm font-medium text-primary-100">Modern Authentication</span>
              </div>
              <h2 className="text-4xl font-bold leading-tight">
                Secure, fast, and simple
              </h2>
              <p className="text-lg text-surface-300">
                Experience the next generation of authentication with Tikoom. Built with security and user experience in mind.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Users", value: "10K+" },
                { label: "Uptime", value: "99.9%" },
                { label: "Security", value: "A+" },
              ].map((stat) => (
                <div key={stat.label} className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-surface-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm text-surface-400">© 2024 Tikoom. All rights reserved.</p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-surface-900">Tikoom</span>
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <h1 className="text-3xl font-bold text-surface-900">
              Welcome back
            </h1>
            <p className="text-surface-500">
              Sign in to your account to continue
            </p>
          </div>

          <Card className="p-6 sm:p-8 shadow-xl shadow-surface-900/5">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 animate-fade-in">
                  <p className="text-sm font-medium text-red-600">{error}</p>
                </div>
              )}

              <div className="space-y-4">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  leftIcon={<Mail className="w-[18px] h-[18px]" />}
                  error={errors.email?.message}
                  {...register("email")}
                />

                <div className="space-y-1">
                  <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    leftIcon={<Lock className="w-[18px] h-[18px]" />}
                    error={errors.password?.message}
                    {...register("password")}
                  />
                  <div className="flex justify-end">
                    <Link
                      href="#"
                      className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
              </div>

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

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-surface-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-4 text-surface-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button type="button" variant="outline" className="w-full">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button type="button" variant="outline" className="w-full">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </Button>
              </div>
            </div>
          </Card>

          <p className="text-center text-sm text-surface-500">
            Don&apos;t have an account?{" "}
            <Link
              href="#"
              className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
            >
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
