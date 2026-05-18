"use client";

import React, { useState, useEffect, useMemo } from "react";

// Wedding date: 30 May 2026, 18:00 (Tashkent time, UTC+5)
const WEDDING_DATE = new Date("2026-05-30T18:00:00+05:00").getTime();

interface Petal {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  gold: boolean;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const diff = Math.max(0, WEDDING_DATE - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function WeddingInvitation() {
  const [opened, setOpened] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [time, setTime] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Petals — generated once
  const petals = useMemo<Petal[]>(() => {
    return Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 8 + 6,
      delay: Math.random() * 12,
      duration: Math.random() * 10 + 14,
      drift: (Math.random() - 0.5) * 120,
      gold: Math.random() > 0.55,
    }));
  }, []);

  // Countdown
  useEffect(() => {
    setTime(getTimeLeft());
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  // Scroll reveal
  useEffect(() => {
    if (!revealed) return;
    const t = setTimeout(() => {
      const els = document.querySelectorAll(".reveal");
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      els.forEach((el) => io.observe(el));
      return () => io.disconnect();
    }, 80);
    return () => clearTimeout(t);
  }, [revealed]);

  // Lock scroll while cover is up
  useEffect(() => {
    document.body.style.overflow = revealed ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [revealed]);

  const openEnvelope = () => {
    if (opened) return;
    setOpened(true);
    // Reveal main page after envelope opening animation
    setTimeout(() => setRevealed(true), 1500);
  };

  return (
    <>
      {/* Floating petals (decorative backdrop) */}
      {revealed && (
        <div className="petals" aria-hidden="true">
          {petals.map((p) => (
            <span
              key={p.id}
              className={`petal ${p.gold ? "gold" : ""}`}
              style={{
                left: `${p.left}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                ["--drift" as never]: `${p.drift}px`,
              }}
            />
          ))}
        </div>
      )}

      {/* COVER / ENVELOPE */}
      <div
        className={`cover ${revealed ? "hidden" : ""}`}
        role="button"
        aria-label="Taklifnomani ochish"
        onClick={openEnvelope}
      >
        <div className="cover-monogram">Javohir &amp; Sevinch</div>
        <div className="cover-eyebrow">Taklifnoma · 2026</div>

        <div className={`envelope ${opened ? "open" : ""}`}>
          <div className="env-body" />
          <div className="env-card">
            <div className="env-card-script">Sizga</div>
            <div className="env-card-names">Javohir &amp; Sevinch</div>
            <div className="env-card-meta">30 · 05 · 2026</div>
          </div>
          <div className="env-side env-side-l" />
          <div className="env-side env-side-r" />
          <div className="env-pocket" />
          <div className="env-flap" />
          <div className="seal">
            <span className="seal-text">J&amp;S</span>
          </div>
        </div>

        <div className="cover-hint">{opened ? "Ochilmoqda…" : "Ochish uchun bosing"}</div>
      </div>

      {/* MAIN PAGE */}
      {revealed && (
        <main className="page">
          {/* HERO */}
          <section className="section hero">
            <div className="reveal">
              <div className="crest">
                <span className="crest-inner">J&amp;S</span>
              </div>
            </div>

            <div className="reveal d1">
              <div className="eyebrow">Bizning to&apos;yimiz</div>
            </div>

            <div className="reveal d2">
              <h1 className="names">
                Javohir
                <span className="amp">&amp;</span>
                Sevinch
              </h1>
            </div>

            <div className="reveal d3">
              <div className="divider">
                <span className="line" />
                <span className="ornament" />
                <span className="line" />
              </div>
            </div>

            <div className="reveal d3">
              <div className="hero-greeting">Assalomu alaykum!</div>
              <div className="hero-lead">Hurmatli mehmonlar</div>
            </div>

            <div className="reveal d4">
              <p className="hero-body">
                Sizni aziz farzandlarimiz Javohir va Sevinchning nikoh to&apos;ylari munosabati bilan
                bo&apos;lib o&apos;tadigan visol oqshomiga taklif etamiz. Quvonchli kunimizda
                hurmat va ehtirom ila kutib qolamiz.
              </p>
            </div>

            <div className="reveal d4">
              <div className="signature">
                <div className="signature-label">Hurmat va ehtirom ila</div>
                <div className="signature-name">Yangashevalar oilasi</div>
              </div>
            </div>

            <div className="reveal d4">
              <div className="scroll-cue">
                <span>Pastga</span>
                <div className="arrow" />
              </div>
            </div>
          </section>

          {/* COUNTDOWN */}
          <section className="section countdown-section">
            <div className="reveal">
              <div className="section-eyebrow">Kutib qolamiz</div>
              <h2 className="section-title">Toʻyimizgacha</h2>
            </div>

            <div className="reveal d1">
              <div className="divider">
                <span className="line" />
                <span className="ornament" />
                <span className="line" />
              </div>
            </div>

            <div className="reveal d2" style={{ width: "100%" }}>
              <div className="countdown" role="timer" aria-live="polite">
                <CountCell n={time.days} label="Kun" />
                <CountCell n={time.hours} label="Soat" />
                <CountCell n={time.minutes} label="Daq" />
                <CountCell n={time.seconds} label="Son" />
              </div>
            </div>
          </section>

          {/* DETAILS */}
          <section className="section details">
            <div className="reveal">
              <div className="section-eyebrow">Marosim</div>
              <h2 className="section-title">Tafsilotlar</h2>
            </div>

            <div className="reveal d1">
              <div className="divider">
                <span className="line" />
                <span className="ornament" />
                <span className="line" />
              </div>
            </div>

            <div className="reveal d2" style={{ width: "100%" }}>
              <div className="detail-stack">
                <DetailRow
                  label="Sana"
                  value="30-may, 2026 — Shanba"
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="5" width="18" height="16" rx="2" />
                      <path d="M8 3v4M16 3v4M3 10h18" />
                    </svg>
                  }
                />
                <DetailRow
                  label="Vaqt"
                  value="18:00 — Visol oqshomi"
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 2" />
                    </svg>
                  }
                />
                <DetailRow
                  label="Manzil"
                  value="Shams to'yxonasi"
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s7-7.16 7-12a7 7 0 1 0-14 0c0 4.84 7 12 7 12Z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                  }
                />
              </div>
            </div>
          </section>

          {/* VENUE */}
          <section className="section venue">
            <div className="reveal">
              <div className="section-eyebrow">Tashrif</div>
              <h2 className="section-title">Toʻy joyi</h2>
            </div>

            <div className="reveal d1">
              <div className="divider">
                <span className="line" />
                <span className="ornament" />
                <span className="line" />
              </div>
            </div>

            <div className="reveal d2" style={{ width: "100%" }}>
              <div className="venue-card">
                <div className="map-frame">
                  <iframe
                    src="https://yandex.uz/map-widget/v1/?ll=69.511612%2C41.407467&mode=search&oid=41645530183&ol=biz&z=16"
                    allowFullScreen
                    loading="lazy"
                    title="Shams to'yxonasi"
                  />
                </div>
                <div className="venue-info">
                  <div className="venue-name">&ldquo;Shams&rdquo; to&apos;yxonasi</div>
                  <p className="venue-address">
                    Toshkent viloyati, Olmaliq tumani,
                    <br />
                    Baytqo&apos;rg&apos;on
                  </p>
                  <a
                    className="btn"
                    href="https://yandex.uz/maps/-/CPs6bVMu"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 11l18-8-8 18-2-8-8-2Z" />
                    </svg>
                    <span>Yo&apos;nalish olish</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* CLOSING */}
          <footer className="section closing">
            <div className="reveal">
              <div className="closing-script">Kutib qolamiz</div>
              <p className="closing-message">
                Tashrifingiz biz uchun cheksiz quvonch va sharaf. Bu unutilmas kunda
                yonimizda bo&apos;lganingiz uchun oldindan minnatdormiz.
              </p>
              <div className="divider" style={{ margin: "26px auto 0" }}>
                <span className="line" />
                <span className="ornament" />
                <span className="line" />
              </div>
              <div className="closing-tag">Javohir &amp; Sevinch · 30.05.2026</div>
            </div>
          </footer>
        </main>
      )}
    </>
  );
}

function CountCell({ n, label }: { n: number; label: string }) {
  return (
    <div className="cd-cell">
      <span className="cd-num">{String(n).padStart(2, "0")}</span>
      <span className="cd-label">{label}</span>
    </div>
  );
}

function DetailRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="detail-row">
      <div className="detail-icon">{icon}</div>
      <div className="detail-text">
        <span className="detail-label">{label}</span>
        <span className="detail-value">{value}</span>
      </div>
    </div>
  );
}
