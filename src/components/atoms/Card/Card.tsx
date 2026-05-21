"use client";

import { cn } from "@/utils/cn";
import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "elevated";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-white border border-surface-200 shadow-sm",
      glass: "bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl",
      elevated: "bg-white border border-surface-200 shadow-xl shadow-surface-900/10",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl overflow-hidden",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";
