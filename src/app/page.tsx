"use client";

import React, { useState, useEffect, useRef } from "react";

// Helper to generate elegant floating background gold dust particles
interface Particle {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
}

export default function WeddingInvitation() {
  // Application states
  const [envelopeOpened, setEnvelopeOpened] = useState<boolean>(false);
  const [portalRevealed, setPortalRevealed] = useState<boolean>(false);
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);
  const [ambientParticles, setAmbientParticles] = useState<Particle[]>([]);

  // Audio reference
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Generate gold particles once mounted
  useEffect(() => {
    const particlesArray: Particle[] = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // percentage
      size: Math.random() * 4 + 2, // 2px to 6px
      delay: Math.random() * 8, // delay up to 8s
      duration: Math.random() * 10 + 12, // 12s to 22s
    }));
    setAmbientParticles(particlesArray);
  }, []);

  // Initialize IntersectionObserver for smooth scroll animations
  useEffect(() => {
    if (!portalRevealed) return;

    const timeout = setTimeout(() => {
      const revealElements = document.querySelectorAll(".reveal");
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("active");
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px",
        }
      );

      revealElements.forEach((el) => observer.observe(el));

      return () => {
        observer.disconnect();
      };
    }, 100);

    return () => clearTimeout(timeout);
  }, [portalRevealed]);

  // Play/Pause Background Music
  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (audioPlaying) {
      audioRef.current.pause();
      setAudioPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setAudioPlaying(true);
      }).catch((err) => {
        console.log("Audio play blocked by browser:", err);
      });
    }
  };

  // Open the physical envelope
  const handleOpenEnvelope = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (envelopeOpened) return;
    
    setEnvelopeOpened(true);
    
    // Auto-play music softly on click (user interaction registered)
    if (audioRef.current) {
      audioRef.current.volume = 0.45;
      audioRef.current.play().then(() => {
        setAudioPlaying(true);
      }).catch((e) => {
        console.log("Audio auto-play blocked by browser. Triggerable via floating button.", e);
      });
    }
  };

  // Smoothly enter the full invitation website
  const handleEnterPortal = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!envelopeOpened) return;
    setPortalRevealed(true);
  };

  return (
    <>
      {/* Hidden Audio Player playing a very soft, quiet acoustic piano piece */}
      <audio
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
        loop
        preload="auto"
      />

      {/* Floating Bright Music Equalizer Controller */}
      {portalRevealed && (
        <button
          className={`audio-player-floating ${!audioPlaying ? "muted" : ""}`}
          onClick={toggleAudio}
          title={audioPlaying ? "Musiqani o'chirish" : "Musiqani yoqish"}
          aria-label="Musiqa boshqaruvi"
        >
          <div className="equalizer">
            <span className="equalizer-bar"></span>
            <span className="equalizer-bar"></span>
            <span className="equalizer-bar"></span>
            <span className="equalizer-bar"></span>
          </div>
        </button>
      )}

      {/* 1. ENVELOPE INTERACTIVE OVERLAY */}
      <div className={`envelope-overlay ${portalRevealed ? "opened" : ""}`}>
        {/* Floating gold dust in envelope background */}
        <div className="ambient-particles">
          {ambientParticles.slice(0, 12).map((p) => (
            <div
              key={p.id}
              className="particle"
              style={{
                left: `${p.left}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animation: `floatParticles ${p.duration}s linear infinite`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Calligraphy Header Above the Envelope */}
        <div className="envelope-header-3d">
          <h1>{"Taklifnoma"}</h1>
          <p>{"Javohir & Sevinch"}</p>
        </div>

        {/* 3D Realistic Physical Envelope Container */}
        <div
          className={`envelope-wrapper ${envelopeOpened ? "opened" : ""}`}
          onClick={handleOpenEnvelope}
        >
          <div className="envelope-3d">
            {/* Triangular Pointed Top Flap */}
            <div className="envelope-flap-3d">
              <div className="envelope-flap-tri"></div>
            </div>

            {/* Glowing physical Wax Seal sitting perfectly at fold intersection */}
            <div className="wax-seal-wrapper-3d">
              <div className="wax-seal-3d">
                <span className="wax-seal-logo-3d">{"J&S"}</span>
              </div>
            </div>

            {/* Textured Invitation Card sliding out of envelope pocket */}
            <div className="card-inside" onClick={handleEnterPortal}>
              <span className="card-inside-title">{"Taklifnoma"}</span>
              <h3 className="card-inside-names">{"Javohir & Sevinch"}</h3>
              <p className="card-inside-tap">{"Kirish uchun bosing"}</p>
            </div>

            {/* Precise CSS Border Folds */}
            <div className="envelope-fold-left-3d"></div>
            <div className="envelope-fold-right-3d"></div>
            <div className="envelope-fold-bottom-3d"></div>
          </div>
        </div>

        <p className="open-text">
          {!envelopeOpened ? "Ochish uchun bosing" : "Kirish uchun yuqoridagi kartani bosing"}
        </p>
      </div>

      {/* MAIN WEBSITE PORTAL (Revealed after envelope opens and guest slides it out) */}
      {portalRevealed && (
        <div className="main-content-wrapper" style={{ animation: "fadeIn 1.2s ease-out forwards" }}>
          
          {/* 2. HERO / WELCOME SECTION */}
          <section className="section hero-section">
            {/* Floating gold dust particles on page */}
            <div className="ambient-particles">
              {ambientParticles.map((p) => (
                <div
                  key={p.id}
                  className="particle"
                  style={{
                    left: `${p.left}%`,
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    animation: `floatParticles ${p.duration}s linear infinite`,
                    animationDelay: `${p.delay}s`,
                  }}
                />
              ))}
            </div>

            <div className="reveal" style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
              <p className="hero-subtitle">{"Assalomu alaykum"}</p>
              <h2 className="hero-guest-title">{"Hurmatli mehmonlar!"}</h2>

              {/* Gold Floral Divider Ornament */}
              <div className="floral-divider">
                <span className="floral-line"></span>
                <span className="floral-center">{"❦"}</span>
                <span className="floral-line"></span>
              </div>

              <div className="couple-names-wrapper">
                <h1 className="couple-name">{"Javohir"}</h1>
                <span className="couple-ampersand">{"&"}</span>
                <h1 className="couple-name">{"Sevinch"}</h1>
              </div>

              {/* Scroll down indicator */}
              <div style={{ marginTop: "30px", opacity: 0.7, animation: "bounceSoft 2s infinite" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-gold-primary)" }}>
                  <polyline points="7 13 12 18 17 13"></polyline>
                  <polyline points="7 6 12 11 17 6"></polyline>
                </svg>
              </div>
            </div>
          </section>

          {/* 3. INVITATION MESSAGE SECTION (Identical copy to physical card, high-contrast) */}
          <section className="section" style={{ backgroundColor: "#faf8f5" }}>
            <div className="gold-border-frame reveal">
              {/* Gold corners */}
              <div className="card-corner corner-tl"></div>
              <div className="card-corner corner-tr"></div>
              <div className="card-corner corner-bl"></div>
              <div className="card-corner corner-br"></div>

              <span className="section-subtitle-cursive" style={{ fontSize: "2.4rem" }}>{"Taklifnoma"}</span>
              
              <div className="floral-divider" style={{ margin: "10px 0 20px 0" }}>
                <span className="floral-line"></span>
                <span className="floral-center">{"✦"}</span>
                <span className="floral-line"></span>
              </div>

              <p className="invite-text">
                {"Sizni aziz farzandlarimiz"}<br />
                <strong style={{ fontSize: "1.6rem", color: "var(--color-text-primary)", display: "block", margin: "10px 0" }}>
                  {"Javohir va Sevinch"}
                </strong>
                {"larning nikoh to'ylari munosabati bilan"}<br />
                <span style={{ fontWeight: "600", borderBottom: "1px solid var(--color-gold-primary)", paddingBottom: "2px" }}>
                  {"2026-yil 30-may"}
                </span>
                {" kuni soat "}{" "}
                <span style={{ fontWeight: "600", borderBottom: "1px solid var(--color-gold-primary)", paddingBottom: "2px" }}>
                  {"18:00"}
                </span>{" da"}<br />
                {"bo'lib o'tadigan "}<strong style={{ color: "var(--color-gold-dark)" }}>{"Visol oqshomi"}</strong><br />
                {"kechamizda kutib qolamiz."}
              </p>

              <div className="respect-block">
                <span className="respect-label">{"Hurmat va ehtirom ila"}</span>
                <span className="respect-value">{"Asomiddin, Yangashevalar oilasi"}</span>
              </div>
            </div>
          </section>

          {/* 4. VENUE & YANDEX MAP INTEGRATION */}
          <section className="section" style={{ backgroundColor: "#fdfdfb" }}>
            <div className="reveal" style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span className="section-subtitle-cursive">{"Tantana joyi"}</span>
              <h2 className="venue-title">{"Manzilimiz"}</h2>

              <div className="floral-divider" style={{ margin: "10px 0 25px 0" }}>
                <span className="floral-line"></span>
                <span className="floral-center">{"⚜"}</span>
                <span className="floral-line"></span>
              </div>

              <div className="venue-card reveal reveal-delay-1">
                <h3 className="venue-name">{"\"Shams\" To'yxonasi"}</h3>
                <p className="venue-address">
                  {"Qibray tumani, Baytqo'rg'on, Shams to'yxonasi."}
                </p>

                {/* Yandex Map Iframe Embed provided by User (Styled beautifully & fully responsive) */}
                <div className="yandex-map-responsive">
                  <div style={{ position: "relative", overflow: "hidden", width: "100%", height: "100%" }}>
                    <a
                      href="https://yandex.uz/maps/org/41645530183/?utm_medium=mapframe&utm_source=maps"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "0px", zIndex: 10 }}
                    >
                      {"Shams"}
                    </a>
                    <a
                      href="https://yandex.uz/maps/105813/tashkent-province/category/restaurant/184106394/?utm_medium=mapframe&utm_source=maps"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "14px", zIndex: 10 }}
                    >
                      {"Restoran Toshkent viloyatida"}
                    </a>
                    <iframe
                      src="https://yandex.uz/map-widget/v1/?ll=69.511612%2C41.407467&mode=search&oid=41645530183&ol=biz&z=16.54"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      allowFullScreen={true}
                      style={{ position: "relative" }}
                    ></iframe>
                  </div>
                </div>

                {/* Yandex App Routing Button - builds directions from guest's current location */}
                <a
                  href="https://yandex.uz/maps/-/CPs6bVMu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="yandex-nav-btn"
                >
                  <svg className="yandex-nav-btn-icon" viewBox="0 0 24 24">
                    <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
                  </svg>
                  {"Yandex Navigatorda yo'nalish olish"}
                </a>
              </div>
            </div>
          </section>

          {/* 5. FOOTER SECTION */}
          <footer className="footer">
            <div className="reveal">
              <h2 className="footer-names">{"Javohir & Sevinch"}</h2>
              <p className="footer-tagline">{"Visol Oqshomi"}</p>
              
              <div className="floral-divider" style={{ margin: "20px auto 25px auto" }}>
                <span className="floral-line"></span>
                <span className="floral-center" style={{ fontSize: "1rem", color: "var(--color-gold-primary)" }}>{"❤"}</span>
                <span className="floral-line"></span>
              </div>

              <p style={{ fontSize: "0.85rem", opacity: 0.7, maxWidth: "320px", margin: "0 auto", lineHeight: "1.7", color: "var(--color-text-secondary)" }}>
                {"Tashrifingiz uchun oldindan samimiy minnatdorchilik bildiramiz!"}
              </p>
              
              <p className="footer-copyright">
                {"© 2026. Barcha huquqlar himoyalangan."}
              </p>
            </div>
          </footer>

        </div>
      )}
    </>
  );
}
