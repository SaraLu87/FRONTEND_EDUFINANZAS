import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMonedas } from "../componentes/MonedasContext";
import { useProgreso } from "../componentes/ProgresoContext";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import "../componentes/PreguntasGlobal.css";

function AhorroPreguntas() {
  const navigate = useNavigate();
  const { ganarMonedas } = useMonedas();
  const { progreso, actualizarProgreso } = useProgreso();

  const preguntas = [
    {
      pregunta: "¿Qué significa ahorrar?",
      opciones: [
        "A) Gastar todo el dinero en cosas que quiero",
        "B) Guardar una parte del dinero para usarla después",
        "C) Pedir dinero prestado para comprar más cosas",
      ],
      respuestacorrecta: 1,
    },
    {
      pregunta: "¿Cuál es la mejor forma de empezar a ahorrar?",
      opciones: [
        "A) Esperar a tener mucho dinero",
        "B) Ahorrar una parte de lo que gano o recibo",
        "C) Usar todo el dinero y después preocuparse",
      ],
      respuestacorrecta: 1,
    },
    {
      pregunta: "¿Por qué es importante ahorrar?",
      opciones: [
        "A) Porque da tranquilidad y ayuda a cumplir metas",
        "B) Porque es aburrido y no sirve para nada",
        "C) Porque así puedo gastar más",
      ],
      respuestacorrecta: 0,
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
      actualizarProgreso("ahorro", Math.min(progreso.ahorro + 33.3, 100));
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
              <h2>🎉 ¡Completaste el reto de Ahorro!</h2>
              <p>Ganaste 60 monedas y avanzaste en tu progreso 🚀</p>

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

export default AhorroPreguntas;
