import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "@/styles/globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});
export const metadata: Metadata = {
  title: "Gustavo Mathias | Desenvolvedor web Full Stack",
  description:
    "Portfólio de Gustavo Mathias, desenvolvedor web Full Stack com foco em TypeScript, React, Next.js e Node.js.",
  metadataBase: new URL("https://gustavomathias.dev"),
  openGraph: {
    title: "Gustavo Mathias | Desenvolvedor web Full Stack",
    description: "Arquitetura, qualidade e manutenção para produtos web.",
    type: "website",
    locale: "pt_BR",
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetBrainsMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
