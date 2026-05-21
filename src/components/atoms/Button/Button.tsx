"use client";

import { cn } from "@/utils/cn";
import { Spinner } from "@/components/atoms/Spinner/Spinner";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary:
        "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 focus:ring-primary-500/30 shadow-sm shadow-primary-600/20",
      secondary:
        "bg-surface-800 text-white hover:bg-surface-900 active:bg-surface-950 focus:ring-surface-500/30",
      outline:
        "border-2 border-surface-300 bg-transparent text-surface-700 hover:border-primary-400 hover:text-primary-700 hover:bg-primary-50/50 focus:ring-primary-500/20",
      ghost:
        "bg-transparent text-surface-600 hover:bg-surface-100 hover:text-surface-900 focus:ring-surface-500/20",
      danger:
        "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500/30 shadow-sm shadow-red-600/20",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm gap-1.5",
      md: "px-5 py-2.5 text-sm gap-2",
      lg: "px-8 py-3 text-base gap-2.5",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center rounded-xl font-semibold",
          "transition-all duration-200 ease-out",
          "focus:outline-none focus:ring-4 focus:ring-offset-0",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none",
          "active:scale-[0.98]",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Spinner size="sm" className={variant === "primary" ? "text-white" : "text-current"} />
          </span>
        )}
        <span
          className={cn(
            "inline-flex items-center gap-2",
            isLoading && "opacity-0"
          )}
        >
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";
