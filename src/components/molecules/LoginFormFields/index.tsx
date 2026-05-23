import { Input } from "@/components/atoms/Input/Input";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface LoginFormFieldsProps {
  register: UseFormRegister<{ email: string; password: string }>;
  errors: FieldErrors<{ email: string; password: string }>;
}

export function LoginFormFields({ register, errors }: LoginFormFieldsProps) {
  return (
    <div className="space-y-4">
      <Input
        label="Alamat Email"
        type="email"
        placeholder="anda@contoh.com"
        leftIcon={<Mail className="w-[18px] h-[18px]" />}
        error={errors.email?.message ?? ""}
        {...register("email")}
      />

      <div className="space-y-1">
        <Input
          label="Kata Sandi"
          type="password"
          placeholder="Masukkan kata sandi"
          leftIcon={<Lock className="w-[18px] h-[18px]" />}
          error={errors.password?.message ?? ""}
          {...register("password")}
        />
        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
          >
            Lupa kata sandi?
          </Link>
        </div>
      </div>
    </div>
  );
}
