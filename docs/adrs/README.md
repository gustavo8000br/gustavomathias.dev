# Architecture Decision Records — gustavomathias.dev

Registro das decisões estruturais do projeto. Cada ADR é imutável depois de
aceita: se uma decisão muda, cria-se um novo ADR que substitui o anterior
(marcando o antigo como *Substituída por ADR-XXXX*).

Formato: contexto → decisão → consequências. Template em
[`0000-adr-template.md`](./0000-adr-template.md).

| ADR | Título | Status |
|-----|--------|--------|
| [0001](./0001-framework-e-runtime.md) | Framework, runtime e linguagem (Next.js 16 App Router, Node 24 LTS, TypeScript, Tailwind v4) | Aceita |
| [0002](./0002-linter-e-formatter.md) | Biome como linter e formatter único | Aceita |
| [0003](./0003-estrutura-de-pastas.md) | Estrutura de pastas do projeto | Aceita |
| [0004](./0004-conteudo-estatico-sem-cms.md) | Conteúdo estático no código, sem CMS | ~~Aceita~~ Substituída por 0007 |
| [0005](./0005-esquema-de-versionamento.md) | Esquema de versionamento `vMAJOR.MINOR.PATCH-HHHHHHH-stage` | Aceita |
| [0006](./0006-deploy-key-para-ci-em-branch-protegida.md) | Deploy key dedicada para push automatizado do CI | Proposta |
| [0007](./0007-sanity-cms-para-conteudo.md) | Sanity CMS para o conteúdo editorial (SSG + ISR + webhook) | Aceita |
| [0008](./0008-postgres-na-vps-via-cloudflare-tunnel.md) | Postgres na VPS acessado via Cloudflare Tunnel | Descontinuada — não implementada |
| [0009](./0009-originalidade-e-licenciamento.md) | Originalidade do design e licenciamento dual (MIT + NOTICE) | Aceita |
