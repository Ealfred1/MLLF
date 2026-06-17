"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import TransitionLink from "@/components/TransitionLink";
import RippleImage from "@/components/RippleImage";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const reveals = containerRef.current?.querySelectorAll(".reveal");
      reveals?.forEach((el) => {
        (el as HTMLElement).style.opacity = "1";
        (el as HTMLElement).style.transform = "none";
      });
      const heroes = containerRef.current?.querySelectorAll("[data-hero]");
      heroes?.forEach((el) => {
        (el as HTMLElement).style.opacity = "1";
        (el as HTMLElement).style.transform = "none";
      });
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Play Hero Intro Anim
      const lines = containerRef.current?.querySelectorAll(".phero h1 .ln > span");
      const heroes = containerRef.current?.querySelectorAll("[data-hero]");
      const glows = containerRef.current?.querySelectorAll(".phero .glow");

      if (lines && heroes) {
        gsap.set(lines, { yPercent: 115 });
        gsap.set(heroes, { opacity: 0, y: 16 });

        gsap
          .timeline()
          .to(lines, { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.1 })
          .to(heroes, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.08 }, "-=0.7");
      }

      if (glows && glows.length > 0) {
        gsap.from(glows, { opacity: 0, scale: 0.6, duration: 1.6, ease: "power2.out" });
      }

      // 2. Play Scroll Reveals
      const reveals = containerRef.current?.querySelectorAll(".reveal");
      reveals?.forEach((el) => {
        gsap.set(el, { opacity: 0, y: 26 });
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
          },
        });
      });

      // 3. Play Parallax Glows
      const parallaxGlows = containerRef.current?.querySelectorAll("[data-par]");
      parallaxGlows?.forEach((el) => {
        const phero = el.closest(".phero");
        if (!phero) return;
        const speed = parseFloat((el as HTMLElement).dataset.par || "0");
        gsap.to(el, {
          yPercent: speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: phero,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="page active" id="about" ref={containerRef}>
      <header className="phero">
        <div className="glow g1" data-par="0.16"></div>
        <div className="inner">
          <span className="eyebrow" data-hero>
            About the foundation
          </span>
          <h1>
            <span className="ln">
              <span>More than charity.</span>
            </span>
            <span className="ln">
              <span>
                It's a <em>promise.</em>
              </span>
            </span>
          </h1>
          <div className="phero-bottom">
            <p className="lead" data-hero>
              Maryann's Love and Light Foundation was born from a single act of
              kindness — and a decision to do more. Today we show up for the less
              privileged across Nigeria, <b>one community at a time.</b>
            </p>
          </div>
        </div>
        <div className="scroll-hint">
          <span>scroll</span>
          <span className="l"></span>
        </div>
      </header>

      <section className="sec">
        <div className="wrap">
          <span className="label reveal">Our story</span>
          <h2 className="big reveal" style={{ marginTop: "14px" }}>
            It started with <em>one little girl,</em> and a decision to do more.
          </h2>
          <div className="story-grid">
            <div>
              <p className="reveal">
                During her industrial training in Lagos, our founder watched a
                little girl beg for food on the streets every single day. She
                gave what she could — food, money, whatever was on her.{" "}
                <strong>But one day, something shifted.</strong>
              </p>
              <p className="reveal">
                She realised she could do more — not for one child, but for the
                many children, families and individuals across Nigeria who fall
                through the cracks every day. She called her friends together.
                They talked, they planned, they committed. From that circle of
                willing hearts, the foundation was born.
              </p>
              <p className="reveal">
                It is named for <strong>Maryann — the CEO's mother</strong> — a
                woman whose strength, reliability and unconditional love became
                the living definition of everything this foundation stands for.
                Her name isn't a title. It's a standard we hold ourselves to every
                day.
              </p>
            </div>
            <div className="quote-card reveal">
              <RippleImage
                src="/images/founder.jpg"
                alt="Founder portrait"
                className="ph"
              />
              <div className="body">
                <blockquote>
                  "Life isn't changed in a day — but we can show them what
                  unconditional love from a stranger looks like."
                </blockquote>
                <cite>— Founder &amp; CEO, Maryann's Love and Light Foundation</cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="light-field">
        <div className="lf-head">
          <span className="label">Our mission</span>
          <h2>
            To show up — and to remind people they are <em>not forgotten.</em>
          </h2>
        </div>
        <p
          className="lf-note"
          style={{
            maxWidth: "60ch",
            margin: "26px auto 0",
            textTransform: "none",
            letterSpacing: ".02em",
            fontSize: "15px",
            lineHeight: 1.6,
            color: "rgba(234,241,255,.7)",
          }}
        >
          Consistently, compassionately, practically — we give people not just
          what they need today, but the dignity, support and care that says they
          matter.
        </p>
      </section>

      <section className="sec">
        <div className="wrap">
          <span className="label reveal">Core values</span>
          <h2 className="big reveal" style={{ marginTop: "14px" }}>
            Four things we <em>never</em> compromise on.
          </h2>
          <div className="values">
            <div className="vcard reveal">
              <div className="emo">💚</div>
              <h3>Compassion</h3>
              <p>We lead with empathy in everything we do.</p>
            </div>
            <div className="vcard reveal">
              <div className="emo">🤝</div>
              <h3>Community</h3>
              <p>Change happens together, not alone.</p>
            </div>
            <div className="vcard reveal">
              <div className="emo">✊</div>
              <h3>Action</h3>
              <p>We don't just talk about the problem — we show up.</p>
            </div>
            <div className="vcard reveal">
              <div className="emo">🌟</div>
              <h3>Dignity</h3>
              <p>Every person we serve deserves respect and care.</p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="sec"
        style={{ background: "var(--paper-2)", borderTop: "1px solid var(--line)" }}
      >
        <div className="wrap">
          <div className="trust-grid">
            <div>
              <span className="label reveal">Why we exist</span>
              <h2 className="big reveal" style={{ marginTop: "14px" }}>
                Too many people are left behind. <em>We refuse to accept it.</em>
              </h2>
            </div>
            <p className="reveal" style={{ color: "var(--ink-soft)", fontSize: "16.5px" }}>
              Millions of Nigerians live without access to basic support, care
              or community. Children go hungry. Families struggle in silence. We
              exist because we believe ordinary people, working together with
              extraordinary commitment, can change that.
            </p>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <span className="label reveal">Meet the team</span>
          <h2 className="big reveal" style={{ marginTop: "14px" }}>
            The hands behind <em>the work.</em>
          </h2>
          <p className="sub reveal">
            Profiles coming soon — full bios appear here once we receive team details.
          </p>
          <div className="team">
            <div className="tcard reveal">
              <RippleImage
                src="/images/team-01.jpg"
                alt="Team member 01"
                className="ph"
              />
              <div className="meta">
                <h3>Name pending</h3>
                <div className="role">Role pending</div>
                <p>
                  A short biography will appear here once we receive team details.
                </p>
              </div>
            </div>
            <div className="tcard reveal">
              <RippleImage
                src="/images/team-02.jpg"
                alt="Team member 02"
                className="ph"
              />
              <div className="meta">
                <h3>Name pending</h3>
                <div className="role">Role pending</div>
                <p>
                  A short biography will appear here once we receive team details.
                </p>
              </div>
            </div>
            <div className="tcard reveal">
              <RippleImage
                src="/images/team-03.jpg"
                alt="Team member 03"
                className="ph"
              />
              <div className="meta">
                <h3>Name pending</h3>
                <div className="role">Role pending</div>
                <p>
                  A short biography will appear here once we receive team details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="final">
        <div className="final-glow"></div>
        <h2 data-hero>
          Be part of <em>the promise.</em>
        </h2>
        <p data-hero>Give your time, or fund the next outreach.</p>
        <div className="actions" data-hero>
          <TransitionLink
            className="btn btn-solid"
            data-magnet
            href="/volunteer"
          >
            Volunteer <span className="arrow">→</span>
          </TransitionLink>
          <TransitionLink className="btn btn-ghost" data-magnet href="/donate">
            Donate
          </TransitionLink>
        </div>
      </section>
    </main>
  );
}
