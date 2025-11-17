import { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../componentes/Login.css"; // ⬅️ ¡IMPORTACIÓN DEL ARCHIVO CSS!

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
    // ⬅️ Reemplazo del gran estilo en línea por la clase 'login-container'
    <div className="login-container">
      <Card
        // ⬅️ Uso de la clase 'login-card' para estilos de la tarjeta
        className="shadow-lg p-4 login-card"
      >
        {/* LOGO Y TÍTULO */}
        <div className="text-center mb-1">
          <img
            src={logo}
            alt="EduFinanzas"
            // ⬅️ Uso de la clase 'login-logo' para estilos del logo
            className="login-logo"
          />
          <h2
            className="fw-bold"
            style={{
              // Mantener estilos únicos o complejos en línea es aceptable
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
              // ⬅️ Uso de la clase 'custom-input'
              className="custom-input"
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
              // ⬅️ Uso de la clase 'custom-input' y 'custom-input-password'
              className="custom-input custom-input-password"
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
              // ⬅️ Uso de la clase 'forgot-password-link'
              className="forgot-password-link"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          {/* BOTÓN */}
          <Button
            type="submit"
            className="w-100 fw-semibold py-2 mt-2 login-button" // ⬅️ Uso de la clase 'login-button'
          >
            Iniciar Sesión
          </Button>
        </Form>

        {/* ENLACE A REGISTRO Y VOLVER AL INICIO... (el resto del código se mantiene igual ya que sus estilos eran sencillos) */}
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