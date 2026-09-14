import { SectionHeading } from "@/components/ui/SectionHeading";
import { education } from "@/content/education";

export function About() {
  return (
    <section className="section" id="sobre" aria-labelledby="sobre-title">
      <div className="container split-section">
        <SectionHeading
          id="sobre-title"
          index="02"
          label="sobre"
          title="Do briefing à evolução do software."
        />
        <div className="prose-block">
          <p className="lead">
            Atuo com desenvolvimento web sob demanda desde 2015, unindo visão de
            produto e execução técnica.
          </p>
          <p>
            Curso {education[0].course} na {education[0].institution}, na
            modalidade {education[0].modality}, com conclusão prevista para
            {education[0].period}.
          </p>
          <p>
            Antes de escolher ferramentas, entendo o contexto, os objetivos e as
            pessoas que vão usar o produto. A partir disso, organizo decisões
            técnicas e interfaces claras.
          </p>
          <p>
            Trabalho de ponta a ponta: frontend, APIs, persistência, testes e
            infraestrutura. O resultado é uma base compreensível para quem usa,
            mantém e amplia o software.
          </p>
        </div>
      </div>
    </section>
  );
}
