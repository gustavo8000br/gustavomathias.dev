# ADR-0007: Sanity CMS para o conteúdo editorial

- **Status:** Aceita
- **Data:** 2026-08-29
- **Decisores:** Gustavo Mathias Rocha (product owner)
- **Substitui:** [ADR-0004](./0004-conteudo-estatico-sem-cms.md)

## Contexto

O ADR-0004 decidiu manter todo o conteúdo como objetos TypeScript no repositório.
O product owner reviu essa decisão: quer poder editar conteúdo (bio, lista de
projetos, textos das seções) sem abrir o editor de código nem fazer deploy, e
quer que o repositório demonstre integração com um CMS headless — competência
relevante para a vitrine.

O repositório continua público; portanto **nenhum segredo** (tokens de API,
dataset de escrita) pode ser commitado.

## Decisão

Adotar **Sanity** como CMS headless para o conteúdo editorial do site.

- **Sanity Studio** versionado **dentro deste repositório**, em `sanity/`
  (embarcado, servido em `/studio` via rota do Next.js, ou como projeto Studio
  separado — decidir na implementação). Config, schemas e migrations no git.
- **Plano:** Sanity free tier enquanto couber (1 projeto, 2 usuários, 3 datasets).
- **Datasets:** `production` (público, `visibility: public`) e `development`.
- **Consumo no Next.js:**
  - Leitura via `@sanity/client` com **CDN da API do Sanity** (`useCdn: true`)
    para produção; queries GROQ tipadas com `sanity-codegen` / `groq` +
    `@sanity/types`.
  - `projectId` e `dataset` são públicos (podem ficar em `NEXT_PUBLIC_*`).
  - **Token de leitura** só é necessário para preview/draft — fica em variável de
    ambiente **na Vercel**, nunca no repositório.
- **Renderização:** as páginas passam de SSG puro para **SSG + ISR**. Conteúdo é
  buscado em build; revalidação sob demanda via **webhook do Sanity → route
  handler `/api/revalidate`** (com `revalidateTag`), assinado com um segredo
  (`SANITY_REVALIDATE_SECRET`, só na Vercel). Fallback: `revalidate` por tempo
  (ex.: 3600s).
- **Imagens:** servidas pelo pipeline do Sanity (`@sanity/image-url`);
  `next.config.ts` libera `cdn.sanity.io` em `images.remotePatterns`.
- **Escopo do conteúdo no Sanity — 100% do conteúdo editável do site:**
  `profile` (Hero + Sobre + `stats[]` da faixa de contadores + `since` para
  valores derivados; opcionalmente `photo`), `techStack` (grupos e itens da
  seção Stack), `project` (cards do portfólio — título, descrição, links, imagem,
  flag `draft`), `contactLinks` (e-mail, WhatsApp, LinkedIn, GitHub),
  `siteSettings` (SEO, OG), `service` (seção Serviços — **criado só se Gustavo
  confirmar a seção**).
- **Foto de perfil:** por ora um arquivo estático em `public/profile.jpg`
  (Gustavo adiciona depois); `profile.photo` no Sanity fica como opção futura com
  precedência sobre o arquivo estático.
  Todas as cinco seções são editáveis pelo Studio sem deploy. Não há banco
  relacional no projeto (ver [ADR-0008](./0008-postgres-na-vps-via-cloudflare-tunnel.md),
  descontinuada).

## Consequências

### Positivas

- Edição de conteúdo sem deploy; preview de rascunhos.
- Studio versionado = schema auditável, histórico no git.
- ISR mantém o site majoritariamente estático na borda da Vercel (bom p/ CWV).
- `projectId`/`dataset` públicos → o repositório continua sem segredos.
- Demonstra, na prática, integração CMS headless + ISR + webhooks.

### Negativas / trade-offs

- Nova dependência externa e um SaaS a mais no caminho crítico do build.
- Complexidade de renderização sobe (build-time fetch, tags de cache, endpoint de
  revalidação assinado).
- Risco de vendor lock-in no modelo de dados do Sanity (GROQ, Portable Text).
- Free tier tem limites de API/bandwidth que precisam ser monitorados.
- O conteúdo deixa de ter rollback via git puro (fica no histórico do Sanity).

### Neutras / de acompanhamento

- `src/content/` do ADR-0003 passa a hospedar **apenas** tipos/adapters e dados
  não editoriais (ex.: rótulos de UI), não o conteúdo em si.
- Definir na implementação: Studio embarcado (`/studio`) vs. deploy separado em
  `studio.gustavomathias.dev`.
- Documentar no README as variáveis de ambiente da Vercel (nenhuma no repo).

## Alternativas consideradas

- **Manter ADR-0004 (conteúdo em TS)** — rejeitada pelo product owner: quer
  edição sem deploy e a demonstração de CMS.
- **MDX no repositório** — resolve texto longo, mas ainda exige commit/deploy e
  não demonstra CMS.
- **Contentful / Payload / Strapi** — Sanity escolhido pela combinação
  Studio-as-code + free tier + ecossistema maduro com Next.js. Payload exigiria
  hospedar o próprio backend (poderia ir na VPS, mas aumenta escopo agora).
