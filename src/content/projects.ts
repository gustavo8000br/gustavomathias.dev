export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  status: string;
  visibility: string;
  link: string;
  summary: string;
  role: string;
  technologies: readonly string[];
};
export const projects: readonly Project[] = [
  {
    slug: "schola",
    title: "Schola",
    eyebrow: "Sistema de gestão escolar",
    status: "Em desenvolvimento",
    visibility: "Projeto pessoal",
    link: "https://github.com/gustavo8000br/schola",
    summary:
      "Plataforma de gestão escolar em desenvolvimento, criada para explorar a centralização de processos e informações do ambiente escolar em uma aplicação Full Stack.",
    role: "Concepção e desenvolvimento do projeto, incluindo arquitetura, modelagem, implementação e decisões de tecnologia.",
    technologies: [
      "TypeScript",
      "JavaScript",
      "Next.js",
      "React",
      "Tailwind CSS",
      "Node.js",
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "Neon",
      "Git",
      "Testes automatizados",
      "TDD",
    ],
  },
  {
    slug: "devsquad",
    title: "DevSquad",
    eyebrow: "Sistema de controle de academia",
    status: "Em retomada",
    visibility: "Projeto pessoal em revisão",
    link: "https://github.com/gustavo8000br/devsquad_academia",
    summary:
      "Sistema de gerenciamento de academias, retomado individualmente a partir de uma base de projeto legado.",
    role: "Investigação da base existente, avaliação das decisões arquiteturais, correção de problemas e evolução gradual do sistema.",
    technologies: [
      "TypeScript",
      "JavaScript",
      "Next.js",
      "React",
      "Tailwind CSS",
      "Node.js",
      "Prisma",
      "PostgreSQL",
      "Neon",
      "Git",
    ],
  },
  {
    slug: "tania-pimentha",
    title: "Tania Pimentha",
    eyebrow: "Site institucional, portfólio e blog",
    status: "Projeto publicado",
    link: "https://taniapimentha.com.br",
    visibility: "Projeto de cliente",
    summary:
      "Site institucional e portfólio profissional com blog e recursos de comércio eletrônico, desenvolvido para Tania Pimentha.",
    role: "Desenvolvimento do site, estruturação das páginas, interfaces, WordPress, blog e recursos de comércio eletrônico.",
    technologies: [
      "WordPress",
      "Elementor",
      "WooCommerce",
      "PHP",
      "HTML",
      "CSS",
      "JavaScript",
    ],
  },
] as const;
