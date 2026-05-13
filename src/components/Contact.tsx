import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  GraduationCap,
  Loader2,
  Mail,
  Send,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { ElementType, ReactNode } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import {
  contactSection,
  emailJsTemplateFields,
} from "@/data/contact";
import { personal } from "@/data/personal";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

const view = {
  once: true,
  margin: "-72px 0px -72px 0px" as const,
  amount: 0.12 as const,
};

const errEase = [0.22, 1, 0.36, 1] as const;

const fieldShakeEase = [0.33, 0, 0.25, 1] as const;
const fieldShakeTimes = [0, 0.18, 0.36, 0.55, 0.75, 1] as const;
const fieldShakeX = [0, -4, 4, -2.5, 2.5, 0] as const;

function FormFieldError({
  id,
  show,
  text,
}: {
  id: string;
  show: boolean;
  text?: string;
}) {
  return (
    <AnimatePresence initial={false}>
      {show && text ? (
        <motion.p
          id={id}
          key={id}
          role="alert"
          initial={{ opacity: 0, y: -6, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -4, filter: "blur(3px)" }}
          transition={{ duration: 0.24, ease: errEase }}
          className="mt-1 overflow-hidden text-xs text-destructive"
        >
          {text}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}

function FormBanner({
  show,
  variant,
  children,
}: {
  show: boolean;
  variant: "error" | "success";
  children: ReactNode;
}) {
  return (
    <AnimatePresence initial={false}>
      {show ? (
        <motion.div
          key={variant}
          role={variant === "error" ? "alert" : "status"}
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.98 }}
          transition={{ duration: 0.28, ease: errEase }}
          className={cn(
            "text-sm",
            variant === "error" ? "text-destructive" : "text-primary",
          )}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function getEmailJsConfig() {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim() ?? "";
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim() ?? "";
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim() ?? "";
  return { publicKey, serviceId, templateId, isReady: Boolean(publicKey && serviceId && templateId) };
}

function AvailabilityBadge() {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/35 bg-primary/10 px-3 py-1.5 text-sm font-medium text-foreground">
      <span className="relative flex size-3 shrink-0 items-center justify-center">
        <span
          className="absolute -inset-1 rounded-full border border-primary/55 bg-primary/10 animate-pulse"
          aria-hidden
        />
        <span
          className="relative size-2.5 rounded-full border-2 border-primary bg-background shadow-[0_0_10px_hsl(var(--primary)_/_0.45)]"
          aria-hidden
        />
      </span>
      <span>{contactSection.badge}</span>
    </div>
  );
}

const socialEase = [0.22, 1, 0.36, 1] as const;

function SocialLinkButton({
  href,
  label,
  icon: Icon,
  variant = "outline",
}: {
  href: string;
  label: string;
  icon: ElementType<{ className?: string; "aria-hidden"?: boolean }>;
  variant?: "primary" | "outline";
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group/social flex w-full max-w-[280px] items-center gap-3 rounded-lg border px-4 py-3 text-sm font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        variant === "primary"
          ? "border-primary bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
          : "border-zinc-300 bg-zinc-50 text-foreground hover:border-primary/50 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800/90 dark:hover:bg-zinc-800",
      )}
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2, ease: socialEase }}
    >
      <Icon
        className={cn(
          "size-5 shrink-0 transition-[filter,transform] duration-200",
          "group-hover/social:scale-110 group-hover/social:drop-shadow-[0_0_8px_hsl(var(--primary)_/_0.45)]",
          variant === "primary" && "text-primary-foreground group-hover/social:drop-shadow-none",
        )}
        aria-hidden
      />
      <span className="truncate">{label}</span>
    </motion.a>
  );
}

const fieldBaseClass = cn(
  "w-full rounded-lg border px-3.5 py-2.5 text-sm shadow-sm transition-colors",
  "border-zinc-300 bg-zinc-50 text-foreground placeholder:text-muted-foreground",
  "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
  "dark:border-zinc-700 dark:bg-zinc-800",
);

type ContactFieldKey = "name" | "email" | "message";

function validateForm(name: string, email: string, message: string) {
  const errors: { name?: string; email?: string; message?: string } = {};
  const n = name.trim();
  const e = email.trim();
  const m = message.trim();
  if (n.length < 2) errors.name = "Informe seu nome (mín. 2 caracteres).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) errors.email = "Informe um e-mail válido.";
  if (m.length < 12) errors.message = "Escreva uma mensagem um pouco mais completa (mín. 12 caracteres).";
  return errors;
}

function ContactFieldGroup({
  fieldKey,
  revealDelay,
  shake,
  onShakeEnd,
  children,
}: {
  fieldKey: ContactFieldKey;
  revealDelay: number;
  shake: boolean;
  onShakeEnd: (key: ContactFieldKey) => void;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={view}
      transition={{ duration: 0.35, delay: revealDelay, ease: easeOut }}
    >
      <motion.div
        animate={shake ? { x: [...fieldShakeX] } : { x: 0 }}
        transition={
          shake
            ? {
                duration: 0.48,
                ease: fieldShakeEase,
                times: [...fieldShakeTimes],
              }
            : { duration: 0.12, ease: easeOut }
        }
        onAnimationComplete={() => onShakeEnd(fieldKey)}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function Contact() {
  const mailto = `mailto:${personal.email}`;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<ReturnType<typeof validateForm>>({});
  const [fieldShake, setFieldShake] = useState<Record<ContactFieldKey, boolean>>({
    name: false,
    email: false,
    message: false,
  });

  const handleFieldShakeEnd = useCallback((key: ContactFieldKey) => {
    setFieldShake((s) => (s[key] ? { ...s, [key]: false } : s));
  }, []);

  useEffect(() => {
    if (submitStatus !== "success") return;
    const id = window.setTimeout(() => setSubmitStatus("idle"), 9000);
    return () => window.clearTimeout(id);
  }, [submitStatus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    setErrorBanner(null);

    const errs = validateForm(name, email, message);
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) {
      setFieldShake({
        name: Boolean(errs.name),
        email: Boolean(errs.email),
        message: Boolean(errs.message),
      });
      return;
    }

    const { publicKey, serviceId, templateId, isReady } = getEmailJsConfig();
    if (!isReady) {
      setSubmitStatus("error");
      setErrorBanner(
        "Formulário ainda não configurado: defina VITE_EMAILJS_* no ficheiro .env (vê .env.example).",
      );
      return;
    }

    setSubmitStatus("loading");
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          [emailJsTemplateFields.fromName]: name.trim(),
          [emailJsTemplateFields.fromEmail]: email.trim(),
          [emailJsTemplateFields.message]: message.trim(),
        },
        { publicKey },
      );
      setSubmitStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setTouched({ name: false, email: false, message: false });
    } catch {
      setSubmitStatus("error");
      setErrorBanner(
        "Não foi possível enviar agora. Tenta de novo daqui a pouco ou envia um e-mail direto.",
      );
    }
  };

  const showFieldError = (key: keyof typeof touched) =>
    touched[key] && fieldErrors[key];

  return (
    <section
      id="contato"
      className="scroll-mt-4 border-b border-border/60 px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-14 lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={view}
            transition={{ duration: 0.5, ease: easeOut }}
            className="space-y-6"
          >
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {contactSection.label}
              </p>
              <h2 className="mt-2 font-mono text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {contactSection.title}
              </h2>
              <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
                {contactSection.subtitle}
              </p>
            </div>

            <AvailabilityBadge />

            <div className="flex flex-col gap-3 pt-2">
              <SocialLinkButton
                href={mailto}
                label={personal.email}
                icon={Mail}
                variant="primary"
              />
              <SocialLinkButton href={personal.github} label="GitHub" icon={FaGithub} />
              <SocialLinkButton href={personal.linkedin} label="LinkedIn" icon={FaLinkedin} />
              <SocialLinkButton href={personal.lattes} label="Currículo Lattes" icon={GraduationCap} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={view}
            transition={{ duration: 0.5, ease: easeOut, delay: 0.06 }}
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8"
              noValidate
            >
              <h3 className="font-mono text-sm font-semibold text-foreground">
                Enviar mensagem
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Resposta típica em poucas horas. Campos marcados são validados antes do envio.
              </p>

              <div className="mt-6 space-y-5">
                <ContactFieldGroup
                  fieldKey="name"
                  revealDelay={0}
                  shake={fieldShake.name}
                  onShakeEnd={handleFieldShakeEnd}
                >
                  <label htmlFor="contact-name" className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    Nome
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(ev) => setName(ev.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                    className={fieldBaseClass}
                    placeholder="Como posso te chamar?"
                    aria-invalid={showFieldError("name") ? true : undefined}
                    aria-describedby={showFieldError("name") ? "err-name" : undefined}
                  />
                  <FormFieldError
                    id="err-name"
                    show={Boolean(showFieldError("name"))}
                    text={fieldErrors.name}
                  />
                </ContactFieldGroup>

                <ContactFieldGroup
                  fieldKey="email"
                  revealDelay={0.06}
                  shake={fieldShake.email}
                  onShakeEnd={handleFieldShakeEnd}
                >
                  <label htmlFor="contact-email" className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    E-mail
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                    className={fieldBaseClass}
                    placeholder="seu@email.com"
                    aria-invalid={showFieldError("email") ? true : undefined}
                    aria-describedby={showFieldError("email") ? "err-email" : undefined}
                  />
                  <FormFieldError
                    id="err-email"
                    show={Boolean(showFieldError("email"))}
                    text={fieldErrors.email}
                  />
                </ContactFieldGroup>

                <ContactFieldGroup
                  fieldKey="message"
                  revealDelay={0.12}
                  shake={fieldShake.message}
                  onShakeEnd={handleFieldShakeEnd}
                >
                  <label htmlFor="contact-message" className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    Mensagem
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={message}
                    onChange={(ev) => setMessage(ev.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                    className={cn(fieldBaseClass, "min-h-[7.5rem] resize-y")}
                    placeholder="Conta um pouco do projeto, prazo ou o que buscas…"
                    aria-invalid={showFieldError("message") ? true : undefined}
                    aria-describedby={showFieldError("message") ? "err-msg" : undefined}
                  />
                  <FormFieldError
                    id="err-msg"
                    show={Boolean(showFieldError("message"))}
                    text={fieldErrors.message}
                  />
                </ContactFieldGroup>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full sm:w-auto"
                  disabled={submitStatus === "loading" || submitStatus === "success"}
                >
                  {submitStatus === "loading" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden />
                      Enviando…
                    </>
                  ) : submitStatus === "success" ? (
                    <>
                      <Check className="size-4" aria-hidden />
                      Mensagem enviada!
                    </>
                  ) : (
                    <>
                      <Send className="size-4" aria-hidden />
                      Enviar mensagem
                    </>
                  )}
                </Button>

                <FormBanner show={submitStatus === "error" && Boolean(errorBanner)} variant="error">
                  {errorBanner}
                </FormBanner>

                <FormBanner show={submitStatus === "success"} variant="success">
                  Obrigado! Recebi a tua mensagem e respondo em breve.
                </FormBanner>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
