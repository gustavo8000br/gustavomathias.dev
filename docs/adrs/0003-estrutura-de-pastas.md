# ADR-0003: Estrutura de pastas do projeto

- **Status:** Aceita
- **Data:** 2026-08-29
- **Decisores:** Gustavo Mathias Rocha (product owner)

## Contexto

Sendo um repositório público usado como vitrine, a organização de pastas comunica
tanto quanto o código. Precisa ser previsível, sem overengineering para uma
landing page única, mas pronta para crescer (ex.: um blog ou uma página `/uses`
no futuro).

## Decisão

Usar o layout `src/` do Next.js App Router, com componentes organizados por papel:

```text
gustavomathias-dev/
├── .github/workflows/      # CI (lint, build, versionamento, release)
├── docs/
│   ├── adrs/               # Architecture Decision Records
│   └── design-system.md    # Design system do projeto
├── public/                 # Assets estáticos (og-image, favicons, prints de projetos)
├── src/
│   ├── app/                # App Router: layout.tsx, page.tsx, sitemap.ts, robots.ts, opengraph-image
│   ├── components/
│   │   ├── sections/       # Uma pasta/arquivo por seção da página (Hero, About, Stack, Projects, Contact)
│   │   ├── ui/             # Primitivos reutilizáveis (Button, Card, Container, ThemeToggle)
│   │   └── layout/         # Header, Footer, SmoothScroll
│   ├── content/            # Dados estáticos tipados (perfil, stack, projetos) — fonte única de conteúdo
│   ├── lib/                # Helpers puros (cn, metadata, constantes de contato)
│   └── styles/             # globals.css e tokens de tema
├── .nvmrc                  # 24
├── biome.json
├── next.config.ts
├── VERSION                 # string completa da versão (ver ADR-0005)
├── .release-stage          # stage atual (alpha|beta|rc|stable)
└── CHANGELOG.md
```

Regras:

- **Imports absolutos** a partir de `@/` (alias para `src/`), conforme Artigo VI
  da Constitution do AIOX. Sem `../../..`.
- Todo texto de conteúdo (bio, lista de stack, projetos) vive em `src/content/`
  como objetos TypeScript tipados — nunca hard-coded dentro de JSX de seção.
- Cada seção é um Server Component por padrão; `"use client"` só onde há
  interatividade (toggle de tema, animações com estado).

## Consequências

### Positivas

- Separação clara entre "estrutura da página" (`sections/`), "peças de UI"
  (`ui/`) e "conteúdo" (`content/`).
- Trocar textos e dados de projeto não exige mexer em componentes.
- `src/` mantém a raiz limpa e é a convenção idiomática atual do Next.js.

### Negativas / trade-offs

- Para uma página só, `sections/` + `ui/` + `layout/` pode parecer cerimônia a
  mais no começo.

### Neutras / de acompanhamento

- Se surgir um blog, adicionar `src/app/blog/` e `src/content/posts/` sem
  reestruturar o resto.

## Alternativas consideradas

- **Sem `src/`, tudo na raiz** — mais ruído na raiz do repositório.
- **Componentes agrupados por seção (co-location total)** — bom em apps grandes;
  aqui geraria muitas pastas com um arquivo só.
- **Conteúdo em Markdown/MDX** — adiaria a necessidade de um parser; objetos TS
  tipados bastam enquanto o conteúdo é pequeno e sem formatação rica.
