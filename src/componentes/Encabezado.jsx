import { Navbar, Container, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Encabezado({ monedas }) {
  const navigate = useNavigate();

  // 🔐 Cierra la sesión y limpia almacenamiento
  const cerrarSesion = () => {
    localStorage.clear();
    alert("Sesión cerrada correctamente 👋");
    navigate("/inicio");
  };

  // 🏠 Al hacer clic en el logo, vuelve a la pantalla de inicio
  const irInicio = () => {
    navigate("/inicio");
  };

  return (
    <Navbar bg="info" expand="lg" className="shadow-sm px-4">
      <Container fluid className="d-flex justify-content-between align-items-center">
        
        {/* 🔵 Logo e identidad de la app */}
        <div
          className="d-flex align-items-center gap-2"
          style={{ cursor: "pointer" }}
          onClick={irInicio} // 👈 Acción al hacer clic
        >
          <img
            src={logo}
            alt="EduFinanzas"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "60%",
              objectFit: "cover",
              transform: "scale(1.2)",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.3)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1.2)")}
          />
          <h3
            className="m-0 fw-bold"
            style={{
              color: "#1d0c6dff",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            EduFinanzas
          </h3>
        </div>

        {/* 💰 Monedas y botón de sesión */}
        <div className="d-flex align-items-center gap-3">
          <Badge
            bg="warning"
            text="dark"
            pill
            style={{ fontSize: "1rem", padding: "08px 15px" }}
          >
            💰 {monedas ?? 0} Monedas
          </Badge>

          <Button
            variant="primary"
            onClick={cerrarSesion}
            style={{
              borderRadius: "35px",
              fontWeight: "600",
              padding: "8px 20px",
            }}
          >
            Cerrar sesión
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}

export default Encabezado;
