import React from "react";
import Link from "next/link";
import { FiHeart, FiInstagram, FiMail, FiMessageCircle } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-brand-ink text-brand-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        {/* Foundation Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
              <FiHeart className="h-4 w-4 fill-current" />
            </span>
            Maryann's Love and Light Foundation
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/70">
            Showing up — consistently, compassionately, practically — for the less privileged communities of Nigeria.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/" className="text-white/80 transition-colors duration-200 hover:text-brand-yellow">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-white/80 transition-colors duration-200 hover:text-brand-yellow">
                About
              </Link>
            </li>
            <li>
              <Link href="/volunteer" className="text-white/80 transition-colors duration-200 hover:text-brand-yellow">
                Volunteer
              </Link>
            </li>
            <li>
              <Link href="/impact" className="text-white/80 transition-colors duration-200 hover:text-brand-yellow">
                Impact
              </Link>
            </li>
            <li>
              <Link href="/donate" className="text-white/80 transition-colors duration-200 hover:text-brand-yellow">
                Donate
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Links */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60">Reach us</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href="https://www.instagram.com/maryanns_llf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-white/85 transition-colors duration-200 hover:text-brand-yellow"
              >
                <FiInstagram className="h-4 w-4" />
                @maryanns_llf
              </a>
            </li>
            <li>
              <a
                href="mailto:Maryannsloveandlight@gmail.com"
                className="inline-flex items-center gap-2 text-white/85 transition-colors duration-200 hover:text-brand-yellow"
              >
                <FiMail className="h-4 w-4" />
                Maryannsloveandlight@gmail.com
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/2347063472279"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-white/85 transition-colors duration-200 hover:text-brand-yellow"
              >
                <FiMessageCircle className="h-4 w-4" />
                +234 706 347 2279
              </a>
            </li>
          </ul>
          <p className="mt-5 text-xs text-white/40 font-medium">CAC Reg. No: 7663513</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/50 sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} Maryann's Love and Light Foundation. Made with love.</p>
          <p>Driven by kindness, not contracts.</p>
        </div>
      </div>
    </footer>
  );
}
