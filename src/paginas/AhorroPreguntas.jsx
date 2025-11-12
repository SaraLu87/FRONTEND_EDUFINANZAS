import { useState } from "react";
import { Container, Button, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useMonedas } from "../componentes/MonedasContext";
import { useProgreso } from "../componentes/ProgresoContext";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import "../componentes/AhorroPreguntas.css";

function AhorroPreguntas() {
  const navigate = useNavigate();
  const { ganarMonedas } = useMonedas();
  const { progreso, actualizarProgreso } = useProgreso();

  const preguntas = [
    {
      texto: "¿Qué significa ahorrar?",
      opciones: [
        "Gastar todo el dinero en cosas que quiero",
        "Guardar una parte del dinero para usarla después",
        "Pedir dinero prestado para comprar más cosas",
      ],
      correcta: 1,
    },
    {
      texto: "¿Cuál es la mejor forma de empezar a ahorrar?",
      opciones: [
        "Esperar a tener mucho dinero",
        "Ahorrar una parte de lo que gano o recibo",
        "Usar todo el dinero y después preocuparse",
      ],
      correcta: 1,
    },
    {
      texto: "¿Por qué es importante ahorrar?",
      opciones: [
        "Porque da tranquilidad y ayuda a cumplir metas",
        "Porque es aburrido y no sirve para nada",
        "Porque así puedo gastar más",
      ],
      correcta: 0,
    },
  ];

  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [terminado, setTerminado] = useState(false);

  const verificarRespuesta = () => {
    if (seleccion === null) {
      setMensaje("⚠️ Debes seleccionar una respuesta.");
      return;
    }

    if (seleccion === preguntas[indice].correcta) {
      setMensaje("✅ ¡Correcto!");
      if (indice < preguntas.length - 1) {
        setTimeout(() => {
          setSeleccion(null);
          setIndice(indice + 1);
          setMensaje("");
        }, 1200);
      } else {
        // Terminó todas correctamente 🎉
        setMensaje("🎉 ¡Excelente! Has completado el reto de ahorro.");
        setTerminado(true);
        ganarMonedas(60);
        actualizarProgreso("ahorro", Math.min(progreso.ahorro + 33.3, 100));
      }
    } else {
      setMensaje("❌ Respuesta incorrecta. ¡Intenta nuevamente!");
    }
  };

  return (
    <>
      <Encabezado />
      <motion.div
        className="preguntas-fondo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Container className="text-center py-5">
          <h1 className="titulo-preguntas">🧩 Reto de Preguntas: Ahorro</h1>
          {!terminado ? (
            <motion.div
              key={indice}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="tarjeta-pregunta mx-auto shadow">
                <Card.Body>
                  <h4 className="pregunta-texto">{preguntas[indice].texto}</h4>
                  <div className="opciones-container">
                    {preguntas[indice].opciones.map((opcion, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className={`opcion ${
                          seleccion === i ? "seleccionada" : ""
                        }`}
                        onClick={() => setSeleccion(i)}
                      >
                        {opcion}
                      </motion.div>
                    ))}
                  </div>
                  <p className="mensaje">{mensaje}</p>
                  <Button variant="success" className="mt-3" onClick={verificarRespuesta}>
                    Confirmar
                  </Button>
                </Card.Body>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Card className="tarjeta-final mx-auto shadow">
                <Card.Body>
                  <h3>🎯 ¡Completaste el reto de Ahorro!</h3>
                  <p>Has ganado 60 monedas y avanzado en tu progreso.</p>
                  <Button
                    variant="primary"
                    className="mt-3"
                    onClick={() => navigate("/temas")}
                  >
                    Ir al siguiente tema ➡️
                  </Button>
                </Card.Body>
              </Card>
            </motion.div>
          )}
        </Container>
      </motion.div>
      <Footer />
    </>
  );
}

export default AhorroPreguntas;
