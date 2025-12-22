// src/components/Available/Available.jsx
import React, { useEffect, useMemo, useCallback, useState, useRef, useId } from "react";
import "../Work/Work.css"; // base modal styles shared with Work
import "./Available.css";  // overrides + grid

const GROUPS = [
  {
    id: "originals",
    title: "Originals",
    pieces: [
      {
        id: "fog-boat",
        title: "Froth and the Fog",
        src: "/assets/boats/89401-Froth-Fog-16x20.jpeg",
        size: "16×20",
        price: 400,
        status: "Available",
        note: "Oil on canvas. Also available as part of a complete five-painting set.",
      },
      {
        id: "pink-boat",
        title: "Pink and the Blue",
        src: "/assets/boats/89405-Pink-Blue-16x20.jpeg",
        size: "16×20",
        price: 400,
        status: "Available",
        note: "Oil on canvas. Also available as part of a complete five-painting set.",
      },
      {
        id: "cloud-boat",
        title: "Cloud and the Crest",
        src: "/assets/boats/89404-Cloud-Crest-16x20.jpeg",
        size: "16×20",
        price: 400,
        status: "Available",
        note: "Oil on canvas. Also available as part of a complete five-painting set.",
      },
            {
        id: "fish-boat",
        title: "Fish and the Bird",
        src: "/assets/boats/89402-Fish-Bird-16x20.jpeg",
        size: "16×20",
        price: 400,
        status: "Available",
        note: "Oil on canvas. Also available as part of a complete five-painting set.",
      },
            {
        id: "green-boat",
        title: "Green and the Glass",
        src: "/assets/boats/89403-Green-Glass-16x20.jpeg",
        size: "16×20",
        price: 400,
        status: "Available",
        note: "Oil on canvas. Also available as part of a complete five-painting set.",
      },
      
    ],
  },
  { id: "prints", title: "Prints", pieces: [] },
  { id: "experiments", title: "Experiments", pieces: [] },
];

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Available() {
  const [activeGroupId, setActiveGroupId] = useState(null);
  const [mode, setMode] = useState("grid"); // "grid" | "single"
  const [activeIndex, setActiveIndex] = useState(0);

  const lastFocusRef = useRef(null);
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);
  const titleId = useId();

  const activeGroup = useMemo(() => {
    if (!activeGroupId) return null;
    return GROUPS.find((g) => g.id === activeGroupId) || null;
  }, [activeGroupId]);

  const pieces = activeGroup?.pieces || [];
  const hasModal = Boolean(activeGroupId && pieces.length);

  const activePiece = pieces[activeIndex];

  const closeModal = useCallback(() => {
    setActiveGroupId(null);
    setMode("grid");
    setActiveIndex(0);

    // Restore focus after modal unmount
    setTimeout(() => {
      const el = lastFocusRef.current;
      if (el && typeof el.focus === "function") el.focus();
    }, 0);
  }, []);

  const openGroup = useCallback((groupId) => {
    const group = GROUPS.find((g) => g.id === groupId);
    if (!group?.pieces?.length) return;

    lastFocusRef.current = document.activeElement;

    setActiveGroupId(groupId);
    setMode("grid");
    setActiveIndex(0);
  }, []);

  const openPiece = useCallback((index) => {
    setActiveIndex(index);
    setMode("single");
  }, []);

  const backToGrid = useCallback(() => {
    setMode("grid");
  }, []);

  const showNext = useCallback(() => {
    if (!pieces.length) return;
    setActiveIndex((i) => (i + 1) % pieces.length);
  }, [pieces.length]);

  const showPrev = useCallback(() => {
    if (!pieces.length) return;
    setActiveIndex((i) => (i === 0 ? pieces.length - 1 : i - 1));
  }, [pieces.length]);

  // Modal lifecycle: focus, trap tab, lock scroll, keyboard shortcuts
  useEffect(() => {
    if (!hasModal) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus close button once mounted
    setTimeout(() => closeBtnRef.current?.focus(), 0);

    const onKeyDown = (e) => {
      // Escape closes always
      if (e.key === "Escape") {
        e.preventDefault();
        closeModal();
        return;
      }

      // In single mode, arrows navigate
      if (mode === "single" && pieces.length > 1) {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          showNext();
          return;
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          showPrev();
          return;
        }
      }

      // Focus trap
      if (e.key === "Tab") {
        const root = modalRef.current;
        if (!root) return;

        const focusables = root.querySelectorAll(FOCUSABLE_SELECTOR);
        if (!focusables.length) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
          return;
        }
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [hasModal, mode, pieces.length, closeModal, showNext, showPrev]);

  return (
    <section id="available" className="section available">
      <div className="measure">
        <h2 className="available__title">Available Work</h2>

        <ul className="available__list">
          {GROUPS.map((group) => {
            const isDisabled = !group.pieces?.length;
            return (
              <li key={group.id}>
                <button
                  type="button"
                  className="link available__item"
                  onClick={() => openGroup(group.id)}
                  disabled={isDisabled}
                  title={isDisabled ? "Coming soon" : undefined}
                >
                  {group.title}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {hasModal && (
        <div
          className="work-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={closeModal}
        >
          <div
            className="work-modal__shell available-modal__shell"
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="work-modal__top">
              <div className="measure work-modal__top-inner">
                <div className="work-modal__titleblock">
                  <span id={titleId} className="work-modal__project">
                    {activeGroup.title}
                  </span>

                  {mode === "single" ? (
                    <span className="work-modal__count mono">
                      {activeIndex + 1} / {pieces.length}
                    </span>
                  ) : (
                    <span className="work-modal__count mono">
                      {pieces.length} piece{pieces.length === 1 ? "" : "s"}
                    </span>
                  )}
                </div>

                <div className="available-modal__top-actions">
                  {mode === "single" && (
                    <button type="button" className="link available-modal__back" onClick={backToGrid}>
                      ← Back
                    </button>
                  )}

                  <button
                    type="button"
                    className="link work-modal__close"
                    onClick={closeModal}
                    ref={closeBtnRef}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>

            <div className={`work-modal__main ${mode === "single" ? "work-modal__main--center" : ""}`}>
              {mode === "grid" ? (
                <div className="available-modal__grid" role="list">
                  {pieces.map((p, idx) => (
                    <button
                      key={p.id}
                      type="button"
                      className="available-modal__thumb"
                      onClick={() => openPiece(idx)}
                    >
                      <img src={p.src} alt={p.title} loading="lazy" />
                      <div className="available-modal__thumb-meta">
                        <div className="available-modal__thumb-title">{p.title}</div>
                        {(p.size || typeof p.price === "number" || p.status) && (
                          <div className="mono available-modal__thumb-sub">
                            {p.size ? `${p.size}` : ""}
                            {typeof p.price === "number" ? ` · $${p.price}` : ""}
                            {p.status ? ` · ${p.status}` : ""}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="measure available-single">
                  <div className="available-single__media">
                    <img className="available-single__img" src={activePiece.src} alt={activePiece.title} />
                  </div>

                  <aside className="available-single__details">
                    <h3 className="available-single__title">{activePiece.title}</h3>

                    <div className="mono available-single__meta">
                      {activePiece.size ? `${activePiece.size}` : ""}
                      {typeof activePiece.price === "number" ? ` · $${activePiece.price}` : ""}
                      {activePiece.status ? ` · ${activePiece.status}` : ""}
                    </div>

                    {activePiece.note && <p className="available-single__note">{activePiece.note}</p>}

                    <p className="available-single__inquiry">
                      For inquiries, email{" "}
                      <a
                        className="link"
                        href={`mailto:dmurphy.dpm@gmail.com?subject=${encodeURIComponent(
                          `Inquiry: ${activePiece.title}`
                        )}`}
                      >
                        dmurphy.dpm@gmail.com
                      </a>
                      .
                    </p>
                  </aside>
                </div>
              )}
            </div>

            {mode === "single" && pieces.length > 1 && (
              <div className="work-modal__controls">
                <div className="measure work-modal__controls-inner">
                  <button type="button" className="link work-modal__link" onClick={showPrev}>
                    Previous
                  </button>
                  <button type="button" className="link work-modal__link" onClick={showNext}>
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
