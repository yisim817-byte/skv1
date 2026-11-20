// SKV1120 K1-R: site-data의 title·description·PAGE_LASTMOD로 public/rss.xml을 만든다.
// 빌드 명령은 바꾸지 않는다. 생성 결과는 커밋한다.
// 사용: node scripts/gen-rss.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = fs.readFileSync(path.join(root, "src/lib/site-data.ts"), "utf8");

function stringLiteral(name) {
  const re = new RegExp(`export const ${name} =\\s*"([^"]*)"`);
  const m = src.match(re);
  if (!m) throw new Error(`missing ${name}`);
  return m[1];
}

function objectLiterals(name) {
  const i = src.indexOf(`export const ${name}`);
  if (i < 0) throw new Error(`missing ${name}`);
  const start = src.indexOf("{", i);
  let depth = 0;
  let end = start;
  for (let k = start; k < src.length; k++) {
    if (src[k] === "{") depth++;
    else if (src[k] === "}") {
      depth--;
      if (depth === 0) {
        end = k;
        break;
      }
    }
  }
  const body = src.slice(start + 1, end);
  const out = {};
  for (const m of body.matchAll(/"([^"]*)"\s*:\s*"([^"]*)"/g)) out[m[1]] = m[2];
  return out;
}

const SITE_TITLE = stringLiteral("SITE_TITLE");
const SITE_DESCRIPTION = stringLiteral("SITE_DESCRIPTION");
const PAGE_TITLES = objectLiterals("PAGE_TITLES");
const PAGE_DESCRIPTIONS = objectLiterals("PAGE_DESCRIPTIONS");
const PAGE_LASTMOD = objectLiterals("PAGE_LASTMOD");
const pageTitles = {};
for (const m of src.matchAll(/page\(\s*"([^"]+)"\s*,\s*"([^"]+)"/g)) pageTitles[m[1]] = m[2];

const ORDER = [
  "",
  "overview.html",
  "location.html",
  "office.html",
  "unit.html",
  "floor.html",
  "floorplan.html",
  "finance.html",
  "benefit.html",
  "amenities.html",
  "drive.html",
  "environment.html",
  "environment_02.html",
  "managesystey.html",
  "media.html",
  "place.html",
  "regional.html",
  "tv.html",
  "tv2.html",
];

function titleOf(slug) {
  if (!slug) return SITE_TITLE;
  return PAGE_TITLES[slug] ?? `청라 SK V1 ${pageTitles[slug]} | 청라 지식산업센터`;
}
function descOf(slug) {
  if (!slug) return SITE_DESCRIPTION;
  return PAGE_DESCRIPTIONS[slug];
}
function urlOf(slug) {
  return slug ? `https://www.skv1.site/pages/${slug}` : "https://www.skv1.site/";
}
function rfc822(ymd) {
  const [y, mo, d] = ymd.split("-").map(Number);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dow = new Date(Date.UTC(y, mo - 1, d)).getUTCDay();
  return `${days[dow]}, ${String(d).padStart(2, "0")} ${months[mo - 1]} ${y} 00:00:00 +0900`;
}
function esc(s) {
  return s
    .replace(/&/g, "&" + "amp;")
    .replace(/</g, "&" + "lt;")
    .replace(/>/g, "&" + "gt;");
}

const items = ORDER.map((slug) => {
  const title = titleOf(slug);
  const description = descOf(slug);
  const lastmod = PAGE_LASTMOD[slug];
  if (!title || !description || !lastmod) throw new Error(`incomplete ${slug || "/"}`);
  const link = urlOf(slug);
  return { title, description, link, lastmod };
});
if (items.length !== 19) throw new Error(`item count ${items.length}`);
const newest = items.map((i) => i.lastmod).sort().at(-1);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${esc(SITE_TITLE)}</title>
<link>https://www.skv1.site/</link>
<atom:link href="https://www.skv1.site/rss.xml" rel="self" type="application/rss+xml"/>
<description>${esc(SITE_DESCRIPTION)}</description>
<language>ko</language>
<lastBuildDate>${rfc822(newest)}</lastBuildDate>
${items
  .map(
    (i) =>
      `<item><title>${esc(i.title)}</title><link>${i.link}</link><guid isPermaLink="true">${i.link}</guid><description>${esc(i.description)}</description><pubDate>${rfc822(i.lastmod)}</pubDate></item>`,
  )
  .join("\n")}
</channel>
</rss>
`;

const out = path.join(root, "public/rss.xml");
fs.writeFileSync(out, xml);
console.log(`rss.xml items=${items.length} lastBuildDate=${newest}`);
