"use client";

import { usePathname } from "next/navigation";
import TransitionLink from "./TransitionLink";

export default function Header() {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Volunteer", href: "/volunteer" },
    { name: "Impact", href: "/impact" },
    { name: "Gallery", href: "/gallery" },
  ];

  return (
    <nav>
      <TransitionLink className="brand" href="/">
        <img
          src="/logo.svg"
          alt="Maryann's Love & Light Foundation Logo"
          className="mark"
          style={{ objectFit: "contain", width: "30px", height: "30px" }}
        />
        <span>
          <b>Maryann's Love &amp; Light</b>
          <small>Foundation · Nigeria</small>
        </span>
      </TransitionLink>
      <div className="nav-links">
        {links.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);

          return (
            <TransitionLink
              key={link.href}
              href={link.href}
              className={isActive ? "active" : ""}
            >
              {link.name}
            </TransitionLink>
          );
        })}
        <TransitionLink
          className="nav-cta"
          data-magnet
          href="/donate"
        >
          Donate
        </TransitionLink>
      </div>
    </nav>
  );
}
