export type Education = {
  institution: string;
  course: string;
  modality: string;
  period: string;
};

export const education: readonly Education[] = [
  {
    institution: "Universidade São Judas Tadeu (USJT)",
    course: "Ciência da Computação",
    modality: "EAD",
    period: "jul. 2025 — jul. 2029",
  },
] as const;
