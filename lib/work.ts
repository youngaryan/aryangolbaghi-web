export type WorkItem = {
  slug: string;
  title: string;
  summary: string;
  areas: string[];
};

export const workItems: WorkItem[] = [
  {
    slug: "production-ai-systems",
    title: "Production AI systems",
    summary:
      "Engineering reliable AI services with deliberate retrieval, evaluation, failure handling, and operational visibility.",
    areas: ["RAG", "LLM evaluation", "Cloud infrastructure"],
  },
  {
    slug: "developer-tooling",
    title: "Developer tooling",
    summary:
      "Building tools that turn complicated workflows into clear, repeatable engineering systems.",
    areas: ["TypeScript", "Python", "GitHub Actions"],
  },
  {
    slug: "observability-systems",
    title: "Real-time observability systems",
    summary:
      "Designing software that makes system behaviour legible while events are still unfolding.",
    areas: ["Real-time systems", "Monitoring", "Cloud"],
  },
  {
    slug: "ml-research-tooling",
    title: "Machine learning research tooling",
    summary:
      "Creating practical infrastructure for fine-tuning, experiment management, and rigorous model assessment.",
    areas: ["PyTorch", "Fine-tuning", "Evaluation"],
  },
];
