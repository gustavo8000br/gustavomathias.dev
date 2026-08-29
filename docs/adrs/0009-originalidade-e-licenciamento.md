# ADR-0009: Originalidade do design e licenciamento do repositório

- **Status:** Aceita
- **Data:** 2026-08-29
- **Decisores:** Gustavo Mathias Rocha (product owner)

## Contexto

O repositório é **público** e serve de vitrine. Duas preocupações:

1. **Originalidade de entrada.** O design deste projeto deve ser criação própria.
   Referências visuais externas podem inspirar *direção* (paleta, tom), mas não
   podem ser reproduzidas em estrutura, classes, markup, animações ou layout.
   Portfólios pessoais são trabalho autoral de seus autores.
2. **Proteção de saída.** Sendo público, o código e o design ficam expostos a
   cópia. O autor quer sinalizar claramente o que pode e o que não pode ser
   reutilizado.

## Decisão

### Originalidade

- O design system (`docs/design-system.md` e a futura `design-system.html`) é
  definido do zero: tokens, escala tipográfica, componentes e padrões de
  movimento são próprios do projeto.
- **Proibido** neste repositório: copiar markup, nomes de classe, keyframes,
  curvas de easing, ou reproduzir "pixel-perfect" seções de qualquer site de
  terceiros. Ferramentas de "extração de DNA visual" / clonagem de site não são
  usadas.
- Inspiração de direção (ex.: "dark tech minimalista", paleta derivada do banner
  de LinkedIn do autor) é registrada como tal, sem apontar para sites específicos.

### Licenciamento (modelo dual)

| Camada | Licença | Arquivo |
|--------|---------|---------|
| Código-fonte (componentes, config, scripts de build/CI) | **MIT** | `LICENSE` |
| Identidade visual, design system, conteúdo textual, imagens, currículo/bio | **Todos os direitos reservados** — © Gustavo Mathias Rocha | `NOTICE.md` |

- `LICENSE` (MIT) cobre o *código* — recrutadores e curiosos podem ler, aprender
  e reaproveitar trechos técnicos.
- `NOTICE.md` deixa explícito que **a aparência, o texto e os assets NÃO são um
  template** e não estão licenciados para reuso; que este é o portfólio pessoal
  de uma pessoa real; e que cópia da identidade visual como um todo não é
  autorizada.
- `README.md` traz um parágrafo curto "Sobre reuso" apontando para os dois
  arquivos.

## Consequências

### Positivas

- Postura consistente: não copiamos os outros, e sinalizamos que não devem nos
  copiar.
- MIT no código mantém o valor de vitrine (é lícito estudar e reusar a
  engenharia).
- Separar código (aberto) de identidade (reservada) é um modelo comum e
  compreensível.

### Negativas / trade-offs

- Um aviso de "direitos reservados" tem efeito prático limitado contra quem
  ignora — é dissuasão e base formal, não barreira técnica.
- Exige manter `NOTICE.md` coerente conforme o site evolui.

### Neutras / de acompanhamento

- Criar `LICENSE` e `NOTICE.md` no scaffold (próximo ciclo).
- Adicionar `SPDX-License-Identifier: MIT` no topo dos arquivos de código.
- O rodapé do site exibe `© {ano automático} Gustavo Mathias Rocha` — o ano é
  calculado em runtime/build, nunca hard-coded.

## Alternativas consideradas

- **Repo totalmente MIT** — não protege a identidade visual; qualquer um poderia
  republicar o portfólio inteiro como template "legalmente".
- **Repo totalmente "all rights reserved"** — enfraquece o valor de vitrine;
  recrutadores não poderiam nem reusar um utilitário sem pedir.
- **CC BY-NC para o design** — mais permissivo do que o autor quer para a
  identidade pessoal; "todos os direitos reservados" é mais claro aqui.
