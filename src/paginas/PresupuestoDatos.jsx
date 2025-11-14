import { Container, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import "../componentes/DatosGlobal.css";

function PresupuestoDatos() {
  const navigate = useNavigate();

  const datos = [
    {
      titulo: '💸 El Efecto "Gasto Invisible"',
      texto:
        "Pequeños gastos diarios se acumulan sin darte cuenta. El presupuesto hace visibles esos gastos ocultos.",
      color: "rosa",
    },
    {
      titulo: "🧠 Tu Cerebro Ama la Claridad",
      texto:
        "Un presupuesto ordenado ayuda a tomar decisiones más inteligentes y evita compras impulsivas.",
      color: "celeste",
    },
    {
      titulo: "📊 Presupuestar No Es Limitar",
      texto:
        "Presupuestar te da permiso de gastar en lo importante mientras cuidas tus metas.",
      color: "verde",
    },
    {
      titulo: "🐜 La 'Deuda Hormiga'",
      texto:
        "Muchas pequeñas deudas se vuelven un problema grande. El presupuesto las controla.",
      color: "morado",
    },
    {
      titulo: "💡 Visualizar es Ahorrar",
      texto:
        "Ver tus metas te motiva. Registrar gastos genera disciplina financiera.",
      color: "amarillo",
    },
    {
      titulo: "📅 El Presupuesto Es Vivo",
      texto:
        "Puedes ajustarlo cada mes según tus prioridades. Se adapta a tus nuevas metas.",
      color: "azul",
    },
  ];

  return (
    <>
      <Encabezado monedas={200} />

      <motion.div
        className="presupuesto-datos-fondo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Container className="py-5 text-center">
          <h1 className="titulo-datos">📘 Datos Curiosos del Presupuesto</h1>
          <p className="subtitulo-datos">¡Secretos que te convertirán en un experto!</p>

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
              onClick={() => navigate("/presupuesto-preguntas")}
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

export default PresupuestoDatos;
