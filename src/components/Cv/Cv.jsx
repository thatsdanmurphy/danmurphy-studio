// src/components/Cv/Cv.jsx
import React from "react";
import "./Cv.css";

export default function Cv() {
  return (
    <section id="cv" className="section cv">
      <div className="measure">
        <h2>Selected Exhibitions &amp; Practice</h2>

        <div className="cv__block">
          <h3>Exhibitions &amp; Features</h3>
          <ul className="cv__list">
            <li className="cv__item">Boston College Arts Festival, Chestnut Hill, MA</li>
            <li className="cv__item">Brookline Spa, Brookline, MA</li>
            <li className="cv__item">Newton Open Studios, Newton, MA</li>
            <li className="cv__item">Downtown Boston Arts Market, Boston, MA</li>
            <li className="cv__item">Drizly, Lobby Art Installation, Boston, MA</li>
            <li className="cv__item">24-Hour Art Show, Auspicious Phoenix, Somerville, MA</li>
            <li className="cv__item">Aeronaut Brewing Company, Somerville, MA</li>
            <li className="cv__item">Roslindale Open Studios, Roslindale, MA</li>
            <li className="cv__item">Fornax Bread Company, Roslindale, MA</li>
            <li className="cv__item">Springhouse, Featured Artist, Jamaica Plain, MA</li>
            <li className="cv__item">The Music Emporium, Lexington, MA</li>
            <li className="cv__item">Don’t Forget Your Art, Newton, MA</li>
          </ul>
        </div>

        <div className="cv__block">
          <h3>Practice</h3>
          <ul className="cv__list">
            <li className="cv__item">Monday Night Art group, Framingham, MA</li>
            <li className="cv__item">Independent studio practice, ongoing</li>
          </ul>
        </div>

        <div className="cv__block">
          <h3>Education</h3>
          <ul className="cv__list">
            <li className="cv__item">Boston College, Painting</li>
            <li className="cv__item">Massachusetts College of Art and Design, Graphic Design</li>
            <li className="cv__item">Self-directed study in painting, color, and composition</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
