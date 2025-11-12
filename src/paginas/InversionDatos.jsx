import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import "../componentes/InversionDatos.css";

function InversionDatos() {
  const navigate = useNavigate();

  const datos = [
    {
      titulo: "🍕 ¡Las Pizzas que Valen Millones!",
      texto:
        "¿Sabías que en 2010, un programador pagó 10.000 Bitcoins por dos pizzas? Hoy, esos 10.000 Bitcoins valdrían cientos de millones de dólares. Ese fue un 'costo de oportunidad' de inversión increíble.",
    },
    {
      titulo: "⏳ Empezar Temprano es la Clave",
      texto:
        "Los jóvenes tienen un 'superpoder' extra para invertir: el tiempo. Con muchos años por delante, incluso pequeñas cantidades pueden convertirse en grandes fortunas gracias al interés compuesto.",
    },
    {
      titulo: "💡 Grandes Inventos que Nacieron de Inversiones",
      texto:
        "Empresas como Apple o Google empezaron con pequeñas inversiones de personas que creyeron en sus ideas. ¡Quién sabe, quizás inviertas en la próxima gran innovación!",
    },
    {
      titulo: "💸 No Necesitas Ser Millonario para Invertir",
      texto:
        "Hoy puedes invertir desde $10.000 o $50.000 COP. Existen apps y plataformas que permiten invertir fácilmente, ¡así que ya no hay excusas!",
    },
  ];

  return (
    <>
      <Encabezado monedas={200} />

      <motion.div
        className="inversion-datos-fondo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <Container className="text-center py-5">
          <h1 className="titulo-datos">
            📊 Datos Curiosos de la Inversión
          </h1>
          <h4 className="subtitulo-datos mb-5">
            ¡Hechos Asombrosos de los Ricos y Famosos!
          </h4>

          <div className="grid-datos">
            {datos.map((dato, index) => (
              <motion.div
                key={index}
                className="tarjeta-dato"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <h3>{dato.titulo}</h3>
                <p>{dato.texto}</p>
              </motion.div>
            ))}
          </div>

          <motion.button
            className="boton-siguiente"
            onClick={() => navigate("/inversion-preguntas")}
            whileHover={{ scale: 1.1 }}
          >
            Siguiente ➡️
          </motion.button>
        </Container>
      </motion.div>

      <Footer />
    </>
  );
}

export default InversionDatos;
