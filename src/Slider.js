import React, { useState } from "react";
import "./Slider.css";
import slide1 from "./assets/slide1.jpg";
import slide2 from "./assets/slide2.png";
import slide3 from "./assets/slide3.jpg";


const Slider = () => {
  const slides = [
    { id: 1, url: slide1, caption: "Bienvenido a México in Tech" },
    { id: 2, url: slide2, caption: "Explora nuestros cursos" },
    { id: 3, url: slide3, caption: "Contáctanos para más información" },
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="slider">
      <button onClick={prevSlide} className="slider-button">❮</button>
      <div className="slider-content">
        <img src={slides[current].url} alt={`Slide ${current + 1}`} />
        <p className="caption">{slides[current].caption}</p>
      </div>
      <button onClick={nextSlide} className="slider-button">❯</button>
    </div>
  );
};

export default Slider;
