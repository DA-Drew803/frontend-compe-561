"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navigation = [
  { label: "DESTINATIONS", href: "/plan" },
  { label: "PLAN A TRIP", href: "/plan" },
  { label: "MY TRIP", href: "/plan" },
  { label: "ABOUT", href: "/#about" },
];

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2v2.2M12 19.8V22M4.93 4.93l1.56 1.56m11.02 11.02 1.56 1.56M2 12h2.2m15.6 0H22M4.93 19.07l1.56-1.56M17.51 6.49l1.56-1.56" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M20.2 15.7A8.5 8.5 0 0 1 8.3 3.8 8.5 8.5 0 1 0 20.2 15.7Z" />
    </svg>
  );
}

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("vacation-together-theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      document.documentElement.dataset.theme = savedTheme;
    }
  }, []);

  function toggleTheme() {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("vacation-together-theme", nextTheme);
  }

  return (
    <header className={`site-header${overlay ? " site-header--overlay" : ""}`}>
      <Link className="brand" href="/" onClick={() => setMenuOpen(false)}>
        VACATION TOGETHER
      </Link>

      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map((item) => (
          <Link key={item.label} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="header-actions">
        <button
          className="icon-button theme-button"
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle color theme"
        >
          <span className="theme-icon theme-icon--light"><MoonIcon /></span>
          <span className="theme-icon theme-icon--dark"><SunIcon /></span>
        </button>
        <button
          className="icon-button menu-button"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <span className="menu-lines" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      {menuOpen && (
        <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">
          {navigation.map((item) => (
            <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
