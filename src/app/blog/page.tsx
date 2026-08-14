import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BLOG_POSTS } from "@/lib/data";
import { ArrowRight, Calendar, User, Crown } from "lucide-react";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <section className="bg-[#1E0306] text-white py-16 px-4 md:px-8 text-center">
        <div className="mx-auto max-w-3xl space-y-3">
          <h1 className="text-3xl md:text-5xl font-black">
            Prince of Forex <span className="text-[#ED3C52]">Blog</span>
          </h1>
          <p className="text-xs md:text-sm text-rose-200/80 max-w-xl mx-auto">
            Market analysis breakdowns, price action guides, and risk management strategies.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition space-y-4"
            >
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-xl bg-rose-50 text-[#ED3C52] flex items-center justify-center font-bold">
                  <Crown className="h-5 w-5" />
                </div>

                <div className="flex items-center gap-3 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-[#ED3C52]" /> {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" /> {post.author}
                  </span>
                </div>

                <h2 className="text-base font-bold text-[#1E0306] leading-snug">
                  {post.title}
                </h2>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <Link
                href="/courses/prince-of-forex-masterclass"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ED3C52] hover:underline pt-2"
              >
                Explore the Full Masterclass <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
