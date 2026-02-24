import React, { useEffect, useState, useRef } from "react";
import "./Slider.css";
import slide1 from "./assets/KCD2026.png";
import slide2 from "./assets/slide2.jpg";
import slide3 from "./assets/slide3.jpg";
import slide4 from "./assets/slide4.jpg";
import { FaStar, FaCalendarAlt, FaMapPin } from "react-icons/fa";
import { SiAmazonwebservices } from "react-icons/si";

const INTERVAL_MS = 20000; // 20 seconds per slide
const TICK_MS = 100;      // update progress every 100ms

const Slider = () => {
  const slides = [
    {
      id: 1,
      url: slide1,
      caption: "Kubernetes Community Day 2026, Guadalajara",
      icons: [
        { Icon: FaCalendarAlt, key: "calendar", label: "Calendar" },
        { Icon: FaMapPin, key: "map-pin", label: "Map Pin" },
      ],
    },
    {
      id: 2,
      url: slide2,
      caption: "Oficialmente Somos un AWS User Group.",
      icons: [
        { Icon: FaStar, key: "tada", label: "Celebration" },
        { Icon: SiAmazonwebservices, key: "aws", label: "AWS" },
      ],
    },
    { id: 3, url: slide3, caption: "1er meetup presencial de la comunidad." },
    { id: 4, url: slide4, caption: "Webinar: Aprendimos sobre GitOps, ArgoCD, Rollouts y más." },
  ];

  const [current, setCurrent] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const touchStartRef = useRef(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  /* Auto-advance and progress countdown: single interval on mount, no re-run on slide change */
  useEffect(() => {
    setElapsed(0);
    const id = setInterval(() => {
      setElapsed((prev) => {
        const next = prev + TICK_MS;
        if (next >= INTERVAL_MS) {
          setCurrent((c) => (c + 1) % slides.length);
          return 0;
        }
        return next;
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, []);

  const progressPercent = Math.min(100, (elapsed / INTERVAL_MS) * 100);

  const handleTouchStart = (e) => {
    touchStartRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const start = touchStartRef.current;
    if (start == null) return;
    touchStartRef.current = null;
    const dx = e.changedTouches[0].clientX - start;
    const threshold = 50;
    if (dx > threshold) prevSlide();
    else if (dx < -threshold) nextSlide();
  };

  return (
    <div className="slider-hero">
      <div
        className="slider-frame"
        key={slides[current].id}
        style={{ "--slide-image": `url(${slides[current].url})` }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={() => { touchStartRef.current = null; }}
        role="region"
        aria-label="Slider de bienvenida - desliza para cambiar"
      >
        <div className="slider-overlay" />
        <div className="slider-welcome-message">
          {slides[current].icons && (
            <div className="slider-caption-icons" aria-hidden>
              {slides[current].icons.map(({ Icon, key, label }) => (
                <Icon key={key} className={`slider-icon slider-icon-${key}`} aria-label={label} />
              ))}
            </div>
          )}
          <p className="caption">{slides[current].caption}</p>
        </div>
        <div className="slider-controls">
          <button onClick={prevSlide} className="slider-button" aria-label="Anterior">❮</button>
          <button onClick={nextSlide} className="slider-button" aria-label="Siguiente">❯</button>
        </div>
        <div className="slider-center-group">
          <div className="slider-progress-wrap" aria-label="Tiempo restante para el siguiente slide">
            <div
              className="slider-progress-bar"
              style={{ width: `${progressPercent}%` }}
              aria-hidden
            />
          </div>
          <div className="slider-dots">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              className={`slider-dot ${idx === current ? 'active' : ''}`}
              onClick={() => setCurrent(idx)}
              aria-label={`Ir al slide ${idx + 1}`}
            />
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
