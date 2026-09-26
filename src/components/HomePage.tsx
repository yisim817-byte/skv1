import { useState } from "react";
import {
  KAKAO_MAP,
  MAP_TABS,
  NAVER_MAP,
  PILLARS,
  SITE_PHONE,
  SITE_PHONE_TEL,
  SPECIALS,
} from "@/lib/site-data";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function HomePage() {
  const [map, setMap] = useState(0);
  const [special, setSpecial] = useState(0);
  const active = MAP_TABS[map] ?? MAP_TABS[0];
  const feature = SPECIALS[special] ?? SPECIALS[0];

  return (
    <div className="home">
      <SiteHeader tone="home" />
      <section className="hero">
        <video
          className="hero-still"
          autoPlay
          muted
          loop
          playsInline
          poster="/media/hero-poster.jpg"
        >
          <source src="/media/hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-copy">
          <p className="hero-kicker">
            다시 없을 <span className="c-sk">SK</span> <span className="c-v1">V1</span>
          </p>
          <p className="hero-line">성공의 기어를 올리다!</p>
          <p className="hero-logo">
            <span className="c-name">청라</span> <span className="c-sk">SK</span> <span className="c-v1">V1</span>
          </p>
          <p className="hero-sub">
            혁신적인 직선형 드라이브인을 갖춘
            <br />
            청라에서 다시 없을 비즈니스 캠퍼스!
          </p>
        </div>
      </section>

      {PILLARS.map((pillar) => (
        <section className="pillar" key={pillar.key}>
          <img className="pillar-bg pc-only" src={pillar.bg} alt="" />
          <img className="pillar-bg mo-only" src={pillar.mobile ?? pillar.bg} alt="" />
          <div className="pillar-copy">
            <img className="pillar-sign" src={pillar.sign} alt="" />
            <h2>
              {pillar.title.split("\n").map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </h2>
            <ul>
              {pillar.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <p className="fine">※ 상기 이미지는 이해를 돕기 위한 컷입니다.</p>
          </div>
        </section>
      ))}

      <p className="more-wrap">
        <a className="more" href="/pages/environment.html">
          View More +
        </a>
      </p>

      <section className="map-sec">
        <div className="map-head">
          <p>CHEONGNA SK V1</p>
          <h2>광역에서 생활권까지</h2>
        </div>
        <div className="map-layout">
          <ul className="map-tabs">
            {MAP_TABS.map((tab, index) => (
              <li key={tab.id}>
                <button
                  type="button"
                  className={index === map ? "is-active" : ""}
                  onClick={() => setMap(index)}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="map-stage">
            <img src={active.image} alt={active.label} />
            <img className="map-logo" src="/skv1/assets/images/main/envi6-logo.png" alt="" />
          </div>
        </div>
        <p className="fine center">※ 클릭하시면 해당 영역을 확인하실 수 있습니다.</p>
      </section>

      <section className="specials">
        <div className="special-stage">
          <div className="special-visual">
            <img src={feature.image} alt="" />
            <a className="special-more" href="/pages/drive.html">
              <span>View</span>
              <span>More</span>
              <span>+</span>
            </a>
            <p className="special-info">
              CHEONGNA <span>SK V1</span>
            </p>
          </div>
          <div className="special-copy">
            <p className="special-lead">물류부터 첨단 제조 비즈니스를 위한</p>
            <h2>특화설계</h2>
            <img className="special-thumb" src={feature.thumb} alt="" />
            <p className="special-en">Special Design {feature.no}</p>
            <p className="special-sub">
              {feature.lines.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
            <h3>
              {feature.title.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </h3>
            <div className="special-nav">
              {SPECIALS.map((item, index) => (
                <button
                  key={item.no}
                  type="button"
                  className={index === special ? "is-active" : ""}
                  onClick={() => setSpecial(index)}
                >
                  {item.no}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="media-zone">
        <div className="section-intro light">
          <p>Media zone</p>
          <h2>
            SK V1
            <br />
            성공의 기어를 올리다
          </h2>
          <p className="lead">
            청라 SK V1 에서
            <br />
            비즈니스의 성공 가도에 오르십시오!
          </p>
        </div>
        <video
          controls
          playsInline
          poster="/skv1/assets/images/main/video-poster-new.png"
          preload="metadata"
        >
          <source src="/media/promo.mp4?v=20260907" type="video/mp4" />
        </video>
      </section>

      <section className="visit">
        <div className="visit-copy">
          <h2>오시는길</h2>
          <p className="fine">※ 셔틀버스의 운영 주체는 인천 서해구청으로 당사와는 무관합니다.</p>
          <ul className="visit-facts">
            <li>
              <strong>셔틀 버스</strong>
              <span>
                무료운영 중
                <br />
                (청라 SK V1 ~ 가정역)
              </span>
            </li>
            <li>
              <strong>분양 문의</strong>
              <a href={`tel:${SITE_PHONE_TEL}`}>{SITE_PHONE}</a>
            </li>
            <li>
              <strong>현장</strong>
              <span>인천광역시 서해구 파랑로 451</span>
            </li>
            <li>
              <strong>홍보관</strong>
              <span>인천광역시 서해구 파랑로 451 (청라 SK V1, 105호)</span>
            </li>
          </ul>
          <div className="map-links">
            <a className="naver" href={NAVER_MAP} target="_blank" rel="noreferrer">
              <img src="/skv1/assets/images/main/naver.png" alt="네이버 지도" />
              <img className="hover" src="/skv1/assets/images/main/naver-hover.png" alt="" />
            </a>
            <a className="kakao" href={KAKAO_MAP} target="_blank" rel="noreferrer">
              <img src="/skv1/assets/images/main/kakao.png" alt="카카오맵" />
            </a>
          </div>
          <a className="more" href="/pages/location.html">
            View More +
          </a>
        </div>
        <img
          className="visit-map"
          src="/skv1/assets/images/main/contact-map.jpg"
          alt="청라 SK V1 위치"
        />
      </section>
      <SiteFooter />
    </div>
  );
}
