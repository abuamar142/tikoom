"use client";

import { cn } from "@/utils/cn";
import { Badge } from "@/components/atoms/Badge/Badge";
import { Calendar, MapPin, Share2, Users } from "lucide-react";

export interface EventData {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image: string;
  attendees: number;
  price?: string;
}

interface EventCardProps {
  event: EventData;
  className?: string;
  variant?: "default" | "featured";
}

export function EventCard({ event, className, variant = "default" }: EventCardProps) {
  const isFeatured = variant === "featured";

  return (
    <div
      className={cn(
        "group relative bg-white rounded-2xl border border-surface-200 overflow-hidden transition-all duration-300 hover:shadow-elevated hover:-translate-y-1",
        isFeatured && "md:col-span-2 md:grid md:grid-cols-2 md:gap-0",
        className
      )}
    >
      {/* Image */}
      <div className={cn("relative overflow-hidden", isFeatured ? "h-64 md:h-full" : "h-48")}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
          <Calendar className="h-16 w-16 text-primary-300" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <Badge
          variant="primary"
          className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm"
        >
          {event.category}
        </Badge>
        {event.price && (
          <Badge
            variant="accent"
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm font-bold"
          >
            {event.price}
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col">
        <h3 className="text-lg font-bold text-surface-900 group-hover:text-primary-700 transition-colors line-clamp-2">
          {event.title}
        </h3>
        <p className="mt-2 text-sm text-surface-500 line-clamp-2">
          {event.description}
        </p>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-surface-600">
            <Calendar className="h-4 w-4 text-primary-500 shrink-0" />
            <span>{event.date} · {event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-surface-600">
            <MapPin className="h-4 w-4 text-secondary-500 shrink-0" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-surface-600">
            <Users className="h-4 w-4 text-accent-500 shrink-0" />
            <span>{event.attendees.toLocaleString()} peserta</span>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-surface-100 flex items-center justify-between">
          <button className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
            Lihat Detail
          </button>
          <button className="flex items-center gap-1.5 text-sm text-surface-500 hover:text-secondary-600 transition-colors">
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}
