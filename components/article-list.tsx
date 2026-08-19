import Link from "next/link";
import { formatArticleDate, type WritingPost } from "@/lib/writing";

export function ArticleList({
  posts,
  compact = false,
}: {
  posts: WritingPost[];
  compact?: boolean;
}) {
  return (
    <div className="article-list">
      {posts.map((post) => (
        <article className="article-list-item" key={post.slug}>
          <div className="article-list-meta">
            <time dateTime={post.date}>{formatArticleDate(post.date)}</time>
            {!post.published && <span className="draft-label">Draft</span>}
          </div>
          <div>
            {compact ? (
              <h3>
                <Link href={`/writing/${post.slug}`}>{post.title}</Link>
              </h3>
            ) : (
              <h2>
                <Link href={`/writing/${post.slug}`}>{post.title}</Link>
              </h2>
            )}
            <p>{post.description}</p>
            {post.tags.length > 0 && (
              <ul className="tag-list" aria-label="Topics">
                {post.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
