import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Providers } from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Find Top Photographers in India | Book Candid, Wedding & Maternity Shoots",
  description:
    "Browse and book the best photographers for weddings, maternity, birthdays, and more. Compare styles, read reviews, and view verified portfolios across top cities in India.",
  keywords: [
    "photographers India",
    "wedding photographers",
    "maternity photoshoot",
    "baby photography",
    "event photography",
    "book photographer",
    "photographer portfolio",
  ],
  openGraph: {
    title: "Find Top Photographers in India",
    description:
      "Explore top-rated wedding, maternity, and event photographers across India. View real portfolios and book your shoot easily.",
    url: "https://yourdomain.com", // replace with your actual domain
    siteName: "PhotoFinder",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find the Best Photographers for Any Occasion",
    description:
      "Browse portfolios and reviews of India's top photographers for weddings, maternity, birthdays, and more.",
    // no image provided
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
