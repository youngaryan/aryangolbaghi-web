import type { Metadata } from "next";
import Link from "next/link";
import results from "@/lib/dpo-mini.json";
import styles from "./study.module.css";

const title = "DPO-Mini: measuring the cost of a fixed reference";
const description =
  "A reproducible CPU study of DPO correctness, shared-base references and caching, with complete benchmark timing and a documented FP32 numerical discrepancy.";
const codeUrl = "https://github.com/youngaryan/dpo-mini";
const reportUrl = "/research/dpo-mini/report.pdf";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/research/dpo-mini" },
  openGraph: {
    type: "article",
    url: "/research/dpo-mini",
    title,
    description,
    publishedTime: "2026-10-16T00:00:00.000Z",
    images: [],
  },
  twitter: { card: "summary", title, description, images: [] },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  datePublished: "2026-10-16",
  author: {
    "@type": "Person",
    name: "Aryan Golbaghi",
    url: "https://aryangolbaghi.com",
  },
  url: "https://aryangolbaghi.com/research/dpo-mini",
  about: ["Direct Preference Optimization", "LoRA", "Reference caching"],
  citation: "https://arxiv.org/abs/2305.18290",
};

function number(value: number, digits = 3) {
  return value.toLocaleString("en-GB", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

const strategies = [
  {
    letter: "A",
    title: "Separate reference",
    text: "Keep a second frozen model in memory and recompute reference scores during training.",
  },
  {
    letter: "B",
    title: "Shared frozen base",
    text: "Use the policy’s frozen base with its LoRA adapter temporarily disabled. Recompute reference scores without retaining a second model.",
  },
  {
    letter: "C",
    title: "Cold shared-base cache",
    text: "Use the shared base to compute training-reference scores once, inside each trial process, then read them from a validated cache.",
  },
];

export default function DpoMiniPage() {
  const maxProcessTime = Math.max(...results.arms.map((arm) => arm.process.median));

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
        <p className="eyebrow">Technical report · DPO-Mini · 2026</p>
        <h1>Measuring the cost of a fixed reference</h1>
        <p className="case-deck">
          A correctness and performance study of Direct Preference Optimization.
          Caching reduced complete benchmark time by 11.70% against a shared-base
          reference, with matching observed training trajectories.
        </p>
        <div className="case-byline" aria-label="Study details">
          <span>Aryan Golbaghi</span>
          <span>SmolLM2-135M · LoRA</span>
          <span>CPU experiments · 15 October 2026</span>
        </div>
        <div className="case-actions" aria-label="Research resources">
          <a className="case-button case-button-primary" href={reportUrl}>
            Read the technical report <span aria-hidden="true">↗</span>
          </a>
          <a className="case-button" href={codeUrl}>
            Source &amp; evidence <span aria-hidden="true">↗</span>
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
            <h2 id="question-heading">How much does caching save once the full cost is counted?</h2>
            <p>
              DPO compares a policy’s preference scores with a fixed reference.
              Recomputing that reference costs time; keeping a second model
              resident costs memory. Precomputing scores can reduce repeated
              work, but the cache itself has a construction cost. The study
              measures those costs separately and checks that the strategies
              preserve the tested computation.
            </p>
          </div>
        </div>
        <div className="case-contribution">
          <p className="case-section-label">Engineering focus</p>
          <p>
            An independent implementation of the original sigmoid DPO objective,
            explicit completion-token masking, validated reference caches,
            deterministic checkpoint resume, and a controlled comparison of
            three reference strategies. DPO and caching are established methods;
            the contribution here is the implementation, audit and measurement.
          </p>
        </div>
        <div className="metric-grid" aria-label="Results against the shared-base baseline">
          <div className="metric-card">
            <strong>11.70%</strong>
            <span>Less whole-process time</span>
            <small>Cold cache construction included</small>
          </div>
          <div className="metric-card">
            <strong>32.43%</strong>
            <span>Less measured training time</span>
            <small>20 updates after warm-up</small>
          </div>
          <div className="metric-card">
            <strong>3.2 MiB</strong>
            <span>Lower training RSS</span>
            <small>Difference between medians</small>
          </div>
          <div className="metric-card">
            <strong>9 / 9</strong>
            <span>Matching benchmark endpoints</span>
            <small>Canonical model-state hashes</small>
          </div>
        </div>
      </section>

      <section className="case-section" aria-labelledby="design-heading">
        <div className="case-section-heading">
          <p className="case-section-label">Experimental design</p>
          <div>
            <h2 id="design-heading">A stronger baseline separates sharing from caching.</h2>
            <p>
              Comparing a cache only with a separately resident reference mixes
              two changes: reference computation and model residency. Adding the
              shared-base strategy makes B versus C the relevant comparison for
              caching. A versus B measures the reference implementation strategy.
            </p>
          </div>
        </div>
        <div className={styles.strategies}>
          {strategies.map((strategy) => (
            <div key={strategy.letter}>
              <span className="case-section-label">Strategy {strategy.letter}</span>
              <h3>{strategy.title}</h3>
              <p>{strategy.text}</p>
            </div>
          ))}
        </div>
        <dl className="experiment-spec" aria-label="Study configuration">
          <div><dt>Model</dt><dd>SmolLM2-135M-Instruct · rank-16 LoRA · 921,600 trainable parameters</dd></div>
          <div><dt>Hardware</dt><dd>AMD Ryzen 5 PRO 7540U · 30.67 GiB RAM · Windows 11</dd></div>
          <div><dt>Execution</dt><dd>CPU FP32 · four computation threads · seed 42</dd></div>
          <div><dt>Data</dt><dd>Filtered UltraFeedback Binarized · 256 / 64 / 64 train / validation / test pairs</dd></div>
          <div><dt>Timing workload</dt><dd>5 warm-up + 20 measured updates · 16 pairs per update · 3 trials per strategy</dd></div>
          <div><dt>Matched conditions</dt><dd>Initial state, data order, optimiser, schedule and backend · balanced orders ABC / BCA / CAB</dd></div>
        </dl>
      </section>

      <section className="case-section" id="results" aria-labelledby="results-heading">
        <div className="case-section-heading">
          <p className="case-section-label">Results</p>
          <div>
            <h2 id="results-heading">The training gain remains useful after paying for the cache.</h2>
            <p>
              The cache took a median 228.976 seconds to construct. Including
              that cost, the process took 1,013.617 seconds versus 1,147.964
              seconds for the shared-base reference. The larger training-only
              reduction describes the part of execution where reference scores
              are already available.
            </p>
          </div>
        </div>

        <figure className={styles.timingFigure}>
          <figcaption>Median whole benchmark process <span>Seconds · lower is faster</span></figcaption>
          {results.arms.map((arm) => (
            <div className={styles.barRow} key={arm.id}>
              <span>{arm.label}</span>
              <div className={styles.barTrack} aria-hidden="true">
                <div className={arm.id === "C" ? styles.cachedBar : styles.bar} style={{ width: `${100 * arm.process.median / maxProcessTime}%` }} />
              </div>
              <strong>{number(arm.process.median, 1)} s</strong>
            </div>
          ))}
          <p>Zero-based scale. Each cold-cache process includes its own reference precomputation.</p>
        </figure>

        <div className="case-table-wrap" tabIndex={0} role="region" aria-label="Benchmark table; scroll horizontally on small screens">
          <table className="case-table">
            <caption>Median (minimum–maximum) across three fresh-process trials per strategy</caption>
            <thead><tr><th scope="col">Reference strategy</th><th scope="col">Training block, s</th><th scope="col">Whole process, s</th><th scope="col">Training RSS, MiB</th></tr></thead>
            <tbody>
              {results.arms.map((arm) => (
                <tr className={arm.id === "C" ? "case-table-highlight" : undefined} key={arm.id}>
                  <th scope="row">{arm.id}: {arm.label}</th>
                  <td>{number(arm.training.median)}<small className={styles.range}>{number(arm.training.min)}–{number(arm.training.max)}</small></td>
                  <td>{number(arm.process.median)}<small className={styles.range}>{number(arm.process.min)}–{number(arm.process.max)}</small></td>
                  <td>{number(arm.rss.median, 1)}<small className={styles.range}>{number(arm.rss.min, 1)}–{number(arm.rss.max, 1)}</small></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="case-caveat">
          The training block covers 320 processed pairs after 80 warm-up pairs.
          Whole-process time includes loading, warm-up, cache construction and
          adapter endpoint output. Held-out evaluation, generation and full
          learning checkpoints are outside this benchmark. RSS is sampled during
          training; it is not whole-process peak memory. Percentage reductions
          use the ratio of medians.
        </p>
        <div className={styles.finding}>
          <h3>Most of the memory saving came from sharing the base.</h3>
          <p>
            Replacing the separate reference with a shared base lowered median
            training RSS by 533.5 MiB. Caching then changed it by only 3.2 MiB,
            with overlapping trial ranges. The large A-to-C memory difference
            cannot be attributed to caching alone.
          </p>
        </div>
      </section>

      <section className="case-section" aria-labelledby="correctness-heading">
        <div className="case-section-heading">
          <p className="case-section-label">Correctness</p>
          <div>
            <h2 id="correctness-heading">Numerical checks exposed a real qualification.</h2>
            <p>
              Both the working and fresh-environment core suites passed all 19
              tests. Shared-base reference invariants and matched short
              trajectories also passed. However, the actual pretrained
              comparison with TRL 0.24.0 exceeded the original FP32 tolerances.
              That failure remains part of the result.
            </p>
          </div>
        </div>
        <div className="case-two-column">
          <div>
            <h3>What matched</h3>
            <ul>
              <li>Reference scores before and after policy-adapter updates.</li>
              <li>Frozen base parameters and buffers, optimiser membership, and state restoration after exceptions.</li>
              <li>Short three-strategy loss traces and adapter tensors, with zero reference forwards in cached training.</li>
              <li>Complete update traces and canonical model-state hashes across all nine timing runs.</li>
            </ul>
          </div>
          <div>
            <h3>Where FP32 diverged</h3>
            <ul>
              <li>Pretrained score differences reached 6.4087e−4 and loss differences reached 1.6809e−5.</li>
              <li>The trained-adapter gradient difference was 2.0103e−6, narrowly above the original 2e−6 bound.</li>
              <li>Input IDs, masks and logits matched; different score-reduction arithmetic caused the discrepancy.</li>
              <li>Separate FP64-reduction diagnostics recovered identical adapter gradients. This does not establish full TRL Trainer equivalence.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="case-section" aria-labelledby="interpretation-heading">
        <div className="case-section-heading">
          <p className="case-section-label">Interpretation</p>
          <div>
            <h2 id="interpretation-heading">Timing boundaries change the conclusion.</h2>
            <p>
              The earlier sixteen-update learning workflow included evaluation,
              generation and a checkpoint. It took 1,518.458 seconds without
              caching and 1,409.365 seconds with caching: a 7.18% reduction. Its
              recorded aggregate stages reconcile that saving, while finer
              historical phase attribution remains unresolved. A new
              instrumented replay measures its own detailed costs; those
              measurements are not retroactively assigned to the earlier run.
            </p>
            <p className={styles.bodyParagraph}>
              The single paired learning seed ended at test DPO loss 0.690726,
              with 39 of 64 strict-positive preference margins and no ties. This
              small objective-level change does not establish better human
              preference, helpfulness or truthfulness. The timing trials describe
              one nonexclusive CPU host, and the short exploratory generations
              have no completed human ratings.
            </p>
          </div>
        </div>
      </section>

      <section className="case-section" aria-labelledby="reproduce-heading">
        <div className="case-section-heading">
          <p className="case-section-label">Reproducibility</p>
          <div>
            <h2 id="reproduce-heading">Inspect the implementation and recalculate the results.</h2>
            <p>
              The repository includes source, tests, a dependency lockfile,
              configurations, per-trial numeric evidence and the report’s
              tables. Its offline verification and report-only commands run
              without retraining. The clean-environment check covered the core
              suite, pinned upstream comparisons, short pretrained trajectories
              and report regeneration; it did not repeat the complete timing
              campaign. Weights, full datasets and large checkpoints must be
              obtained separately for pretrained reruns.
            </p>
            <div className="case-actions case-actions-inline">
              <a className="case-button case-button-primary" href={codeUrl}>Explore the repository <span aria-hidden="true">↗</span></a>
              <a className="case-button" href={reportUrl} download="DPO-Mini-Technical-Report.pdf">Download the report <span aria-hidden="true">↓</span></a>
            </div>
          </div>
        </div>
      </section>

      <footer className="case-study-footer">
        <div>
          <p className="case-section-label">Study record</p>
          <p>
            Technical report released 16 October 2026. Primary references,
            licenses and numerical qualifications are documented in the report
            and repository.
          </p>
        </div>
        <Link className="text-link" href="/research">All research <span aria-hidden="true">→</span></Link>
      </footer>
    </article>
  );
}
