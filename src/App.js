import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import Slider from './Slider';
import ContactForm from './ContactForm';
import video from './assets/video.mp4';
import ajolote from './assets/ajolote.png';
import mascota from './assets/mascota.png';
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaTwitch,
  FaBook,
  FaEnvelope,
  FaMapPin,
  FaUserPlus,
  FaUserTie,
  FaMicrophone,
  FaHandshake,
  FaCalendarAlt,
  FaHome,
  FaInfoCircle,
  FaVideo,
  FaChevronLeft,
  FaChevronRight,
  FaCircle,
  FaRegCircle
} from 'react-icons/fa';

const ACERCADE_SLIDES = [
  {
    title: 'Acerca de México in Tech',
    id: 'p-acercade',
    body: 'México in Tech es una comunidad dedicada a fomentar el aprendizaje y la colaboración en el ámbito tecnológico. Ofrecemos cursos, webinars y eventos para ayudar a los profesionales a crecer en sus carreras.'
  },
  {
    title: 'Misión',
    id: 'p-mision',
    body: 'Nuestra misión es empoderar a los desarrolladores mexicanos con conocimientos prácticos y reales, compartidos por expertos de la industria. Queremos crear un espacio donde los devs puedan aprender, colaborar y crecer juntos.'
  },
  {
    title: 'Visión',
    id: 'p-vision',
    body: 'Ser la comunidad de referencia en México para el aprendizaje y la colaboración tecnológica, impulsando el crecimiento profesional de los desarrolladores y contribuyendo al desarrollo del ecosistema tech en el país.'
  }
];

const AcercadeSection = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);

  const goTo = (index) => {
    setSlideIndex(Math.max(0, Math.min(index, ACERCADE_SLIDES.length - 1)));
  };

  const goPrev = () => {
    if (slideIndex === 0) goTo(ACERCADE_SLIDES.length - 1);
    else goTo(slideIndex - 1);
  };

  const goNext = () => {
    if (slideIndex === ACERCADE_SLIDES.length - 1) goTo(0);
    else goTo(slideIndex + 1);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStart == null) return;
    const dx = e.changedTouches[0].clientX - touchStart;
    const threshold = 50;
    if (dx > threshold) goPrev();
    else if (dx < -threshold) goNext();
    setTouchStart(null);
  };

  return (
    <section id="acercade" className="section acercade-section">
      <div className="acercade-pet-row">
        <div className="acercade-pet-container">
          <img src={mascota} alt="Mascota de México in Tech" className="acercade-mascota" />
        </div>
      </div>
      <div className="acercade-slider-row">
        <div className="acercade-slider-wrapper">
          <div
            className="acercade-slider-viewport acercade-slider-cols"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            role="region"
            aria-label="Contenido Acerca de - desliza para cambiar"
          >
            {/* Left 10%: peek of previous (wrap: when index 0, previous = last) */}
            <div className="acercade-col acercade-col-prev">
              <div className="acercade-slide-box-wrap">
                <div className="acercade-slide-box">
                  <h4>{ACERCADE_SLIDES[(slideIndex - 1 + ACERCADE_SLIDES.length) % ACERCADE_SLIDES.length].title}</h4>
                  <p id={`${ACERCADE_SLIDES[(slideIndex - 1 + ACERCADE_SLIDES.length) % ACERCADE_SLIDES.length].id}-prev`}>
                    {ACERCADE_SLIDES[(slideIndex - 1 + ACERCADE_SLIDES.length) % ACERCADE_SLIDES.length].body}
                  </p>
                </div>
              </div>
            </div>
            {/* Center 80%: current slide */}
            <div className="acercade-col acercade-col-center">
              <div className="acercade-slide-box">
                <h4>{ACERCADE_SLIDES[slideIndex].title}</h4>
                <p id={ACERCADE_SLIDES[slideIndex].id}>{ACERCADE_SLIDES[slideIndex].body}</p>
              </div>
            </div>
            {/* Right 10%: peek of next (wrap: when index last, next = first) */}
            <div className="acercade-col acercade-col-next">
              <div className="acercade-slide-box-wrap">
                <div className="acercade-slide-box">
                  <h4>{ACERCADE_SLIDES[(slideIndex + 1) % ACERCADE_SLIDES.length].title}</h4>
                  <p id={`${ACERCADE_SLIDES[(slideIndex + 1) % ACERCADE_SLIDES.length].id}-next`}>
                    {ACERCADE_SLIDES[(slideIndex + 1) % ACERCADE_SLIDES.length].body}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="acercade-slider-footer">
          <div className="acercade-slider-nav">
            <button
              type="button"
              className="acercade-slider-arrow acercade-slider-prev"
              onClick={goPrev}
              aria-label="Anterior"
            >
              <FaChevronLeft />
            </button>
            <div className="acercade-slider-dots" role="tablist" aria-label="Sección del contenido">
              {ACERCADE_SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === slideIndex}
                  aria-label={`Ir a sección ${i + 1}`}
                  className={`acercade-dot ${i === slideIndex ? 'acercade-dot--active' : ''}`}
                  onClick={() => goTo(i)}
                >
                  {i === slideIndex ? <FaCircle /> : <FaRegCircle />}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="acercade-slider-arrow acercade-slider-next"
              onClick={goNext}
              aria-label="Siguiente"
            >
              <FaChevronRight />
            </button>
          </div>
          <p className="acercade-swipe-hint">Desliza o usa las flechas para ver más</p>
        </div>
      </div>
    </section>
  );
};

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
            <Link to="/contact/member" className="hero-button hero-primary">
              Unete a la comunidad
            </Link>
            <a href="/#video" className="hero-button hero-secondary">
              Ver los próximos eventos
            </a>
          </div>
        </div>
      </div>
    </section>

    <AcercadeSection />

    {/* Webinars */}
    <section id="video" className="section webinars-section">
      <h2>Webinars</h2>
      <div className="webinars-grid">
        <a
          href="https://youtube.com/live/GoTTYOpzvRg"
          target="_blank"
          rel="noopener noreferrer"
          className="webinar-card"
        >
          <div className="webinar-thumbnail">
            <img
              src="https://img.youtube.com/vi/GoTTYOpzvRg/maxresdefault.jpg"
              alt="Webinar 1"
              onError={(e) => {
                e.target.src = `https://img.youtube.com/vi/GoTTYOpzvRg/hqdefault.jpg`;
              }}
            />
            <div className="webinar-play-overlay">
              <FaYoutube className="play-icon" />
            </div>
          </div>
        </a>
        <a
          href="https://youtube.com/live/0Kf2v6D1ApI?feature=share"
          target="_blank"
          rel="noopener noreferrer"
          className="webinar-card"
        >
          <div className="webinar-thumbnail">
            <img
              src="https://img.youtube.com/vi/0Kf2v6D1ApI/maxresdefault.jpg"
              alt="Webinar 2"
              onError={(e) => {
                e.target.src = `https://img.youtube.com/vi/0Kf2v6D1ApI/hqdefault.jpg`;
              }}
            />
            <div className="webinar-play-overlay">
              <FaYoutube className="play-icon" />
            </div>
          </div>
        </a>
        <a
          href="https://youtube.com/live/JlF9ey7S9dI?feature=share"
          target="_blank"
          rel="noopener noreferrer"
          className="webinar-card"
        >
          <div className="webinar-thumbnail">
            <img
              src="https://img.youtube.com/vi/JlF9ey7S9dI/maxresdefault.jpg"
              alt="Webinar 3"
              onError={(e) => {
                e.target.src = `https://img.youtube.com/vi/JlF9ey7S9dI/hqdefault.jpg`;
              }}
            />
            <div className="webinar-play-overlay">
              <FaYoutube className="play-icon" />
            </div>
          </div>
        </a>
        <a
          href="https://youtube.com/live/4qtKxMpkPsk?feature=share"
          target="_blank"
          rel="noopener noreferrer"
          className="webinar-card"
        >
          <div className="webinar-thumbnail">
            <img
              src="https://img.youtube.com/vi/4qtKxMpkPsk/maxresdefault.jpg"
              alt="Webinar 4"
              onError={(e) => {
                e.target.src = `https://img.youtube.com/vi/4qtKxMpkPsk/hqdefault.jpg`;
              }}
            />
            <div className="webinar-play-overlay">
              <FaYoutube className="play-icon" />
            </div>
          </div>
        </a>
      </div>
      <div className="webinars-subscribe">
        <a
          href="https://www.youtube.com/mexicointech"
          target="_blank"
          rel="noopener noreferrer"
          className="subscribe-button"
        >
          <FaYoutube className="subscribe-icon" />
          <span>Suscríbete al canal</span>
        </a>
      </div>
    </section>

    {/* Eventos */}
    <section id="eventos" className="section eventos-section">
      <h2>Eventos</h2>
      <div className="video-box">
        <video controls>
          <source src={video} type="video/mp4" />
          Tu navegador no soporta el video.
        </video>
      </div>
    </section>
  </>
);

// Contact Pages for different types
const MemberContactPage = () => (
  <section id="contacto" className="section contact-section">
    <div className="contact-grid">
      <div className="contact-copy">
        <h2>Únete a nuestra comunidad</h2>
        <p>Conviértete en miembro de México in Tech y accede a:</p>
        <ul>
          <li>Eventos y webinars exclusivos</li>
          <li>Notificaciones sobre nuevos cursos y talleres</li>
          <li>Red de networking con otros desarrolladores</li>
          <li>Recursos y materiales de aprendizaje</li>
        </ul>
      </div>
      <ContactForm
        contactType="member"
        title="Solicitud de membresía"
        description="Completa el formulario para unirte a nuestra comunidad"
      />
    </div>
  </section>
);

const LeaderContactPage = () => (
  <section id="contacto" className="section contact-section">
    <div className="contact-grid">
      <div className="contact-copy">
        <h2>Lidera el crecimiento</h2>
        <p>¿Quieres ser parte del equipo que organiza eventos y lidera el crecimiento de la comunidad?</p>
        <ul>
          <li>Organiza eventos y meetups</li>
          <li>Lidera iniciativas de crecimiento comunitario</li>
          <li>Colabora en la estrategia de la comunidad</li>
          <li>Ayuda a otros desarrolladores a crecer</li>
        </ul>
      </div>
      <ContactForm
        contactType="leader"
        title="Solicitud para ser líder"
        description="Comparte con nosotros tu interés en liderar la comunidad"
      />
    </div>
  </section>
);

const SpeakerContactPage = () => (
  <section id="contacto" className="section contact-section">
    <div className="contact-grid">
      <div className="contact-copy">
        <h2>Comparte tu conocimiento</h2>
        <p>¿Tienes experiencia y quieres compartirla con la comunidad?</p>
        <ul>
          <li>Da charlas y talleres ocasionales</li>
          <li>Comparte tu experiencia técnica</li>
          <li>Ayuda a otros a aprender</li>
          <li>Colabora en eventos y webinars</li>
        </ul>
      </div>
      <ContactForm
        contactType="speaker"
        title="Solicitud para ser speaker"
        description="Cuéntanos sobre ti y los temas que te gustaría compartir"
      />
    </div>
  </section>
);

const BusinessContactPage = () => (
  <section id="contacto" className="section contact-section">
    <div className="contact-grid">
      <div className="contact-copy">
        <h2>Patrocina la comunidad</h2>
        <p>¿Tu empresa quiere apoyar el crecimiento de la comunidad tech en México?</p>
        <ul>
          <li>Patrocinio de eventos y webinars</li>
          <li>Colaboraciones estratégicas</li>
          <li>Oportunidades de networking</li>
          <li>Apoyo al ecosistema tech mexicano</li>
        </ul>
      </div>
      <ContactForm
        contactType="business"
        title="Solicitud de patrocinio"
        description="Hablemos sobre cómo podemos colaborar juntos"
      />
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
                <li>
                  <Link to="/" onClick={closeMenu} className="nav-link-item">
                    <FaHome className="nav-link-icon" aria-hidden />
                    <span>Inicio</span>
                  </Link>
                </li>
                <li>
                  <a href="/#acercade" onClick={closeMenu} className="nav-link-item">
                    <FaInfoCircle className="nav-link-icon" aria-hidden />
                    <span>Acerca de</span>
                  </a>
                </li>
                <li>
                  <a href="/#video" onClick={closeMenu} className="nav-link-item">
                    <FaVideo className="nav-link-icon" aria-hidden />
                    <span>Webinars</span>
                  </a>
                </li>
                <li>
                  <a href="/#eventos" onClick={closeMenu} className="nav-link-item">
                    <FaCalendarAlt className="nav-link-icon" aria-hidden />
                    <span>Eventos</span>
                  </a>
                </li>
                {/*<li><Link to="/cursos" onClick={closeMenu}>Cursos</Link></li>*/}
                {/*<li><Link to="/contact" onClick={closeMenu}>Contacto</Link></li>*/}
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
          <Route path="/contact" element={<Navigate to="/contact/member" replace />} />
          <Route path="/contact/member" element={<MemberContactPage />} />
          <Route path="/contact/leader" element={<LeaderContactPage />} />
          <Route path="/contact/speaker" element={<SpeakerContactPage />} />
          <Route path="/contact/business" element={<BusinessContactPage />} />
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
                <Link to="/contact/member" className="footer-link">
                  <FaUserPlus className="footer-link-icon" aria-hidden />
                  <span>Conviértete en miembro</span>
                </Link>
              </li>
              <li>
                <Link to="/contact/leader" className="footer-link">
                  <FaUserTie className="footer-link-icon" aria-hidden />
                  <span>Sé un líder</span>
                </Link>
              </li>
              <li>
                <Link to="/contact/speaker" className="footer-link">
                  <FaMicrophone className="footer-link-icon" aria-hidden />
                  <span>Sé un speaker</span>
                </Link>
              </li>
              <li>
                <Link to="/contact/business" className="footer-link">
                  <FaHandshake className="footer-link-icon" aria-hidden />
                  <span>Patrocinio empresarial</span>
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
