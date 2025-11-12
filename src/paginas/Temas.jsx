import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMonedas } from "../componentes/MonedasContext";
import { useProgreso } from "../componentes/ProgresoContext";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";

import ahorroImg from "../assets/ahorro.png";
import presupuestoImg from "../assets/presupuesto.png";
import inversionImg from "../assets/inversion.png";
import seguridadImg from "../assets/seguridad.png";

function Temas() {
  const navigate = useNavigate();

  // 🧠 Traer datos globales
  const { monedas, ganarMonedas, gastarMonedas } = useMonedas();
  const { progreso, actualizarProgreso } = useProgreso();

  // ✅ Cálculo seguro del progreso total
  const progresoTotal = Math.min(
    ((progreso?.ahorro || 0) +
      (progreso?.presupuesto || 0) +
      (progreso?.inversion || 0) +
      (progreso?.seguridad || 0)) / 4,
    100
  );

  // 🚀 Iniciar un reto
  const iniciarReto = (tema) => {
    if ((progreso[tema.toLowerCase()] || 0) === 0 && monedas < 180) {
      alert("💰 Necesitas al menos 120 monedas para desbloquear este tema.");
      return;
    }

    if ((progreso[tema.toLowerCase()] || 0) === 0) {
      gastarMonedas(120);
      alert(`🔓 Tema "${tema}" desbloqueado. ¡Buena suerte!`);
    }

    navigate(`/${tema.toLowerCase()}`);
  };

  // 🏅 Completar reto y ganar monedas
  const completarReto = (tema) => {
    ganarMonedas(60);
    const nuevoProgreso = Math.min((progreso[tema.toLowerCase()] || 0) + 33.3, 100);
    actualizarProgreso(tema.toLowerCase(), nuevoProgreso);
    alert(
      `🎉 ¡Ganaste 60 monedas! Tu progreso en ${tema} ahora es ${Math.round(
        nuevoProgreso
      )}%.`
    );
  };

  return (
    <>
      <Encabezado monedas={monedas} />

      <Container className="text-center mt-4">
        <h2 className="fw-bold text-success">¡Aprende hoy y domina tu futuro! 🚀</h2>
        <p className="text-muted">
          Descubre el mundo de las finanzas personales con retos divertidos.
        </p>

        {/* ✅ Barra de progreso global moderna */}
        <div className="my-4">
          <p className="fw-semibold mb-3">Tu progreso de aprendizaje</p>

          <div
            style={{
              position: "relative",
              backgroundColor: "#e5e7eb",
              borderRadius: "25px",
              height: "30px",
              overflow: "hidden",
              boxShadow: "inset 0 2px 8px rgba(0,0,0,0.2)",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                width: `${Math.round(progresoTotal)}%`,
                height: "100%",
                borderRadius: "25px",
                background: `linear-gradient(90deg, #60a5fa, #818cf8, #a78bfa)`,
                transition: "width 0.8s ease-in-out",
              }}
            ></div>

            <span
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                fontWeight: "700",
                fontSize: "0.95rem",
                color: "#1e3a8a",
                lineHeight: "30px",
                textShadow: "1px 1px 3px rgba(255,255,255,0.7)",
              }}
            >
              {isNaN(progresoTotal) ? "0" : Math.round(progresoTotal)}%
            </span>
          </div>
        </div>

        {/* 🧩 Cuadros de temas */}
        <Row xs={1} md={2} lg={4} className="g-4">
          {[
            { titulo: "Ahorro", img: ahorroImg },
            { titulo: "Presupuesto", img: presupuestoImg },
            { titulo: "Inversión", img: inversionImg },
            { titulo: "Seguridad", img: seguridadImg },
          ].map((tema, i) => (
            <Col key={i}>
              <Card className="shadow h-100 border-0 rounded-4">
                <Card.Img
                  variant="top"
                  src={tema.img}
                  alt={tema.titulo}
                  style={{
                    width: "140px",
                    height: "140px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    margin: "20px auto 1px auto",
                    display: "block",
                    border: "6px solid #c0c4dbff",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.08) translateY(-5px)";
                    e.target.style.boxShadow = "0 6px 18px rgba(0, 0, 0, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";
                  }}
                />

                <Card.Body>
                  <Card.Title className="fw-bold">{tema.titulo}</Card.Title>
                  <Card.Text>
                    Aprende sobre {tema.titulo.toLowerCase()} con ejemplos reales.
                  </Card.Text>

                  {/* Botones de acción */}
                  <Button
                    variant="primary"
                    className="w-100"
                    onClick={() => iniciarReto(tema.titulo)}
                  >
                    Iniciar
                  </Button>

                  <Button
                    variant="outline-success"
                    className="w-100 mt-2"
                    onClick={() => completarReto(tema.titulo)}
                  >
                    Completar
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Footer />
    </>
  );
}

export default Temas;
