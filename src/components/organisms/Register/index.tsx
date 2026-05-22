"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/atoms/Button/Button";
import { Card } from "@/components/atoms/Card/Card";
import { useRegister } from "@/hooks/auth/useRegister";
import { AuthLayout } from "@/components/molecules/AuthLayout";
import { AuthErrorAlert } from "@/components/molecules/AuthErrorAlert";
import { RegisterFormFields } from "@/components/molecules/RegisterFormFields";
import { ArrowRight } from "lucide-react";
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

export default function Register() {
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

  const footer = (
    <>
      Already have an account?{" "}
      <Link
        href="/login"
        className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
      >
        Sign in
      </Link>
    </>
  );

  return (
    <AuthLayout
      branding={{
        headline: "Join Tikoom today",
        description:
          "Experience the next generation of authentication with Tikoom. Built with security and user experience in mind.",
        showStats: true,
      }}
      form={{
        title: "Create account",
        subtitle: "Sign up to get started with Tikoom",
      }}
      footer={footer}
    >
      <Card className="p-6 sm:p-8 shadow-xl shadow-surface-900/5">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <AuthErrorAlert message={error} />
          <RegisterFormFields register={register} errors={errors} />
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
    </AuthLayout>
  );
}
