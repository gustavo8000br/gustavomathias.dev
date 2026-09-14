# Conteudo dos projetos

Documento de preparacao editorial para os documentos `project` do Sanity.
Nenhum campo pendente deve ser preenchido por inferencia. Antes da publicacao,
confirmar URLs, datas, imagens, autorizacoes e informacoes confidenciais.

## Schola

```yaml
slug: schola
title: Schola
eyebrow: Sistema de gestao escolar
type: personal-project
status: in-development
visibility: public
featured: true
period: TODO
liveUrl: TODO
repositoryUrl: TODO
summary: Plataforma de gestao escolar em desenvolvimento, criada para explorar a centralizacao de processos e informacoes do ambiente escolar em uma aplicacao Full Stack.
problem: A proposta e reduzir a fragmentacao de informacoes e criar uma base para organizar e automatizar tarefas administrativas e operacionais de uma instituicao de ensino.
role: Concepcao e desenvolvimento do projeto, incluindo definicao da arquitetura, modelagem da aplicacao, implementacao das funcionalidades e decisoes relacionadas a tecnologia.
technologies:
  - TypeScript
  - JavaScript
  - Next.js
  - React
  - Tailwind CSS
  - Node.js
  - NestJS
  - Prisma
  - PostgreSQL
  - Neon
  - Git
  - Testes automatizados
  - TDD
challenge: Lidar com diferentes perfis, regras de negocio e relacoes entre entidades sem perder a organizacao e a capacidade de evolucao do sistema.
outcome: O projeto demonstra a estrutura de uma aplicacao Full Stack com frontend, backend, banco de dados, regras de negocio, testes automatizados e praticas de TDD.
metrics: TODO
image: TODO
imageAlt: TODO
confidentiality: Projeto pessoal. Revisar o repositorio antes da publicacao para remover credenciais, tokens, variaveis de ambiente e dados de teste sensiveis.
aiDisclosure: Ferramentas de IA e LLM foram usadas como apoio para pesquisa, exploracao, geracao e revisao de codigo. As decisoes tecnicas, a validacao e a compreensao do codigo permanecem sob responsabilidade do autor.
```

### Texto curto

O Schola e uma plataforma de gestao escolar em desenvolvimento. O projeto
explora como processos, perfis e informacoes de uma instituicao de ensino podem
ser organizados em uma aplicacao Full Stack com regras de negocio, persistencia
de dados e testes automatizados.

## DevSquad

```yaml
slug: devsquad
title: DevSquad
eyebrow: Sistema de controle de academia
type: legacy-personal-project
status: being-revived
visibility: public-after-review
featured: true
period: TODO
liveUrl: TODO
repositoryUrl: TODO
summary: Sistema de gerenciamento de academias, retomado individualmente a partir de uma base de projeto legado.
problem: A proposta e centralizar informacoes sobre alunos, planos, atividades e processos administrativos que poderiam estar espalhados em controles manuais ou fragmentados.
role: Retomada individual do projeto, com investigacao da base existente, avaliacao das decisoes arquiteturais, correcao de problemas e evolucao gradual do sistema.
technologies:
  - TypeScript
  - JavaScript
  - Next.js
  - React
  - Tailwind CSS
  - Node.js
  - Prisma
  - PostgreSQL
  - Neon
  - Git
  - TODO: demais tecnologias a confirmar
challenge: Compreender a arquitetura, o modelo de dados, as regras de negocio e as decisoes anteriores antes de alterar uma aplicacao existente.
outcome: O projeto demonstra investigacao, manutencao e evolucao de software legado, alem da capacidade de preservar funcionalidades relevantes enquanto define uma estrategia segura de melhoria.
metrics: TODO
image: TODO
imageAlt: TODO
confidentiality: Revisar o repositorio e os dados historicos antes da publicacao. Remover ou anonimizar dados reais, credenciais, chaves de API e informacoes privadas.
aiDisclosure: TODO: confirmar se ferramentas de IA foram usadas neste projeto e como devem ser descritas.
```

### Texto curto

O DevSquad e um sistema de controle de academia em retomada. O desafio central
nao e apenas adicionar funcionalidades, mas compreender uma base legada,
preservar o que ainda funciona e evoluir o sistema sem comprometer suas regras
existentes.

## Tania Pimentha

```yaml
slug: tania-pimentha
title: Tania Pimentha
eyebrow: Site institucional, portfolio e blog
type: client-project
status: TODO
visibility: requires-client-authorization
featured: true
period: TODO
liveUrl: TODO
repositoryUrl: TODO
summary: Site institucional e portfolio profissional com blog e recursos de comercio eletronico, desenvolvido para Tania Pimentha.
problem: Criar uma presenca digital profissional que reunisse o trabalho da cliente, seus conteudos publicados e os recursos comerciais em uma estrutura organizada.
role: Desenvolvimento e implementacao do site, estruturacao das paginas, construcao das interfaces, configuracao do WordPress, implementacao do blog e configuracao dos recursos de comercio eletronico.
technologies:
  - WordPress
  - Elementor
  - WooCommerce
  - PHP
  - HTML
  - CSS
  - JavaScript
  - TODO: plugins e servicos utilizados
  - TODO: hospedagem, dominio e CDN
challenge: Transformar as necessidades da cliente em uma estrutura visualmente adequada, funcional e simples de administrar, conciliando personalizacao, plugins, desempenho e manutencao.
outcome: Site publicado para representar profissionalmente a cliente, reunindo portfolio, conteudo e recursos comerciais em uma unica plataforma.
metrics: TODO
image: TODO
imageAlt: TODO
confidentiality: Nao expor dados pessoais, comerciais ou administrativos. Publicar o case somente com autorizacao da cliente e usar apenas informacoes publicas ou autorizadas.
clientAuthorization: TODO
```

### Texto curto

O projeto Tania Pimentha e um site institucional com portfolio, blog e recursos
de comercio eletronico. A implementacao combinou WordPress, Elementor e
WooCommerce para entregar uma presenca digital que a cliente pudesse atualizar
sem depender de alteracoes diretas no codigo.

## Pendencias para o Sanity

Antes de publicar qualquer projeto, preencher:

- `period` e `status`;
- `liveUrl` e `repositoryUrl`, quando existirem;
- tecnologias realmente utilizadas;
- pelo menos uma imagem com `imageAlt` descritivo;
- metricas somente quando forem comprovaveis;
- autorizacao da cliente no projeto Tania Pimentha;
- revisao de secrets, dados pessoais e informacoes confidenciais;
- confirmacao de quais projetos serao destacados na primeira versao.

Os valores `TODO` sao marcadores editoriais e nao devem aparecer na pagina
publica.
