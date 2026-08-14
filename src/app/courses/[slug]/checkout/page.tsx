"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { PFX_COURSE } from "@/lib/data";
import {
  ArrowLeft,
  CheckCircle,
  MessageCircle,
  Mail,
  User,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params?.slug as string) || "prince-of-forex-masterclass";
  const course = PFX_COURSE;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const WHATSAPP_NUMBER = "2348165127497";

  const handleWhatsAppCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setErrorMessage(null);

    const message = encodeURIComponent(
      `Hello Prince of Forex (PFX) Academy! 👋\n\n` +
      `I would like to enroll in the *${course.title}*.\n\n` +
      `📌 *Order Details:*\n` +
      `• *Course:* ${course.title}\n` +
      `• *Price:* $${course.price.toFixed(2)}\n` +
      (fullName.trim() ? `• *Full Name:* ${fullName.trim()}\n` : "") +
      `• *Email:* ${email.trim()}\n\n` +
      `Please provide the payment details so I can complete my enrollment and receive access.`
    );

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

    // Open WhatsApp in new tab or direct window
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 md:pb-12">
      {/* Checkout Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-4 shadow-sm">
        <div className="mx-auto max-w-lg flex items-center justify-between">
          <Link
            href={`/courses/${course.slug}`}
            className="flex items-center gap-2 text-sm font-bold text-[#1E0306] hover:text-[#ED3C52] transition"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Course
          </Link>
          <span className="text-xs font-bold text-[#ED3C52] uppercase tracking-wider flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Direct WhatsApp Enrollment
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-8 space-y-6">
        {/* Purchased Course Item Card */}
        <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="h-14 w-14 shrink-0 rounded-xl bg-[#1E0306] text-amber-400 font-black text-lg flex items-center justify-center shadow-md">
            PFX
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#1E0306]">{course.title}</h2>
            <div className="mt-1 flex items-center gap-2 text-xs font-black text-[#ED3C52]">
              <span>${course.price.toFixed(2)}</span>
              <span className="text-slate-400 line-through text-[11px] font-normal">
                ${course.originalPrice.toFixed(2)}
              </span>
              <span className="rounded bg-rose-100 px-1.5 py-0.5 text-[10px] text-[#ED3C52] font-bold">
                Save ${(course.originalPrice - course.price).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Enrollment Form */}
        <form onSubmit={handleWhatsAppCheckout} className="space-y-6">
          <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-[#1E0306]">Student Information</h3>

            {/* Full Name Input (Optional) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Full Name (Optional)
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. Prince / Alex Vance"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:border-[#ED3C52] focus:outline-none"
                />
              </div>
            </div>

            {/* Email Address Input (Required) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="student@princeofforex.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:border-[#ED3C52] focus:outline-none"
                />
              </div>
              <p className="text-[11px] text-slate-500 pt-0.5 leading-relaxed">
                Your course materials and lifetime access details will be sent to this email.
              </p>
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200 space-y-3">
            <h3 className="text-sm font-bold text-[#1E0306]">Order Summary</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Course fee</span>
                <span>${course.originalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-[#ED3C52]">
                <span>Discount</span>
                <span>-${(course.originalPrice - course.price).toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-slate-100 flex justify-between text-sm font-black text-[#1E0306]">
                <span>Total Due</span>
                <span>${course.price.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* WhatsApp Direct Notice Card */}
          <div className="rounded-2xl bg-emerald-50 p-4 border border-emerald-200 flex items-start gap-3">
            <div className="h-8 w-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
              <MessageCircle className="h-4 w-4" />
            </div>
            <div className="text-xs text-emerald-950 space-y-1 leading-relaxed">
              <p className="font-bold">Instant WhatsApp Support &amp; Verification</p>
              <p className="text-[11px] text-emerald-800">
                Clicking the button below opens an official chat with <strong>Prince of Forex (+2348165127497)</strong> to complete payment via your preferred method and get immediate course access.
              </p>
            </div>
          </div>

          {errorMessage && (
            <div className="rounded-xl bg-rose-50 p-3 text-xs font-semibold text-rose-600 border border-rose-200">
              {errorMessage}
            </div>
          )}

          {/* WhatsApp Primary Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2.5 rounded-2xl bg-[#25D366] hover:bg-emerald-600 py-4 text-base font-extrabold text-white shadow-xl shadow-emerald-500/20 transition button-glow"
          >
            <MessageCircle className="h-5 w-5 fill-white" />
            Complete Enrollment on WhatsApp • ${course.price.toFixed(2)}
          </button>
        </form>
      </main>
    </div>
  );
}
