import evidence from "@/lib/credit-risk.json";

export const creditRisk = evidence;
export const creditRiskPath = "/research/beyond-auc";
export const creditRiskRepository = "https://github.com/youngaryan/beyond-auc-credit-risk";
export const creditRiskReport = `${creditRiskPath}/report.pdf`;
export const creditRiskArchive = `${creditRiskPath}/beyond-auc-credit-risk.zip`;

export const creditRiskModels = [
  { key: "constant", label: "Constant prevalence" },
  { key: "logistic", label: "Logistic regression" },
  { key: "boosting", label: "Gradient boosting" },
  { key: "calibrated", label: "Boosting + sigmoid" },
] as const;

export function formatRiskNumber(value: number, digits = 3) {
  return value.toLocaleString("en-GB", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function creditRiskInterval(comparison: string, metric: string) {
  const interval = evidence.intervals.find(
    (item) => item.comparison === comparison && item.metric === metric,
  );
  if (!interval) throw new Error(`Missing credit-risk evidence: ${comparison}/${metric}`);
  return interval;
}

export const logisticFoldWins =
  evidence.stability.n_folds -
  evidence.stability.boosting_auc_wins -
  evidence.stability.boosting_auc_ties;

export const creditRiskSummary =
  `Boosting reached holdout AUC ${formatRiskNumber(evidence.holdout.boosting.roc_auc)} ` +
  `versus ${formatRiskNumber(evidence.holdout.logistic.roc_auc)} for logistic regression. ` +
  `Logistic led in ${logisticFoldWins} of ${evidence.stability.n_folds} validation folds, ` +
  "and sigmoid calibration showed no convincing benefit.";
