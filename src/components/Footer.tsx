import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { Fragment } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

import { ScrambleText } from "@/components/ScrambleText";
import { personal } from "@/data/personal";
import { formatNamed } from "@/lib/format-named";
import type { Messages } from "@/locales/messages";
import { useMessages } from "@/locales/use-messages";
import { scrambleContent, scrambleStagger } from "@/locales/scramble-stagger";
import { cn, sectionShell } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

const view = {
  once: true,
  margin: "-40px 0px -40px 0px" as const,
  amount: 0.2 as const,
};

const FOOTER_NAV: readonly {
  href: string;
  linkKey: keyof Messages["nav"]["links"];
}[] = [
  { href: "#hero", linkKey: "hero" },
  { href: "#sobre", linkKey: "about" },
  { href: "#experiencia", linkKey: "experience" },
  { href: "#projetos", linkKey: "projects" },
  { href: "#habilidades", linkKey: "skills" },
  { href: "#contato", linkKey: "contact" },
];

function FooterNavLink({
  href,
  label,
  staggerMs,
}: {
  href: string;
  label: string;
  staggerMs: number;
}) {
  return (
    <a
      href={href}
      className={cn(
        "relative text-sm text-muted-foreground transition-colors hover:text-foreground",
        "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform after:duration-200 after:ease-out",
        "hover:after:scale-x-100",
      )}
    >
      <ScrambleText text={label} staggerMs={staggerMs} />
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
  const m = useMessages();
  const creditLead = formatNamed(m.footer.creditLead, { name: personal.name });

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
          <div className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            <p className="inline-block text-left">
              <ScrambleText
                text={creditLead}
                staggerMs={scrambleContent.footerCredit}
              />{" "}
              <span
                className="text-red-500 dark:text-red-400"
                aria-hidden
              >
                ♥
              </span>{" "}
              <ScrambleText
                text={m.footer.creditTrail}
                staggerMs={scrambleContent.footerCredit}
              />
            </p>
            <p className="mt-1 text-xs">
              <ScrambleText
                text={m.footer.stackWith}
                staggerMs={scrambleContent.footerStackWith}
              />{" "}
              <a
                href="https://react.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-green-600 underline-offset-2 transition-colors hover:text-green-500 hover:underline dark:text-green-400 dark:hover:text-green-300"
              >
                React
              </a>{" "}
              <ScrambleText
                text={m.footer.stackAnd}
                staggerMs={scrambleContent.footerStackAnd}
              />{" "}
              <a
                href="https://tailwindcss.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-green-600 underline-offset-2 transition-colors hover:text-green-500 hover:underline dark:text-green-400 dark:hover:text-green-300"
              >
                Tailwind
              </a>
            </p>
          </div>

          <nav
            className="flex flex-wrap items-center justify-center gap-y-2 text-sm md:justify-center"
            aria-label={m.footer.navAria}
          >
            {FOOTER_NAV.map((link, i) => (
              <Fragment key={link.href}>
                {i > 0 ? (
                  <span className="mx-2 text-muted-foreground/45 select-none" aria-hidden>
                    ·
                  </span>
                ) : null}
                <FooterNavLink
                  href={link.href}
                  label={m.nav.links[link.linkKey]}
                  staggerMs={scrambleStagger.navLink(i)}
                />
              </Fragment>
            ))}
          </nav>

          <div className="flex items-center justify-center gap-4 md:justify-end">
            <SocialIcon href={personal.github} label={m.hero.ariaGithub}>
              <FaGithub className="size-5" />
            </SocialIcon>
            <SocialIcon href={personal.linkedin} label={m.hero.ariaLinkedin}>
              <FaLinkedin className="size-5" />
            </SocialIcon>
            <SocialIcon href={personal.lattes} label={m.contact.ariaLattes}>
              <GraduationCap className="size-5" strokeWidth={2} />
            </SocialIcon>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
