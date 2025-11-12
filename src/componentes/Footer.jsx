import React from "react";
import "./Footer.css";
import logo from "../assets/logo.png";

const Footer = () => {
  const añoActual = new Date().getFullYear();

  return (
    <footer className="footer-edufinanzas">
      <div className="container footer-contenido">
        {/* Logo y descripción */}
        <div className="footer-izquierda">
          <div className="footer-logo">
            <div className="logo.png">💲</div>
            <h3 className="logo-texto">EduFinanzas</h3>
          </div>
          <p className="footer-descripcion">
            Educación financiera diseñada para jóvenes de 14 a 17 años. <br />
            Aprende a manejar tu dinero de forma inteligente y responsable.
          </p>
        </div>

        {/* Enlaces rápidos */}
        <div className="footer-isquierda">
          <h5 className="footer-titulo">Enlaces Rápidos</h5>
          <ul className="footer-lista">
            <li>
              <a href="#que-aprenderas" className="footer-enlace">
                ¿Qué aprenderás?
              </a>
            </li>
            <li>
              <a href="#tips" className="footer-enlace">
                Tips Financieros
              </a>
            </li>
            <li>
              <a href="/inicio" className="footer-enlace">
                Iniciar Sesión
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="footer-copy">
        <p>
          © {añoActual} EduFinanzas. Todos los derechos reservados. | Proyecto
          educativo de la Corporación Universitaria Autónoma del Cauca
        </p>
      </div>
    </footer>
  );
};

export default Footer;
