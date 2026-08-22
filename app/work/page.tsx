import type { Metadata } from "next";
import { workItems } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected areas of engineering work by Aryan Golbaghi across production AI, developer tooling, observability, and research systems.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <div className="page-shell section-page">
      <header className="page-intro">
        <p className="eyebrow">Engineering practice</p>
        <h1>Work</h1>
        <p>
          Selected engineering work across production AI systems, developer
          tooling, observability, and machine learning research infrastructure.
        </p>
      </header>

      <div className="work-list">
        {workItems.map((item, index) => (
          <article className="work-item" id={item.slug} key={item.slug}>
            <div className="work-index">
              <span>Area {String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="work-content">
              <h2>{item.title}</h2>
              <p>{item.summary}</p>
              <ul className="tag-list" aria-label="Relevant areas">
                {item.areas.map((area) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
}
