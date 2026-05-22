"use client";

import { Calendar, Globe, Mail, MapPin, MessageCircle, Share2 } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Produk: [
      { label: "Cari Event", href: "/#events" },
      { label: "Kategori", href: "/#categories" },
      { label: "Lokasi", href: "/" },
    ],
    Perusahaan: [
      { label: "Tentang Kami", href: "/" },
      { label: "Kontak", href: "/" },
      { label: "Karir", href: "/" },
    ],
    Bantuan: [
      { label: "FAQ", href: "/" },
      { label: "Kebijakan Privasi", href: "/" },
      { label: "Syarat & Ketentuan", href: "/" },
    ],
  };

  const socialLinks = [
    { icon: Globe, href: "#", label: "Website" },
    { icon: MessageCircle, href: "#", label: "Chat" },
    { icon: Share2, href: "#", label: "Social" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <footer className="border-t border-surface-200 bg-surface-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-surface-900">Tikoom</span>
            </Link>
            <p className="mt-4 text-sm text-surface-500 max-w-sm leading-relaxed">
              Platform terbaik untuk menemukan event menarik di sekitarmu.
              Dari konser, workshop, festival, hingga seminar — semua ada di sini.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-surface-200 text-surface-400 hover:text-primary-600 hover:border-primary-200 hover:shadow-soft transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-surface-900 uppercase tracking-wider">
                {category}
              </h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-surface-500 hover:text-primary-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-surface-200 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-surface-400">
            &copy; {currentYear} Tikoom. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-sm text-surface-400">
            <MapPin className="h-3.5 w-3.5" />
            <span>Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
