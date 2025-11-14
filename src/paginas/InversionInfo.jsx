import { Container, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import "../componentes/GlobalInfo.css";

function InversionInfo() {
  const navigate = useNavigate();
  const [mostrar, setMostrar] = useState([false, false, false]);

  // ⏱️ Control del tiempo de aparición de las tarjetas
  useEffect(() => {
    const timers = [
      setTimeout(() => setMostrar([true, false, false]), 500),
      setTimeout(() => setMostrar([true, true, false]), 1700),
      setTimeout(() => setMostrar([true, true, true]), 3400),
    ];
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <>
      <Encabezado monedas={200} />

      <motion.div
        className="inversion-info-fondo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <Container className="text-center py-5">
          <h1 className="titulo-inversion">
            📈 Módulo 3: La Inversión - ¡Haciendo que tu Dinero Tenga Superpoderes! ✨
          </h1>

          {/* Contenedor principal de las tarjetas */}
          <div className="contenedor-animado">
            {/* Tarjeta 1 - Izquierda */}
            {mostrar[0] && (
              <motion.div
                className="tarjeta-info tarjeta-azul posicion-izquierda"
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3>💰 ¿Qué es la Inversión?</h3>
                <p>
                  Imagina que tienes una pequeña <strong>semilla</strong> (tu dinero ahorrado).
                  Invertir es como <strong>plantar esa semilla</strong> en un buen terreno
                  (un lugar donde el dinero puede crecer) para que, con el tiempo,
                  se convierta en un árbol que dé más frutos (más dinero). 🌱💸
                </p>
                <p>
                  No es magia, es poner tu dinero a trabajar. En lugar de dejarlo quieto
                  en una alcancía o bajo el colchón, ¡lo usas para generar más dinero!
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
                <h3>🔑 Conceptos Clave</h3>
                <ul className="lista-claves">
                  <li>
                    <strong>Ganancia (o Rendimiento):</strong> esos “frutos” que da tu inversión.
                    ¡Es el dinero extra que ganas!
                  </li>
                  <li>
                    <strong>Riesgo:</strong> la posibilidad de que no todo salga como esperas y
                    pierdas una parte. Como en un juego, ¡a veces se gana y a veces se aprende!
                  </li>
                  <li>
                    <strong>Tiempo:</strong> la inversión necesita paciencia. Cuanto más tiempo dejes
                    tu dinero invertido, más puede crecer. ⏳
                  </li>
                </ul>
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
                <h3>💡 Tip de Inversor</h3>
                <p>
                  No necesitas millones para comenzar a invertir. Hoy existen apps y bancos que
                  te permiten invertir desde montos pequeños. Lo importante es <strong>empezar</strong>
                  y aprender cómo funciona el mundo financiero.
                </p>
                <p>
                  ¡Tu dinero tiene superpoderes, solo necesita una misión para cumplir! 🚀
                </p>
              </motion.div>
            )}
          </div>

          {/* Botón siguiente */}
          <motion.div whileHover={{ scale: 1.1 }} className="mt-5">
            <Button
              variant="success"
              onClick={() => navigate("/inversion-datos")}
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

export default InversionInfo;
