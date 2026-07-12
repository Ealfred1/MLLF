"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import TrustLedger from "@/components/TrustLedger";
import DonationTracker from "@/components/DonationTracker";
import DonateModal from "@/components/DonateModal";

export default function DonateClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

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
        gsap.set(el, { opacity: 0, y: 16 });
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
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
    <main className="page active" id="donate" ref={containerRef}>
      <header className="phero">
        <div className="glow g1" data-par="0.16"></div>
        <div className="glow g2" data-par="-0.1"></div>
        <div className="inner">
          <span className="eyebrow" data-hero>
            Fuel the mission
          </span>
          <h1>
            <span className="ln">
              <span>More than money.</span>
            </span>
            <span className="ln">
              <span>
                It's <em>momentum.</em>
              </span>
            </span>
          </h1>
          <div className="phero-bottom">
            <p className="lead" data-hero>
              Every naira, every meal, every supply we receive directly fuels
              our next community outreach. <b>Choose how you want to support.</b>
            </p>
            <div className="actions" data-hero>
              <button
                type="button"
                className="btn btn-solid donate-cta"
                data-magnet
                onClick={() => setModalOpen(true)}
              >
                Donate now <span className="arrow">→</span>
              </button>
            </div>
          </div>
        </div>
        <div className="scroll-hint">
          <span>scroll</span>
          <span className="l"></span>
        </div>
      </header>

      <section className="sec">
        <div className="wrap">
          <span className="label reveal">Live campaign</span>
          <h2 className="big reveal" style={{ marginTop: "14px" }}>
            Watch every gift <em>move the goal.</em>
          </h2>
          <p className="sub reveal">
            The moment you report a transfer or cheque it appears on the bar in
            mint green. Once our finance team confirms the funds in our account,
            it turns solid — permanently.
          </p>
          <div className="reveal" style={{ marginTop: "36px" }}>
            <DonationTracker refreshKey={refreshKey} />
          </div>
          <div className="actions reveal" style={{ marginTop: "28px" }}>
            <button
              type="button"
              className="btn btn-solid donate-cta"
              data-magnet
              onClick={() => setModalOpen(true)}
            >
              Donate now <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </section>

      <section
        className="sec"
        style={{ background: "var(--paper-2)", borderTop: "1px solid var(--line)" }}
      >
        <div className="wrap">
          <span className="label reveal">Ways to give</span>
          <h2 className="big reveal" style={{ marginTop: "14px" }}>
            Choose how you wish to <em>partner with us.</em>
          </h2>
          <div className="values" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            <div className="vcard reveal">
              <div className="emo">💸</div>
              <h3>One-time gift</h3>
              <p>
                Send immediate support to fund our ongoing community food and
                educational supply outreaches.
              </p>
            </div>
            <div className="vcard reveal">
              <div className="emo">🔁</div>
              <h3>Monthly partner</h3>
              <p>
                Stand with us consistently. Set up a recurring pledge to ensure
                we can sustain our promises to communities.
              </p>
            </div>
            <div className="vcard reveal">
              <div className="emo">📦</div>
              <h3>In-kind donation</h3>
              <p>
                We accept educational books, writing notebooks, packed dry
                foods, clothes, and other vital relief materials.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <span className="label reveal">Bank Transfer</span>
          <h2 className="big reveal" style={{ marginTop: "14px" }}>
            Direct <em>Naira transfers.</em>
          </h2>
          <p className="sub reveal">
            We accept bank transfers and cheques into our Naira account only:
          </p>

          <div className="duo" style={{ marginTop: "36px", gridTemplateColumns: "1fr" }}>
            <div
              className="panel reveal"
              style={{
                background: "var(--paper-3)",
                border: "1px solid var(--line)",
                borderRadius: "18px",
                padding: "30px",
                maxWidth: "520px",
              }}
            >
              <h3 style={{ marginBottom: "16px", fontFamily: "var(--disp)", fontWeight: 700 }}>
                Naira Account (NGN)
              </h3>
              {/* TODO: Update with actual local bank account details when provided */}
              <p style={{ margin: "8px 0", color: "var(--ink-soft)" }}>
                <strong>Bank Name:</strong> [Bank Name Placeholder]
              </p>
              <p style={{ margin: "8px 0", color: "var(--ink-soft)" }}>
                <strong>Account Name:</strong> Maryann's Love & Light Foundation
              </p>
              <p style={{ margin: "8px 0", color: "var(--ink-soft)" }}>
                <strong>Account Number:</strong> [Account Number Placeholder]
              </p>
              <button
                type="button"
                className="btn btn-ghost"
                data-magnet
                style={{ marginTop: "14px" }}
                onClick={() => setModalOpen(true)}
              >
                Sent it already? Report your transfer <span className="arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <TrustLedger />

      <DonateModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onPledged={() => setRefreshKey((k) => k + 1)}
      />
    </main>
  );
}
