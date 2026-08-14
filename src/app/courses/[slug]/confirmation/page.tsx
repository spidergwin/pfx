"use client";

import { useEffect, useState } from "react";
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
  AlertCircle,
  Clock,
} from "lucide-react";

type PaymentState = "verifying" | "confirmed" | "pending" | "failed";

export default function OrderConfirmationPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const reference = searchParams?.get("reference") || "";
  const course = PFX_COURSE;

  // Payment verification state
  const [paymentState, setPaymentState] = useState<PaymentState>("verifying");
  const [customerEmail, setCustomerEmail] = useState("");

  // Newsletter opt-in state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterChecked, setNewsletterChecked] = useState(true);
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  // Rating
  const [rating, setRating] = useState<number | null>(null);

  // Verify payment and retrieve customer email from server
  useEffect(() => {
    if (!reference) {
      setPaymentState("failed");
      return;
    }
    fetch(`/api/paystack/verify?reference=${encodeURIComponent(reference)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.verified) {
          setPaymentState("confirmed");
          setCustomerEmail(data.customerEmail || "");
          setNewsletterEmail(data.customerEmail || "");
        } else {
          setPaymentState("pending");
        }
      })
      .catch(() => setPaymentState("pending"));
  }, [reference]);

  const handleNewsletterSubscribe = async () => {
    if (!newsletterEmail || newsletterStatus === "done") return;
    setNewsletterStatus("loading");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail, source: "checkout" }),
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
          <span className="text-sm font-bold text-[#1E0306]">Order Confirmation</span>
          <div className="w-5" />
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-8 space-y-6 text-center">

        {/* Verifying state */}
        {paymentState === "verifying" && (
          <div className="space-y-4 py-8">
            <Loader2 className="mx-auto h-14 w-14 animate-spin text-[#ED3C52]" />
            <p className="text-sm font-semibold text-slate-600">Confirming your payment...</p>
          </div>
        )}

        {/* Payment pending */}
        {paymentState === "pending" && (
          <div className="space-y-3">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-400 text-white shadow-xl">
              <Clock className="h-10 w-10" />
            </div>
            <h1 className="text-2xl font-black text-[#1E0306]">Payment Pending</h1>
            <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
              Your payment is still being processed by Paystack. You will receive a course access email once confirmed. Check your inbox in a few minutes.
            </p>
          </div>
        )}

        {/* Payment failed */}
        {paymentState === "failed" && (
          <div className="space-y-3">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-rose-500 text-white shadow-xl">
              <AlertCircle className="h-10 w-10" />
            </div>
            <h1 className="text-2xl font-black text-[#1E0306]">Payment Not Confirmed</h1>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              We couldn't verify your payment. Please contact us if you were charged.
            </p>
            <Link href="/faq" className="inline-block text-xs font-bold text-[#ED3C52] underline mt-2">
              Visit our FAQ
            </Link>
          </div>
        )}

        {/* Payment confirmed */}
        {paymentState === "confirmed" && (
          <>
            {/* Success */}
            <div className="space-y-3">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/20">
                <CheckCircle className="h-10 w-10" />
              </div>
              <h1 className="text-2xl font-black text-[#1E0306]">Thank you for your order!</h1>
              <p className="text-xs font-semibold text-slate-600 max-w-xs mx-auto">
                The course access links and materials have been delivered to{" "}
                <strong>{customerEmail || "your email address"}</strong>.
              </p>
            </div>

            {/* Course Summary */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 space-y-4">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-[#1E0306] text-amber-400 font-black text-xl shadow-md">
                PFX
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

            {/* Order Summary */}
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200 text-left space-y-2 text-xs">
              <h3 className="font-bold text-[#1E0306] text-sm mb-1">Order Summary</h3>
              <div className="flex justify-between text-slate-600">
                <span>Course fee</span>
                <span>${course.originalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-[#ED3C52]">
                <span>Discount</span>
                <span>-${(course.originalPrice - course.price).toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-slate-100 flex justify-between text-sm font-black text-[#1E0306]">
                <span>Total Paid</span>
                <span>${course.price.toFixed(2)}</span>
              </div>
            </div>

            {/* Newsletter Opt-In — explicit action required (not auto-subscribed) */}
            <div className="rounded-2xl bg-[#FDE9EC] p-5 border border-rose-200 text-left space-y-3">
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 shrink-0 rounded-xl bg-[#ED3C52] flex items-center justify-center text-white mt-0.5">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[#1E0306]">Stay in the loop 📈</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                    Get free forex tips, market updates, and price action breakdowns from Prince of Forex delivered to your inbox.
                  </p>
                </div>
              </div>

              {newsletterStatus === "done" ? (
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-xl px-4 py-2.5 border border-emerald-200">
                  <CheckCircle className="h-4 w-4 shrink-0" />
                  You're subscribed! Watch your inbox for PFX market tips.
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
                    Yes, send me free forex tips &amp; market updates from PFX
                  </label>
                  <button
                    onClick={handleNewsletterSubscribe}
                    disabled={!newsletterChecked || newsletterStatus === "loading"}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#ED3C52] hover:bg-rose-600 py-2.5 text-xs font-extrabold text-white transition disabled:opacity-40"
                  >
                    {newsletterStatus === "loading" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Subscribe to PFX Newsletter"
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
                <button
                  onClick={() => alert("Thank you! Your feedback has been noted.")}
                  className="flex items-center justify-center gap-1.5 rounded-xl p-3 text-xs font-bold border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
                >
                  <MessageSquare className="h-4 w-4 text-[#ED3C52]" />
                  Ask question
                </button>
              </div>
            </div>
          </>
        )}
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
