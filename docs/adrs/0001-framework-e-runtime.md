# ADR-0001: Framework, runtime e linguagem

- **Status:** Aceita
- **Data:** 2026-08-29
- **Decisores:** Gustavo Mathias Rocha (product owner)

## Contexto

O projeto `gustavomathias.dev` é uma landing page pessoal de página única, com
conteúdo estático, hospedada na Vercel e mantida como repositório público no
GitHub para servir de vitrine técnica para recrutadores. O código-fonte, portanto,
é parte do produto: as escolhas de stack precisam ser defensáveis e refletir a
atuação profissional do autor (TypeScript, Next.js, Node.js).

Requisitos que pesam na decisão:

- SEO básico (meta tags, Open Graph, sitemap) — favorece renderização no
  servidor / geração estática.
- Core Web Vitals otimizados e responsividade mobile-first.
- Deploy sem fricção na Vercel.
- Sem backend nem CMS neste momento (ver [ADR-0004](./0004-conteudo-estatico-sem-cms.md)).
- Stack alinhada ao perfil profissional exibido na própria página.

## Decisão

Adotar:

- **Next.js 16, linha 16.3.x** (App Router), instalado via `next@latest` no
  momento do scaffold. A versão estável mais recente confirmada por pesquisa em
  2026-08-29 é a série **16.3** (16.3.0 estável em 03/08/2026; 16.3.3 como
  release de segurança em 25/08/2026). Não fixamos um patch específico no
  `package.json` além do range de cuidado padrão do `create-next-app`; deixamos o
  lockfile ser a fonte determinística.
- **Runtime Node.js 24 LTS** (desenvolvimento em `v24.20.0`). Fixado via
  `.nvmrc`, campo `engines` no `package.json` e `"nodeVersion"` correspondente na
  configuração da Vercel.
- **TypeScript** em modo estrito (`strict: true`), sem `any` implícito.
- **Tailwind CSS v4** para estilização, conforme scaffold padrão do
  `create-next-app` da linha 16 (PostCSS + `@import "tailwindcss"`, detecção
  automática de conteúdo, sem `tailwind.config.js` obrigatório).
- **Turbopack** como bundler (padrão do `create-next-app` 16) para dev e build.
- **React 19**, versão trazida transitivamente pelo Next.js 16.

Estratégia de renderização: **Static Site Generation** para todas as rotas. Sem
rotas dinâmicas, sem Server Actions, sem API Routes nesta fase. O site deve
buildar como estático puro e ser servível pela CDN da Vercel.

> **Emenda (2026-08-29):** com a adoção do Sanity
> ([ADR-0007](./0007-sanity-cms-para-conteudo.md)), a estratégia passa a ser
> **SSG + ISR**: conteúdo buscado em build, revalidação sob demanda via webhook
> (`/api/revalidate`) e fallback por tempo. Passa a existir um route handler para
> a revalidação. Não há banco relacional nem backend próprio
> ([ADR-0008](./0008-postgres-na-vps-via-cloudflare-tunnel.md) foi descontinuada);
> a única superfície server-side é o endpoint de revalidação.

## Consequências

### Positivas

- App Router + SSG entrega HTML pré-renderado, bom para SEO e para LCP/CLS.
- `next/image`, `next/font` e o `Metadata` API cobrem otimização de imagem,
  fontes e Open Graph sem dependências extras.
- Stack idêntica à que o autor usa profissionalmente — o repositório é
  autoexplicativo como amostra de trabalho.
- Deploy na Vercel é zero-config para Next.js.
- Turbopack reduz tempo de build e melhora o loop de desenvolvimento.

### Negativas / trade-offs

- Next.js é peso considerável para uma landing page única; um gerador estático
  mais enxuto (Astro) produziria menos JavaScript no cliente. Aceitamos o
  trade-off pelo valor de vitrine.
- Acompanhar a linha 16.x exige atenção a breaking changes entre minors e aos
  releases de segurança.
- Tailwind v4 e Turbopack são relativamente recentes; algum ferramental de
  terceiros pode ainda não ter suporte pleno.

### Neutras / de acompanhamento

- Revisar a versão do Next.js a cada release de segurança da linha 16.x.
- Quando o Node 24 sair de *Active LTS* para *Maintenance*, planejar a migração
  para o próximo LTS par.

## Alternativas consideradas

- **Astro** — menor payload de JS, ótimo para conteúdo estático. Descartada
  porque a página é vitrine de competência em Next.js/React; usar outra stack
  enfraqueceria essa mensagem.
- **Vite + React puro** — exigiria montar SEO, roteamento e geração estática
  manualmente. Sem ganho relevante para o caso.
- **Next.js 15 (linha anterior)** — estável e madura, mas sem motivo para começar
  um projeto novo numa linha anterior à atual.
- **Pages Router** — legado; o App Router é o caminho recomendado e é o que o
  autor usa em produção.
