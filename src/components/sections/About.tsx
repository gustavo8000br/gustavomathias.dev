import { SectionHeading } from "@/components/ui/SectionHeading";
export function About() {
  return (
    <section className="section" id="sobre" aria-labelledby="sobre-title">
      {" "}
      <div className="container split-section">
        {" "}
        <SectionHeading
          id="sobre-title"
          index="02"
          label="sobre"
          title="Tecnologia boa e tecnologia que dura."
        />{" "}
        <div className="prose-block">
          {" "}
          <p className="lead">
            {" "}
            Meu trabalho fica entre a implementação e o cuidado com o sistema
            inteiro.{" "}
          </p>{" "}
          <p>
            {" "}
            Gosto de entender o problema antes de escolher a ferramenta,
            organizar as decisões arquiteturais e entregar interfaces que sejam
            fáceis de usar e de manter.{" "}
          </p>{" "}
          <p>
            {" "}
            Atuo com produtos web Full Stack, desde a camada de experiência até
            APIs, persistência e testes. O objetivo é deixar cada etapa mais
            legível para quem vai usar e para quem vai continuar o
            trabalho.{" "}
          </p>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
