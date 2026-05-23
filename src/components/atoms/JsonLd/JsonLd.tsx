export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tikoom",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://tikoom.abuamar.site",
    logo:
      (process.env.NEXT_PUBLIC_APP_URL || "https://tikoom.abuamar.site") +
      "/icon-192x192.png",
    description:
      "Platform event discovery terbaik. Cari event menarik dari konser, workshop, festival, hingga seminar.",
    sameAs: [
      // Add social media URLs when available
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebsiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Tikoom",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://tikoom.abuamar.site",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          (process.env.NEXT_PUBLIC_APP_URL || "https://tikoom.abuamar.site") +
          "/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
