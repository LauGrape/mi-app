import React, { useEffect, useState } from "react";
import "./Slider.css";
import slide1 from "./assets/slide1.jpg";
import slide2 from "./assets/slide2.jpg";
import slide3 from "./assets/slide3.jpg";


const Slider = () => {
  const slides = [
    { id: 1, url: slide1, caption: "Aprendimos sobre AWS" },
    { id: 2, url: slide2, caption: "Aprendimos sobre ArgoCD, GitOps, Rollouts" },
    { id: 3, url: slide3, caption: "Aprendimos sobre Kubernetes" },
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const id = setInterval(nextSlide, 10000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="slider-hero">
      <div
        className="slider-frame"
        key={slides[current].id}
        style={{ "--slide-image": `url(${slides[current].url})` }}
      >
        <div className="slider-overlay" />
        <div className="slider-welcome-message">
          <p className="caption">{slides[current].caption}</p>
        </div>
        <div className="slider-controls">
          <button onClick={prevSlide} className="slider-button" aria-label="Anterior">❮</button>
          <button onClick={nextSlide} className="slider-button" aria-label="Siguiente">❯</button>
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
  );
};

export default Slider;
