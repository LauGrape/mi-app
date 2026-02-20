import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Slider from './Slider';
import video from './assets/video.mp4';
import ajolote from './assets/ajolote.png';
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaTwitch,
  FaBook,
  FaEnvelope,
  FaMapPin
} from 'react-icons/fa';

const HomePage = () => (
  <>
    {/* Slider de Bienvenida */}
    <section id="inicio" className="section">
      <div className="hero-layout">
        <div className="hero-slider">
          <Slider />
        </div>
        <div className="hero-copy">
          <div className="hero-brand">
            <img src={ajolote} alt="Ajolote" className="hero-logo" />
            <span className="hero-brand-name">Mexico in Tech</span>
          </div>
          <p className="hero-description">
            <b>DE DEVS PARA DEVS:</b> Compartiendo conocimiento real, webinars y eventos para impulsar tu carrera.
          </p>
          <div className="hero-actions">
            <Link to="/contact" className="hero-button hero-primary">
              Unete a la comunidad
            </Link>
            <a href="/#video" className="hero-button hero-secondary">
              Ver los próximos eventos
            </a>
          </div>
        </div>
      </div>
    </section>

    <section id="acercade" className="section acercade-section">
      <div className="acercade-block">
        <h2>Acerca de México in Tech</h2>
        <p id="p-acercade">
          México in Tech es una comunidad dedicada a fomentar el aprendizaje
          y la colaboración en el ámbito tecnológico. Ofrecemos cursos,
          webinars y eventos para ayudar a los profesionales a crecer en sus
          carreras.
        </p>
      </div>
      <div className="acercade-block">
        <h2>Misión</h2>
        <p id="p-mision">
          Nuestra misión es empoderar a los desarrolladores mexicanos con
          conocimientos prácticos y reales, compartidos por expertos de la
          industria. Queremos crear un espacio donde los devs puedan aprender,
          colaborar y crecer juntos.
        </p>
      </div>
      <div className="acercade-block">
        <h2>Visión</h2>
        <p id="p-vision">
          Ser la comunidad de referencia en México para el aprendizaje y la
          colaboración tecnológica, impulsando el crecimiento profesional de los
          desarrolladores y contribuyendo al desarrollo del ecosistema tech en
          el país.
        </p>
      </div>
    </section>

    {/* Video */}
    <section id="video" className="section">
      <h2>Webinars</h2>
      <div className="video-box">
        <video controls>
          <source src={video} type="video/mp4" />
          Tu navegador no soporta el video.
        </video>
      </div>
    </section>
  </>
);

const ContactPage = () => (
  <section id="contacto" className="section contact-section">
    <div className="contact-grid">
      <div className="contact-copy">
      <h2>Contáctanos</h2>
      <p>Nos encantaría colaborar contigo.</p>
      <ul>
        <li>¿Te gustaría compartir con la comunidad?</li>   
        <li>Invítanos a tus eventos. Nos encantaría participar</li>
      </ul>
    </div>
      <form className="contact-form">
        <h4>Envíanos un mensaje</h4>
      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Tu nombre"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Correo electrónico:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="juan@gmail.com"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="mensaje">Mensaje:</label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows="5"
          placeholder="Escribe tu mensaje..."
          required
        ></textarea>
      </div>

      <button type="submit">Enviar Mensaje</button>
    </form>
    </div>
  </section>
);

const CursosPage = () => (
  <section id="info" className="section info-section">
    <h2>Cursos Disponibles</h2>
    <div className="info-cards">
      <div className="info-card">
        <h3>Servidores Linux</h3>
        <p>Administra un servidor Linux.</p>
      </div>
      <div className="info-card">
        <h3>Linux: Command Line</h3>
        <p>Aprende a usar comandos útiles en la terminal.</p>
      </div>
      <div className="info-card">
        <h3>AWS IAM</h3>
        <p>Roles, Políticas, Usuarios y Grupos.</p>
      </div>
      <div className="info-card">
        <h3>AWS S3</h3>
        <p>Almacenamiento, políticas S3 y ciclo de vida.</p>
      </div>
      <div className="info-card">
        <h3>AWS RDS</h3>
        <p>Bases de datos MySQL y PostgreSQL.</p>
      </div>
    </div>
  </section>
);

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const initialTheme = prefersDark.matches ? 'dark' : 'light';
    setTheme(initialTheme);

    const handleChange = (event) => {
      setTheme(event.matches ? 'dark' : 'light');
    };

    prefersDark.addEventListener('change', handleChange);
    return () => prefersDark.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  // #region agent log
  useEffect(() => {
    if (menuOpen) {
      const ul = document.querySelector('.nav-links.open');
      if (ul) {
        const computed = window.getComputedStyle(ul);
        const rect = ul.getBoundingClientRect();
        const links = ul.querySelectorAll('a');
        const linkStyles = Array.from(links).map((link, idx) => {
          const linkComputed = window.getComputedStyle(link);
          const linkRect = link.getBoundingClientRect();
          return {
            index: idx,
            text: link.textContent.trim(),
            background: linkComputed.backgroundColor,
            backgroundImage: linkComputed.backgroundImage,
            display: linkComputed.display,
            position: linkComputed.position,
            width: linkRect.width,
            height: linkRect.height,
            top: linkRect.top,
            left: linkRect.left
          };
        });
        fetch('http://127.0.0.1:7316/ingest/ac451daf-ee5f-455d-be97-c0df8640708d',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'772a59'},body:JSON.stringify({sessionId:'772a59',runId:'menu-open',hypothesisId:'A,B,C,D,E',location:'App.js:189',message:'Menu opened - checking ul styles',data:{ul:{background:computed.backgroundColor,backgroundImage:computed.backgroundImage,display:computed.display,position:computed.position,width:rect.width,height:rect.height,boxShadow:computed.boxShadow,zIndex:computed.zIndex,padding:computed.padding,gap:computed.gap},links:linkStyles},timestamp:Date.now()})}).catch(()=>{});
      }
    }
  }, [menuOpen]);
  // #endregion

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="App">
      {/* Barra de navegación */}
      <header className="header">
        <nav className="nav">
          <div className="nav-col nav-col-left">
            <div className="nav-logo">
              <img src={ajolote} alt="Mexico in Tech" className="nav-logo-icon" />
              <span className="nav-logo-text">Mexico in Tech</span>
            </div>
          </div>

          <div className="nav-col nav-col-right">
            <div className="nav-actions">
              {/* Botón hamburguesa */}
              <button className="hamburger" onClick={toggleMenu}>
                ☰
              </button>

              {/* Enlaces del menú */}
              <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
                <li><Link to="/" onClick={closeMenu}>Inicio</Link></li>
                <li><a href="/#acercade" onClick={closeMenu}>Acerca de</a></li>
                <li><a href="/#video" onClick={closeMenu}>Webinars</a></li>
                <li><Link to="/cursos" onClick={closeMenu}>Cursos</Link></li>
                <li><Link to="/contact" onClick={closeMenu}>Contacto</Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Cambiar tema">
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cursos" element={<CursosPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-col footer-col-brand">
            <div className="footer-brand-header">
              <img src={ajolote} alt="Ajolote" className="footer-logo" />
              <h3>Mexico in Tech</h3>
            </div>
            <p>Compartiendo conocimiento real, webinars y eventos para impulsar tu carrera.</p>
            <p className="footer-location">
              <FaMapPin className="footer-location-icon" aria-hidden />
              <span>  Desde Tlaxcala, México.</span>
            </p>
          </div>
          <div className="footer-col footer-col-links">
            <h3>Links</h3>
            <ul className="footer-links">
              <li>
                <Link to="/cursos" className="footer-link">
                  <FaBook className="footer-link-icon" aria-hidden />
                  <span>Cursos</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  <FaEnvelope className="footer-link-icon" aria-hidden />
                  <span>Contacto</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-col footer-col-legal">
            <div className="footer-social">
              <h3 className="footer-social-label">Síguenos</h3>
              <div className="social-icons">
                <a
                  href="https://www.facebook.com/mxintech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://www.linkedin.com/company/mxintech/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://www.youtube.com/mexicointech"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                >
                  <FaYoutube />
                </a>
                <a
                  href="https://x.com/mxintech"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://www.tiktok.com/mxintech"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                >
                  <FaTiktok />
                </a>
                <a
                  href="https://www.twitch.tv/mxintech"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitch"
                >
                  <FaTwitch />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copyright">
            © Reserved rights 2026. Made by Mexico in Tech.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
