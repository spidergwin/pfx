import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Prince of Forex (PFX) Academy — Master Forex Trading",
    template: "%s | PFX Academy",
  },
  description:
    "Learn professional forex trading with the Prince of Forex Masterclass. 30 chapters, price action strategies, institutional risk management, and lifetime access for $40.",
  keywords: ["forex trading", "price action", "forex course", "PFX Academy", "Prince of Forex", "lot size calculator", "risk management"],
  authors: [{ name: "Prince of Forex (PFX Academy)" }],
  creator: "PFX Academy",
  openGraph: {
    title: "Prince of Forex (PFX) Academy — Master Forex Trading",
    description: "Go from beginner to advanced FX trader with 30 in-depth chapters, quizzes, and a graduation certificate.",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://princeofforex.com",
    siteName: "Prince of Forex Academy",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prince of Forex (PFX) Academy",
    description: "Master Forex Trading. 30 Chapters. Lifetime Access. $40.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
