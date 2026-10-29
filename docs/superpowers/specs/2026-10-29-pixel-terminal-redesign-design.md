# Redesign do portfólio: pixel / terminal (vinho + rosa)

Data: 2026-10-29. Autor da direção: Ian Langkammer. Idioma deste documento: pt-BR.

## 1. Intenção e motivo

O portfólio atual (Vite + React 19 + Tailwind 4, uma página longa com seis seções) é correto, mas genérico: parece um template "dev dark mode". Ian quer um site com identidade própria, **limpo e rápido**, cuja estética lembre displays de equipamento e terminais: grades, pontos (dot-matrix), tipografia monoespaçada em caixa alta, blocos de pixels e animações de "instrumento" (cursor piscando, equalizador, contador). A referência são telas de app estilo BMS/HVAC e player de áudio (fundo escuro com grade, texto creme e um único destaque em rosa neon).

O site passa a ter **duas páginas**:

- **Home (`/`)**: um Hero chamativo que já apresenta os projetos, a seção de projetos, um contato simples e um footer diferente.
- **Sobre (`/sobre`)**: uma página única com a trajetória de Ian na programação, a experiência e as skills. O CTA do Hero leva a ela.

Quem lê: recrutadores, tech leads e potenciais clientes. O objetivo é que, em poucos segundos, entendam quem é Ian, vejam os projetos e saibam como falar com ele.

## 2. Objetivos, não-objetivos e anti-objetivos

**Objetivos**
- Identidade visual forte e coerente (paleta, tipografia, grade, animações) fiel aos mockups em `docs/superpowers/specs/2026-10-29-pixel-terminal-redesign-mockups/`.
- Site **mais rápido que o atual** (hoje: chunk inicial de JS ≈ 326 kB, 106 kB gzip). Menos conteúdo, menos JS, nenhum canvas permanente.
- Home com Hero que lista os 4 projetos, seção de projetos em log expansível, contato sem formulário, footer em "prompt de terminal".
- Página `/sobre` com experiência em estilo "git log", sobre e skills.
- Bilíngue (en-US padrão, pt-BR), acessível (teclado, contraste, `prefers-reduced-motion`).

**Não-objetivos**
- Mídia real dos projetos (prints, vídeos): **ainda não existe**, será produzida depois. Neste projeto ela é mockada (ver §6.3), mas o slot deve aceitar imagem e vídeo reais depois sem refatoração.
- Novo texto de marketing além do necessário; analytics; blog; CMS.
- Tema claro (ver §4.3, decisão do autor do documento).

**Anti-objetivos (seria um fracasso mesmo funcionando)**
- Visual "Matrix/hacker" exagerado e ilegível: texto precisa ser legível, a estética é de instrumento limpo, não de caos.
- Animação que pesa, trava no celular ou ignora `prefers-reduced-motion`.
- Site mais lento ou com mais JS que o atual.
- Perder o que já foi corrigido na acessibilidade: skip link, foco visível, `aria-pressed`, contraste ≥ 4,5:1 para texto.

## 3. Restrições

- Stack existente é a base: Vite 8, React 19, TypeScript, Tailwind 4 (`@theme` em `src/index.css`), Node 24, yarn 1. Qualquer biblioteca nova precisa se justificar em peso/necessidade.
- Deploy: GitHub Pages em `https://ianlgnk.github.io/ianlgnk/` (`base: '/ianlgnk/'`, ver `.github/workflows/deploy.yml` e `vite.config.ts`, que usa `VITE_BASE_PATH`). **Os dois URLs (`/` e `/sobre/`) precisam funcionar como links diretos e com refresh em produção**, ou seja, sem depender de fallback SPA que o GitHub Pages não oferece.
- Dev server na porta **2000**. Todo o trabalho vai direto na branch `main` (decisão do Ian), com commits gitmoji + Conventional Commits em pt-BR, validados por commitlint.
- Idiomas: en-US é o padrão para primeira visita; pt-BR por escolha, persistida em `localStorage` (`ianlgnk-locale`). Textos vivem em `src/locales/*` (um objeto por idioma).
- Acessibilidade: `MotionConfig`/CSS respeitando `prefers-reduced-motion`; contraste AA; skip link; ordem de foco lógica.
- `.superpowers/` é pasta de ferramenta e está no `.gitignore`; não depende dela.

## 4. Linguagem visual

### 4.1 Paleta (tema único, escuro)
Valores aproximados dos mockups (o construtor pode ajustar finamente, mantendo o contraste):

| Papel | Valor |
| --- | --- |
| Fundo | `#1b1012` (marrom-vinho muito escuro) |
| Texto principal ("tinta") | `#eadfcd` (creme) |
| Texto secundário | `#8f7f78` |
| Destaque único | `#ff3d7f` (rosa neon) |
| Linhas da grade | `rgba(234,223,205,.07)` |
| Divisórias | `rgba(234,223,205,.14–.22)` |

Regra: o rosa é o **único** destaque. Verde (hoje a cor primária do site) sai. Texto em rosa sobre o fundo precisa de contraste ≥ 4,5:1 quando for texto corrido; para rótulos grandes ou decorativos vale o mínimo de texto grande.

### 4.2 Tipografia e formas
- Tudo em **monoespaçada**, caixa alta nos rótulos e títulos, `letter-spacing` generoso (~`.1em`–`.18em`), texto corrido em caixa normal para leitura.
- **Texto dot-matrix** (nome gigante do Hero, números `01/02/03`, wordmarks): o texto é renderizado como pontos (técnica sugerida: `background: radial-gradient(...)` com `background-clip: text` e `color: transparent`; o construtor pode usar máscara ou canvas se medir melhor). Precisa continuar acessível: o texto real fica no DOM.
- Fundo com **grade** (linhas de 1 px a cada ~22 px) em toda a página.
- Blocos de **pixels** (quadrados de ~7 px, preenchidos/vazios) para barras de nível; bordas de 1 px, cantos quase retos.
- Escolha da fonte monoespaçada: ver §10 (decisão do construtor, restrições lá).

### 4.3 Sem tema claro (confirmado pelo Ian)
Os mockups são só escuros. O site hoje tem tema claro/escuro com *view transition* circular; **este redesign remove o seletor de tema e o tema claro**. Confirmado pelo Ian em 2026-10-29.

## 5. Estrutura

### 5.1 Cabeçalho (palpite não discutido)
Barra mínima, fixa ou no fluxo (construtor decide): handle `IANLGNK` à esquerda, link "SOBRE" e o seletor de idioma PT/EN à direita, mesmo visual mono. Sem menu com seis itens. Indicação de página ativa quando estiver em `/sobre`.

### 5.2 Home (`/`)

**Hero (opção A escolhida pelo Ian)**
- Nome **IAN / LANGKAMMER** gigante em dot-matrix ocupando a largura útil, em duas linhas. Se o nome completo não couber de forma legível no celular, reduzir o tamanho antes de abreviar; abreviar ("LANGK.") só se necessário e mantendo o texto acessível completo.
- Faixa superior pequena: `IANLGNK :: PORTFOLIO` à esquerda e um indicador `● ONLINE` em rosa à direita.
- **Log de projetos** abaixo do nome: 4 linhas numeradas (`01 AVANCE TRAINER`, `02 PEDRO PORTO DESIGN`, `03 BEERPASS CLUB`, `04 INKABOXE`), cada uma com nome e uma descrição curta de 2–3 palavras à direita (ex.: `APP + PAINEL`, `PORTFÓLIO + LOJA`, `APP ANDROID/IOS`, `RECONHECIMENTO FACIAL`). Clicar numa linha rola até o projeto na seção de projetos e o abre.
- **CTA principal** rosa cheio: `SOBRE MIM →` com um cursor retangular rosa piscando ao lado; leva a `/sobre`.
- Animação: o nome "acende" pixel a pixel na entrada (≈ 0,8–1,2 s) e depois cintila de leve; as linhas do log aparecem em sequência como digitadas. Com `prefers-reduced-motion`, tudo estático.

**Projetos (opção A: log expansível)**
- Título de seção no padrão do site: `PROJETOS :: 04`.
- Lista de linhas tipo terminal; **uma abre por vez** (acordeão), a primeira abre por padrão. Linha fechada: número, nome e um rótulo curto à direita. Linha aberta (borda superior rosa): mídia à esquerda (≈ 120 px de largura no mockup, maior no desktop), texto, tags e link(s).
- Teclado: cada linha é um `button` com `aria-expanded`, foco visível.

**Contato (sem formulário)**
- Frase "Vamos conversar? / Let's talk?", badge "Disponível / Available" (palpite), botão rosa **COPIAR E-MAIL** (copia `ianlgnk@gmail.com` e confirma "copiado" por ~2 s, com `aria-live` educado) e links **LinkedIn** e **GitHub** (`personal.ts`).
- **Remover completamente o EmailJS** (pedido explícito do Ian): dependência `@emailjs/browser`, `VITE_EMAILJS_*` no `.env.example`, no workflow/secrets documentados, no README, o formulário e seus textos em `contact-messages.ts`, e o chunk correspondente.

**Footer (opção A: prompt de terminal)**
Caixa de terminal com linhas que "digitam" quando entram na viewport:
```
$ whoami
ianlgnk — full stack engineer · BH, MG
$ uptime
sessão ativa há 00:03:27 · build 2026.10     (o tempo conta ao vivo desde o carregamento da página)
$ exit [ SESSÃO ENCERRADA ] ▌                (cursor piscando)
```
Texto traduzido nos dois idiomas. A versão/`build` pode vir de `package.json` ou da data do build. Sem JS pesado: um `setInterval` de 1 s ligado só enquanto o footer está visível.

### 5.3 Sobre (`/sobre`, opção A: "git log")
- Cabeçalho da página: `/SOBRE` e um rótulo `$ GIT LOG --EXPERIENCE` em rosa.
- Duas colunas no desktop (empilhadas no celular):
  - **Esquerda, experiência como histórico de commits** numa linha do tempo vertical, cada item com um nó quadrado (o mais recente, `HEAD → atual`, em rosa), período, cargo e empresa/tecnologias. Itens reais (fonte: `src/data/experience.ts` e `src/locales/experience-messages.ts`):
    1. Beerpass Club, Engenheiro Full Stack **Sênior**, jan/2026 – atual
    2. Beerpass Club, Engenheiro Full Stack **Pleno**, mai/2023 – jan/2026
    3. Saúde Agora, Desenvolvedor Full Stack **Pleno**, out/2022 – abr/2023
    4. Saúde Agora, Desenvolvedor Full Stack **Júnior**, out/2021 – out/2022
    5. Visão Tecnologia e Sistemas, **Web Developer**, jun/2021 – dez/2021
  - **Direita**: bloco "Sobre" (programa desde os 15 anos; formação: Bacharelado em Sistemas de Informação na UFOP, Técnico em Informática para Internet no IFMG, Inglês avançado Cambridge B2) e **skills** agrupadas por categoria (linguagens, front-end, back-end/DB, ferramentas, metodologias), cada uma com uma **barra de 10 quadrados** (nível = `proficiency / 10`, dados de `src/data/skills.ts`). Sem filtros interativos.
- Botão para baixar o CV (os dois PDFs já existem em `public/cv/`: `Curriculo_Ian_Langkammer_Batista_PT.pdf` e `Curriculo_Ian_Langkammer_Batista_US.pdf`, escolhido pelo idioma) e link de volta para a Home/contato.
- Projetos antigos (Bastianetto Alessi, TCC e e-commerce, projetos acadêmicos, grade de repositórios da faculdade) **saem do site**, sem lista "Outros trabalhos" (confirmado pelo Ian). O código e os dados correspondentes são **apagados** (ver §8); continuam no histórico do git.

## 6. Conteúdo

### 6.1 Os 4 projetos da Home (ordem definida pelo Ian)
O **Netracker foi removido**. Descrições abaixo foram escritas a partir dos READMEs dos repositórios e podem ser ajustadas.

| # | Nome | Descrição (base) | Tags | Link |
| --- | --- | --- | --- | --- |
| 1 | **Avance Trainer** | App em que o treinador acompanha seus alunos: treinos, avaliações corporais, nutrição, engajamento e cobrança. Inclui app mobile (treinador e aluno), landing e painel web do treinador, backend serverless e IA (Gemini) nos clientes. | Expo/React Native, React 19, Firebase, Gemini | `https://avancetrainer.com` |
| 2 | **Pedro Porto Design** | Arquivo visual e portfólio do designer Pedro Henrique Porto, reconstruído em código, mais uma loja com checkout via Mercado Pago e backend em Cloud Functions. | React 19, TypeScript, Tailwind, Firebase, Mercado Pago | `https://pedroportodesign.online` |
| 3 | **Beerpass Club** | App do cliente da Beerpass Club, desenvolvido por Ian (Expo/React Native), publicado no Android e no iOS. **A descrição do produto ainda é placeholder** (só se tem nome e links). | React Native, Expo | Play Store: `https://play.google.com/store/apps/details?id=com.beerpass.clientapp&hl=pt_BR`; App Store: `https://apps.apple.com/br/app/beerpass-club/id1605400165` |
| 4 | **InkaBoxe** | Sistema completo de reconhecimento facial: uma API local em Python (FastAPI, DeepFace, OpenCV) roda **no próprio tablet** para cadastro e verificação sem depender de cloud, e uma SPA de gestão em React, instalável como **PWA** no tablet, também faz o reconhecimento. Backend em Cloud Functions. | Python, FastAPI, DeepFace, React, PWA, Firebase | Sem link público (repositórios privados); mostrar rótulo "sob demanda / privado" em vez de link |

Nome "Pedro Porto Design": o repositório se chama `pedroportodesign`; Ian falou "Pedro Porto Studios" numa mensagem. Usar **Design**, que é o nome real do repositório e do domínio, e deixar fácil de trocar.

### 6.2 Textos
Todos os textos novos existem em pt-BR e en-US em `src/locales/`. Reaproveitar o que já está lá (cargo, experiência, educação) em vez de reescrever. O `ScrambleText` (efeito de letras embaralhadas ao trocar de idioma) já existe e é parte da identidade; **manter** na troca de idioma, aplicado onde for barato.

### 6.3 Mídia dos projetos: mock
Cada projeto aberto mostra um bloco de **pontos** (dot-matrix) com um ícone `▶` central, no lugar de imagem/vídeo. O slot de mídia deve:
- receber depois `image` ou `video` (com `poster`), ambos opcionais, via os dados do projeto;
- manter proporção fixa (sem layout shift), `loading="lazy"`, vídeo `muted playsInline preload="none"`, tocando só quando visível e nunca com `prefers-reduced-motion` (mostra só o poster).

## 7. Movimento
Tudo leve e feito para parecer "instrumento": cursor retangular piscando, nome que acende por pixels, linhas que digitam, linha rosa de varredura opcional, barras de nível que preenchem quando entram na viewport, equalizador pequeno opcional no cabeçalho. Regras:
- Sem canvas rodando o tempo todo (as partículas atuais saem). Se um canvas for usado para o dot-matrix, deve pausar fora da viewport e na troca de aba.
- Preferir CSS (`@keyframes`, `animation-timeline` com fallback) a JS; se usar `framer-motion`, manter `LazyMotion` e `m.*`.
- `prefers-reduced-motion: reduce`: sem animação contínua, sem digitação, estado final direto.
- Nenhuma animação bloqueia leitura ou clique.

## 8. O que sai e o que fica

**Sai:** seletor de tema e tema claro (e a *view transition* do tema); partículas do Hero (canvas); card de terminal do Hero atual; timeline de experiência em cartões; filtros e tiles de Skills; grade de projetos acadêmicos e repositórios da faculdade na Home; projeto Netracker; formulário de contato e EmailJS; os projetos antigos (Bastianetto, TCC, acadêmicos) com seus dados, textos e componentes, e os arquivos em `public/college-projects/` (GIFs, ≈ 4,4 MB) e `src/data/college-github-repos.ts`; barra de progresso e indicador deslizante do menu (o menu fica mínimo).

**Fica:** i18n en-US/pt-BR com troca animada; skip link, `MotionConfig`/reduced motion, `aria-*` já corrigidos; metatags OG/Twitter (a `og-image.png` atual é verde e do site antigo: regenerar na nova paleta); download do CV por idioma; `HeroName` com acessibilidade correta (h1 com o nome real); dados em `src/data/*`; deploy por GitHub Actions; Node 24.

## 9. Critérios de sucesso
1. A Home e `/sobre` batem visualmente com os mockups escolhidos (paleta, grade, dot-matrix, log expansível, footer em terminal, git log).
2. `/` e `/sobre/` abrem por link direto e com refresh em GitHub Pages (verificado no build de produção local com `VITE_BASE_PATH` correspondente e, depois, no deploy).
3. JS inicial da Home **menor** que o atual (≤ 106 kB gzip) e sem regressão de CLS (hoje 0). Lighthouse mobile de Performance ≥ 90 (a conferir; o construtor mede antes e depois).
4. Sem scroll horizontal em 375, 768, 1024 e 1440 px.
5. `grep -ri emailjs` no repositório (código, env, docs) não encontra nada além do histórico de commits.
6. `prefers-reduced-motion` desliga as animações; navegação por teclado completa nas duas páginas; contraste AA no texto.
7. `yarn lint` e `yarn build` passam sem `--ignore-engines` no Node 24.

## 10. Deixado ao construtor
- **Mecanismo de roteamento** para as duas páginas dentro das restrições do GitHub Pages (duas entradas HTML como no repositório `pedroportodesign`, ou um roteador leve com `404.html`/prerender; escolher a opção mais rápida e simples de manter).
- **Fonte monoespaçada**: precisa ser gratuita, carregar rápido (idealmente self-hosted, subset, `font-display: swap`) e ter boa leitura em caixa alta. Hoje o site usa JetBrains Mono via Google Fonts, que serve como ponto de partida.
- Técnica exata do dot-matrix, estrutura de componentes e pastas, breakpoints, medidas finas (espaçamentos, tamanhos), e como organizar os dados dos projetos.
- Nome do build/versão exibido no footer.
- Regenerar `og-image.png` e o favicon na nova identidade (um favicon simples em pixel/rosa serve; o `public/favicon.svg` atual é uma folha de mockup e não é usado).

## 11. Fora do escopo
Produção das mídias reais dos projetos; descrição final do app Beerpass Club (placeholder até o Ian enviar); páginas individuais de case study; analytics; publicação no remoto (o Ian decide quando fazer o push).

## 12. Decisões de detalhe (tomadas por quem escreveu o documento, depois da revisão)

Todas estas são **escolhas minhas**, não do Ian; ele pode trocá-las.

1. **Métricas e bio.** As métricas atuais (5+ anos, 20+ projetos, 3 stacks) **saem**: não são verificáveis e não aparecem nos mockups. O bloco "Sobre" de `/sobre` reaproveita o resumo existente em `about-messages`, enxuto, mais "programa desde os 15 anos" e a formação.
2. **Beerpass Club.** Descrição neutra, sem inventar produto: "App do cliente da Beerpass Club, desenvolvido por Ian e publicado no Android e no iOS" (en-US equivalente). Mostrar **os dois links** como botões ("Google Play" e "App Store"). Ian pode trocar o texto depois.
3. **i18n entre páginas.** Duas entradas HTML (MPA) são aceitáveis: o idioma persiste em `localStorage` e o scramble roda na troca dentro da página. Não é requisito manter estado entre navegações; se o roteador leve for mais simples, também serve.
4. **framer-motion.** Não é permitido no caminho inicial (primeira pintura da Home). Só em chunks carregados sob demanda, e apenas se CSS puro não resolver. O padrão é CSS (`@keyframes`, `animation-timeline` com fallback, IntersectionObserver). `lucide-react`: usar só os ícones necessários ou trocar por SVG inline.
5. **Skills.** Nível = `Math.round(proficiency / 10)` quadrados preenchidos de 10; quadrados vazios são o esperado em níveis baixos. Os ícones do Simple Icons (CDN externo) **saem**: a paleta é de cor única e eles pesam e dependem de terceiros. Skills sem filtro, em lista por categoria.
6. **Textos dos projetos em en-US.** O construtor escreve a versão en-US a partir da tabela de §6.1 (a tabela está em pt-BR por conveniência).
7. **Tema.** O tema claro some e o seletor também. Manter as cores como **variáveis CSS semânticas** (`--background`, `--foreground`, `--accent`...) para que um tema futuro seja barato, mas sem provider de tema, sem `localStorage` de tema e sem *view transition*. Remover `ianlgnk-theme` do código e do script anti-FOUC em `index.html`.

## 13. Decisões confirmadas pelo Ian (2026-10-29)

- **Tema claro:** removido (§4.3).
- **Projetos antigos:** cortados do site, sem "Outros trabalhos"; o código, os dados e os GIFs de `public/college-projects/` são apagados do repositório (§5.3, §8). Continuam no histórico do git.
