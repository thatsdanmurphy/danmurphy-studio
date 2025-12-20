// src/components/NotFound/NotFound.jsx
import React from "react";

export default function NotFound() {
  return (
    <section className="section notfound" aria-labelledby="notfound-title">
      <div className="measure">
        <h2 id="notfound-title">Page not found</h2>

        <p>This page doesn’t exist. The paintings still do.</p>

        <p>
          <a className="link" href="/#work">
            Return to the work
          </a>
        </p>
      </div>
    </section>
  );
}
