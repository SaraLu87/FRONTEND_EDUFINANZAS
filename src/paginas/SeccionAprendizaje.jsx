import { Container, Row, Col, Card } from "react-bootstrap";

const SeccionAprendizaje = () => {
  const modulos = [
    {
      icono: "🐷",
      titulo: "Ahorro Inteligente",
      descripcion: "Aprende técnicas de ahorro efectivas y crea tu primer fondo de emergencia",
    },
    {
      icono: "🧮",
      titulo: "Presupuesto Personal",
      descripcion: "Domina el arte de planificar tus gastos y maximizar tus ingresos",
    },
    {
      icono: "📊",
      titulo: "Inversión Responsable",
      descripcion: "Descubre los fundamentos de la inversión y cómo hacer crecer tu dinero",
    },
    {
      icono: "🛡️",
      titulo: "Seguridad Digital",
      descripcion: "Usa herramientas financieras digitales de forma segura y responsable",
    },
  ];

  const tips = [
    {
      titulo: "Regla 50/30/20",
      descripcion: "50% necesidades, 30% gustos, 20% ahorros. ¡Una fórmula simple para manejar tu dinero!",
      color: "#a78bfa",
    },
    {
      titulo: "Interés Compuesto",
      descripcion: "El dinero que ahorres hoy puede multiplicarse con el tiempo. ¡Empieza temprano!",
      color: "#fbbf24",
    },
  ];

  return (
    <section
      id="que-aprenderas"
      style={{
        padding: "80px 0",
        backgroundColor: "#f9fafb",
        fontFamily: "Poppins, sans-serif"
      }}
    >
      <Container>
        {/* Sección ¿Qué aprenderás? */}
        <div className="mb-5 pb-4">
          <h2
            className="text-center mb-3"
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#3730a3"
            }}
          >
            ¿Qué aprenderás?
          </h2>
          <p
            className="text-center mb-5"
            style={{
              fontSize: "1.1rem",
              color: "#6b7280",
              maxWidth: "700px",
              margin: "0 auto 40px"
            }}
          >
            Módulos diseñados específicamente para adolescentes, combinando teoría y práctica.
          </p>

          <Row className="g-4">
            {modulos.map((modulo, index) => (
              <Col key={index} md={6} lg={3}>
                <Card
                  className="h-100 border-0 shadow-sm text-center"
                  style={{
                    borderRadius: "20px",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "";
                  }}
                >
                  <Card.Body style={{ padding: "30px 20px" }}>
                    <div
                      style={{
                        fontSize: "3.5rem",
                        marginBottom: "15px"
                      }}
                    >
                      {modulo.icono}
                    </div>
                    <h3
                      style={{
                        fontSize: "1.3rem",
                        fontWeight: "600",
                        marginBottom: "12px",
                        color: "#3730a3"
                      }}
                    >
                      {modulo.titulo}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.95rem",
                        color: "#6b7280",
                        lineHeight: "1.6"
                      }}
                    >
                      {modulo.descripcion}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Sección Tips Financieros del Día */}
        <div className="mt-5 pt-4">
          <h2
            className="text-center mb-5"
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#3730a3"
            }}
          >
            🎉 Tips Financieros del Día 💰
          </h2>

          <Row className="g-4 justify-content-center">
            {tips.map((tip, index) => (
              <Col key={index} md={6} lg={5}>
                <Card
                  className="border-0 shadow-sm"
                  style={{
                    backgroundColor: tip.color,
                    borderRadius: "20px",
                    padding: "20px"
                  }}
                >
                  <Card.Body>
                    <h3
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        marginBottom: "15px",
                        color: "#ffffff"
                      }}
                    >
                      {tip.titulo}
                    </h3>
                    <p
                      style={{
                        fontSize: "1rem",
                        color: "#ffffff",
                        lineHeight: "1.6",
                        marginBottom: "0"
                      }}
                    >
                      {tip.descripcion}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default SeccionAprendizaje;

