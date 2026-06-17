import React from "react";
import { FiUser } from "react-icons/fi";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Oluwaseun Maryann",
    role: "Founder & CEO",
    bio: "Launched the foundation to carry forward the legacy of compassion, action, and unconditional care inspired by her mother.",
  },
  {
    name: "Emeka Okafor",
    role: "Outreach & Operations Coordinator",
    bio: "Manages logistical details, community selection, and on-site distribution safety for our active volunteer network.",
  },
  {
    name: "Amina Yusuf",
    role: "Financial Administrator",
    bio: "Ensures full compliance and 100% accounting transparency for all received donations and outreach expenditures.",
  },
  {
    name: "Comfort Udoh",
    role: "Project Management Intern",
    bio: "Supports daily project tracking, volunteer coordination, and outreach scheduling to ensure operations execute smoothly.",
  },
  {
    name: "Emmanuel Ayomide",
    role: "Project Management Intern",
    bio: "Assists in tracking outreach supplies, donor reports, and documentation compliance for our community events.",
  },
];

export default function About() {
  return (
    <div className="flex flex-col bg-background text-foreground">
      {/* Page Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 md:py-28">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-yellow">
            About the foundation
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl md:text-6xl">
            More Than Charity.<br />
            <span className="text-brand-yellow">It's a Promise.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/85 sm:text-lg leading-relaxed">
            Maryann's Love and Light Foundation was born from a simple act of kindness — and a decision to do more. Today, we show up for the less privileged across Nigeria, one community at a time.
          </p>
        </div>
      </section>

      {/* Our Story Grid */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          <div className="space-y-6 text-base leading-relaxed text-foreground/80">
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Our Story
            </h2>
            <p>
              During her industrial training in Lagos State, our founder watched a little girl beg for food on the streets every single day. She gave what she could — food, money, whatever she had on her. But one day, something shifted inside her.
            </p>
            <p>
              She realised she could do more. Not just for one child — but for the many children, families, and individuals across Nigeria who fall through the cracks of society every day. She called her friends together. They talked, they planned, and they committed. And from that circle of willing hearts, Maryann's Love and Light Foundation was born.
            </p>
            <p>
              The foundation is named in honour of Maryann — the CEO's mother — a woman whose strength, reliability, and unconditional love became the living definition of everything this foundation stands for. Her name is not just a title. It is a standard we hold ourselves to every day.
            </p>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border bg-secondary shadow-sm">
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-secondary to-brand-yellow/20 text-center p-6">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-primary">
                  <FiUser className="h-8 w-8" />
                </div>
                <h4 className="font-display font-semibold text-foreground">Founder & CEO</h4>
                <p className="text-xs text-muted-foreground max-w-xs leading-normal">
                  "Leading with love and practical support for those in need across Nigerian communities."
                </p>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-2xl bg-brand-green/20 -z-10 md:-left-6 md:h-24 md:w-24"></div>
          </div>
        </div>

        {/* Quote Block */}
        <blockquote className="mt-20 border-l-4 border-brand-yellow bg-secondary/40 py-6 pl-6 pr-4 sm:pl-10 rounded-r-2xl">
          <p className="font-display text-2xl font-semibold leading-snug text-foreground sm:text-3xl">
            "Life isn't changed in a day, but we can show them what unconditional love from a stranger looks like."
          </p>
          <footer className="mt-4 text-xs font-bold uppercase tracking-wider text-primary">
            — Founder & CEO, Maryann's Love and Light Foundation
          </footer>
        </blockquote>
      </section>

      {/* Mission Declaration */}
      <section className="bg-brand-ink text-white py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-yellow">
            Our Mission
          </span>
          <p className="mt-6 font-display text-2xl font-bold italic leading-relaxed sm:text-3xl text-brand-paper">
            "To show up — consistently, compassionately, and practically — for the less privileged communities of Nigeria. To give people not just what they need today, but the dignity, support, and care that reminds them they are not forgotten."
          </p>
        </div>
      </section>

      {/* Core Values Cards */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        <h2 className="text-center font-display text-3xl font-bold">Core Values</h2>
        
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
            <span className="text-3xl">💛</span>
            <h3 className="mt-4 font-display text-lg font-bold">Compassion</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">We lead with empathy and active listening in everything we do.</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
            <span className="text-3xl">🤝</span>
            <h3 className="mt-4 font-display text-lg font-bold">Community</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">We believe sustainable change happens together, not in isolation.</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
            <span className="text-3xl">✊</span>
            <h3 className="mt-4 font-display text-lg font-bold">Action</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">We do not just analyze the problem — we actively show up to help.</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
            <span className="text-3xl">🌟</span>
            <h3 className="mt-4 font-display text-lg font-bold">Dignity</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Every human being we support deserves respect, integrity, and honor.</p>
          </div>
        </div>
      </section>

      {/* Why We Exist */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold">Why We Exist</h2>
          <p className="mt-6 text-base leading-relaxed text-foreground/80 sm:text-lg">
            Millions of Nigerians live without access to basic support, care, or community. Children go hungry. Families struggle in silence. Communities are left behind. We exist because we believe that is not acceptable — and that ordinary people, working together with extraordinary commitment, can change it.
          </p>
        </div>
      </section>

      {/* Team Profiles Directory */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold">Meet the Team</h2>
            <p className="mt-2 text-sm text-muted-foreground">The dedicated hearts driving MLLF's mission.</p>
          </div>
        </div>
        
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM_MEMBERS.map((member, index) => (
            <div key={index} className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between hover:shadow-sm transition-shadow">
              <div>
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-primary/60">
                  <FiUser className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-foreground">{member.name}</h3>
                <p className="text-sm font-semibold text-primary">{member.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
