import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contact } from "@/content/contact";

const links = [
  {
    label: "E-mail",
    value: contact.email,
    href: `mailto:${contact.email}`,
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/gustavo8000br",
    href: contact.linkedin,
    icon: Linkedin,
  },
  {
    label: "GitHub",
    value: "github.com/gustavo8000br",
    href: contact.github,
    icon: Github,
  },
  {
    label: "WhatsApp",
    value: "Conversar por mensagem",
    href: contact.whatsapp,
    icon: MessageCircle,
  },
] as const;
export function Contact() {
  return (
    <section
      className="section contact-section"
      id="contato"
      aria-labelledby="contato-title"
    >
      {" "}
      <div className="container">
        {" "}
        <SectionHeading
          id="contato-title"
          index="06"
          label="contato"
          title="Vamos transformar o próximo desafio em produto."
        />{" "}
        <div className="contact-layout">
          {" "}
          <p className="lead">
            {" "}
            Precisa criar uma experiência digital, organizar uma base existente
            ou evoluir um produto web? Vamos conversar.{" "}
          </p>{" "}
          <div className="contact-links">
            {" "}
            {links.map(({ label, value, href, icon: Icon }) => (
              <a
                className="contact-link"
                href={href}
                key={label}
                target={label === "E-mail" ? undefined : "_blank"}
                rel={label === "E-mail" ? undefined : "noopener noreferrer"}
              >
                {" "}
                <Icon size={20} aria-hidden="true" />{" "}
                <span>
                  {" "}
                  <small>{label}</small> <strong>{value}</strong>{" "}
                </span>{" "}
                <ArrowIcon />{" "}
              </a>
            ))}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
function ArrowIcon() {
  return (
    <span className="contact-arrow" aria-hidden="true">
      {" "}
      ↗{" "}
    </span>
  );
}
