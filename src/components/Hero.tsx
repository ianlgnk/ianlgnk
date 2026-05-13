import { motion } from "framer-motion";
import { Download, GraduationCap } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

import { HeroName } from "@/components/hero/HeroName";
import { HeroParticles } from "@/components/hero/HeroParticles";
import { HeroTypewriter } from "@/components/hero/HeroTypewriter";
import { ScrambleText } from "@/components/ScrambleText";
import { Button } from "@/components/ui/button";
import { useLocale, type Locale } from "@/components/locale-provider";
import { personal } from "@/data/personal";
import { useMessages } from "@/locales/use-messages";
import { scrambleStagger } from "@/locales/scramble-stagger";
import { cn, sectionShell } from "@/lib/utils";

/** Filenames in `public/cv/` (asset names keep mixed casing). */
const CV_FILE_BY_LOCALE: Record<Locale, string> = {
  "pt-BR": "ianlgnk(pt-Br).pdf",
  "en-US": "ianlgnk(en-Us).pdf",
};

const ease = [0.22, 1, 0.36, 1] as const;

const enter = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease },
};

export function Hero() {
  const { locale } = useLocale();
  const m = useMessages();
  const cvFile = CV_FILE_BY_LOCALE[locale];
  const cvPath = `${import.meta.env.BASE_URL}cv/${encodeURIComponent(cvFile)}`;

  return (
    <section
      id="hero"
      className="relative flex min-h-dvh flex-col overflow-hidden border-b border-border/60"
    >
      <HeroParticles />

      <div
        className={cn(
          "relative z-10 flex flex-1 flex-col justify-center pb-16 pt-16 sm:pb-20 sm:pt-20",
          sectionShell,
        )}
      >
        <div className="max-w-3xl space-y-6">
          <motion.p
            {...enter}
            transition={{ ...enter.transition, delay: 0 }}
            className="font-mono text-sm text-primary sm:text-base"
          >
            <ScrambleText
              text={m.hero.roleTitle}
              className="font-mono text-sm text-primary sm:text-base"
              staggerMs={scrambleStagger.heroRole}
            />
          </motion.p>

          <motion.div
            {...enter}
            transition={{ ...enter.transition, delay: 0.1 }}
          >
            <HeroName name={personal.name} />
          </motion.div>

          <motion.div
            {...enter}
            transition={{ ...enter.transition, delay: 0.2 }}
          >
            <HeroTypewriter key={locale} />
          </motion.div>

          <motion.p
            {...enter}
            transition={{ ...enter.transition, delay: 0.35 }}
            className="max-w-xl text-base leading-relaxed text-muted-foreground"
          >
            <ScrambleText
              as="span"
              text={m.hero.bioLine1}
              staggerMs={scrambleStagger.heroBio1}
            />
            <br />
            <ScrambleText
              as="span"
              text={m.hero.bioLine2}
              staggerMs={scrambleStagger.heroBio2}
            />
          </motion.p>

          <motion.div
            {...enter}
            transition={{ ...enter.transition, delay: 0.5 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <Button asChild size="lg">
              <a href="#projetos">
                <ScrambleText
                  text={m.hero.ctaProjects}
                  staggerMs={scrambleStagger.heroCtaProjects}
                />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a
                href={cvPath}
                download={cvFile}
                className="inline-flex items-center gap-2"
              >
                <Download className="size-4" />
                <ScrambleText
                  text={m.hero.ctaCv}
                  staggerMs={scrambleStagger.heroCtaCv}
                />
              </a>
            </Button>
          </motion.div>

          <motion.div
            {...enter}
            transition={{ ...enter.transition, delay: 0.58 }}
            className="flex items-center gap-3 pt-4"
          >
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              aria-label={m.hero.ariaGithub}
            >
              <FaGithub className="size-5" />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              aria-label={m.hero.ariaLinkedin}
            >
              <FaLinkedin className="size-5" />
            </a>
            <a
              href={personal.lattes}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              aria-label={m.hero.ariaLattes}
            >
              <GraduationCap className="size-5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
