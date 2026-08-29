# Design System — gustavomathias.dev

Sistema visual próprio do projeto, definido do zero. Nenhum token, componente ou
padrão aqui é cópia de site de terceiros — a referência é apenas a linha visual
do banner de LinkedIn do autor (azul-marinho/preto com acentos em ciano, roxo e
verde-limão).

Direção: **dark mode como padrão**, com toggle opcional para light. Estética
tecnológica e minimalista, muito espaço negativo, hierarquia forte, movimento
discreto.

---

## 1. Princípios

1. **Conteúdo primeiro.** Tipografia e espaçamento carregam o design; efeitos são
   tempero, nunca a base.
2. **Dark-native.** As cores são pensadas para o tema escuro; o tema claro é uma
   derivação consistente, não um segundo design.
3. **Um acento por vez.** Ciano é a cor de ação padrão. Roxo e verde-limão são
   pontuações — aparecem em detalhes (categorias da stack, hovers, foco), nunca
   competindo entre si na mesma área.
4. **Acessível por construção.** Contraste mínimo AA (4.5:1 texto normal, 3:1
   texto grande e elementos de UI). Foco sempre visível. Movimento respeita
   `prefers-reduced-motion`.
5. **Mobile-first.** Todo componente é desenhado primeiro para 360px de largura.

---

## 2. Cores e superfícies

### 2.1 Paleta base (tema dark — padrão)

Tokens expostos como CSS custom properties em `src/styles/globals.css`, camada
`@theme` do Tailwind v4.

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-bg` | `#0A0E1A` | Fundo da página (azul-marinho quase preto) |
| `--color-surface` | `#111827` | Cards, superfícies elevadas nível 1 |
| `--color-surface-2` | `#1B2436` | Superfícies elevadas nível 2, inputs |
| `--color-border` | `#26304A` | Bordas sutis, divisores |
| `--color-border-strong` | `#3A4668` | Bordas de foco/hover em superfícies |
| `--color-text` | `#E8ECF5` | Texto primário |
| `--color-text-muted` | `#A2ADC4` | Texto secundário, legendas |
| `--color-text-faint` | `#6B768F` | Texto terciário, placeholders |

### 2.2 Acentos

| Token | Hex | Papel |
|-------|-----|-------|
| `--color-accent` (ciano) | `#38E0D0` | Ação primária, links, foco, sublinhados |
| `--color-accent-strong` | `#19B8AB` | Hover/active do ciano, texto ciano sobre fundo claro |
| `--color-violet` | `#8B7CF6` | Categoria "Backend", detalhes decorativos |
| `--color-lime` | `#B6F24A` | Categoria "Infraestrutura", indicador "disponível para projetos" |
| `--color-violet-soft` | `rgba(139,124,246,0.14)` | Fundo de chip/badge roxo |
| `--color-lime-soft` | `rgba(182,242,74,0.14)` | Fundo de chip/badge verde-limão |
| `--color-accent-soft` | `rgba(56,224,208,0.14)` | Fundo de chip/badge ciano |

Categorias da stack ↔ cor:

| Categoria | Acento |
|-----------|--------|
| Frontend | ciano (`--color-accent`) |
| Backend | roxo (`--color-violet`) |
| Banco de Dados | verde-limão (`--color-lime`) |
| Infraestrutura | ciano-esmaecido / `--color-text-muted` com borda ciano |

### 2.3 Semânticos

| Token | Hex (dark) | Uso |
|-------|-----------|-----|
| `--color-success` | `#4ADE80` | Confirmações |
| `--color-warning` | `#FBBF24` | Avisos, badges "TODO" de projeto placeholder |
| `--color-danger` | `#F87171` | Erros |

### 2.4 Tema light (derivado)

| Token | Hex |
|-------|-----|
| `--color-bg` | `#F7F9FC` |
| `--color-surface` | `#FFFFFF` |
| `--color-surface-2` | `#EDF1F8` |
| `--color-border` | `#D7DEEC` |
| `--color-text` | `#0F1626` |
| `--color-text-muted` | `#4A5570` |
| `--color-text-faint` | `#7B869C` |
| `--color-accent` | `#0FB5A6` (ciano mais escuro para contraste em fundo claro) |
| `--color-violet` | `#6D5CE0` |
| `--color-lime` | `#5C8A10` (escurecido; verde-limão puro não tem contraste em branco) |

Implementação: `:root` define o tema dark; `:root[data-theme="light"]` sobrescreve.
O toggle grava a escolha em `localStorage` (`gm-theme`) e, na ausência de escolha,
segue `prefers-color-scheme`. Script inline no `<head>` aplica o atributo antes da
pintura para evitar flash.

### 2.5 Gradiente de marca

Usado com muita parcimônia (título do Hero, borda de card em hover):

```css
--gradient-brand: linear-gradient(135deg, #38E0D0 0%, #8B7CF6 55%, #B6F24A 120%);
```

---

## 3. Tipografia

### 3.1 Famílias

| Papel | Fonte | Fallback | Como |
|-------|-------|----------|------|
| Display / headings | **Space Grotesk** | `ui-sans-serif, system-ui, sans-serif` | `next/font/google`, `--font-display` |
| Corpo / UI | **Inter** | `ui-sans-serif, system-ui, sans-serif` | `next/font/google`, `--font-sans`, `display: swap` |
| Código / detalhes técnicos | **JetBrains Mono** | `ui-monospace, SFMono-Regular, monospace` | `next/font/google`, `--font-mono` |

Space Grotesk dá o ar tecnológico nos títulos; Inter mantém o corpo neutro e
legível; JetBrains Mono aparece em rótulos pequenos (ex.: "// stack", números de
seção, hash de versão no rodapé).

### 3.2 Escala (mobile → desktop)

Escala modular ~1.25 (terça maior), fluida com `clamp()`.

| Token | clamp | Peso | Line-height | Uso |
|-------|-------|------|-------------|-----|
| `text-display` | `clamp(2.5rem, 6vw + 1rem, 4.5rem)` | 600 | 1.05 | H1 do Hero |
| `text-h2` | `clamp(1.75rem, 3vw + 0.5rem, 2.75rem)` | 600 | 1.15 | Título de seção |
| `text-h3` | `clamp(1.25rem, 1.5vw + 0.5rem, 1.5rem)` | 600 | 1.25 | Título de card |
| `text-lead` | `clamp(1.05rem, 1vw + 0.5rem, 1.25rem)` | 400 | 1.6 | Parágrafo de destaque (Hero, Sobre) |
| `text-body` | `1rem` (16px) | 400 | 1.65 | Corpo padrão |
| `text-sm` | `0.875rem` | 400 | 1.5 | Legendas, metadados de card |
| `text-mono-label` | `0.75rem` | 500, `letter-spacing: 0.08em`, `text-transform: uppercase` | 1.4 | Rótulos mono ("// sobre", "01 —") |

### 3.3 Regras

- Máximo de **~68 caracteres** por linha em blocos de texto (`max-width: 62ch`).
- Títulos em `text-wrap: balance`; parágrafos em `text-wrap: pretty`.
- Sem itálico decorativo; ênfase via peso ou cor de acento.
- Números e hash de versão sempre em `--font-mono` com `font-variant-numeric: tabular-nums`.

---

## 4. Grid, espaçamento e layout

### 4.1 Escala de espaçamento

Base 4px (escala padrão do Tailwind). Tokens semânticos adicionais:

| Token | Valor | Uso |
|-------|-------|-----|
| `--space-section-y` | `clamp(4rem, 10vw, 8rem)` | Padding vertical entre seções |
| `--space-gutter` | `clamp(1.25rem, 5vw, 2rem)` | Padding horizontal do container |
| `--space-stack` | `1.5rem` | Ritmo vertical padrão entre elementos de texto |

### 4.2 Container

- `Container`: `width: 100%`, `max-width: 72rem` (1152px), `margin-inline: auto`,
  `padding-inline: var(--space-gutter)`.
- Variante `Container size="prose"`: `max-width: 42rem` para blocos de leitura
  (Sobre).

### 4.3 Grid de referência

- 12 colunas conceituais no desktop; na prática o layout usa fl\|grid simples:
  - Hero: coluna única, alinhada à esquerda, conteúdo em `max-width: 46rem`.
  - Stack: grid `repeat(auto-fit, minmax(9rem, 1fr))` para os itens dentro de
    cada grupo de categoria.
  - Projetos: `repeat(auto-fit, minmax(17rem, 1fr))`, gap `1.5rem`.
  - Contato: lista vertical no mobile, linha de 4 no desktop.

### 4.4 Breakpoints (Tailwind v4 default)

`sm 40rem` · `md 48rem` · `lg 64rem` · `xl 80rem`. Design validado a 360px, 768px,
1024px, 1440px.

### 4.5 Seção

Cada `<section>` tem `id` (`#sobre`, `#stack`, `#projetos`, `#contato`),
`scroll-margin-top: 5rem`, e um cabeçalho padrão:

```
// {rótulo mono}          →  ex.: "// 02 — sobre"
{Título H2}
```

---

## 5. Componentes de UI

Todos em `src/components/ui/`. Estados sempre definidos: default, hover, focus-visible, active, disabled.

### 5.1 Button

| Prop | Valores |
|------|---------|
| `variant` | `primary` \| `secondary` \| `ghost` |
| `size` | `md` (padrão) \| `lg` |
| `as` | `button` \| `a` (link externo com `rel="noopener noreferrer"`) |

| Variante | Fundo | Texto | Borda | Hover |
|----------|-------|-------|-------|-------|
| primary | `--color-accent` | `#04201E` (quase preto esverdeado) | — | `--color-accent-strong` + leve translateY(-1px) |
| secondary | transparent | `--color-text` | `1px --color-border-strong` | fundo `--color-accent-soft`, borda `--color-accent` |
| ghost | transparent | `--color-text-muted` | — | texto `--color-text`, fundo `--color-surface-2` |

- Raio: `--radius-md` (10px). Altura: `md` 2.75rem, `lg` 3.25rem. Padding-inline:
  `1.25rem` / `1.75rem`.
- Tipografia: `text-sm`, peso 500, sem uppercase.
- Ícone opcional à esquerda ou direita (16–18px, `currentColor`), gap `0.5rem`.
- `focus-visible`: `outline: 2px solid var(--color-accent); outline-offset: 2px`.

### 5.2 Card

Usado em Projetos e nos grupos da Stack.

- Fundo `--color-surface`, borda `1px --color-border`, raio `--radius-lg` (14px),
  padding `1.5rem`.
- Hover (quando interativo): borda passa a `--color-accent`, `box-shadow:
  0 0 0 1px var(--color-accent), 0 12px 32px -12px rgba(56,224,208,0.25)`,
  `translateY(-2px)`.
- **ProjectCard**: imagem/print no topo (`aspect-ratio: 16/10`, `object-fit:
  cover`, raio interno 10px), título `text-h3`, descrição `text-sm` muted (máx. 3
  linhas), rodapé com links (repo / ao vivo) como `Button variant="ghost" size="md"`.
  Placeholder: badge `TODO` (cor `--color-warning`, fundo soft) no canto superior
  e imagem substituída por bloco com padrão de grid.

### 5.3 TechPill (item de stack)

- Linha com ícone (20px, monocromático `currentColor` na cor da categoria) +
  label (`text-sm`, `--color-text`).
- Fundo `--color-surface-2`, borda `1px --color-border`, raio `--radius-sm` (8px),
  padding `0.5rem 0.75rem`.
- Sem hover interativo (não é clicável); apenas leve realce de borda na cor da
  categoria.

### 5.4 Badge / Chip

- `text-mono-label`, padding `0.25rem 0.5rem`, raio `999px`.
- Variantes: `accent`, `violet`, `lime`, `warning` — cada uma usa o par
  `*-soft` (fundo) + cor sólida (texto/borda 1px).

### 5.5 Input / Textarea (definido para uso futuro; sem formulário nesta fase)

- Fundo `--color-surface-2`, borda `1px --color-border`, raio `--radius-md`,
  altura 2.75rem, padding-inline `0.875rem`, `text-body`.
- Focus: borda `--color-accent`, `box-shadow: 0 0 0 3px var(--color-accent-soft)`.
- Erro: borda `--color-danger`, mensagem `text-sm` cor `--color-danger`.
- Label `text-sm` peso 500 acima do campo; `gap 0.375rem`.

### 5.6 ThemeToggle

- Botão-ícone 2.5rem quadrado, `variant` visual = ghost, raio `--radius-md`.
- Ícone sol/lua (18px) com crossfade + rotação de 90° na troca (200ms).
- `aria-label` dinâmico ("Ativar tema claro" / "Ativar tema escuro"),
  `aria-pressed` reflete o estado.

### 5.7 SectionHeading

- Composição: `<span>` mono label + `<h2 class="text-h2">`.
- Prop `index` (ex.: `"02"`) e `label` (ex.: `"sobre"`) → renderiza `// 02 — sobre`.
- Margin-bottom `clamp(2rem, 5vw, 3.5rem)`.

### 5.8 Link (inline)

- Cor `--color-accent`; sublinhado com `text-underline-offset: 0.2em` e
  `text-decoration-color: color-mix(in srgb, var(--color-accent) 40%, transparent)`.
- Hover: `text-decoration-color` para 100% + cor `--color-accent-strong`.
- Externos ganham ícone ↗ (14px) opcional.

---

## 6. Ícones

- Biblioteca: **lucide-react** (instalada via `@latest`; MIT, tree-shakeable,
  traço consistente). Usada para ícones de UI (setas, sol/lua, mail, external-link,
  github, linkedin).
- Ícones de tecnologia da seção Stack: SVGs monocromáticos próprios em
  `public/icons/tech/` renderizados com `currentColor`, para manter unidade
  visual (todos no mesmo peso de traço, sem logos coloridos). Marcas sem símbolo
  simples (ex.: "APIs REST") usam um ícone genérico do lucide.
- Tamanhos: 16 (inline), 18–20 (botões, pills), 24 (destaques). `stroke-width: 1.75`.

---

## 7. Movimento e transições

### 7.1 Tokens

| Token | Valor |
|-------|-------|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` |
| `--dur-fast` | `120ms` |
| `--dur-base` | `200ms` |
| `--dur-slow` | `420ms` |

### 7.2 Padrões

- **Hover de controles** (botão, link, card): `--dur-fast`, `--ease-out`.
  Propriedades: `background-color`, `border-color`, `color`, `transform`,
  `box-shadow`. Nunca animar `width/height/top/left`.
- **Reveal on scroll**: elementos de seção entram com `opacity 0 → 1` +
  `translateY(12px → 0)`, `--dur-slow`, `--ease-out`, disparado por
  `IntersectionObserver` (threshold 0.15), com `stagger` de 60ms entre irmãos.
  Implementado num client component leve `<Reveal>`.
- **Scroll suave** entre seções: `html { scroll-behavior: smooth }` +
  `scroll-margin-top`. Sem biblioteca de scroll-jacking.
- **Hero**: gradiente de marca no título com leve animação de `background-position`
  (8s, linear, infinita) — apenas se `prefers-reduced-motion: no-preference`.
- **ThemeToggle**: ícone gira 90° e faz crossfade em `--dur-base`.

### 7.3 Reduced motion

`@media (prefers-reduced-motion: reduce)`: todas as transições e animações caem
para `1ms`, reveals aparecem já visíveis (`opacity: 1; transform: none`), o
gradiente do Hero fica estático.

---

## 8. Efeitos de fundo (decoração)

- **Grid sutil**: `background-image` de linhas a `rgba(255,255,255,0.03)` em
  células de 40px, aplicado atrás do Hero, com máscara radial que dissolve as
  bordas (`mask-image: radial-gradient(ellipse at top, black, transparent 70%)`).
- **Glow de acento**: um `radial-gradient` grande e muito diluído em ciano/roxo
  atrás do Hero e do rodapé (`opacity: 0.12`), sem custo de layout
  (`position: absolute`, `pointer-events: none`, `z-index: -1`).
- Nada de partículas, canvas ou WebGL — custo de CWV não se justifica.

---

## 9. Raios, sombras, bordas

| Token | Valor |
|-------|-------|
| `--radius-sm` | `8px` |
| `--radius-md` | `10px` |
| `--radius-lg` | `14px` |
| `--radius-full` | `999px` |
| `--shadow-card` | `0 1px 2px rgba(0,0,0,0.3), 0 8px 24px -12px rgba(0,0,0,0.5)` |
| `--shadow-accent` | `0 0 0 1px var(--color-accent), 0 12px 32px -12px rgba(56,224,208,0.25)` |

Bordas sempre `1px`. Divisores usam `--color-border`.

---

## 10. Acessibilidade — checklist do projeto

- [ ] Contraste AA verificado para todos os pares texto/fundo nos dois temas.
- [ ] `focus-visible` visível em todo elemento interativo (outline ciano 2px).
- [ ] Ordem de foco = ordem visual; um único `<h1>` (Hero).
- [ ] Landmarks: `<header>`, `<main>`, `<footer>`; cada seção com
      `aria-labelledby` apontando para seu heading.
- [ ] "Pular para o conteúdo" como primeiro elemento focável.
- [ ] Imagens de projeto com `alt` descritivo; ícones decorativos com
      `aria-hidden`.
- [ ] Links externos: `rel="noopener noreferrer"`, e-mail via `mailto:`,
      WhatsApp via `https://wa.me/5511976613682`.
- [ ] `prefers-reduced-motion` respeitado (seção 7.3).
- [ ] Toggle de tema operável por teclado, com `aria-pressed`.
- [ ] Alvos de toque ≥ 44×44px.

---

## 11. Tokens — referência rápida para `globals.css`

```css
:root {
  /* superfícies (dark, padrão) */
  --color-bg: #0A0E1A;
  --color-surface: #111827;
  --color-surface-2: #1B2436;
  --color-border: #26304A;
  --color-border-strong: #3A4668;
  --color-text: #E8ECF5;
  --color-text-muted: #A2ADC4;
  --color-text-faint: #6B768F;

  /* acentos */
  --color-accent: #38E0D0;
  --color-accent-strong: #19B8AB;
  --color-violet: #8B7CF6;
  --color-lime: #B6F24A;
  --color-accent-soft: rgba(56, 224, 208, 0.14);
  --color-violet-soft: rgba(139, 124, 246, 0.14);
  --color-lime-soft: rgba(182, 242, 74, 0.14);

  /* semânticos */
  --color-success: #4ADE80;
  --color-warning: #FBBF24;
  --color-danger: #F87171;

  /* raios */
  --radius-sm: 8px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-full: 999px;

  /* espaçamento semântico */
  --space-section-y: clamp(4rem, 10vw, 8rem);
  --space-gutter: clamp(1.25rem, 5vw, 2rem);
  --space-stack: 1.5rem;

  /* movimento */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --dur-fast: 120ms;
  --dur-base: 200ms;
  --dur-slow: 420ms;

  /* marca */
  --gradient-brand: linear-gradient(135deg, #38E0D0 0%, #8B7CF6 55%, #B6F24A 120%);
  --shadow-card: 0 1px 2px rgba(0,0,0,0.3), 0 8px 24px -12px rgba(0,0,0,0.5);
}

:root[data-theme="light"] {
  --color-bg: #F7F9FC;
  --color-surface: #FFFFFF;
  --color-surface-2: #EDF1F8;
  --color-border: #D7DEEC;
  --color-border-strong: #B9C4D9;
  --color-text: #0F1626;
  --color-text-muted: #4A5570;
  --color-text-faint: #7B869C;
  --color-accent: #0FB5A6;
  --color-accent-strong: #0A8F84;
  --color-violet: #6D5CE0;
  --color-lime: #5C8A10;
  --color-accent-soft: rgba(15, 181, 166, 0.12);
  --color-violet-soft: rgba(109, 92, 224, 0.12);
  --color-lime-soft: rgba(92, 138, 16, 0.14);
  --shadow-card: 0 1px 2px rgba(15,22,38,0.06), 0 8px 24px -12px rgba(15,22,38,0.18);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
  }
}
```

> Estes tokens são a fonte de verdade. A camada `@theme` do Tailwind v4 mapeia
> cada um para utilitários (`bg-surface`, `text-muted`, `rounded-lg`, etc.).

---

## 12. Aplicação por seção (resumo)

Ordem na página: Hero → **faixa de contadores** → Sobre → *Serviços (planejada)* →
Stack → Projetos → Contato → Footer.

| Seção | Componentes | Acento | Notas |
|-------|-------------|--------|-------|
| Hero | `Container`, `Button` (primary = WhatsApp, secondary = e-mail), grid+glow de fundo | ciano, com título em gradiente de marca | `<h1>` único; badge verde-limão "disponível para projetos" |
| Contadores | `Container`, `StatItem` | ciano (número), muted (label) | faixa full-width logo após o Hero — ver §12.1 |
| Sobre | `Container`, `SectionHeading`, `Reveal`, `ProfilePhoto` | ciano | layout 2 colunas no desktop (texto + foto); 1 coluna no mobile (foto acima). Frase sobre uso de LLMs em `text-lead`. Ver §12.2 |
| Serviços *(planejada)* | `SectionHeading`, grid de `ServiceCard` | ciano no hover | 3–4 cards: o que Gustavo entrega (ex.: "Aplicações web full stack", "APIs & back-end", "Integrações & automações com LLM", "Consultoria técnica"). Ver §12.3 |
| Stack | `SectionHeading`, grupos em `Card`, `TechPill` | uma cor por categoria | 4 grupos: Frontend, Backend, Banco de Dados, Infraestrutura |
| Projetos | `SectionHeading`, grid de `ProjectCard` | ciano no hover | 2–4 cards; placeholders com badge `TODO` |
| Contato | `SectionHeading`, lista de `Link`/`Button ghost` com ícones lucide | ciano | e-mail, WhatsApp, LinkedIn, GitHub — sem formulário |

### 12.1 Faixa de contadores (`src/components/sections/Stats.tsx`)

- Faixa horizontal full-width entre Hero e Sobre. Fundo `--color-surface` com
  borda superior e inferior `--color-border` (sutil separação do Hero).
- 3 a 4 itens `StatItem`, em `grid` `repeat(auto-fit, minmax(9rem, 1fr))`,
  centralizados, gap `clamp(1.5rem, 5vw, 3rem)`, padding vertical `clamp(2rem, 5vw, 3rem)`.
- Cada `StatItem`:
  - **Número** — `text-h2`, `--font-display`, cor `--color-accent`,
    `font-variant-numeric: tabular-nums`. Sufixo/prefixo opcional (`+`, `~`, `anos`).
  - **Label** — `text-sm`, `--color-text-muted`, abaixo do número, `max-width: 12ch`,
    `text-wrap: balance`.
- **Contagem animada**: ao entrar na viewport (`IntersectionObserver`, once), o
  número anima de 0 ao alvo em ~1.2s com `--ease-out`. Sob
  `prefers-reduced-motion`, mostra o valor final direto.
- Conteúdo vem do Sanity (`profile.stats[]`: `{ value: number, suffix?: string,
  label: string }`). Valores derivados (ex.: "anos freelance" = ano atual − 2015)
  podem ser calculados no componente a partir de um campo `since`.
- Exemplos de itens: `~10 anos de atuação freelance` · `desde 2015` ·
  `full stack (front + back)` · `N projetos entregues` (quando houver número real).

### 12.2 Foto de perfil (`src/components/sections/About.tsx` + `ProfilePhoto`)

- **Espaço reservado agora; imagem entra depois.** O componente `ProfilePhoto`
  renderiza a partir de `public/profile.jpg` (ou `.webp`), via `next/image` com
  `width`/`height` explícitos, `priority={false}`, `sizes` responsivo.
- Enquanto não houver arquivo: renderiza um **placeholder** — bloco com
  `aspect-ratio: 4/5`, fundo `--color-surface-2`, borda `--color-border`, ícone
  lucide `user` centralizado (`--color-text-faint`) e legenda mono
  `// public/profile.jpg`. Marcado com `// TODO: foto de perfil`.
- Tratamento visual da foto: `border-radius: var(--radius-lg)`, borda `1px
  --color-border`, `object-fit: cover`, `aspect-ratio: 4/5`. Opcional: leve glow
  de acento atrás (`--color-accent-soft`, blur) e máscara de canto.
- Layout do Sobre: `grid` desktop `minmax(0, 1fr) clamp(14rem, 28vw, 20rem)`
  (texto | foto); mobile empilha com a foto **acima** do texto, `max-width: 15rem`,
  centralizada.
- `alt`: "Gustavo Mathias Rocha" (preenchido quando a foto real entrar).
- Futuro: se preferir gerir a foto pelo Sanity, `profile.photo` (image asset)
  tem precedência sobre `public/profile.jpg`. Por ora, `public/` basta.

### 12.3 `ServiceCard` (seção Serviços — planejada, não bloqueia Hero/Sobre)

- Estrutura de `Card` (§5.2) sem imagem: ícone lucide no topo (24px, `--color-accent`),
  título `text-h3`, descrição `text-sm` muted (2–3 linhas).
- Grid `repeat(auto-fit, minmax(15rem, 1fr))`, gap `1.5rem`.
- Hover: mesmo tratamento de `Card` interativo (borda + `--shadow-accent` +
  `translateY(-2px)`).
- Conteúdo no Sanity: schema `service` (`{ icon: string, title: string,
  description: text, order: number }`).
- **Status:** aguardando Gustavo confirmar se a seção entra e definir os 3–4
  serviços. Se não entrar, o schema não é criado.
| Footer | mono: nome · ano · hash de versão (lido de `VERSION`) | — | `--font-mono`, `text-faint` |

---

## 13. Comportamentos globais (chrome da aplicação)

Elementos presentes em toda a página, fora das seções de conteúdo. Todos
respeitam `prefers-reduced-motion` (seção 7.3). Nenhum é derivado de site de
terceiros — são padrões genéricos (ver [ADR-0009](./adrs/0009-originalidade-e-licenciamento.md)).

### 13.1 Navbar (`src/components/layout/Header.tsx`)

- **Desktop (≥ `md`)**: barra horizontal completa. Nome/logotipo à esquerda
  (mono, `text-sm`, peso 600); links de âncora (`Sobre`, `Stack`, `Projetos`,
  `Contato`) centralizados/à direita; `ThemeToggle` na ponta direita.
- **Mobile (< `md`)**: nome à esquerda + botão **hambúrguer** (ícone lucide
  `menu` / `x`, 24px) à direita. Ao abrir: painel vertical que desce
  (`translateY(-8px → 0)` + `opacity`, `--dur-base`, `--ease-out`), ocupando a
  largura total, fundo `--color-surface` com borda inferior `--color-border`,
  links empilhados (`text-h3`, alvo ≥ 44px), `ThemeToggle` ao final. Fecha ao
  clicar num link, no `x`, no `Esc` ou fora do painel. Trava o scroll do `body`
  enquanto aberto.
- **Comportamento de scroll** (both): fixa no topo (`position: sticky; top: 0`).
  Estado inicial transparente; após ~8px de scroll ganha fundo
  `color-mix(in srgb, var(--color-bg) 80%, transparent)` + `backdrop-filter:
  blur(8px)` + borda inferior `--color-border` (transição `--dur-base`). Não
  esconde ao rolar para baixo (barra curta, não vale o custo).
- Altura: `3.5rem` mobile / `4rem` desktop. `z-index: 50`.
- Link ativo (seção visível via `IntersectionObserver`): cor `--color-accent` +
  sublinhado curto.
- A11y: `<header>` com `<nav aria-label="Principal">`; hambúrguer com
  `aria-expanded` / `aria-controls`; foco fica preso no painel aberto no mobile.

### 13.2 Barra de progresso de carregamento (`src/components/layout/RouteProgress.tsx`)

- Barra de **2px** no topo absoluto da viewport (`position: fixed; top: 0; left: 0;
  z-index: 60`), cor `--gradient-brand`, com leve `box-shadow` de brilho ciano.
- Dispara em navegações de rota (App Router): começa em ~8% ao iniciar,
  cresce de forma assíncrona até ~90%, completa em 100% e faz fade-out
  (`--dur-base`) ao terminar.
- Implementação: client component escutando eventos de navegação do Next
  (`useRouter` / `usePathname` + `useLinkStatus` da linha 16, ou um
  wrapper leve). Sem dependência externa se possível; `@bprogress/next` como
  fallback se a API nativa não bastar.
- `prefers-reduced-motion`: mantém a barra (é feedback funcional), mas sem o
  brilho pulsante — só o preenchimento.

### 13.3 Transição entre rotas

- O site é single-page; a transição vale para eventuais rotas futuras
  (`/studio`, um futuro `/blog`) e para a troca de âncora não é usada (isso é
  scroll suave, seção 7.2).
- Padrão: `template.tsx` no App Router com um wrapper que aplica
  `opacity 0 → 1` + `translateY(6px → 0)`, `--dur-slow`, `--ease-out`, na
  montagem de cada rota. Sutil, sem "page flip", sem overlay.
- Combina com a barra de progresso (13.2): barra durante o fetch, fade-in do
  conteúdo ao pintar.
- `prefers-reduced-motion`: sem `translateY`, fade curto de `--dur-fast` apenas.

### 13.4 Botão "voltar ao topo" (`src/components/ui/BackToTop.tsx`)

- Botão-ícone circular (`--radius-full`, `2.75rem`), canto **inferior direito**,
  `position: fixed; right: clamp(1rem, 4vw, 2rem); bottom: clamp(1rem, 4vw, 2rem);
  z-index: 40`.
- Visual: fundo `--color-surface` com borda `--color-border`, ícone
  `arrow-up` (lucide, 18px) cor `--color-accent`. Hover: borda `--color-accent`
  + `--shadow-accent` + `translateY(-2px)`.
- Aparece só após rolar > 1 viewport (`opacity` + `translateY(8px)` transition,
  `--dur-base`); escondido de `tab`/leitores quando invisível (`inert` /
  `visibility: hidden`).
- Clique: `window.scrollTo({ top: 0, behavior: 'smooth' })` (ou `'auto'` sob
  reduced-motion). `aria-label="Voltar ao topo"`.
- Não sobrepõe conteúdo crítico no mobile: recolhe atrás do painel do menu
  quando o hambúrguer está aberto.

### 13.5 Rodapé — copyright automático

- `© {new Date().getFullYear()} Gustavo Mathias Rocha` — o ano **nunca** é
  hard-coded. Como as páginas são SSG/ISR, o ano é resolvido no build e
  atualizado a cada revalidação; um pequeno client component
  (`<CurrentYear />`) garante correção mesmo em cache antigo servido na virada
  do ano.
- Linha secundária em `--font-mono`, `text-mono-label`, `--color-text-faint`:
  `vX.Y.Z-hhhhhhh-stage` lido de `VERSION` (ADR-0005).
- Link discreto "Sobre reuso" → aponta para `LICENSE` / `NOTICE.md` no repo
  (ADR-0009).

### 13.6 Ordem de montagem (layout raiz)

```
<body>
  <RouteProgress />        (13.2 — fixed, z-60)
  <a class="skip-link">    (pular para conteúdo)
  <Header />               (13.1 — sticky, z-50)
  <main id="conteudo">
    {children}             (template.tsx aplica 13.3)
  </main>
  <Footer />               (13.5)
  <BackToTop />            (13.4 — fixed, z-40)
</body>
```

