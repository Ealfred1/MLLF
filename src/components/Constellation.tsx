"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Constellation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const constellationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const constellation = constellationRef.current;
    if (!constellation) return;

    // Generate 130 sparkles
    const N = 130;
    const sparks: HTMLSpanElement[] = [];
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < N; i++) {
      const s = document.createElement("span");
      s.className = "spark";
      s.style.left = Math.random() * 100 + "%";
      s.style.top = Math.random() * 100 + "%";
      const sz = 3 + Math.random() * 5;
      s.style.width = sz + "px";
      s.style.height = sz + "px";
      fragment.appendChild(s);
      sparks.push(s);
    }
    constellation.appendChild(fragment);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      sparks.forEach((s) => {
        s.style.opacity = "1";
        s.style.transform = "scale(1)";
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
      // Spark animation
      gsap.set(sparks, { opacity: 0, scale: 0 });
      gsap.to(sparks, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(2)",
        stagger: { each: 0.012, from: "random" },
        scrollTrigger: {
          trigger: constellation,
          start: "top 82%",
          once: true,
        },
        onComplete: () => {
          sparks.forEach((s) => {
            gsap.to(s, {
              opacity: "random(.45,1)",
              duration: "random(1.4,3.2)",
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: Math.random() * 2,
            });
          });
        },
      });

      // Stats counters animation
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

    return () => {
      ctx.revert();
      constellation.innerHTML = "";
    };
  }, []);

  return (
    <section className="light-field" ref={containerRef}>
      <div className="lf-head">
        <span className="label">The impact, so far</span>
        <h2>
          Every point of light here is <em>a person we reached.</em>
        </h2>
      </div>
      <div className="constellation" id="constellation" ref={constellationRef} />
      <div className="lf-note">each spark · one life touched · documented</div>
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
  );
}
