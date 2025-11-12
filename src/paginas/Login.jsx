import { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import fondo from "../assets/fondo1.png";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    correo: "",
    password: "",
  });
  const [errores, setErrores] = useState({});

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validar = () => {
    const nuevosErrores = {};

    // Validar correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.correo.match(emailRegex)) {
      nuevosErrores.correo = "Por favor ingresa un correo electrónico válido.";
    }

    // Validar contraseña
    if (!formData.password || formData.password.length < 6) {
      nuevosErrores.password = "La contraseña debe tener al menos 6 caracteres.";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (validar()) {
      alert("✅ Inicio de sesión exitoso. ¡Bienvenido de nuevo!");
      navigate("/temas");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(79,70,229,0.6), rgba(55,48,163,0.6)), url(${fondo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <Card
        className="shadow-lg p-4"
        style={{
          width: "100%",
          maxWidth: "400px",
          borderRadius: "70px",
          background: "#ffffff",
          textAlign: "center",
        }}
      >
        {/* LOGO Y TÍTULO */}
        <div className="text-center mb-1">
          <img
            src={logo}
            alt="EduFinanzas"
            style={{
              width: "90px",
              height: "85px",
              borderRadius: "60%",
              objectFit: "cover",
              transform: "scale(1.7)",
              marginBottom: "30px",
            }}
          />
          <h2
            className="fw-bold"
            style={{
              color: "#3730a3",
              fontSize: "1.7rem",
              marginTop: "0px",
            }}
          >
            EduFinanzas
          </h2>
          <p style={{ color: "#212122ff", fontSize: "0.90rem" }}>
            Inicia sesión para continuar tu aprendizaje
          </p>
        </div>

        {/* FORMULARIO */}
        <Form onSubmit={manejarEnvio}>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              name="correo"
              value={formData.correo}
              onChange={manejarCambio}
              placeholder="Correo electrónico"
              style={inputEstilo}
            />
            {errores.correo && (
              <Alert variant="danger" className="mt-2" style={{ fontSize: "0.85rem" }}>
                {errores.correo}
              </Alert>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={manejarCambio}
              placeholder="Contraseña"
              style={inputEstiloAzul}
            />
            {errores.password && (
              <Alert variant="danger" className="mt-2" style={{ fontSize: "0.85rem" }}>
                {errores.password}
              </Alert>
            )}
          </Form.Group>

          {/* ¿Olvidaste tu contraseña? */}
          <div className="text-end mb-3" style={{ marginRight: "25px" }}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert("📧 Se enviará un enlace de recuperación a tu correo.");
              }}
              style={{
                color: "#4f46e5",
                textDecoration: "none",
                fontSize: "0.8rem",
                fontWeight: "600",
              }}
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          {/* BOTÓN */}
          <Button
            type="submit"
            className="w-100 fw-semibold py-2 mt-2"
            style={{
              backgroundColor: "#4f46e5",
              border: "none",
              borderRadius: "500px",
              fontSize: "0.9rem",
            }}
          >
            Iniciar Sesión
          </Button>
        </Form>

        {/* ENLACE A REGISTRO */}
        <div className="text-center mt-3">
          <p style={{ fontSize: "0.8rem", color: "#6b7280" }}>
            ¿No tienes cuenta?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/registro");
              }}
              style={{
                color: "#4f46e5",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Crear cuenta
            </a>
          </p>
        </div>

        {/* ENLACE AL INICIO */}
        <div className="text-center mt-2">
          <p style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/inicio");
              }}
              style={{
                color: "#6b7280",
                textDecoration: "none",
              }}
            >
              Volver al inicio
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
}

export default Login;

// 🎨 ESTILOS
const inputEstilo = {
  borderRadius: "25px",
  border: "1.5px solid #cbd5e1",
  padding: "1px 18px",
  fontSize: "0.95rem",
  marginBottom: "1px",
  backgroundColor: "#f8fafc",
  transition: "0.3s",
  margin: "8px auto",
  width: "90%",
};

const inputEstiloAzul = {
  ...inputEstilo,
  backgroundColor: "#e0e7ff",
  border: "1.5px solid #6366f1",
};