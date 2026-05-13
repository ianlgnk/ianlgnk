import { motion } from "framer-motion";
import { Download, GraduationCap } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

import { HeroName } from "@/components/hero/HeroName";
import { HeroParticles } from "@/components/hero/HeroParticles";
import { HeroTypewriter } from "@/components/hero/HeroTypewriter";
import { Button } from "@/components/ui/button";
import { personal } from "@/data/personal";
import { cn, sectionShell } from "@/lib/utils";

const cvFile = "ianlgnk(pt-Br).pdf";
const cvPath = `${import.meta.env.BASE_URL}cv/${encodeURIComponent(cvFile)}`;

const ease = [0.22, 1, 0.36, 1] as const;

const enter = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease },
};

export function Hero() {
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
            {personal.title}
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
            <HeroTypewriter />
          </motion.div>

          <motion.p
            {...enter}
            transition={{ ...enter.transition, delay: 0.35 }}
            className="max-w-xl text-base leading-relaxed text-muted-foreground"
          >
            Estudando programação desde os 15 anos.
            <br />
            Desenvolvendo soluções Web/Mobile desde os 19!
          </motion.p>

          <motion.div
            {...enter}
            transition={{ ...enter.transition, delay: 0.5 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <Button asChild size="lg">
              <a href="#projetos">Ver Projetos</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={cvPath} download>
                <Download className="size-4" />
                Baixar CV
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
              aria-label="GitHub"
            >
              <FaGithub className="size-5" />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="size-5" />
            </a>
            <a
              href={personal.lattes}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              aria-label="Currículo Lattes"
            >
              <GraduationCap className="size-5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
