import React, { useState } from 'react';
import './App.css';
import Slider from './Slider';
import video from './assets/video.mp4';
import logo from './assets/logo.png';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
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

          {/* Botón hamburguesa */}
          <button className="hamburger" onClick={toggleMenu}>
            ☰
          </button>

          {/* Enlaces del menú */}
          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <li><a href="#inicio" onClick={closeMenu}>Inicio</a></li>
            <li><a href="#info" onClick={closeMenu}>Cursos</a></li>
            <li><a href="#contacto" onClick={closeMenu}>Contacto</a></li>
            <li><a href="#video" onClick={closeMenu}>Video</a></li>
          </ul>
        </nav>
      </header>

      <main>
        {/* Slider de Bienvenida */}
        <section id="inicio" className="section">
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
          <h2>Contáctanos</h2>
          <form className="contact-form">
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
                placeholder="tu@correo.com"
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
        </section>

        {/* Video */}
        <section id="video" className="section">
          <h2>Video de Presentación</h2>
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
        </div>
      </footer>
    </div>
  );
}

export default App;
