import type { MetadataRoute } from "next";
import { getAllWriting } from "@/lib/writing";

const baseUrl = "https://aryangolbaghi.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/writing",
    "/work",
    "/research",
    "/research/beyond-auc",
    "/research/speech-emotion-recognition",
    "/research/dpo-mini",
    "/about",
  ].map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(
        ["", "/research", "/research/beyond-auc"].includes(path)
          ? "2026-10-27T00:00:00.000Z"
          : path === "/research/dpo-mini"
            ? "2026-10-16T00:00:00.000Z"
            : "2026-08-22T00:00:00.000Z",
      ),
      changeFrequency:
        path.startsWith("/research/")
          ? ("yearly" as const)
          : path === ""
            ? ("monthly" as const)
            : ("weekly" as const),
      priority:
        path === ""
          ? 1
          : path.startsWith("/research/")
            ? 0.85
            : 0.8,
    }));

  const articles = getAllWriting().map((post) => ({
    url: `${baseUrl}/writing/${post.slug}`,
    lastModified: new Date(`${post.date}T00:00:00.000Z`),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...pages, ...articles];
}
