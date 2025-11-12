import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import "../componentes/PresupuestoDatos.css";

function PresupuestoDatos() {
  const navigate = useNavigate();

  const datos = [
    {
      titulo: '💸 El Efecto "Gasto Invisible"',
      texto:
        'A veces, pequeñas compras diarias (esa gaseosa, ese dulce) suman mucho al final de la semana o el mes. Si no tienes un presupuesto, ¡esos pequeños gastos son “invisibles” y desaparecen tu dinero sin que te des cuenta!',
    },
    {
      titulo: '🧠 Tu Cerebro Ama la Claridad',
      texto:
        'Cuando ves tus gastos organizados en un presupuesto (en una app, una libreta, etc.), tu cerebro puede procesarlo mejor. ¡Te ayuda a tomar decisiones más inteligentes y a resistir las compras por impulso!',
    },
    {
      titulo: '📊 "Presupuestar" No es Prohibir, es Organizar',
      texto:
        'Mucha gente cree que presupuestar es no poder gastar. ¡Todo lo contrario! Es darte permiso para gastar en lo que es importante para ti, pero de forma inteligente, asegurando que también alcances tus metas.',
    },
    {
      titulo: '🐜 La "Deuda Hormiga"',
      texto:
        'Sin un presupuesto, es fácil acumular muchas pequeñas deudas que luego se vuelven un problema grande. El presupuesto es tu escudo contra estas “deudas hormiga”.',
    },
    {
      titulo: '💡 Visualizar es Ahorrar',
      texto:
        'Ver tus metas por escrito o en una app te motiva a cumplirlas. Cada vez que registras tus gastos y ves tu progreso, ¡sientes una mini recompensa que refuerza tu disciplina financiera!',
    },
    {
      titulo: '📅 Tu Presupuesto es Vivo',
      texto:
        'El presupuesto no es rígido. Puedes ajustarlo mes a mes según tus prioridades. ¡Es como un entrenador que se adapta a tus nuevas metas!',
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
        <Container className="text-center py-5">
          <h1 className="titulo-datos">📘 Datos Curiosos del Presupuesto Personal</h1>
          <h5 className="subtitulo-datos mb-4 text-muted">
            ¡Descubre los secretos de un experto en dinero!
          </h5>

          <Row className="g-4 justify-content-center">
            {datos.map((dato, index) => (
              <Col key={index} xs={12} sm={6} lg={4}>
                <motion.div
                  className="tarjeta-dato"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="shadow-lg border-0 rounded-4 h-100">
                    <Card.Body className="p-4">
                      <Card.Title className="fw-bold text-primary mb-3">
                        {dato.titulo}
                      </Card.Title>
                      <Card.Text className="text-secondary">
                        {dato.texto}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>

          {/* Botón siguiente */}
          <motion.div whileHover={{ scale: 1.1 }} className="mt-5">
            <Button
              variant="success"
              onClick={() => navigate("/presupuesto-preguntas")}
              className="boton-siguiente"
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
