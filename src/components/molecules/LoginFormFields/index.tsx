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
  );
}
