import Link from "next/link";

import { profile } from "@/content/profile";

const navigation = [
  { href: "#sobre", label: "Sobre" },
  { href: "#stack", label: "Competências" },
  { href: "#idiomas", label: "Idiomas" },
  { href: "#projetos", label: "Projetos" },
  { href: "#contato", label: "Contato" },
] as const;

const nameParts = profile.name.trim().split(/\s+/);
const brandLead = nameParts.slice(0, -1).join(" ");
const brandTail = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link
          className="brand"
          href="#top"
          aria-label={`${profile.name}, início`}
        >
          <span className="brand-name">{brandLead}</span>
          {brandTail ? <span className="brand-tail">{brandTail}</span> : null}
        </Link>
        <nav aria-label="Navegação principal">
          <ul className="nav-list">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
