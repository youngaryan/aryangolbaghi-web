import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  grpoRoutingDate,
  grpoRoutingFigures,
  grpoRoutingMethods,
  grpoRoutingPath,
  grpoRoutingReport,
} from "@/lib/grpo-routing";
import styles from "./study.module.css";

const title = "When is GRPO worth it? A compute- and risk-aware study";
const description =
  "A CPU-only study of GRPO, supervised fine-tuning and a linear baseline for banking intent routing with tiny language models, with explicit label, compute and cost accounting.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: grpoRoutingPath },
  openGraph: {
    type: "article",
    url: grpoRoutingPath,
    title,
    description,
    publishedTime: `${grpoRoutingDate}T00:00:00.000Z`,
    images: [
      {
        url: grpoRoutingFigures.labels.src,
        width: grpoRoutingFigures.labels.width,
        height: grpoRoutingFigures.labels.height,
        alt: "Test accuracy against the number of labelled training examples for each method.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [grpoRoutingFigures.labels.src],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  datePublished: grpoRoutingDate,
  image: `https://aryangolbaghi.com${grpoRoutingFigures.labels.src}`,
  author: {
    "@type": "Person",
    name: "Aryan Golbaghi",
    url: "https://aryangolbaghi.com",
  },
  url: `https://aryangolbaghi.com${grpoRoutingPath}`,
  about: [
    "Group Relative Policy Optimization",
    "Supervised fine-tuning",
    "Intent classification",
    "Cost-sensitive learning",
  ],
  citation: "https://arxiv.org/abs/2402.03300",
};

function number(value: number, digits = 3) {
  return value.toLocaleString("en-GB", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function StudyFigure({
  name,
  alt,
  caption,
}: {
  name: keyof typeof grpoRoutingFigures;
  alt: string;
  caption: string;
}) {
  const asset = grpoRoutingFigures[name];
  return (
    <figure className={styles.figure}>
      <a className={styles.imageLink} href={asset.src} aria-label={`Open full-size chart: ${alt}`}>
        <Image src={asset.src} width={asset.width} height={asset.height} alt={alt} unoptimized />
      </a>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export default function GrpoRoutingPage() {
  return (
    <article className={`page-shell research-case-study ${styles.study}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <header className="research-case-hero">
        <Link className="back-link" href="/research">
          <span aria-hidden="true">←</span> Research
        </Link>
        <p className="eyebrow">Technical report · GRPO · 2026</p>
        <h1>When is GRPO worth it?</h1>
        <p className="case-deck">
          A compute- and risk-aware comparison of GRPO, supervised fine-tuning
          and a linear baseline for banking intent routing. With labels
          available and tiny models, GRPO trailed supervised fine-tuning, which
          trailed TF-IDF with logistic regression.
        </p>
        <div className="case-byline" aria-label="Study details">
          <span>Aryan Golbaghi</span>
          <span>Pythia-14M · Pythia-31M · BANKING77</span>
          <span>CPU experiments · November 2026</span>
        </div>
        <div className="case-actions" aria-label="Research resources">
          <a className="case-button case-button-primary" href={grpoRoutingReport}>
            Read the paper <span aria-hidden="true">↗</span>
          </a>
          <a className="case-button" href="#results">
            Explore the results <span aria-hidden="true">↓</span>
          </a>
        </div>
      </header>

      <section className="case-section" aria-labelledby="question-heading">
        <div className="case-section-heading">
          <p className="case-section-label">Research question</p>
          <div>
            <h2 id="question-heading">Does GRPO earn its cost when labels already exist?</h2>
            <p>
              Group Relative Policy Optimization is widely used to post-train
              language models against a verifier. Routing customer messages is
              a different kind of problem: gold labels exist, compute is
              limited, and some errors cost far more than others. Sending a
              stolen-card report to a fees queue is worse than confusing two
              routine questions. The study asks whether GRPO is worth using in
              that setting, and whether a reward that encodes those costs
              reduces the errors that matter.
            </p>
          </div>
        </div>
        <div className="case-contribution">
          <p className="case-section-label">Scope</p>
          <p>
            No new algorithm is proposed. GRPO-versus-SFT comparisons, cost- and
            abstention-aware rewards, and the measurement of advantage collapse
            all have precedents. The contribution is a joint evaluation under
            explicit accounting: every prompt scored by GRPO’s verifier is
            counted as a labelled example, CPU time is measured, and every
            method is compared with sending all requests to manual review.
          </p>
        </div>
        <div className="metric-grid" aria-label="Headline results">
          <div className="metric-card">
            <strong>300</strong>
            <span>Training runs</span>
            <small>255 with Pythia-14M, 45 with Pythia-31M</small>
          </div>
          <div className="metric-card">
            <strong>0.787 vs 0.608</strong>
            <span>SFT vs GRPO accuracy</span>
            <small>Same 1,106 labelled examples</small>
          </div>
          <div className="metric-card">
            <strong>77.9–99.7%</strong>
            <span>GRPO groups with no gradient</span>
            <small>Identical rewards within the group</small>
          </div>
          <div className="metric-card">
            <strong>0.113 → 0.068</strong>
            <span>SFT critical-error rate</span>
            <small>Argmax rule to minimum-expected-cost rule</small>
          </div>
        </div>
      </section>

      <section className="case-section" aria-labelledby="design-heading">
        <div className="case-section-heading">
          <p className="case-section-label">Experimental design</p>
          <div>
            <h2 id="design-heading">One policy, several objectives, shared budgets.</h2>
            <p>
              Eight BANKING77 intents are routed to their own queues, four of
              them designated high-severity by assumption. A ninth action sends
              the request to manual review, which is also the correct response
              to out-of-scope messages. Every neural method trains the same
              parameters of the same language model, restricted to nine
              single-token actions, so only the objective differs.
            </p>
          </div>
        </div>
        <dl className="experiment-spec" aria-label="Study configuration">
          <div><dt>Models</dt><dd>Pythia-14M (main study) · Pythia-31M (reduced replication) · all weights trained</dd></div>
          <div><dt>Data</dt><dd>BANKING77 · 1,106 / 234 / 480 train / validation / test requests · near-duplicates of test removed</dd></div>
          <div><dt>Methods</dt><dd>TF-IDF + logistic regression · SFT · cost-weighted SFT · GRPO (binary and cost reward) · rejection-sampling fine-tuning</dd></div>
          <div><dt>Budgets</dt><dd>Distinct labels, verifier calls, optimiser steps, forward and backward passes, CPU seconds, peak memory</dd></div>
          <div><dt>Costs</dt><dd>Hypothetical matrix · critical misroute 10 · manual review 0.5 · nine alternative matrices for sensitivity</dd></div>
          <div><dt>Statistics</dt><dd>Five seeds per configuration · paired bootstrap over seeds and test examples · Holm correction</dd></div>
        </dl>
      </section>

      <section className="case-section" id="results" aria-labelledby="results-heading">
        <div className="case-section-heading">
          <p className="case-section-label">Results</p>
          <div>
            <h2 id="results-heading">Supervised learning won at equal labels, and a linear model won overall.</h2>
            <p>
              With all 1,106 labels, supervised fine-tuning of Pythia-14M
              reached 0.787 accuracy. GRPO with a binary reward reached 0.608
              on the same examples. TF-IDF with logistic regression reached
              0.860 in under one CPU second. Quadrupling GRPO’s verifier budget
              raised the cost-reward variant only to 0.645.
            </p>
          </div>
        </div>

        <figure className={styles.barFigure}>
          <figcaption>Test accuracy with all 1,106 labels <span>Nine actions · higher is better</span></figcaption>
          {grpoRoutingMethods.map((method) => (
            <div className={styles.barRow} key={method.id}>
              <span>{method.label}</span>
              <div className={styles.barTrack} aria-hidden="true">
                <div
                  className={method.id.startsWith("grpo") ? styles.accentBar : styles.bar}
                  style={{ width: `${100 * method.accuracy}%` }}
                />
              </div>
              <strong>{number(method.accuracy)}</strong>
            </div>
          ))}
          <p>Zero-based scale from 0 to 1. Mean over five training seeds, argmax decision rule. GRPO and rejection sampling use group size 4 and 8,192 verifier calls.</p>
        </figure>

        <div className="case-table-wrap" tabIndex={0} role="region" aria-label="Results table; scroll horizontally on small screens">
          <table className={`case-table ${styles.resultsTable}`}>
            <caption>Test results with all 1,106 labels, argmax rule, mean over five seeds</caption>
            <thead>
              <tr>
                <th scope="col">Method</th>
                <th scope="col">CPU seconds</th>
                <th scope="col">Accuracy</th>
                <th scope="col">Expected cost</th>
                <th scope="col">Critical-error rate</th>
              </tr>
            </thead>
            <tbody>
              {grpoRoutingMethods.map((method) => (
                <tr key={method.id}>
                  <th scope="row">{method.label}</th>
                  <td>{method.cpuSeconds === 1 ? "< 1" : method.cpuSeconds}</td>
                  <td>{number(method.accuracy)}</td>
                  <td>{number(method.expectedCost)}</td>
                  <td>{number(method.criticalErrorRate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="case-caveat">
          Expected cost uses the study’s hypothetical cost matrix. Sending every
          request to manual review costs exactly 0.5, which is lower than every
          argmax router in this table. CPU seconds are single-thread training
          time on one laptop and include GRPO’s 64-example warm start.
        </p>

        <StudyFigure
          name="labels"
          alt="Test accuracy against the number of distinct labelled training examples. TF-IDF with logistic regression is highest at every budget, supervised fine-tuning is next, and GRPO points lie below both."
          caption="Test accuracy against distinct labelled examples. Every GRPO configuration lies below the supervised curve, and every supervised point lies below the TF-IDF curve."
        />

        <div className={styles.finding}>
          <h3>Most verifier calls bought no learning signal.</h3>
          <p>
            GRPO learns from differences in reward within a group of sampled
            actions. In every configuration, between 77.9% and 99.7% of groups
            received identical rewards, so their advantage was zero and they
            contributed no policy gradient. The fraction fell as groups got
            larger and was lower for the cost reward than for the binary reward.
          </p>
        </div>

        <StudyFigure
          name="homogeneous"
          alt="Left: the fraction of homogeneous-reward groups falls as group size rises from 2 to 8, and is lower for the cost reward. Right: the fraction over the course of training for two runs."
          caption="Fraction of sampled groups with identical rewards, by group size (left) and during training (right)."
        />
      </section>

      <section className="case-section" aria-labelledby="risk-heading">
        <div className="case-section-heading">
          <p className="case-section-label">Risk</p>
          <div>
            <h2 id="risk-heading">The decision rule mattered more than the training objective.</h2>
            <p>
              Replacing GRPO’s binary reward with the negative decision cost
              lowered its expected cost by 0.31 (95% interval 0.18 to 0.44) and
              its critical-error rate from 0.265 to 0.204. Part of that came
              from sending more requests to review. It still left GRPO behind
              plain supervised fine-tuning, and cost-weighted fine-tuning gave
              no benefit over the unweighted version.
            </p>
            <p className={styles.bodyParagraph}>
              The largest reduction came after training. Applying a
              minimum-expected-cost rule to the same supervised probabilities
              cut the critical-error rate from 0.113 to 0.068 and expected cost
              from 0.909 to 0.689. With a validation-calibrated abstention
              threshold at about half of traffic automated, TF-IDF with
              logistic regression cost 0.308 and supervised fine-tuning 0.417.
              No GRPO configuration fell below the always-review cost of 0.5.
            </p>
          </div>
        </div>

        <StudyFigure
          name="coverage"
          alt="Expected cost per request against automation coverage. The TF-IDF and supervised fine-tuning curves dip below the always-manual-review line at moderate coverage; both GRPO curves stay above it."
          caption="Cost against automation coverage. The dotted line is the cost of sending every request to manual review. Markers are validation-calibrated operating points."
        />
      </section>

      <section className="case-section" aria-labelledby="scale-heading">
        <div className="case-section-heading">
          <p className="case-section-label">Scaling check</p>
          <div>
            <h2 id="scale-heading">Doubling the model left the conclusions unchanged.</h2>
            <p>
              A reduced replication with Pythia-31M used the same splits, seeds
              and evaluation code. Supervised fine-tuning reached 0.804
              accuracy and 0.887 expected cost; cost-reward GRPO reached 0.642
              and 1.278. The cost reward still beat the binary reward within
              GRPO, and GRPO varied less across seeds at the larger size. A
              twofold change at this end of the scale is far from the model
              sizes at which GRPO is usually applied.
            </p>
          </div>
        </div>
      </section>

      <section className="case-section" aria-labelledby="limits-heading">
        <div className="case-section-heading">
          <p className="case-section-label">Interpretation</p>
          <div>
            <h2 id="limits-heading">What the study does and does not show.</h2>
            <p>
              This is the setting where supervised learning should be expected
              to do well: the verifier is an exact comparison with a gold
              label, so a cross-entropy step uses the whole label while a GRPO
              group sees only whether its sampled actions were right.
            </p>
          </div>
        </div>
        <div className="case-two-column">
          <div>
            <h3>Supported within this setting</h3>
            <ul>
              <li>With labels available, start with a linear baseline before a neural model.</li>
              <li>Add a cost-aware decision layer before changing the training objective.</li>
              <li>Count verifier-scored prompts as labelled data when comparing methods.</li>
              <li>Measure the share of identical-reward groups on a pilot before investing in GRPO.</li>
            </ul>
          </div>
          <div>
            <h3>Not established</h3>
            <ul>
              <li>Anything about GRPO for multi-token reasoning or generation, or at the model sizes where it is normally used.</li>
              <li>Real operational savings: the cost matrix and the severity split are assumptions, not measured losses.</li>
              <li>Robustness to real distribution shift: prevalence shifts and wording perturbations were simulated.</li>
              <li>The best achievable GRPO: learning rates came from a single-seed pilot and other settings were fixed in advance.</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="case-study-footer">
        <div>
          <p className="case-section-label">Study record</p>
          <p>
            Technical report dated November 2026. Full tables, statistical
            comparisons, ablations and limitations are in the paper.
          </p>
          <div className="case-actions case-actions-inline">
            <a className="case-button case-button-primary" href={grpoRoutingReport} download="When-Is-GRPO-Worth-It.pdf">
              Download the paper <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <Link className="text-link" href="/research">All research <span aria-hidden="true">→</span></Link>
      </footer>
    </article>
  );
}
