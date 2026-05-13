import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { Building2, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { ExperienceItem } from "@/data/experience";
import { experience } from "@/data/experience";
import { cn, sectionShell } from "@/lib/utils";

const view = {
  once: true,
  margin: "-60px" as const,
};

/** Dots da timeline: reanimam ao entrar e ao sair da área visível. */
const dotViewport = {
  once: false,
  margin: "-50px" as const,
} as const;

const ease = [0.22, 1, 0.36, 1] as const;

function useLg() {
  const [isLg, setIsLg] = useState(
    () => window.matchMedia("(min-width: 1024px)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setIsLg(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isLg;
}

function TimelineDot({ emphasized }: { emphasized: boolean }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={dotViewport}
      transition={{
        duration: 0.34,
        ease,
      }}
      className="relative z-10 flex size-7 shrink-0 items-center justify-center"
    >
      {emphasized ? (
        <span
          className="absolute -inset-1 rounded-full border border-primary/55 bg-primary/10 animate-pulse"
          aria-hidden
        />
      ) : null}
      <span
        className={cn(
          "relative size-3.5 rounded-full border-2 bg-background shadow-sm transition-[border-color,box-shadow] duration-200",
          emphasized
            ? "border-primary shadow-[0_0_14px_hsl(var(--primary)_/_0.4)]"
            : "border-muted-foreground/55",
        )}
      />
    </motion.div>
  );
}

const tagListVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.12 },
  },
};

const tagItemVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease },
  },
};

function ExperienceCard({
  item,
  index,
  isLg,
}: {
  item: ExperienceItem;
  index: number;
  isLg: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  const fromX = isLg ? (index % 2 === 0 ? -52 : 52) : -36;

  return (
    <motion.article
      initial={{ opacity: 0, x: fromX, y: 12 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={view}
      transition={{ duration: 0.48, ease }}
      className={cn(
        "relative w-full max-w-md rounded-xl border border-border bg-card/95 p-6 text-card-foreground shadow-sm",
        "backdrop-blur-sm transition-[transform,box-shadow,border-color] duration-200",
        "hover:-translate-y-1 hover:border-primary/45",
        "hover:shadow-[0_14px_44px_-14px_hsl(var(--primary)_/_0.16)]",
      )}
    >
      <a
        href={item.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visitar site de ${item.company} (abre em nova aba)`}
        className="absolute right-4 top-4 block rounded-lg ring-offset-2 ring-offset-background transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 sm:right-5 sm:top-5"
      >
        {logoFailed ? (
          <div className="flex size-9 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground sm:size-10">
            <Building2 className="size-4 sm:size-5" aria-hidden />
          </div>
        ) : (
          <img
            src={item.logoSrc}
            alt=""
            width={40}
            height={40}
            loading="lazy"
            decoding="async"
            className="size-9 rounded-lg border border-border bg-muted object-contain p-0.5 sm:size-10"
            onError={() => setLogoFailed(true)}
          />
        )}
      </a>

      <div className="pr-14 sm:pr-16">
        <span
          className={cn(
            "inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium",
            item.current
              ? "border-primary/40 bg-primary/15 text-primary"
              : "border-border bg-muted/90 text-muted-foreground",
          )}
        >
          {item.current ? "Atual" : "Anterior"}
        </span>

        <h3 className="mt-3 text-lg font-semibold leading-snug text-foreground">
          {item.role}
        </h3>
        <a
          href={item.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-block font-medium text-primary underline-offset-2 transition-colors hover:text-primary/85 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {item.company}
        </a>
        <p className="mt-2 font-mono text-xs leading-relaxed text-muted-foreground">
          {item.period}
          <span className="text-muted-foreground/70"> · </span>
          <span>{item.duration}</span>
        </p>
      </div>

      <motion.ul
        className="mt-5 flex flex-wrap gap-2"
        variants={tagListVariants}
        initial="hidden"
        whileInView="visible"
        viewport={view}
      >
        {item.technologies.map((tech) => (
          <motion.li key={tech} variants={tagItemVariants}>
            <span className="inline-block rounded-full border border-border bg-muted/70 px-2.5 py-1 text-xs text-muted-foreground">
              {tech}
            </span>
          </motion.li>
        ))}
      </motion.ul>

      <div className="mt-5 border-t border-border pt-4">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="-ml-2 h-auto gap-2 px-2 py-1 text-muted-foreground hover:text-foreground"
          aria-expanded={expanded}
          onClick={() => setExpanded((v) => !v)}
        >
          <ChevronDown
            className={cn(
              "size-4 shrink-0 transition-transform duration-200",
              expanded && "rotate-180",
            )}
            aria-hidden
          />
          Responsabilidades
        </Button>
        <AnimatePresence initial={false}>
          {expanded ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease }}
              className="overflow-hidden"
            >
              <div className="pt-2 text-sm leading-relaxed text-muted-foreground">
                {item.responsibilities.trim() ? (
                  <p className="whitespace-pre-line">{item.responsibilities}</p>
                ) : (
                  <p className="italic text-muted-foreground">
                    Descrição das responsabilidades em breve.
                  </p>
                )}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

export function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const dotSlotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const isLg = useLg();

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.85", "end 0.2"],
  });

  const lineGrow = useTransform(scrollYProgress, [0, 1], [0, 1]);

  /** Ponta da linha (progresso do fill) vs centro vertical do *slot do círculo* (não do card). */
  const updateActiveFromLineProgress = useCallback((progress: number) => {
    const container = timelineRef.current;
    if (!container) return;

    const c = container.getBoundingClientRect();
    const tipY = c.top + progress * c.height;

    let next = 0;
    for (let i = 0; i < experience.length; i++) {
      const slot = dotSlotRefs.current[i];
      if (!slot) continue;
      const r = slot.getBoundingClientRect();
      const dotY = r.top + r.height / 2;
      if (tipY >= dotY - 2) next = i;
    }
    setActiveDotIndex((p) => (p === next ? p : next));
  }, []);

  useMotionValueEvent(scrollYProgress, "change", updateActiveFromLineProgress);

  useLayoutEffect(() => {
    updateActiveFromLineProgress(scrollYProgress.get());
  }, [scrollYProgress, updateActiveFromLineProgress]);

  useEffect(() => {
    const onResize = () => updateActiveFromLineProgress(scrollYProgress.get());
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [scrollYProgress, updateActiveFromLineProgress]);

  return (
    <section
      id="experiencia"
      className="scroll-mt-4 border-b border-border/60 py-20 sm:py-24"
    >
      <div className={sectionShell}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={view}
          transition={{ duration: 0.45, ease }}
        >
          <h2 className="font-mono text-sm font-semibold uppercase tracking-widest text-primary">
            Experiência
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Trajetória profissional em ordem cronológica (mais recente
            primeiro).
          </p>
        </motion.div>

        <div ref={timelineRef} className="relative mt-14 pb-6 pt-2">
          <div
            className="pointer-events-none absolute left-3 top-0 bottom-0 w-px -translate-x-1/2 bg-border lg:left-1/2"
            aria-hidden
          />
          <motion.div
            className="pointer-events-none absolute left-3 top-0 bottom-0 w-px origin-top -translate-x-1/2 bg-gradient-to-b from-primary via-primary/65 to-muted-foreground/50 lg:left-1/2"
            style={{ scaleY: lineGrow }}
            aria-hidden
          />

          <ol className="relative z-[1] m-0 list-none space-y-14 p-0 lg:space-y-20">
            {experience.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <li key={item.id}>
                  <div
                    className={cn(
                      "grid grid-cols-[24px_minmax(0,1fr)] items-start gap-x-4",
                      "lg:grid-cols-[minmax(0,1fr)_32px_minmax(0,1fr)] lg:gap-x-6",
                    )}
                  >
                    <div
                      ref={(el) => {
                        dotSlotRefs.current[index] = el;
                      }}
                      className="col-start-1 flex shrink-0 justify-center self-start pt-1 lg:col-start-2 lg:row-start-1 lg:pt-0"
                    >
                      <TimelineDot emphasized={index === activeDotIndex} />
                    </div>
                    <div
                      className={cn(
                        "col-start-2 row-start-1 min-w-0 w-full max-w-md",
                        isLeft
                          ? "lg:col-start-1 lg:justify-self-end lg:pr-2"
                          : "lg:col-start-3 lg:justify-self-start lg:pl-2",
                      )}
                    >
                      <ExperienceCard item={item} index={index} isLg={isLg} />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
