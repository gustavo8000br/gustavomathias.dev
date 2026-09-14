import { contact } from "@/content/contact";
import { education } from "@/content/education";
import { languages } from "@/content/languages";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { stack } from "@/content/stack";

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };

    return entities[character];
  });
}

function list(items: readonly string[]): string {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

export function createResumeDocument(generatedAt: Date): string {
  const generatedDate = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "long",
  }).format(generatedAt);

  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Currículo — ${escapeHtml(profile.name)}</title>
  <style>
    @page { margin: 18mm; }
    * { box-sizing: border-box; }
    body { margin: 0; color: #172033; font: 10.5pt/1.55 Arial, sans-serif; }
    h1, h2, h3, p { margin-top: 0; }
    header { border-bottom: 3px solid #19b8ab; margin-bottom: 22px; padding-bottom: 16px; }
    h1 { font-size: 27pt; letter-spacing: -0.04em; margin-bottom: 2px; }
    .role { color: #19b8ab; font-size: 12pt; font-weight: 700; margin-bottom: 10px; }
    .contact { color: #53617b; font-size: 9pt; }
    section { break-inside: avoid; margin-bottom: 18px; }
    h2 { color: #19b8ab; font-size: 9pt; letter-spacing: .12em; margin-bottom: 8px; text-transform: uppercase; }
    h3 { font-size: 11pt; margin-bottom: 3px; }
    .meta { color: #53617b; font-size: 9pt; }
    .grid { display: grid; gap: 12px; grid-template-columns: repeat(2, minmax(0, 1fr)); }
    ul { margin: 0; padding-left: 18px; }
    .tags { display: flex; flex-wrap: wrap; gap: 5px; list-style: none; padding: 0; }
    .tags li { background: #e8f8f6; border-radius: 99px; padding: 3px 7px; }
    footer { border-top: 1px solid #dbe2ef; color: #64748b; font-size: 8pt; padding-top: 10px; }
    @media print { a { color: inherit; text-decoration: none; } }
  </style>
</head>
<body>
  <header>
    <h1>${escapeHtml(profile.name)}</h1>
    <p class="role">${escapeHtml(profile.role)}</p>
    <p class="contact">${escapeHtml(profile.location)} · ${escapeHtml(profile.email)} · ${escapeHtml(contact.linkedin)} · ${escapeHtml(contact.github)}</p>
  </header>
  <section>
    <h2>Perfil</h2>
    <p>${escapeHtml(profile.description)}</p>
  </section>
  <section>
    <h2>Formação</h2>
    ${education
      .map(
        (item) => `<h3>${escapeHtml(item.course)}</h3><p class="meta">${escapeHtml(item.institution)} · ${escapeHtml(item.modality)} · ${escapeHtml(item.period)}</p>`,
      )
      .join("")}
  </section>
  <section>
    <h2>Competências</h2>
    <div class="grid">${stack
      .map(
        (group) => `<div><h3>${escapeHtml(group.label)}</h3><ul class="tags">${list(group.items)}</ul></div>`,
      )
      .join("")}</div>
  </section>
  <section>
    <h2>Projetos selecionados</h2>
    ${projects
      .map(
        (project) => `<h3>${escapeHtml(project.title)}</h3><p>${escapeHtml(project.summary)}</p><p class="meta">${escapeHtml(project.role)} · ${escapeHtml(project.technologies.join(", "))}</p>`,
      )
      .join("")}
  </section>
  <section>
    <h2>Idiomas</h2>
    <p>${languages.map((language) => `${escapeHtml(language.name)} (${escapeHtml(language.level)})`).join(" · ")}</p>
  </section>
  <footer>Currículo gerado automaticamente em ${escapeHtml(generatedDate)} a partir de gustavomathias.dev.</footer>
</body>
</html>`;
}
