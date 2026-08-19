import { getAllWriting } from "@/lib/writing";

const siteUrl = "https://aryangolbaghi.com";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export const dynamic = "force-static";

export function GET() {
  const posts = getAllWriting();
  const lastBuildDate = posts[0]
    ? new Date(`${posts[0].date}T00:00:00.000Z`).toUTCString()
    : new Date().toUTCString();

  const items = posts
    .map(
      (post) => `
      <item>
        <title>${escapeXml(post.title)}</title>
        <link>${siteUrl}/writing/${post.slug}</link>
        <guid isPermaLink="true">${siteUrl}/writing/${post.slug}</guid>
        <pubDate>${new Date(`${post.date}T00:00:00.000Z`).toUTCString()}</pubDate>
        <description>${escapeXml(post.description)}</description>
        ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("\n        ")}
      </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Aryan Golbaghi — Writing</title>
    <link>${siteUrl}/writing</link>
    <description>Technical writing on software engineering, AI systems, machine learning research, and evaluation.</description>
    <language>en-gb</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
