import news from "./news.json";

export const SITE_PHONE = "1833-3872";
export const SITE_PHONE_TEL = "18333872";
export const SITE_NAME = "청라 SK V1";
export const SITE_ORIGIN = "https://www.skv1.site";

export const NAVER_MAP = "https://naver.me/xE62XSik";
export const KAKAO_MAP = "https://kko.kakao.com/mp9eCjxBEh";
export const TERMS_URL =
  "https://www.skview.co.kr:442/html/etc/?dp1=use_agreement&dp2=use_agreement";
export const PRIVACY_URL =
  "https://www.skview.co.kr:442/html/etc/?dp1=privacy&dp2=privacy";

const img = (file: string) => `/skv1/assets/images/${file}`;

export type NavChild = { label: string; href: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const NAV: NavItem[] = [
  {
    label: "사업개요",
    href: "/pages/overview.html",
    children: [{ label: "사업개요", href: "/pages/overview.html" }],
  },
  {
    label: "입지환경",
    href: "/pages/environment.html",
    children: [
      { label: "입지환경", href: "/pages/environment.html" },
      { label: "개발계획", href: "/pages/environment_02.html" },
      { label: "광역 위치도", href: "/pages/regional.html" },
    ],
  },
  {
    label: "특화설계",
    href: "/pages/drive.html",
    children: [
      { label: "제조물류 특화", href: "/pages/drive.html" },
      { label: "오피스업무 특화", href: "/pages/office.html" },
      { label: "시스템 특화", href: "/pages/managesystey.html" },
      { label: "부대시설 특화", href: "/pages/amenities.html" },
    ],
  },
  {
    label: "상품안내",
    href: "/pages/place.html",
    children: [
      { label: "배치도", href: "/pages/place.html" },
      { label: "횡단면도", href: "/pages/floorplan.html" },
      { label: "층별안내", href: "/pages/floor.html" },
      { label: "라이브오피스", href: "/pages/unit.html" },
    ],
  },
  {
    label: "혜택안내",
    href: "/pages/finance.html",
    children: [
      { label: "금융&세제 혜택", href: "/pages/finance.html" },
      { label: "이전 혜택", href: "/pages/benefit.html" },
    ],
  },
  {
    label: "홍보센터",
    href: "/pages/media.html",
    children: [
      { label: "언론보도", href: "/pages/media.html" },
      { label: "홍보영상", href: "/pages/tv.html" },
      { label: "유튜브영상", href: "/pages/tv2.html" },
    ],
  },
  { label: "오시는길", href: "/pages/location.html" },
];

export type PageKind = "image" | "floor" | "unit" | "news" | "tv" | "youtube" | "location";

export type PageDef = {
  slug: string;
  title: string;
  en: string;
  kind: PageKind;
  image?: string;
  mobile?: string;
  notes: string[];
  siblings: NavChild[];
};

const sib = (href: string) => {
  for (const item of NAV) {
    const kids = item.children ?? [];
    if (item.href === href || kids.some((c) => c.href === href)) {
      return kids.length ? kids : [{ label: item.label, href: item.href }];
    }
  }
  return [];
};

function page(
  slug: string,
  title: string,
  en: string,
  kind: PageKind,
  notes: string[],
  image?: string,
  mobile?: string,
): PageDef {
  const href = `/pages/${slug}`;
  return { slug, title, en, kind, notes, image, mobile, siblings: sib(href) };
}

const photoNote = "상기 사진은 2025년 6월 중 현장을 촬영한 실제컷입니다.";
const cgNote = "상기 CG는 소비자의 이해를 돕기 위해 제작된 것으로 실제와 다를 수 있습니다.";

export const PAGES: PageDef[] = [
  page("overview.html", "사업개요", "OVERVIEW", "image", [], "sub/overview.jpg", "m/assets/images/sub/m_overview.jpg"),
  page(
    "environment.html",
    "입지환경",
    "ENVIRONMENT",
    "image",
    [
      "본 홈페이지에 사용된 CG, 이미지 및 영상은 소비자의 이해를 돕기 위해 제작된 것으로 실제와 차이가 있을 수 있습니다.",
      "상기 지역도는 소비자의 이해를 돕기 위해 네이버 지도를 참고하여 제작한 것으로 실제와 차이가 있을 수 있습니다.",
      "상기 제3연륙교 관련 내용은 [인천경제자유구역 보도자료(24.2.13), 조선일보 보도자료(24.11.22)]를 참고한 것으로 당사와는 무관하며, 문구 중 사업주체의 고의가 아닌 착오, 누락 또는 오류로 인해 일부 표기가 잘못될 수 있으므로, 혼동을 야기하는 경우 사업주체에 대한 질의를 통해 정확한 내용을 확인하시기 바랍니다.",
      "7호선 연장(예정·개통 시기 미정) 관련 내용은 [인천경제자유구역 보도자료(22.03.22)]를 참고한 것이며, 개통 시기는 미정이고 역명은 향후 변경이 있을 수 있습니다.",
      "청라의료복합타운 관련 내용은 [서울아산병원 보도자료(21.10.15)]를 참고한 것입니다.",
      "청라 시티타워 관련 내용은 [인천경제자유구역 보도자료(20.06.12)], 로봇랜드 관련 내용은 [인천경제자유구역 보도자료(21.06.09)]를 참고한 것이며 개발사업과 관련된 사항은 지자체 및 개발주체, 관계기관의 사정에 따라 변경 또는 취소될 수 있으며, 당사와는 무관합니다.",
      "스타필드 청라(예정), 서울아산청라병원(예정)은 네이버지도 정보 기준으로 오픈 시기는 변경될 수 있으며 당사와는 무관합니다.",
    ],
    "sub/environment.jpg",
    "m/assets/images/sub/m_environment.jpg",
  ),
  page(
    "environment_02.html",
    "개발계획",
    "DEVELOPMENT",
    "image",
    [
      "본 홈페이지에 사용된 CG, 이미지 및 영상은 소비자의 이해를 돕기 위해 제작된 것으로 실제와 차이가 있을 수 있습니다.",
      "7호선 연장(예정·개통 시기 미정) 관련 내용은 [인천경제자유구역 보도자료(22.03.22)]를 참고한 것이며, 개통 시기는 미정이고 역명은 향후 변경이 있을 수 있습니다.",
      "7호선 종착역인 석남역까지 네이버 최소 시간 측정 기준이며, 석남역에서 개통 예정(개통 시기 미정)인 커넬웨이역까지 3개 구간의 소요시간은 네이버 기준 소요 시간을 임의로 더한 것으로 실제 운영 시간과 다를 수 있습니다.",
      "상기 개발사업과 관련된 사항은 지자체 및 개발주체, 관계기관의 사정에 따라 변경 또는 취소될 수 있으며, 당사와는 무관합니다.",
    ],
    "sub/environment_02.jpg",
  ),
  page(
    "regional.html",
    "광역 위치도",
    "REGIONAL",
    "image",
    [
      "상기 CG는 소비자의 이해를 돕기 위해 제작된 것으로 실제와 다를 수 있습니다.",
      "상기 CG는 소비자의 이해를 돕기 위해 제작된 것으로 실제 크기 및 거리 등과 차이가 있습니다.",
    ],
    "sub/regional.jpg",
    "m/assets/images/sub/m_regional.jpg",
  ),
  page("drive.html", "제조물류 특화", "DRIVE-IN", "image", [cgNote, photoNote], "sub/drive.jpg"),
  page("office.html", "오피스업무 특화", "OFFICE", "image", [cgNote, photoNote], "sub/office.jpg"),
  page("managesystey.html", "시스템 특화", "SYSTEM", "image", [cgNote, photoNote], "sub/managesystey.jpg"),
  page("amenities.html", "부대시설 특화", "AMENITIES", "image", [cgNote, photoNote], "sub/amenities.jpg", "m/assets/images/sub/m_amenities.jpg"),
  page("place.html", "배치도", "SITE PLAN", "image", [], "sub/place.jpg", "m/assets/images/sub/m_place.jpg"),
  page(
    "floorplan.html",
    "횡단면도",
    "SECTION",
    "image",
    ["상기 CG(일러스트)는 소비자의 이해를 돕기 위해 제작된 것으로 실제와 다를 수 있습니다."],
    "sub/floorplan.jpg",
    "m/assets/images/sub/m_floorplan.jpg",
  ),
  page(
    "floor.html",
    "층별안내",
    "FLOOR",
    "floor",
    [
      "상기 CG는 소비자의 이해를 돕기 위한 것으로 사업과정 및 실제 시공에 따라 변경될 수 있습니다.",
      "상기에 표기된 면적, 호실 등은 오류가 있을 수 있으니 자세한 내용은 반드시 홍보관에서 확인하시기 바랍니다.",
      "호실별 평면은 분할 등으로 실제와 차이가 있을수 있으니 반드시 현장 확인이 필요합니다.",
    ],
  ),
  page(
    "unit.html",
    "라이브오피스",
    "LIVE OFFICE",
    "unit",
    ["상기 CG 및 이미지는 입주자의 이해를 돕기 위한 것으로 실제와 차이가 있을 수 있으니 반드시 현장에서 확인하시기 바랍니다."],
  ),
  page(
    "finance.html",
    "금융&세제 혜택",
    "FINANCE",
    "image",
    ["적용대상 및 추징사항 등 세부조건은 관계법령 및 관할 지자체에 확인 바랍니다."],
    "sub/finance.jpg",
    "m/assets/images/sub/m_finance.jpg",
  ),
  page(
    "benefit.html",
    "이전 혜택",
    "BENEFIT",
    "image",
    ["적용대상 및 추징사항 등 세부조건은 관계법령 및 관할 지자체에 확인 바랍니다."],
    "sub/benefit.jpg",
    "m/assets/images/sub/m_benefit.jpg",
  ),
  page("media.html", "언론보도", "MEDIA", "news", []),
  page("tv.html", "홍보영상", "FILM", "tv", []),
  page("tv2.html", "유튜브영상", "YOUTUBE", "youtube", []),
  page(
    "location.html",
    "오시는길",
    "CONTACT",
    "location",
    ["셔틀버스의 운영 주체는 인천 서해구청으로 당사와는 무관합니다."],
    "sub/location.jpg",
    "m/assets/images/sub/m_location.jpg",
  ),
];

export const SITE_DESCRIPTION =
  "청라 SK V1 홈페이지 — 청라국제도시 지식산업센터 청라 SK V1의 입지환경, 직선형 드라이브인 시스템 등 특화설계, 상품안내, 홍보자료와 오시는길을 안내합니다.";

export const PAGE_DESCRIPTIONS: Record<string, string> = {
  "overview.html": "청라 SK V1 사업개요 — 지식산업센터·분양창고·근린생활시설로 구성된 청라 SK V1의 사업 개요를 이미지로 안내합니다.",
  "environment.html": "청라 SK V1 입지환경 — 제3연륙교, 7호선 연장(예정·개통 시기 미정), 청라의료복합타운, 청라 시티타워, 로봇랜드 등 주변 교통·개발 여건을 참고 보도자료와 함께 안내합니다.",
  "environment_02.html": "청라 SK V1 개발계획 — 7호선 연장(예정·개통 시기 미정) 등 청라 주변 개발계획을 안내합니다. 개발사업은 관계기관 사정에 따라 변경 또는 취소될 수 있습니다.",
  "regional.html": "청라 SK V1 광역 위치도 — 광역 교통망 속 청라 SK V1의 위치를 CG로 안내합니다. 실제 크기 및 거리와 차이가 있습니다.",
  "drive.html": "청라 SK V1 제조물류 특화 — 직선형 드라이브인 시스템과 도어투도어 시스템 등 제조·물류 특화설계를 CG와 현장 실사 사진으로 안내합니다.",
  "office.html": "청라 SK V1 오피스업무 특화 — 발코니 특화 등 오피스 업무공간 특화설계를 CG와 현장 실사 사진으로 안내합니다.",
  "managesystey.html": "청라 SK V1 시스템 특화 — 청라 SK V1의 시스템 특화설계를 CG와 현장 실사 사진으로 안내합니다.",
  "amenities.html": "청라 SK V1 부대시설 특화 — 테라스, 옥상정원 등 부대시설 특화설계를 CG와 현장 실사 사진으로 안내합니다.",
  "place.html": "청라 SK V1 배치도 — 청라 SK V1의 건물 배치를 이미지로 안내합니다.",
  "floorplan.html": "청라 SK V1 횡단면도 — 층별 구성을 보여주는 횡단면 일러스트(CG)를 안내합니다. 실제와 다를 수 있습니다.",
  "floor.html": "청라 SK V1 층별안내 — 지하 2층부터 지상 10층까지 층별 평면을 안내합니다. 면적·호실은 홍보관에서 확인하시기 바랍니다.",
  "unit.html": "청라 SK V1 라이브오피스 — A·B·C·D 타입별 라이브오피스 평면 이미지를 안내합니다. 실제와 차이가 있을 수 있으니 현장에서 확인하시기 바랍니다.",
  "finance.html": "청라 SK V1 금융&세제 혜택 — 금융·세제 관련 안내입니다. 적용대상 및 추징사항 등 세부조건은 관계법령 및 관할 지자체에 확인하시기 바랍니다.",
  "benefit.html": "청라 SK V1 이전 혜택 — 기업 이전 관련 혜택 안내입니다. 적용대상 및 추징사항 등 세부조건은 관계법령 및 관할 지자체에 확인하시기 바랍니다.",
  "media.html": "청라 SK V1 언론보도 — 청라 SK V1 관련 언론 기사 목록과 원문 링크를 모았습니다.",
  "tv.html": "청라 SK V1 홍보영상 — 청라 SK V1 홍보영상을 시청할 수 있습니다.",
  "tv2.html": "청라 SK V1 유튜브영상 — 유튜브에 게시된 청라 SK V1 영상을 안내합니다.",
  "location.html": "청라 SK V1 오시는길 — 현장·홍보관 위치와 네이버 지도·카카오맵 길찾기, 셔틀버스 운행을 안내합니다. 문의 1833-3872.",
};

export const SITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: `${SITE_ORIGIN}/`,
  inLanguage: "ko-KR",
  publisher: {
    "@type": "Organization",
    "@id": "https://www.humanekorea.co.kr/#org",
    name: "휴메인코리아",
    telephone: SITE_PHONE,
  },
};

export function getPage(slug: string) {
  return PAGES.find((p) => p.slug === slug);
}

export function pageImage(file?: string) {
  if (!file) return "";
  if (file.startsWith("m/")) return `/skv1/${file}`;
  return img(file);
}

export const FLOORS = [
  ["B2F", "sub/floor_b2f.jpg", "m/assets/images/sub/m_floor_b2f.jpg"],
  ["B1F", "sub/floor_b1f.jpg", "m/assets/images/sub/m_floor_b1f.jpg"],
  ["1F", "sub/floor_1f.jpg", "m/assets/images/sub/m_floor_1f.jpg"],
  ["2F", "sub/floor_2f.jpg", "m/assets/images/sub/m_floor_2f.jpg"],
  ["3F", "sub/floor_3f.jpg", "m/assets/images/sub/m_floor_3f.jpg"],
  ["4F", "sub/floor_4f.jpg", "m/assets/images/sub/m_floor_4f.jpg"],
  ["5F", "sub/floor_5f.jpg", "m/assets/images/sub/m_floor_5f.jpg"],
  ["6F", "sub/floor_6f.jpg", "m/assets/images/sub/m_floor_6f.jpg"],
  ["7F", "sub/floor_7f.jpg", "m/assets/images/sub/m_floor_7f.jpg"],
  ["8F", "sub/floor_8f.jpg", "m/assets/images/sub/m_floor_8f.jpg"],
  ["9F", "sub/floor_9f.jpg", "m/assets/images/sub/m_floor_9f.jpg"],
  ["10F", "sub/floor_10f.jpg", "m/assets/images/sub/m_floor_10f.jpg"],
] as const;

export const UNITS = [
  ["A TYPE", "sub/unit_a.jpg", "m/assets/images/sub/m_unit_a.jpg"],
  ["B TYPE", "sub/unit_b.jpg", "m/assets/images/sub/m_unit_b.jpg"],
  ["C TYPE", "sub/unit_c.jpg", "m/assets/images/sub/m_unit_c.jpg"],
  ["D TYPE", "sub/unit_d.jpg", "m/assets/images/sub/m_unit_d.jpg"],
] as const;

export type NewsItem = {
  press: string;
  title: string;
  info: string;
  date: string;
  href: string;
};

export const NEWS = news as NewsItem[];

export const MAP_TABS = [
  { id: "00", label: "전체 보기", image: img("main/envi6-map.jpg") },
  { id: "01", label: "제3연륙교 (예정)", image: img("main/envi6-map-01.jpg") },
  { id: "02", label: "인천지하철2호선", image: img("main/envi6-map-02.jpg") },
  { id: "03", label: "7호선연장 (예정·개통 시기 미정)", image: img("main/envi6-map-03.jpg") },
  { id: "04", label: "청라국제도시", image: img("main/envi6-map-04.jpg") },
  { id: "05", label: "GRT노선 (702번)", image: img("main/envi6-map-05.jpg") },
  { id: "06", label: "GRT노선 (701번)", image: img("main/envi6-map-06.jpg") },
];

export const PILLARS = [
  {
    key: "Traffic",
    sign: img("main/envi2-sign.png"),
    bg: img("main/envi2-bg.jpg"),
    title: "제3연륙교 개통으로\n쾌속교통",
    points: [
      "제3연륙교 개통으로, 여의도~인천공항 이동 시간 단축",
      "지하철 7호선 연장(예정·개통 시기 미정)으로 서울 수도권을 더 가깝게",
    ],
  },
  {
    key: "Business",
    sign: img("main/envi5-sign.png"),
    bg: img("main/business-bg.jpg"),
    title: "4차 산업 연계\n비즈니스 거점",
    points: [
      "현대 무벡스 R&D센터, 지엠테크니컬센터",
      "로봇산업 특화도시(로봇랜드 테마파크 예정)",
    ],
  },
  {
    key: "Vision",
    sign: img("main/envi4-sign.png"),
    bg: img("main/envi4-bg.jpg"),
    title: "빛나는 청라의\n미래비전",
    points: ["청라 하나드림타운 헤드쿼터(HQ) 조성 중", "청라 호수공원에 조성되는 시티타워 예정"],
  },
  {
    key: "Infra",
    sign: img("main/envi3-sign.png"),
    bg: img("main/infra-bg.jpg"),
    mobile: "/skv1/m/assets/images/main/m_infra-bg.png",
    title: "더 가깝게 누리는\n생활인프라",
    points: [
      "코스트코 청라점, 스타필드 청라(예정)",
      "의료복합타운 내 서울아산청라병원(예정)",
    ],
  },
];

export const SPECIALS = [
  {
    no: "01",
    thumb: img("main/special-img-02-new-01.jpg"),
    image: img("main/special-img-01-new.jpg"),
    lines: ["3번 회전만으로", "7층까지 도달하여 동선이 편리한"],
    title: ["직선형", "드라이브인 시스템"],
  },
  {
    no: "02",
    thumb: img("main/special-img-02-new-02.jpg"),
    image: img("main/special-img-02-new.jpg"),
    lines: ["차량이 각 사업장 안으로 진입하여 운반,", "물류 작업에 유리한"],
    title: ["도어투도어", "시스템 적용"],
  },
  {
    no: "03",
    thumb: img("main/special-img-02-new-03.jpg"),
    image: img("main/special-img-03-new.jpg"),
    lines: ["오피스 전호실 발코니 특화,", "라이브오피스 테라스설계, 옥상정원 등"],
    title: ["쾌적하고", "개방감·채광을 고려한 설계"],
  },
];
