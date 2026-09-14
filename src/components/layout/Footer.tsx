import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>
          {" "}
          © {new Date().getFullYear()}{" "}
          <span className="mono-label">
            <a href={profile.url} target="_blank" rel="noopener noreferrer">
              {profile.name}
            </a>
          </span>{" "}
          <br /> Código cuidadoso para produtos que evoluem.{" "}
        </p>
      </div>
    </footer>
  );
}
