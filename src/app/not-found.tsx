import Link from "next/link";
import { Crown, ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#1E0306] text-white flex flex-col items-center justify-center px-4 text-center">
      <div className="h-16 w-16 rounded-2xl bg-[#ED3C52] flex items-center justify-center mb-6 shadow-xl">
        <Crown className="h-8 w-8 fill-white text-white" />
      </div>

      <p className="text-[#ED3C52] text-sm font-extrabold uppercase tracking-widest mb-2">404 — Page Not Found</p>
      <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
        Lost in the Markets?
      </h1>
      <p className="text-rose-200/70 text-sm max-w-sm mb-10 leading-relaxed">
        The page you're looking for doesn't exist. Head back to the homepage or check out the PFX Masterclass.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 rounded-xl bg-[#ED3C52] hover:bg-rose-600 px-6 py-3.5 text-sm font-extrabold text-white transition button-glow"
        >
          <Home className="h-4 w-4" />
          Back to Homepage
        </Link>
        <Link
          href="/courses/prince-of-forex-masterclass"
          className="flex items-center justify-center gap-2 rounded-xl border-2 border-white/40 hover:border-white px-6 py-3.5 text-sm font-bold text-white transition"
        >
          View the Course
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
