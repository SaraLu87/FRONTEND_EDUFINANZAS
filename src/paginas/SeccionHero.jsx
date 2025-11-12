import { Container, Row, Col, Badge } from "react-bootstrap";

const SeccionHero = ({ alHacerClicTip }) => {
  return (
    <section
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "80px 0",
        fontFamily: "Poppins, sans-serif",
        color: "#ffffff"
      }}
    >
      <Container>
        <Row className="align-items-center">
          <Col lg={12} className="text-center">
            <h1
              style={{
                fontSize: "3rem",
                fontWeight: "800",
                marginBottom: "30px",
                lineHeight: "1.2"
              }}
            >
              Aprende a manejar tu dinero como un{" "}
              <span
                style={{
                  color: "#fbbf24",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
                }}
              >
                Pro
              </span>{" "}
              <span role="img" aria-label="cohete">
                🚀
              </span>
            </h1>

            <Badge
              bg="light"
              text="dark"
              className="mb-4"
              style={{
                fontSize: "1rem",
                padding: "10px 25px",
                borderRadius: "25px",
                fontWeight: "600"
              }}
            >
              Para jóvenes de 14-17 años
            </Badge>

            <p
              style={{
                fontSize: "1.2rem",
                lineHeight: "1.8",
                maxWidth: "700px",
                margin: "0 auto",
                color: "#f3f4f6"
              }}
            >
              Descubre el mundo de las finanzas personales a través de retos
              divertidos y aprende habilidades que te servirán toda la vida.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SeccionHero;