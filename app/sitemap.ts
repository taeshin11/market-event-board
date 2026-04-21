import { MetadataRoute } from "next";

const BASE_URL = "https://market-event-board.vercel.app";
const LOCALES = ["en", "ko", "ja", "zh", "es", "fr", "de", "pt"];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/calendar",
    "/earnings",
    "/dividends",
    "/macro",
    "/ipos",
    "/about",
    "/how-to-use",
    "/privacy",
    "/terms",
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const route of routes) {
      const staticPages = ["/about", "/how-to-use", "/privacy", "/terms"];
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "daily" : staticPages.includes(route) ? "monthly" : "weekly",
        priority: route === "" ? 1.0 : staticPages.includes(route) ? 0.5 : 0.8,
      });
    }
  }

  return entries;
}
