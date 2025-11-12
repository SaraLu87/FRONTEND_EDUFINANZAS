import { Navbar as BootstrapNavbar, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <BootstrapNavbar
      className="shadow-sm"
      style={{
        backgroundColor: "#ffffff",
        padding: "12px 0",
        fontFamily: "Poppins, sans-serif"
      }}
    >
      <Container>
        <Link
          to="/inicio"
          className="d-flex align-items-center text-decoration-none"
          style={{ cursor: "pointer" }}
        >
          <img
            src={logo}
            alt="Logo EduFinanzas"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              objectFit: "cover",
              marginRight: "12px"
            }}
          />
          <span
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              color: "#3730a3",
              fontFamily: "Poppins, sans-serif"
            }}
          >
            EduFinanzas
          </span>
        </Link>

        <div className="d-flex gap-3 align-items-center">
          <Button
            onClick={() => navigate("/login")}
            style={{
              borderRadius: "25px",
              fontWeight: "600",
              padding: "8px 20px",
              backgroundColor: "#4f46e5",
              border: "none"
            }}
          >
            Iniciar Reto
          </Button>
        </div>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;