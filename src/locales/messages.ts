import type { ProjectSlug } from '@/data/projects'
import type { Locale } from '@/lib/locale'
import type { AboutMessages } from '@/locales/about-messages'
import { aboutMessagesEnUS, aboutMessagesPtBR } from '@/locales/about-messages'
import type { ExperienceMessages } from '@/locales/experience-messages'
import {
  experienceMessagesEnUS,
  experienceMessagesPtBR,
} from '@/locales/experience-messages'
import type { SkillsMessages } from '@/locales/skills-messages'
import { skillsMessagesEnUS, skillsMessagesPtBR } from '@/locales/skills-messages'

type DocumentCopy = { title: string; description: string }

export type Messages = {
  nav: {
    skipToContent: string
    home: string
    about: string
    /** `aria-label` do seletor de idioma. */
    localeLabel: string
  }
  localeMenu: { ptBr: string; enUs: string }
  hero: {
    tag: string
    online: string
    cta: string
    nameAria: string
  }
  projects: {
    title: string
    /** `aria-label` do vídeo; `{name}` = nome do projeto. */
    videoLabel: string
    private: string
    links: { site: string; playStore: string; appStore: string }
    items: Record<ProjectSlug, { short: string; description: string }>
  }
  contact: {
    title: string
    badge: string
    copyEmail: string
    copied: string
    copyFailed: string
    linkedin: string
    github: string
  }
  footer: {
    whoamiOut: string
    /** Seguido de `HH:MM:SS`. */
    uptimePrefix: string
    exit: string
  }
  about: AboutMessages
  experience: ExperienceMessages
  skills: SkillsMessages
  /** `<title>` e `meta description` por página. */
  document: { home: DocumentCopy; about: DocumentCopy }
}

export const messages: Record<Locale, Messages> = {
  'pt-BR': {
    nav: {
      skipToContent: 'Pular para o conteúdo',
      home: 'Início',
      about: 'Sobre',
      localeLabel: 'Idioma',
    },
    localeMenu: { ptBr: 'PT', enUs: 'EN' },
    hero: {
      tag: 'IANLGNK :: PORTFOLIO',
      online: 'Online',
      cta: 'Sobre mim →',
      nameAria: 'Ian Langkammer',
    },
    projects: {
      title: 'Projetos :: 04',
      videoLabel: 'Vídeo de apresentação do {name}',
      private: 'Sob demanda · privado',
      links: { site: 'Visitar site', playStore: 'Google Play', appStore: 'App Store' },
      items: {
        'avance-trainer': {
          short: 'App + painel',
          description:
            'App em que o treinador acompanha seus alunos: treinos, avaliações corporais, nutrição, engajamento e cobrança. Inclui app mobile (treinador e aluno), landing e painel web do treinador, backend serverless e IA (Gemini) nos clientes.',
        },
        'pedro-porto-design': {
          short: 'Portfólio + loja',
          description:
            'Arquivo visual e portfólio do designer Pedro Henrique Porto, reconstruído em código, mais uma loja com checkout via Mercado Pago e backend em Cloud Functions.',
        },
        'beerpass-club': {
          short: 'App Android/iOS',
          description:
            'App do cliente da Beerpass Club, desenvolvido por Ian e publicado no Android e no iOS.',
        },
        inkaboxe: {
          short: 'Reconhecimento facial',
          description:
            'Sistema completo de reconhecimento facial: uma API local em Python roda no próprio tablet para cadastro e verificação sem depender de cloud, e uma SPA de gestão em React, instalável como PWA no tablet, também faz o reconhecimento. Backend em Cloud Functions.',
        },
      },
    },
    contact: {
      title: 'Vamos conversar?',
      badge: 'Disponível para freelas e oportunidades',
      copyEmail: 'Copiar e-mail',
      copied: 'E-mail copiado!',
      copyFailed: 'Não foi possível copiar. Selecione o e-mail abaixo.',
      linkedin: 'LinkedIn',
      github: 'GitHub',
    },
    footer: {
      whoamiOut: 'ianlgnk — engenheiro de software sênior e arquiteto · BH, MG',
      uptimePrefix: 'sessão ativa há',
      exit: '[ SESSÃO ENCERRADA ]',
    },
    about: aboutMessagesPtBR,
    experience: experienceMessagesPtBR,
    skills: skillsMessagesPtBR,
    document: {
      home: {
        title: 'Ian Langkammer · Portfólio',
        description:
          'Portfólio de Ian Langkammer — Engenheiro de Software e Arquiteto Sênior, Belo Horizonte.',
      },
      about: {
        title: 'Sobre · Ian Langkammer',
        description:
          'Trajetória, experiência e skills de Ian Langkammer, Engenheiro de Software e Arquiteto Sênior.',
      },
    },
  },
  'en-US': {
    nav: {
      skipToContent: 'Skip to content',
      home: 'Home',
      about: 'About',
      localeLabel: 'Language',
    },
    localeMenu: { ptBr: 'PT', enUs: 'EN' },
    hero: {
      tag: 'IANLGNK :: PORTFOLIO',
      online: 'Online',
      cta: 'About me →',
      nameAria: 'Ian Langkammer',
    },
    projects: {
      title: 'Projects :: 04',
      videoLabel: '{name} presentation video',
      private: 'On request · private',
      links: { site: 'Visit site', playStore: 'Google Play', appStore: 'App Store' },
      items: {
        'avance-trainer': {
          short: 'App + panel',
          description:
            'App where trainers follow their students: workouts, body assessments, nutrition, engagement and billing. Includes a mobile app (trainer and student), a landing page and web panel for trainers, a serverless backend and AI (Gemini) in the clients.',
        },
        'pedro-porto-design': {
          short: 'Portfolio + shop',
          description:
            "Visual archive and portfolio of designer Pedro Henrique Porto, rebuilt in code, plus a shop with Mercado Pago checkout and a Cloud Functions backend.",
        },
        'beerpass-club': {
          short: 'Android/iOS app',
          description:
            "Beerpass Club's customer app, built by Ian and published on Android and iOS.",
        },
        inkaboxe: {
          short: 'Face recognition',
          description:
            'A complete face recognition system: a local Python API runs on the tablet itself for enrollment and verification without relying on the cloud, and a React management SPA, installable as a PWA on the tablet, also performs the recognition. Cloud Functions backend.',
        },
      },
    },
    contact: {
      title: "Let's talk?",
      badge: 'Available for freelance and opportunities',
      copyEmail: 'Copy email',
      copied: 'Email copied!',
      copyFailed: 'Could not copy. Select the email below.',
      linkedin: 'LinkedIn',
      github: 'GitHub',
    },
    footer: {
      whoamiOut: 'ianlgnk — senior software engineer & architect · BH, MG',
      uptimePrefix: 'session active for',
      exit: '[ SESSION ENDED ]',
    },
    about: aboutMessagesEnUS,
    experience: experienceMessagesEnUS,
    skills: skillsMessagesEnUS,
    document: {
      home: {
        title: 'Ian Langkammer · Portfolio',
        description:
          'Portfolio of Ian Langkammer — Senior Software Engineer & Architect, Belo Horizonte.',
      },
      about: {
        title: 'About · Ian Langkammer',
        description:
          'Background, experience and skills of Ian Langkammer, Senior Software Engineer & Architect.',
      },
    },
  },
}
