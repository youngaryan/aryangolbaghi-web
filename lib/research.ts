export type ResearchItem = {
  title: string;
  status: string;
  role: string;
  authors?: string[];
  venue?: string;
  year?: number;
  description: string;
  detailUrl?: string;
  paperUrl?: string;
  codeUrl?: string;
  projectUrl?: string;
  tags: string[];
};

export const researchItems: ResearchItem[] = [
  {
    title:
      "Enhancing Speech Emotion Recognition via Fine-Tuning Pre-Trained Models and Hyper-Parameter Optimisation",
    status: "Published",
    role: "First Author",
    authors: ["Aryan Golbaghi", "Shuo Zhou"],
    venue: "arXiv",
    year: 2025,
    description:
      "Research into resource-efficient AutoML and hyperparameter optimisation for speech emotion recognition, using pretrained representations, Bayesian optimisation, and TPE.",
    detailUrl: "/research/speech-emotion-recognition",
    paperUrl: "https://arxiv.org/abs/2510.07052",
    codeUrl: "https://github.com/youngaryan/speechbrain-emotion-hpo",
    tags: [
      "Speech emotion recognition",
      "Fine-tuning",
      "AutoML",
      "Bayesian optimisation",
    ],
  },
  {
    title: "Model Alignment for Reliable LLM Abstention",
    status: "Manuscript in preparation",
    role: "Reinforcement Learning Lead",
    description:
      "Research on model uncertainty and reliable refusal or abstention behaviour, with work spanning reinforcement learning, GRPO, DPO, and fine-tuning.",
    tags: ["LLM reliability", "Abstention", "GRPO", "DPO", "Fine-tuning"],
  },
];
