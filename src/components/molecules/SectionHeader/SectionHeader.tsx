"use client";

import { cn } from "@/utils/cn";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    href: string;
  };
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  action,
  centered = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-10",
        centered && "text-center",
        className
      )}
    >
      <h2 className="text-3xl font-bold text-surface-900 sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg text-surface-500 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
      {action && (
        <Link
          href={action.href}
          className={cn(
            "inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors group",
            centered && "mx-auto"
          )}
        >
          {action.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
