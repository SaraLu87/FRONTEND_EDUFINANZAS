import { Container, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import "../componentes/GlobalInfo.css";

function AhorroInfo() {
  const navigate = useNavigate();
  const [mostrar, setMostrar] = useState([false, false, false]);

  // ⏱️ Control del tiempo de aparición de cada tarjeta
  useEffect(() => {
    const timers = [
      setTimeout(() => setMostrar([true, false, false]), 500), // Aparece la 1
      setTimeout(() => setMostrar([true, true, false]), 1700), // Aparece la 2
      setTimeout(() => setMostrar([true, true, true]), 3400), // Aparece la 3
    ];
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <>
      <Encabezado monedas={200} />

      <motion.div
        className="ahorro-info-fondo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <Container className="text-center py-5">
          <h1 className="titulo-ahorro">💎 Lo que debes saber sobre el Ahorro</h1>

          {/* Contenedor principal con las tres tarjetas */}
          <div className="contenedor-animado">
            {/* Tarjeta 1 - Izquierda */}
            {mostrar[0] && (
              <motion.div
                className="tarjeta-info tarjeta-verde posicion-izquierda"
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <h3>¿Qué es el Ahorro?</h3>
                <p>
                  Es como guardar un <strong>“tesoro”</strong> para tu futuro. 
                  Significa apartar dinero que tienes hoy, para usarlo en algo que quieres o necesitas mañana.
                </p>
                <p>
                  Imagina que recibes tu mesada o dinero por algún trabajo. 
                  En vez de gastarlo todo en dulces y videojuegos, ¡apartas una parte para esa patineta que tanto quieres o para un viaje con amigos! 🎮🛹
                </p>
              </motion.div>
            )}

            {/* Tarjeta 2 - Centro */}
            {mostrar[1] && (
              <motion.div
                className="tarjeta-info tarjeta-azul posicion-centro"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <h3>💡 ¡Págate a ti mismo primero!</h3>
                <p>
                  Esto significa que, apenas recibas dinero, la primera persona a la que le “pagas” es a tu 
                  <strong> “Yo del Futuro”</strong>. 
                  Así aseguras que tu tesoro crezca y puedas cumplir tus metas.
                </p>
                <p>
                  Ahorrar no es dejar de disfrutar, es planear para disfrutar más adelante. 
                  ¡Tu versión del futuro te lo agradecerá!
                </p>
              </motion.div>
            )}

            {/* Tarjeta 3 - Derecha */}
            {mostrar[2] && (
              <motion.div
                className="tarjeta-info tarjeta-morada posicion-derecha"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <h3>🎯 ¿Por qué Ahorrar?</h3>
                <ul className="lista-razones">
                  <li><strong>Para cumplir tus sueños:</strong> Es el camino más directo a lo que deseas.</li>
                  <li><strong>Para emergencias:</strong> Te da tranquilidad ante imprevistos.</li>
                  <li><strong>Para tener libertad:</strong> Tener dinero guardado te da opciones y seguridad.</li>
                </ul>
              </motion.div>
            )}
          </div>

          {/* 🔜 Botón siguiente */}
          <motion.div whileHover={{ scale: 1.1 }} className="mt-5">
            <Button
              variant="success"
              onClick={() => navigate("/ahorro-datos")}
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

export default AhorroInfo;
