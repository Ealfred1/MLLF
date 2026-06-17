"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CursorLight() {
  const cLightRef = useRef<HTMLDivElement>(null);
  const cDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cl = cLightRef.current;
    const cd = cDotRef.current;
    if (!cl || !cd) return;

    const xl = gsap.quickTo(cl, "x", { duration: 0.6, ease: "power3" });
    const yl = gsap.quickTo(cl, "y", { duration: 0.6, ease: "power3" });
    const xd = gsap.quickTo(cd, "x", { duration: 0.12, ease: "power2" });
    const yd = gsap.quickTo(cd, "y", { duration: 0.12, ease: "power2" });

    const onMouseMove = (e: MouseEvent) => {
      xl(e.clientX);
      yl(e.clientY);
      xd(e.clientX);
      yd(e.clientY);
      cl.style.opacity = "1";
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (
        target.closest("a, button, input, select, [data-magnet], .mtile, .gtile")
      ) {
        gsap.to(cd, { scale: 2.6, duration: 0.3 });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (
        target.closest("a, button, input, select, [data-magnet], .mtile, .gtile")
      ) {
        gsap.to(cd, { scale: 1, duration: 0.3 });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    // Magnetic effect
    let onMagneticMove: ((e: MouseEvent) => void) | undefined;
    let onMagneticOut: ((e: MouseEvent) => void) | undefined;

    if (!reduce) {
      onMagneticMove = (e: MouseEvent) => {
        const target = e.target as HTMLElement | null;
        if (!target) return;
        const el = target.closest("[data-magnet]") as HTMLElement | null;
        if (!el) return;
        const r = el.getBoundingClientRect();
        gsap.to(el, {
          x: ((e.clientX - (r.left + r.width / 2)) / r.width) * 20,
          y: ((e.clientY - (r.top + r.height / 2)) / r.height) * 20,
          duration: 0.4,
          ease: "power3",
        });
      };

      onMagneticOut = (e: MouseEvent) => {
        const target = e.target as HTMLElement | null;
        if (!target) return;
        const el = target.closest("[data-magnet]") as HTMLElement | null;
        if (el) {
          gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.4)",
          });
        }
      };

      document.addEventListener("mousemove", onMagneticMove);
      document.addEventListener("mouseout", onMagneticOut);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      if (onMagneticMove) {
        document.removeEventListener("mousemove", onMagneticMove);
      }
      if (onMagneticOut) {
        document.removeEventListener("mouseout", onMagneticOut);
      }
    };
  }, []);

  return (
    <>
      <div className="grain" />
      <div className="cursor-light" id="cLight" ref={cLightRef} />
      <div className="cursor-dot" id="cDot" ref={cdRef => {
        // assign ref to both ref variable and window for the original code's compatibility
        (cDotRef as any).current = cdRef;
      }} />
    </>
  );
}
