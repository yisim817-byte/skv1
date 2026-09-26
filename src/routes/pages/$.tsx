import { createFileRoute, notFound } from "@tanstack/react-router";
import { ContentPage } from "@/components/ContentPage";
import { PAGE_DESCRIPTIONS, SITE_DESCRIPTION, getPage } from "@/lib/site-data";

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
    return {
      meta: [
        { title },
        {
          name: "description",
          content: PAGE_DESCRIPTIONS[slug] ?? SITE_DESCRIPTION,
        },
      ],
      links: [{ rel: "canonical", href: `https://www.skv1.site/pages/${slug}` }],
    };
  },
  component: SubPage,
});

function SubPage() {
  const { _splat } = Route.useParams();
  return <ContentPage slug={_splat ?? ""} />;
}
