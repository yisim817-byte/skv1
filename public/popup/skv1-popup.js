/*!
 * 청라 SK V1 분양조건 팝업 v1 (2026-10-07)
 * 3개 사이트 공용: 청라지식산업센터.store / 청라지식산업센터.site / skv1.site
 * 설정은 아래 CONFIG 한 곳에서만 수정한다.
 *  - 문구·수치를 바꾸면 CONFIG.version 도 바꾼다("오늘 하루 보지 않기" 기록 초기화).
 *  - CONFIG.expires = "YYYY-MM-DD" 이면 그날이 지나면 자동 비노출. 즉시 내리기: enabled = false.
 *  - 상담은 대표번호 전화만 사용한다.
 *  - 이 파일은 공개 파일이다. 공개 승인된 문구 외의 내부 조건·메모를 적지 않는다.
 */
(function () {
  "use strict";

  var CONFIG = {
    enabled: true,
    version: "2026-10-07-v1",
    expires: null, // 예: "2026-12-31"
    delayMs: 3000,
    phoneDisplay: "1833-3872",
    phoneTel: "18333872",
    eyebrow: "분양조건 안내",
    title: "청라 SK V1 지식산업센터",
    status: "현재 적용 중인 조건",
    items: [
      { label: "직접할인", value: "23%", size: "xl", note: "분양가 기준 · 전 호실 적용", noteShort: "분양가 기준 · 전 호실 적용" },
      { label: "계약자 페이백", value: "15%", size: "l", note: "할인된 분양가 기준 · 잔금 완납 후 시행사 지급 · 약정서 체결 조건", noteShort: "할인된 분양가 기준 · 잔금 완납 후 지급 · 약정 조건" },
      { label: "분양가 일부 대여", value: "운영 중", size: "s", note: "심사 및 담보 조건에 따라 적용 · 상세 조건은 상담 시 안내", noteShort: "심사·담보 조건에 따라 적용 · 상담 시 안내" }
    ],
    notice: "조건은 호실·계약 시점·심사 결과에 따라 달라질 수 있으며 사전 고지 없이 변경될 수 있습니다. 지식산업센터는 관계 법령에 따른 입주 업종·자격 요건이 있습니다.",
    desktopCaption: "상담은 대표번호 직접 전화로만 진행합니다",
    mobileCaption: "누르면 전화가 바로 연결됩니다",
    photo: "skv1-building.jpg", // 이 스크립트와 같은 폴더 기준
    photoAlt: "청라 SK V1 지식산업센터 건물 실사",
    reopenChip: true,
    reopenLabel: "분양조건 보기"
  };

  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (window.__skv1Popup) return;
  window.__skv1Popup = { version: CONFIG.version };

  var KEY_HIDE = "skv1popup:hideUntil:" + CONFIG.version;
  var KEY_CLOSED = "skv1popup:closed:" + CONFIG.version;

  var scriptEl = document.currentScript;
  var baseUrl = "";
  try {
    baseUrl = scriptEl && scriptEl.src ? scriptEl.src.replace(/[^\/]*(\?.*)?$/, "") : "";
  } catch (e) { baseUrl = ""; }

  function store(kind) {
    try { return kind === "local" ? window.localStorage : window.sessionStorage; } catch (e) { return null; }
  }
  function getItem(kind, key) { var s = store(kind); try { return s ? s.getItem(key) : null; } catch (e) { return null; } }
  function setItem(kind, key, val) { var s = store(kind); try { if (s) s.setItem(key, val); } catch (e) {} }

  function isExpired() {
    if (!CONFIG.expires) return false;
    var p = String(CONFIG.expires).split("-");
    if (p.length !== 3) return false;
    var end = new Date(+p[0], +p[1] - 1, +p[2], 23, 59, 59, 999);
    return Date.now() > end.getTime();
  }
  function hiddenToday() {
    var v = getItem("local", KEY_HIDE);
    return v ? Date.now() < +v : false;
  }
  function endOfToday() {
    var d = new Date();
    d.setHours(23, 59, 59, 999);
    return d.getTime();
  }
  function isMobile() {
    try { return window.matchMedia("(max-width: 767px)").matches; } catch (e) { return window.innerWidth < 768; }
  }
  function track(action) {
    try {
      if (typeof window.gtag === "function") {
        window.gtag("event", "skv1_popup", {
          popup_action: action,
          popup_version: CONFIG.version,
          popup_device: isMobile() ? "mobile" : "desktop"
        });
      }
    } catch (e) {}
  }

  if (!CONFIG.enabled || isExpired() || hiddenToday()) return;

  // ---------- DOM helpers ----------
  var SVG_NS = "http://www.w3.org/2000/svg";
  function h(tag, attrs, children) {
    var el = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      if (!Object.prototype.hasOwnProperty.call(attrs, k)) continue;
      if (k === "text") el.textContent = attrs[k];
      else if (k === "className") el.className = attrs[k];
      else el.setAttribute(k, attrs[k]);
    }
    if (children) for (var i = 0; i < children.length; i++) if (children[i]) el.appendChild(children[i]);
    return el;
  }
  function icon(paths, size, stroke) {
    var s = document.createElementNS(SVG_NS, "svg");
    s.setAttribute("width", size); s.setAttribute("height", size);
    s.setAttribute("viewBox", "0 0 24 24"); s.setAttribute("fill", "none");
    s.setAttribute("stroke", stroke); s.setAttribute("stroke-width", "2");
    s.setAttribute("stroke-linecap", "round"); s.setAttribute("stroke-linejoin", "round");
    s.setAttribute("aria-hidden", "true");
    for (var i = 0; i < paths.length; i++) {
      var p = document.createElementNS(SVG_NS, "path");
      p.setAttribute("d", paths[i]); s.appendChild(p);
    }
    return s;
  }
  var PHONE = ["M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"];
  var CLOSE = ["M6 6l12 12", "M18 6L6 18"];

  var CSS = [
    ":host{all:initial}",
    "*{box-sizing:border-box}",
    ".root{color:#122333;-webkit-font-smoothing:antialiased;line-height:1.4}",
    ".ov{position:fixed;inset:0;z-index:2147483000;background:rgba(10,18,28,.56);display:flex;align-items:center;justify-content:center;padding:16px;animation:fade .2s ease-out}",
    ".card{position:relative;width:460px;max-width:100%;max-height:calc(100vh - 32px);overflow:auto;background:#fff;border-radius:14px;box-shadow:0 24px 60px rgba(10,18,28,.35);animation:rise .22s ease-out}",
    ".card:focus{outline:none}",
    ".photo{display:block;width:100%;height:140px;object-fit:cover;object-position:50% 45%;background:#E6E9EC}",
    ".x{position:absolute;top:12px;right:12px;width:44px;height:44px;border:0;border-radius:22px;background:rgba(255,255,255,.92);display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0}",
    ".x:focus-visible,.btn:focus-visible,.foot button:focus-visible,.chip:focus-visible{outline:3px solid #9A724E;outline-offset:2px}",
    ".body{padding:24px 28px 20px;display:flex;flex-direction:column;gap:18px}",
    ".head{display:flex;flex-direction:column;gap:6px}",
    ".eb{font-size:13px;font-weight:600;letter-spacing:.04em;color:#7A5A3C}",
    ".tt{margin:0;font-size:24px;line-height:1.3;font-weight:700;color:#122333}",
    ".st{font-size:13px;color:#4A5560}",
    ".rows{display:flex;flex-direction:column;border-top:1px solid #E1E5E8}",
    ".row{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:14px 0;border-bottom:1px solid #E1E5E8}",
    ".lb{display:flex;flex-direction:column;gap:4px;min-width:0}",
    ".ln{font-size:15px;font-weight:700}",
    ".nt{font-size:12.5px;line-height:1.5;color:#4A5560}",
    ".v{font-weight:700;color:#122333;white-space:nowrap;line-height:1;letter-spacing:-.02em}",
    ".v.xl{font-size:40px}.v.l{font-size:26px}.v.s{font-size:17px;font-weight:600;letter-spacing:0}",
    ".ntc{margin:0;font-size:12px;line-height:1.6;color:#4A5560}",
    ".cta{display:flex;flex-direction:column;gap:8px}",
    ".btn{height:56px;border-radius:10px;background:#122333;color:#fff;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:10px;font-size:17px;font-weight:700;font-family:inherit}",
    ".btn:hover{background:#0B1724}",
    ".cap{text-align:center;font-size:13px;color:#4A5560}",
    ".foot{display:flex;justify-content:space-between;align-items:center;padding:0 16px;height:48px;background:#F6F4F1;border-top:1px solid #E8E4DE}",
    ".foot button{height:44px;padding:0 12px;border:0;background:transparent;font-size:13px;color:#4A5560;cursor:pointer;font-family:inherit}",
    ".foot .cl{font-weight:600;color:#122333}",
    /* mobile bottom sheet */
    ".ov.m{align-items:flex-end;padding:0}",
    ".m .card{width:100%;max-width:520px;max-height:min(520px,85vh);border-radius:18px 18px 0 0;animation:up .24s ease-out;padding-bottom:env(safe-area-inset-bottom)}",
    ".grab{display:flex;justify-content:center;padding-top:10px}.grab i{width:40px;height:4px;border-radius:2px;background:#C9CFD5}",
    ".m .x{top:8px;right:8px;background:transparent}",
    ".m .body{padding:10px 20px 8px;gap:12px}",
    ".m .eb{font-size:12px}.m .tt{font-size:20px}.m .st{font-size:12px}",
    ".m .row{padding:11px 0;gap:12px}.m .ln{font-size:14px}.m .nt{font-size:12px;line-height:1.45}",
    ".m .v.xl{font-size:32px}.m .v.l{font-size:22px}.m .v.s{font-size:15px}",
    ".m .btn{height:52px;font-size:16px}.m .cap{font-size:12px}",
    ".m .foot{background:#fff;border-top:0;padding:0 10px;height:44px}",
    ".chip{position:fixed;right:20px;bottom:calc(20px + env(safe-area-inset-bottom));z-index:2147482999;height:48px;padding:0 20px;border:0;border-radius:24px;background:#122333;color:#fff;font-size:14px;font-weight:700;font-family:inherit;box-shadow:0 10px 28px rgba(10,18,28,.3);cursor:pointer}",
    "@keyframes fade{from{opacity:0}to{opacity:1}}",
    "@keyframes rise{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}",
    "@keyframes up{from{transform:translateY(100%)}to{transform:none}}",
    "@media (prefers-reduced-motion:reduce){.ov,.card,.m .card{animation:none}}"
  ].join("\n");

  var host, shadow, overlay, chip, lastFocus, prevOverflow;

  function ensureHost() {
    if (host && document.body.contains(host)) return;
    host = document.createElement("div");
    host.id = "skv1-popup-host";
    host.setAttribute("data-version", CONFIG.version);
    document.body.appendChild(host);
    shadow = host.attachShadow ? host.attachShadow({ mode: "open" }) : host;
    var st = document.createElement("style");
    st.textContent = CSS;
    shadow.appendChild(st);
    var root = h("div", { className: "root" });
    // :host{all:initial} 이 글꼴까지 초기화하므로, 사이트 본문 글꼴을 그대로 이어받는다.
    var siteFont = "";
    try { siteFont = window.getComputedStyle(document.body).fontFamily || ""; } catch (e) {}
    root.style.fontFamily = (siteFont ? siteFont + ", " : "") + "'Pretendard', 'Apple SD Gothic Neo', 'Malgun Gothic', 'Noto Sans KR', system-ui, sans-serif";
    shadow.appendChild(root);
    host.__root = root;
  }

  function buildCard(mobile) {
    var title = h("h2", { className: "tt", id: "skv1-pp-title", text: CONFIG.title });
    var rows = h("div", { className: "rows" });
    for (var i = 0; i < CONFIG.items.length; i++) {
      var it = CONFIG.items[i];
      rows.appendChild(h("div", { className: "row" }, [
        h("div", { className: "lb" }, [
          h("span", { className: "ln", text: it.label }),
          h("span", { className: "nt", text: mobile ? (it.noteShort || it.note) : it.note })
        ]),
        h("span", { className: "v " + (it.size || "l"), text: it.value })
      ]));
    }
    var call = h("a", {
      className: "btn",
      href: "tel:" + CONFIG.phoneTel,
      "aria-label": (mobile ? "상담신청 전화 연결 " : "전화 상담 ") + CONFIG.phoneDisplay
    }, [icon(PHONE, mobile ? 18 : 20, "#FFFFFF"), h("span", { text: (mobile ? "상담신청 · " : "전화 상담 ") + CONFIG.phoneDisplay })]);
    call.addEventListener("click", function () { track("call"); });

    var xBtn = h("button", { className: "x", type: "button", "aria-label": "닫기" }, [icon(CLOSE, 18, "#122333")]);
    xBtn.addEventListener("click", function () { close("close"); });

    var today = h("button", { type: "button", text: "오늘 하루 보지 않기" });
    today.addEventListener("click", function () { setItem("local", KEY_HIDE, String(endOfToday())); close("hide_today"); });
    var cl = h("button", { type: "button", className: "cl", text: "닫기" });
    cl.addEventListener("click", function () { close("close"); });

    var photo = null;
    if (!mobile && CONFIG.photo && baseUrl) {
      photo = h("img", { className: "photo", src: baseUrl + CONFIG.photo, alt: CONFIG.photoAlt, width: "460", height: "140", decoding: "async" });
      photo.addEventListener("error", function () { if (photo.parentNode) photo.parentNode.removeChild(photo); });
    }

    var card = h("div", { className: "card", role: "dialog", "aria-modal": "true", "aria-labelledby": "skv1-pp-title", tabindex: "-1" }, [
      mobile ? h("div", { className: "grab" }, [h("i")]) : null,
      photo,
      xBtn,
      h("div", { className: "body" }, [
        h("div", { className: "head" }, [
          h("span", { className: "eb", text: CONFIG.eyebrow }),
          title,
          h("span", { className: "st", text: CONFIG.status })
        ]),
        rows,
        h("p", { className: "ntc", text: CONFIG.notice }),
        h("div", { className: "cta" }, [call, h("span", { className: "cap", text: mobile ? CONFIG.mobileCaption : CONFIG.desktopCaption })])
      ]),
      h("div", { className: "foot" }, [today, cl])
    ]);
    return card;
  }

  function focusables() {
    return overlay ? overlay.querySelectorAll("a[href],button") : [];
  }
  function onKey(e) {
    if (!overlay) return;
    if (e.key === "Escape") { e.preventDefault(); close("close"); return; }
    if (e.key === "Tab") {
      var f = focusables(); if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      var active = shadow.activeElement || document.activeElement;
      if (e.shiftKey && active === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
    }
  }

  function open(reason) {
    ensureHost();
    if (overlay) return;
    removeChip();
    var mobile = isMobile();
    overlay = h("div", { className: "ov" + (mobile ? " m" : "") }, [buildCard(mobile)]);
    overlay.addEventListener("click", function (e) { if (e.target === overlay) close("close"); });
    host.__root.appendChild(overlay);
    lastFocus = document.activeElement;
    prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.addEventListener("keydown", onKey, true);
    var cardEl = overlay.querySelector(".card");
    try { cardEl && cardEl.focus({ preventScroll: true }); } catch (e) { cardEl && cardEl.focus(); }
    track(reason === "reopen" ? "reopen" : "view");
  }

  function close(action) {
    if (!overlay) return;
    overlay.parentNode && overlay.parentNode.removeChild(overlay);
    overlay = null;
    document.documentElement.style.overflow = prevOverflow || "";
    document.removeEventListener("keydown", onKey, true);
    setItem("session", KEY_CLOSED, "1");
    track(action);
    if (action !== "hide_today") showChip();
    try { lastFocus && lastFocus.focus && lastFocus.focus({ preventScroll: true }); } catch (e) {}
  }

  function showChip() {
    if (!CONFIG.reopenChip || chip) return;
    ensureHost();
    chip = h("button", { className: "chip", type: "button", text: CONFIG.reopenLabel });
    chip.addEventListener("click", function () { open("reopen"); });
    host.__root.appendChild(chip);
  }
  function removeChip() {
    if (chip && chip.parentNode) chip.parentNode.removeChild(chip);
    chip = null;
  }

  function start() {
    if (getItem("session", KEY_CLOSED)) { showChip(); return; }
    window.setTimeout(function () {
      if (hiddenToday() || isExpired()) return;
      open("view");
    }, CONFIG.delayMs);
  }

  window.__skv1Popup.open = function () { open("reopen"); };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
