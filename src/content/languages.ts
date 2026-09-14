export type Language = { name: string; level: string };
export const languages: readonly Language[] = [
  { name: "Português (Brasil)", level: "Nativo" },
  { name: "Inglês", level: "Leitura e escrita técnica" },
  { name: "Espanhol", level: "Básico" },
  { name: "Japonês", level: "Estudando" },
] as const;
