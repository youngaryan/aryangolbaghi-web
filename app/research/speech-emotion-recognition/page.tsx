import type { Metadata } from "next";
import Link from "next/link";

const pageTitle = "CPU-efficient speech emotion recognition";
const pageDescription =
  "A research case study on using pretrained speech representations and automated hyperparameter optimisation to reach 97% balanced class accuracy without a GPU.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  authors: [
    { name: "Aryan Golbaghi", url: "https://aryangolbaghi.com" },
    { name: "Shuo Zhou" },
  ],
  alternates: { canonical: "/research/speech-emotion-recognition" },
  openGraph: {
    type: "article",
    url: "/research/speech-emotion-recognition",
    title: pageTitle,
    description: pageDescription,
    publishedTime: "2025-10-08T00:00:00.000Z",
    authors: ["Aryan Golbaghi", "Shuo Zhou"],
    images: [],
  },
  twitter: {
    card: "summary",
    title: pageTitle,
    description: pageDescription,
    images: [],
  },
};

const paperUrl = "https://arxiv.org/abs/2510.07052";
const pdfUrl = "https://arxiv.org/pdf/2510.07052";
const codeUrl = "https://github.com/youngaryan/speechbrain-emotion-hpo";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ScholarlyArticle",
  headline:
    "Enhancing Speech Emotion Recognition via Fine-Tuning Pre-Trained Models and Hyper-Parameter Optimisation",
  description: pageDescription,
  datePublished: "2025-10-08",
  author: [
    {
      "@type": "Person",
      name: "Aryan Golbaghi",
      url: "https://aryangolbaghi.com",
    },
    { "@type": "Person", name: "Shuo Zhou" },
  ],
  identifier: "arXiv:2510.07052",
  url: paperUrl,
  sameAs: [paperUrl, codeUrl],
  keywords: [
    "speech emotion recognition",
    "hyperparameter optimisation",
    "wav2vec 2.0",
    "AutoML",
    "balanced class accuracy",
  ],
};

const pipelineSteps = [
  {
    label: "01",
    title: "Prepare speech",
    description:
      "Resample EmoDB audio to 16 kHz, normalise length, and create a stratified 80/20 split.",
  },
  {
    label: "02",
    title: "Encode",
    description:
      "Use SpeechBrain's wav2vec 2.0 encoder, pretrained for speech and previously fine-tuned on IEMOCAP.",
  },
  {
    label: "03",
    title: "Search",
    description:
      "Compare GP-BO and TPE across the same four-dimensional search space and 15-trial budget.",
  },
  {
    label: "04",
    title: "Select",
    description:
      "Optimise balanced class accuracy, retaining the strongest configuration from each search engine.",
  },
  {
    label: "05",
    title: "Stress-test",
    description:
      "Evaluate the selected model in-domain and on CREMA-D and RAVDESS without further fine-tuning.",
  },
];

const comparisonRows = [
  {
    method: "TPE (Hyperopt)",
    compute: "8 CPU cores",
    bca: "0.97",
    time: "15 min",
    emphasis: "Highest BCA",
  },
  {
    method: "GP-BO (Ax)",
    compute: "8 CPU cores",
    bca: "0.96",
    time: "11 min",
    emphasis: "Best efficiency",
  },
  {
    method: "TPE (Optuna)",
    compute: "8 CPU cores",
    bca: "0.93",
    time: "185 min",
    emphasis: "Within 15 trials",
  },
  {
    method: "AutoSpeech 2020",
    compute: "Tesla P100 GPU",
    bca: "0.85",
    time: "~30 min",
    emphasis: "Published baseline",
  },
  {
    method: "Grid search",
    compute: "64 CPU cores",
    bca: "0.98",
    time: "1,680 min",
    emphasis: "143 trials",
  },
];

const transferResults = [
  { corpus: "EmoDB", before: "0.11", after: "0.96", delta: "+0.85" },
  { corpus: "CREMA-D", before: "0.13", after: "0.38", delta: "+0.25" },
  { corpus: "RAVDESS", before: "0.18", after: "0.44", delta: "+0.26" },
];

export default function SpeechEmotionRecognitionPage() {
  return (
    <article className="page-shell research-case-study">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <header className="research-case-hero">
        <Link className="back-link" href="/research">
          <span aria-hidden="true">←</span> Research
        </Link>
        <p className="eyebrow">Research case study · First author · 2025</p>
        <h1>CPU-efficient speech emotion recognition</h1>
        <p className="case-deck">
          A reproducible pipeline combining pretrained speech representations
          with automated hyperparameter optimisation—reaching 97% balanced
          class accuracy on eight CPU cores, without a GPU.
        </p>

        <div className="case-byline" aria-label="Publication details">
          <span>Aryan Golbaghi &amp; Shuo Zhou</span>
          <span>University of Sheffield</span>
          <span>arXiv:2510.07052</span>
        </div>

        <div className="case-actions" aria-label="Research links">
          <a className="case-button case-button-primary" href={paperUrl}>
            Read the paper <span aria-hidden="true">↗</span>
          </a>
          <a className="case-button" href={codeUrl}>
            View source code <span aria-hidden="true">↗</span>
          </a>
          <a className="case-button" href={pdfUrl}>
            Download PDF <span aria-hidden="true">↓</span>
          </a>
        </div>
      </header>

      <section className="case-section case-overview" aria-labelledby="overview-heading">
        <div className="case-section-heading">
          <p className="case-section-label">Overview</p>
          <div>
            <h2 id="overview-heading">
              Make model selection cheaper without treating accuracy as an
              afterthought.
            </h2>
            <p>
              Speech emotion recognition systems can depend on costly GPU
              training and extensive manual tuning. This work asks whether a
              pretrained encoder and a deliberately small automated search can
              reach competitive performance on commodity CPU hardware.
            </p>
          </div>
        </div>

        <div className="case-contribution">
          <p className="case-section-label">My contribution</p>
          <p>
            As first author, I led the engineering of the experimental workflow
            used to compare Gaussian-process Bayesian optimisation and
            tree-structured Parzen estimators, and framed the analysis around
            accuracy, wall-clock efficiency, and cross-corpus transfer.
          </p>
        </div>

        <div className="metric-grid" aria-label="Headline results">
          <div className="metric-card">
            <strong>0.97</strong>
            <span>Top balanced class accuracy</span>
            <small>TPE · Hyperopt · 15 minutes</small>
          </div>
          <div className="metric-card">
            <strong>2.4 min</strong>
            <span>Time to exceed 0.90 BCA</span>
            <small>GP-BO · Ax · trial 2</small>
          </div>
          <div className="metric-card">
            <strong>8 CPU</strong>
            <span>Cores used for HPO experiments</span>
            <small>32 GB RAM · no GPU</small>
          </div>
          <div className="metric-card">
            <strong>+0.25 / +0.26</strong>
            <span>Cross-corpus BCA improvement</span>
            <small>CREMA-D / RAVDESS</small>
          </div>
        </div>
      </section>

      <section className="case-section" aria-labelledby="pipeline-heading">
        <div className="case-section-heading">
          <p className="case-section-label">Pipeline</p>
          <div>
            <h2 id="pipeline-heading">One controlled path from audio to evidence.</h2>
            <p>
              Every optimiser used the same preprocessing, model, objective,
              search dimensions, trial budget, and random seeds. That isolates
              the search strategy as the main experimental variable.
            </p>
          </div>
        </div>

        <ol className="pipeline-flow">
          {pipelineSteps.map((step) => (
            <li key={step.label}>
              <span className="pipeline-number" aria-hidden="true">
                {step.label}
              </span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>

        <dl className="experiment-spec" aria-label="Experimental design">
          <div>
            <dt>Target dataset</dt>
            <dd>EmoDB · 535 utterances · 10 speakers · 7 emotions</dd>
          </div>
          <div>
            <dt>Model</dt>
            <dd>SpeechBrain wav2vec 2.0 encoder + linear classifier</dd>
          </div>
          <div>
            <dt>Search space</dt>
            <dd>Learning rate, epochs, encoder unfreeze epoch, maximum input length</dd>
          </div>
          <div>
            <dt>Optimisers</dt>
            <dd>Ax GP-BO · Hyperopt TPE · Optuna TPE</dd>
          </div>
          <div>
            <dt>Objective</dt>
            <dd>Balanced class accuracy, suitable for uneven class distributions</dd>
          </div>
          <div>
            <dt>Budget</dt>
            <dd>15 trials per HPO engine under identical training code</dd>
          </div>
        </dl>
      </section>

      <section className="case-section" aria-labelledby="results-heading">
        <div className="case-section-heading">
          <p className="case-section-label">Results</p>
          <div>
            <h2 id="results-heading">Fast convergence mattered more than brute force.</h2>
            <p>
              TPE through Hyperopt produced the strongest score, while GP-BO
              through Ax reached a high-quality region fastest and delivered the
              best accuracy-to-time trade-off.
            </p>
          </div>
        </div>

        <div className="case-table-wrap">
          <table className="case-table">
            <caption>
              Best reported result for each method and its compute context
            </caption>
            <thead>
              <tr>
                <th scope="col">Method</th>
                <th scope="col">Compute</th>
                <th scope="col">Best BCA</th>
                <th scope="col">Time to best</th>
                <th scope="col">Context</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr
                  className={
                    row.method === "TPE (Hyperopt)" || row.method === "GP-BO (Ax)"
                      ? "case-table-highlight"
                      : undefined
                  }
                  key={row.method}
                >
                  <th scope="row">{row.method}</th>
                  <td>{row.compute}</td>
                  <td>{row.bca}</td>
                  <td>{row.time}</td>
                  <td>{row.emphasis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="case-caveat">
          Wall-clock comparisons are descriptive rather than a controlled
          hardware benchmark: grid search and the published AutoSpeech baseline
          used different compute environments. The controlled comparison is
          between Ax, Hyperopt, and Optuna on the same eight-core setup.
        </p>
      </section>

      <section className="case-section" aria-labelledby="transfer-heading">
        <div className="case-section-heading">
          <p className="case-section-label">Generalisation</p>
          <div>
            <h2 id="transfer-heading">The tuned representation transferred—but the domain gap remained.</h2>
            <p>
              A model tuned on German EmoDB was evaluated without further
              training on the English CREMA-D and RAVDESS corpora. The gains are
              meaningful, but the lower out-of-domain scores keep the conclusion
              appropriately modest.
            </p>
          </div>
        </div>

        <div className="transfer-grid" aria-label="Cross-corpus balanced class accuracy">
          {transferResults.map((result) => (
            <article className="transfer-card" key={result.corpus}>
              <h3>{result.corpus}</h3>
              <div className="transfer-values">
                <div>
                  <span>Baseline</span>
                  <strong>{result.before}</strong>
                </div>
                <span className="transfer-arrow" aria-hidden="true">→</span>
                <div>
                  <span>HPO-tuned</span>
                  <strong>{result.after}</strong>
                </div>
              </div>
              <p>{result.delta} BCA</p>
            </article>
          ))}
        </div>
      </section>

      <section className="case-section" aria-labelledby="assessment-heading">
        <div className="case-section-heading">
          <p className="case-section-label">Assessment</p>
          <div>
            <h2 id="assessment-heading">What the experiment supports—and what it does not.</h2>
          </div>
        </div>

        <div className="case-two-column">
          <div>
            <h3>Supported conclusions</h3>
            <ul>
              <li>Sequential HPO found high-performing configurations in far fewer trials than grid search.</li>
              <li>GP-BO was the strongest choice when iteration speed mattered most.</li>
              <li>TPE through Hyperopt achieved the highest BCA under the shared 15-trial budget.</li>
              <li>HPO tuning improved transfer to both English evaluation corpora.</li>
            </ul>
          </div>
          <div>
            <h3>Limitations</h3>
            <ul>
              <li>EmoDB is a small benchmark with 535 utterances from 10 speakers.</li>
              <li>The evaluation uses one stratified 80/20 split rather than repeated speaker-independent folds.</li>
              <li>Cross-corpus label mapping simplifies differences between emotion taxonomies.</li>
              <li>Out-of-domain BCA remains substantially below in-domain performance.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="case-section" aria-labelledby="reproducibility-heading">
        <div className="case-section-heading">
          <p className="case-section-label">Reproducibility</p>
          <div>
            <h2 id="reproducibility-heading">The implementation is public.</h2>
            <p>
              The repository separates data preparation from training and HPO,
              records structured experiment outputs, and includes fixed seeds,
              logging, and checkpoints to support repeatable runs.
            </p>
            <div className="case-actions case-actions-inline">
              <a className="case-button case-button-primary" href={codeUrl}>
                Explore the repository <span aria-hidden="true">↗</span>
              </a>
              <a className="case-button" href={paperUrl}>
                Verify the results <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="case-study-footer">
        <div>
          <p className="case-section-label">Citation</p>
          <p>
            Golbaghi, A. &amp; Zhou, S. (2025). <cite>Enhancing Speech Emotion
            Recognition via Fine-Tuning Pre-Trained Models and Hyper-Parameter
            Optimisation.</cite> arXiv:2510.07052.
          </p>
        </div>
        <Link className="text-link" href="/research">
          View all research <span aria-hidden="true">→</span>
        </Link>
      </footer>
    </article>
  );
}
