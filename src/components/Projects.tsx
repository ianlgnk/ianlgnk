import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ExternalLink, ImageIcon, Sparkles } from "lucide-react";
import { useId, useState } from "react";
import { FaGithub } from "react-icons/fa6";

import { ScrambleText } from "@/components/ScrambleText";
import {
  academicProjects,
  mainProjects,
  type Project,
  type ProjectStatus,
} from "@/data/projects";
import { formatNamed } from "@/lib/format-named";
import { useMessages } from "@/locales/use-messages";
import { scrambleContent, scrambleStagger } from "@/locales/scramble-stagger";
import { cn, sectionPaddingX, sectionShell } from "@/lib/utils";

const view = {
  once: true,
  margin: "-60px" as const,
};

const gridContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

const easeOut = [0.22, 1, 0.36, 1] as const;

const gridItem = {
  hidden: { opacity: 0, scale: 0.95, y: 28 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
};

const featuredVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1.02,
    transition: { duration: 0.55, ease: easeOut },
  },
};

function statusBadgeClass(status: ProjectStatus) {
  switch (status) {
    case "in_progress":
      return "border-amber-500/45 bg-amber-500/12 text-amber-800 dark:text-amber-300";
    case "completed":
      return "border-primary/40 bg-primary/10 text-primary";
    case "archived":
      return "border-border bg-muted text-muted-foreground";
    default:
      return "";
  }
}

function StatusBadge({
  status,
  staggerMs = scrambleContent.projectStatus,
}: {
  status: ProjectStatus;
  staggerMs?: number;
}) {
  const m = useMessages();
  return (
    <span
      className={cn(
        "inline-flex shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
        statusBadgeClass(status),
      )}
    >
      <ScrambleText
        text={m.projects.status[status]}
        staggerMs={staggerMs}
      />
    </span>
  );
}

function PreviewMedia({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const hasImage = Boolean(project.image?.trim());

  if (hasImage && project.image) {
    return (
      <img
        src={project.image}
        alt=""
        className={cn("size-full object-cover", className)}
        loading="lazy"
      />
    );
  }

  return (
    <div
      className={cn(
        "flex size-full items-center justify-center bg-gradient-to-br from-muted via-muted/80 to-muted/50",
        className,
      )}
      aria-hidden
    >
      <ImageIcon className="size-12 text-muted-foreground/70" strokeWidth={1.25} />
    </div>
  );
}

function LinkIconButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-full",
        "border border-border bg-card/95 text-card-foreground shadow-lg",
        "transition-colors duration-200 hover:border-primary/60 hover:bg-primary/10 hover:text-primary",
      )}
    >
      {children}
    </a>
  );
}

function ImageHoverOverlay({
  project,
  displayTitle,
}: {
  project: Project;
  displayTitle: string;
}) {
  const m = useMessages();
  const gh = project.github?.trim();
  const demo = project.demo?.trim();
  if (!gh && !demo) return null;

  const demoLabel =
    demo && demo.toLowerCase().endsWith(".pdf")
      ? formatNamed(m.projects.ariaDemoPdf, { name: displayTitle })
      : formatNamed(m.projects.ariaDemoSite, { name: displayTitle });

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-10 hidden items-center justify-center gap-3 bg-foreground/55 opacity-0 transition-opacity duration-200",
        "md:flex md:group-hover/image:pointer-events-auto md:group-hover/image:opacity-100",
      )}
    >
      <div className="flex gap-3">
        {gh ? (
          <LinkIconButton
            href={gh}
            label={formatNamed(m.projects.ariaGithub, { name: displayTitle })}
          >
            <FaGithub className="size-5" />
          </LinkIconButton>
        ) : null}
        {demo ? (
          <LinkIconButton href={demo} label={demoLabel}>
            <ExternalLink className="size-5" />
          </LinkIconButton>
        ) : null}
      </div>
    </div>
  );
}

function FooterLinks({
  project,
  displayTitle,
}: {
  project: Project;
  displayTitle: string;
}) {
  const m = useMessages();
  const gh = project.github?.trim();
  const demo = project.demo?.trim();
  if (!gh && !demo) return null;

  const demoLabel =
    demo && demo.toLowerCase().endsWith(".pdf")
      ? formatNamed(m.projects.ariaDemoPdf, { name: displayTitle })
      : formatNamed(m.projects.ariaDemoSite, { name: displayTitle });

  return (
    <div className="mt-4 flex items-center gap-2 md:hidden">
      {gh ? (
        <a
          href={gh}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex size-10 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          aria-label={formatNamed(m.projects.ariaGithub, { name: displayTitle })}
        >
          <FaGithub className="size-4" />
        </a>
      ) : null}
      {demo ? (
        <a
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex size-10 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          aria-label={demoLabel}
        >
          <ExternalLink className="size-4" />
        </a>
      ) : null}
    </div>
  );
}

function TechTags({
  slug,
  tags,
  baseDelay,
}: {
  slug: string;
  tags: string[];
  baseDelay: number;
}) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {tags.map((tag, i) => (
        <motion.span
          key={`${slug}-${tag}-${i}`}
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.28,
            delay: baseDelay + i * 0.04,
            ease: easeOut,
          }}
          className="rounded-full border border-border/80 bg-muted/60 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
        >
          {tag}
        </motion.span>
      ))}
    </div>
  );
}

function ProjectCardBody({
  project,
  tagBaseDelay,
  titleStaggerMs = scrambleContent.projectTitles,
  descriptionStaggerMs = scrambleContent.projectDescriptions,
  statusStaggerMs = scrambleContent.projectStatus,
}: {
  project: Project;
  tagBaseDelay: number;
  titleStaggerMs?: number;
  descriptionStaggerMs?: number;
  statusStaggerMs?: number;
}) {
  const m = useMessages();
  const description = m.projects.descriptions[project.slug];
  const displayTitle = m.projects.titles[project.slug];

  return (
    <div className="flex min-h-0 flex-1 flex-col p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="font-mono text-base font-semibold text-card-foreground sm:text-lg">
          <ScrambleText
            text={displayTitle}
            staggerMs={titleStaggerMs}
          />
        </h3>
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        <ScrambleText
          text={description}
          staggerMs={descriptionStaggerMs}
        />
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <StatusBadge status={project.status} staggerMs={statusStaggerMs} />
      </div>
      <TechTags
        slug={project.slug}
        tags={[...project.tags]}
        baseDelay={tagBaseDelay}
      />
      <FooterLinks project={project} displayTitle={displayTitle} />
    </div>
  );
}

function ProjectCard({
  project,
  tagBaseDelay = 0.2,
  titleStaggerMs,
  descriptionStaggerMs,
  statusStaggerMs,
}: {
  project: Project;
  tagBaseDelay?: number;
  titleStaggerMs?: number;
  descriptionStaggerMs?: number;
  statusStaggerMs?: number;
}) {
  const m = useMessages();
  const displayTitle = m.projects.titles[project.slug];

  return (
    <article
      className={cn(
        "group/card relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm",
        "transition-all duration-200 ease-out",
        "hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/20",
      )}
    >
      <div className="group/image relative aspect-video w-full shrink-0 overflow-hidden border-b border-border">
        <PreviewMedia project={project} />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/15 to-transparent"
          aria-hidden
        />
        <ImageHoverOverlay project={project} displayTitle={displayTitle} />
      </div>
      <ProjectCardBody
        project={project}
        tagBaseDelay={tagBaseDelay}
        titleStaggerMs={titleStaggerMs}
        descriptionStaggerMs={descriptionStaggerMs}
        statusStaggerMs={statusStaggerMs}
      />
    </article>
  );
}

function FeaturedProjectCard({ project }: { project: Project }) {
  const m = useMessages();
  const description = m.projects.descriptions[project.slug];
  const displayTitle = m.projects.titles[project.slug];
  const demoRaw = project.demo?.trim();
  const demoLabel =
    demoRaw && demoRaw.toLowerCase().endsWith(".pdf")
      ? formatNamed(m.projects.ariaDemoPdf, { name: displayTitle })
      : formatNamed(m.projects.ariaDemoSite, { name: displayTitle });

  return (
    <article
      className={cn(
        "group/card relative overflow-hidden rounded-xl border border-border bg-card shadow-md",
        "transition-all duration-200 ease-out",
        "hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/25",
        "lg:flex lg:min-h-[280px] lg:flex-row lg:items-stretch",
      )}
    >
      <div className="flex flex-1 flex-col justify-center p-6 sm:p-8 lg:order-1 lg:max-w-[55%]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full border border-primary/35 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
            <Sparkles className="size-3.5" aria-hidden />
            <ScrambleText
              text={m.projects.featuredLabel}
              staggerMs={scrambleContent.projectFeaturedLabel}
            />
          </span>
          <StatusBadge status={project.status} />
        </div>
        <h3 className="mt-4 font-mono text-xl font-semibold text-card-foreground sm:text-2xl">
          <ScrambleText
            text={displayTitle}
            staggerMs={scrambleContent.projectTitles}
          />
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
          <ScrambleText
            text={description}
            staggerMs={scrambleContent.projectDescriptions}
          />
        </p>
        <TechTags
          slug={project.slug}
          tags={[...project.tags]}
          baseDelay={0.22}
        />
        <div className="mt-6 flex flex-wrap gap-3">
          {project.github?.trim() ? (
            <LinkIconButton
              href={project.github.trim()}
              label={formatNamed(m.projects.ariaGithub, { name: displayTitle })}
            >
              <FaGithub className="size-5" />
            </LinkIconButton>
          ) : null}
          {project.demo?.trim() ? (
            <LinkIconButton href={project.demo.trim()} label={demoLabel}>
              <ExternalLink className="size-5" />
            </LinkIconButton>
          ) : null}
        </div>
      </div>

      <div className="group/image relative aspect-video w-full shrink-0 overflow-hidden border-t border-border lg:order-2 lg:aspect-auto lg:min-h-[280px] lg:w-[45%] lg:border-l lg:border-t-0">
        <PreviewMedia project={project} />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-background/25 lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-background/35"
          aria-hidden
        />
        <ImageHoverOverlay project={project} displayTitle={displayTitle} />
      </div>
    </article>
  );
}

function AcademicCollapsible() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const m = useMessages();

  return (
    <div className="mt-12 rounded-xl border border-border bg-muted/25">
      <div
        className={cn(
          "flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4",
          sectionPaddingX,
        )}
      >
        <h3 className="font-mono text-sm font-semibold text-foreground">
          <ScrambleText
            text={m.projects.academicSectionTitle}
            staggerMs={scrambleContent.academicSectionTitle}
          />
        </h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={open ? panelId : undefined}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "inline-flex items-center gap-2 self-start rounded-lg text-sm font-medium text-primary transition-colors",
            "hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45",
            "sm:self-auto",
          )}
        >
          {open
            ? m.projects.academicToggleHide
            : m.projects.academicToggleShow}
          <ChevronDown
            className={cn(
              "size-4 shrink-0 transition-transform duration-300 ease-out",
              open && "rotate-180",
            )}
            aria-hidden
          />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            key="academic-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: easeOut }}
            className="overflow-hidden"
          >
            <div className={cn("border-t border-border pb-5 pt-4", sectionPaddingX)}>
              <p className="mb-4 px-1 text-xs text-muted-foreground">
                <ScrambleText
                  text={m.projects.academicIntro}
                  staggerMs={scrambleContent.academicIntro}
                />
              </p>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={gridContainer}
                className="grid gap-6 sm:grid-cols-2"
              >
                {academicProjects.map((p) => (
                  <motion.div key={p.slug} variants={gridItem}>
                    <ProjectCard
                      project={p}
                      tagBaseDelay={0.12}
                      titleStaggerMs={scrambleContent.academicProjectTitles}
                      descriptionStaggerMs={
                        scrambleContent.academicProjectDescriptions
                      }
                      statusStaggerMs={scrambleContent.academicProjectStatus}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function Projects() {
  const featured = mainProjects.find((p) => p.featured);
  const rest = mainProjects.filter((p) => !p.featured);
  const m = useMessages();

  return (
    <section
      id="projetos"
      className="scroll-mt-4 border-b border-border/60 py-20 sm:py-24"
    >
      <div className={sectionShell}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={view}
          transition={{ duration: 0.45, ease: easeOut }}
        >
          <h2 className="font-mono text-sm font-semibold uppercase tracking-widest text-primary">
            <ScrambleText
              text={m.projects.sectionTitle}
              staggerMs={scrambleStagger.projectsTitle}
            />
          </h2>
          <p className="mt-2 text-muted-foreground">
            <ScrambleText
              text={m.projects.sectionSubtitle}
              staggerMs={scrambleStagger.projectsSubtitle}
            />
          </p>

          <div className="mt-10 space-y-8">
            {featured ? (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={view}
                variants={featuredVariants}
                className="origin-top"
              >
                <FeaturedProjectCard project={featured} />
              </motion.div>
            ) : null}

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={view}
              variants={gridContainer}
              className="grid gap-6 sm:grid-cols-2"
            >
              {rest.map((project) => (
                <motion.div key={project.slug} variants={gridItem}>
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={view}
              transition={{ duration: 0.4, delay: 0.1, ease: easeOut }}
            >
              <AcademicCollapsible />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
