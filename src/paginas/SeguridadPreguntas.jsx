import { Container, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMonedas } from "../componentes/MonedasContext";
import { useProgreso } from "../componentes/ProgresoContext";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import "../componentes/SeguridadPreguntas.css";

function SeguridadPreguntas() {
  const navigate = useNavigate();
  const { monedas, ganarMonedas } = useMonedas();
  const { actualizarProgreso } = useProgreso();

  const preguntas = [
    {
      pregunta:
        "Si recibes un mensaje que parece de tu banco y te pide hacer clic en un enlace para 'verificar tu cuenta' o si no la cierran, ¿qué deberías hacer?",
      opciones: [
        "A) Clic inmediatamente en el enlace para evitar que cierren tu cuenta.",
        "B) Ignorarlo, porque seguramente es un 'phishing' (trampa) que busca robar tus datos.",
        "C) Darle el mensaje a un amigo para que él lo revise primero.",
      ],
      correcta: 1,
    },
    {
      pregunta:
        "Quieres comprar algo en línea. ¿Qué es lo primero que deberías revisar para saber si la página es segura antes de poner tus datos de pago?",
      opciones: [
        "A) Que tenga muchos colores bonitos.",
        "B) Que la dirección web empiece con 'https://' y tenga un icono de candado cerrado.",
        "C) Que te pida instalar un programa raro para poder comprar.",
      ],
      correcta: 1,
    },
    {
      pregunta:
        "¿Cuál de estas es la mejor opción para crear una contraseña súper fuerte para tus cuentas financieras?",
      opciones: [
        "A) Usar tu fecha de nacimiento o el nombre de tu mascota.",
        "B) Usar una combinación de letras mayúsculas y minúsculas, números y símbolos (ej. M!Super$3gur@).",
        "C) Usar la misma contraseña para todas tus aplicaciones y redes sociales.",
      ],
      correcta: 1,
    },
  ];

  const [preguntaActual, setPreguntaActual] = useState(0);
  const [seleccion, setSeleccion] = useState(null);
  const [respondidaCorrecta, setRespondidaCorrecta] = useState(false);
  const [mostrarFinal, setMostrarFinal] = useState(false);

  const responder = (indice) => {
    setSeleccion(indice);
    if (indice === preguntas[preguntaActual].correcta) {
      setRespondidaCorrecta(true);
    } else {
      alert("❌ Respuesta incorrecta. Intenta nuevamente.");
      setRespondidaCorrecta(false);
    }
  };

  const siguientePregunta = () => {
    if (preguntaActual < preguntas.length - 1) {
      setPreguntaActual(preguntaActual + 1);
      setSeleccion(null);
      setRespondidaCorrecta(false);
    } else {
      ganarMonedas(150);
      actualizarProgreso("seguridad", 100);
      setMostrarFinal(true);
    }
  };

  return (
    <>
      <Encabezado monedas={monedas} />

      <div className="seguridad-preguntas-fondo">
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
                        ? i === preguntas[preguntaActual].correcta
                          ? "correcta"
                          : "incorrecta"
                        : ""
                    }`}
                    onClick={() => responder(i)}
                  >
                    <div
                      className={`circulo ${
                        seleccion === i
                          ? i === preguntas[preguntaActual].correcta
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
            <div className="felicitaciones">
              <h2>🏆 ¡Felicidades, has completado todos los temas! 🎉</h2>
              <p>
                Has alcanzado la meta final y te has convertido en un
                <strong> Súper Héroe Financiero Digital 🦸‍♂️🦸‍♀️</strong>.
              </p>
              <Button
                variant="primary"
                className="boton-volver"
                onClick={() => navigate("/temas")}
              >
                Volver al Inicio 🏠
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
