import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMonedas } from "../componentes/MonedasContext";
import { useProgreso } from "../componentes/ProgresoContext";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import "../componentes/PreguntasGlobal.css";

function SeguridadPreguntas() {
  const navigate = useNavigate();
  const { ganarMonedas } = useMonedas();
  const { actualizarProgreso } = useProgreso();

  const preguntas = [
    {
      pregunta:
        "Si recibes un mensaje que parece de tu banco pidiendo un enlace, ¿qué debes hacer?",
      opciones: [
        "A) Hacer clic de inmediato",
        "B) Ignorarlo. Es phishing",
        "C) Pasárselo a un amigo",
      ],
      respuestacorrecta: 1,
    },
    {
      pregunta:
        "Antes de pagar en línea, ¿qué debes revisar en la página?",
      opciones: [
        "A) Que tenga colores bonitos",
        "B) Que empiece por https:// y tenga candado",
        "C) Que te pida instalar un programa raro",
      ],
      respuestacorrecta: 1,
    },
    {
      pregunta: "¿Cuál es una contraseña segura?",
      opciones: [
        "A) Tu fecha de nacimiento",
        "B) M!Super$3gur@",
        "C) La misma en todas tus redes",
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
      actualizarProgreso("seguridad", 100);
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
              <h2>🏆 ¡Felicidades, completaste Seguridad Financiera!</h2>
              <p>Eres oficialmente un Superhéroe Digital 🦸‍♀️🦸‍♂️</p>

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

export default SeguridadPreguntas;
