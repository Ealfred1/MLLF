"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import VolunteerForm from "@/components/VolunteerForm";

export default function VolunteerClient() {
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
    <main className="page active" id="volunteer" ref={containerRef}>
      <header className="phero">
        <div className="glow g1" data-par="0.16"></div>
        <div className="glow g2" data-par="-0.1"></div>
        <div className="inner">
          <span className="eyebrow" data-hero>
            Volunteer with us
          </span>
          <h1>
            <span className="ln">
              <span>Just show up.</span>
            </span>
            <span className="ln">
              <span>
                That's <em>all it takes.</em>
              </span>
            </span>
          </h1>
          <div className="phero-bottom">
            <p className="lead" data-hero>
              If you live in a state we're visiting and you care about your
              community — <b>you already qualify.</b>
            </p>
            <div className="actions" data-hero>
              <a
                className="btn btn-solid"
                data-magnet
                href="#apply"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Apply now <span className="arrow">→</span>
              </a>
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
          <div className="duo">
            <div className="panel reveal">
              <h3>Who can volunteer?</h3>
              <ul className="ticks">
                <li>You live in or around the state we're visiting</li>
                <li>You have a genuine desire to help your community</li>
                <li>You're willing to give your time with a good heart</li>
                <li>You're respectful, reliable and ready to show up</li>
              </ul>
            </div>
            <div className="panel reveal">
              <h3>What you'll be doing</h3>
              <ul className="ticks">
                <li>Distributing food, clothing and essential supplies</li>
                <li>Spending time with children who need attention and care</li>
                <li>Supporting outreach events and foundation programmes</li>
                <li>Helping with logistics, setup and coordination</li>
                <li>Simply being present — your humanity matters most</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        className="sec"
        style={{ background: "var(--paper-2)", borderTop: "1px solid var(--line)" }}
      >
        <div className="wrap">
          <span className="label reveal">The volunteer journey</span>
          <h2 className="big reveal" style={{ marginTop: "14px" }}>
            Six steps from <em>"I'm in"</em> to standing in the community.
          </h2>
          <div className="journey">
            <div className="jstep reveal">
              <div className="n">01</div>
              <h3>Apply</h3>
              <p>Fill our short form. Less than 3 minutes.</p>
            </div>
            <div className="jstep reveal">
              <div className="n">02</div>
              <h3>Get confirmed</h3>
              <p>We reach out within 24–48 hours to confirm your spot.</p>
            </div>
            <div className="jstep reveal">
              <div className="n">03</div>
              <h3>Attend briefings</h3>
              <p>Join pre-visit meetings so you know what to expect.</p>
            </div>
            <div className="jstep reveal">
              <div className="n">04</div>
              <h3>In-person practice</h3>
              <p>About a week before, we prepare together as a team.</p>
            </div>
            <div className="jstep reveal">
              <div className="n">05</div>
              <h3>Show up</h3>
              <p>Arrive, meet your team, give your time to a community.</p>
            </div>
            <div className="jstep reveal">
              <div className="n">06</div>
              <h3>Stay connected</h3>
              <p>After each visit, you join our growing volunteer family.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <span className="label reveal">Volunteer voices</span>
          <div className="voices">
            <div className="voice reveal">
              <p>
                One of the reasons I volunteered was to give back to the society
                where it all began for me — and it was one of the most
                meaningful things I've ever done.
              </p>
              <cite>— Volunteer, Lagos State</cite>
            </div>
            <div className="voice reveal">
              <p>
                What I loved most was how everybody was involved in everything,
                and how we worked through it together in such an orderly way.
              </p>
              <cite>— Volunteer, Lagos State</cite>
            </div>
          </div>
        </div>
      </section>

      <section
        className="sec"
        id="apply"
        style={{ background: "var(--paper-2)", borderTop: "1px solid var(--line)" }}
      >
        <div className="wrap">
          <div className="formwrap">
            <div className="intro reveal">
              <span className="label">Join the next visit</span>
              <h2 style={{ marginTop: "14px" }}>
                Fill the form. We'll be in touch within{" "}
                <em style={{ fontStyle: "normal", color: "var(--forest)" }}>
                  48 hours.
                </em>
              </h2>
              <p>
                One form. A few minutes. And a community that will be glad you
                showed up.
              </p>
            </div>
            <VolunteerForm />
          </div>
        </div>
      </section>
    </main>
  );
}
