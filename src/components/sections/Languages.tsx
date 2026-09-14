import { SectionHeading } from "@/components/ui/SectionHeading";
import { languages } from "@/content/languages";

export function Languages() {
  return (
    <section
      className="section languages-section"
      id="idiomas"
      aria-labelledby="idiomas-title"
    >
      <div className="container">
        <div className="languages-layout">
          <SectionHeading
            id="idiomas-title"
            index="04"
            label="idiomas"
            title="Comunicação para colaborar, aprender e acompanhar a documentação técnica."
          />

          <div className="languages-list">
            {languages.map((language, index) => (
              <article className="language-item" key={language.name}>
                <span className="language-index">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="language-content">
                  <h3>{language.name}</h3>
                  <p>{language.level}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
