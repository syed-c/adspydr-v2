import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/(root)/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://adspydr.com"),
  title: {
    default: "Ad SpyDR - Free Competitor Ad Spy Tool | Facebook & Google Ads",
    template: "%s | Ad SpyDR",
  },
  description: "Free ad spy tool to spy on competitor's Facebook & Google ads. Discover winning creatives, copy high-converting ads, and scale your campaigns with AI-powered insights.",
  keywords: [
    "ad spy tool",
    "competitor ads spy",
    "facebook ad spy",
    "google ad spy",
    "ad spy free",
    "spy on competitors ads",
    "ad intelligence",
    "competitor research",
    "facebook ads library",
    "google ads library",
    "ad creative spy",
    "marketing intelligence",
    "roas tools",
    "ppc spy tool",
    "facebook ad extractor",
    "google ads checker",
  ],
  authors: [{ name: "Ad SpyDR" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://adspydr.com",
    siteName: "Ad SpyDR",
    title: "Ad SpyDR - Free Competitor Ad Spy Tool",
    description: "Free ad spy tool to spy on competitor's Facebook & Google ads. Discover winning creatives and scale faster.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ad SpyDR - Spy on Competitor Ads",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ad SpyDR - Free Competitor Ad Spy Tool",
    description: "Spy on competitor ads. Find winning Facebook & Google ads free.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://adspydr.com",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}