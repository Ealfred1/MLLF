import React from "react";
import Link from "next/link";
import { FiArrowRight, FiHeart, FiShield, FiFileText } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";

export default function Home() {
  return (
    <div className="flex flex-col bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        {/* Glow Patterns */}
        <div className="pointer-events-none absolute inset-0 opacity-35" aria-hidden="true">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-brand-yellow/40 blur-3xl"></div>
          <div className="absolute -bottom-40 -right-20 h-[28rem] w-[28rem] rounded-full bg-brand-green/30 blur-3xl"></div>
        </div>

        <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 sm:py-32 md:py-40">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
            <FiHeart className="h-3.5 w-3.5 fill-current text-brand-yellow animate-pulse" /> Love in action — across Nigeria
          </span>
          
          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
            One act of love.<br />
            <span className="text-brand-yellow drop-shadow-sm">A lifetime</span> of light.
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            Maryann's Love and Light Foundation shows up for the forgotten — with food, school fees, books, and care. No agenda. No middlemen. Just kindness that reaches the people who need it most.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/donate"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-yellow px-7 py-3.5 text-sm font-bold text-brand-ink shadow-lg shadow-black/10 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] sm:w-auto"
            >
              Support Our Work
              <FiArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/impact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:bg-white/10 active:scale-[0.98] sm:w-auto"
            >
              See What We've Done
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights Grid */}
      <section className="border-y border-border bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6">
          <div className="flex items-start gap-3.5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary text-primary">
              <FiHeart className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display font-semibold text-foreground">Driven by Kindness</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Operating purely out of care for communities, not binding contracts.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary text-primary">
              <FiShield className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display font-semibold text-foreground">Orphanage Network</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Directly acknowledged and welcomed by every home we've visited.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary text-primary">
              <FiFileText className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display font-semibold text-foreground">100% Documented</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Every single outreach and financial transaction is logged transparently.</p>
            </div>
          </div>
        </div>

        {/* Verification Strip */}
        <div className="bg-secondary/60 py-3 text-center border-t border-border/40">
          <p className="mx-auto max-w-6xl px-4 text-xs font-semibold text-secondary-foreground sm:px-6">
            <span className="mr-2 inline-flex items-center rounded-full bg-brand-yellow/30 px-2 py-0.5 text-[10px] uppercase tracking-wider text-brand-ink border border-brand-yellow/20">
              Pending Verification
            </span>
            100% of public donations go directly to supporting underprivileged communities.
          </p>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="bg-primary text-primary-foreground py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 sm:grid-cols-3 text-center">
            <div className="space-y-1">
              <p className="font-display text-5xl font-extrabold text-brand-yellow sm:text-6xl">6</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/70">Communities Reached</p>
            </div>
            <div className="space-y-1">
              <p className="font-display text-5xl font-extrabold text-brand-yellow sm:text-6xl">300+</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/70">People Supported</p>
            </div>
            <div className="space-y-1">
              <p className="font-display text-5xl font-extrabold text-brand-yellow sm:text-6xl">30+</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/70">Active Volunteers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Value Statement */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <HiSparkles className="h-3.5 w-3.5 text-brand-yellow" /> Our Commitment
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-foreground sm:text-4xl md:text-5xl">
              We go where the need is — and we stay until it's met.
            </h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-foreground/80">
            <p>
              Some days that means delivering boxes of food to families on the street. Other days it's paying a child's school fees so they don't have to drop out. Sometimes it's dropping off textbooks and supplies at an orphanage.
            </p>
            <p>
              We don't fit into just one rigid category. We have one simple, singular commitment — to show up for individuals who need a helping hand, providing care and light.
            </p>
            <div className="pt-2">
              <Link
                href="/donate"
                className="group inline-flex items-center gap-2 text-base font-bold text-primary transition duration-200 hover:text-primary/80"
              >
                Want to make this possible? Donate Today
                <FiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Help CTA Banner */}
      <section className="bg-brand-ink text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-4 py-16 text-center sm:px-6 md:flex-row md:text-left">
          <div>
            <h3 className="font-display text-2xl font-bold sm:text-3xl">Ready to show up with us?</h3>
            <p className="mt-2 text-white/70 leading-relaxed">
              Volunteer your time or help fund our next outreach mission.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 w-full md:w-auto">
            <Link
              href="/volunteer"
              className="w-full sm:w-auto rounded-full border border-white/40 px-6 py-3 text-sm font-semibold transition hover:bg-white/10 active:scale-[0.98] text-center"
            >
              Volunteer
            </Link>
            <Link
              href="/donate"
              className="w-full sm:w-auto rounded-full bg-brand-yellow px-6 py-3 text-sm font-bold text-brand-ink transition hover:scale-[1.02] active:scale-[0.98] text-center"
            >
              Donate now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
