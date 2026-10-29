<div align="center">

# Ian Langkammer Batista

**Senior Software Engineer & Architect** · Belo Horizonte, Brazil

Mobile, web and embedded-POS products end to end, from architecture and code to deployment and monitoring.
Open to remote roles (UTC-3, full overlap with US Eastern business hours).

<br />

[![Portfolio](https://img.shields.io/badge/portfolio-1b1012?style=for-the-badge&logo=googlechrome&logoColor=ff3d7f)](https://ianlgnk.github.io/ianlgnk/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/ianlgnk)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:ianlgnk@gmail.com)
[![Résumé](https://img.shields.io/badge/R%C3%A9sum%C3%A9-PDF-1e3a5f?style=for-the-badge&logo=readthedocs&logoColor=white)](https://ianlgnk.github.io/ianlgnk/cv/Curriculo_Ian_Langkammer_Batista_US.pdf)

</div>

<br />

## Summary

Senior Software Engineer and Architect with 5+ years of experience building mobile, web and embedded-POS products end to end. I led the transformation of a self-service app to run natively on payment POS terminals (8+ device models, two acquirers), significantly increasing sales and cutting product delivery cost. I independently built and operate **Avance Trainer**, a SaaS for personal trainers live on the App Store and Google Play (5.0 ★). Strong in React Native, TypeScript and Node.js, with native Kotlin, Java and Swift experience. Writing code since age 15.

<br />

## Highlights

- **Architecture ownership at Beerpass Club:** POS self-service apps, consumer mobile app, digital menu, back-office platform and in-venue displays. Promoted from Mid-level to Senior for it.
- **Self-service on payment terminals:** adapted the app to run on 8+ POS models across Stone and PagBank, integrating acquirer SDKs and device-specific APIs.
- **Consumer app redesign, solo:** rebuilt the Beerpass mobile app alone, cutting rage clicks by 20%+.
- **Avance Trainer, founder and sole developer:** iOS, Android and web SaaS with AI features, subscriptions and one-push CI/CD (~2,500 commits across 3 repositories).

<br />

## Selected work

| Project | What it is | Stack |
| :--- | :--- | :--- |
| **[Avance Trainer](https://avancetrainer.com)** | Coaching platform for personal trainers and their clients: workouts, physical assessments, nutrition, engagement and recurring billing. iOS and Android apps plus a web dashboard, all built and operated solo. 5.0 ★ on both stores. | React Native, Expo, React 19, Vite, Firebase, Gemini 2.5 Flash, Asaas, Sentry |
| **Beerpass Club** ([Google Play](https://play.google.com/store/apps/details?id=com.beerpass.clientapp&hl=pt_BR) · [App Store](https://apps.apple.com/br/app/beerpass-club/id1605400165)) | Self-service draft beer ecosystem. I own the architecture and redesigned and built the consumer mobile app. | React Native, TypeScript, Kotlin, Java, Node.js, Firebase, Expo/EAS |
| **[Pedro Porto Studios Store](https://shop.pedroportodesign.online)** | Print-on-demand clothing store for designer Pedro Porto (pre-launch), built alone: Mercado Pago checkout (card and Pix), shipping via Melhor Envio, plus the designer's [portfolio site](https://pedroportodesign.online) rebuilt in code. | React 19, Vite, TypeScript, Firebase, Cloud Functions, Mercado Pago |
| **InkaBoxe** | Offline facial-recognition check-in system for a martial arts academy: a Python API runs on an Android tablet via Termux and recognizes faces fully on-device, with no cloud dependency or recurring cost. Managed through a React PWA. Private repositories. | Python, FastAPI, DeepFace, OpenCV, React, Firebase |

<br />

## Experience

| Company | Role | Period |
| :--- | :--- | :--- |
| **[Beerpass Club](https://www.beerpassclub.com/)** · Remote | Senior Software Engineer & Architect | Jan 2026 – Present |
| | Software Engineer & Architect | May 2023 – Jan 2026 |
| **Saúde Agora** · Remote | Software Engineer | Oct 2022 – Apr 2023 |
| | Junior Software Engineer | Oct 2021 – Sep 2022 |
| **Visão Tecnologia e Sistemas** · Remote | Web Developer | Jun 2021 – Oct 2021 |

Beerpass Club is a self-service draft beer ecosystem; Saúde Agora is an all-in-one management platform for clinics and hospitals (Java, Hibernate, PostgreSQL, Vue.js).

<br />

## Technical skills

| | |
| :--- | :--- |
| **Languages** | TypeScript, JavaScript, Java, Kotlin, Swift, Python |
| **Mobile** | React Native, Expo/EAS (Build, Submit, OTA Updates), Expo Router, NativeWind, Native Modules, Android, iOS (Live Activities, widgets), POS terminal integration |
| **Front-end** | React, Vue.js, Angular, Vite, Tailwind CSS, shadcn/ui |
| **Back-end & data** | Node.js, Java (Hibernate), PostgreSQL, Firebase (Firestore, Cloud Functions, Auth, App Check), Docker, AWS |
| **AI & payments** | Gemini via Firebase AI Logic, Asaas, Mercado Pago, Pix, Stone and PagBank POS SDKs |
| **Tools & practices** | Git, GitHub Actions (CI/CD), GitLab, Jira, Figma, Sentry, Crashlytics, Cloudflare, Google Analytics, Microsoft Clarity, Software Architecture, Clean Architecture, Agile/Scrum |

<br />

## Education and languages

- **B.Sc. in Information Systems**, Federal University of Ouro Preto (UFOP), 2020 – 2025. Thesis: e-commerce platform for an independent clothing brand.
- **Technical Degree in Web Development** (integrated with high school), Federal Institute of Northern Minas Gerais (IFNMG), 2017 – 2019.
- **English:** professional working proficiency (Cambridge B2 Certificate, 2020). **Portuguese:** native.

<br />

## About this repository

This repository is the source code of my [portfolio](https://ianlgnk.github.io/ianlgnk/): two static pages (Home at `/` and About at `/sobre/`) with a pixel/terminal look, bilingual (en-US and pt-BR), no form and no tracking.

| Technology | Role |
| :--- | :--- |
| **React 19** | Components for the two static pages. |
| **TypeScript** | Static typing for data, i18n messages and props. |
| **Vite 8** | Dev server, HMR and production build to `dist/` (one HTML entry per page). |
| **Tailwind CSS 4** | Design tokens (`@theme`), grid and utilities; a single wine + pink theme. |
| **Vitest** | Tests for the pure logic (skill levels, uptime, locale, data). |
| **GitHub Actions** | CI: install, build and publish to GitHub Pages. |

<p align="left">
  <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</p>

### Local development

**Requirement:** [Node.js 24](https://nodejs.org/) (see `.nvmrc` and `engines` in `package.json`).

```bash
git clone https://github.com/ianlgnk/ianlgnk.git
cd ianlgnk
yarn install
yarn dev
```

The app runs at **http://localhost:2000** with `base` set to `/`; the About page is at **/sobre/**.

To test the build the way GitHub Pages serves it (assets under `/ianlgnk/`):

```bash
VITE_BASE_PATH=/ianlgnk/ yarn build
VITE_BASE_PATH=/ianlgnk/ yarn preview   # http://localhost:4173/ianlgnk/ and /ianlgnk/sobre/
```

Other useful commands:

```bash
yarn build    # tsc -b && vite build
yarn lint     # ESLint
yarn test     # Vitest (pure logic)
node scripts/initial-js-size.mjs dist/index.html   # initial JS budget (≤ 106 kB gzip)
```

### Build and deploy

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) runs on every **push to `main`**: checkout and Node 24 (Yarn cache), `yarn install --frozen-lockfile`, `yarn build` with `VITE_BASE_PATH=/ianlgnk/`, then upload and deploy to the `github-pages` environment. Published at **https://ianlgnk.github.io/ianlgnk/**.

<br />

## College projects

Repositories I built during my degree, kept here for reference.

| Repository | Notes |
| :--- | :--- |
| [**atelie-da-gisa**](https://github.com/ianlgnk/atelie-da-gisa) | Macramé sales SPA; Next.js, Firebase, shadcn UI. |
| [**tcc**](https://github.com/ianlgnk/tcc) | Thesis front end (Vite, TypeScript); Firebase deploy. |
| [**tcc-cloudfunctions**](https://github.com/ianlgnk/tcc-cloudfunctions) | Cloud Functions (TypeScript) for the thesis project. |
| [**pandafilmes-frontend**](https://github.com/ianlgnk/pandafilmes-frontend) | Movie catalog with Vue, Vuetify, Vue Router and Vuex. |
| [**social4devs-frontend**](https://github.com/ianlgnk/social4devs-frontend) | Social network for developers: Vue 3, TypeScript, Naive UI. |
| [**github-profile-explorer**](https://github.com/ianlgnk/github-profile-explorer) | GitHub user search (React + TypeScript + API); [demo](https://githubexplorer-ianlgk.netlify.app/). |
| [**clt-pj-converter**](https://github.com/ianlgnk/clt-pj-converter) | Brazilian CLT → PJ salary converter (Vue 3 + TypeScript); [demo](https://converter-clt-pj.netlify.app/). |
| [**cassandra-project**](https://github.com/ianlgnk/cassandra-project) | Exploring Cassandra (NoSQL); Vue front end and Node API. |
| [**shot_in_fly**](https://github.com/ianlgnk/shot_in_fly) | Java (JDK 8) game with sockets and threads (client/server). |
| [**guess-the-number**](https://github.com/ianlgnk/guess-the-number) | Guess-the-number game (React); [demo](https://guess-the-number-ianlgk.netlify.app/). |
| [**todo-list**](https://github.com/ianlgnk/todo-list) | To-do list with Vue and `localStorage`; [demo](https://todo-list-ianlgk.netlify.app/). |
| [**insertion-sort_assembly**](https://github.com/ianlgnk/insertion-sort_assembly) | Insertion sort in Assembly (UFOP, Computer Organization). |
| [**snake-fila**](https://github.com/ianlgnk/snake-fila) | Snake in C using queue logic (UFOP, data structures). |

<br />

<p align="left">
  <a href="https://github.com/ianlgnk?tab=repositories">
    <img src="https://img.shields.io/github/followers/ianlgnk?label=Followers&style=flat-square&logo=github" alt="GitHub followers" />
  </a>
  <img src="https://img.shields.io/github/stars/ianlgnk/ianlgnk?style=flat-square&logo=github&label=Stars%20on%20this%20repo" alt="Stars on this repository" />
</p>

<div align="center">

*Thanks for stopping by. If you want to talk, reach me on [LinkedIn](https://linkedin.com/in/ianlgnk) or by [email](mailto:ianlgnk@gmail.com).*

</div>
