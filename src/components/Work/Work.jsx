// src/components/Work/Work.jsx
import React, { useEffect, useMemo, useCallback, useState, useRef, useId } from "react";
import "./Work.css";

const PROJECTS = [
  {
    id: "on-the-sea",
    title: "On the Sea",
    images: [
      { src: "/assets/boats/89401-Froth-Fog-16x20.jpeg", title: "Froth and the Fog" },
      { src: "/assets/boats/89404-Cloud-Crest-16x20.jpeg", title: "Cloud and the Crest" },
      { src: "/assets/boats/89405-Pink-Blue-16x20.jpeg", title: "Pink and the Blue" },
      { src: "/assets/boats/89403-Green-Glass-16x20.jpeg", title: "Glass and the Green" },
      { src: "/assets/boats/89402-Fish-Bird-16x20.jpeg", title: "Fish and the Bird" },
    ],
  },
  {
    id: "in-boston",
    title: "In Boston",
    images: [
      { src: "/assets/boston/89101-Back-Bay-10x30.webp", title: "Back Bay" },
      { src: "/assets/boston/89103-Allston-16x20.webp", title: "Allston" },
      { src: "/assets/boston/89104-Morton.webp", title: "Morton Street" },
      { src: "/assets/boston/89105-Jamaica-Plain.webp", title: "Jamaica Plain" },
      { src: "/assets/boston/89106-NorthEnd-Building.webp", title: "North End" },
    ],
  },
  {
    id: "mail-trucks",
    title: "Mail Trucks",
    images: [
      { src: "/assets/mail-trucks/89303-Regina.webp", title: "Regina" },
      { src: "/assets/mail-trucks/89305-Wanderer.webp", title: "Wanderer" },
      { src: "/assets/mail-trucks/89306-Lonestar.webp", title: "Lonestar" },
      { src: "/assets/mail-trucks/89307-Ray.webp", title: "Ray" },
      { src: "/assets/mail-trucks/89308-Redd.webp", title: "Redd" },
    ],
  },
  {
    id: "from-the-screen",
    title: "From the Screen",
    images: [
      { src: "/assets/film/89201-Big-Fish.webp", title: "Big Fish" },
      { src: "/assets/film/89202-Tombstone.webp", title: "Tombstone" },
    ],
  },
];

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Work({ isAvailableOpen = false }) {
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const lastFocusRef = useRef(null);
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);
  const titleId = useId();

  const activeProject = useMemo(() => {
    if (!activeProjectId) return null;
    return PROJECTS.find((p) => p.id === activeProjectId) || null;
  }, [activeProjectId]);

  const hasImages = Boolean(activeProject && activeProject.images?.length);

  const closeModal = useCallback(() => {
    setActiveProjectId(null);
    setActiveIndex(0);

    // Restore focus after modal unmount
    setTimeout(() => {
      const el = lastFocusRef.current;
      if (el && typeof el.focus === "function") el.focus();
    }, 0);
  }, []);

  const openProject = useCallback(
    (projectId) => {
      if (isAvailableOpen) return; // don't stack surfaces
      const project = PROJECTS.find((p) => p.id === projectId);
      if (!project?.images?.length) return;

      lastFocusRef.current = document.activeElement;

      setActiveProjectId(projectId);
      setActiveIndex(0);
    },
    [isAvailableOpen]
  );

  const showNext = useCallback(() => {
    if (!activeProject?.images?.length) return;
    setActiveIndex((i) => (i + 1) % activeProject.images.length);
  }, [activeProject]);

  const showPrev = useCallback(() => {
    if (!activeProject?.images?.length) return;
    setActiveIndex((i) => (i === 0 ? activeProject.images.length - 1 : i - 1));
  }, [activeProject]);

  // If Available opens while a collection modal is up, close it.
  useEffect(() => {
    if (isAvailableOpen && activeProjectId) closeModal();
  }, [isAvailableOpen, activeProjectId, closeModal]);

  // Modal lifecycle: focus, trap tab, lock scroll, keyboard shortcuts
  useEffect(() => {
    if (!hasImages) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus close button once mounted
    setTimeout(() => closeBtnRef.current?.focus(), 0);

    const onKeyDown = (e) => {
      // Escape
      if (e.key === "Escape") {
        e.preventDefault();
        closeModal();
        return;
      }

      // Arrow navigation
      if (e.key === "ArrowRight" && activeProject?.images?.length > 1) {
        e.preventDefault();
        showNext();
        return;
      }
      if (e.key === "ArrowLeft" && activeProject?.images?.length > 1) {
        e.preventDefault();
        showPrev();
        return;
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
  }, [hasImages, activeProject, closeModal, showNext, showPrev]);

  return (
    <section id="work" className="section work">
      <div className="measure">
        <h2 className="work__title">Collections</h2>

        <ul className="work__list">
          {PROJECTS.map((project) => (
            <li key={project.id}>
              <button
                type="button"
                className="link work__item"
                onClick={() => openProject(project.id)}
              >
                {project.title}
              </button>
            </li>
          ))}

          <li aria-hidden="true" className="work__spacer" />

          <li>
            <a href="#available" className="link work__item">
              Available Work ↓
            </a>
          </li>
        </ul>
      </div>

      {hasImages && (
        <div
          className="work-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={closeModal}
        >
          <div
            className="work-modal__shell"
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="work-modal__top">
              <div className="measure work-modal__top-inner">
                <div className="work-modal__titleblock">
                  <span id={titleId} className="work-modal__project">
                    {activeProject.title}
                  </span>
                  <span className="work-modal__count mono">
                    {activeIndex + 1} / {activeProject.images.length}
                  </span>
                </div>

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

            <div className="work-modal__main work-modal__main--center">
              <div className="measure work-modal__image-wrap">
                <img
                  src={activeProject.images[activeIndex].src}
                  alt={activeProject.images[activeIndex].title}
                />
                <div className="work-modal__caption mono">
                  {activeProject.images[activeIndex].title}
                </div>
              </div>
            </div>

            {activeProject.images.length > 1 && (
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
