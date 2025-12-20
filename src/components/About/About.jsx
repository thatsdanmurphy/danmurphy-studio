// src/components/About/About.jsx
import React from "react";
import "./About.css";

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="measure">
        <h2>Statement</h2>

        <p>
          I paint from observation, memory, and photographs. The work is slow.
          I tend to return to the same subjects over time.
        </p>

        <p>
          Cars, trucks, boats, scenes around Boston, or pulled from film; simple
          things that begin to feel staged when you look at them long enough.
          I’m interested in quiet light, strong color, and the edges of the image.
        </p>
      </div>
    </section>
  );
}
