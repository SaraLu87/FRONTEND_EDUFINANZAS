import { Container, Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMonedas } from "../componentes/MonedasContext";
import { useProgreso } from "../componentes/ProgresoContext";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import "../componentes/PresupuestoPreguntas.css";

function PresupuestoPreguntas() {
  const navigate = useNavigate();
  const { monedas, ganarMonedas } = useMonedas();
  const { progreso, actualizarProgreso } = useProgreso();

  const preguntas = [
    {
      id: 1,
      texto:
        "Si tu mesada es de $30.000 COP a la semana, ¿cuál de estas opciones muestra que estás usando un Presupuesto Personal?",
      opciones: [
        "Gastas los $30.000 en lo primero que se te antoja, sin pensar.",
        "Decides que $10.000 son para transporte, $10.000 para salidas y $10.000 los guardas para tu ahorro.",
        "Le pides más dinero a tus padres antes de que termine la semana.",
      ],
      correcta: 1,
    },
    {
      id: 2,
      texto: "¿Cuál es el principal beneficio de tener un Presupuesto Personal?",
      opciones: [
        "Te prohíbe comprar cualquier cosa divertida.",
        "Te dice exactamente cuánto dinero tienen tus amigos.",
        "Te ayuda a saber dónde va tu dinero y te da control para alcanzar tus metas sin quedarte sin fondos.",
      ],
      correcta: 2,
    },
    {
      id: 3,
      texto:
        'Tu amigo te dice: "¡Uff, siempre me quedo sin dinero antes de que termine el mes y no sé por qué!". ¿Qué le recomendarías hacer primero?',
      opciones: [
        "Que gane más dinero, sin importar cómo.",
        "Que haga un Presupuesto Personal para ver en qué está gastando y pueda organizarse.",
        "Que deje de salir con sus amigos para no gastar nada.",
      ],
      correcta: 1,
    },
  ];

  const [indice, setIndice] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [completado, setCompletado] = useState(false);

  const validarRespuesta = () => {
    const pregunta = preguntas[indice];
    if (respuestaSeleccionada === pregunta.correcta) {
      if (indice < preguntas.length - 1) {
        setMensaje("✅ ¡Correcto! Vamos con la siguiente pregunta...");
        setTimeout(() => {
          setIndice(indice + 1);
          setRespuestaSeleccionada(null);
          setMensaje("");
        }, 1200);
      } else {
        // ✅ Reto completado
        setMensaje("🎉 ¡Has completado todas las preguntas!");
        setCompletado(true);
        ganarMonedas(60);
        const nuevoProgreso = Math.min(progreso.presupuesto + 33.3, 100);
        actualizarProgreso("presupuesto", nuevoProgreso);
      }
    } else {
      setMensaje("❌ Respuesta incorrecta. Intenta nuevamente.");
    }
  };

  return (
    <>
      <Encabezado monedas={monedas} />

      <motion.div
        className="preguntas-fondo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Container className="text-center py-5">
          <h1 className="titulo-preguntas">🧩 Preguntas del Presupuesto Personal</h1>
          <h5 className="subtitulo-preguntas mb-5 text-muted">
            ¡Pon a prueba tu habilidad de entrenador financiero!
          </h5>

          <Card className="tarjeta-pregunta shadow-lg border-0 rounded-4 p-4 mx-auto">
            <Card.Body>
              <motion.h4
                className="texto-pregunta fw-bold mb-4"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                {preguntas[indice].texto}
              </motion.h4>

              <div className="opciones-contenedor">
                {preguntas[indice].opciones.map((opcion, i) => {
                  const letras = ["A", "B", "C"];
                  const seleccionada = respuestaSeleccionada === i;
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setRespuestaSeleccionada(i)}
                      className={`opcion-ovalada ${seleccionada ? "seleccionada" : ""}`}
                    >
                      <div className={`radio-circulo ${seleccionada ? "activo" : ""}`}>
                        {seleccionada && <div className="radio-punto"></div>}
                      </div>
                      <span className="letra-opcion">{letras[i]}.</span>
                      <span className="texto-opcion">{opcion}</span>
                    </motion.div>
                  );
                })}
              </div>

              {mensaje && <p className="mensaje mt-4">{mensaje}</p>}

              <Button
                variant="primary"
                className="mt-4"
                onClick={validarRespuesta}
                disabled={respuestaSeleccionada === null}
              >
                Responder
              </Button>

              {completado && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4"
                >
                  <Button
                    variant="success"
                    onClick={() => navigate("/temas")}
                    className="boton-final"
                  >
                    Finalizar ✅
                  </Button>
                </motion.div>
              )}
            </Card.Body>
          </Card>
        </Container>
      </motion.div>

      <Footer />
    </>
  );
}

export default PresupuestoPreguntas;
