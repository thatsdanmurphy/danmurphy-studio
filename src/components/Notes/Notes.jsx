// src/components/Notes/Notes.jsx
import React, { useEffect, useRef, useState } from "react";
import "./Notes.css";

export default function Notes() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [emailError, setEmailError] = useState("");

  const emailRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (open) setTimeout(() => emailRef.current?.focus(), 0);
  }, [open]);

  function resetFormState() {
    setStatus("idle");
    setEmailError("");
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formRef.current) return;
    if (status === "submitting") return;

    const email = (emailRef.current?.value || "").trim();

    if (!isValidEmail(email)) {
      setEmailError("That doesn’t look like an email address yet.");
      emailRef.current?.focus();
      return;
    }

    setEmailError("");
    setStatus("submitting");

    try {
      const formData = new FormData(formRef.current);

      // Keep user on-site:
      // no-cors avoids CORS blocking; response is opaque, so we show success optimistically.
      await fetch(formRef.current.action, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="notes" className="section notes">
      <div className="measure">
        <h2>Notes</h2>

        <p>
          I work in small series. When a set is finished, I send a short note
          with the paintings, the process, and a few thoughts from the adventure.
          I’ve been calling it “Five at a Time.”
        </p>

        <div className="notes__break" />

        {!open ? (
          <button
            type="button"
            className="link"
            onClick={() => {
              setOpen(true);
              resetFormState();
            }}
          >
            Join the list
          </button>
        ) : status === "success" ? (
          <div className="notes__success" aria-live="polite">
            <p>
  One more step.
  <br />
  Check your email to confirm you’re on the list. If you don’t see it, take a
  look in spam — it’ll be from Kit.
</p>


            <div className="notes__actions">
              <button
                type="button"
                className="link muted"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form
            ref={formRef}
            className="notes__form"
            action="https://app.kit.com/forms/8872947/subscriptions"
            method="post"
            onSubmit={handleSubmit}
            noValidate
          >
            <label htmlFor="notes-email" className="muted">
              Leave your email and I’ll send the next one.
            </label>

            <input
              id="notes-email"
              ref={emailRef}
              type="email"
              name="email_address"
              placeholder="Email address"
              className="input input--line"
              autoComplete="email"
              inputMode="email"
              disabled={status === "submitting"}
              onChange={() => {
                if (emailError) setEmailError("");
                if (status === "error") setStatus("idle");
              }}
            />

            {/* Inline email validation message */}
            {emailError && (
              <p className="field-note" aria-live="polite">
                {emailError}
              </p>
            )}

            {/* Network/submit error */}
            {status === "error" && !emailError && (
              <p className="field-note" aria-live="polite">
                Something didn’t go through. Try again?
              </p>
            )}

            <div className="notes__actions">
              <button
                type="submit"
                className="link"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Submitting…" : "Submit"}
              </button>

              <button
                type="button"
                className="link muted"
                onClick={() => setOpen(false)}
                disabled={status === "submitting"}
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
