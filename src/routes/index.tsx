import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/HomePage";
import { SITE_DESCRIPTION, pageJsonLd } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://www.skv1.site/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(pageJsonLd("", "", SITE_DESCRIPTION)),
      },
    ],
  }),
  component: HomePage,
});
