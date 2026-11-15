// Figures and headline numbers for the GRPO routing study.
// Every value is copied from the manuscript (Tables 1, 4, 5 and 6); none is recomputed here.

export const grpoRoutingPath = "/research/grpo-routing";
export const grpoRoutingReport = `${grpoRoutingPath}/report.pdf`;
export const grpoRoutingDate = "2026-11-15";

export const grpoRoutingSummary =
  "On the same 1,106 labelled examples, supervised fine-tuning reached 0.787 accuracy against 0.608 for GRPO, " +
  "and TF-IDF with logistic regression reached 0.860 in under one CPU second. " +
  "Between 77.9% and 99.7% of GRPO’s sampled groups produced no gradient.";

// Argmax decision rule, mean over five seeds, all 1,106 training labels (manuscript Table 1).
export const grpoRoutingMethods = [
  {
    id: "tfidf",
    label: "TF-IDF + logistic regression",
    cpuSeconds: 1,
    accuracy: 0.86,
    expectedCost: 0.613,
    criticalErrorRate: 0.05,
  },
  {
    id: "sft",
    label: "Supervised fine-tuning",
    cpuSeconds: 332,
    accuracy: 0.787,
    expectedCost: 0.909,
    criticalErrorRate: 0.113,
  },
  {
    id: "wsft",
    label: "Cost-weighted fine-tuning",
    cpuSeconds: 326,
    accuracy: 0.779,
    expectedCost: 0.956,
    criticalErrorRate: 0.121,
  },
  {
    id: "rft",
    label: "Rejection-sampling fine-tuning",
    cpuSeconds: 165,
    accuracy: 0.671,
    expectedCost: 1.319,
    criticalErrorRate: 0.182,
  },
  {
    id: "grpo-cost",
    label: "GRPO, cost reward",
    cpuSeconds: 167,
    accuracy: 0.637,
    expectedCost: 1.405,
    criticalErrorRate: 0.204,
  },
  {
    id: "grpo-bin",
    label: "GRPO, binary reward",
    cpuSeconds: 170,
    accuracy: 0.608,
    expectedCost: 1.711,
    criticalErrorRate: 0.265,
  },
] as const;

export const grpoRoutingFigures = {
  labels: {
    src: `${grpoRoutingPath}/fig01_accuracy_vs_labels.png`,
    width: 888,
    height: 614,
  },
  homogeneous: {
    src: `${grpoRoutingPath}/fig07_homogeneous_groups.png`,
    width: 1344,
    height: 600,
  },
  coverage: {
    src: `${grpoRoutingPath}/fig04_coverage_vs_cost.png`,
    width: 874,
    height: 641,
  },
} as const;
