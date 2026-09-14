export type StackGroup = {
  id: string;
  label: string;
  description: string;
  accent: "accent" | "violet" | "lime";
  items: readonly string[];
};

export const stack: readonly StackGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    description: "Interfaces e aplicações web modernas.",
    accent: "accent",
    items: [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
    ],
  },
  {
    id: "backend",
    label: "Backend",
    description: "APIs, serviços e regras de negócio.",
    accent: "violet",
    items: ["Node.js", "NestJS", "APIs REST", "PHP"],
  },
  {
    id: "data",
    label: "Dados",
    description: "Persistência, consultas e modelagem relacional.",
    accent: "lime",
    items: ["PostgreSQL", "MySQL", "MariaDB", "SQL", "Prisma"],
  },
  {
    id: "web",
    label: "CMS & Web",
    description: "Experiência anterior em desenvolvimento web sob demanda.",
    accent: "accent",
    items: ["WordPress", "Elementor", "WooCommerce"],
  },
  {
    id: "engineering",
    label: "Engenharia",
    description: "Qualidade, manutenção e evolução de software.",
    accent: "violet",
    items: [
      "TDD",
      "Testes automatizados",
      "Testes funcionais",
      "Testes exploratórios",
      "Debugging",
      "Refatoração",
      "Code Review",
      "Git",
      "GitHub",
    ],
  },
  {
    id: "ai",
    label: "IA aplicada",
    description: "LLMs utilizadas como ferramentas de engenharia.",
    accent: "lime",
    items: [
      "LLMs",
      "Engenharia de prompts",
      "Análise de código",
      "Code Review assistido por IA",
      "Planejamento com LLMs",
      "Arquitetura com LLMs",
      "Copilot",
      "Claude Code",
      "Codex",
    ],
  },
  {
    id: "infrastructure",
    label: "Infraestrutura",
    description: "Sistemas, redes e ambientes de execução.",
    accent: "accent",
    items: [
      "Linux",
      "Docker",
      "DNS",
      "Protocolos de rede",
      "Deploy",
      "Vercel",
      "Cloudflare",
      "Segurança de aplicações web",
    ],
  },
] as const;
