# ADR-0005: Esquema de versionamento `vMAJOR.MINOR.PATCH-HHHHHHH-stage`

- **Status:** Aceita
- **Data:** 2026-08-29
- **Decisores:** Gustavo Mathias Rocha (product owner)

## Contexto

O projeto quer um esquema de versionamento explícito, auditável e parcialmente
automatizado, adaptado de um projeto anterior do autor. A intenção é separar
com clareza **o que é decisão humana** (o nível semântico da mudança e a
maturidade do sistema) **do que é mecânico** (injetar o hash do commit de origem,
criar tags e releases).

Restrição de infraestrutura: o repositório fica em conta pessoal, não em
organização. O `GITHUB_TOKEN` padrão do GitHub Actions não faz bypass de
*rulesets* em branch protegida (ver [ADR-0006](./0006-deploy-key-para-ci-em-branch-protegida.md)).

## Decisão

### Formato

```text
vMAJOR.MINOR.PATCH-HHHHHHH-stage
```

Exemplo: `v0.2.0-d016811-alpha`

| Segmento | Significado | Como é definido |
|----------|-------------|-----------------|
| `MAJOR.MINOR.PATCH` | Nível semântico da mudança | **Decisão humana**, sinalizada por label na PR |
| `HHHHHHH` | Hash curto (7 chars) do commit de origem em `dev` | **Automático**, injetado pelo CI na promoção para `main` |
| `stage` | Maturidade do sistema: `alpha → beta → rc → stable` | **Decisão humana**, via arquivo `.release-stage` |

### Onde a versão vive

| Local | Conteúdo | Autoridade |
|-------|----------|------------|
| `VERSION` (raiz) | String completa `vX.Y.Z-hhhhhhh-stage` | Fonte canônica em disco |
| `.release-stage` (raiz) | Apenas o stage (`alpha`\|`beta`\|`rc`\|`stable`) | Fonte do segmento stage |
| `package.json` → `version` | **Apenas** `MAJOR.MINOR.PATCH` (núcleo SemVer) | Espelho; nunca a string completa |
| Tag git anotada em `main` | String completa | **Autoritativa e imutável** |
| `CHANGELOG.md` | Uma seção por versão, com os commits promovidos | Histórico legível |

O `package.json` guarda só o núcleo SemVer de propósito: se o hash curto sair
totalmente numérico (ex.: `0161811`), a string completa como `version` seria um
pré-release SemVer inválido ou ambíguo. O espelho fica seguro.

### Branches

> **Emenda (2026-08-29):** o modelo passou de 2 para **3 branches**, adicionando
> um ambiente de homologação/staging entre integração e produção.

- `dev` — **integração**; recebe todas as PRs de feature (`feat/*`, `fix/*`,
  `chore/*`, …). Deploy de preview automático da Vercel por PR.
- `homologacao` — **staging**; recebe merge de `dev` via PR. É o ambiente onde a
  próxima release é validada de ponta a ponta. Deploy dedicado da Vercel
  (branch `homologacao` → domínio de preview, ex.: `homolog.gustavomathias.dev`).
- `main` — **produção**; só recebe merge de `homologacao` via PR de promoção.
  Deploy de produção da Vercel aponta para `main`.

Fluxo: `feat/* → (PR) → dev → (PR) → homologacao → (PR de promoção) → main`.

**Somente estas três branches são permanentes.** Branches de trabalho são
efêmeras e **excluídas automaticamente no merge** (config do repositório
`delete_branch_on_merge: true` + ruleset que restringe criação de branches fora
dos prefixos permitidos).

### Mecânica de CI (GitHub Actions)

**1. PR para `dev` — job `version-label` (obrigatório, falha fechado)**

- Exige **exatamente uma** label entre `version:major`, `version:minor`,
  `version:patch`, `version:none`. Ausência ou múltiplas → falha.
- `version:none` só é aceita se o diff não tocar código executável (apenas
  `docs/**`, `*.md`, arquivos de config sem efeito de runtime). Caso contrário,
  falha pedindo uma label de nível real.
- Publica/atualiza um comentário de prévia:
  `v<próxima calculada>-<pendente>-<stage atual>`.

**2. PR de `dev` → `homologacao` — workflow `stage-check`**

- Não altera versão. Roda o build completo + lint + typecheck + testes.
- Reagrega as labels `version:*` das PRs mergeadas em `dev` desde a última
  promoção e recomenta a prévia da versão (`v<próxima>-<dev HEAD short>-<stage>`).
- Serve de gate: só o que passou aqui chega a `main`.

**3. PR de `homologacao` → `main` — workflow `promote`**

- Lê a versão vigente de `VERSION` / `package.json`.
- Agrega as labels `version:*` de **todas as PRs** promovidas desde a última
  release e usa a **mais alta** (`major` > `minor` > `patch` > `none`).
- Calcula o hash curto (7) do commit de origem em `dev`
  (o `dev` HEAD que originou este ciclo de homologação).
- Atualiza `VERSION`, `package.json` (`version` = núcleo SemVer) e `CHANGELOG.md`
  (promove `## [Unreleased]` → `## [vX.Y.Z] - AAAA-MM-DD`, listando os commits).
- Commita essas mudanças **de volta em `dev`** (e faz fast-forward de
  `homologacao`), para que a fonte canônica em disco fique atualizada em todas as
  branches. Requer a deploy key do [ADR-0006](./0006-deploy-key-para-ci-em-branch-protegida.md)
  se as branches forem protegidas contra push do `GITHUB_TOKEN`.
- Não cria tag nem release.

**4. Push em `main` — workflow `release`**

- Lê `VERSION`.
- Cria a **tag anotada** com a string completa e o **GitHub Release**
  correspondente.
- **Falha** se a tag já existir.
- Não commita nada — só tag e release.

## O que NÃO é automatizado (deliberadamente)

Estas decisões **nunca** são inferidas do diff, do tipo de commit (não usamos
Conventional Commits como gatilho de versão) nem do texto da mensagem:

- **Promoção de stage** (`alpha → beta → rc → stable`) — sempre manual, editando
  `.release-stage` num commit próprio.
- **Escolha entre MINOR e PATCH** — depende de julgamento humano sobre o raio de
  alcance da mudança (nova seção visível vs. ajuste de copy/CSS). Não é derivável
  mecanicamente.
- **Escolha de MAJOR** — exige confirmação humana explícita de que um marco está
  100% funcional em produção. Nunca automática.

O CI **impõe** que uma label exista e **calcula** a próxima string; **não decide**
qual label aplicar.

## Consequências

### Positivas

- Rastreabilidade total: cada release em produção aponta para o commit exato de
  `dev` que a originou, via hash embutido e tag imutável.
- A fronteira humano/máquina fica explícita e é impossível "escorregar" para
  automação de decisões semânticas.
- `CHANGELOG.md` e GitHub Releases saem de graça, sempre consistentes com a tag.

### Negativas / trade-offs

- Duas branches e três workflows são bastante cerimônia para um site pessoal.
  Aceito como demonstração de rigor de processo (é vitrine).
- Exige disciplina de aplicar a label certa em toda PR.
- O commit-back do CI em `dev` protegida obriga a deploy key dedicada
  (ADR-0006), com o ônus de segredo a rotacionar.
- Risco de corrida se duas promoções acontecerem quase juntas — mitigado por
  serializar merges em `main`.

### Neutras / de acompanhamento

- Estado inicial: `VERSION` = `v0.1.0-0000000-alpha`, `.release-stage` = `alpha`,
  `package.json` `version` = `0.1.0`, `CHANGELOG.md` com seção `## [Unreleased]`.
- Definir as labels `version:major|minor|patch|none` no repositório antes da
  primeira PR.

## Alternativas consideradas

- **SemVer puro + tag simples** — perde o vínculo com o commit de origem e a
  noção de stage.
- **`semantic-release` / Conventional Commits** — derivaria o bump do texto do
  commit, exatamente o que este ADR quer evitar.
- **Calendar Versioning (CalVer)** — não comunica raio de alcance da mudança.
- **Single branch + tags** — simples, mas sem o gate de promoção `dev → main`
  que dá o ponto de decisão humano.
