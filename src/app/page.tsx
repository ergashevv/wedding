"use client";

import React, { useState, useEffect, useRef } from "react";

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

  // Play/Pause Background Music
  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
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

  // Open the physical envelope and play music softly
  const handleOpenEnvelope = () => {
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

  return (
    <>
      {/* Hidden Audio Player playing a very soft, quiet acoustic piano piece */}
      <audio
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
        loop
        preload="auto"
      />

      {/* Floating Music Equalizer Controller */}
      {envelopeOpened && (
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

      {/* 3D Envelope Stage */}
      <div className="envelope-overlay">
        {/* Floating gold dust in background */}
        <div className="ambient-particles">
          {ambientParticles.slice(0, 15).map((p) => (
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

            {/* Scrollable textured Invitation Card sliding out of envelope pocket */}
            <div className="card-inside" onClick={(e) => e.stopPropagation()}>
              <div className="card-inside-scrollable">
                <div className="card-ornament-top">⚜</div>
                <span className="card-cursive-title">{"Taklifnoma"}</span>
                <div className="card-double-divider"></div>

                <p className="card-main-invitation">{"Hurmatli mehmonlar!"}</p>
                <p className="card-body-text">{"Sizlarni aziz farzandlarimiz"}</p>
                <h2 className="card-names-title">{"Javohir & Sevinch"}</h2>
                <p className="card-body-text">
                  {"ning umr yo'llarining bog'lanishi — Visol Oqshomiga lutfan taklif etamiz."}
                </p>

                <div className="card-ornament-middle">🌸</div>

                <div className="card-event-info">
                  <div className="info-item">
                    <span className="info-label">{"SANA"}</span>
                    <span className="info-value">{"30.05.2026"}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">{"KUN"}</span>
                    <span className="info-value">{"Shanba"}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">{"VAQT"}</span>
                    <span className="info-value">{"18:00"}</span>
                  </div>
                </div>

                <div className="card-location-title">
                  <h3>{"SHAMS RESTORANI"}</h3>
                  <p>{"Toshkent viloyati, Shams to'yxonasi"}</p>
                </div>

                {/* Yandex Map Embedded inside the card */}
                <div className="card-map-wrapper">
                  <div style={{ position: "relative", overflow: "hidden", borderRadius: "8px" }}>
                    <a
                      href="https://yandex.uz/maps/org/41645530183/?utm_medium=mapframe&utm_source=maps"
                      style={{ color: "#eee", fontSize: "10px", position: "absolute", top: "0px" }}
                    >
                      Shams
                    </a>
                    <a
                      href="https://yandex.uz/maps/105813/tashkent-province/category/restaurant/184106394/?utm_medium=mapframe&utm_source=maps"
                      style={{ color: "#eee", fontSize: "10px", position: "absolute", top: "12px" }}
                    >
                      Restoran Toshkent viloyatida
                    </a>
                    <iframe
                      src="https://yandex.uz/map-widget/v1/?ll=69.511612%2C41.407467&mode=search&oid=41645530183&ol=biz&z=16.54"
                      width="100%"
                      height="180"
                      frameBorder="0"
                      allowFullScreen={true}
                      style={{ position: "relative", borderRadius: "8px" }}
                    ></iframe>
                  </div>
                </div>

                {/* Navigation Button */}
                <a
                  href="https://yandex.uz/maps/-/CPs6bVMu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-nav-btn"
                >
                  📍 {"Xaritada ochish"}
                </a>

                <div className="card-ornament-bottom">⚜</div>
              </div>
            </div>

            {/* Precise CSS Border Folds */}
            <div className="envelope-fold-left-3d"></div>
            <div className="envelope-fold-right-3d"></div>
            <div className="envelope-fold-bottom-3d"></div>
          </div>
        </div>

        <p className="open-text" style={{ marginTop: "40px", animation: "bounceSoft 2s infinite" }}>
          {!envelopeOpened 
            ? "Ochish uchun bosing" 
            : "Tanishish uchun yuqoridagi varaqni pastga aylantiring"}
        </p>
      </div>
    </>
  );
}
