import { ArrowLeftIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { SiteFooter, SiteNav } from "./site-chrome";

export type LegalSection = {
  heading: string;
  body: string[];
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  effective: string;
  sections: LegalSection[];
};

export function LegalPage({ eyebrow, title, effective, sections }: LegalPageProps) {
  return (
    <>
      <SiteNav />
      <article className="legal">
        <div className="legal-inner">
          <div className="legal-eyebrow">— {eyebrow}</div>
          <h1 className="legal-title">{title}</h1>
          <p className="legal-effective">
            <span className="mono">Effective</span> · {effective}
          </p>

          <div className="legal-rule" />

          {sections.map((s, i) => (
            <section key={i} className="legal-section">
              <h2 className="legal-h2">{s.heading}</h2>
              {s.body.map((p, j) => (
                <p key={j} className="legal-p">{p}</p>
              ))}
            </section>
          ))}

          <div className="legal-end">
            <Link className="btn btn-ghost" href="/">
              <ArrowLeftIcon size={14} /> Back to Dim0
            </Link>
            <a className="btn btn-sienna" href="mailto:contact@dim0.net">
              <EnvelopeSimpleIcon size={14} /> Contact us
            </a>
          </div>
        </div>
      </article>
      <div className="legal-foot-wrap">
        <SiteFooter />
      </div>
    </>
  );
}
