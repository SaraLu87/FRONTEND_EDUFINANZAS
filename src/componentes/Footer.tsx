import "./Footer.css"

const Footer = () => {
    const añoActual = new Date().getFullYear()

    return (
        <footer className="footer-edufinanzas">
            <div className="container">
                <div className="row g-4">
                    {/* Columna 1: Logo y descripción */}
                    <div className="col-md-4">
                        <div className="footer-logo">
                            <img
                                src="/logo.png"
                                alt="Logo EduFinanzas"
                                className="logo-circulo"
                                />
                            <h3 className="logo-texto">EduFinanzas</h3>
                        </div>
                        <p className="footer-descripcion">
                            Educación financiera diseñada para jóvenes de 14-17 años. Aprende a manejar tu dinero de forma inteligente
                            y responsable.
                        </p>
                    </div>

                    {/* Columna 2: Enlaces rápidos */}
                    <div className="col-md-4">
                        <h4 className="footer-titulo">Enlaces Rápidos</h4>
                        <ul className="footer-lista">
                            <li>
                                <a href="#que-aprenderas" className="footer-enlace">
                                    ¿Qué aprenderás?
                                </a>
                            </li>
                            <li>
                                <a href="#que-aprenderas" className="footer-enlace">
                                    Tips Financieros
                                </a>
                            </li>
                            <li>
                                <a href="/login" className="footer-enlace">
                                    Iniciar Sesión
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Columna 3: Universidad */}
                    <div className="col-md-4">
                        <h4 className="footer-titulo">Proyecto Universitario</h4>
                        <p className="footer-universidad">
                            <strong>Corporación Universitaria Autónoma del Cauca</strong>
                        </p>
                        <a
                            href="https://portal.uniautonoma.edu.co/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-universidad"
                        >
                            Visitar sitio web
                        </a>
                    </div>
                </div>

                {/* Línea divisoria */}
                <hr className="footer-divisor" />

                {/* Copyright */}
                <div className="footer-copyright">
                    <p className="mb-0">
                        © {añoActual} EduFinanzas. Todos los derechos reservados. | Proyecto educativo de la Corporación
                        Universitaria Autónoma del Cauca
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
