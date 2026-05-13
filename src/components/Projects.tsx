import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ExternalLink, ImageIcon, Sparkles } from "lucide-react";
import { useId, useState } from "react";
import { FaGithub } from "react-icons/fa6";

import {
  academicProjects,
  getProjectStatusLabel,
  mainProjects,
  type Project,
  type ProjectStatus,
} from "@/data/projects";
import { cn } from "@/lib/utils";

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

function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
        statusBadgeClass(status),
      )}
    >
      {getProjectStatusLabel(status)}
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

function ImageHoverOverlay({ project }: { project: Project }) {
  const gh = project.github?.trim();
  const demo = project.demo?.trim();
  if (!gh && !demo) return null;

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-10 hidden items-center justify-center gap-3 bg-foreground/55 opacity-0 transition-opacity duration-200",
        "md:flex md:group-hover/image:pointer-events-auto md:group-hover/image:opacity-100",
      )}
    >
      <div className="flex gap-3">
        {gh ? (
          <LinkIconButton href={gh} label={`GitHub: ${project.name}`}>
            <FaGithub className="size-5" />
          </LinkIconButton>
        ) : null}
        {demo ? (
          <LinkIconButton
            href={demo}
            label={
              demo.toLowerCase().endsWith(".pdf")
                ? `Documento PDF: ${project.name}`
                : `Demo ou site: ${project.name}`
            }
          >
            <ExternalLink className="size-5" />
          </LinkIconButton>
        ) : null}
      </div>
    </div>
  );
}

function FooterLinks({ project }: { project: Project }) {
  const gh = project.github?.trim();
  const demo = project.demo?.trim();
  if (!gh && !demo) return null;

  return (
    <div className="mt-4 flex items-center gap-2 md:hidden">
      {gh ? (
        <a
          href={gh}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex size-10 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          aria-label={`GitHub: ${project.name}`}
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
          aria-label={
            demo.toLowerCase().endsWith(".pdf")
              ? `PDF: ${project.name}`
              : `Site ou demo: ${project.name}`
          }
        >
          <ExternalLink className="size-4" />
        </a>
      ) : null}
    </div>
  );
}

function TechTags({ tags, baseDelay }: { tags: string[]; baseDelay: number }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {tags.map((tag, i) => (
        <motion.span
          key={tag}
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
}: {
  project: Project;
  tagBaseDelay: number;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="font-mono text-base font-semibold text-card-foreground sm:text-lg">
          {project.name}
        </h3>
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <StatusBadge status={project.status} />
      </div>
      <TechTags tags={project.tags} baseDelay={tagBaseDelay} />
      <FooterLinks project={project} />
    </div>
  );
}

function ProjectCard({
  project,
  tagBaseDelay = 0.2,
}: {
  project: Project;
  tagBaseDelay?: number;
}) {
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
        <ImageHoverOverlay project={project} />
      </div>
      <ProjectCardBody project={project} tagBaseDelay={tagBaseDelay} />
    </article>
  );
}

function FeaturedProjectCard({ project }: { project: Project }) {
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
            Destaque
          </span>
          <StatusBadge status={project.status} />
        </div>
        <h3 className="mt-4 font-mono text-xl font-semibold text-card-foreground sm:text-2xl">
          {project.name}
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
          {project.description}
        </p>
        <TechTags tags={project.tags} baseDelay={0.22} />
        <div className="mt-6 flex flex-wrap gap-3">
          {project.github?.trim() ? (
            <LinkIconButton
              href={project.github.trim()}
              label={`GitHub: ${project.name}`}
            >
              <FaGithub className="size-5" />
            </LinkIconButton>
          ) : null}
          {project.demo?.trim() ? (
            <LinkIconButton
              href={project.demo.trim()}
              label={
                project.demo.toLowerCase().endsWith(".pdf")
                  ? `Documento: ${project.name}`
                  : `Demo ou site: ${project.name}`
              }
            >
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
        <ImageHoverOverlay project={project} />
      </div>
    </article>
  );
}

function AcademicCollapsible() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="mt-12 rounded-xl border border-border bg-muted/25">
      <div className="flex flex-col gap-1 border-b border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <h3 className="font-mono text-sm font-semibold text-foreground">
          Outros projetos acadêmicos
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
          {open ? "Ocultar projetos acadêmicos" : "Ver projetos acadêmicos"}
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
            <div className="px-3 pb-5 pt-4 sm:px-4">
              <p className="mb-4 px-1 text-xs text-muted-foreground">
                Projetos de pesquisa e extensão durante o curso técnico em
                informática. Projetos desenvolvidos durante a graduação em
                Sistemas de Informação.
              </p>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={gridContainer}
                className="grid gap-6 sm:grid-cols-2"
              >
                {academicProjects.map((p) => (
                  <motion.div key={p.name} variants={gridItem}>
                    <ProjectCard project={p} tagBaseDelay={0.12} />
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

  return (
    <section
      id="projetos"
      className="scroll-mt-4 border-b border-border/60 px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={view}
          transition={{ duration: 0.45, ease: easeOut }}
        >
          <h2 className="font-mono text-sm font-semibold uppercase tracking-widest text-primary">
            Projetos
          </h2>
          <p className="mt-2 text-muted-foreground">
            Seleção de trabalhos e experimentos — destaque para produto em
            construção.
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
                <motion.div key={project.name} variants={gridItem}>
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
