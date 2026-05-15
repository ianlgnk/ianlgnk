/**
 * Delays (`staggerMs`) passados a `ScrambleText` na troca de locale.
 * `SCRAMBLE_STEP_MS` é 0: todos os textos começam o scramble ao mesmo tempo.
 */
export const NAV_LINK_COUNT = 6

/** Millis extra antes do início do scramble (0 = sem onda / todos juntos). */
export const SCRAMBLE_STEP_MS = 0

/** Duração da revelação letra-a-letra de um `ScrambleText`. */
export const SCRAMBLE_DURATION_MS = 780

/** Delay em ms para a “linha” da grelha (sempre 0 com `SCRAMBLE_STEP_MS === 0`). */
export const scrambleRow = (row: number) => row * SCRAMBLE_STEP_MS

export const scrambleStagger = {
  navLink: (index: number) => scrambleRow(index),
  heroRole: scrambleRow(0),
  heroBio1: scrambleRow(1),
  heroBio2: scrambleRow(2),
  heroCtaProjects: scrambleRow(3),
  heroCtaCv: scrambleRow(4),
  aboutSectionLabel: scrambleRow(0),
  aboutSummary: scrambleRow(1),
  aboutMetric0: scrambleRow(2),
  aboutMetric1: scrambleRow(3),
  aboutMetric2: scrambleRow(4),
  aboutEdu0Title: scrambleRow(5),
  aboutEdu0Institution: scrambleRow(6),
  aboutEdu0Period: scrambleRow(7),
  aboutEdu1Title: scrambleRow(8),
  aboutEdu1Institution: scrambleRow(9),
  aboutEdu1Period: scrambleRow(10),
  aboutEdu2Title: scrambleRow(11),
  aboutEdu2Institution: scrambleRow(12),
  aboutEdu2Period: scrambleRow(13),
  experienceTitle: scrambleRow(0),
  experienceSubtitle: scrambleRow(1),
  projectsTitle: scrambleRow(0),
  projectsSubtitle: scrambleRow(1),
  contactLabel: scrambleRow(0),
  contactTitle: scrambleRow(1),
  contactSubtitle: scrambleRow(2),
  contactBadge: scrambleRow(3),
  contactFormTitle: scrambleRow(4),
  skillsSectionTitle: scrambleRow(0),
  skillsSectionSubtitle: scrambleRow(1),
  skillsFilterAll: scrambleRow(2),
  skillsFilterFrontend: scrambleRow(3),
  skillsFilterBackend: scrambleRow(4),
  skillsFilterTools: scrambleRow(5),
  skillsFilterMethodologies: scrambleRow(6),
  skillsCategoryLanguagesTitle: scrambleRow(7),
  skillsCategoryLanguagesCount: scrambleRow(8),
  skillsCategoryFrontendTitle: scrambleRow(9),
  skillsCategoryFrontendCount: scrambleRow(10),
  skillsCategoryBackendTitle: scrambleRow(11),
  skillsCategoryBackendCount: scrambleRow(12),
  skillsCategoryToolsTitle: scrambleRow(13),
  skillsCategoryToolsCount: scrambleRow(14),
  skillsCategoryMethodologiesTitle: scrambleRow(15),
  skillsCategoryMethodologiesCount: scrambleRow(16),
} as const

/** Índice base só para documentação / próximos slots (não afeta delay com step 0). */
const CONTENT_SLOT_START = 17

export function contentStagger(offset: number) {
  return (CONTENT_SLOT_START + offset) * SCRAMBLE_STEP_MS
}

export const scrambleContent = {
  experienceRoles: contentStagger(0),
  experienceMeta: contentStagger(1),
  experienceBadges: contentStagger(2),
  experienceRespToggle: contentStagger(3),
  experienceRespBodies: contentStagger(4),
  projectTitles: contentStagger(5),
  projectDescriptions: contentStagger(6),
  projectStatus: contentStagger(7),
  projectFeaturedLabel: contentStagger(8),
  academicSectionTitle: contentStagger(9),
  academicProjectTitles: contentStagger(11),
  academicProjectDescriptions: contentStagger(12),
  academicProjectStatus: contentStagger(13),
  contactFormHint: contentStagger(14),
  contactFieldLabels: contentStagger(15),
  contactPlaceholders: contentStagger(16),
  contactSubmit: contentStagger(17),
  contactBanners: contentStagger(18),
  contactSocial: contentStagger(19),
  footerCredit: contentStagger(20),
  footerStackWith: contentStagger(21),
  footerStackAnd: contentStagger(22),
  collegeGithubSectionTitle: contentStagger(23),
  collegeGithubIntro: contentStagger(24),
  collegeGithubProjectTitles: contentStagger(25),
  collegeGithubProjectDescriptions: contentStagger(26),
  collegeGithubProjectStatus: contentStagger(27),
  academicTechnicalSectionTitle: contentStagger(28),
  academicTechnicalIntro: contentStagger(29),
} as const

/** Próximo índice de slot livre (convénio; delays continuam 0). */
export const SCRAMBLE_NEXT_FREE_SLOT = CONTENT_SLOT_START + 30
