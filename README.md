# gustavomathias.dev

Portfólio pessoal de **Gustavo Mathias Rocha** — desenvolvedor web full stack,
atuação freelance desde 2015 (São Paulo, SP).

🔗 <https://gustavomathias.dev>

> ⚠️ **Este repositório é público como vitrine técnica, não como template.**
> O código está sob licença MIT; a identidade visual, o design system e o
> conteúdo são **todos os direitos reservados**. Ver [`NOTICE.md`](./NOTICE.md).

---

## Status

🚧 Em configuração inicial. As decisões estruturais estão registradas em
[`docs/adrs/`](./docs/adrs/) e o design system em
[`docs/design-system.md`](./docs/design-system.md). A implementação do site
(Next.js) vem a seguir.

## Stack pretendida

| Camada | Tecnologia |
|--------|------------|
| Framework | Next.js 16 (App Router) · React 19 |
| Runtime | Node.js 24 LTS |
| Linguagem | TypeScript (strict) |
| Estilo | Tailwind CSS v4 |
| Lint / Format | Biome |
| Conteúdo | Sanity (CMS headless) |
| Renderização | SSG + ISR |
| Deploy | Vercel |

Detalhes e justificativas: [`docs/adrs/0001`](./docs/adrs/0001-framework-e-runtime.md)
em diante.

## Estrutura

```
docs/
├── adrs/                # Architecture Decision Records
└── design-system.md     # Design system (tokens, componentes, padrões)
```

A estrutura de `src/` está especificada em
[`docs/adrs/0003-estrutura-de-pastas.md`](./docs/adrs/0003-estrutura-de-pastas.md).

## Versionamento

Esquema `vMAJOR.MINOR.PATCH-HHHHHHH-stage` (ex.: `v0.2.0-d016811-alpha`).
A versão vigente está em [`VERSION`](./VERSION); o stage em
[`.release-stage`](./.release-stage). Regras completas em
[`docs/adrs/0005-esquema-de-versionamento.md`](./docs/adrs/0005-esquema-de-versionamento.md).

Branches: `dev` (integração) → `homologacao` (staging) → `main` (produção).
Trabalho de feature em branches `feat/*`, `fix/*`, `chore/*` etc., via PR contra
`dev`.

## Sobre reuso

Ver [`LICENSE`](./LICENSE) (código) e [`NOTICE.md`](./NOTICE.md) (identidade e
conteúdo).
