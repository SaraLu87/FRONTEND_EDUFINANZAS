import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMonedas } from "../componentes/MonedasContext";
import { useProgreso } from "../componentes/ProgresoContext";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import "../componentes/PreguntasGlobal.css";

function PresupuestoPreguntas() {
  const navigate = useNavigate();
  const { ganarMonedas } = useMonedas();
  const { progreso, actualizarProgreso } = useProgreso();

  const preguntas = [
    {
      pregunta:
        "Si tu mesada es de $30.000 COP a la semana, ¿cuál de estas opciones es un Presupuesto Personal?",
      opciones: [
        "A) Gastar todo sin pensar",
        "B) 10.000 transporte, 10.000 salidas, 10.000 ahorro",
        "C) Pedir más dinero antes de que termine la semana",
      ],
      respuestacorrecta: 1,
    },
    {
      pregunta: "¿Cuál es el principal beneficio de tener un Presupuesto?",
      opciones: [
        "A) No te deja comprar nada divertido",
        "B) Saber a dónde va tu dinero y alcanzar tus metas",
        "C) Controlar el dinero de tus amigos",
      ],
      respuestacorrecta: 1,
    },
    {
      pregunta:
        "Tu amigo siempre se queda sin dinero. ¿Qué debería hacer primero?",
      opciones: [
        "A) Ganar más dinero",
        "B) Hacer un Presupuesto Personal",
        "C) No volver a salir",
      ],
      respuestacorrecta: 1,
    },
  ];

  const [preguntaActual, setPreguntaActual] = useState(0);
  const [seleccion, setSeleccion] = useState(null);
  const [respondidaCorrecta, setRespondidaCorrecta] = useState(false);
  const [mostrarFinal, setMostrarFinal] = useState(false);

  const responder = (i) => {
    setSeleccion(i);
    setRespondidaCorrecta(i === preguntas[preguntaActual].respuestacorrecta);
  };

  const siguientePregunta = () => {
    if (preguntaActual < preguntas.length - 1) {
      setPreguntaActual(preguntaActual + 1);
      setSeleccion(null);
      setRespondidaCorrecta(false);
    } else {
      ganarMonedas(60);
      actualizarProgreso(
        "presupuesto",
        Math.min(progreso.presupuesto + 33.3, 100)
      );
      setMostrarFinal(true);
    }
  };

  return (
    <>
      <Encabezado />

      <div className="preguntas-fondo">
        <Container className="text-center py-5">

          {!mostrarFinal ? (
            <>
              <h1 className="titulo-pregunta">
                {preguntas[preguntaActual].pregunta}
              </h1>

              <div className="contenedor-opciones">
                {preguntas[preguntaActual].opciones.map((opcion, i) => (
                  <div
                    key={i}
                    className={`opcion ${
                      seleccion === i
                        ? i === preguntas[preguntaActual].respuestacorrecta
                          ? "correcta"
                          : "incorrecta"
                        : ""
                    }`}
                    onClick={() => responder(i)}
                  >
                    <div
                      className={`circulo ${
                        seleccion === i
                          ? i === preguntas[preguntaActual].respuestacorrecta
                            ? "marcado-correcto"
                            : "marcado-incorrecto"
                          : ""
                      }`}
                    ></div>
                    <span>{opcion}</span>
                  </div>
                ))}
              </div>

              {respondidaCorrecta && (
                <Button
                  variant="success"
                  className="boton-siguiente"
                  onClick={siguientePregunta}
                >
                  Siguiente ➡️
                </Button>
              )}
            </>
          ) : (
            <div className="final-preguntas">
              <h2>🎉 ¡Completaste el reto de Presupuesto!</h2>
              <p>Ganaste 60 monedas y avanzaste en tu progreso.</p>

              <Button
                variant="primary"
                className="boton-volver"
                onClick={() => navigate("/temas")}
              >
                Volver al inicio
              </Button>
            </div>
          )}

        </Container>
      </div>

      <Footer />
    </>
  );
}

export default PresupuestoPreguntas;
