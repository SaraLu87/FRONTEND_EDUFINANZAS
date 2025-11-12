import { Container, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import "../componentes/SeguridadInfo.css";

function SeguridadInfo() {
  const navigate = useNavigate();
  const [mostrar, setMostrar] = useState([false, false, false]);

  // ⏱️ Control del tiempo de aparición de las tarjetas
  useEffect(() => {
    const timers = [
      setTimeout(() => setMostrar([true, false, false]), 500),   // 1ra tarjeta
      setTimeout(() => setMostrar([true, true, false]), 1700),   // 2da
      setTimeout(() => setMostrar([true, true, true]), 3400),    // 3ra
    ];
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <>
      <Encabezado monedas={200} />

      <motion.div
        className="seguridad-info-fondo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <Container className="text-center py-5">
          <h1 className="titulo-seguridad">
            🛡️ Módulo 4: Seguridad Financiera
          </h1>
          <h4 className="subtitulo-seguridad mb-5">
            ¡Sé un Súper Héroe Digital con tu Dinero! 🦸‍♀️🦸‍♂️
          </h4>

          <div className="contenedor-animado">
            {/* Tarjeta 1 - Izquierda */}
            {mostrar[0] && (
              <motion.div
                className="tarjeta-info tarjeta-azul posicion-izquierda"
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3>🔐 ¿Qué es la Seguridad Financiera?</h3>
                <p>
                  Imagina que tu dinero y tu información personal son como un 
                  <strong> tesoro digital</strong>. La Seguridad Financiera es tu 
                  <strong> escudo protector</strong> contra los “villanos” (estafadores y hackers)
                  que quieren robarlo.  
                </p>
                <p>
                  Se trata de tener <strong>hábitos inteligentes</strong> cuando usas dinero en línea 
                  o compartes información en tus dispositivos.
                </p>
              </motion.div>
            )}

            {/* Tarjeta 2 - Centro */}
            {mostrar[1] && (
              <motion.div
                className="tarjeta-info tarjeta-verde posicion-centro"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3>🧩 Concepto Clave: Contraseña Fuerte</h3>
                <p>
                  Es tu <strong>primera línea de defensa</strong>.  
                  No debe ser fácil de adivinar — olvida usar tu cumpleaños o “1234”.  
                  Usa una mezcla de letras, números y símbolos.  
                </p>
                <p>Piensa en ella como tu <strong>escudo personal digital</strong> 🛡️</p>
              </motion.div>
            )}

            {/* Tarjeta 3 - Derecha */}
            {mostrar[2] && (
              <motion.div
                className="tarjeta-info tarjeta-morada posicion-derecha"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3>🚨 Phishing y Privacidad de Datos</h3>
                <ul className="lista-razones">
                  <li>
                    <strong>Phishing:</strong> trampas o mensajes falsos que buscan 
                    que compartas tu información. ¡Detectarlas es tu superpoder!
                  </li>
                  <li>
                    <strong>Privacidad de Datos:</strong> tú decides quién puede ver y 
                    usar tu información. ¡Tú tienes el control! 🧠
                  </li>
                </ul>
              </motion.div>
            )}
          </div>

          {/* Botón siguiente */}
          <motion.div whileHover={{ scale: 1.1 }} className="mt-5">
            <Button
              variant="success"
              onClick={() => navigate("/seguridad-datos")}
              className="boton-siguiente"
            >
              Siguiente ➡️
            </Button>
          </motion.div>
        </Container>
      </motion.div>

      <Footer />
    </>
  );
}

export default SeguridadInfo;
