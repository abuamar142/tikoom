"use client";

import { cn } from "@/utils/cn";
import { X } from "lucide-react";
import { forwardRef, HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "secondary" | "accent" | "outline" | "ghost";
  size?: "sm" | "md";
  dismissible?: boolean;
  onDismiss?: () => void;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = "default",
      size = "sm",
      dismissible = false,
      onDismiss,
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      default:
        "bg-surface-100 text-surface-700 border-surface-200",
      primary:
        "bg-primary-50 text-primary-700 border-primary-200",
      secondary:
        "bg-secondary-50 text-secondary-700 border-secondary-200",
      accent:
        "bg-accent-50 text-accent-700 border-accent-200",
      outline:
        "bg-transparent text-surface-600 border-surface-300",
      ghost:
        "bg-transparent text-surface-500 border-transparent",
    };

    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-2.5 py-1 text-sm",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1 rounded-full border font-medium transition-colors",
          variants[variant],
          sizes[size],
          dismissible && "pr-1",
          className
        )}
        {...props}
      >
        {children}
        {dismissible && onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="ml-0.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full hover:bg-black/5 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = "Badge";
