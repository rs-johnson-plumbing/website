"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { projects, type Project, type ProjectPhoto } from "@/lib/content";
import { BandIllustration } from "./BandIllustration";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * Recent Builder Work on the For Builders page: one row of project cards
 * rolling left to right, paused under a cursor or a finger. Tapping a card
 * opens the project viewer: the page darkens behind a modal with a
 * swipeable strip of the project's photos, a caption under each photo, and
 * the project name, city, type, and description. Until real photos exist
 * the stage illustrations stand in for them.
 */
export function ProjectMarquee({ headingClassName }: { headingClassName?: string }) {
  const items = projects.items as Project[];
  const [open, setOpen] = useState<Project | null>(null);
  const [paused, setPaused] = useState(false);

  return (
    <div className="flex flex-col gap-5 lg:gap-6">
      <h2 id="projects-h" className={headingClassName ?? "text-h2-m lg:text-h2"}>
        {projects.heading}
      </h2>
      <div className="-mx-gutter-m lg:-mx-gutter">
        <div
          className="marquee overflow-hidden py-1"
          data-paused={paused}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
          style={{ maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)" }}
        >
          <div className="marquee-track marquee-reverse flex w-max gap-3 pl-3 lg:gap-4 lg:pl-4">
            {[false, true].map((clone) =>
              items.map((p) => (
                <ProjectTile key={`${p.id}${clone ? "-clone" : ""}`} project={p} clone={clone} onOpen={() => setOpen(p)} />
              )),
            )}
          </div>
        </div>
      </div>
      {open && <ProjectViewer project={open} onClose={() => setOpen(null)} />}
    </div>
  );
}

function Scene({ photo, className }: { photo: ProjectPhoto; className?: string }) {
  return <BandIllustration slug={photo.scene} title={photo.caption} className={cn("aspect-[4/3] w-full rounded-none border-0", className)} />;
}

/** One card in the row. The second copy of the row is hidden from assistive tech and the tab order. */
function ProjectTile({ project, clone, onOpen }: { project: Project; clone: boolean; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      tabIndex={clone ? -1 : 0}
      aria-hidden={clone || undefined}
      data-track={`project-${project.id}`}
      className="w-[280px] shrink-0 overflow-hidden rounded-card border border-hairline bg-white text-left text-charcoal transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal lg:w-[340px]"
    >
      <Scene photo={project.photos[0]} className="border-b border-hairline" />
      <div className="flex flex-col gap-1 p-4">
        <div className="text-[12px] font-bold uppercase tracking-[0.04em] text-teal">{project.city}</div>
        <div className="text-[17px] font-bold leading-tight">{project.name}</div>
        <div className="text-[14px] font-semibold text-slate">{project.type}</div>
        <div className="mt-1 inline-flex items-center gap-1 text-[14px] font-bold text-teal">
          {projects.open} <Icon name="arrow-right" size={14} strokeWidth={2} />
        </div>
      </div>
    </button>
  );
}

/**
 * The project viewer. A charcoal overlay freezes the page; the modal holds
 * a scroll-snap strip of photos (swipe on a phone, arrows or keys on a
 * desktop), the caption for the photo in view, then the project details.
 */
function ProjectViewer({ project, onClose }: { project: Project; onClose: () => void }) {
  const photos = project.photos;
  const [index, setIndex] = useState(0);
  const strip = useRef<HTMLDivElement>(null);

  const goTo = useCallback((i: number) => {
    const el = strip.current;
    if (!el) return;
    const n = (i + photos.length) % photos.length;
    el.scrollTo({ left: n * el.clientWidth, behavior: "smooth" });
  }, [photos.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goTo(index + 1);
      if (e.key === "ArrowLeft") goTo(index - 1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, goTo, index]);

  const onScroll = () => {
    const el = strip.current;
    if (!el) return;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-charcoal/80 p-3 lg:p-6" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-labelledby="project-title" onClick={(e) => e.stopPropagation()} className="relative flex max-h-full w-full max-w-[640px] flex-col overflow-hidden rounded-card bg-white text-left text-charcoal shadow-xl">
        <button type="button" onClick={onClose} aria-label={projects.close} className="absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[22px] leading-none text-charcoal shadow hover:bg-white">
          ×
        </button>

        {/* The photo strip */}
        <div className="relative shrink-0">
          <div ref={strip} onScroll={onScroll} className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain">
            {photos.map((ph, i) => (
              <div key={`${ph.scene}-${i}`} className="w-full shrink-0 snap-center">
                <Scene photo={ph} />
              </div>
            ))}
          </div>
          {photos.length > 1 && (
            <>
              <button type="button" onClick={() => goTo(index - 1)} aria-label={projects.previous} className="absolute left-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-charcoal shadow hover:bg-white lg:flex">
                <Icon name="arrow-right" size={18} strokeWidth={2} className="rotate-180" />
              </button>
              <button type="button" onClick={() => goTo(index + 1)} aria-label={projects.next} className="absolute right-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-charcoal shadow hover:bg-white lg:flex">
                <Icon name="arrow-right" size={18} strokeWidth={2} />
              </button>
            </>
          )}
          <div className="absolute left-2 top-2 rounded-btn bg-charcoal/70 px-2 py-0.5 text-[12px] font-bold text-white">
            {index + 1} / {photos.length}
          </div>
        </div>

        {/* Caption for the photo in view, with the dots */}
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-hairline bg-sand px-4 py-3 lg:px-5">
          <p className="text-[14px] leading-snug text-charcoal lg:text-[15px]">{photos[index]?.caption}</p>
          {photos.length > 1 && (
            <div className="mt-1.5 flex shrink-0 gap-1.5" aria-hidden="true">
              {photos.map((ph, i) => (
                <button key={`${ph.scene}-dot-${i}`} type="button" tabIndex={-1} onClick={() => goTo(i)} className={cn("h-2 w-2 rounded-full", i === index ? "bg-teal" : "bg-hairline-strong")} />
              ))}
            </div>
          )}
        </div>

        {/* The project */}
        <div className="flex min-h-0 flex-col gap-1.5 overflow-y-auto px-4 py-4 lg:px-5 lg:py-5">
          <div className="text-[12px] font-bold uppercase tracking-[0.04em] text-teal">{project.city} · {project.type}</div>
          <h3 id="project-title" className="text-[22px] font-bold leading-tight tracking-[-0.01em] lg:text-[24px]">{project.name}</h3>
          <div className="text-[14px] font-semibold text-slate">{project.address}</div>
          <p className="mt-1 text-[15px] leading-relaxed text-charcoal lg:text-[16px]">{project.description}</p>
        </div>
      </div>
    </div>
  );
}
