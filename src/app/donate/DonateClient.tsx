"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import TrustLedger from "@/components/TrustLedger";

export default function DonateClient() {
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

  const handleOnlinePayment = () => {
    // Read credentials from env
    const paystackKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
    const flutterwaveKey = process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY;
    console.log("Online payment checkouts ready with environment keys:", {
      paystackKey,
      flutterwaveKey,
    });
    alert(
      "Digital checkout initialized!\n(Integration scaffold is ready; keys will be read from environment variables)"
    );
  };

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
              Every naira, every dollar, every supply we receive directly fuels
              our next community outreach. <b>Choose how you want to support.</b>
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

      <section
        className="sec"
        style={{ background: "var(--paper-2)", borderTop: "1px solid var(--line)" }}
      >
        <div className="wrap">
          <span className="label reveal">Bank Transfer</span>
          <h2 className="big reveal" style={{ marginTop: "14px" }}>
            Direct <em>Transfer Accounts</em>
          </h2>
          <p className="sub reveal">
            You can make a direct deposit or wire transfer to our registered accounts:
          </p>

          <div className="duo" style={{ marginTop: "36px" }}>
            <div
              className="panel reveal"
              style={{
                background: "var(--paper-3)",
                border: "1px solid var(--line)",
                borderRadius: "18px",
                padding: "30px",
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
            </div>

            <div
              className="panel reveal"
              style={{
                background: "var(--paper-3)",
                border: "1px solid var(--line)",
                borderRadius: "18px",
                padding: "30px",
              }}
            >
              <h3 style={{ marginBottom: "16px", fontFamily: "var(--disp)", fontWeight: 700 }}>
                Domiciliary Account (USD)
              </h3>
              {/* TODO: Update with actual foreign/usd bank account details when provided */}
              <p style={{ margin: "8px 0", color: "var(--ink-soft)" }}>
                <strong>Bank Name:</strong> [Bank Name Placeholder]
              </p>
              <p style={{ margin: "8px 0", color: "var(--ink-soft)" }}>
                <strong>Account Name:</strong> Maryann's Love & Light Foundation
              </p>
              <p style={{ margin: "8px 0", color: "var(--ink-soft)" }}>
                <strong>Account Number:</strong> [USD Account Number Placeholder]
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="formwrap" style={{ gridTemplateColumns: "1fr 1fr", alignItems: "center" }}>
            <div className="intro reveal">
              <span className="label">Donate online</span>
              <h2 style={{ marginTop: "14px" }}>
                Secure card <em>payments</em>
              </h2>
              <p>
                Support our outreach using card, bank app, USSD, or transfer via our
                secure gateway scaffold.
              </p>
            </div>

            <div
              className="reveal"
              style={{
                background: "var(--paper-2)",
                border: "1px solid var(--line)",
                borderRadius: "22px",
                padding: "38px",
                textAlign: "center",
              }}
            >
              <h3 style={{ marginBottom: "16px", fontFamily: "var(--disp)", fontWeight: 700 }}>
                Card Donation
              </h3>
              <p style={{ color: "var(--ink-soft)", fontSize: "14.5px", marginBottom: "26px" }}>
                Ready for Paystack / Flutterwave integration. Click below to pay online.
              </p>
              <button
                onClick={handleOnlinePayment}
                className="btn btn-solid"
                data-magnet
                style={{ width: "100%", justifyContent: "center" }}
              >
                Pay securely online <span className="arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <TrustLedger />
    </main>
  );
}
