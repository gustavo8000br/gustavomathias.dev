# ADR-0002: Biome como linter e formatter único

- **Status:** Aceita
- **Data:** 2026-08-29
- **Decisores:** Gustavo Mathias Rocha (product owner)

## Contexto

O `create-next-app` oferece ESLint por padrão. Manter ESLint + Prettier significa
dois binários, dois arquivos de configuração, plugins de integração entre eles e
tempo de execução relevante em projetos maiores. O projeto quer uma toolchain
mínima e rápida.

## Decisão

Adotar **Biome** (`@biomejs/biome`) como linter **e** formatter único,
substituindo ESLint e Prettier. Instalar via `@latest` no scaffold — versão
estável mais recente confirmada por pesquisa em 2026-08-29: série **2.5.x**
(2.5.10 em 21/08/2026).

- Não selecionar ESLint no `create-next-app` (flag `--eslint` omitida / `--no-eslint`).
- `biome.json` na raiz com formatter e linter habilitados; regras recomendadas +
  regras de acessibilidade (`a11y`) ativas.
- Scripts no `package.json`: `lint` (`biome check`), `format` (`biome format --write`).
- Hook de CI roda `biome ci` (falha em qualquer violação ou arquivo não formatado).

## Consequências

### Positivas

- Um único binário em Rust; lint + format em uma passada, muito rápido.
- Uma configuração (`biome.json`) em vez de três ou quatro arquivos.
- Menos devDependencies e menos superfície de manutenção.

### Negativas / trade-offs

- Ecossistema de plugins menor que o do ESLint; regras muito específicas de
  bibliotecas podem não existir.
- Não há o plugin oficial `eslint-config-next`; validações específicas do Next.js
  (ex.: uso incorreto de `next/image`, `next/link`) ficam por conta de revisão
  humana e do próprio compilador do Next.
- Ferramenta mais jovem que ESLint/Prettier.

### Neutras / de acompanhamento

- Reavaliar se surgir necessidade de regras que só o ESLint cobre; nesse caso,
  ESLint pode ser reintroduzido apenas para lint, mantendo Biome no formatting.

## Alternativas consideradas

- **ESLint + Prettier** — padrão de mercado, mas mais lento e mais peças móveis.
- **Apenas Prettier + `next lint`** — ainda dois mundos; `next lint` foi
  descontinuado na linha 16.
- **Oxlint** — muito rápido, mas sem formatter integrado; ainda precisaria de
  Prettier ao lado.
