import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tikoom - Event Discovery Platform",
    short_name: "Tikoom",
    description:
      "Platform event discovery terbaik. Cari event menarik dari konser, workshop, festival, hingga seminar.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafaf9",
    theme_color: "#ea580c",
    orientation: "portrait",
    scope: "/",
    lang: "id",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
