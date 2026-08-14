import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import { PFX_COURSE, PFX_REVIEWS, FAQ_ITEMS } from "@/lib/data";
import {
  Star,
  Users,
  CheckCircle,
  Clock,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Image as ImageIcon,
  User,
} from "lucide-react";

export default function HomePage() {
  const course = PFX_COURSE;

  return (
    <div className="min-h-screen bg-white text-[#1E0306]">
      <Navbar />

      {/* HERO SECTION (matching cloned dark burgundy hero) */}
      <section className="relative w-full bg-[#1E0306] text-white pt-14 pb-20 md:pt-24 md:pb-32 overflow-hidden">
        <div className="relative mx-auto max-w-5xl px-4 text-center md:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#ED3C52]/20 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-[#ED3C52] border border-[#ED3C52]/30">
            <TrendingUp className="h-4 w-4 text-[#ED3C52]" />
            New Forex Industry Official Masterclass
          </div>

          <h1 className="text-3xl font-black leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
            Welcome to <br />
            <span className="text-[#ED3C52]">New Forex Industry Academy!</span>
          </h1>

          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-rose-100/90 md:text-lg">
            Start your journey to mastering <strong className="text-white">Forex Trading</strong> with one of the best programs available. Go from a beginner to an advanced FX trader with the <strong className="text-white uppercase tracking-wider">NEW FOREX INDUSTRY (NFI)</strong> masterclass. Enroll now to gain access to over 30 in-depth chapters explaining real-time market logic.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/courses/${course.slug}/checkout`}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-2xl bg-[#ED3C52] hover:bg-rose-600 px-8 py-4 text-base font-extrabold text-white shadow-xl transition button-glow"
            >
              Enroll Now (${course.price.toFixed(0)})
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href={`/courses/${course.slug}`}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl border-2 border-white/80 bg-transparent px-8 py-4 text-base font-bold text-white hover:bg-white/10 transition"
            >
              View Syllabus
            </Link>
          </div>

          {/* Social Proof Stats */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-rose-900/50 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-black text-white">5,458+</div>
              <div className="text-xs text-rose-200/70">Enrolled Students</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-black text-[#ED3C52]">4.8 / 5.0</div>
              <div className="text-xs text-rose-200/70">Student Rating</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-black text-white">30 Chapters</div>
              <div className="text-xs text-rose-200/70">Step-by-Step Modules</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-black text-[#ED3C52]">10 Hours</div>
              <div className="text-xs text-rose-200/70">Total Video Content</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED COURSE CARD */}
      <section className="mx-auto max-w-5xl px-4 md:px-8 -mt-10 relative z-20">
        <div className="rounded-3xl bg-white p-6 md:p-8 shadow-2xl border border-rose-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 shrink-0 rounded-2xl bg-[#1E0306] flex items-center justify-center text-amber-400 font-black text-2xl shadow-lg">
              NFI
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 uppercase">
                  Bestseller
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  4.8 (5,458 enrolled)
                </span>
              </div>
              <h2 className="text-lg md:text-xl font-extrabold text-[#1E0306] mt-1">
                {course.title}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                30 Chapters • 50 Quizzes • 2 Exams • 10 Hours Total
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <div>
              <span className="text-2xl font-black text-[#ED3C52]">${course.price.toFixed(2)}</span>
              <span className="ml-2 text-sm text-slate-400 line-through">${course.originalPrice.toFixed(2)}</span>
            </div>
            <Link
              href={`/courses/${course.slug}/checkout`}
              className="rounded-xl bg-[#ED3C52] hover:bg-rose-600 px-6 py-3.5 text-xs font-bold text-white shadow-md transition button-glow"
            >
              Enroll Now (${course.price.toFixed(0)})
            </Link>
          </div>
        </div>
      </section>

      {/* MEET YOUR MENTOR SECTION WITH IMAGE PLACEHOLDER */}
      <section id="about" className="py-20 md:py-28 mx-auto max-w-5xl px-4 md:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-2xl bg-[#FDE9EC] flex items-center justify-center text-[#ED3C52]">
            <TrendingUp className="h-6 w-6" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#1E0306]">
            Meet your <span className="text-[#ED3C52]">mentor...</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7 space-y-6 text-slate-600 text-sm md:text-base leading-relaxed">
            <p>
              <strong className="text-[#ED3C52] font-black tracking-wider uppercase">NEW FOREX INDUSTRY (NFI)</strong> is a professional trading brand and market strategy academy focused on replacing reckless speculation with <strong>Real-Time Market Logic</strong> and institutional risk management.
            </p>
            <p>
              By mastering risk-to-reward ratios and candlestick price action, NFI helps students move past market intimidation to achieve long-term consistency in global currency trading.
            </p>
            <div className="pt-2">
              <Link
                href={`/courses/${course.slug}/checkout`}
                className="inline-flex items-center gap-2 rounded-xl bg-[#ED3C52] px-6 py-3 text-xs font-bold text-white button-glow"
              >
                Enroll in Masterclass (${course.price.toFixed(0)})
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* MENTOR PICTURE PLACEHOLDER FRAME */}
          <div className="md:col-span-5 relative">
            <div className="relative mx-auto max-w-xs aspect-[3/4] rounded-3xl overflow-hidden shadow-xl border-4 border-slate-100 bg-[#FDE9EC] flex flex-col items-center justify-center p-6 text-center text-[#1E0306]">
              <div className="h-20 w-20 rounded-full bg-white text-[#ED3C52] flex items-center justify-center shadow-md mb-3">
                <User className="h-10 w-10" />
              </div>
              <h3 className="text-base font-extrabold">Mentor Photo Space</h3>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                Replace this placeholder by placing your portrait image file at:
                <br />
                <code className="bg-white/80 px-1.5 py-0.5 rounded text-[10px] text-[#ED3C52] font-mono mt-1 block border">
                  public/images/mentor-portrait.jpg
                </code>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY LEARN WITH NEW FOREX INDUSTRY */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-5xl px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E0306]">
              Learning with <span className="text-[#ED3C52]">New Forex Industry</span> Offers You
            </h2>
            <p className="text-xs text-slate-500 mt-2">
              Structured modules designed to build consistent forex market competence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-[#FDE9EC] p-6 border border-rose-200/60 flex flex-col justify-between space-y-4">
              <div>
                <div className="h-10 w-10 rounded-xl bg-[#ED3C52] text-white flex items-center justify-center font-bold mb-3">
                  01
                </div>
                <h3 className="text-base font-bold text-[#1E0306]">Forex Enlightenment</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  A robust curriculum covering everything from forex basics to advanced price action strategies.
                </p>
              </div>
              <Link href={`/courses/${course.slug}`} className="inline-flex items-center gap-1 text-xs font-bold text-[#ED3C52] hover:underline">
                Enroll now & get started <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl bg-[#FDE9EC] p-6 border border-rose-200/60 flex flex-col justify-between space-y-4">
              <div>
                <div className="h-10 w-10 rounded-xl bg-[#ED3C52] text-white flex items-center justify-center font-bold mb-3">
                  02
                </div>
                <h3 className="text-base font-bold text-[#1E0306]">Institutional Risk Rules</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  Learn the golden 1% capital preservation rule to eliminate emotional drawdown.
                </p>
              </div>
              <Link href="/calculator" className="inline-flex items-center gap-1 text-xs font-bold text-[#ED3C52] hover:underline">
                Use Risk Calculator <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl bg-[#FDE9EC] p-6 border border-rose-200/60 flex flex-col justify-between space-y-4">
              <div>
                <div className="h-10 w-10 rounded-xl bg-[#ED3C52] text-white flex items-center justify-center font-bold mb-3">
                  03
                </div>
                <h3 className="text-base font-bold text-[#1E0306]">Graduation Certificate</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  Receive an official shareable NFI Certificate of Completion for your LinkedIn profile.
                </p>
              </div>
              <Link href={`/courses/${course.slug}`} className="inline-flex items-center gap-1 text-xs font-bold text-[#ED3C52] hover:underline">
                View Course Details <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AUTO-SCROLLING STUDENT REVIEWS & TESTIMONIALS */}
      <ReviewsCarousel />

      {/* FAQ SECTION */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#1E0306]">
              Frequently Asked <span className="text-[#ED3C52]">Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => (
              <div key={idx} className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
                <h3 className="text-base font-bold text-[#1E0306]">{item.q}</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
