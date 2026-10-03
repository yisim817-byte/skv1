import { createFileRoute, notFound } from "@tanstack/react-router";
import { ContentPage } from "@/components/ContentPage";
import { PAGE_DESCRIPTIONS, SITE_DESCRIPTION, getPage, pageJsonLd } from "@/lib/site-data";

export const Route = createFileRoute("/pages/$")({
  beforeLoad: ({ params }) => {
    const page = getPage(params._splat ?? "");
    if (!page) throw notFound();
    return { page };
  },
  head: ({ params }) => {
    const page = getPage(params._splat ?? "");
    const title = page ? `청라 SK V1 ${page.title}` : "청라 SK V1";
    const slug = params._splat ?? "";
    const description = PAGE_DESCRIPTIONS[slug] ?? SITE_DESCRIPTION;
    const url = `https://www.skv1.site/pages/${slug}`;
    return {
      meta: [
        { title },
        {
          name: "description",
          content: description,
        },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "청라 SK V1" },
        { property: "og:locale", content: "ko_KR" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: page
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify(pageJsonLd(slug, page.title, description)),
            },
          ]
        : [],
    };
  },
  component: SubPage,
});

function SubPage() {
  const { _splat } = Route.useParams();
  return <ContentPage slug={_splat ?? ""} />;
}
