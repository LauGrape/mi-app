import React, { useEffect, useState } from 'react';
import './App.css';
import Slider from './Slider';
import video from './assets/video.mp4';
import logo from './assets/logo.png';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaTwitch
} from 'react-icons/fa';

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
          <div className="nav-logo">
            {/* Reemplazamos el <h1> por la imagen */}
            <img src={logo} alt="México in Tech" className="logo" />
          </div>

          <button className="theme-toggle" onClick={toggleTheme} aria-label="Cambiar tema">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Botón hamburguesa */}
          <button className="hamburger" onClick={toggleMenu}>
            ☰
          </button>

          {/* Enlaces del menú */}
          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <li><a href="#inicio" onClick={closeMenu}>Inicio</a></li>
            <li><a href="#video" onClick={closeMenu}>Webinars</a></li>
            <li><a href="#info" onClick={closeMenu}>Cursos</a></li>
            <li><a href="#contacto" onClick={closeMenu}>Contacto</a></li>
          </ul>
        </nav>
      </header>

      <main>
        {/* Slider de Bienvenida */}
        <section id="inicio" className="section">
          <h2>Bienvenidos a México in Tech</h2>
          <h3>Algunos de nuestros webinars</h3>
          <Slider />
        </section>

        {/* Sección de cursos */}
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

        {/* Formulario de contacto */}
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
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()} México in Tech. Todos los derechos
          reservados.
        </p>

        <div className="social-icons">
          <a
            href="https://www.facebook.com/mxintech/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>

          <a
            href="https://www.linkedin.com/company/mxintech/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://www.youtube.com/mexicointech"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube />
          </a>

          <a
            href="https://x.com/mxintech"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>

          <a
            href="https://www.tiktok.com/mxintech"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTiktok />
          </a>

          <a
            href="https://www.twitch.tv/mxintech"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitch />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
