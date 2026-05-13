import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { Fragment } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

import { personal } from "@/data/personal";
import { cn, sectionShell } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

const view = {
  once: true,
  margin: "-40px 0px -40px 0px" as const,
  amount: 0.2 as const,
};

const navLinks = [
  { href: "#hero", label: "Início" },
  { href: "#sobre", label: "Sobre" },
  { href: "#experiencia", label: "Experiência" },
  { href: "#projetos", label: "Projetos" },
  { href: "#habilidades", label: "Habilidades" },
  { href: "#contato", label: "Contato" },
] as const;

function FooterNavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className={cn(
        "relative text-sm text-muted-foreground transition-colors hover:text-foreground",
        "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform after:duration-200 after:ease-out",
        "hover:after:scale-x-100",
      )}
    >
      {label}
    </a>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-muted-foreground transition-colors hover:text-green-400"
      whileHover={{ scale: 1.15 }}
      transition={{ duration: 0.18, ease: easeOut }}
    >
      {children}
    </motion.a>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 bg-muted/35 py-10 dark:bg-black/45">
      <div className={sectionShell}>
        <motion.div
          className="mx-auto mb-8 h-px max-w-3xl origin-left rounded-full bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ scaleX: 0, opacity: 0.6 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={view}
          transition={{ duration: 0.65, ease: easeOut }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={view}
          transition={{ duration: 0.4, ease: easeOut, delay: 0.08 }}
          className="flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:justify-between md:gap-6 md:text-left"
        >
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            © 2026{" "}
            <span className="font-medium text-foreground">{personal.name}</span>
            {" · "}
            Feito com{" "}
            <span className="text-red-500 dark:text-red-400" aria-hidden>
              ♥
            </span>{" "}
            em Belo Horizonte
            <br />
            <span className="text-xs">
              com{" "}
              <a
                href="https://react.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-green-600 underline-offset-2 transition-colors hover:text-green-500 hover:underline dark:text-green-400 dark:hover:text-green-300"
              >
                React
              </a>{" "}
              e{" "}
              <a
                href="https://tailwindcss.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-green-600 underline-offset-2 transition-colors hover:text-green-500 hover:underline dark:text-green-400 dark:hover:text-green-300"
              >
                Tailwind
              </a>
            </span>
          </p>

          <nav
            className="flex flex-wrap items-center justify-center gap-y-2 text-sm md:justify-center"
            aria-label="Rodapé"
          >
            {navLinks.map((link, i) => (
              <Fragment key={link.href}>
                {i > 0 ? (
                  <span className="mx-2 text-muted-foreground/45 select-none" aria-hidden>
                    ·
                  </span>
                ) : null}
                <FooterNavLink href={link.href} label={link.label} />
              </Fragment>
            ))}
          </nav>

          <div className="flex items-center justify-center gap-4 md:justify-end">
            <SocialIcon href={personal.github} label="GitHub">
              <FaGithub className="size-5" />
            </SocialIcon>
            <SocialIcon href={personal.linkedin} label="LinkedIn">
              <FaLinkedin className="size-5" />
            </SocialIcon>
            <SocialIcon href={personal.lattes} label="Currículo Lattes">
              <GraduationCap className="size-5" strokeWidth={2} />
            </SocialIcon>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
