<div align="center">

# Ian Langkammer

**Desenvolvedor de software** · Belo Horizonte, MG

Construo produtos web e mobile com foco em TypeScript, boa UX e código que envelhece bem.

<br />

[![Site](https://img.shields.io/badge/ver_o_site-0d1117?style=for-the-badge&logo=googlechrome&logoColor=white)](https://ianlgnk.github.io/ianlgnk/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/ianlgnk)
[![Lattes](https://img.shields.io/badge/Lattes-1e3a5f?style=for-the-badge&logo=readthedocs&logoColor=white)](https://lattes.cnpq.br/7938181587174261)
[![E-mail](https://img.shields.io/badge/E--mail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:ianlgnk@gmail.com)

</div>

<br />

## Sobre mim

Trabalho com ecossistema **React** (web e mobile), **Node**, **TypeScript** e integrações em nuvem. Gosto de interfaces responsivas, acessibilidade e detalhes que fazem a diferença no dia a dia de quem usa o produto.

Este repositório é o **código-fonte do meu portfólio** — o mesmo projeto que aparece no meu perfil do GitHub.

<br />

## Stack

| Tecnologia | Papel no projeto |
| :--- | :--- |
| **React 19** | UI em componentes; seções do site (Hero, About, Experience, Projects, Skills, Contact). |
| **TypeScript** | Tipagem estática em dados, mensagens i18n e props dos componentes. |
| **Vite 8** | Dev server, HMR e build de produção para `dist/`. |
| **Tailwind CSS** | Estilos utilitários, tema claro/escuro e layout responsivo. |
| **Framer Motion** | Animações de entrada, transições e microinterações. |
| **Radix UI** | Primitivos acessíveis (ex.: `Slot` no botão). |
| **EmailJS** | Envio do formulário de contato no browser (variáveis `VITE_EMAILJS_*`). |
| **GitHub Actions** | CI: instala dependências, build e publicação no GitHub Pages. |

<p align="left">
  <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion" />
</p>

<br />

## Desenvolvimento local

**Requisito:** [Node.js 22](https://nodejs.org/) (ver `.nvmrc` e `engines` no `package.json`).

```bash
git clone https://github.com/ianlgnk/ianlgnk.git
cd ianlgnk
yarn install
cp .env.example .env   # opcional: formulário de contato (EmailJS)
yarn dev
```

O app sobe em **http://localhost:5173** com `base` em `/` (padrão do Vite).

Para testar o build como no GitHub Pages (assets em `/ianlgnk/`):

```bash
VITE_BASE_PATH=/ianlgnk/ yarn build
yarn preview
```

Variáveis no `.env` (ver `.env.example`):

| Variável | Uso |
| :--- | :--- |
| `VITE_EMAILJS_PUBLIC_KEY` | Chave pública do EmailJS |
| `VITE_EMAILJS_SERVICE_ID` | ID do serviço |
| `VITE_EMAILJS_TEMPLATE_ID` | ID do template (`from_name`, `from_email`, `message`) |

<br />

## Build e deploy

O workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) roda em cada **push na `main`**:

1. **Checkout** do repositório e **Node 22** (cache do Yarn).
2. **`yarn install --frozen-lockfile`** e gravação do `.env` a partir do secret **`ENV`** (variáveis do EmailJS em produção).
3. **`yarn build`** com `VITE_BASE_PATH=/ianlgnk/` — o Vite gera `dist/` com caminhos corretos para o subpath do GitHub Pages.
4. **Upload** do artefato e **deploy** no ambiente `github-pages`.

Site publicado: **https://ianlgnk.github.io/ianlgnk/**

Comandos úteis localmente:

```bash
yarn build    # tsc -b && vite build
yarn lint     # ESLint
yarn preview  # serve a pasta dist/ após o build
```

<br />

## GitHub

<p align="left">
  <a href="https://github.com/ianlgnk?tab=repositories">
    <img src="https://img.shields.io/github/followers/ianlgnk?label=Seguidores&style=flat-square&logo=github" alt="Seguidores no GitHub" />
  </a>
  <img src="https://img.shields.io/github/stars/ianlgnk/ianlgnk?style=flat-square&logo=github&label=Stars%20neste%20repo" alt="Stars neste repositório" />
</p>

<br />

<div align="center">

*Obrigado por passar por aqui — se quiser trocar uma ideia, chama no [LinkedIn](https://linkedin.com/in/ianlgnk) ou no [e-mail](mailto:ianlgnk@gmail.com).*

</div>
