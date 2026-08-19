import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatArticleDate,
  getAllWriting,
  getWritingBySlug,
} from "@/lib/writing";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllWriting({ includeDrafts: process.env.NODE_ENV !== "production" }).map(
    (post) => ({ slug: post.slug }),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/writing/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getWritingBySlug(slug);

  if (!post || (!post.published && process.env.NODE_ENV === "production")) {
    notFound();
  }

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/writing/${post.slug}` },
    openGraph: {
      type: "article",
      url: `/writing/${post.slug}`,
      title: post.title,
      description: post.description,
      publishedTime: `${post.date}T00:00:00.000Z`,
      tags: post.tags,
      images: [],
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.description,
      images: [],
    },
  };
}

export default async function ArticlePage({ params }: PageProps<"/writing/[slug]">) {
  const { slug } = await params;
  const post = getWritingBySlug(slug);

  if (!post || (!post.published && process.env.NODE_ENV === "production")) {
    notFound();
  }

  const { default: Article } = await import(
    `@/content/writing/${post.sourceSlug}.mdx`
  );

  return (
    <article className="article-shell">
      <Link className="back-link" href="/writing">
        <span aria-hidden="true">←</span> Writing
      </Link>
      <header className="article-header">
        {!post.published && <p className="draft-banner">Example draft · not published</p>}
        <h1>{post.title}</h1>
        <p className="article-description">{post.description}</p>
        <div className="article-meta">
          <time dateTime={post.date}>{formatArticleDate(post.date)}</time>
          {post.tags.length > 0 && (
            <ul className="tag-list" aria-label="Topics">
              {post.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}
        </div>
      </header>
      <div className="article-body">
        <Article />
      </div>
      <footer className="article-footer">
        <Link className="text-link" href="/writing">
          <span aria-hidden="true">←</span> Back to Writing
        </Link>
      </footer>
    </article>
  );
}
