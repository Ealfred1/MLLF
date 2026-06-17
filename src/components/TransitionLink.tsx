"use client";

import { useRouter } from "next/navigation";
import gsap from "gsap";
import React from "react";

interface TransitionLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function TransitionLink({
  href,
  children,
  className,
  ...rest
}: TransitionLinkProps) {
  const router = useRouter();

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      router.push(href);
      return;
    }

    const ap = document.getElementById("aperture");
    if (!ap) {
      router.push(href);
      return;
    }

    const cover = (Math.hypot(window.innerWidth, window.innerHeight) / 120) * 2.4;
    gsap.set(ap, { scale: 0, opacity: 1 });
    gsap.to(ap, {
      scale: cover,
      duration: 0.55,
      ease: "power3.in",
      onComplete: () => {
        router.push(href);
      },
    });
  };

  return (
    <a href={href} onClick={onClick} className={className} {...rest}>
      {children}
    </a>
  );
}
