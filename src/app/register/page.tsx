"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { Card } from "@/components/atoms/Card/Card";
import { useRegister } from "@/hooks/auth/useRegister";
import { User, Mail, Lock, Shield, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const registerSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

type RegisterFormData = yup.InferType<typeof registerSchema>;

export default function RegisterPage() {
  const { register: registerUser, isLoading, error } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    await registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
    });
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
                Join Tikoom today
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

      {/* Right Side - Register Form */}
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
              Create account
            </h1>
            <p className="text-surface-500">
              Sign up to get started with Tikoom
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
                  label="Full Name"
                  type="text"
                  placeholder="John Doe"
                  leftIcon={<User className="w-[18px] h-[18px]" />}
                  error={errors.name?.message}
                  {...register("name")}
                />

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  leftIcon={<Mail className="w-[18px] h-[18px]" />}
                  error={errors.email?.message}
                  {...register("email")}
                />

                <Input
                  label="Password"
                  type="password"
                  placeholder="Create a password"
                  leftIcon={<Lock className="w-[18px] h-[18px]" />}
                  error={errors.password?.message}
                  {...register("password")}
                />

                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm your password"
                  leftIcon={<Lock className="w-[18px] h-[18px]" />}
                  error={errors.confirmPassword?.message}
                  {...register("confirmPassword")}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                isLoading={isLoading}
                rightIcon={!isLoading && <ArrowRight size={18} />}
              >
                Create Account
              </Button>
            </form>
          </Card>

          <p className="text-center text-sm text-surface-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
