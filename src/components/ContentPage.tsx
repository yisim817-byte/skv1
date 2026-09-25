import { useMemo, useState } from "react";
import {
  FLOORS,
  KAKAO_MAP,
  NAVER_MAP,
  NEWS,
  UNITS,
  getPage,
  pageImage,
} from "@/lib/site-data";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

const PAGE_SIZE = 6;

export function ContentPage({ slug }: { slug: string }) {
  const page = getPage(slug);
  if (!page) return null;
  return (
    <div className="sub-page">
      <SiteHeader tone="sub" />
      <section className="sub-hero">
        <div className="sub-hero-bg" />
        <div className="sub-hero-inner">
          <p className="sub-en">{page.en}</p>
          <h2>{page.title}</h2>
        </div>
      </section>
      <div className="crumb-bar">
        <div className="crumb-inner">
          <a className="crumb-home" href="/">
            HOME
          </a>
          <span aria-hidden="true">›</span>
          {page.siblings.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={item.href.endsWith(page.slug) ? "is-current" : ""}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
      <main className="sub-main">
        <p className="sub-en-label">{page.en}</p>
        <h3 className="sub-ko">{page.title}</h3>
        {page.kind === "image" || page.kind === "location" ? (
          <Picture image={page.image} mobile={page.mobile} alt={page.title} />
        ) : null}
        {page.kind === "floor" ? <FloorBoard /> : null}
        {page.kind === "unit" ? <UnitBoard /> : null}
        {page.kind === "news" ? <NewsBoard /> : null}
        {page.kind === "tv" ? <PromoFilm /> : null}
        {page.kind === "youtube" ? <YoutubeFilm /> : null}
        {page.kind === "location" ? <MapButtons /> : null}
        {page.notes.length ? (
          <ul className="page-info">
            {page.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        ) : null}
      </main>
      <SiteFooter />
    </div>
  );
}

function Picture({ image, mobile, alt }: { image?: string; mobile?: string; alt: string }) {
  if (!image) return null;
  return (
    <picture className="content-picture">
      {mobile ? <source media="(max-width: 768px)" srcSet={pageImage(mobile)} /> : null}
      <img src={pageImage(image)} alt={alt} />
    </picture>
  );
}

function FloorBoard() {
  const [index, setIndex] = useState(2);
  const current = FLOORS[index] ?? FLOORS[0];
  return (
    <div>
      <div className="tab-row" role="tablist">
        {FLOORS.map(([label], i) => (
          <button
            key={label}
            type="button"
            role="tab"
            aria-selected={i === index}
            className={i === index ? "is-active" : ""}
            onClick={() => setIndex(i)}
          >
            {label}
          </button>
        ))}
      </div>
      <Picture image={current[1]} mobile={current[2]} alt={`${current[0]} 층별안내`} />
    </div>
  );
}

function UnitBoard() {
  const [index, setIndex] = useState(0);
  const current = UNITS[index] ?? UNITS[0];
  return (
    <div>
      <div className="tab-row" role="tablist">
        {UNITS.map(([label], i) => (
          <button
            key={label}
            type="button"
            role="tab"
            aria-selected={i === index}
            className={i === index ? "is-active" : ""}
            onClick={() => setIndex(i)}
          >
            {label}
          </button>
        ))}
      </div>
      <Picture image={current[1]} mobile={current[2]} alt={current[0]} />
    </div>
  );
}

function NewsBoard() {
  const [page, setPage] = useState(0);
  const pages = Math.ceil(NEWS.length / PAGE_SIZE);
  const slice = useMemo(
    () => NEWS.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE),
    [page],
  );
  return (
    <div className="news">
      <ul>
        {slice.map((item) => (
          <li key={item.href + item.date}>
            <a href={item.href} target="_blank" rel="noreferrer">
              <p className="press">{item.press}</p>
              <h4>{item.title}</h4>
              <p className="info">{item.info}</p>
              <p className="date">{item.date}</p>
            </a>
          </li>
        ))}
      </ul>
      <nav className="pager" aria-label="언론보도 페이지">
        {Array.from({ length: pages }, (_, i) => (
          <button
            key={i}
            type="button"
            className={i === page ? "is-active" : ""}
            onClick={() => setPage(i)}
          >
            {i + 1}
          </button>
        ))}
      </nav>
    </div>
  );
}

function PromoFilm() {
  return (
    <video
      className="film"
      controls
      playsInline
      poster="/skv1/assets/images/sub/media_thum.jpg"
      preload="metadata"
    >
      <source src="/media/promo.mp4" type="video/mp4" />
    </video>
  );
}

function YoutubeFilm() {
  return (
    <div className="youtube">
      <iframe
        src="https://www.youtube.com/embed/u57cesicD1o"
        title="청라 SK V1 유튜브영상"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

function MapButtons() {
  return (
    <div className="map-links sub-maps">
      <a className="naver" href={NAVER_MAP} target="_blank" rel="noreferrer">
        <img src="/skv1/assets/images/main/naver.png" alt="네이버 지도" />
        <img className="hover" src="/skv1/assets/images/main/naver-hover.png" alt="" />
      </a>
      <a className="kakao" href={KAKAO_MAP} target="_blank" rel="noreferrer">
        <img src="/skv1/assets/images/main/kakao.png" alt="카카오맵" />
      </a>
    </div>
  );
}
