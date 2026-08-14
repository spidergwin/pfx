import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <section className="bg-[#1E0306] text-white py-16 px-4 md:px-8 text-center">
        <div className="mx-auto max-w-3xl space-y-2">
          <h1 className="text-3xl md:text-5xl font-black">
            Terms of <span className="text-[#ED3C52]">Service</span>
          </h1>
          <p className="text-xs text-rose-200/70">Last updated: August 2026</p>
        </div>
      </section>

      <main className="mx-auto max-w-3xl px-4 py-16 space-y-8 text-sm text-slate-600 leading-relaxed">
        <div className="rounded-2xl bg-white p-8 border border-slate-200 shadow-sm space-y-7">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#1E0306]">1. Acceptance of Terms</h2>
            <p>By accessing or purchasing from Prince of Forex (PFX) Academy ("PFX", "we", "us", or "our"), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not proceed with a purchase.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#1E0306]">2. Educational Purpose Only</h2>
            <p>All content, video lessons, written materials, quizzes, and trade breakdowns provided by PFX Academy are strictly for <strong>educational and informational purposes only</strong>. Nothing on this platform constitutes financial advice, investment advice, trading advice, or any other form of professional financial guidance.</p>
            <p>Trading foreign exchange and financial markets involves significant risk. You are solely responsible for your own trading decisions.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#1E0306]">3. Course Access & Delivery</h2>
            <p>Upon successful payment confirmation via Paystack, course materials will be delivered to the email address provided during checkout. PFX Academy grants you a personal, non-transferable, lifetime licence to access the course content for your own private educational use.</p>
            <p>You may not redistribute, resell, share, or publicly post any course materials in whole or in part.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#1E0306]">4. Refund Policy</h2>
            <p>Due to the digital nature of the course content, all sales are <strong>final and non-refundable</strong> once course access has been delivered to your email. If you have not received your course access email within 24 hours of payment, please contact us immediately at the address below.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#1E0306]">5. Intellectual Property</h2>
            <p>All content on PFX Academy — including but not limited to course videos, written lessons, quizzes, graphics, and the PFX brand — is the exclusive intellectual property of Prince of Forex (PFX Academy). Unauthorised reproduction or distribution is strictly prohibited and may result in legal action.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#1E0306]">6. Payments & Security</h2>
            <p>All payments are processed securely by <strong>Paystack</strong>, a PCI DSS compliant payment processor. PFX Academy does not store your card details. By completing a purchase, you also agree to Paystack's terms of service.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#1E0306]">7. Limitation of Liability</h2>
            <p>PFX Academy and its representatives shall not be held liable for any trading losses, financial damages, or lost profits resulting from the use or application of information presented in our courses. Market outcomes are unpredictable and past performance is not indicative of future results.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#1E0306]">8. Governing Law</h2>
            <p>These Terms of Service shall be governed by and construed in accordance with applicable laws. Any disputes shall be resolved in good faith between the parties before any formal legal proceedings.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#1E0306]">9. Contact Us</h2>
            <p>For any questions regarding these Terms, please contact us via the PFX Academy website or email address listed on the platform.</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
