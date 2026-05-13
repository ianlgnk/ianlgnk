import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const PHRASES = [
  "Engenheiro de Software Full Stack",
  "Desenvolvedor React",
  "Engenheiro Node.js",
  "Desenvolvedor Web/Mobile",
] as const;

const TYPE_MS = 42;
const DELETE_MS = 28;
const PAUSE_FULL_MS = 2200;
const PAUSE_EMPTY_MS = 600;

type Phase = "typing" | "deleting";

export function HeroTypewriter({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");

  useEffect(() => {
    if (reduced) {
      queueMicrotask(() => {
        setDisplay(PHRASES[0]);
      });
      return;
    }

    const target = PHRASES[phraseIndex];
    let t: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (display.length < target.length) {
        t = setTimeout(() => {
          setDisplay(target.slice(0, display.length + 1));
        }, TYPE_MS);
      } else {
        t = setTimeout(() => {
          setPhase("deleting");
        }, PAUSE_FULL_MS);
      }
    } else {
      if (display.length > 0) {
        t = setTimeout(() => {
          setDisplay((d) => d.slice(0, -1));
        }, DELETE_MS);
      } else {
        t = setTimeout(() => {
          setPhraseIndex((i) => (i + 1) % PHRASES.length);
          setPhase("typing");
        }, PAUSE_EMPTY_MS);
      }
    }

    return () => clearTimeout(t);
  }, [reduced, phraseIndex, display, phase]);

  return (
    <p
      className={cn(
        "font-mono text-lg text-muted-foreground sm:text-xl",
        className,
      )}
      aria-live="polite"
    >
      <span>{reduced ? PHRASES[0] : display}</span>
      {!reduced ? (
        <span
          className="ml-0.5 inline-block w-[0.55ch] animate-hero-cursor font-medium text-primary"
          aria-hidden
        >
          |
        </span>
      ) : null}
    </p>
  );
}
