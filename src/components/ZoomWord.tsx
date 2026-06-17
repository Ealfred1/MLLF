"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ZoomWord() {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        innerRef.current,
        { scale: 0.62, opacity: 0.25 },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="zoom" ref={containerRef}>
      <div className="zoom-sticky">
        <div className="zoom-inner" ref={innerRef}>
          <div className="zoom-kicker">Our one commitment</div>
          <div className="zoom-line">
            We go where the need is —<br />
            and we <em>stay until it's met.</em>
          </div>
        </div>
      </div>
    </section>
  );
}
