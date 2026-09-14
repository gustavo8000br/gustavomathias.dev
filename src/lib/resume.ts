import { contact } from "@/content/contact";
import { education } from "@/content/education";
import { languages } from "@/content/languages";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { stack } from "@/content/stack";

const pageWidth = 595;
const pageHeight = 842;
const margin = 50;
const maxLineLength = 88;

function toLatin1(value: string): string {
  return value
    .replace(/—/g, "-")
    .replace(/’/g, "'")
    .replace(/“/g, '"')
    .replace(/”/g, '"')
    .replace(/[^\x00-\xFF]/g, "?");
}

function escapePdf(value: string): string {
  return toLatin1(value).replace(/[\\()]/g, "\\$&");
}

function wrapText(value: string): string[] {
  const words = value.split(/\s+/);
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const nextLine = line ? `${line} ${word}` : word;

    if (nextLine.length > maxLineLength && line) {
      lines.push(line);
      line = word;
    } else {
      line = nextLine;
    }
  }

  if (line) lines.push(line);

  return lines;
}

class ResumePdf {
  private pages: string[] = [];
  private commands: string[] = [];
  private y = 0;

  constructor(private readonly generatedAt: Date) {
    this.addPage();
  }

  private addPage() {
    if (this.commands.length) this.pages.push(this.commands.join("\n"));

    this.commands = [
      "0.1 0.72 0.68 rg",
      `0 ${pageHeight - 10} ${pageWidth} 10 re f`,
    ];
    this.y = pageHeight - 54;
    this.text("F1", 8, 0.35, 0.4, 0.5, margin, this.y, "gustavomathias.dev");
    this.text(
      "F1",
      8,
      0.35,
      0.4,
      0.5,
      pageWidth - 130,
      this.y,
      "Currículo atualizado",
    );
    this.y -= 28;
  }

  private text(
    font: "F1" | "F2",
    size: number,
    red: number,
    green: number,
    blue: number,
    x: number,
    y: number,
    value: string,
  ) {
    this.commands.push(
      `BT /${font} ${size} Tf ${red} ${green} ${blue} rg 1 0 0 1 ${x} ${y} Tm (${escapePdf(value)}) Tj ET`,
    );
  }

  private ensureSpace(height: number) {
    if (this.y - height < 62) this.addPage();
  }

  title(value: string) {
    this.ensureSpace(38);
    this.text("F2", 24, 0.08, 0.12, 0.2, margin, this.y, value);
    this.y -= 30;
  }

  subtitle(value: string) {
    this.ensureSpace(24);
    this.text("F2", 11, 0.1, 0.72, 0.68, margin, this.y, value);
    this.y -= 20;
  }

  section(value: string) {
    this.ensureSpace(28);
    this.commands.push("0.1 0.72 0.68 rg", `${margin} ${this.y - 5} 22 2 re f`);
    this.text(
      "F2",
      9,
      0.1,
      0.72,
      0.68,
      margin + 30,
      this.y - 8,
      value.toUpperCase(),
    );
    this.y -= 28;
  }

  paragraph(value: string, emphasis = false) {
    const lines = wrapText(value);
    this.ensureSpace(lines.length * 14 + 6);

    for (const line of lines) {
      this.text(
        emphasis ? "F2" : "F1",
        9.5,
        0.12,
        0.16,
        0.25,
        margin,
        this.y,
        line,
      );
      this.y -= 14;
    }

    this.y -= 6;
  }

  metadata(value: string) {
    const lines = wrapText(value);
    this.ensureSpace(lines.length * 12 + 5);

    for (const line of lines) {
      this.text("F1", 8.5, 0.35, 0.4, 0.5, margin, this.y, line);
      this.y -= 12;
    }

    this.y -= 5;
  }

  finish(): Uint8Array {
    const generatedDate = new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "long",
    }).format(this.generatedAt);

    this.commands.push(
      "0.35 0.4 0.5 rg",
      `BT /F1 7 Tf 1 0 0 1 ${margin} 30 Tm (${escapePdf(`Gerado automaticamente em ${generatedDate} a partir de gustavomathias.dev.`)}) Tj ET`,
    );
    this.pages.push(this.commands.join("\n"));

    const pageCount = this.pages.length;
    const pageObjectIds = this.pages.map((_, index) => 5 + index * 2);
    const contentObjectIds = pageObjectIds.map((id) => id + 1);
    const objects = [
      "<< /Type /Catalog /Pages 2 0 R >>",
      `<< /Type /Pages /Kids [${pageObjectIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageCount} >>`,
      "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
      "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    ];

    for (const [index, content] of this.pages.entries()) {
      const pageId = pageObjectIds[index];
      const contentId = contentObjectIds[index];
      objects[pageId - 1] =
        `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentId} 0 R >>`;
      objects[contentId - 1] =
        `<< /Length ${toLatin1(content).length} >>\nstream\n${content}\nendstream`;
    }

    let pdf = "%PDF-1.4\n%PDF resume\n";
    const offsets = [0];

    for (const [index, object] of objects.entries()) {
      offsets.push(toLatin1(pdf).length);
      pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
    }

    const xrefOffset = toLatin1(pdf).length;
    pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
    pdf += offsets
      .slice(1)
      .map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`)
      .join("");
    pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

    return Uint8Array.from(toLatin1(pdf), (character) =>
      character.charCodeAt(0),
    );
  }
}

export function createResumePdf(generatedAt: Date): Uint8Array {
  const pdf = new ResumePdf(generatedAt);

  pdf.title(profile.name);
  pdf.subtitle(profile.role);
  pdf.metadata(
    `${profile.location} · ${profile.email} · ${contact.linkedin} · ${contact.github}`,
  );

  pdf.section("Perfil");
  pdf.paragraph(profile.description);

  pdf.section("Formação");
  for (const item of education) {
    pdf.paragraph(item.course, true);
    pdf.metadata(`${item.institution} · ${item.modality} · ${item.period}`);
  }

  pdf.section("Competências");
  for (const group of stack) {
    pdf.paragraph(`${group.label}: ${group.items.join(", ")}`);
  }

  pdf.section("Projetos selecionados");
  for (const project of projects) {
    pdf.paragraph(project.title, true);
    pdf.paragraph(project.summary);
    pdf.metadata(`${project.role} · ${project.technologies.join(", ")}`);
  }

  pdf.section("Idiomas");
  pdf.paragraph(
    languages
      .map((language) => `${language.name} (${language.level})`)
      .join(" · "),
  );

  return pdf.finish();
}
