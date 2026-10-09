import { ArrowUpRight } from "lucide-react";
import { kimoPublication } from "@/lib/portfolio";

export default function Publications() {
  return (
    <section
      id="publications"
      className="publications-section section-wrap"
      aria-labelledby="publications-heading"
    >
      <div className="publications-heading">
        <h2 id="publications-heading">Publications</h2>
        <p>
          Research in knowledge-guided AI and agent coordination, from my time
          at the USC AI Institute.
        </p>
      </div>
      <article className="publication-entry" aria-labelledby="kimo-paper-title">
        <div className="publication-meta">
          <span className="publication-venue">{kimoPublication.venue}</span>
          <span>{kimoPublication.track}</span>
        </div>
        <h3 id="kimo-paper-title">
          <a href={kimoPublication.url} target="_blank" rel="noreferrer">
            {kimoPublication.title}
          </a>
        </h3>
        <p className="publication-credit">{kimoPublication.credit}</p>
        <p className="publication-summary">{kimoPublication.summary}</p>
        <div className="publication-footer">
          <div className="publication-citation">
            <p>{kimoPublication.conference}</p>
            <p>{kimoPublication.details}</p>
          </div>
          <a
            className="text-link publication-link"
            href={kimoPublication.url}
            target="_blank"
            rel="noreferrer"
          >
            Read paper <span className="publication-format">PDF</span>
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </article>
    </section>
  );
}
