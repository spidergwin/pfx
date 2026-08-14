import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FAQ_ITEMS } from "@/lib/data";

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <section className="bg-[#1E0306] text-white py-16 px-4 md:px-8 text-center">
        <div className="mx-auto max-w-3xl space-y-3">
          <h1 className="text-3xl md:text-5xl font-black">
            Frequently Asked <span className="text-[#ED3C52]">Questions</span>
          </h1>
          <p className="text-xs md:text-sm text-rose-200/80 max-w-xl mx-auto">
            Everything you need to know about the New Forex Industry (NFI) Masterclass, enrollment on WhatsApp, and Lot Size Calculator.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-4 py-16 space-y-4">
        {FAQ_ITEMS.map((item, idx) => (
          <div key={idx} className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
            <h2 className="text-base font-bold text-[#1E0306]">{item.q}</h2>
            <p className="text-xs md:text-sm text-slate-600 mt-2 leading-relaxed">{item.a}</p>
          </div>
        ))}
      </main>

      <Footer />
    </div>
  );
}
