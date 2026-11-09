import type { Metadata, Viewport } from "next";
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const headingFont = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const bodyFont = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#00B4D8",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.marcenariatubarao.com.br"),
  title:
    "Marcenaria Tubarão | Móveis Planejados & Marcenaria de Alto Padrão em BH (5,0★)",
  description:
    "Marcenaria Tubarão: desde 1977 realizando sonhos em Belo Horizonte. Móveis sob medida para ambientes residenciais e comerciais. Cozinhas planejadas, closets, salas com painel ripado e marcenaria de luxo. Atendimento personalizado: (31) 99767-3576.",
  keywords: [
    "Marcenaria Tubarão",
    "Marcenaria Tubarão BH",
    "Móveis planejados Belo Horizonte",
    "Marcenaria de alto padrão BH",
    "Móveis sob medida Aparecida BH",
    "Cozinhas planejadas Belo Horizonte",
    "Closet sob medida BH",
    "Painel ripado sala BH",
    "Móveis corporativos BH",
    "Marcenaria desde 1977",
    "Carlos Marcenaria Tubarão",
    "Móveis de luxo Minas Gerais",
  ],
  authors: [{ name: "Marcenaria Tubarão" }],
  creator: "Marcenaria Tubarão",
  publisher: "Marcenaria Tubarão Móveis Planejados",
  formatDetection: {
    telephone: true,
    address: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=tub1", sizes: "any" },
      { url: "/icon-32x32.png?v=tub1", type: "image/png", sizes: "32x32" },
      { url: "/icon-16x16.png?v=tub1", type: "image/png", sizes: "16x16" },
      { url: "/icon-192x192.png?v=tub1", type: "image/png", sizes: "192x192" },
      { url: "/icon-512x512.png?v=tub1", type: "image/png", sizes: "512x512" },
      { url: "/icon.png?v=tub1", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico?v=tub1",
    apple: [{ url: "/apple-icon.png?v=tub1", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.marcenariatubarao.com.br",
    title:
      "Marcenaria Tubarão | Móveis Planejados & Marcenaria de Alto Padrão em BH",
    description:
      "Desde 1977 realizando sonhos. Móveis sob medida residenciais e comerciais com acabamento impecável e entrega pontual. Nota 5,0★ no Google Reviews.",
    siteName: "Marcenaria Tubarão",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Marcenaria Tubarão - Móveis Sob Medida e Marcenaria Fina desde 1977",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marcenaria Tubarão | Móveis Planejados de Alto Padrão em BH (5,0★)",
    description:
      "Mais de 47 anos de tradição em marcenaria sob medida em Belo Horizonte. Acabamento impecável e pontualidade na entrega.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["HomeAndConstructionBusiness", "FurnitureStore", "LocalBusiness"],
    name: "Marcenaria Tubarão",
    legalName: "Marcenaria Tubarão Móveis Planejados",
    alternateName: "Marcenaria Tubarão BH",
    description:
      "Desde 1977 realizando sonhos em Belo Horizonte e região metropolitana. Especialistas em móveis sob medida e marcenaria de alto padrão para ambientes residenciais e comerciais: cozinhas, dormitórios, closets, salas, banheiros e ambientes corporativos.",
    telephone: "+5531997673576",
    url: "https://www.marcenariatubarao.com.br",
    image: "https://www.marcenariatubarao.com.br/og-image.jpg",
    logo: "https://www.marcenariatubarao.com.br/logo.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Santa Judite, 70",
      addressLocality: "Belo Horizonte",
      addressRegion: "MG",
      postalCode: "31250-050",
      addressCountry: "BR",
      neighborhood: "Aparecida",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -19.8972,
      longitude: -43.9486,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "08:00",
        closes: "13:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "7",
      bestRating: "5",
      worstRating: "5",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Soluções de Marcenaria Sob Medida",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Cozinhas Planejadas & Ilhas Gourmet",
            description: "Projetos ergonômicos com ferragens de amortecimento e materiais nobres.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Closets & Dormitórios sob Medida",
            description: "Roupeiros inteligentes, iluminação embutida e gaveteiros aveludados.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Salas, Home Theaters & Painéis Ripados",
            description: "Painéis ripados de alto padrão, nichos e integração de ambientes.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Móveis Corporativos & Comerciais",
            description: "Marcenaria funcional e imponente para escritórios, clínicas e consultórios.",
          },
        },
      ],
    },
  };

  return (
    <html lang="pt-BR" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico?v=tub1" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon-32x32.png?v=tub1" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icon-16x16.png?v=tub1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png?v=tub1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
