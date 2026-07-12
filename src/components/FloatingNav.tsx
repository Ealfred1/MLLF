"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import TransitionLink from "./TransitionLink";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Volunteer", href: "/volunteer" },
  { name: "Impact", href: "/impact" },
  { name: "Gallery", href: "/gallery" },
  { name: "Donate", href: "/donate" },
];

export default function FloatingNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="fnav">
      {open && (
        <div className="fnav-menu" role="menu">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <TransitionLink
                key={link.href}
                href={link.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className={`fnav-item${isActive ? " active" : ""}${
                  link.href === "/donate" ? " fnav-donate" : ""
                }`}
              >
                {link.name}
              </TransitionLink>
            );
          })}
        </div>
      )}
      <button
        type="button"
        className={`fnav-toggle${open ? " open" : ""}`}
        aria-label={open ? "Close page menu" : "Open page menu"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? "✕" : "⋮"}
      </button>
    </div>
  );
}
