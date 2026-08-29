# ADR-0008: Postgres na VPS acessado via Cloudflare Tunnel

- **Status:** Descontinuada — não implementada (2026-08-29)
- **Data:** 2026-08-29
- **Decisores:** Gustavo Mathias Rocha (product owner)

> **Decisão (2026-08-29):** Postgres e Cloudflare Tunnel **removidos do escopo**
> deste projeto. Motivo: com o Sanity ([ADR-0007](./0007-sanity-cms-para-conteudo.md))
> cobrindo 100% do conteúdo editável (Hero, Sobre, Stack, Projetos, Contato) e a
> seção Contato sendo apenas links (sem formulário), não há caso de uso concreto
> para um banco relacional próprio agora. A incompatibilidade Tunnel-HTTP ↔
> Postgres-TCP exigiria uma API na VPS que não se justifica sem demanda real.
>
> Se no futuro surgir necessidade concreta (persistir leads de um formulário,
> analytics próprio, área dinâmica), reabrir com **API HTTP na VPS atrás do
> Cloudflare Tunnel** (opção A abaixo) em uma **ADR nova**. O texto abaixo fica
> como registro da análise.

## Contexto

Além do conteúdo editorial no Sanity ([ADR-0007](./0007-sanity-cms-para-conteudo.md)),
o projeto terá um **banco Postgres próprio** para dados de aplicação (escopo
ainda a definir — o product owner declarou "pequeno db, depois planejamos o
resto"). Candidatos prováveis: registro de contatos/leads, contador de views,
analytics simples, futuros formulários.

Infraestrutura disponível:

- **VPS própria**, IP `92.113.34.181`, já rodando **outras instâncias de
  Postgres e outros projetos**.
- Requisito de segurança: **não expor porta de Postgres publicamente**. O acesso
  ao banco deve passar por **Cloudflare Tunnel (`cloudflared`)**.

O domínio já usa Cloudflare (ADR-0001 menciona Cloudflare na stack); a conta
Cloudflare está disponível.

## Decisão (parte firme)

1. **Um Postgres dedicado a este projeto** na VPS — instância ou, no mínimo,
   database + role isolados, com credenciais exclusivas e sem superuser.
   Não compartilhar database com os outros projetos da VPS.
2. **Zero exposição pública** da porta Postgres. `pg_hba.conf` / firewall da VPS
   permitem conexão apenas de `localhost` (e da rede Docker local, se aplicável).
3. **Toda a conectividade externa passa por Cloudflare Tunnel** originado na VPS
   (`cloudflared` como serviço systemd ou container), autenticado por
   **Cloudflare Access** (service token para acesso máquina-a-máquina).
4. **Migrations com Prisma** (stack já usada pelo autor); schema versionado neste
   repositório em `prisma/`.
5. **Segredos** (connection string, service token do Access) **nunca** no
   repositório público — só em variáveis de ambiente da Vercel e num `.env` local
   fora do git.

## Em aberto (planejar depois — "o resto")

- **Modelo de acesso do app à porta 5432 via túnel.** Cloudflare Tunnel expõe
  HTTP nativamente; Postgres é TCP. As runtimes serverless da Vercel **não**
  rodam `cloudflared access tcp` como sidecar. Opções a avaliar:
  - **(A) API fina na VPS atrás do túnel** (HTTP): um serviço pequeno
    (NestJS ou PostgREST) exposto como `db-api.gustavomathias.dev` via
    `cloudflared`, protegido por Cloudflare Access (service token). O Next.js
    fala **HTTPS**, não Postgres. — *Provável preferida: alinhada à stack, sem
    hack de TCP.*
  - **(B) `cloudflared access tcp` num ambiente que permita processo longo**
    (ex.: as próprias rotas do app rodando na VPS, não na Vercel; ou Vercel
    com runtime Node dedicado). Aumenta acoplamento à infra.
  - **(C) Cloudflare Hyperdrive / Tunnel + Workers** — Hyperdrive é para
    Workers, não Vercel; descartar salvo se parte do app migrar para Workers.
  - **(D) Acesso só em build/CI** (dados lidos em build via túnel TCP a partir
    do runner do GitHub Actions, que pode rodar `cloudflared`), sem acesso em
    runtime. Serve se os dados forem read-mostly.
- **Escopo do schema** (quais tabelas, o que realmente vai pro Postgres vs.
  Sanity).
- **Escrita a partir do site** (formulários) — exige runtime com acesso ao banco;
  depende da opção acima.
- **Backups** do Postgres do projeto (cron `pg_dump` + retenção; destino).
- **Observabilidade** e alerta de indisponibilidade do túnel.
- Se a opção (A) for escolhida, essa API vira um novo componente do sistema e
  merece ADR própria (linguagem, auth, deploy na VPS, CI).

## Consequências

### Positivas

- Porta do banco nunca exposta; superfície de ataque mínima.
- Cloudflare Access dá autenticação + logs de acesso centralizados.
- Reaproveita infra que o autor já paga e opera; custo marginal ~zero.
- Demonstra competência em infra/rede/segurança (parte do perfil da vitrine).

### Negativas / trade-offs

- A VPS entra no caminho crítico de qualquer feature que dependa do Postgres —
  ponto único de falha sob responsabilidade do autor (uptime, patching, backup).
- `cloudflared` + Access + (provável) API fina = várias peças novas a operar e
  monitorar.
- Incompatibilidade nativa entre Tunnel (HTTP) e Postgres (TCP) força uma camada
  intermediária ou um runtime não-serverless — decisão ainda não tomada.
- Latência extra (Vercel → Cloudflare edge → túnel → VPS → Postgres).
- Convive com outros Postgres na mesma VPS: risco de contenção de recursos e de
  erro operacional (mexer na instância errada). Mitigado por isolamento de
  instância/credenciais e nomes explícitos.

### Neutras / de acompanhamento

- Enquanto as decisões em aberto não forem tomadas, **nenhum código de acesso a
  banco entra no projeto**. Hero + Sobre (próxima entrega) não dependem disto.
- Registrar no README a topologia final e o procedimento de rotação do service
  token.

## Alternativas consideradas

- **Postgres gerenciado (Neon / Supabase / Vercel Postgres)** — zero operação,
  integração serverless nativa, sem túnel. Rejeitada: o product owner quer usar a
  VPS própria e demonstrar a topologia com Cloudflare Tunnel.
- **Expor 5432 com TLS + allowlist de IP** — os ranges de IP da Vercel são
  amplos e mutáveis; allowlist frágil. Contraria o requisito de não expor a porta.
- **VPN (WireGuard) entre Vercel e VPS** — Vercel não permite configurar VPN no
  runtime serverless.
- **SSH tunnel** — processo longo, mesmo problema da opção (B); menos observável
  que Cloudflare Access.
