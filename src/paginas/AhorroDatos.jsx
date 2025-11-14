import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import "../componentes/DatosGlobal.css";

import reglaImg from "../assets/regla.png";      // Imagen 1
import misionImg from "../assets/mision.png";    // Imagen 3
import monedasImg from "../assets/monedas.png";  // Imagen 6

function AhorroDatos() {
  const navigate = useNavigate();

  const datos = [
    {
      titulo: '💰 La "Regla 50/30/20": ¡El Truco Viral!',
      texto:
        "De todo el dinero que recibes, el 50% va a tus Necesidades, el 30% a tus Deseos y el 20% directo a AHORRO. Es una fórmula simple para dominar tus finanzas.",
      imagen: reglaImg,
      color: "verde",
    },
    {
      titulo: "🧠 El Costo de Oportunidad: El Superpoder de Elegir Bien.",
      texto:
        "Cada vez que gastas, renuncias a otra cosa. Cuando ahorras, sacrificas algo pequeño hoy (una gaseosa) para ganar algo más grande mañana (un viaje).",
      color: "azul",
    },
    {
      titulo: "🎮 El Efecto 'Completar la Misión' (Gamificación)",
      texto:
        "Si pones nombre y meta a tu ahorro (Ej. ‘Misión Consola PS5’), tu cerebro se motiva. ¡Funciona igual que un videojuego con barra de progreso!",
      imagen: misionImg,
      color: "morado",
    },
    {
      titulo: "⚡ Tu Cerebro Prefiere la Recompensa Instantánea, ¡Engáñalo!",
      texto:
        "Automatiza el ahorro. Si usas Nequi o Daviplata, crea un bolsillo: tu parte impulsiva nunca ve ese dinero y ¡ahorras sin darte cuenta!",
      color: "amarillo",
    },
    {
      titulo: "🧘‍♂️ Ahorrar Te Hace Sentir Más Inteligente y Menos Estresado.",
      texto:
        "Tener dinero ahorrado reduce el estrés y te da tranquilidad. ¡Las personas con ahorros se sienten más en control de su vida!",
      color: "celeste",
    },
    {
      titulo: "🪙 El Desafío de las Monedas",
      texto:
        "Guarda solo las monedas de $1.000 COP en un frasco cada semana. Te asombrará lo rápido que crece. ¡Convierte el cambio suelto en un tesoro!",
      imagen: monedasImg,
      color: "rosa",
    },
  ];

  return (
    <>
      <Encabezado monedas={250} />

      <motion.div
        className="ahorro-datos-fondo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Container className="py-5 text-center">
          <h1 className="titulo-datos">📊 Datos Curiosos sobre el Ahorro</h1>
          <p className="subtitulo-datos">
            ¡Descubre cómo pequeños hábitos pueden crear grandes cambios financieros!
          </p>

          <Row xs={1} md={2} lg={3} className="g-4 mt-4">
            {datos.map((dato, i) => (
              <Col key={i}>
                <motion.div
                  className={`tarjeta-dato tarjeta-${dato.color}`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {dato.imagen && (
                    <img
                      src={dato.imagen}
                      alt={dato.titulo}
                      className="imagen-dato"
                    />
                  )}
                  <h5>{dato.titulo}</h5>
                  <p>{dato.texto}</p>
                </motion.div>
              </Col>
            ))}
          </Row>

          <motion.div whileHover={{ scale: 1.1 }} className="mt-5">
            <Button
              variant="success"
              className="boton-siguiente"
              onClick={() => navigate("/ahorro-preguntas")}
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

export default AhorroDatos;
