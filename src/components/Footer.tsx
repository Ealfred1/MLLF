"use client";

import TransitionLink from "./TransitionLink";

export default function Footer() {
  return (
    <footer>
      <div className="foot-top">
        <div className="foot-brand">
          <img
            src="/logo.svg"
            alt="Maryann's Love & Light Foundation Logo"
            className="mark"
            style={{ objectFit: "contain", width: "30px", height: "30px" }}
          />
          <b>Maryann's Love &amp; Light Foundation</b>
          <p>
            Showing up — consistently, compassionately, practically — for the
            less-privileged communities of Nigeria.
          </p>
        </div>
        <div className="foot-col">
          <h4>Explore</h4>
          <TransitionLink href="/">Home</TransitionLink>
          <TransitionLink href="/about">About</TransitionLink>
          <TransitionLink href="/volunteer">Volunteer</TransitionLink>
          <TransitionLink href="/impact">Impact</TransitionLink>
          <TransitionLink href="/gallery">Gallery</TransitionLink>
          <TransitionLink href="/donate">Donate</TransitionLink>
        </div>
        <div className="foot-col">
          <h4>Reach us</h4>
          <a
            href="https://www.instagram.com/maryanns_llf"
            target="_blank"
            rel="noopener noreferrer"
          >
            @maryanns_llf
          </a>
          <a href="mailto:Maryannsloveandlight@gmail.com">Email us</a>
          <a
            href="https://wa.me/2347063472279"
            target="_blank"
            rel="noopener noreferrer"
          >
            +234 706 347 2279
          </a>
        </div>
      </div>
      <div className="foot-bottom">
        <span>© 2026 Maryann's Love &amp; Light Foundation · Made with love.</span>
        <span>Driven by kindness, not contracts. · CAC No. 7663513</span>
      </div>
    </footer>
  );
}
