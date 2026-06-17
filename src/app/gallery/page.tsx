"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import TransitionLink from "@/components/TransitionLink";
import GalleryGrid from "@/components/GalleryGrid";

export default function Gallery() {
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
    <main className="page active" id="gallery" ref={containerRef}>
      <header className="phero" style={{ minHeight: "78svh" }}>
        <div className="glow g1" data-par="0.16"></div>
        <div className="glow g2" data-par="-0.1"></div>
        <div className="inner">
          <span className="eyebrow" data-hero>
            The gallery
          </span>
          <h1>
            <span className="ln">
              <span>The work,</span>
            </span>
            <span className="ln">
              <span>
                in <em>pictures.</em>
              </span>
            </span>
          </h1>
          <div className="phero-bottom">
            <p className="lead" data-hero>
              Every meal, every book, every smile — captured. Tap any photo to
              open it. <b>One act of love. A lifetime of light.</b>
            </p>
          </div>
        </div>
        <div className="scroll-hint">
          <span>scroll</span>
          <span className="l"></span>
        </div>
      </header>

      <section className="sec" style={{ paddingTop: "clamp(50px,7vh,80px)" }}>
        <div className="wrap">
          <span className="label reveal">A wall of kindness</span>
          <h2 className="big reveal" style={{ marginTop: "14px" }}>
            Hundreds of moments. <em>One mission.</em>
          </h2>

          <GalleryGrid />
        </div>
      </section>

      <section className="final">
        <div className="final-glow"></div>
        <h2 data-hero>
          Want to be in <em>the next one?</em>
        </h2>
        <p data-hero>
          Follow @maryanns_llf to see each event as it happens — or come stand
          with us.
        </p>
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
