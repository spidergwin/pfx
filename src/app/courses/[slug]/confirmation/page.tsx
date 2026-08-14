"use client";

import { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { PFX_COURSE } from "@/lib/data";
import {
  CheckCircle,
  X,
  Star,
  MessageSquare,
  Home,
  Mail,
  Loader2,
  MessageCircle,
} from "lucide-react";

export default function OrderConfirmationPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const course = PFX_COURSE;
  const WHATSAPP_NUMBER = "2348165127497";

  // Newsletter opt-in state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterChecked, setNewsletterChecked] = useState(true);
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  // Rating
  const [rating, setRating] = useState<number | null>(null);

  const handleNewsletterSubscribe = async () => {
    if (!newsletterEmail || newsletterStatus === "done") return;
    setNewsletterStatus("loading");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      const data = await res.json();
      setNewsletterStatus(data.success ? "done" : "error");
    } catch {
      setNewsletterStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-4 shadow-sm">
        <div className="mx-auto max-w-lg flex items-center justify-between">
          <Link href="/" className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-full transition">
            <X className="h-5 w-5" />
          </Link>
          <span className="text-sm font-bold text-[#1E0306]">Order &amp; Enrollment</span>
          <div className="w-5" />
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-8 space-y-6 text-center">
        {/* Banner */}
        <div className="space-y-3">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/20">
            <CheckCircle className="h-10 w-10" />
          </div>
          <h1 className="text-2xl font-black text-[#1E0306]">NFI Academy Enrollment</h1>
          <p className="text-xs font-semibold text-slate-600 max-w-xs mx-auto">
            Connect directly with New Forex Industry on WhatsApp to get immediate course access.
          </p>
        </div>

        {/* WhatsApp Direct CTA */}
        <div className="rounded-2xl bg-emerald-50 p-6 border border-emerald-200 text-left space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-emerald-950">Official WhatsApp Contact</h3>
              <p className="text-xs text-emerald-800 font-mono font-semibold">+234 816 512 7497</p>
            </div>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              `Hello New Forex Industry (NFI)! I am ready to access the ${course.title}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-emerald-600 py-3 text-xs font-extrabold text-white transition shadow-md"
          >
            <MessageCircle className="h-4 w-4 fill-white" />
            Open WhatsApp Chat
          </a>
        </div>

        {/* Course Summary */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 space-y-4">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-[#1E0306] text-amber-400 font-black text-xl shadow-md">
            NFI
          </div>
          <h2 className="text-base font-bold text-[#1E0306]">{course.title}</h2>
          <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-100 text-center">
            <div>
              <div className="text-base font-black text-[#1E0306]">{course.totalChapters}</div>
              <div className="text-[10px] text-slate-400 font-semibold">Chapters</div>
            </div>
            <div>
              <div className="text-base font-black text-[#1E0306]">{course.totalQuizzes}</div>
              <div className="text-[10px] text-slate-400 font-semibold">Quizzes</div>
            </div>
            <div>
              <div className="text-base font-black text-[#1E0306]">{course.totalExams}</div>
              <div className="text-[10px] text-slate-400 font-semibold">Exams</div>
            </div>
            <div>
              <div className="text-base font-black text-[#1E0306]">{course.durationHours}</div>
              <div className="text-[10px] text-slate-400 font-semibold">Hours</div>
            </div>
          </div>
        </div>

        {/* Newsletter Opt-In from Resend */}
        <div className="rounded-2xl bg-[#FDE9EC] p-5 border border-rose-200 text-left space-y-3">
          <div className="flex items-start gap-3">
            <div className="h-9 w-9 shrink-0 rounded-xl bg-[#ED3C52] flex items-center justify-center text-white mt-0.5">
              <Mail className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#1E0306]">Stay in the loop 📈</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                Get free forex tips, market updates, and price action breakdowns from New Forex Industry delivered to your inbox via Resend.
              </p>
            </div>
          </div>

          {newsletterStatus === "done" ? (
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-xl px-4 py-2.5 border border-emerald-200">
              <CheckCircle className="h-4 w-4 shrink-0" />
              You're subscribed! Watch your inbox for NFI market tips.
            </div>
          ) : (
            <div className="space-y-2.5">
              <input
                type="email"
                placeholder="Your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full rounded-xl border border-rose-200 bg-white px-4 py-2.5 text-xs focus:border-[#ED3C52] focus:outline-none"
              />
              <label className="flex items-center gap-2 text-[11px] text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newsletterChecked}
                  onChange={(e) => setNewsletterChecked(e.target.checked)}
                  className="rounded border-rose-300 accent-[#ED3C52]"
                />
                Yes, send me free forex tips &amp; market updates from NFI
              </label>
              <button
                onClick={handleNewsletterSubscribe}
                disabled={!newsletterChecked || newsletterStatus === "loading"}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#ED3C52] hover:bg-rose-600 py-2.5 text-xs font-extrabold text-white transition disabled:opacity-40"
              >
                {newsletterStatus === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Subscribe to NFI Newsletter"
                )}
              </button>
              {newsletterStatus === "error" && (
                <p className="text-[11px] text-rose-600">Subscription failed — please try again.</p>
              )}
            </div>
          )}
        </div>

        {/* Feedback */}
        <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200 space-y-3">
          <p className="text-xs font-bold text-slate-700">How was your experience?</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setRating(5)}
              className={`flex items-center justify-center gap-1.5 rounded-xl p-3 text-xs font-bold border transition ${
                rating === 5 ? "border-amber-400 bg-amber-50 text-amber-900" : "border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              Rate our application
            </button>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                `Hello New Forex Industry, I have a question about the academy.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-xl p-3 text-xs font-bold border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
            >
              <MessageSquare className="h-4 w-4 text-[#ED3C52]" />
              Ask question
            </a>
          </div>
        </div>
      </main>

      {/* Sticky Bottom */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 p-4 shadow-2xl z-40">
        <div className="mx-auto max-w-lg">
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#ED3C52] hover:bg-rose-600 py-4 text-base font-extrabold text-white button-glow transition"
          >
            <Home className="h-5 w-5" />
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
