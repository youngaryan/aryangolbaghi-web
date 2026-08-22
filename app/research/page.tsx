import type { Metadata } from "next";
import Link from "next/link";
import { researchItems } from "@/lib/research";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research by Aryan Golbaghi on speech emotion recognition, fine-tuning, hyperparameter optimisation, and reliable LLM abstention.",
  alternates: { canonical: "/research" },
};

export default function ResearchPage() {
  return (
    <div className="page-shell section-page">
      <header className="page-intro">
        <p className="eyebrow">Publications &amp; ongoing work</p>
        <h1>Research</h1>
        <p>
          Work on machine learning optimisation, model alignment, and the
          reliability of systems that must know when not to answer.
        </p>
      </header>

      <div className="research-list">
        {researchItems.map((item, index) => (
          <article className="research-item" key={item.title}>
            <div className="research-number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div>
              <div className="research-meta">
                <span>{item.status}</span>
                <span>{item.role}</span>
                {item.venue && <span>{item.venue}</span>}
                {item.year && <span>{item.year}</span>}
              </div>
              <h2>{item.title}</h2>
              {item.authors && (
                <p className="research-authors">{item.authors.join(", ")}</p>
              )}
              <p>{item.description}</p>
              <ul className="tag-list" aria-label="Research areas">
                {item.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              {(item.paperUrl || item.codeUrl || item.projectUrl) && (
                <div className="research-links">
                  {item.detailUrl && (
                    <Link href={item.detailUrl}>Read case study</Link>
                  )}
                  {item.paperUrl && <a href={item.paperUrl}>Paper</a>}
                  {item.codeUrl && <a href={item.codeUrl}>Code</a>}
                  {item.projectUrl && <a href={item.projectUrl}>Project</a>}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

    </div>
  );
}
