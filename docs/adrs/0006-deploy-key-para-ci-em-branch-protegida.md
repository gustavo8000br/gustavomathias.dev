# ADR-0006: Deploy key dedicada para push automatizado do CI

- **Status:** Proposta
- **Data:** 2026-08-29
- **Decisores:** Gustavo Mathias Rocha (product owner)

## Contexto

O workflow `promote` do [ADR-0005](./0005-esquema-de-versionamento.md) (passo 2)
precisa **commitar de volta em `dev`** a atualização de `VERSION`,
`package.json` e `CHANGELOG.md`.

Restrições:

- O repositório está em **conta pessoal**, não em organização.
- Pretende-se proteger `dev` com *ruleset* exigindo PR e/ou histórico linear.
- O `GITHUB_TOKEN` padrão do GitHub Actions **não** faz bypass de *ruleset* de
  branch protegida em repositório de conta pessoal. Além disso, commits feitos
  com esse token **não disparam** novos workflows (proteção anti-loop).

## Decisão

Se — e somente se — `dev` for protegida por regras que bloqueiem o push direto do
`GITHUB_TOKEN`, provisionar uma **deploy key SSH dedicada com permissão de
escrita** para o push automatizado do passo 2:

- Par de chaves gerado localmente (`ed25519`), **exclusivo deste repositório**.
- Chave pública cadastrada em *Settings → Deploy keys* com **Allow write access**.
- Chave privada em *Settings → Secrets and variables → Actions* como
  `PROMOTE_DEPLOY_KEY`.
- O *ruleset* de `dev` inclui a deploy key na lista de **bypass actors**.
- O workflow `promote` usa `actions/checkout` com `ssh-key: ${{ secrets.PROMOTE_DEPLOY_KEY }}`
  e faz o push do commit de promoção por SSH.
- O commit de promoção usa uma identidade dedicada
  (`gustavomathias.dev CI <ci@gustavomathias.dev>`) para ficar distinguível no
  histórico.

Alternativa preferida **se a complexidade não se justificar**: manter `dev`
**não protegida** (ou protegida apenas com checks de status, sem exigir PR) e
deixar o `GITHUB_TOKEN` padrão fazer o commit-back. Nesse caso este ADR fica como
*Descontinuada — não implementada* e a decisão é registrada como tal.

## Consequências

### Positivas

- Permite manter `dev` protegida **e** ter o commit-back automatizado.
- Deploy key é escopada a um único repositório — vazamento não afeta a conta
  inteira, ao contrário de um PAT.
- Push via deploy key **dispara** os workflows subsequentes normalmente.

### Negativas / trade-offs

- Mais um segredo para guardar e **rotacionar** periodicamente.
- Configuração manual de *bypass actor* no *ruleset* — passo fácil de esquecer.
- Aumenta a complexidade de onboarding do repositório (documentar no README).

### Neutras / de acompanhamento

- Decidir na implementação do CI se `dev` será de fato protegida. Enquanto a
  resposta for "não", esta ADR não é ativada.
- Se ativada, adicionar seção "Segredos e chaves" ao README com o procedimento de
  rotação.

## Alternativas consideradas

- **PAT (fine-grained) em secret** — funciona, mas o escopo mínimo ainda é mais
  amplo que uma deploy key e expira/rotaciona com mais fricção.
- **GitHub App própria** — bypass limpo e tokens de curta duração, porém
  overkill para um repositório pessoal único.
- **Não commitar de volta; só criar tag no `release`** — perde a persistência de
  `VERSION`/`CHANGELOG.md` em `dev`, quebrando a "fonte canônica em disco" do
  ADR-0005.
- **`dev` sem proteção** — mais simples; é a alternativa preferida caso o rigor
  de branch protegida não agregue valor real ao projeto.
