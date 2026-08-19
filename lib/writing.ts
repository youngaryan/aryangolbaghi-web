import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const writingDirectory = path.join(process.cwd(), "content", "writing");

export type WritingPost = {
  slug: string;
  sourceSlug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  published: boolean;
};

function parseWritingFile(filename: string): WritingPost {
  const slug = filename.replace(/\.mdx?$/, "");
  const source = fs.readFileSync(path.join(writingDirectory, filename), "utf8");
  const { data } = matter(source);

  if (
    typeof data.title !== "string" ||
    typeof data.description !== "string" ||
    typeof data.date !== "string" ||
    typeof data.published !== "boolean"
  ) {
    throw new Error(`Invalid frontmatter in content/writing/${filename}`);
  }

  return {
    slug: typeof data.slug === "string" ? data.slug : slug,
    sourceSlug: slug,
    title: data.title,
    description: data.description,
    date: data.date,
    tags: Array.isArray(data.tags)
      ? data.tags.filter((tag): tag is string => typeof tag === "string")
      : [],
    published: data.published,
  };
}

export function getAllWriting(options: { includeDrafts?: boolean } = {}) {
  if (!fs.existsSync(writingDirectory)) {
    return [];
  }

  return fs
    .readdirSync(writingDirectory)
    .filter((filename) => /\.mdx?$/.test(filename))
    .map(parseWritingFile)
    .filter((post) => options.includeDrafts || post.published)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getWritingBySlug(slug: string) {
  return getAllWriting({ includeDrafts: true }).find((post) => post.slug === slug);
}

export function formatArticleDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
