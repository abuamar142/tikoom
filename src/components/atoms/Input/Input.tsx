"use client";

import { cn } from "@/utils/cn";
import { Eye, EyeOff } from "lucide-react";
import { forwardRef, InputHTMLAttributes, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, leftIcon, rightElement, type = "text", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="w-full">
        {label && (
          <label className="mb-1.5 block text-sm font-medium text-surface-700">
            {label}
            {props.required && (
              <span className="ml-0.5 text-red-500">*</span>
            )}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            type={inputType}
            className={cn(
              "w-full rounded-xl border bg-white px-4 py-3 text-sm text-surface-900",
              "placeholder:text-surface-400",
              "transition-all duration-200",
              "focus:outline-none focus:ring-4",
              "disabled:cursor-not-allowed disabled:bg-surface-50 disabled:opacity-60",
              leftIcon && "pl-11",
              (rightElement || isPassword) && "pr-11",
              error
                ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                : "border-surface-200 hover:border-surface-300 focus:border-primary-500 focus:ring-primary-500/20"
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600 transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
          {rightElement && !isPassword && (
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
              {rightElement}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-xs font-medium text-red-500 animate-fade-in">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
