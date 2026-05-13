import type { Locale } from '@/components/locale-provider'

import type { AboutMessages } from '@/locales/about-messages'
import { aboutMessagesEnUS, aboutMessagesPtBR } from '@/locales/about-messages'
import type { ContactMessages } from '@/locales/contact-messages'
import { contactMessagesEnUS, contactMessagesPtBR } from '@/locales/contact-messages'
import type { ExperienceMessages } from '@/locales/experience-messages'
import {
  experienceMessagesEnUS,
  experienceMessagesPtBR,
} from '@/locales/experience-messages'
import type { ProjectsMessages } from '@/locales/projects-messages'
import {
  projectsMessagesEnUS,
  projectsMessagesPtBR,
} from '@/locales/projects-messages'
import type { SkillsMessages } from '@/locales/skills-messages'
import {
  skillsMessagesEnUS,
  skillsMessagesPtBR,
} from '@/locales/skills-messages'

export type Messages = {
  nav: {
    sectionLabelDesktop: string
    sectionLabelMobile: string
    openMenu: string
    closeMenu: string
    links: {
      hero: string
      about: string
      experience: string
      projects: string
      skills: string
      contact: string
    }
  }
  theme: {
    ariaUseLight: string
    ariaUseDark: string
  }
  localeMenu: {
    ariaButton: string
    ptBr: string
    enUs: string
  }
  hero: {
    roleTitle: string
    bioLine1: string
    bioLine2: string
    ctaProjects: string
    ctaCv: string
    ariaGithub: string
    ariaLinkedin: string
    ariaLattes: string
    typewriterPhrases: readonly [string, string, string, string]
  }
  about: AboutMessages
  experience: ExperienceMessages
  projects: ProjectsMessages
  contact: ContactMessages
  skills: SkillsMessages
  footer: {
    /** `{name}` = portfolio owner. Text before the heart (heart is styled in `Footer`). */
    creditLead: string
    /** Text after the heart (leading space if needed). */
    creditTrail: string
    stackWith: string
    stackAnd: string
    navAria: string
  }
  /** `<title>` e `meta name="description"` (SEO / partilhas). */
  document: {
    title: string
    description: string
  }
}

export const messages: Record<Locale, Messages> = {
  'pt-BR': {
    nav: {
      sectionLabelDesktop: 'Principal',
      sectionLabelMobile: 'Mobile',
      openMenu: 'Abrir menu',
      closeMenu: 'Fechar menu',
      links: {
        hero: 'Início',
        about: 'Sobre',
        experience: 'Experiência',
        projects: 'Projetos',
        skills: 'Habilidades',
        contact: 'Contato',
      },
    },
    theme: {
      ariaUseLight: 'Ativar tema claro',
      ariaUseDark: 'Ativar tema escuro',
    },
    localeMenu: {
      ariaButton: 'Escolher idioma do site',
      ptBr: 'Português (Brasil)',
      enUs: 'English (United States)',
    },
    hero: {
      roleTitle: 'Engenheiro de Software Full Stack',
      bioLine1: 'Estudando programação desde os 15 anos.',
      bioLine2: 'Desenvolvendo soluções Web/Mobile desde os 19!',
      ctaProjects: 'Ver Projetos',
      ctaCv: 'Baixar CV',
      ariaGithub: 'GitHub',
      ariaLinkedin: 'LinkedIn',
      ariaLattes: 'Currículo Lattes',
      typewriterPhrases: [
        'Engenheiro de Software Full Stack',
        'Desenvolvedor React',
        'Engenheiro Node.js',
        'Desenvolvedor Web/Mobile',
      ],
    },
    about: aboutMessagesPtBR,
    experience: experienceMessagesPtBR,
    projects: projectsMessagesPtBR,
    contact: contactMessagesPtBR,
    skills: skillsMessagesPtBR,
    footer: {
      creditLead: '© 2026 {name} · Feito com ',
      creditTrail: 'em Belo Horizonte',
      stackWith: 'com',
      stackAnd: 'e',
      navAria: 'Mapa do site',
    },
    document: {
      title: 'Ian Langkammer · Portfólio',
      description:
        'Portfólio de Ian Langkammer — Engenheiro de Software Full Stack, Belo Horizonte.',
    },
  },
  'en-US': {
    nav: {
      sectionLabelDesktop: 'Main',
      sectionLabelMobile: 'Mobile',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      links: {
        hero: 'Home',
        about: 'About',
        experience: 'Experience',
        projects: 'Projects',
        skills: 'Skills',
        contact: 'Contact',
      },
    },
    theme: {
      ariaUseLight: 'Switch to light theme',
      ariaUseDark: 'Switch to dark theme',
    },
    localeMenu: {
      ariaButton: 'Choose site language',
      ptBr: 'Português (Brasil)',
      enUs: 'English (United States)',
    },
    hero: {
      roleTitle: 'Full Stack Software Engineer',
      bioLine1: "I've been studying programming since I was 15.",
      bioLine2: "I've been building Web/Mobile solutions since I was 19!",
      ctaProjects: 'View projects',
      ctaCv: 'Download CV',
      ariaGithub: 'GitHub',
      ariaLinkedin: 'LinkedIn',
      ariaLattes: 'Lattes CV',
      typewriterPhrases: [
        'Full Stack Software Engineer',
        'React Developer',
        'Node.js Engineer',
        'Web/Mobile Developer',
      ],
    },
    about: aboutMessagesEnUS,
    experience: experienceMessagesEnUS,
    projects: projectsMessagesEnUS,
    contact: contactMessagesEnUS,
    skills: skillsMessagesEnUS,
    footer: {
      creditLead: '© 2026 {name} · Made with ',
      creditTrail: 'in Belo Horizonte',
      stackWith: 'with',
      stackAnd: 'and',
      navAria: 'Site map',
    },
    document: {
      title: 'Ian Langkammer · Portfolio',
      description:
        'Portfolio of Ian Langkammer — Full Stack Software Engineer, Belo Horizonte.',
    },
  },
}
