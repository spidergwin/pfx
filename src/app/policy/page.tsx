import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy",
};

export default function PolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <section className="bg-[#1E0306] text-white py-16 px-4 md:px-8 text-center">
        <div className="mx-auto max-w-3xl space-y-2">
          <h1 className="text-3xl md:text-5xl font-black">
            Privacy <span className="text-[#ED3C52]">Policy</span>
          </h1>
          <p className="text-xs text-rose-200/70">Last updated: August 2026</p>
        </div>
      </section>

      <main className="mx-auto max-w-3xl px-4 py-16 space-y-8 text-sm text-slate-600 leading-relaxed">
        <div className="rounded-2xl bg-white p-8 border border-slate-200 shadow-sm space-y-7">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#1E0306]">1. Introduction</h2>
            <p>New Forex Industry (NFI Academy) ("we", "us", or "our") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard the data you provide when interacting with our website or enrolling in our courses.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#1E0306]">2. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Name &amp; Email Address</strong> — collected at checkout to deliver course materials.</li>
              <li><strong>WhatsApp Communications</strong> — messages and payment confirmation details sent to our official enrollment line (+2348165127497).</li>
              <li><strong>Newsletter Subscription</strong> — your email, only if you explicitly opt in to receive NFI market updates.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#1E0306]">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To deliver the purchased course materials to your email address.</li>
              <li>To provide direct WhatsApp student support and onboarding.</li>
              <li>To send newsletter updates and market tips, if you have subscribed.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#1E0306]">4. Third-Party Services</h2>
            <p>We use the following trusted third-party providers:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Resend</strong> — newsletter and transactional email delivery.</li>
              <li><strong>WhatsApp</strong> — direct enrollment communication and student onboarding.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#1E0306]">5. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, reach out to us via our official WhatsApp line: +234 816 512 7497.</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
