import {
  BrainCircuit,
  Code2,
  Database,
  Globe2,
  Network,
  Server,
  TestTube2,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

import { stack } from "@/content/stack";

const stackIcons = {
  ai: BrainCircuit,
  backend: Server,
  data: Database,
  engineering: TestTube2,
  frontend: Code2,
  infrastructure: Network,
  web: Globe2,
} as const;

export function Stack() {
  return (
    <section
      className="section section-muted"
      id="stack"
      aria-labelledby="stack-title"
    >
      <div className="container">
        <SectionHeading
          id="stack-title"
          index="03"
          label="stack"
          title="Tecnologias e práticas para entregar software confiável."
        />

        <div className="stack-grid">
          {stack.map((group) => {
            const Icon = stackIcons[group.id as keyof typeof stackIcons];

            return (
              <article
                className={`stack-group stack-${group.accent}`}
                key={group.id}
              >
                <header className="stack-group-heading">
                  <span className="stack-group-icon" aria-hidden="true">
                    <Icon size={20} strokeWidth={1.7} />
                  </span>

                  <div>
                    <h3>{group.label}</h3>
                    <p>{group.description}</p>
                  </div>
                </header>

                <ul className="tech-list">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
