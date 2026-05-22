import { Input } from "@/components/atoms/Input/Input";
import { User, Mail, Lock } from "lucide-react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface RegisterFormFieldsProps {
  register: UseFormRegister<{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>;
  errors: FieldErrors<{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>;
}

export function RegisterFormFields({
  register,
  errors,
}: RegisterFormFieldsProps) {
  return (
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
  );
}
