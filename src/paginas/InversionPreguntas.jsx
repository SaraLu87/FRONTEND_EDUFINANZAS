import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMonedas } from "../componentes/MonedasContext";
import { useProgreso } from "../componentes/ProgresoContext";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import "../componentes/PreguntasGlobal.css";

function InversionPreguntas() {
  const navigate = useNavigate();
  const { ganarMonedas } = useMonedas();
  const { progreso, actualizarProgreso } = useProgreso();

  const preguntas = [
    {
      pregunta: "Si 'Ahorrar' es guardar tu dinero, ¿qué significa 'Invertir'?",
      opciones: [
        "A) Gastar tu dinero en algo divertido hoy",
        "B) Poner tu dinero a trabajar para que genere más en el futuro",
        "C) Guardarlo debajo del colchón",
      ],
      respuestacorrecta: 1,
    },
    {
      pregunta:
        "¿Cuál es el superpoder que tienen los jóvenes cuando invierten?",
      opciones: [
        "A) La suerte",
        "B) Comprar más cosas rápido",
        "C) El tiempo: su dinero crece por más años",
      ],
      respuestacorrecta: 2,
    },
    {
      pregunta: "¿Qué significa 'riesgo' al invertir?",
      opciones: [
        "A) Siempre perderás todo",
        "B) Puedes perder una parte si las cosas no salen como esperas",
        "C) Siempre ganarás mucho y rápido",
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
      actualizarProgreso("inversion", Math.min(progreso.inversion + 33.3, 100));
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
              <h2>🎉 ¡Completaste el reto de Inversión!</h2>
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

export default InversionPreguntas;
