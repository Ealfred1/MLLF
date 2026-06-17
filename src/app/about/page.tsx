import React from "react";
import { FiUser } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatarUrl?: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Oluwaseun Maryann",
    role: "Founder & CEO",
    bio: "Launched the foundation to carry forward the legacy of compassion, action, and unconditional care inspired by her mother.",
    avatarUrl: "/mllf-logo.svg", // Using foundation logo as founder brand avatar placeholder
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
    avatarUrl: "/team-comfort-udoh.svg",
  },
  {
    name: "Emmanuel Ayomide",
    role: "Project Management Intern",
    bio: "Assists in tracking outreach supplies, donor reports, and documentation compliance for our community events.",
    avatarUrl: "/team-emmanuel-ayomide.svg",
  },
];

export default function About() {
  return (
    <div className="flex flex-col bg-background text-foreground overflow-hidden">
      {/* Page Hero */}
      <section className="relative bg-gradient-to-br from-brand-ink via-[#0d1c6e] to-brand-ink text-primary-foreground py-20 md:py-28 grid-mesh">
        <div className="pointer-events-none absolute inset-0 opacity-35" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-brand-yellow/20 blur-[100px]"></div>
        </div>
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-yellow">
            About the foundation
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl md:text-6xl">
            More Than Charity.<br />
            <span className="text-brand-yellow">It's a Promise.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/80 sm:text-lg leading-relaxed">
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
            <div className="absolute -inset-1 rounded-3xl bg-brand-yellow/10 blur-lg transform rotate-2"></div>
            
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border bg-white shadow-md flex items-center justify-center p-6">
              <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-center">
                <img 
                  src="/mllf-logo.svg" 
                  alt="MLLF Logo Symbol" 
                  className="h-24 w-24 object-contain filter drop-shadow-sm" 
                />
                <h4 className="font-display font-bold text-foreground">Maryann's Love & Light</h4>
                <p className="text-xs text-muted leading-relaxed max-w-xs">
                  "Life isn't changed in a day, but we can show them what unconditional love from a stranger looks like."
                </p>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-2xl bg-brand-green/20 -z-10 md:-left-6 md:h-24 md:w-24"></div>
          </div>
        </div>

        {/* Quote Block */}
        <blockquote className="mt-20 border-l-4 border-brand-yellow bg-secondary/40 py-8 pl-6 pr-4 sm:pl-10 rounded-r-2xl">
          <p className="font-display text-2xl font-bold leading-snug text-foreground sm:text-3xl">
            "Life isn't changed in a day, but we can show them what unconditional love from a stranger looks like."
          </p>
          <footer className="mt-4 text-xs font-extrabold uppercase tracking-wider text-primary">
            — Founder & CEO, Maryann's Love and Light Foundation
          </footer>
        </blockquote>
      </section>

      {/* Mission Declaration */}
      <section className="bg-brand-ink text-white py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/25 via-transparent to-transparent opacity-30"></div>
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
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
        <h2 className="text-center font-display text-3xl font-extrabold">Core Values</h2>
        
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl p-6 glass-card hover-glow transition-all-custom">
            <span className="text-3xl">💛</span>
            <h3 className="mt-4 font-display text-lg font-bold">Compassion</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">We lead with empathy and active listening in everything we do.</p>
          </div>

          <div className="rounded-2xl p-6 glass-card hover-glow transition-all-custom">
            <span className="text-3xl">🤝</span>
            <h3 className="mt-4 font-display text-lg font-bold">Community</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">We believe sustainable change happens together, not in isolation.</p>
          </div>

          <div className="rounded-2xl p-6 glass-card hover-glow transition-all-custom">
            <span className="text-3xl">✊</span>
            <h3 className="mt-4 font-display text-lg font-bold">Action</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">We do not just analyze the problem — we actively show up to help.</p>
          </div>

          <div className="rounded-2xl p-6 glass-card hover-glow transition-all-custom">
            <span className="text-3xl">🌟</span>
            <h3 className="mt-4 font-display text-lg font-bold">Dignity</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">Every human being we support deserves respect, integrity, and honor.</p>
          </div>
        </div>
      </section>

      {/* Why We Exist */}
      <section className="bg-secondary/20 py-20 border-y border-border/20 grid-mesh">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-extrabold text-center">Why We Exist</h2>
          <p className="mt-6 text-base leading-relaxed text-center text-foreground/80 sm:text-lg">
            Millions of Nigerians live without access to basic support, care, or community. Children go hungry. Families struggle in silence. Communities are left behind. We exist because we believe that is not acceptable — and that ordinary people, working together with extraordinary commitment, can change it.
          </p>
        </div>
      </section>

      {/* Team Profiles Directory */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-extrabold">Meet the Team</h2>
            <p className="mt-2 text-sm text-muted">The dedicated hearts driving MLLF's mission.</p>
          </div>
        </div>
        
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM_MEMBERS.map((member, index) => (
            <div key={index} className="rounded-[2rem] p-6 glass-card hover-glow transition-all-custom flex flex-col justify-between">
              <div>
                {/* Profile Photo Area */}
                <div className="relative aspect-square w-full rounded-2xl bg-secondary overflow-hidden flex items-center justify-center border border-border/40 mb-4 shadow-inner">
                  {member.avatarUrl ? (
                    <img 
                      src={member.avatarUrl} 
                      alt={member.name} 
                      className="h-full w-full object-contain p-2 hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <FiUser className="h-12 w-12 text-primary/40" />
                  )}
                </div>
                
                <h3 className="font-display text-lg font-bold text-foreground">{member.name}</h3>
                <p className="text-xs font-bold uppercase tracking-wider text-primary mt-0.5">{member.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
