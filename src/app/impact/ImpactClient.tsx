"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import TransitionLink from "@/components/TransitionLink";
import RippleImage from "@/components/RippleImage";

export default function ImpactClient() {
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
      const figures = containerRef.current?.querySelectorAll(".fig");
      figures?.forEach((el) => {
        const figureEl = el as HTMLElement;
        const target = figureEl.dataset.count || "0";
        const plus = figureEl.dataset.plus ? "+" : "";
        figureEl.innerHTML = target + "<em>" + plus + "</em>";
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

      // 4. Stats counters animation
      const figures = containerRef.current?.querySelectorAll(".fig");
      figures?.forEach((el) => {
        const figureEl = el as HTMLElement;
        const target = +(figureEl.dataset.count || 0);
        const plus = figureEl.dataset.plus ? "+" : "";

        gsap.to(
          { v: 0 },
          {
            v: target,
            duration: 1.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: figureEl,
              start: "top 90%",
              once: true,
            },
            onUpdate: function () {
              figureEl.textContent = Math.round(this.targets()[0].v).toString();
            },
            onComplete: () => {
              figureEl.innerHTML = target + "<em>" + plus + "</em>";
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="page active" id="impact" ref={containerRef}>
      <header className="phero">
        <div className="glow g1" data-par="0.16"></div>
        <div className="glow g2" data-par="-0.1"></div>
        <div className="inner">
          <span className="eyebrow" data-hero>
            Stories of change
          </span>
          <h1>
            <span className="ln">
              <span>Behind every face</span>
            </span>
            <span className="ln">
              <span>
                is a story <em>worth telling.</em>
              </span>
            </span>
          </h1>
          <div className="phero-bottom">
            <p className="lead" data-hero>
              We show up for the forgotten — with food, school fees, books and care.
              These are real people whose lives were touched by a moment of
              kindness. <b>This is why we show up.</b>
            </p>
          </div>
        </div>
        <div className="scroll-hint">
          <span>scroll</span>
          <span className="l"></span>
        </div>
      </header>

      <section className="light-field">
        <div className="lf-head">
          <span className="label">By the numbers</span>
          <h2>
            Small team. <em>Real reach.</em>
          </h2>
        </div>
        <div className="stats">
          <div className="stat">
            <div className="fig" data-count="6">
              0
            </div>
            <div className="cap">Communities reached</div>
          </div>
          <div className="stat">
            <div className="fig" data-count="300" data-plus="1">
              0
            </div>
            <div className="cap">People supported</div>
          </div>
          <div className="stat">
            <div className="fig" data-count="30" data-plus="1">
              0
            </div>
            <div className="cap">Volunteers mobilized</div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <span className="label reveal">Stories from the field</span>

          <div className="story reveal">
            <RippleImage
              src="/kidssss.svg"
              alt="Story 01 Outreach"
              className="story-media"
            >
              <span className="tag">Story 01 · Anambra State</span>
            </RippleImage>
            <div className="story-body">
              <div className="st-label">Buying a day of rest</div>
              <h3>More than the struggle: Mrs. Okafor</h3>
              <p>
                Mrs Okafor wakes before dawn every day to hawk on the streets of
                Akwa LGA, feeding her children on whatever she can sell. When
                our team met her mid-morning — already on her feet — a simple
                conversation became something deeper.
              </p>
              <p>
                That day we provided food and essentials for her, her children,
                and other families nearby. For the first time in a long while
                she didn't have to wonder about the next meal.{" "}
                <strong>She told us she felt seen.</strong>
              </p>
            </div>
          </div>

          <div className="story reveal">
            <RippleImage
              src="/outreach-1.svg"
              alt="Story 02 Outreach"
              className="story-media"
            >
              <span className="tag">Story 02 · Dec 2, 2023</span>
            </RippleImage>
            <div className="story-body">
              <div className="st-label">The Give Back Project</div>
              <h3>Feeding 100 souls</h3>
              <p>
                Our first major project set out with a simple goal: nourishment
                for those facing the hardest times. By the end of the day we'd
                fed nearly 100 people — children with eyes full of hope, adults
                carrying on with remarkable strength.
              </p>
              <p>
                We met people living with disabilities who continue with
                extraordinary resilience. We don't just bring food — we bring
                the message that no one is left behind.
              </p>
            </div>
          </div>

          <div className="story reveal">
            <RippleImage
              src="/kids.svg"
              alt="Story 03 Outreach"
              className="story-media"
            >
              <span className="tag">Story 03 · Lagos State</span>
            </RippleImage>
            <div className="story-body">
              <div className="st-label">The beginning of a dream</div>
              <h3>Our first charity event</h3>
              <p>
                Every great mission starts with a single step. Ours took us from
                busy streets to the quiet halls of an orphanage in Lagos —
                sharing food with people on the street, providing for children
                who needed to know they weren't forgotten.
              </p>
              <p>
                None of it would have been possible without our volunteers,
                whose kindness lit up every smile. This was just the beginning.
              </p>
            </div>
          </div>

          <div className="story reveal">
            <RippleImage
              src="/kidssss.svg"
              alt="Story 04 Outreach"
              className="story-media"
            >
              <span className="tag">Story 04 · Orphanage Outreach</span>
            </RippleImage>
            <div className="story-body">
              <div className="st-label">Books, bowls and belonging</div>
              <h3>A day at the orphanage</h3>
              <p>
                We arrived with cartons of foodstuffs, textbooks, notebooks and
                a team ready to stay. What began as a supply drop became
                something more — children reading with volunteers, sharing
                stories, laughing.
              </p>
              <p>
                Beyond provisions, they received time, attention, and the
                reminder that they're not invisible.{" "}
                <strong>
                  We came to give supplies. We left having given belonging.
                </strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="final">
        <div className="final-glow"></div>
        <h2 data-hero>
          See it all in <em>the gallery.</em>
        </h2>
        <p data-hero>
          We document every outreach. Browse the photo wall — or help us write
          the next story.
        </p>
        <div className="actions" data-hero>
          <TransitionLink
            className="btn btn-solid"
            data-magnet
            href="/gallery"
          >
            Open gallery <span className="arrow">→</span>
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
