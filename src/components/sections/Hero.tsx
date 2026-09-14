import { ArrowDown, ArrowRight } from "lucide-react";
import Link from "next/link";

import { ProfilePhoto } from "@/components/ui/ProfilePhoto";
import { profile } from "@/content/profile";

export function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-background" aria-hidden="true">
        <ProfilePhoto className="hero-background-photo" decorative />
      </div>

      <div className="container hero-frame">
        <header className="hero-topline">
          <p className="hero-name">{profile.name}</p>
          <p className="hero-role">{profile.role}</p>
        </header>

        <div className="hero-copy">
          <h1 id="hero-title">{profile.headline}</h1>

          <p className="hero-description">{profile.description}</p>

          <div className="hero-actions">
            <Link className="button button-primary" href="#projetos">
              Ver projetos <ArrowRight size={18} aria-hidden="true" />
            </Link>

            <Link className="button button-secondary" href="#contato">
              Entrar em contato <ArrowDown size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="hero-baseline">
          <div className="hero-status">
            <p className="availability">
              <span className="availability-dot" aria-hidden="true" />
              {profile.availability}
            </p>

            <p className="hero-location">{profile.location}</p>
          </div>

          <div className="hero-identity">
            <p className="hero-pseudonym">
              <span className="hero-pseudonym-label">
                também conhecido como
              </span>

              <span className="hero-pseudonym-name">{profile.pseudonym}</span>

              <span className="hero-pseudonym-japanese" lang="ja">
                {profile.pseudonymJapanese}
              </span>
            </p>

            <p className="hero-index">
              <span className="hero-index-number" aria-hidden="true">
                01
              </span>

              <span className="hero-index-text">
                <span className="hero-index-label">portfólio pessoal</span>

                <span className="hero-index-note">
                  Interfaces claras, sistemas sustentáveis e atenção ao detalhe.
                </span>
              </span>
            </p>
          </div>
        </div>

        <ul className="hero-signals" aria-label="Áreas de atuação">
          <li>Arquitetura</li>
          <li>Interfaces</li>
          <li>Continuidade</li>
        </ul>
      </div>
    </section>
  );
}
