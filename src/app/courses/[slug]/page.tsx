"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PFX_COURSE } from "@/lib/data";
import {
  Star,
  Users,
  CheckCircle,
  Heart,
  Clock,
  BookOpen,
  PlayCircle,
  Lock,
  ArrowRight,
  Check,
} from "lucide-react";

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();

  const course = PFX_COURSE;
  const [activeTab, setActiveTab] = useState<"about" | "lessons" | "questions">("about");
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 md:pb-16">
      <Navbar />

      {/* TOP HEADER BANNER */}
      <section className="relative w-full bg-[#1E0306] text-white py-8 md:py-12 px-4 md:px-8 border-b border-rose-950">
        <div className="mx-auto max-w-6xl relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-amber-400 px-2.5 py-0.5 text-xs font-black text-slate-950 uppercase tracking-wider">
                Bestseller
              </span>
              <span className="rounded-md bg-white/10 px-2.5 py-0.5 text-xs font-bold text-white">
                NFI Masterclass
              </span>
            </div>
            <button
              onClick={() => setIsSaved(!isSaved)}
              className="rounded-full bg-white/10 p-2.5 hover:bg-white/20 transition"
              title="Bookmark Course"
            >
              <Heart className={`h-5 w-5 ${isSaved ? "fill-[#ED3C52] text-[#ED3C52]" : "text-white"}`} />
            </button>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
            {course.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-rose-200/90">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <strong className="text-white font-bold">{course.rating} / 5.0</strong>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-rose-300" />
              <span>{course.enrolledCount.toLocaleString()} already enrolled</span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <div className="mx-auto max-w-6xl px-4 md:px-8 py-6 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN */}
        <div className="md:col-span-7 lg:col-span-8 space-y-6">
          {/* TABS NAVIGATION */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex items-center justify-around border-b border-slate-200 text-xs md:text-sm font-bold">
              <button
                onClick={() => setActiveTab("about")}
                className={`py-3.5 px-4 border-b-2 transition ${
                  activeTab === "about"
                    ? "border-[#ED3C52] text-[#ED3C52]"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                ? About
              </button>
              <button
                onClick={() => setActiveTab("lessons")}
                className={`py-3.5 px-4 border-b-2 transition ${
                  activeTab === "lessons"
                    ? "border-[#ED3C52] text-[#ED3C52]"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                📖 Lessons ({course.chapters.reduce((acc, c) => acc + c.lessons.length, 0)})
              </button>
              <button
                onClick={() => setActiveTab("questions")}
                className={`py-3.5 px-4 border-b-2 transition ${
                  activeTab === "questions"
                    ? "border-[#ED3C52] text-[#ED3C52]"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                💬 Questions & Discussion
              </button>
            </div>
          </div>

          {activeTab === "about" && (
            <>
              {/* Card 1: About this course */}
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 space-y-3">
                <h2 className="text-base font-extrabold text-[#1E0306]">About this course</h2>
                <p className="text-xs md:text-sm leading-relaxed text-slate-600">
                  {course.description}
                </p>
              </div>

              {/* Card 2: SKILLS YOU WILL GAIN */}
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 space-y-4">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#1E0306]">
                  SKILLS YOU WILL GAIN
                </h2>
                <div className="flex flex-wrap gap-2">
                  {course.skillsGained.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#FDE9EC] px-3 py-1.5 text-xs font-semibold text-slate-800 border border-rose-200/60"
                    >
                      <CheckCircle className="h-3.5 w-3.5 text-[#ED3C52]" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card 3: Course Curriculum Outline */}
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 space-y-4">
                <h2 className="text-base font-extrabold text-[#1E0306]">Course Modules</h2>
                <div className="space-y-3">
                  {course.chapters.map((chap, cIdx) => (
                    <div key={cIdx} className="rounded-xl bg-slate-50 p-4 border border-slate-100 space-y-2">
                      <div className="text-xs font-bold text-[#1E0306]">{chap.title}</div>
                      <div className="space-y-1">
                        {chap.lessons.map((les, lIdx) => (
                          <div key={lIdx} className="flex items-center justify-between text-[11px] text-slate-600">
                            <span className="flex items-center gap-2">
                              <PlayCircle className="h-3.5 w-3.5 text-[#ED3C52]" /> {les.title}
                            </span>
                            <span className="text-slate-400">{les.durationMins}m</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 4: Shareable Certificate for LinkedIn */}
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-sm font-extrabold text-[#1E0306]">
                    Shareable Certificate for LinkedIn
                  </h3>
                  <p className="text-xs text-slate-500">
                    Receive an official New Forex Industry (NFI) Certificate upon course completion.
                  </p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  in
                </div>
              </div>
            </>
          )}

          {activeTab === "lessons" && (
            <div className="space-y-4">
              {course.chapters.map((chap, cIdx) => (
                <div key={cIdx} className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
                  <h3 className="text-sm font-bold text-[#1E0306] mb-3">{chap.title}</h3>
                  <div className="space-y-2">
                    {chap.lessons.map((les, lIdx) => (
                      <div
                        key={lIdx}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100"
                      >
                        <div className="flex items-center gap-3">
                          <PlayCircle className="h-4 w-4 text-[#ED3C52]" />
                          <span className="text-xs font-semibold text-slate-800">{les.title}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px]">
                          <span className="text-slate-400">{les.durationMins} mins</span>
                          {les.isFreePreview ? (
                            <span className="rounded bg-emerald-100 px-2 py-0.5 text-emerald-700 font-bold">
                              Free Preview
                            </span>
                          ) : (
                            <Lock className="h-3.5 w-3.5 text-slate-400" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "questions" && (
            <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-200 text-center space-y-3">
              <BookOpen className="mx-auto h-10 w-10 text-slate-300" />
              <h3 className="text-base font-bold text-[#1E0306]">Student Q&A Forum</h3>
              <p className="text-xs text-slate-500">
                Enrolled NFI students can post trading questions directly inside the lesson portal.
              </p>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="hidden md:block md:col-span-5 lg:col-span-4 sticky top-24">
          <div className="rounded-3xl bg-white p-6 shadow-xl border border-slate-200 space-y-6">
            <div className="rounded-2xl bg-[#1E0306] p-6 text-white text-center relative overflow-hidden">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-[#ED3C52] text-white font-black text-2xl mb-2 shadow-lg">
                NFI
              </div>
              <h3 className="text-sm font-bold">{course.title}</h3>
            </div>

            <div className="space-y-2">
              <div className="text-xs uppercase font-bold text-slate-400">Total Price</div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-[#1E0306]">${course.price.toFixed(2)}</span>
                <span className="text-sm text-slate-400 line-through">${course.originalPrice.toFixed(2)}</span>
                <span className="rounded-md bg-rose-100 px-2 py-0.5 text-xs font-bold text-[#ED3C52]">
                  37% OFF
                </span>
              </div>
              <div className="text-xs text-[#ED3C52] font-bold flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                Limited offer at this price!
              </div>
            </div>

            <Link
              href={`/courses/${course.slug}/checkout`}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#ED3C52] hover:bg-rose-600 py-4 text-sm font-extrabold text-white shadow-xl transition button-glow"
            >
              Enroll Now (${course.price.toFixed(0)})
              <ArrowRight className="h-4 w-4" />
            </Link>

            <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
              <div className="font-bold text-[#1E0306] mb-2">Course Includes:</div>
              <div className="flex items-center gap-2 text-slate-600">
                <Check className="h-4 w-4 text-[#ED3C52] shrink-0" />
                <span>30 Detailed Video Chapters</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Check className="h-4 w-4 text-[#ED3C52] shrink-0" />
                <span>50 Quizzes & 2 Practice Exams</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Check className="h-4 w-4 text-[#ED3C52] shrink-0" />
                <span>10 Hours Total Duration</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Check className="h-4 w-4 text-[#ED3C52] shrink-0" />
                <span>Full Lifetime Access</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Check className="h-4 w-4 text-[#ED3C52] shrink-0" />
                <span>Direct Email Delivery Upon Purchase</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STICKY BOTTOM PURCHASING BAR */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-200 shadow-2xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Course Fee</div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-slate-900">${course.price.toFixed(2)}</span>
              <span className="text-xs text-slate-400 line-through">${course.originalPrice.toFixed(2)}</span>
            </div>
            <div className="text-[10px] text-[#ED3C52] font-bold flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Limited offer at this price!
            </div>
          </div>

          <Link
            href={`/courses/${course.slug}/checkout`}
            className="flex items-center gap-2 rounded-xl bg-[#ED3C52] hover:bg-rose-600 px-7 py-3.5 text-xs font-extrabold text-white shadow-lg transition button-glow"
          >
            Enroll (${course.price.toFixed(0)})
          </Link>
        </div>
      </div>
    </div>
  );
}
