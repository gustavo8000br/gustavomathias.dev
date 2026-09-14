import Link from "next/link";

const navigation = [
  { href: "#sobre", label: "Sobre" },
  { href: "#stack", label: "Competências" },
  { href: "#idiomas", label: "Idiomas" },
  { href: "#projetos", label: "Projetos" },
  { href: "#contato", label: "Contato" },
] as const;

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="#top">
          Início
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
