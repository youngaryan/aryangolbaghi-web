import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  creditRisk as study,
  creditRiskArchive,
  creditRiskInterval,
  creditRiskModels,
  creditRiskPath,
  creditRiskReport,
  formatRiskNumber as number,
  logisticFoldWins,
} from "@/lib/credit-risk";
import styles from "./study.module.css";

const title = "Beyond AUC: credit risk, calibration and model validation";
const description =
  "An empirical comparison of logistic regression and gradient boosting, examining probability calibration, uncertainty and sampling bias in credit-risk modelling.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: creditRiskPath },
  openGraph: {
    type: "article",
    url: creditRiskPath,
    title,
    description,
    publishedTime: "2026-10-27T00:00:00.000Z",
    images: [{
      url: study.figures.uncertainty.src,
      width: study.figures.uncertainty.width,
      height: study.figures.uncertainty.height,
      alt: "Paired model differences and bootstrap uncertainty in the Beyond AUC study",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [study.figures.uncertainty.src],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  datePublished: "2026-10-27",
  dateModified: "2026-10-27",
  author: { "@type": "Person", name: "Aryan Golbaghi", url: "https://aryangolbaghi.com" },
  url: `https://aryangolbaghi.com${creditRiskPath}`,
  image: `https://aryangolbaghi.com${study.figures.uncertainty.src}`,
  about: ["Credit risk", "Probability calibration", "Statistical model validation"],
  citation: "https://doi.org/10.24432/C5X89F",
};

function ResearchFigure({
  name,
  alt,
  caption,
}: {
  name: keyof typeof study.figures;
  alt: string;
  caption: string;
}) {
  const asset = study.figures[name];
  return (
    <figure className={styles.figure}>
      <a className={styles.imageLink} href={asset.src} aria-label={`Open full-size chart: ${alt}`}>
        <Image src={asset.src} width={asset.width} height={asset.height} alt={alt} unoptimized />
      </a>
      <figcaption>
        <span>{caption}</span>
        <a href={asset.src}>View full-size chart <span aria-hidden="true">↗</span></a>
      </figcaption>
    </figure>
  );
}

export default function BeyondAucPage() {
  const auc = creditRiskInterval("boosting_minus_logistic", "roc_auc");
  const calibratedBrier = creditRiskInterval("calibrated_minus_boosting", "brier");
  const calibratedLoss = creditRiskInterval("calibrated_minus_boosting", "log_loss");

  return (
    <article className={`page-shell research-case-study ${styles.study}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <header className="research-case-hero">
        <Link className="back-link" href="/research"><span aria-hidden="true">←</span> Research</Link>
        <p className="eyebrow">Quantitative research · Credit risk · 2026</p>
        <h1 className={styles.introTitle}>Beyond AUC.</h1>
        <p className="case-deck">
          Credit risk probability modelling, calibration and model validation.
          An empirical study of whether a more complex model produces better
          rankings—and probabilities reliable enough to support decisions.
        </p>
        <div className="case-byline" aria-label="Study details">
          <span>Aryan Golbaghi</span>
          <span>Independent research</span>
          <span>27 October 2026</span>
        </div>
        <div className="case-actions" aria-label="Research resources">
          <a className="case-button case-button-primary" href={creditRiskReport}>
            Read the research report <span aria-hidden="true">↗</span>
          </a>
          <a className="case-button" href={creditRiskArchive} download>
            Download source &amp; evidence <span aria-hidden="true">↓</span>
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
            <h2 id="question-heading">Does complexity earn its place in a credit-risk model?</h2>
            <p>
              Ranking borrowers by risk and estimating reliable probabilities
              are different problems. A model can improve ROC–AUC while still
              misrepresenting absolute risk. This study compares regularised
              logistic regression with gradient boosting, then tests whether
              sigmoid calibration improves the boosting probabilities.
            </p>
          </div>
        </div>
        <div className="case-contribution">
          <p className="case-section-label">Principal finding</p>
          <p>
            Boosting performed better on the locked holdout. Logistic regression
            led in {logisticFoldWins} of {study.stability.n_folds} training-validation
            folds. The evidence supports a holdout-specific advantage, while a
            stable general preference for the more complex model remains unresolved.
          </p>
        </div>
        <div className="metric-grid" aria-label="Holdout results and validation stability">
          <div className="metric-card">
            <strong>{number(study.holdout.boosting.roc_auc)}</strong>
            <span>Boosting holdout AUC</span>
            <small>{study.partitions.holdout.n} records · {study.partitions.holdout.bad} bad outcomes</small>
          </div>
          <div className="metric-card">
            <strong>{number(study.holdout.logistic.roc_auc)}</strong>
            <span>Logistic holdout AUC</span>
            <small>Identical evaluation records</small>
          </div>
          <div className="metric-card">
            <strong>+{number(auc.estimate)}</strong>
            <span>Paired AUC difference</span>
            <small>95% CI [{number(auc.lower)}, {number(auc.upper)}]</small>
          </div>
          <div className="metric-card">
            <strong>{logisticFoldWins} / {study.stability.n_folds}</strong>
            <span>Validation folds favour logistic</span>
            <small>Training-only outer-fold AUC</small>
          </div>
        </div>
      </section>

      <section className="case-section" aria-labelledby="design-heading">
        <div className="case-section-heading">
          <p className="case-section-label">Experimental design</p>
          <div>
            <h2 id="design-heading">Keep selection, calibration and evaluation separate.</h2>
            <p>
              A fixed stratified split reserves the final holdout. Five outer
              training folds evaluate the complete workflow, with a small
              five-fold hyperparameter search inside each fit. Each calibration
              score comes from a search that excluded that observation from
              preprocessing, fitting and hyperparameter selection.
            </p>
            <p className={styles.bodyParagraph}>
              Raw and calibrated boosting share the exact same final base
              estimator, isolating the sigmoid mapping. Log loss selects the
              hyperparameters; the holdout never does. A constant-prevalence
              predictor provides a reference for probability scoring rules.
            </p>
          </div>
        </div>
        <dl className="experiment-spec" aria-label="Study configuration">
          <div><dt>Source</dt><dd>Corrected UCI South German Credit · {study.data.n_rows.toLocaleString("en-GB")} observations</dd></div>
          <div><dt>Development / holdout</dt><dd>{study.partitions.training.n} / {study.partitions.holdout.n} records · stratified · seed {study.config.seed}</dd></div>
          <div><dt>Predictors</dt><dd>{study.data.n_features} features · 3 continuous measurements · 17 categorical attributes</dd></div>
          <div><dt>Target integrity</dt><dd>Explicitly recoded to 1 = bad credit · {study.data.bad} bad / {study.data.good} good</dd></div>
          <div><dt>Calibration</dt><dd>Sigmoid mapping · cross-fitted hyperparameter searches · shared base model</dd></div>
          <div><dt>Uncertainty</dt><dd>{study.config.bootstrap_replicates.toLocaleString("en-GB")} paired stratified bootstrap replicates</dd></div>
        </dl>
      </section>

      <section className="case-section" id="results" aria-labelledby="results-heading">
        <div className="case-section-heading">
          <p className="case-section-label">Measured results</p>
          <div>
            <h2 id="results-heading">A favourable holdout is one part of the evidence.</h2>
            <p>
              Both trained model families outperform the constant on ranking and
              proper scoring rules. Boosting’s holdout AUC advantage is
              {" "}{number(auc.estimate)}, with a paired 95% interval of
              {" "}[{number(auc.lower)}, {number(auc.upper)}]. That interval
              excludes zero for these fitted models and this case mix.
            </p>
          </div>
        </div>
        <div className="case-table-wrap" tabIndex={0} role="region" aria-label="Holdout metrics; scroll horizontally on small screens">
          <table className={`case-table ${styles.resultsTable}`}>
            <caption>
              Locked holdout: {study.partitions.holdout.n} observations.
              Higher AUC and average precision, lower Brier score and log loss are preferred.
            </caption>
            <thead><tr><th scope="col">Model</th><th scope="col">ROC–AUC</th><th scope="col">Average precision</th><th scope="col">Brier score</th><th scope="col">Log loss</th></tr></thead>
            <tbody>
              {creditRiskModels.map(({ key, label }) => (
                <tr key={key}>
                  <th scope="row">{label}</th>
                  <td>{number(study.holdout[key].roc_auc)}</td>
                  <td>{number(study.holdout[key].average_precision)}</td>
                  <td>{number(study.holdout[key].brier, 5)}</td>
                  <td>{number(study.holdout[key].log_loss, 5)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ResearchFigure
          name="uncertainty"
          alt="Paired AUC, Brier-score and log-loss differences. Boosting exceeds logistic on the holdout; calibration differences straddle zero."
          caption="Paired differences with 95% percentile intervals. Positive AUC differences and negative scoring-rule differences favour the first model. The same resampled observations are used for each model."
        />
        <p className="case-caveat">
          Bootstrap intervals condition on the fitted models and the observed
          {" "}{study.partitions.holdout.bad} bad / {study.partitions.holdout.good} good
          mix. They exclude uncertainty from refitting, population prevalence and
          temporal drift. These are nominal comparisons across related metrics,
          not a multiplicity-adjusted claim of overall superiority.
        </p>
        <div className={styles.finding}>
          <h3>The ranking reverses in training-only validation.</h3>
          <p>
            Mean outer-fold AUC is {number(study.cv.logistic.roc_auc.mean)} for
            logistic regression and {number(study.cv.boosting.roc_auc.mean)} for
            boosting. Logistic leads in {logisticFoldWins} of
            {" "}{study.stability.n_folds} folds. These folds reuse overlapping
            training data and are a stability analysis, not independent external
            validation. Their disagreement with the holdout is part of the result.
          </p>
        </div>
        <ResearchFigure
          name="validation"
          alt="Five training-only validation folds show variation in AUC and log loss, with logistic regression leading AUC in four folds."
          caption="Every outer-fold result is shown. The complete tuning and calibration workflow is refitted inside each outer training partition, making variation in model rankings visible."
        />
      </section>

      <section className="case-section" aria-labelledby="calibration-heading">
        <div className="case-section-heading">
          <p className="case-section-label">Probability quality</p>
          <div>
            <h2 id="calibration-heading">Calibration is an intervention to test.</h2>
            <p>
              Sigmoid calibration preserves the boosting ranking here, so AUC
              and average precision stay unchanged. Holdout Brier score changes
              by {number(calibratedBrier.estimate, 5)}, while log loss changes
              by +{number(calibratedLoss.estimate, 5)}. Both paired intervals
              include zero. There is no convincing benefit from the added mapping
              in this study.
            </p>
            <p className={styles.bodyParagraph}>
              The mapping improves outer-fold log loss in only
              {" "}{study.stability.calibration_log_loss_wins} of
              {" "}{study.stability.n_folds} folds. Reliability diagrams help
              explain where probabilities differ from frequencies, but sparse
              bins and arbitrary bin boundaries limit their precision. Proper
              scoring rules assess probability quality and also reflect discrimination.
            </p>
          </div>
        </div>
        <ResearchFigure
          name="calibration"
          alt="Five-bin reliability diagrams for logistic regression, raw boosting and calibrated boosting, with sample counts and Wilson intervals."
          caption="Five fixed probability bins, their counts and descriptive 95% Wilson intervals. The diagonal represents ideal calibration. Few high-risk observations make tail reliability especially uncertain."
        />
      </section>

      <section className="case-section" aria-labelledby="sampling-heading">
        <div className="case-section-heading">
          <p className="case-section-label">Sampling sensitivity</p>
          <div>
            <h2 id="sampling-heading">Thirty per cent bad credit is a sampling choice.</h2>
            <p>
              These records date from 1973–1975, and bad-credit outcomes were
              deliberately oversampled. The observed 30% share does not estimate
              a bank’s population default rate. Contract non-compliance is also
              not a fully specified modern default event over a prediction horizon.
            </p>
            <p className={styles.bodyParagraph}>
              Under a hypothetical change in prevalence, Bayes’ rule adjusts
              posterior odds by the ratio of target to source prior odds. This
              requires a calibrated source posterior and stable class-conditional
              feature distributions, P(X|Y). It demonstrates sensitivity; it does
              not recover real-world default probabilities.
            </p>
            <p className={styles.equation}>
              Target posterior odds = source posterior odds × target prior odds ÷ source prior odds
            </p>
          </div>
        </div>
        <ResearchFigure
          name="prevalence"
          alt="Hypothetical prevalence adjustments from a 30 per cent source prior to 5, 10, 20 and 30 per cent target priors, lowering probabilities without changing ranking."
          caption="Mathematical scenarios for explicitly hypothetical target prevalences. The map preserves ranking, while changing the probability levels. Changing lending policy or P(X|Y) would invalidate the simple prior correction."
        />
      </section>

      <section className="case-section" aria-labelledby="interpretation-heading">
        <div className="case-section-heading">
          <p className="case-section-label">Interpretation</p>
          <div>
            <h2 id="interpretation-heading">Predictive signal is only a starting point.</h2>
            <p>
              The contribution is a controlled empirical comparison with explicit
              calibration, uncertainty and model-risk questions. Stronger evidence
              for a complex model would require representative data, a defined
              outcome horizon and validation across time or external portfolios.
            </p>
          </div>
        </div>
        <div className="case-two-column">
          <div>
            <h3>What the study supports</h3>
            <ul>
              <li>Useful discriminatory information beyond a constant-prevalence baseline.</li>
              <li>A conditional boosting advantage on the fixed holdout, alongside contradictory fold rankings.</li>
              <li>No convincing gain from sigmoid calibration on this limited sample.</li>
              <li>The importance of distinguishing a good ranking from reliable probability levels.</li>
            </ul>
          </div>
          <div>
            <h3>What it does not establish</h3>
            <ul>
              <li>Contemporary portfolio PD calibration, economic value or deployment readiness.</li>
              <li>A universal model winner or equivalence between the model families.</li>
              <li>Causal feature effects, fairness or regulatory compliance. Combined personal-status codes cannot reliably identify sex.</li>
              <li>External or forward-time validity: borrower identifiers and prediction timestamps are unavailable.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="case-section" aria-labelledby="reproduce-heading">
        <div className="case-section-heading">
          <p className="case-section-label">Reproducibility</p>
          <div>
            <h2 id="reproduce-heading">Trace the conclusions back to executed experiments.</h2>
            <p>
              The project includes typed Python modules, a dependency lockfile,
              source checksums, a prespecified protocol, row-level predictions,
              tuning results and bootstrap draws. All {study.validation.tests}
              tests passed. A second experiment run reproduced the seven compared
              numerical artifacts exactly. The {study.report_pages}-page report
              discusses all {study.validation.artifact_verification.numbered_figures} original figures.
            </p>
            <div className="case-actions case-actions-inline">
              <a className="case-button case-button-primary" href={creditRiskArchive} download>
                Download the project (ZIP) <span aria-hidden="true">↓</span>
              </a>
              <a className="case-button" href={creditRiskReport} download="Beyond-AUC-Research-Report.pdf">
                Download the report <span aria-hidden="true">↓</span>
              </a>
            </div>
            <ul className={styles.evidenceLinks} aria-label="Machine-readable evidence">
              <li><a href={`${creditRiskPath}/metrics.json`}>Metrics (JSON)</a></li>
              <li><a href={`${creditRiskPath}/cv_results.csv`} download>Validation folds (CSV)</a></li>
              <li><a href={`${creditRiskPath}/bootstrap_intervals.csv`} download>Bootstrap intervals (CSV)</a></li>
              <li><a href={`${creditRiskPath}/reproducibility.json`}>Reproduction checks (JSON)</a></li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="case-study-footer">
        <div>
          <p className="case-section-label">Source &amp; study record</p>
          <p>
            Independent research released 27 October 2026, with no bank affiliation
            or endorsement. Data: <a href="https://doi.org/10.24432/C5X89F">UCI South German Credit</a>,
            licensed <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.
            The correction by Ulrike Grömping and the statistical references are
            documented in the report. Project code is MIT licensed.
          </p>
        </div>
        <Link className="text-link" href="/research">All research <span aria-hidden="true">→</span></Link>
      </footer>
    </article>
  );
}
