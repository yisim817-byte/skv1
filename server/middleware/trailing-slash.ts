/**
 * R103 D2: 끝 슬래시 URL(예: /pages/overview.html/)을 슬래시 없는 주소로 영구(308) 이동한다.
 * TanStack Router의 기본 정규화 리디렉션은 307(임시)이라 검색엔진이 영구 이동으로 보지 않는다.
 * 쿼리 문자열은 그대로 붙인다. 루트(/)는 건드리지 않는다.
 * server/middleware/* 는 vite.config.ts의 nitro serverDir 설정으로 자동 등록된다.
 */
interface TrailingSlashEvent {
  url: URL;
  req: { method: string };
}

export default function trailingSlashMiddleware(
  event: TrailingSlashEvent,
  next: () => unknown | Promise<unknown>,
): unknown {
  const method = (event.req.method ?? "GET").toUpperCase();
  const path = event.url.pathname;
  if ((method === "GET" || method === "HEAD") && path.length > 1 && path.endsWith("/")) {
    const target = path.replace(/\/+$/, "") + event.url.search;
    return new Response(null, { status: 308, headers: { location: target } });
  }
  return next();
}
