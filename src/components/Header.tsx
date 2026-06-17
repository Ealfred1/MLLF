"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, X } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Volunteer", href: "/volunteer" },
    { name: "Impact", href: "/impact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-base font-bold tracking-tight text-foreground transition duration-200 active:scale-95"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
            <Heart className="h-4 w-4 fill-current" />
          </span>
          <span className="leading-tight">
            Maryann's
            <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Love & Light Foundation
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors duration-200 ${
                  isActive
                    ? "text-primary bg-primary/5"
                    : "text-foreground/70 hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-2">
          <Link
            href="/donate"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/95 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            <Heart className="h-3.5 w-3.5 fill-current" />
            Donate
          </Link>
          
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="grid h-10 w-10 place-items-center rounded-md text-foreground transition-all duration-200 hover:bg-secondary md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {isOpen && (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur-md md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-lg px-4 py-3 text-base font-semibold transition-colors ${
                    isActive
                      ? "text-primary bg-primary/5"
                      : "text-foreground/75 hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
