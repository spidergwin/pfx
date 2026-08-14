"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, TrendingUp } from "lucide-react";
import { PFX_COURSE } from "@/lib/data";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const course = PFX_COURSE;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: `/courses/${course.slug}`, label: "Course Details" },
    { href: "/calculator", label: "Lotsize Calculator" },
    { href: "/blog", label: "Blog" },
    { href: "/faq", label: "FAQs" },
  ];

  return (
    <>
      {/* Top Black Announcement Banner */}
      <div className="w-full bg-[#1E0306] px-4 py-2 text-white text-xs md:text-sm font-semibold flex items-center justify-between border-b border-rose-950">
        <div className="mx-auto flex items-center gap-3 text-center">
          <span className="rounded-full bg-[#ED3C52] px-2.5 py-0.5 text-[10px] uppercase font-extrabold tracking-wider">
            Special Offer
          </span>
          <span>
            Get the <strong className="text-[#ED3C52]">New Forex Industry Masterclass</strong> for only{" "}
            <strong className="text-white underline">${course.price.toFixed(2)}</strong> (Limited time price discount)
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 md:px-8">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-xl bg-[#1E0306] flex items-center justify-center text-[#ED3C52] shadow-md group-hover:scale-105 transition">
              <TrendingUp className="h-5 w-5 text-[#ED3C52]" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black tracking-tight text-[#1E0306] leading-none">
                NEW FOREX INDUSTRY
              </span>
              <span className="text-[10px] font-bold tracking-widest text-[#ED3C52] uppercase">
                NFI ACADEMY
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-[#565656]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition hover:text-[#ED3C52] ${
                    isActive ? "font-bold text-[#ED3C52]" : ""
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href={`/courses/${course.slug}/checkout`}
              className="flex items-center gap-2 rounded-xl bg-[#ED3C52] hover:bg-rose-600 px-5 py-2.5 text-xs font-bold text-white shadow-md transition button-glow"
            >
              Enroll Now (${course.price.toFixed(0)})
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#565656] hover:text-[#ED3C52] transition"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-semibold text-[#565656] hover:text-[#ED3C52]"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-100">
              <Link
                href={`/courses/${course.slug}/checkout`}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#ED3C52] py-3 text-xs font-bold text-white shadow-md"
              >
                Enroll Now (${course.price.toFixed(0)})
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
