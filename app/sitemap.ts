import type { MetadataRoute } from "next";
import { getAllWriting } from "@/lib/writing";

const baseUrl = "https://aryangolbaghi.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/writing", "/work", "/research", "/about"].map(
    (path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date("2026-08-19T00:00:00.000Z"),
      changeFrequency: path === "" ? ("monthly" as const) : ("weekly" as const),
      priority: path === "" ? 1 : 0.8,
    }),
  );

  const articles = getAllWriting().map((post) => ({
    url: `${baseUrl}/writing/${post.slug}`,
    lastModified: new Date(`${post.date}T00:00:00.000Z`),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...pages, ...articles];
}
