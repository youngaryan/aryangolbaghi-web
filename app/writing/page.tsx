import type { Metadata } from "next";
import { ArticleList } from "@/components/article-list";
import { getAllWriting } from "@/lib/writing";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Technical writing by Aryan Golbaghi on software engineering, AI systems, machine learning research, and evaluation.",
  alternates: { canonical: "/writing" },
};

export default function WritingPage() {
  const posts = getAllWriting({ includeDrafts: process.env.NODE_ENV !== "production" });

  return (
    <div className="page-shell section-page">
      <header className="page-intro">
        <p className="eyebrow">Notes &amp; essays</p>
        <h1>Writing</h1>
        <p>
          Technical notes on software systems, machine learning, research, and
          the practical work of making AI systems more reliable.
        </p>
      </header>

      {posts.length > 0 ? (
        <ArticleList posts={posts} />
      ) : (
        <div className="empty-state">
          <p>No articles have been published yet.</p>
          <p>The first technical notes are in preparation.</p>
        </div>
      )}
    </div>
  );
}
