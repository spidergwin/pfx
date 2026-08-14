import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "New Forex Industry (NFI) Academy — Master Forex Trading",
    template: "%s | NFI Academy",
  },
  description:
    "Learn professional forex trading with the New Forex Industry Masterclass. 30 chapters, price action strategies, institutional risk management, and lifetime access for $50.",
  keywords: ["forex trading", "price action", "forex course", "NFI Academy", "New Forex Industry", "lot size calculator", "risk management"],
  authors: [{ name: "New Forex Industry (NFI Academy)" }],
  creator: "NFI Academy",
  openGraph: {
    title: "New Forex Industry (NFI) Academy — Master Forex Trading",
    description: "Go from beginner to advanced FX trader with 30 in-depth chapters, quizzes, and a graduation certificate.",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://princeofforex.com",
    siteName: "New Forex Industry Academy",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "New Forex Industry (NFI) Academy",
    description: "Master Forex Trading. 30 Chapters. Lifetime Access. $50.",
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
      <body className="min-h-full flex flex-col font-sans">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
