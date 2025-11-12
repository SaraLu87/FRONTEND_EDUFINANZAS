import { Container, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import "../componentes/PresupuestoInfo.css";

function PresupuestoInfo() {
  const navigate = useNavigate();
  const [mostrar, setMostrar] = useState([false, false, false]);

  // ⏱️ Control del tiempo de aparición de las tarjetas
  useEffect(() => {
    const timers = [
      setTimeout(() => setMostrar([true, false, false]), 500), // 1ra tarjeta
      setTimeout(() => setMostrar([true, true, false]), 1700), // 2da
      setTimeout(() => setMostrar([true, true, true]), 3400),  // 3ra
    ];
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <>
      <Encabezado monedas={200} />

      <motion.div
        className="presupuesto-info-fondo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <Container className="text-center py-5">
          <h1 className="titulo-presupuesto">
            💼 Lo que debes saber sobre el Presupuesto Personal
          </h1>

          {/* Contenedor principal animado */}
          <div className="contenedor-animado">
            {/* Tarjeta 1 - Izquierda */}
            {mostrar[0] && (
              <motion.div
                className="tarjeta-info tarjeta-azul posicion-izquierda"
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3>¿Qué es el Presupuesto Personal?</h3>
                <p>
                  Imagina que tu dinero es como un <strong>equipo de fútbol</strong> 
                  y tú eres el entrenador. El presupuesto es tu <strong>plan de juego</strong>: 
                  decides dónde va cada jugador (cada billete o moneda) antes de que empiece el partido.
                </p>
                <p>
                  Es un <strong>mapa simple</strong> que te ayuda a ver cómo manejar 
                  tus ingresos y gastos, para que alcances tus metas sin quedarte “en ceros”. ⚽💰
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
                <h3>📘 ¿Por qué es importante?</h3>
                <p>
                  ¡Porque te da el <strong>control de tu dinero</strong>!  
                  Así sabes si puedes comprar esa entrada al concierto o si es mejor ahorrar un poco más.
                </p>
                <p>
                  Tener un presupuesto te ayuda a tomar decisiones inteligentes y 
                  evitar sorpresas desagradables. 💡
                </p>
              </motion.div>
            )}

            {/* Tarjeta 3 - Derecha */}
            {mostrar[2] && (
              <motion.div
                className="tarjeta-info tarjeta-amarilla posicion-derecha"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3>🧾 ¿Qué incluye un Presupuesto?</h3>
                <ul className="lista-razones">
                  <li>
                    <strong>Ingresos:</strong> Tu mesada, regalos o dinero por trabajos extra.
                  </li>
                  <li>
                    <strong>Gastos:</strong> Comida, transporte, salidas, juegos y, por supuesto, ¡ahorro!
                  </li>
                  <li>
                    <strong>Metas:</strong> Lo que quieres lograr (un viaje, una compra, tu fondo de emergencia).
                  </li>
                </ul>
              </motion.div>
            )}
          </div>

          {/* Botón siguiente */}
          <motion.div whileHover={{ scale: 1.1 }} className="mt-5">
            <Button
              variant="success"
              onClick={() => navigate("/presupuesto-datos")}
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

export default PresupuestoInfo;
