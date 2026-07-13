"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import TransitionLink from "@/components/TransitionLink";
import Marquee from "@/components/Marquee";
import ZoomWord from "@/components/ZoomWord";
import CommitmentSplit from "@/components/CommitmentSplit";
import Constellation from "@/components/Constellation";
import TrustLedger from "@/components/TrustLedger";
import RippleImage from "@/components/RippleImage";

export default function Home() {
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
    <main className="page active" id="home" ref={containerRef}>
      <header className="phero">
        <div className="glow g1" data-par="0.18"></div>
        <div className="glow g2" data-par="-0.1"></div>
        <div className="inner">
          <span className="eyebrow" data-hero>
            Love in action — across Nigeria
          </span>
          <h1>
            <span className="ln">
              <span>One act of love.</span>
            </span>
            <span className="ln">
              <span>
                A lifetime of <em>light.</em>
              </span>
            </span>
          </h1>
          <div className="phero-bottom">
            <p className="lead" data-hero>
              We show up for the forgotten — with food, school fees, books and
              care. <b>No agenda. No middlemen.</b> Just kindness that reaches the
              people who need it most.
            </p>
            <div className="actions" data-hero>
              <TransitionLink
                className="btn btn-solid"
                data-magnet
                href="/donate"
              >
                Support our work <span className="arrow">→</span>
              </TransitionLink>
              <TransitionLink
                className="btn btn-ghost"
                data-magnet
                href="/impact"
              >
                See what we've done
              </TransitionLink>
            </div>
          </div>
        </div>
      </header>

      <Marquee />
      <ZoomWord />
      <CommitmentSplit />
      <Constellation />

      {/* Home gallery teaser strip */}
      <section className="strip">
        <div className="wrap">
          <div className="strip-head">
            <div>
              <span className="label reveal">From the field</span>
              <h2 className="reveal" style={{ marginTop: "12px" }}>
                Every visit, <em>documented.</em>
              </h2>
            </div>
            <TransitionLink
              className="btn btn-ghost reveal"
              data-magnet
              href="/gallery"
            >
              Open the gallery <span className="arrow">→</span>
            </TransitionLink>
          </div>
          <div className="strip-row reveal">
            <div
              className="gtile"
              data-img="/footbridge-giving.jpg"
              data-cap="Street outreach"
              data-sub="Lagos overpass"
            >
              <RippleImage
                src="/footbridge-giving.jpg"
                alt="Street outreach"
                className="img"
              />
              <div className="cap">
                Street outreach<small>Lagos overpass</small>
              </div>
            </div>
            <div
              className="gtile"
              data-img="/mother-child.jpg"
              data-cap="A caring hand"
              data-sub="Street outreach"
            >
              <RippleImage
                src="/mother-child.jpg"
                alt="A caring hand"
                className="img"
              />
              <div className="cap">
                A caring hand<small>Street outreach</small>
              </div>
            </div>
            <div
              className="gtile"
              data-img="/supplies-flatlay.jpg"
              data-cap="Packing the provisions"
              data-sub="Before every outreach"
            >
              <RippleImage
                src="/supplies-flatlay.jpg"
                alt="Packing the provisions"
                className="img"
              />
              <div className="cap">
                Packing the provisions<small>Before every outreach</small>
              </div>
            </div>
            <div
              className="gtile"
              data-img="/indoor-handoff.jpg"
              data-cap="Books &amp; belonging"
              data-sub="Distribution day"
            >
              <RippleImage
                src="/indoor-handoff.jpg"
                alt="Books &amp; belonging"
                className="img"
              />
              <div className="cap">
                Books &amp; belonging<small>Distribution day</small>
              </div>
            </div>
            <div
              className="gtile"
              data-img="/courtyard-kids.jpg"
              data-cap="A day to celebrate"
              data-sub="Community visit"
            >
              <RippleImage
                src="/courtyard-kids.jpg"
                alt="A day to celebrate"
                className="img"
              />
              <div className="cap">
                A day to celebrate<small>Community visit</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustLedger />

      <section className="final">
        <div className="final-glow"></div>
        <h2 data-hero>
          Ready to <em>show up</em> with us?
        </h2>
        <p data-hero>
          Volunteer your time, or fund the next outreach. Either way, someone
          feels it.
        </p>
        <div className="actions" data-hero>
          <TransitionLink
            className="btn btn-solid"
            data-magnet
            href="/donate"
          >
            Donate now <span className="arrow">→</span>
          </TransitionLink>
          <TransitionLink
            className="btn btn-ghost"
            data-magnet
            href="/volunteer"
          >
            Volunteer
          </TransitionLink>
        </div>
      </section>
    </main>
  );
}
