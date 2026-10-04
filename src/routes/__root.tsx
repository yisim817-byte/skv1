import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SITE_DESCRIPTION, SITE_JSON_LD } from "@/lib/site-data";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "naver-site-verification", content: "1cf19d6134c13c55a96fcf80255b72ba696f4b98" },
      { name: "msvalidate.01", content: "1CA8C4AC579A0BA4C40BC37CD046AC48" },
      { title: "청라 SK V1 | 청라국제도시 지식산업센터 안내" },
      {
        name: "description",
        content: SITE_DESCRIPTION,
      },
      { name: "theme-color", content: "#111111" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "alternate", type: "application/rss+xml", title: "청라 SK V1 RSS", href: "https://www.skv1.site/rss.xml" },
      { rel: "stylesheet", href: appCss },
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/gh/moonspam/NanumSquare@2.0/nanumsquare.css",
      },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(SITE_JSON_LD),
      },
    ],
  }),
  component: () => (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
