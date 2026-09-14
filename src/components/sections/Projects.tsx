import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/content/projects";
import { getProjectLabel } from "@/lib/content";

export function Projects() {
  return (
    <section className="section" id="projetos" aria-labelledby="projetos-title">
      <div className="container">
        <SectionHeading
          id="projetos-title"
          index="05"
          label="projetos"
          title="Projetos que transformam contexto em produto."
        />

        <p className="section-intro">
          Projetos autorais e para clientes que evidenciam concepção, evolução
          de sistemas existentes e entrega de experiências digitais.
        </p>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <article className="project-card" key={project.slug}>
              <div className="project-topline">
                <span className="project-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="project-meta">
                  <span>{project.eyebrow}</span>
                  <span className="status-dot" aria-hidden="true" />
                </span>
              </div>

              <div className="project-card-body">
                <h3>{project.title}</h3>

                <p>{project.summary}</p>

                <p className="project-role">
                  <strong>Atuação</strong> {project.role}
                </p>

                <ul
                  className="project-tags"
                  aria-label={`Tecnologias de ${project.title}`}
                >
                  {project.technologies.slice(0, 6).map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>

                <div className="project-footer">
                  <span className="project-status">
                    {getProjectLabel(project)}
                  </span>

                  <a
                    className="project-link"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visitar projeto ${project.title}`}
                    title={`Visitar projeto ${project.title} em nova aba`}
                  >
                    <span className="project-link-text">Visitar projeto</span>
                    <span className="project-arrow" aria-hidden="true">
                      <ArrowUpRight size={18} />
                    </span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
