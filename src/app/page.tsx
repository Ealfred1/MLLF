import React from "react";
import Link from "next/link";
import { FiArrowRight, FiHeart, FiShield, FiFileText } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";

export default function Home() {
  return (
    <div className="flex flex-col bg-background text-foreground overflow-hidden">
      
      {/* Premium Split Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-ink via-[#0d1c6e] to-brand-ink text-primary-foreground py-20 lg:py-32 grid-mesh">
        {/* Glow Patterns */}
        <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 h-[35rem] w-[35rem] rounded-full bg-brand-yellow/15 blur-[120px]"></div>
          <div className="absolute bottom-10 right-10 h-[30rem] w-[30rem] rounded-full bg-primary/20 blur-[150px]"></div>
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            
            {/* Left Column (Copy) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4.5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white/95 backdrop-blur-md">
                <FiHeart className="h-4 w-4 text-brand-yellow animate-pulse fill-current" />
                Love in action — across Nigeria
              </span>
              
              <h1 className="font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl md:text-6xl xl:text-7xl tracking-tight">
                One act of love.<br />
                <span className="text-brand-yellow drop-shadow-md">A lifetime</span> of light.
              </h1>
              
              <p className="mx-auto lg:mx-0 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                Maryann's Love and Light Foundation shows up for the forgotten — with food, school fees, books, and care. No agenda. No middlemen. Just kindness that reaches the people who need it most.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/donate"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-yellow px-8 py-4 text-sm font-extrabold text-brand-ink shadow-lg shadow-brand-yellow/10 transition-all duration-300 hover:scale-[1.03] hover:shadow-brand-yellow/20 active:scale-[0.98] sm:w-auto"
                >
                  Support Our Work
                  <FiArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/impact"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-white/5 active:scale-[0.98] sm:w-auto"
                >
                  See Our Impact
                </Link>
              </div>
            </div>

            {/* Right Column (Floating SVG Illustration) */}
            <div className="lg:col-span-5 relative w-full flex justify-center">
              {/* Decorative Yellow Vector Background Card */}
              <div className="absolute -inset-1 rounded-[2.5rem] bg-brand-yellow opacity-10 blur-xl transform rotate-3"></div>
              
              {/* Glass container wrap */}
              <div className="relative aspect-square w-full max-w-[420px] rounded-[2.5rem] p-6 glass-card border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden animate-in zoom-in duration-500">
                <img 
                  src="/kids.svg" 
                  alt="MLLF Children Illustration" 
                  className="w-full h-full object-contain filter drop-shadow-md hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Highlights Grid */}
      <section className="border-b border-border/40 bg-secondary/20 relative py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 relative">
          <div className="grid gap-8 sm:grid-cols-3">
            
            {/* Card 1 */}
            <div className="rounded-3xl p-8 glass-card hover-glow transition-all-custom">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary mb-5">
                <FiHeart className="h-6 w-6" />
              </span>
              <h3 className="font-display text-lg font-bold text-foreground">Driven by Kindness</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Operating purely out of care for communities. No binding contracts, just genuine outreach.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-3xl p-8 glass-card hover-glow transition-all-custom">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary mb-5">
                <FiShield className="h-6 w-6" />
              </span>
              <h3 className="font-display text-lg font-bold text-foreground">Orphanage Network</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Directly acknowledged and welcomed by every shelter and home we visit across the states.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-3xl p-8 glass-card hover-glow transition-all-custom">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary mb-5">
                <FiFileText className="h-6 w-6" />
              </span>
              <h3 className="font-display text-lg font-bold text-foreground">100% Documented</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Every single dollar and food outreach operation is fully logged and verified for public trust.
              </p>
            </div>

          </div>
        </div>

        {/* Verification strip */}
        <div className="mt-12 text-center">
          <p className="mx-auto max-w-2xl px-4 text-xs font-bold text-muted-foreground">
            <span className="mr-2 inline-flex items-center rounded-full bg-brand-yellow/30 px-3 py-1 text-[10px] uppercase tracking-wider text-brand-ink border border-brand-yellow/20">
              Pending Verification
            </span>
            100% of received funds are funneled directly to purchase supplies and aid.
          </p>
        </div>
      </section>

      {/* Stats Counter Section (Out-of-this-world glow) */}
      <section className="relative overflow-hidden bg-brand-ink text-white py-20">
        <div className="pointer-events-none absolute inset-0 opacity-30" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-brand-green/30 blur-[100px]"></div>
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 sm:grid-cols-3 text-center">
            <div className="space-y-2">
              <p className="font-display text-6xl font-extrabold text-brand-yellow tracking-tight">6</p>
              <div className="h-1 w-12 bg-brand-green mx-auto rounded-full"></div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/60 pt-2">Communities Reached</p>
            </div>
            <div className="space-y-2">
              <p className="font-display text-6xl font-extrabold text-brand-yellow tracking-tight">300+</p>
              <div className="h-1 w-12 bg-brand-green mx-auto rounded-full"></div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/60 pt-2">People Supported</p>
            </div>
            <div className="space-y-2">
              <p className="font-display text-6xl font-extrabold text-brand-yellow tracking-tight">30+</p>
              <div className="h-1 w-12 bg-brand-green mx-auto rounded-full"></div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/60 pt-2">Active Volunteers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment details */}
      <section className="relative py-24 lg:py-32 bg-white grid-mesh">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            
            {/* Title card */}
            <div className="lg:col-span-5 space-y-4">
              <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.25em] text-primary">
                <HiSparkles className="h-4 w-4 text-brand-yellow animate-spin" style={{ animationDuration: '6s' }} /> Our Commitment
              </span>
              <h2 className="font-display text-4xl font-extrabold leading-tight text-foreground sm:text-5xl">
                We go where the need is — and we stay.
              </h2>
            </div>

            {/* Paragraph block */}
            <div className="lg:col-span-7 space-y-6 text-base leading-relaxed text-muted-foreground">
              <p className="text-lg text-foreground font-medium">
                Some days that means delivering boxes of food to families on the street. Other days it's paying a child's school fees so they don't have to drop out.
              </p>
              <p>
                We do not fit into just one rigid category. We have one simple, singular commitment — to show up for individuals who need a helping hand, providing care and light where other services fall short.
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
        </div>
      </section>

      {/* Ready to Help CTA banner */}
      <section className="bg-gradient-to-r from-[#0d1c6e] via-primary to-[#0d1c6e] text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        
        <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-4 text-center sm:px-6 md:flex-row md:text-left">
          <div>
            <h3 className="font-display text-3xl font-extrabold text-brand-yellow">Ready to show up with us?</h3>
            <p className="mt-2 text-white/80 leading-relaxed font-medium">
              Volunteer your time or help fund our next outreach mission.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 w-full md:w-auto">
            <Link
              href="/volunteer"
              className="w-full sm:w-auto rounded-full border border-white/30 bg-white/5 px-8 py-3.5 text-sm font-bold text-white transition hover:bg-white/10 active:scale-[0.98] text-center"
            >
              Volunteer
            </Link>
            <Link
              href="/donate"
              className="w-full sm:w-auto rounded-full bg-brand-yellow px-8 py-3.5 text-sm font-extrabold text-brand-ink transition hover:scale-[1.02] active:scale-[0.98] text-center"
            >
              Donate now
            </Link>
          </div>
        </div>
      </section>
      
    </div>
  );
}
