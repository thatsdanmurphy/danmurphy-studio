// src/components/Contact/Contact.jsx
import React from "react";
import "./Contact.css";

export default function Contact() {
  const email = "dmurphy.dpm@gmail.com";

  return (
    <section id="contact" className="section contact">
      <div className="measure">
        <h2>Contact</h2>

        <p className="contact__copy">
          For commissions, collaborations, or a simple hello.
        </p>

        <div className="contact__break" />

        <a className="link" href={`mailto:${email}`}>
          {email}
        </a>
      </div>
    </section>
  );
}
