"use client";

import Link from "next/link";
import { Crown, RefreshCw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="min-h-screen bg-[#1E0306] text-white flex flex-col items-center justify-center px-4 text-center">
        <div className="h-16 w-16 rounded-2xl bg-[#ED3C52] flex items-center justify-center mb-6 shadow-xl">
          <Crown className="h-8 w-8 fill-white text-white" />
        </div>
        <p className="text-[#ED3C52] text-sm font-extrabold uppercase tracking-widest mb-2">Something went wrong</p>
        <h1 className="text-3xl font-black text-white mb-3">Unexpected Error</h1>
        <p className="text-rose-200/70 text-sm max-w-xs mb-8 leading-relaxed">
          An unexpected error occurred. Please try again or return to the homepage.
        </p>
        <div className="flex gap-4">
          <button
            onClick={reset}
            className="flex items-center gap-2 rounded-xl bg-[#ED3C52] px-5 py-3 text-sm font-bold text-white hover:bg-rose-600 transition"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl border-2 border-white/40 px-5 py-3 text-sm font-bold text-white hover:border-white transition"
          >
            <Home className="h-4 w-4" />
            Homepage
          </Link>
        </div>
      </body>
    </html>
  );
}
