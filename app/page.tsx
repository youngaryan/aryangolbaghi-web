import Link from "next/link";
import { ArticleList } from "@/components/article-list";
import { getAllWriting } from "@/lib/writing";

const workItems = [
  {
    title: "Production AI systems",
    description:
      "Reliable services built around retrieval, evaluation, and observable model behaviour.",
  },
  {
    title: "Developer tooling",
    description:
      "Tools and infrastructure that make complex engineering work easier to operate and understand.",
  },
  {
    title: "Machine learning research tooling",
    description:
      "Practical systems for experimentation, fine-tuning, and rigorous model assessment.",
  },
];

export default function Home() {
  const selectedWriting = getAllWriting().slice(0, 3);

  return (
    <div className="page-shell home-page">
      <section className="hero" aria-labelledby="intro-heading">
        <p className="eyebrow">Software &amp; AI Engineer · London, UK</p>
        <h1 id="intro-heading">Aryan Golbaghi</h1>
        <p className="hero-role">Researcher, engineer, and technical writer.</p>
        <p className="hero-intro">
          I build software and AI systems, and research machine learning, LLM
          reliability, and the infrastructure required to evaluate them well.
        </p>
        <div className="hero-links" aria-label="Primary links">
          <Link className="text-link" href="/writing">
            Read my writing <span aria-hidden="true">↗</span>
          </Link>
          <Link className="text-link quiet-link" href="/research">
            View research <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="home-section" aria-labelledby="writing-heading">
        <div className="section-heading-row">
          <h2 id="writing-heading">Selected writing</h2>
          <Link className="small-link" href="/writing">
            All writing <span aria-hidden="true">→</span>
          </Link>
        </div>
        {selectedWriting.length > 0 ? (
          <ArticleList posts={selectedWriting} compact />
        ) : (
          <div className="empty-note">
            <p className="eyebrow">Publication notes</p>
            <p>
              The first articles are in preparation. The writing system includes a
              clearly labelled draft that demonstrates the publishing format.
            </p>
          </div>
        )}
      </section>

      <section className="home-section" aria-labelledby="work-heading">
        <div className="section-heading-row">
          <h2 id="work-heading">Selected work</h2>
          <Link className="small-link" href="/work">
            More detail <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="index-list">
          {workItems.map((item, index) => (
            <article className="index-row" key={item.title}>
              <span className="index-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section research-preview" aria-labelledby="research-heading">
        <div className="section-heading-row">
          <h2 id="research-heading">Research</h2>
          <Link className="small-link" href="/research">
            All research <span aria-hidden="true">→</span>
          </Link>
        </div>
        <article className="featured-paper">
          <div className="paper-meta">
            <span>First Author</span>
            <span>arXiv</span>
            <span>2025</span>
          </div>
          <h3>
            Enhancing Speech Emotion Recognition via Fine-Tuning Pre-Trained
            Models and Hyper-Parameter Optimisation
          </h3>
          <p>
            Resource-efficient optimisation for speech emotion recognition using
            pretrained representations, Bayesian optimisation, and TPE.
          </p>
        </article>
      </section>
    </div>
  );
}
