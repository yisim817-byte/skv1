import { useEffect, useState } from "react";
import { NAV, SITE_PHONE, SITE_PHONE_TEL } from "@/lib/site-data";

export function SiteHeader({ tone }: { tone: "home" | "sub" }) {
  const [on, setOn] = useState(tone === "sub");
  const [open, setOpen] = useState(false);
  const [acc, setAcc] = useState<string | null>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (tone !== "home") return;
    const sync = () => setOn(window.scrollY > 40);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, [tone]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = tone === "sub" || on || open || hover;
  const cls = ["site-header", tone === "sub" ? "is-sub" : "", solid ? "is-on" : "", hover ? "is-menu" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <header
        className={cls}
        onMouseEnter={() => {
          if (window.innerWidth > 1100) setHover(true);
        }}
        onMouseLeave={() => setHover(false)}
      >
        <div className="header-inner">
          <h1 className="brand">
            <a href="/">청라 SK V1</a>
          </h1>
          <nav className="gnb" aria-label="주요 메뉴">
            <ul>
              {NAV.map((item) => (
                <li key={item.label}>
                  <a href={item.href}>{item.label}</a>
                  {item.children ? (
                    <ul>
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <a href={child.href}>{child.label}</a>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>
          <div className="header-right">
            <a className="header-ask" href={`tel:${SITE_PHONE_TEL}`}>
              <span className="ask-label">문의</span>
              <span className="ask-num">{SITE_PHONE}</span>
            </a>
            <button
              type="button"
              className={open ? "hamburger is-open" : "hamburger"}
              aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      <div className={open ? "mobile-nav is-open" : "mobile-nav"}>
        <ul>
          {NAV.map((item) => (
            <li key={item.label}>
              {item.children && item.children.length > 1 ? (
                <button
                  type="button"
                  className={acc === item.label ? "is-acc" : ""}
                  onClick={() => setAcc((v) => (v === item.label ? null : item.label))}
                >
                  {item.label}
                </button>
              ) : (
                <a href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              )}
              {item.children && item.children.length > 1 ? (
                <ul hidden={acc !== item.label}>
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <a href={child.href} onClick={() => setOpen(false)}>
                        {child.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
