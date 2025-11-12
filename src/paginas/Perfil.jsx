import { useState } from "react";
import { Container, Row, Col, Card, Button, Form, ProgressBar, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMonedas } from "../componentes/MonedasContext";
import { useProgreso } from "../componentes/ProgresoContext";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import logo from "../assets/logo.png";

const Perfil = () => {
  const navigate = useNavigate();
  const { monedas } = useMonedas(); // Usar el contexto de monedas
  const { progreso, obtenerProgreso } = useProgreso(); // Usar el contexto de progreso

  const [modoEdicion, setModoEdicion] = useState(false);
  const [datosUsuario, setDatosUsuario] = useState({
    nombre: "Ana García López",
    rol: "Usuario",
    correo: "ana.garcia@email.com",
    id: "001",
    fotoPerfil: logo,
  });

  const [datosEditados, setDatosEditados] = useState({ ...datosUsuario });

  // Lecciones con progreso del contexto
  const leccionesData = [
    {
      nombre: "Ahorro Inteligente",
      completada: obtenerProgreso("ahorro") === 100,
      progreso: obtenerProgreso("ahorro") || 0
    },
    {
      nombre: "Presupuesto Personal",
      completada: obtenerProgreso("presupuesto") === 100,
      progreso: obtenerProgreso("presupuesto") || 0
    },
    {
      nombre: "Inversión Responsable",
      completada: obtenerProgreso("inversion") === 100,
      progreso: obtenerProgreso("inversion") || 0
    },
    {
      nombre: "Seguridad Digital",
      completada: obtenerProgreso("seguridad") === 100,
      progreso: obtenerProgreso("seguridad") || 0
    },
  ];

  const leccionesCompletadas = leccionesData.filter((l) => l.completada).length;
  const retosCompletados = 8;

  // Calcular progreso total basado en todos los temas
  const progresoTotal = Math.round(
    leccionesData.reduce((acc, l) => acc + l.progreso, 0) / leccionesData.length
  );

  const monedasUsuario = monedas ?? 0; // Usar monedas del contexto o 0

  const handleEditarClick = () => {
    if (modoEdicion) {
      // Guardar cambios
      setDatosUsuario(datosEditados);
    }
    setModoEdicion(!modoEdicion);
  };

  const handleCancelar = () => {
    setDatosEditados({ ...datosUsuario });
    setModoEdicion(false);
  };

  const handleInputChange = (e) => {
    setDatosEditados({
      ...datosEditados,
      [e.target.name]: e.target.value,
    });
  };

  const handleFotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDatosEditados({
          ...datosEditados,
          fotoPerfil: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Encabezado monedas={monedasUsuario} />
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#f3f4f6",
          fontFamily: "Poppins, sans-serif",
          paddingBottom: "40px",
          paddingTop: "20px"
        }}
      >
        <Container className="py-5">
          {/* Encabezado */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                color: "#3730a3",
                margin: 0
              }}
            >
              Mi Perfil
            </h1>
            <div className="d-flex gap-2">
              {modoEdicion && (
                <Button
                  variant="outline-secondary"
                  onClick={handleCancelar}
                  style={{
                    borderRadius: "25px",
                    fontWeight: "600",
                    padding: "8px 20px"
                  }}
                >
                  Cancelar
                </Button>
              )}
              <Button
                variant={modoEdicion ? "success" : "primary"}
                onClick={handleEditarClick}
                style={{
                  borderRadius: "25px",
                  fontWeight: "600",
                  padding: "8px 20px",
                  backgroundColor: modoEdicion ? "#10b981" : "#4f46e5",
                  border: "none"
                }}
              >
                {modoEdicion ? "Guardar Cambios" : "Editar Perfil"}
              </Button>
            </div>
          </div>

          <Row className="g-4">
            {/* Columna Izquierda */}
            <Col lg={4}>
              {/* Tarjeta de perfil */}
              <Card
                className="shadow-sm border-0 text-center"
                style={{ borderRadius: "20px", padding: "20px" }}
              >
                <div style={{ position: "relative", display: "inline-block", margin: "0 auto" }}>
                  <img
                    src={modoEdicion ? datosEditados.fotoPerfil : datosUsuario.fotoPerfil}
                    alt="Foto de perfil"
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "4px solid #4f46e5"
                    }}
                  />
                  {modoEdicion && (
                    <label
                      style={{
                        position: "absolute",
                        bottom: "0",
                        right: "0",
                        backgroundColor: "#4f46e5",
                        borderRadius: "50%",
                        width: "35px",
                        height: "35px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer"
                      }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFotoChange}
                        style={{ display: "none" }}
                      />
                      <span style={{ fontSize: "1.2rem" }}>📷</span>
                    </label>
                  )}
                </div>
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "#3730a3",
                    marginTop: "15px",
                    marginBottom: "5px"
                  }}
                >
                  {modoEdicion ? datosEditados.nombre : datosUsuario.nombre}
                </h2>
                <p style={{ color: "#6b7280", marginBottom: "20px" }}>
                  {datosUsuario.correo}
                </p>

                <div
                  style={{
                    backgroundColor: "#fef3c7",
                    borderRadius: "15px",
                    padding: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px"
                  }}
                >
                  <span style={{ fontSize: "2rem" }}>💰</span>
                  <div style={{ textAlign: "left" }}>
                    <div
                      style={{
                        fontSize: "1.8rem",
                        fontWeight: "700",
                        color: "#92400e"
                      }}
                    >
                      {monedasUsuario}
                    </div>
                    <div style={{ fontSize: "0.9rem", color: "#92400e" }}>
                      Monedas Ganadas
                    </div>
                  </div>
                </div>
              </Card>

              {/* Estadísticas */}
              <Card
                className="shadow-sm border-0 mt-4"
                style={{ borderRadius: "20px", padding: "20px" }}
              >
                <h3
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: "600",
                    color: "#3730a3",
                    marginBottom: "20px"
                  }}
                >
                  Estadísticas
                </h3>
                <Row>
                  <Col xs={6}>
                    <div
                      style={{
                        textAlign: "center",
                        padding: "15px",
                        backgroundColor: "#f9fafb",
                        borderRadius: "15px"
                      }}
                    >
                      <div style={{ fontSize: "2.5rem", marginBottom: "5px" }}>📚</div>
                      <div
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: "700",
                          color: "#3730a3"
                        }}
                      >
                        {leccionesCompletadas}/{leccionesData.length}
                      </div>
                      <div style={{ fontSize: "0.85rem", color: "#6b7280" }}>
                        Lecciones
                      </div>
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div
                      style={{
                        textAlign: "center",
                        padding: "15px",
                        backgroundColor: "#f9fafb",
                        borderRadius: "15px"
                      }}
                    >
                      <div style={{ fontSize: "2.5rem", marginBottom: "5px" }}>🏆</div>
                      <div
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: "700",
                          color: "#3730a3"
                        }}
                      >
                        {retosCompletados}
                      </div>
                      <div style={{ fontSize: "0.85rem", color: "#6b7280" }}>
                        Retos
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>

            {/* Columna Derecha */}
            <Col lg={8}>
              {/* Datos Personales */}
              <Card
                className="shadow-sm border-0 mb-4"
                style={{ borderRadius: "20px", padding: "30px" }}
              >
                <h3
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: "600",
                    color: "#3730a3",
                    marginBottom: "25px"
                  }}
                >
                  Datos Personales
                </h3>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Label style={{ fontWeight: "600", color: "#374151" }}>
                      Nombre del perfil
                    </Form.Label>
                    {modoEdicion ? (
                      <Form.Control
                        type="text"
                        name="nombre"
                        value={datosEditados.nombre}
                        onChange={handleInputChange}
                        style={{
                          borderRadius: "10px",
                          padding: "10px 15px",
                          border: "1.5px solid #cbd5e1"
                        }}
                      />
                    ) : (
                      <p style={{ color: "#6b7280", marginTop: "8px" }}>
                        {datosUsuario.nombre}
                      </p>
                    )}
                  </Col>
                  <Col md={6}>
                    <Form.Label style={{ fontWeight: "600", color: "#374151" }}>
                      Rol
                    </Form.Label>
                    <p style={{ color: "#6b7280", marginTop: "8px" }}>
                      {datosUsuario.rol}
                    </p>
                  </Col>
                  <Col md={6}>
                    <Form.Label style={{ fontWeight: "600", color: "#374151" }}>
                      Correo electrónico
                    </Form.Label>
                    {modoEdicion ? (
                      <Form.Control
                        type="email"
                        name="correo"
                        value={datosEditados.correo}
                        onChange={handleInputChange}
                        style={{
                          borderRadius: "10px",
                          padding: "10px 15px",
                          border: "1.5px solid #cbd5e1"
                        }}
                      />
                    ) : (
                      <p style={{ color: "#6b7280", marginTop: "8px" }}>
                        {datosUsuario.correo}
                      </p>
                    )}
                  </Col>
                  <Col md={6}>
                    <Form.Label style={{ fontWeight: "600", color: "#374151" }}>
                      ID de usuario
                    </Form.Label>
                    <p style={{ color: "#6b7280", marginTop: "8px" }}>
                      {datosUsuario.id}
                    </p>
                  </Col>
                </Row>
              </Card>

              {/* Mis Metas de Aprendizaje */}
              <Card
                className="shadow-sm border-0 mb-4"
                style={{ borderRadius: "20px", padding: "30px" }}
              >
                <h3
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: "600",
                    color: "#3730a3",
                    marginBottom: "25px"
                  }}
                >
                  Mis Metas de Aprendizaje
                </h3>
                <div className="mb-4">
                  <div
                    className="d-flex justify-content-between align-items-center mb-2"
                    style={{ fontWeight: "600", color: "#374151" }}
                  >
                    <span>Progreso General</span>
                    <Badge
                      bg="primary"
                      style={{
                        backgroundColor: "#4f46e5",
                        fontSize: "1rem",
                        padding: "5px 12px"
                      }}
                    >
                      {progresoTotal}%
                    </Badge>
                  </div>
                  <ProgressBar
                    now={progresoTotal}
                    style={{ height: "12px", borderRadius: "10px" }}
                    variant="primary"
                  />
                </div>

                <div>
                  {leccionesData.map((leccion, index) => (
                    <div
                      key={index}
                      style={{
                        padding: "15px",
                        backgroundColor: "#f9fafb",
                        borderRadius: "12px",
                        marginBottom: "15px"
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <div className="d-flex align-items-center gap-2">
                          <span style={{ fontSize: "1.2rem" }}>
                            {leccion.completada ? "✅" : "⏳"}
                          </span>
                          <span
                            style={{
                              fontWeight: "600",
                              color: "#3730a3"
                            }}
                          >
                            {leccion.nombre}
                          </span>
                        </div>
                        <span
                          style={{
                            fontWeight: "600",
                            color: "#4f46e5",
                            fontSize: "0.95rem"
                          }}
                        >
                          {leccion.progreso}%
                        </span>
                      </div>
                      <ProgressBar
                        now={leccion.progreso}
                        style={{ height: "8px", borderRadius: "10px" }}
                        variant={leccion.completada ? "success" : "primary"}
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Perfil;