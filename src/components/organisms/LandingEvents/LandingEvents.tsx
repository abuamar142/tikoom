"use client";

import { SectionHeader } from "@/components/molecules/SectionHeader/SectionHeader";
import { EventCard } from "@/components/molecules/EventCard/EventCard";
import type { EventData } from "@/components/molecules/EventCard/EventCard";

const MOCK_EVENTS: EventData[] = [
  {
    id: "1",
    title: "JavaScript Conference Indonesia 2025",
    description: "Konferensi tahunan untuk developer JavaScript dengan pembicara internasional dan workshop praktis.",
    date: "15 Juni 2025",
    time: "09:00 - 17:00",
    location: "Jakarta Convention Center",
    category: "Teknologi",
    image: "",
    attendees: 1200,
    price: "Rp 500K",
  },
  {
    id: "2",
    title: "Jazz Festival Bandung",
    description: "Nikmati penampilan musisi jazz lokal dan internasional di udara terbuka Bandung.",
    date: "22 Juni 2025",
    time: "18:00 - 23:00",
    location: "Lapangan Dago, Bandung",
    category: "Musik",
    image: "",
    attendees: 3500,
    price: "Gratis",
  },
  {
    id: "3",
    title: "Workshop UI/UX Design Fundamental",
    description: "Pelajari dasar-dasar desain UI/UX dari praktisi industri dengan studi kasus nyata.",
    date: "28 Juni 2025",
    time: "13:00 - 16:00",
    location: "Co-working Space Surabaya",
    category: "Pendidikan",
    image: "",
    attendees: 50,
    price: "Rp 250K",
  },
  {
    id: "4",
    title: "Startup Weekend Yogyakarta",
    description: "54 jam untuk membangun startup dari ide hingga prototype. Pitch ke investor!",
    date: "5 Juli 2025",
    time: "08:00 - 20:00",
    location: "UGM Innovation Center",
    category: "Bisnis",
    image: "",
    attendees: 80,
    price: "Rp 150K",
  },
  {
    id: "5",
    title: "Marathon Borobudur 2025",
    description: "Lari marathon dengan pemandangan Candi Borobudur yang menakjubkan. Tersedia kategori 5K, 10K, dan Full Marathon.",
    date: "12 Juli 2025",
    time: "05:00 - 11:00",
    location: "Candi Borobudur, Magelang",
    category: "Olahraga",
    image: "",
    attendees: 5000,
    price: "Rp 300K",
  },
  {
    id: "6",
    title: "Street Food Festival Medan",
    description: "Jelajahi ragam kuliner khas Medan dari berbagai penjuru kota. Ribuan menu menanti!",
    date: "20 Juli 2025",
    time: "10:00 - 22:00",
    location: "Lapangan Merdeka, Medan",
    category: "Kuliner",
    image: "",
    attendees: 8000,
    price: "Gratis",
  },
];

export function LandingEvents() {
  return (
    <section id="events" className="py-20 bg-surface-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Event Populer"
          subtitle="Temukan event menarik yang sedang happening di kotamu"
          action={{ label: "Lihat Semua Event", href: "/#events" }}
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MOCK_EVENTS.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
