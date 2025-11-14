import { Container, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import "../componentes/DatosGlobal.css";

function InversionDatos() {
  const navigate = useNavigate();

  const datos = [
    {
      titulo: "🍕 ¡Las Pizzas que Valen Millones!",
      texto:
        "En 2010, un programador pagó 10.000 Bitcoins por dos pizzas. Hoy valdrían cientos de millones. Un ejemplo real de costo de oportunidad.",
      color: "azul",
    },
    {
      titulo: "⏳ Empezar Temprano es la Clave",
      texto:
        "Los jóvenes tienen ventaja al invertir: tiempo. Gracias al interés compuesto, pequeñas inversiones se vuelven grandes.",
      color: "verde",
    },
    {
      titulo: "💡 Grandes Inventos que Nacieron de Inversiones",
      texto:
        "Apple, Google y muchas grandes empresas nacieron gracias a inversiones de confianza de personas comunes.",
      color: "morado",
    },
    {
      titulo: "💸 No Necesitas Ser Millonario para Invertir",
      texto:
        "Hoy puedes invertir desde $10.000 o $50.000 COP con apps fáciles de usar.",
      color: "amarillo",
    },
  ];

  return (
    <>
      <Encabezado monedas={200} />

      <motion.div
        className="inversion-datos-fondo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Container className="py-5 text-center">
          <h1 className="titulo-datos">📊 Datos Curiosos de la Inversión</h1>
          <p className="subtitulo-datos">¡Hechos increíbles del mundo financiero!</p>

          <Row xs={1} md={2} lg={3} className="g-4 mt-4">
            {datos.map((dato, i) => (
              <Col key={i}>
                <motion.div
                  className={`tarjeta-dato tarjeta-${dato.color}`}
                  whileHover={{ scale: 1.05 }}
                >
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
              onClick={() => navigate("/inversion-preguntas")}
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

export default InversionDatos;
