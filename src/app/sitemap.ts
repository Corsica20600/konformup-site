import type { MetadataRoute } from "next";

import { trainings, site } from "@/lib/site-config";

const pages = [
  { path: "", priority: 1 },
  { path: "/formations", priority: 0.9 },
  { path: "/methode-pedagogique", priority: 0.7 },
  { path: "/a-propos", priority: 0.6 },
  { path: "/faq", priority: 0.6 },
  { path: "/avis", priority: 0.5 },
  { path: "/demande-devis", priority: 0.5 },
  { path: "/contact", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map(({ path, priority }) => ({
      url: `${site.url}${path}`,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...trainings.map((training) => ({
      url: `${site.url}/formations/${training.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
