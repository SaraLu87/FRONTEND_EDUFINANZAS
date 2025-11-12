import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useMonedas } from "../componentes/MonedasContext";
import { useProgreso } from "../componentes/ProgresoContext";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import "../componentes/InversionPreguntas.css";

function InversionPreguntas() {
  const navigate = useNavigate();
  const { monedas, ganarMonedas } = useMonedas();
  const { progreso, actualizarProgreso } = useProgreso();

  const preguntas = [
    {
      id: 1,
      texto: 'Si "Ahorrar" es guardar tu dinero, ¿qué significa "Invertir"?',
      opciones: [
        "Gastar tu dinero en algo que te dé mucha diversión hoy.",
        "Poner tu dinero a trabajar para que genere más dinero en el futuro.",
        "Dejar tu dinero guardado bajo el colchón sin que haga nada.",
      ],
      correcta: 1,
    },
    {
      id: 2,
      texto:
        '¿Cuál es el "superpoder" extra que tienen los jóvenes al invertir, que los adultos ya no tienen tanto?',
      opciones: [
        "La suerte, porque son más jóvenes.",
        "La capacidad de comprar muchas cosas al instante.",
        "El tiempo, porque su dinero tiene más años para crecer y multiplicarse.",
      ],
      correcta: 2,
    },
    {
      id: 3,
      texto:
        'Cuando hablamos de "Riesgo" en la inversión, ¿a qué nos referimos?',
      opciones: [
        "A que siempre vas a perder todo tu dinero.",
        "A la posibilidad de que la inversión no salga como esperas y puedas perder una parte de tu dinero.",
        "A que siempre vas a ganar muchísimo dinero muy rápido.",
      ],
      correcta: 1,
    },
  ];

  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState(null);
  const [aciertos, setAciertos] = useState(0);

  const manejarRespuesta = () => {
    if (seleccion === null) {
      alert("Selecciona una respuesta antes de continuar.");
      return;
    }

    const correcta = preguntas[indice].correcta;

    if (seleccion === correcta) {
      setAciertos(aciertos + 1);
      if (indice < preguntas.length - 1) {
        setIndice(indice + 1);
        setSeleccion(null);
      } else {
        // ✅ Completó todas las preguntas correctamente
        ganarMonedas(60);
        const nuevoProgreso = Math.min(progreso.inversion + 33.3, 100);
        actualizarProgreso("inversion", nuevoProgreso);
        alert("🎉 ¡Excelente! Has completado el reto de inversión.");
        navigate("/temas");
      }
    } else {
      alert("❌ Respuesta incorrecta. ¡Intenta nuevamente!");
    }
  };

  const preguntaActual = preguntas[indice];

  return (
    <>
      <Encabezado monedas={monedas} />

      <motion.div
        className="inversion-preguntas-fondo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <Container className="text-center py-5">
          <h1 className="titulo-preguntas">💡 Desafía tu Lógica de Inversor</h1>

          <motion.div
            className="tarjeta-pregunta"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="texto-pregunta">{preguntaActual.texto}</h3>

            <div className="opciones">
              {preguntaActual.opciones.map((op, i) => (
                <label
                  key={i}
                  className={`opcion ${
                    seleccion === i ? "seleccionada" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name={`pregunta-${preguntaActual.id}`}
                    checked={seleccion === i}
                    onChange={() => setSeleccion(i)}
                  />
                  <span className="letra-opcion">
                    {String.fromCharCode(97 + i) + ")"}
                  </span>
                  <span className="texto-opcion">{op}</span>
                </label>
              ))}
            </div>

            <Button
              variant="success"
              onClick={manejarRespuesta}
              className="boton-siguiente"
            >
              {indice < preguntas.length - 1 ? "Siguiente ➡️" : "Finalizar 🏁"}
            </Button>
          </motion.div>
        </Container>
      </motion.div>

      <Footer />
    </>
  );
}

export default InversionPreguntas;
