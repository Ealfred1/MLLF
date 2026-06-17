"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function PageTransition() {
  const pathname = usePathname();

  useEffect(() => {
    const ap = document.getElementById("aperture");
    if (!ap) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(ap, { scale: 0, opacity: 0 });
      window.scrollTo(0, 0);
      return;
    }

    const cover = (Math.hypot(window.innerWidth, window.innerHeight) / 120) * 2.4;
    
    // Play the open transition: starting covered, ending open
    gsap.fromTo(
      ap,
      { scale: cover, opacity: 1 },
      {
        scale: 0,
        duration: 0.6,
        ease: "power3.out",
        onComplete: () => gsap.set(ap, { opacity: 0 }),
      }
    );

    // Scroll to top instantly on route change
    window.scrollTo(0, 0);
  }, [pathname]);

  return <div className="aperture" id="aperture" />;
}
