// src/components/Nav/Nav.jsx
import React from "react";
import "./Nav.css";

export default function Nav() {
  return (
    <header className="site-header">
      {/* Skip link: appears on keyboard focus */}
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <div className="measure site-header__inner">
        <div className="site-header__row">
          <h1 className="site-header__name">Dan Murphy – Painter</h1>

          {/*
          <nav className="site-nav" aria-label="Site">
            <a className="link site-nav__link" href="#available">Available</a>
            <a className="link site-nav__link" href="#about">About</a>
            <a className="link site-nav__link" href="#contact">Contact</a>
          </nav>
          */}
        </div>
      </div>
    </header>
  );
}
