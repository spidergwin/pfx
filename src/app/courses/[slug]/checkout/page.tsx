"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { PFX_COURSE } from "@/lib/data";
import {
  ArrowLeft,
  CheckCircle,
  CreditCard,
  Loader2,
  ShieldCheck,
  Mail,
} from "lucide-react";

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params?.slug as string) || "prince-of-forex-masterclass";
  const course = PFX_COURSE;

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePaystackCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage("Please enter your email address to receive course delivery");
      return;
    }
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: course.id,
          email,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        setErrorMessage(data.error || "Failed to initialize Paystack checkout");
        setLoading(false);
        return;
      }

      if (data.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        router.push(`/courses/${course.slug}/confirmation?reference=${data.reference}&email=${encodeURIComponent(email)}`);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred during checkout");
      setLoading(false);
    }
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
            Checkout
          </Link>
          <span className="text-xs font-bold text-[#ED3C52] uppercase tracking-wider">
            Paystack Payment Gateway
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
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handlePaystackCheckout} className="space-y-6">
          {/* Email Address Input */}
          <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200 space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1E0306]">
              Your Email Address for Course Delivery
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
            <p className="text-[11px] text-slate-500 pt-1 leading-relaxed">
              The course will be delivered directly to your email address upon purchase completion.
            </p>
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

          {errorMessage && (
            <div className="rounded-xl bg-rose-50 p-3 text-xs font-semibold text-rose-600 border border-rose-200">
              {errorMessage}
            </div>
          )}

          {/* Paystack Primary Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#ED3C52] hover:bg-rose-600 py-4 text-base font-extrabold text-white button-glow transition disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>Proceed to Paystack • ${course.price.toFixed(2)}</>
            )}
          </button>
        </form>
      </main>
    </div>
  );
}
