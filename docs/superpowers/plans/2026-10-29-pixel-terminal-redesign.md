# Redesign pixel/terminal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reconstruir o portfólio como duas páginas (`/` e `/sobre/`) na estética pixel/terminal vinho + rosa, mais rápidas que o site atual, sem EmailJS, tema claro nem projetos antigos.

**Architecture:** Duas entradas HTML estáticas (MPA, como o repositório `pedroportodesign`): `index.html` carrega `src/main.tsx` (Home) e `sobre/index.html` carrega `src/sobre.tsx` (Sobre); ambas montam o mesmo `LocaleProvider` via `src/mount.tsx`. Sem roteador, sem `framer-motion`: animações em CSS (`@keyframes`, `grid-template-rows`) mais dois hooks pequenos (`useReducedMotion`, `useInView`). A lógica que não é visual vive em funções puras testadas com Vitest.

**Tech Stack:** Vite 8, React 19, TypeScript, Tailwind 4 (`@theme` em `src/index.css`), Vitest (novo, só dev), clsx + tailwind-merge. Node 24, yarn 1.

**Spec:** `docs/superpowers/specs/2026-10-29-pixel-terminal-redesign-design.md` (mockups em `docs/superpowers/specs/2026-10-29-pixel-terminal-redesign-mockups/`; leia os dois antes de começar).

## Global Constraints

- Paleta única escura: fundo `#1b1012`, texto `#eadfcd`, secundário `#8f7f78`, destaque `#ff3d7f`, linhas da grade `rgba(234,223,205,.07)`, divisórias `rgba(234,223,205,.14–.22)`. Rosa é o único destaque; verde sai. Contrastes medidos: rosa sobre fundo 5,52:1, secundário sobre fundo 4,86:1.
- Tudo em monoespaçada, caixa alta nos rótulos/títulos, `letter-spacing` ~`.1em`–`.18em`; texto corrido em caixa normal. Grade de fundo de 22 px. Blocos de pixels ~7 px.
- Cores como variáveis CSS semânticas (`--background`, `--foreground`, `--muted-foreground`, `--accent`, `--border`); **sem** provider de tema, sem `localStorage` de tema (`ianlgnk-theme`), sem `view transition` de tema.
- JS inicial da Home ≤ **106 kB gzip** (medido por `scripts/initial-js-size.mjs`); CLS = 0; Lighthouse mobile Performance ≥ 90.
- `framer-motion` **não** é usado (removido). Sem canvas contínuo.
- `/` e `/sobre/` funcionam como link direto e com refresh em `https://ianlgnk.github.io/ianlgnk/` (`base: '/ianlgnk/'` via `VITE_BASE_PATH`); todos os links internos passam por `withBase`.
- Idiomas en-US (padrão da primeira visita) e pt-BR; chave `ianlgnk-locale` em `localStorage`; todo texto novo existe nos dois idiomas.
- `prefers-reduced-motion: reduce` desliga animação contínua, digitação e reveals (estado final direto). Contraste AA, skip link, foco visível, ordem de foco lógica.
- Dev server porta **2000**; Node 24 (`.nvmrc`); `yarn lint` e `yarn build` passam sem `--ignore-engines`.
- Trabalho direto na branch `main`, um commit por tarefa, gitmoji + Conventional Commits em pt-BR (commitlint). Não fazer push.
- O nome do projeto 2 é **Pedro Porto Design**. O projeto 4 é **InkaBoxe**. O Netracker não existe mais.

## Review Focus

Entradas/condições que o spec implica mas as tarefas "felizes" não exercitariam; cada uma tem o teste na tarefa dona:

1. **Base path de produção:** links como `/sobre/` quebram em `/ianlgnk/`; esperado: `withBase` sempre prefixa a base (Task 1).
2. **Clipboard indisponível ou negado** (HTTP, permissão, navegador antigo): esperado: o botão avisa e o e-mail continua visível e selecionável, sem erro silencioso (Tasks 1 e 8).
3. **`localStorage` com idioma inválido ou ausente** ao abrir `/sobre/` direto: esperado: cai em en-US (Task 1).
4. **Conteúdo preso invisível** quando `IntersectionObserver` não existe ou `prefers-reduced-motion` está ligado: esperado: tudo já visível (Task 1, usado nas Tasks 4–10).
5. **"LANGKAMMER" estourando a largura** em 320–375 px: esperado: sem scroll horizontal e nome legível (Task 6).
6. Contador de uptime com tempo negativo/NaN e intervalo vazando fora da viewport (Tasks 1 e 9); abrir/fechar do acordeão e deep link por hash (Task 7).
7. Paridade de chaves entre idiomas: um texto faltando em um idioma não pode passar despercebido (Task 3).

---

## Estrutura de arquivos

| Caminho | Responsabilidade |
| --- | --- |
| `index.html`, `sobre/index.html` | Entradas das duas páginas (metatags, fonte, favicon) |
| `src/main.tsx`, `src/sobre.tsx`, `src/mount.tsx` | Pontos de entrada e montagem comum (StrictMode + `LocaleProvider`) |
| `src/pages/Home.tsx`, `src/pages/About.tsx` | Composição de cada página |
| `src/index.css` | Tokens, grade, dot-matrix, animações, reduced-motion |
| `src/lib/{skill-level,uptime,copy-text,base-url,reveal,locale}.ts` (+ `.test.ts`) | Funções puras |
| `src/lib/{use-reduced-motion,use-in-view}.ts` | Hooks mínimos |
| `src/components/{Header,LanguageToggle,Contact,TerminalFooter,AvailabilityBadge,ScrambleText,DocumentMetaSync,locale-provider}.tsx` | Shell compartilhado |
| `src/components/hero/{Hero,HeroName,HeroLog}.tsx` | Hero A |
| `src/components/projects/{ProjectLog,ProjectMedia,toggle-open}.tsx/.ts` | Log expansível |
| `src/components/about/{GitLog,AboutBlock,SkillBars}.tsx` | Página Sobre |
| `src/data/{projects,experience,skills,personal}.ts` | Dados (projects/experience/skills reescritos) |
| `src/locales/{messages,about-messages,experience-messages,skills-messages,scramble-stagger,use-messages}.ts` | Textos (projects/contact/footer entram em `messages.ts`) |
| `scripts/initial-js-size.mjs`, `scripts/og-image.svg` | Orçamento de JS e fonte da OG image |

Apagados no fim (Task 11): `About/Experience/Projects/Skills/Navbar/Footer/Contact/Hero/SectionHeader/ThemeToggle` antigos, `theme-provider`, `hero/{HeroParticles,HeroTerminal,HeroTypewriter}`, `ui/button.tsx`, `data/{college-github-repos,skillBadges,about,contact}`, `locales/{projects-messages,contact-messages}`, `lib/motion-features.ts`, `public/college-projects/`, `public/favicon.svg` (mockup).

---

### Task 1: Vitest e funções puras

**Files:**
- Modify: `package.json` (devDependency `vitest`, script `"test": "vitest run"`), `vite.config.ts` (importar `defineConfig` de `vitest/config`; `test: { environment: 'node', include: ['src/**/*.test.ts'] }`)
- Create: `src/lib/skill-level.ts`, `uptime.ts`, `copy-text.ts`, `base-url.ts`, `reveal.ts`, `locale.ts` e um `.test.ts` ao lado de cada

**Interfaces:**
- Produces:
  - `levelSquares(proficiency: number): number` — `Math.round(p / 10)` limitado a 0–10; NaN → 0.
  - `formatUptime(totalSeconds: number): string` — `HH:MM:SS`, trunca decimais; negativo/NaN → `00:00:00`.
  - `copyText(text: string): Promise<boolean>` — usa `navigator.clipboard.writeText`; `false` se a API não existir ou rejeitar; sem fallback `execCommand`.
  - `withBase(path: string, base?: string): string` — junta base e caminho sem barras duplicadas; `base` padrão `import.meta.env.BASE_URL`.
  - `initialRevealed(reduced: boolean, hasIntersectionObserver: boolean): boolean` — `true` se `reduced` ou não houver observer.
  - `type Locale = 'pt-BR' | 'en-US'`, `DEFAULT_LOCALE: Locale = 'en-US'`, `isLocale(v: unknown): v is Locale`, `resolveLocale(raw: string | null): Locale`.

- [ ] **Step 1: Instalar e configurar o Vitest** — `yarn add -D vitest`; ajustar `vite.config.ts` como acima (manter plugins, `base`, `alias`). Run: `yarn test` → Expected: "No test files found" (exit 0 com `--passWithNoTests` no script, ou exit 1 aceitável até o próximo step).
- [ ] **Step 2: Escrever os testes que falham.** Nomes e asserções:
  - `skill-level.test.ts`: `levelSquares(95)` = 10; `(80)` = 8; `(45)` = 5; `(0)` = 0; `(130)` = 10; `(-5)` = 0; `(NaN)` = 0.
  - `uptime.test.ts`: `formatUptime(0)` = `"00:00:00"`; `(207)` = `"00:03:27"`; `(3661)` = `"01:01:01"`; `(12.9)` = `"00:00:12"`; `(-4)` e `(NaN)` = `"00:00:00"`.
  - `copy-text.test.ts` (com `vi.stubGlobal('navigator', ...)`): resolve `true` e chama `writeText` com o texto; resolve `false` quando `writeText` rejeita; resolve `false` quando `navigator.clipboard` é `undefined`.
  - `base-url.test.ts`: `withBase('sobre/', '/')` = `/sobre/`; `withBase('sobre/', '/ianlgnk/')` = `/ianlgnk/sobre/`; `withBase('', '/ianlgnk/')` = `/ianlgnk/`; `withBase('/sobre/', '/ianlgnk/')` = `/ianlgnk/sobre/`; `withBase('#projetos', '/ianlgnk/')` = `/ianlgnk/#projetos`.
  - `reveal.test.ts`: `initialRevealed(true, true)` = true; `(false, false)` = true; `(false, true)` = false.
  - `locale.test.ts`: `resolveLocale(null)` = `'en-US'`; `('pt-BR')` = `'pt-BR'`; `('en-US')` = `'en-US'`; `('xx')` e `('')` = `'en-US'`.
- [ ] **Step 3: Rodar e ver falhar.** Run: `yarn test` → Expected: FAIL (módulos não existem).
- [ ] **Step 4: Implementar os seis módulos** com as assinaturas acima, um arquivo cada.
- [ ] **Step 5: Rodar.** Run: `yarn test` → Expected: todos PASS; `yarn lint` limpo.
- [ ] **Step 6: Commit** — `git add -A && git commit -m "✅ test: configura vitest e funções puras (nível, uptime, clipboard, base, locale)"`

### Task 2: Camada de dados

**Files:**
- Modify (reescrever): `src/data/projects.ts`, `src/data/experience.ts`, `src/data/skills.ts`
- Test: `src/data/projects.test.ts`, `src/data/experience.test.ts`, `src/data/skills.test.ts`

**Interfaces:**
- Produces (`projects.ts`):
  ```ts
  export type ProjectSlug = 'avance-trainer' | 'pedro-porto-design' | 'beerpass-club' | 'inkaboxe'
  export type ProjectLink = { kind: 'site' | 'play-store' | 'app-store'; href: string }
  export type ProjectMediaSource =
    | { type: 'image'; src: string; alt: string }
    | { type: 'video'; src: string; poster: string }
  export type Project = {
    slug: ProjectSlug; name: string; tags: readonly string[]
    links: readonly ProjectLink[]; isPrivate?: boolean; media?: ProjectMediaSource
  }
  export const projects: readonly Project[]   // ordem: avance-trainer, pedro-porto-design, beerpass-club, inkaboxe
  ```
- Produces (`experience.ts`): `type ExperienceId = 'beerpass-senior' | 'beerpass-pleno' | 'saude-pleno' | 'saude-junior' | 'visao-junior'`; `type ExperienceEntry = { id: ExperienceId; company: string; technologies: readonly string[]; current: boolean }`; `experience: readonly ExperienceEntry[]` mais recente primeiro. Sem `logoSrc`/`websiteUrl`.
- Produces (`skills.ts`): mantém `skillCategories` e `SkillEntry = { name: string; proficiency: number }` (remover `simpleIconSlug`/`simpleIconHex`, `SkillFilterId`, `SKILL_FILTER_IDS`).

- [ ] **Step 1: Testes que falham.** `projects.test.ts`: `projects.map(p => p.slug)` igual a `['avance-trainer','pedro-porto-design','beerpass-club','inkaboxe']`; nenhum slug `netracker`; `beerpass-club` tem links `play-store` = `https://play.google.com/store/apps/details?id=com.beerpass.clientapp&hl=pt_BR` e `app-store` = `https://apps.apple.com/br/app/beerpass-club/id1605400165`; `avance-trainer` tem `site` = `https://avancetrainer.com`; `pedro-porto-design` tem `site` = `https://pedroportodesign.online`; `inkaboxe` tem `isPrivate === true` e `links` vazio; todo `href` começa com `https://`; nenhum projeto tem `media` (mock). `experience.test.ts`: 5 entradas na ordem dos ids acima; só a primeira com `current: true`. `skills.test.ts`: toda `proficiency` entre 0 e 100; nenhum nome duplicado.
- [ ] **Step 2:** Run `yarn test` → Expected: FAIL.
- [ ] **Step 3: Reescrever os três arquivos** conforme as interfaces (tags do spec §6.1: Avance = Expo/React Native, React 19, Firebase, Gemini; Pedro = React 19, TypeScript, Tailwind, Firebase, Mercado Pago; Beerpass = React Native, Expo; InkaBoxe = Python, FastAPI, DeepFace, React, PWA, Firebase; tecnologias da experiência e níveis das skills: copiar dos arquivos atuais).
- [ ] **Step 4:** Run `yarn test` → Expected: PASS. (O restante do app quebra o typecheck até as próximas tarefas; rodar só `yarn test`.)
- [ ] **Step 5: Commit** — `git add -A && git commit -m "♻️ refactor: dados de projetos, experiência e skills para o redesign"`

### Task 3: Textos (i18n) com paridade

**Files:**
- Modify: `src/locales/messages.ts` (novo `Messages`), `about-messages.ts`, `experience-messages.ts`, `skills-messages.ts`
- Test: `src/locales/messages.test.ts`

**Interfaces:**
- Produces `Messages` com estas chaves (todas `string`, exceto onde indicado), exportado junto com `messages: Record<Locale, Messages>`:
  - `nav`: `skipToContent`, `home`, `about`, `localeLabel`
  - `localeMenu`: `ptBr`, `enUs`
  - `hero`: `tag` (`IANLGNK :: PORTFOLIO`), `online`, `cta` (`SOBRE MIM →` / `ABOUT ME →`), `nameAria`
  - `projects`: `title` (`PROJETOS :: 04`), `private`, `links: { site, playStore, appStore }`, `items: Record<ProjectSlug, { short: string; description: string }>`
  - `contact`: `title`, `badge`, `copyEmail`, `copied`, `copyFailed`, `linkedin`, `github`
  - `footer`: `whoamiOut`, `uptimePrefix` (ex.: `sessão ativa há`), `exit`
  - `about`: `title`, `logLabel`, `skillsTitle`, `bioTitle`, `downloadCv`, `backHome`, mais as strings existentes de resumo/educação aproveitadas de `about-messages.ts`
  - `document`: `home: { title; description }`, `about: { title; description }`
- Consumes: `ProjectSlug` (Task 2), `Locale` (Task 1).

- [ ] **Step 1: Teste que falha.** `messages.test.ts`: função `flatten(obj)` devolve os caminhos de chave; asserções: `flatten(messages['pt-BR'])` tem as mesmas chaves que `flatten(messages['en-US'])`; nenhuma string vazia nos dois (exceto as que o spec marca como placeholder: nenhuma); `messages['en-US'].projects.items['beerpass-club'].description` contém `Beerpass Club`; `document.home.title` difere de `document.about.title`.
- [ ] **Step 2:** Run `yarn test src/locales` → Expected: FAIL.
- [ ] **Step 3: Escrever os textos** nos dois idiomas. Descrições: spec §6.1 (pt-BR) e a versão en-US escrita por você; Beerpass com a frase neutra do spec §12. Reaproveitar o texto existente de experiência/educação/skills; remover métricas. Deletar `projects-messages.ts` e `contact-messages.ts` (movidos para `messages.ts`).
- [ ] **Step 4:** Run `yarn test` → Expected: PASS.
- [ ] **Step 5: Commit** — `git add -A && git commit -m "🌐 feat: textos pt-BR/en-US do redesign com teste de paridade"`

### Task 4: Fundação visual (tokens, hooks, ScrambleText) e remoção do tema

**Files:**
- Modify: `src/index.css`, `src/components/ScrambleText.tsx`, `src/components/locale-provider.tsx`, `src/components/AvailabilityBadge.tsx`
- Create: `src/lib/use-reduced-motion.ts`, `src/lib/use-in-view.ts`
- Delete: `src/components/theme-provider.tsx`, `ThemeToggle.tsx`

**Interfaces:**
- Produces:
  - `useReducedMotion(): boolean` — lê `matchMedia('(prefers-reduced-motion: reduce)')` e reage a mudanças.
  - `useInView<T extends Element>(options?: { once?: boolean; rootMargin?: string }): { ref: RefObject<T | null>; inView: boolean }` — estado inicial vem de `initialRevealed(useReducedMotion(), typeof IntersectionObserver !== 'undefined')`.
  - Classes/utilitários CSS em `src/index.css`: `.grid-bg` (grade 22 px), `.dotmatrix` (texto em pontos: `background: radial-gradient(...) ; background-clip: text; color: transparent`), `.cursor` (retângulo rosa piscando), `.px-bar` (barra de 10 quadrados via variável `--level`), `@keyframes ignite`, `@keyframes blink`; todas as animações envolvidas em `@media (prefers-reduced-motion: no-preference)`.
  - `LocaleProvider` usa `resolveLocale`/`DEFAULT_LOCALE` de `src/lib/locale.ts`.
- Consumes: `initialRevealed`, `resolveLocale` (Task 1).

- [ ] **Step 1:** Reescrever `src/index.css`: `@import 'tailwindcss'`; `:root` com os tokens semânticos da paleta; `@theme` mapeando para `--color-*`; `font-family` mono no `body`; remover tudo de tema claro/`.dark`, *view transition* e verde. Manter `scroll-behavior: smooth` desligado em reduced motion.
- [ ] **Step 2:** Criar os dois hooks e portar `ScrambleText` para `useReducedMotion` próprio (sem `framer-motion`). Atualizar `LocaleProvider` e `AvailabilityBadge` (pílula rosa, ponto pulsante só com `no-preference`).
- [ ] **Step 3:** Apagar `theme-provider.tsx` e `ThemeToggle.tsx`; remover o script de tema do `index.html` (só o de idioma permanece, ajustado no Task 5).
- [ ] **Step 4: Verificar.** Run: `yarn test && yarn lint` → Expected: testes PASS; lint limpo (o build completo só volta a passar na Task 5). Conferir os contrastes com o snippet do spec: rosa/fundo ≥ 5,5, secundário/fundo ≥ 4,8.
- [ ] **Step 5: Commit** — `git add -A && git commit -m "💄 feat: tokens vinho+rosa, grade, dot-matrix e hooks de movimento; remove tema claro"`

### Task 5: Casca de duas páginas, cabeçalho e metadados

**Files:**
- Modify: `index.html`, `vite.config.ts` (`appType: 'mpa'`, `build.rollupOptions.input = { main: 'index.html', sobre: 'sobre/index.html' }` com `import.meta.dirname`, remover `__dirname`), `src/main.tsx`, `src/components/DocumentMetaSync.tsx`
- Create: `sobre/index.html`, `src/sobre.tsx`, `src/mount.tsx`, `src/pages/Home.tsx` (placeholder), `src/pages/About.tsx` (placeholder), `src/components/Header.tsx`, `src/components/LanguageToggle.tsx` (reescrito, dois botões `PT | EN` com `aria-pressed`)

**Interfaces:**
- Produces:
  - `mount(page: ReactNode): void` em `src/mount.tsx`: renderiza em `#root` com `StrictMode` + `LocaleProvider`.
  - `DocumentMetaSync({ page }: { page: 'home' | 'about' })`: atualiza `document.title`, `meta[name=description]` e `<html lang>` a partir de `messages[locale].document[page]`.
  - `Header({ current }: { current: 'home' | 'about' })`: handle `IANLGNK` (link para `withBase('')`), link `SOBRE`/`ABOUT` (`withBase('sobre/')`, `aria-current="page"` quando `current==='about'`), `LanguageToggle`. Skip link `#main-content` antes do header.
- Consumes: `withBase`, `messages`, `LocaleProvider`.

- [ ] **Step 1:** Criar as duas entradas HTML (mesmo `<head>`: charset, viewport, `theme-color #1b1012`, OG/Twitter, fonte via Google Fonts só **JetBrains Mono** pesos 400;500;700, favicon `%BASE_URL%favicon.svg`, script curto que aplica `lang` a partir de `localStorage` com a mesma regra de `resolveLocale`; títulos/descrições diferentes por página).
- [ ] **Step 2:** Implementar `mount`, `main.tsx`, `sobre.tsx`, `DocumentMetaSync`, `Header`, `LanguageToggle` e as duas páginas placeholder (`<Header/>` + `<main id="main-content">`).
- [ ] **Step 3: Verificar roteamento de produção.** Run: `VITE_BASE_PATH=/ianlgnk/ yarn build && yarn preview --port 2001 &` e depois `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:2001/ianlgnk/ http://localhost:2001/ianlgnk/sobre/` → Expected: `200` e `200`. Em `yarn dev` (porta 2000): `http://localhost:2000/sobre/` abre a página Sobre. Encerrar o preview.
- [ ] **Step 4:** Run `yarn test && yarn lint && yarn build` → Expected: passam (as páginas ainda são placeholders; arquivos antigos não importados ficam órfãos até a Task 11, desde que `tsc -b` aceite — se algum órfão quebrar o typecheck, apagá-lo agora).
- [ ] **Step 5: Commit** — `git add -A && git commit -m "🏗️ feat: duas páginas (Home e Sobre) com cabeçalho, idioma e metadados por página"`

### Task 6: Hero A

**Files:**
- Create: `src/components/hero/Hero.tsx`, `HeroName.tsx`, `HeroLog.tsx`
- Modify: `src/pages/Home.tsx`

**Interfaces:**
- Produces: `Hero(): JSX.Element` (faixa `IANLGNK :: PORTFOLIO` + `● ONLINE`, `HeroName`, `HeroLog`, CTA); `HeroName({ name }: { name: string })` → `<h1 aria-label={name}>` com duas linhas `IAN` / `LANGKAMMER` em `.dotmatrix`, tamanho via `font-size: clamp(...)` calculado para que `LANGKAMMER` caiba em 320 px (`10ch` ≤ largura útil); animação `ignite` na entrada; `HeroLog()` lista de `projects` com número `01–04`, nome e `messages.projects.items[slug].short`, cada linha é um `<a href="#<slug>">` (o hash abre o projeto na Task 7); CTA `<a>` rosa cheio para `withBase('sobre/')` com `.cursor` ao lado.
- Consumes: `projects` (Task 2), `messages`, `useReducedMotion`.

- [ ] **Step 1:** Implementar os três componentes e compor em `Home.tsx` (`Header` + `main` com `Hero`).
- [ ] **Step 2: Verificar visual e overflow.** Run `yarn dev` e abrir `http://localhost:2000/` em 320, 375, 768, 1440 px. Expected: nome legível em duas linhas, sem scroll horizontal (`document.documentElement.scrollWidth === innerWidth`), animação de entrada ~1 s; com `prefers-reduced-motion` ligado o nome já aparece completo.
- [ ] **Step 3:** `yarn lint && yarn build` → Expected: passam.
- [ ] **Step 4: Commit** — `git add -A && git commit -m "✨ feat: Hero com nome em dot-matrix, log de projetos e CTA"`

### Task 7: Seção de projetos (log expansível)

**Files:**
- Create: `src/components/projects/ProjectLog.tsx`, `ProjectMedia.tsx`, `toggle-open.ts`, `toggle-open.test.ts`
- Modify: `src/pages/Home.tsx`

**Interfaces:**
- Produces:
  - `toggleOpen(current: ProjectSlug | null, clicked: ProjectSlug): ProjectSlug | null` — clicar no aberto fecha (`null`); clicar em outro abre esse.
  - `ProjectMedia({ project }: { project: Project })` — se `project.media` existe, `<img loading="lazy">` ou `<video muted playsInline preload="none" poster>` (vídeo só toca com `useInView` e nunca em reduced motion); caso contrário bloco dot-matrix com `▶`. Proporção fixa 16:10 (sem layout shift).
  - `ProjectLog()` — `<section id="projetos">` com título `PROJETOS :: 04`; cada linha é um `<button aria-expanded aria-controls>`; painel anima com `grid-template-rows: 0fr → 1fr`; primeira linha aberta por padrão; abre também quando o hash da URL é `#<slug>` (no load e em `hashchange`); link(s) do projeto (`links` com rótulos de `messages.projects.links`; `isPrivate` mostra `messages.projects.private` no lugar de links).
- Consumes: `projects`, `messages`, `useInView`, `useReducedMotion`.

- [ ] **Step 1: Teste que falha.** `toggle-open.test.ts`: `toggleOpen(null,'inkaboxe')` = `'inkaboxe'`; `toggleOpen('inkaboxe','inkaboxe')` = `null`; `toggleOpen('avance-trainer','beerpass-club')` = `'beerpass-club'`. Run `yarn test` → FAIL.
- [ ] **Step 2:** Implementar `toggle-open.ts`; `yarn test` → PASS.
- [ ] **Step 3:** Implementar `ProjectMedia` e `ProjectLog`; compor em `Home.tsx` abaixo do Hero.
- [ ] **Step 4: Verificar.** Em `yarn dev`: só um painel aberto por vez; Tab/Enter/Espaço abrem e fecham; `http://localhost:2000/#inkaboxe` abre o InkaBoxe; clique numa linha do Hero leva e abre o projeto; Beerpass mostra dois botões de loja; InkaBoxe mostra "sob demanda/privado"; sem scroll horizontal em 375 px.
- [ ] **Step 5:** `yarn lint && yarn build` → passam. **Commit** — `git add -A && git commit -m "✨ feat: projetos em log expansível com slot de mídia mockado"`

### Task 8: Contato sem formulário e remoção do EmailJS

**Files:**
- Create: `src/components/Contact.tsx` (reescrever o existente)
- Modify: `src/pages/Home.tsx`, `src/data/personal.ts` (manter `email`, `linkedin`, `github`), `package.json` (remover `@emailjs/browser`), `.env.example` (remover as três variáveis; apagar o arquivo se ficar vazio), `src/vite-env.d.ts` (remover `VITE_EMAILJS_*`), `.github/workflows/deploy.yml` (remover o step "Write .env from repository secret"), `README.md` (remover seção/menções de EmailJS e do secret `ENV`)
- Delete: `src/data/contact.ts`

**Interfaces:**
- Produces: `Contact()` — `<section id="contato">`: título, `AvailabilityBadge`, botão rosa `COPIAR E-MAIL` que chama `copyText(personal.email)`; sucesso mostra `messages.contact.copied` por 2 s em região `aria-live="polite"`; falha mostra `copyFailed` e o e-mail permanece como texto selecionável (`user-select: all`) e `mailto:`; links LinkedIn e GitHub com `rel="noopener noreferrer"`.
- Consumes: `copyText` (Task 1), `personal`, `messages`.

- [ ] **Step 1:** Implementar `Contact` e compor em `Home.tsx` abaixo dos projetos.
- [ ] **Step 2: Remover o EmailJS** nos arquivos listados; `yarn install` para atualizar o lockfile.
- [ ] **Step 3: Verificar.** Run: `grep -rni emailjs --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=dist --exclude-dir=docs .` → Expected: nenhuma linha (as menções em `docs/superpowers` são do próprio plano/spec e são aceitas). Em `yarn dev`: o botão copia o e-mail (colar em um campo para conferir) e mostra "copiado"; simular falha com `navigator.clipboard.writeText = () => Promise.reject()` no console: aparece o aviso e o e-mail continua selecionável.
- [ ] **Step 4:** `yarn test && yarn lint && yarn build` → passam. **Commit** — `git add -A && git commit -m "🔥 feat: contato simples com copiar e-mail; remove EmailJS e formulário"`

### Task 9: Footer em prompt de terminal

**Files:**
- Create: `src/components/TerminalFooter.tsx`
- Modify: `src/pages/Home.tsx`, `src/pages/About.tsx`

**Interfaces:**
- Produces: `TerminalFooter()` — caixa de terminal com 3 comandos `$ whoami` / `$ uptime` / `$ exit`; saídas de `messages.footer`: `whoamiOut`, `uptimePrefix` + `formatUptime(segundos desde o carregamento)`, `exit` + `.cursor`; as linhas aparecem em sequência (CSS `animation-delay`) quando o footer entra na viewport (`useInView`); o contador só roda (`setInterval` 1 s) enquanto o footer está visível e o intervalo é limpo ao sair/desmontar; com reduced motion, linhas já visíveis e uptime estático; `<footer>` com texto real no DOM.
- Consumes: `formatUptime`, `useInView`, `useReducedMotion`, `messages`.

- [ ] **Step 1:** Implementar e adicionar às duas páginas.
- [ ] **Step 2: Verificar.** Em `yarn dev`: rolar até o fim, as linhas digitam em ~2 s, `uptime` incrementa a cada segundo; rolar para cima e conferir (DevTools → Performance ou `console` com `setInterval` espião) que não há ticks fora da viewport; com `prefers-reduced-motion` tudo estático.
- [ ] **Step 3:** `yarn lint && yarn build` → passam. **Commit** — `git add -A && git commit -m "✨ feat: footer em prompt de terminal com uptime ao vivo"`

### Task 10: Página Sobre (git log)

**Files:**
- Create: `src/components/about/GitLog.tsx`, `AboutBlock.tsx`, `SkillBars.tsx`
- Modify: `src/pages/About.tsx`

**Interfaces:**
- Produces:
  - `GitLog()` — linha do tempo vertical a partir de `experience` + `messages.experience.items` (cargo, período, duração); o primeiro item com `current` recebe nó rosa e rótulo `HEAD → atual`; tecnologias como tags.
  - `SkillBars()` — categorias de `skillCategories` (nomes de `messages.skills`); cada skill com `<div class="px-bar" style="--level: levelSquares(proficiency)" role="img" aria-label="NOME: N de 10">`.
  - `AboutBlock()` — resumo, "programa desde os 15 anos", formação (UFOP, IFMG, Cambridge B2), botão `downloadCv` para `withBase('cv/Curriculo_Ian_Langkammer_Batista_PT.pdf')` (pt-BR) ou `..._US.pdf` (en-US), link `backHome`.
  - `About()` (página) — duas colunas no desktop (GitLog à esquerda; AboutBlock + SkillBars à direita), empilhadas no celular; `$ GIT LOG --EXPERIENCE` em rosa; reveal por `useInView`.
- Consumes: `experience`, `skillCategories`, `levelSquares`, `withBase`, `messages`, `useLocale`.

- [ ] **Step 1:** Implementar os três componentes e a página, incluindo `TerminalFooter`.
- [ ] **Step 2: Verificar.** Em `yarn dev`: `http://localhost:2000/sobre/` mostra 5 itens do git log com o primeiro em rosa, skills com a quantidade certa de quadrados (TypeScript 10, React 10, Kotlin 5, Python 5), download do CV correto por idioma (`curl -I` na URL do link → `200 application/pdf`), troca PT/EN sem recarregar, sem scroll horizontal em 375 px, `aria-label` das barras lido corretamente.
- [ ] **Step 3:** `yarn lint && yarn build` → passam. **Commit** — `git add -A && git commit -m "✨ feat: página Sobre com experiência em git log, formação e skills em barras de pixels"`

### Task 11: Limpeza, orçamento de JS e acabamento

**Files:**
- Delete: tudo listado em "Apagados no fim"; dependências sem uso (`framer-motion`, `lucide-react`, `react-icons`, `@radix-ui/react-slot`, `class-variance-authority`, e outras que o `grep` mostrar sem import)
- Create: `scripts/initial-js-size.mjs`, `scripts/og-image.svg`, `public/og-image.png` (regenerado), `public/favicon.svg` (novo)
- Modify: `README.md`, `package.json` (scripts), `components.json` (apagar se `shadcn` não for mais usado)

**Interfaces:**
- Produces: `node scripts/initial-js-size.mjs <caminho do dist/index.html>` — lê `<script src>` e `<link rel=modulepreload>` do HTML, soma o tamanho gzip (nível 9) dos `.js` referenciados, imprime `initial JS: <bytes> B gzip` e sai com código 1 se passar de **106000** bytes.

- [ ] **Step 1: Apagar** os arquivos e assets antigos e remover dependências sem uso (conferir com `grep -rn "from '<pacote>'" src` antes de cada remoção); `yarn install`.
- [ ] **Step 2: OG image e favicon.** Recriar `scripts/og-image.svg` (1200×630, fundo `#1b1012`, nome em pontos, rosa `#ff3d7f`, texto "FULL STACK ENGINEER", `ianlgnk.github.io/ianlgnk`) e gerar o PNG: `rsvg-convert -w 1200 -h 630 scripts/og-image.svg -o public/og-image.png`; criar `public/favicon.svg` (quadrado `#1b1012` com um `I` em pixels rosa). Conferir `og:image` nas duas HTMLs.
- [ ] **Step 3: Orçamento.** Escrever `scripts/initial-js-size.mjs`; run: `VITE_BASE_PATH=/ianlgnk/ yarn build && node scripts/initial-js-size.mjs dist/index.html` → Expected: `initial JS: … B gzip` ≤ 106000, exit 0; repetir para `dist/sobre/index.html`.
- [ ] **Step 4: Auditoria final.** Run: `yarn test && yarn lint && yarn build` (sem `--ignore-engines`) → todos passam; `grep -rni "emailjs\|framer-motion\|simpleicons\|netracker" src index.html sobre public package.json` → sem resultados; `ls public` não contém `college-projects`.
- [ ] **Step 5: Auditoria visual e de movimento** (`yarn dev`, Chrome): sem scroll horizontal em 375, 768, 1024 e 1440 px nas duas páginas; Lighthouse mobile Performance ≥ 90 e CLS 0 em `yarn preview`; `prefers-reduced-motion` (DevTools → Rendering) deixa tudo estático e visível; navegação completa por teclado nas duas páginas; contraste ≥ 4,5:1 nos textos.
- [ ] **Step 6: README.** Atualizar stack, páginas, scripts (`yarn test`, `yarn dev` na 2000), deploy (sem secret `ENV`) e o orçamento de JS.
- [ ] **Step 7: Commit** — `git add -A && git commit -m "🧹 chore: remove código antigo, orçamento de JS, OG image e favicon novos"`

---

## Self-Review (spec → tarefa)

- §1/§5.1 duas páginas e cabeçalho → Task 5; §5.2 Hero → Task 6; Projetos → Task 7; Contato + remoção do EmailJS → Task 8; Footer → Task 9; §5.3 Sobre → Task 10.
- §4 visual/paleta/sem tema → Tasks 4 e 5; §6.1 projetos e links → Tasks 2, 3, 7; §6.3 mídia mock → Task 7; §7 movimento → Tasks 4, 6, 7, 9; §8 sai/fica → Tasks 4, 8, 11 (OG/favicon no 11; CV na 10); §9 critérios 1–7 → Tasks 5 (URLs), 11 (orçamento, Lighthouse, grep, reduced motion, build); §12 decisões → Tasks 2 (skills), 3 (Beerpass, i18n), 4 (variáveis semânticas), 11.
- Tipos conferidos: `ProjectSlug` (Task 2) usado em Tasks 3 e 7; `Locale`/`resolveLocale` (Task 1) usados em Tasks 3 e 4; `levelSquares`, `formatUptime`, `copyText`, `withBase`, `initialRevealed` (Task 1) usados em Tasks 4, 8, 9, 10; `messages.projects.items[slug].short` (Task 3) usado em Tasks 6 e 7.
- Proporção: plano ≈ 1,3× o spec; código só em assinaturas e asserções.
