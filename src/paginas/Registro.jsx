import { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import fondo from "../assets/fondo1.png";


function Registro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    edad: "",
    password: "",
    confirmar: "",
    acepta: false,
  });
  const [errores, setErrores] = useState({});

  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const validar = () => {
    const nuevosErrores = {};

    // Validar nombre
    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = "El nombre y apellido son obligatorios.";
    }

    // Validar correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.correo.match(emailRegex)) {
      nuevosErrores.correo = "Por favor ingresa un correo electrónico válido.";
    }

    // Validar edad
    if (!formData.edad || Number(formData.edad) < 14) {
      nuevosErrores.edad = "Debes tener al menos 14 años para registrarte.";
    }

    // Validar contraseña segura
    const passRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!formData.password.match(passRegex)) {
      nuevosErrores.password =
        "La contraseña debe tener al menos 6 caracteres, una mayúscula y un número.";
    }

    // Confirmar contraseña
    if (formData.password !== formData.confirmar) {
      nuevosErrores.confirmar = "Las contraseñas no coinciden.";
    }

    // Aceptar términos
    if (!formData.acepta) {
      nuevosErrores.acepta = "Debes aceptar los términos y condiciones.";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (validar()) {
      alert("✅ Registro exitoso. ¡Bienvenido a EduFinanzas!");
      navigate("/temas");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(79,70,229,0.6), rgba(55,48,163,0.6)), url(${fondo})`,
        backgroundSize: "cover",         // Se adapta al tamaño de la pantalla
        backgroundPosition: "center",    // Centrada
        backgroundRepeat: "no-repeat",   // No se repite
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
          <h2 className="fw-bold" style={{ color: "#3730a3", fontSize: "1.7rem", marginTop: "0px", }}>
            EduFinanzas
          </h2>
          <p style={{ color: "#212122ff", fontSize: "0.90rem" }}>
            Crea tu cuenta y comienza tu aventura financiera
          </p>
        </div>

        {/* FORMULARIO */}
        <Form onSubmit={manejarEnvio}>
          <Form.Group className="mb-3">
            <Form.Control
              name="nombre"
              value={formData.nombre}
              onChange={manejarCambio}
              placeholder="Nombre y Apellido"
              style={inputEstilo}
            />
            {errores.nombre && <Alert variant="danger">{errores.nombre}</Alert>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              name="correo"
              value={formData.correo}
              onChange={manejarCambio}
              placeholder="Correo electrónico"
              style={inputEstilo}
            />
            {errores.correo && <Alert variant="danger">{errores.correo}</Alert>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="number"
              name="edad"
              value={formData.edad}
              onChange={manejarCambio}
              placeholder="Edad"
              style={inputEstilo}
            />
            {errores.edad && <Alert variant="danger">{errores.edad}</Alert>}
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
            {errores.password && <Alert variant="danger">{errores.password}</Alert>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              name="confirmar"
              value={formData.confirmar}
              onChange={manejarCambio}
              placeholder="Confirmar Contraseña"
              style={inputEstiloAzul}
            />
            {errores.confirmar && <Alert variant="danger">{errores.confirmar}</Alert>}
          </Form.Group>

          {/* ✅ Acepto los términos (texto más pequeño y clickeable) */}
          <Form.Group className="mb-2" style={{ textAlign: "left", marginLeft: "50px"}}>
            <Form.Check
              type="checkbox"
              name="acepta"
              checked={formData.acepta}
              onChange={manejarCambio}
              label={
                <span style={{ fontSize: "0.75rem", color: "#565d68ff", marginLeft: "5px" }}>
                  Acepto los{" "}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("📜 Aquí se mostrarán los términos y condiciones.");
                    }}
                    style={{
                      color: "#4f46e5",
                      textDecoration: "none",
                      fontWeight: "600",
                    }}
                  >
                    términos y condiciones
                  </a>
                </span>
              }
            />
          </Form.Group>
          {errores.acepta && <Alert variant="danger">{errores.acepta}</Alert>}

          {/* BOTÓN */}
          <Button
            type="submit"
            className="w-100 fw-semibold py-2 mt-"
            style={{
              backgroundColor: "#4f46e5",
              border: "none",
              borderRadius: "500px",
              fontSize: "0.8rem",
            }}
          >
            Crear Cuenta
          </Button>
        </Form>

        {/* ENLACE AL INICIO */}
        <div className="text-center mt-3">
          <p style={{ fontSize: "0.8rem", color: "#6b7280" }}>
            ¿Ya tienes cuenta?{" "}
            <a
              href="#"
              onClick={() => navigate("/inicio")}
              style={{
                color: "#4f46e5",
                textDecoration: "none",
                fontWeight: "600",
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

export default Registro;

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
