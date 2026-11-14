import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/HomePage";
import { SITE_DESCRIPTION, pageJsonLd, pageOgMeta } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://www.skv1.site/" }],
    meta: [
      { property: "og:url", content: "https://www.skv1.site/" },
      // R114 D1: og·twitter description은 홈 meta description(SITE_DESCRIPTION)과 같은 문장.
      { property: "og:description", content: SITE_DESCRIPTION },
      { name: "twitter:description", content: SITE_DESCRIPTION },
      // R103 D19: 홈에 빠져 있던 og:site_name·og:locale (하위 페이지와 같은 값)
      { property: "og:site_name", content: "청라 SK V1" },
      { property: "og:locale", content: "ko_KR" },
      { name: "twitter:card", content: "summary_large_image" },
      ...pageOgMeta(""),
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(pageJsonLd("", "", SITE_DESCRIPTION)),
      },
    ],
  }),
  component: HomePage,
});
