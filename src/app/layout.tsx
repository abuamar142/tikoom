import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { OrganizationJsonLd } from "@/components/atoms/JsonLd/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ea580c",
};

export const metadata: Metadata = {
  title: {
    default: "Tikoom - Temukan Event Seru di Sekitarmu",
    template: "%s | Tikoom",
  },
  description:
    "Platform event discovery terbaik. Cari event menarik dari konser, workshop, festival, hingga seminar. Lihat lokasi di peta dan bagikan ke teman.",
  keywords: [
    "event",
    "konser",
    "workshop",
    "festival",
    "seminar",
    "event discovery",
    "tiket",
    "indonesia",
  ],
  authors: [{ name: "Tikoom" }],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:4000"
  ),
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Tikoom",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tikoom - Temukan Event Seru di Sekitarmu",
    description:
      "Platform event discovery terbaik. Cari event menarik dari konser, workshop, festival, hingga seminar.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Analytics />
        <SpeedInsights />
        <OrganizationJsonLd />
      </body>
    </html>
  );
}
