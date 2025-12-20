// src/components/Notes/Notes.jsx
import React, { useEffect, useRef, useState } from "react";
import "./Notes.css";

export default function Notes() {
  const [open, setOpen] = useState(false);
  const emailRef = useRef(null);

  // When the form opens, place focus in the email field
  useEffect(() => {
    if (open) {
      // slight defer so DOM is ready
      setTimeout(() => emailRef.current?.focus(), 0);
    }
  }, [open]);

  return (
    <section id="notes" className="section notes">
      <div className="measure">
        <h2>Notes</h2>

        <p>
          I work in small series. When a set is finished, I send a short note with
          the paintings, the process, and a few thoughts from the adventure.
          I’ve been calling it “Five at a Time.”
        </p>

        <div className="notes__break" />

        {!open ? (
          <button type="button" className="link" onClick={() => setOpen(true)}>
            Join the list
          </button>
        ) : (
          <form
            className="notes__form"
            action="https://app.kit.com/forms/8872947/subscriptions"
            method="post"
          >
            <label className="notes__label" htmlFor="notes-email">
              Leave your email and I’ll send the next one.
            </label>

            <input
              id="notes-email"
              ref={emailRef}
              type="email"
              name="email_address"
              placeholder="Email address"
              required
              className="notes__input"
              autoComplete="email"
              inputMode="email"
            />

            <div className="notes__rule" />

            <div className="notes__actions">
              <button type="submit" className="link">
                Submit
              </button>

              <button
                type="button"
                className="link muted"
                onClick={() => setOpen(false)}
              >
                Never mind
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
