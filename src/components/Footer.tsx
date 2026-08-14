import Link from "next/link";
import { Crown } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#1E0306] text-white pt-14 pb-10 border-t border-rose-950">
      <div className="mx-auto max-w-7xl px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand Info */}
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <div className="h-8 w-8 rounded-lg bg-[#ED3C52] flex items-center justify-center text-white">
              <Crown className="h-4 w-4 fill-white text-white" />
            </div>
            <span className="text-lg font-black text-white tracking-tight">PRINCE OF FOREX</span>
          </div>
          <p className="text-xs text-rose-200/70 max-w-md">
            The online trading academy providing price action logic, institutional risk rules, and lot size calculations for forex traders worldwide.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs font-bold uppercase tracking-wider text-rose-200/80">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/courses/prince-of-forex-masterclass" className="hover:text-white transition">Course Details</Link>
          <Link href="/calculator" className="hover:text-white transition">Lotsize Calculator</Link>
          <Link href="/blog" className="hover:text-white transition">Blog</Link>
          <Link href="/faq" className="hover:text-white transition">FAQs</Link>
          <Link href="/terms" className="hover:text-white transition">Terms</Link>
          <Link href="/policy" className="hover:text-white transition">Privacy</Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8 mt-10 pt-6 border-t border-rose-900/40 text-center text-xs text-rose-200/50 space-y-2">
        <p>
          <strong>Risk Disclaimer:</strong> Trading foreign exchange on margin carries a high level of risk and may not be suitable for all investors. Past performance is not indicative of future results.
        </p>
        <p>© {new Date().getFullYear()} Prince of Forex (PFX Academy). All rights reserved.</p>
      </div>
    </footer>
  );
}
