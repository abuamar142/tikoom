import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

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
  metadataBase: new URL("http://localhost:4000"),
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Tikoom",
  },
  robots: {
    index: true,
    follow: true,
  },
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
      </body>
    </html>
  );
}
