"use client";

import { useEffect, useState, useRef } from "react";
import { PFX_REVIEWS } from "@/lib/data";
import { Star, CheckCircle, Quote, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

export function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reviews = PFX_REVIEWS;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPaused) return;

    timeoutRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 2000); // Scrolls every 2 seconds

    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, [isPaused, reviews.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200 overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FDE9EC] px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-[#ED3C52] border border-rose-200/60 mb-2">
              <Star className="h-3.5 w-3.5 fill-[#ED3C52] text-[#ED3C52]" />
              Student Testimonials &amp; Results
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E0306]">
              Trusted by <span className="text-[#ED3C52]">5,400+ Traders</span> Worldwide
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Real feedback from students who transformed their trading with the New Forex Industry Masterclass.
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition shadow-sm text-xs font-semibold flex items-center gap-1"
              title={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
            >
              {isPaused ? <Play className="h-4 w-4 text-emerald-600 fill-emerald-600" /> : <Pause className="h-4 w-4 text-[#ED3C52]" />}
              <span className="hidden sm:inline text-[11px]">{isPaused ? "Play" : "Auto"}</span>
            </button>
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-[#ED3C52] transition shadow-sm"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-[#ED3C52] transition shadow-sm"
              aria-label="Next review"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Dynamic Highlight Card + Grid Preview */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative"
        >
          {/* Main Active Review Spotlight Card */}
          <div className="rounded-3xl bg-[#1E0306] text-white p-8 md:p-10 shadow-2xl border border-rose-950 relative overflow-hidden transition-all duration-500">
            {/* Background Glow & Quote Graphic */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#ED3C52]/10 rounded-full blur-3xl pointer-events-none" />
            <Quote className="absolute top-6 right-8 h-20 w-20 text-white/5 pointer-events-none" />

            <div className="relative z-10 flex flex-col justify-between min-h-[200px] space-y-6">
              {/* Star Rating */}
              <div className="flex items-center gap-1.5">
                {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-2 text-xs font-extrabold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md">
                  5.0 Verified Review
                </span>
              </div>

              {/* Review Text */}
              <blockquote className="text-base md:text-xl font-medium leading-relaxed text-rose-50/95 italic">
                "{reviews[currentIndex].comment}"
              </blockquote>

              {/* Reviewer Details */}
              <div className="pt-4 border-t border-rose-900/50 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#ED3C52] to-rose-700 text-white font-black text-lg flex items-center justify-center shadow-md">
                    {reviews[currentIndex].name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-white flex items-center gap-1.5">
                      {reviews[currentIndex].name}
                      <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                    </div>
                    <div className="text-xs text-rose-200/70">
                      {reviews[currentIndex].role} • {reviews[currentIndex].country}
                    </div>
                  </div>
                </div>

                <div className="text-xs font-mono text-rose-200/50">
                  Review {currentIndex + 1} of {reviews.length}
                </div>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to review ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "w-8 bg-[#ED3C52] shadow-sm shadow-[#ED3C52]/50"
                    : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
