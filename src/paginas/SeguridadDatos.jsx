import { Container, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import "../componentes/DatosGlobal.css";

function SeguridadDatos() {
  const navigate = useNavigate();

  const datos = [
    {
      titulo: "🎭 Ingeniería Social",
      texto:
        "A veces los estafadores solo te manipulan para que tú entregues tus datos. Verifica siempre antes de compartir.",
      color: "rosa",
    },
    {
      titulo: "🔒 Contraseñas Seguras",
      texto:
        "Una contraseña con 12 caracteres variados puede tardar millones de años en ser descifrada.",
      color: "azul",
    },
    {
      titulo: "🕵️‍♀️ El Candadito No Es Decorativo",
      texto:
        "El candado HTTPS significa conexión segura. Verifica siempre antes de pagar o ingresar datos.",
      color: "verde",
    },
    {
      titulo: "💻 Tu Huella Digital",
      texto:
        "Todo lo que haces en internet deja un rastro. Cuídalo para mantener tu seguridad financiera.",
      color: "morado",
    },
  ];

  return (
    <>
      <Encabezado monedas={200} />

      <motion.div
        className="seguridad-datos-fondo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Container className="py-5 text-center">
          <h1 className="titulo-datos">🧠 Datos de Seguridad Financiera</h1>
          <p className="subtitulo-datos">¡Consejos para proteger tus finanzas!</p>

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
              onClick={() => navigate("/seguridad-preguntas")}
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

export default SeguridadDatos;
