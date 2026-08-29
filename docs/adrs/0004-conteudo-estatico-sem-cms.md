# ADR-0004: Conteúdo estático no código, sem CMS

- **Status:** Substituída por [ADR-0007](./0007-sanity-cms-para-conteudo.md) (2026-08-29)
- **Data:** 2026-08-29
- **Decisores:** Gustavo Mathias Rocha (product owner)

> **Nota (2026-08-29):** decisão revertida no mesmo dia. O product owner optou por
> adotar Sanity CMS para o conteúdo editorial e um Postgres próprio na VPS para
> dados de aplicação. Ver [ADR-0007](./0007-sanity-cms-para-conteudo.md) e
> [ADR-0008](./0008-postgres-na-vps-via-cloudflare-tunnel.md). O texto abaixo fica
> preservado como registro histórico.

## Contexto

A landing page tem cinco seções (Hero, Sobre, Stack, Projetos, Contato) com
conteúdo que muda raramente — talvez algumas vezes por ano, quando um projeto
novo entra no portfólio ou a bio é ajustada. O autor é o único editor e é
desenvolvedor.

Opções para gerir esse conteúdo: um CMS headless (Sanity, Contentful, Payload),
arquivos Markdown/MDX no repositório, ou dados TypeScript tipados no próprio
código.

## Decisão

**Manter todo o conteúdo como dados TypeScript tipados em `src/content/`**, sem
CMS e sem backend, nesta fase do projeto.

- `src/content/profile.ts`, `stack.ts`, `projects.ts`, `contact.ts` exportam
  objetos com tipos explícitos.
- Edições de conteúdo são commits normais, revisados via PR como qualquer outra
  mudança (e sujeitas ao versionamento do [ADR-0005](./0005-esquema-de-versionamento.md)).
- Projetos ainda não definidos entram como placeholders marcados com `// TODO`
  e um campo `draft: true` que os esconde do build de produção.

## Consequências

### Positivas

- Zero serviço externo, zero chave de API, zero custo, zero superfície de ataque
  adicional. Build 100% estático.
- Conteúdo versionado junto com o código; histórico e rollback triviais.
- Tipagem garante que nenhuma seção renderize com campo faltando.

### Negativas / trade-offs

- Toda edição de texto exige commit + deploy — sem interface amigável para
  edição rápida.
- Não serve para um cenário com editores não técnicos (não é o caso hoje).

### Neutras / de acompanhamento

- Se o site ganhar um blog com publicação frequente, reavaliar: MDX no
  repositório primeiro; CMS headless só se a frequência justificar. Uma nova ADR
  registrará essa mudança.

## Alternativas consideradas

- **CMS headless (Sanity/Contentful/Payload)** — overkill para conteúdo que muda
  poucas vezes ao ano; adiciona dependência, custo e complexidade de build.
- **Markdown/MDX no repositório** — bom para texto longo; desnecessário para
  conteúdo curto e estruturado, e exigiria um pipeline de parsing agora.
- **JSON puro** — perde a checagem de tipos e o autocomplete que os objetos TS dão.
