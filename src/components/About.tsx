import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import {
  Clock,
  FolderKanban,
  Globe,
  GraduationCap,
  Layers,
  type LucideIcon,
} from "lucide-react";

import { about } from "@/data/about";
import { cn, sectionShell } from "@/lib/utils";

const view = {
  once: true,
  margin: "-80px" as const,
};

const viewSoft = {
  once: true,
  margin: "-40px" as const,
};

const metricIcons = {
  clock: Clock,
  folder: FolderKanban,
  layers: Layers,
} satisfies Record<(typeof about.metrics)[number]["icon"], LucideIcon>;

const educationIcons = {
  graduation: GraduationCap,
  globe: Globe,
} satisfies Record<(typeof about.education)[number]["icon"], LucideIcon>;

const easeOut = [0.22, 1, 0.36, 1] as const;

function MetricCard({
  value,
  suffix,
  label,
  iconKey,
  run,
  countDelay,
  entranceDelay,
}: {
  value: number;
  suffix: string;
  label: string;
  iconKey: keyof typeof metricIcons;
  run: boolean;
  countDelay: number;
  entranceDelay: number;
}) {
  const [display, setDisplay] = useState(0);
  const Icon = metricIcons[iconKey];

  useEffect(() => {
    if (!run) return;
    const controls = animate(0, value, {
      delay: countDelay,
      duration: 1.15,
      ease: easeOut,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [run, value, countDelay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={view}
      transition={{ duration: 0.45, ease: easeOut, delay: entranceDelay }}
      className="rounded-lg border border-border/80 bg-card/40 px-5 py-5 shadow-sm backdrop-blur-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-3xl font-semibold tabular-nums tracking-tight text-primary sm:text-4xl">
            {display}
            {suffix}
          </p>
          <p className="mt-1 text-sm leading-snug text-muted-foreground">
            {label}
          </p>
        </div>
        <div className="flex size-11 shrink-0 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary">
          <Icon className="size-5" aria-hidden />
        </div>
      </div>
    </motion.div>
  );
}

function MetricsColumn() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="flex flex-col gap-4">
      {about.metrics.map((m, index) => (
        <MetricCard
          key={m.label}
          value={m.value}
          suffix={m.suffix}
          label={m.label}
          iconKey={m.icon}
          run={inView}
          countDelay={0.08 + index * 0.14}
          entranceDelay={index * 0.08}
        />
      ))}
    </div>
  );
}

function EducationCard({
  title,
  institution,
  period,
  iconKey,
  index,
}: {
  title: string;
  institution: string;
  period: string;
  iconKey: keyof typeof educationIcons;
  index: number;
}) {
  const Icon = educationIcons[iconKey];

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewSoft}
      transition={{
        duration: 0.45,
        ease: easeOut,
        delay: 0.12 + index * 0.08,
      }}
      className={cn(
        "group rounded-lg border border-border/80 bg-card/30 p-5 shadow-sm backdrop-blur-sm",
        "transition-[transform,box-shadow,border-color] duration-300 ease-out",
        "hover:-translate-y-1 hover:border-primary/45",
        "hover:shadow-[0_0_28px_-6px_rgba(34,197,94,0.28)]",
      )}
    >
      <div className="flex gap-4">
        <div
          className="flex size-11 shrink-0 items-center justify-center rounded-md border border-border bg-muted/50 text-xl transition-colors group-hover:border-primary/30 group-hover:bg-primary/10"
          aria-hidden
        >
          <Icon className="size-5 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold leading-snug text-foreground">
            {title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{institution}</p>
          <p className="mt-2 font-mono text-xs uppercase tracking-wider text-primary">
            {period}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export function About() {
  return (
    <section
      id="sobre"
      className="border-b border-border/60 py-20 sm:py-24"
    >
      <div className={sectionShell}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={view}
            transition={{ duration: 0.4, ease: easeOut }}
            className="shrink-0 font-mono text-sm font-semibold tracking-[0.2em] text-primary"
          >
            SOBRE
          </motion.h2>
          <motion.div
            className="h-px flex-1 origin-left bg-primary sm:max-w-xl"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={view}
            transition={{ duration: 0.75, ease: easeOut, delay: 0.12 }}
            aria-hidden
          />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-12 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-10">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={view}
            transition={{ duration: 0.48, ease: easeOut, delay: 0.06 }}
            className="text-lg font-medium leading-relaxed text-foreground sm:text-xl lg:col-span-7"
          >
            {about.summary}
          </motion.p>

          <div className="lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1">
            <MetricsColumn />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:col-start-1 lg:row-start-2 lg:grid-cols-1 xl:grid-cols-2">
            {about.education.map((item, index) => (
              <EducationCard
                key={`${item.title}-${item.period}`}
                title={item.title}
                institution={item.institution}
                period={item.period}
                iconKey={item.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
