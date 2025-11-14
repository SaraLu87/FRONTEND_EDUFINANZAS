import { useState, useEffect} from "react";
import { Container, Row, Col, Card, Button, Form, ProgressBar, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMonedas } from "../componentes/MonedasContext";
import { useProgreso } from "../componentes/ProgresoContext";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import axios from "axios";
import ahorroImg from "../assets/ahorro.png";
import presupuestoImg from "../assets/presupuesto.png";
import inversionImg from "../assets/inversion.png";
import seguridadImg from "../assets/seguridad.png";
import logo from "../assets/logo.png";

function Temas() {
  const navigate = useNavigate();
  const [mostrarPerfil, setMostrarPerfil] = useState(false);

  // Traer datos globales
  const { monedas, ganarMonedas, gastarMonedas } = useMonedas();
  const { progreso, actualizarProgreso, obtenerProgreso } = useProgreso();

  // Estados del perfil
  const [modoEdicion, setModoEdicion] = useState(false);
  const [datosUsuario, setDatosUsuario] = useState({
    nombre: "Ana García López",
    rol: "Usuario",
    correo: "ana.garcia@email.com",
    id: "001",
    fotoPerfil: logo,
  });
  const [datosEditados, setDatosEditados] = useState({ ...datosUsuario });
  const [leccionesData, setTemasCreados] = useState([]);
  
  useEffect(() => {
    const obtenerTemas = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/temas/");
        setTemasCreados(res.data);
      } catch (error) {
        console.error("Error al obtener retos:", error);
      }
    };
    obtenerTemas();
  }, []);

  
  //const leccionesCompletadas = leccionesData.filter((l) => l.completada).length;
  const retosCompletados = 8;

  //  Cálculo seguro del progreso total
  // const progresoTotal = Math.min(
  //   ((progreso?.ahorro || 0) +
  //     (progreso?.presupuesto || 0) +
  //     (progreso?.inversion || 0) +
  //     (progreso?.seguridad || 0)) / 4,
  //   100
  // );

  // // Iniciar un reto
  // const iniciarReto = (tema) => {
  //   if ((progreso[tema.toLowerCase()] || 0) === 0 && monedas < 180) {
  //     alert("💰 Necesitas al menos 120 monedas para desbloquear este tema.");
  //     return;
  //   }

  //   if ((progreso[tema.toLowerCase()] || 0) === 0) {
  //     gastarMonedas(120);
  //     alert(`🔓 Tema "${tema}" desbloqueado. ¡Buena suerte!`);
  //   }

  //   navigate(`/${tema.toLowerCase()}`);
  // };

  // Completar reto y ganar monedas
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

  // Funciones del perfil
  const handleEditarClick = () => {
    if (modoEdicion) {
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
      <Encabezado
        monedas={monedas}
        mostrarBotonPerfil={true}
        onClickPerfil={() => setMostrarPerfil(!mostrarPerfil)}
      />

      {!mostrarPerfil ? (
        <Container className="text-center mt-4">
          <h2 className="fw-bold text-success">¡Aprende hoy y domina tu futuro! 🚀</h2>
          <p className="text-muted">
            Descubre el mundo de las finanzas personales con retos divertidos.
          </p>

        {/* Barra de progreso global moderna */}
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
            {/* <div
              style={{
                width: `${Math.round(progresoTotal)}%`,
                height: "100%",
                borderRadius: "25px",
                background: `linear-gradient(90deg, #60a5fa, #818cf8, #a78bfa)`,
                transition: "width 0.8s ease-in-out",
              }}
            ></div> */}

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
              {/* {isNaN(progresoTotal) ? "0" : Math.round(progresoTotal)}% */}
            </span>
          </div>
        </div>

        {/* Cuadros de temas */}
        <Row xs={1} md={2} lg={4} className="g-4">
          {
            leccionesData.map((tema, i) => (
            <Col key={i}>
              <Card className="shadow h-100 border-0 rounded-4">
                <Card.Img
                  variant="top"
                  src={tema.img}
                  alt={tema.nombre}
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
                  <Card.Title className="fw-bold">{tema.nombre}</Card.Title>
                  <Card.Text>
                    Aprende sobre {tema.descripcion.toLowerCase()} <br></br> Con ejemplos reales.
                  </Card.Text>

                  {/* Botones de acción */}
                  {/* <Button
                    variant="primary"
                    className="w-100"
                    onClick={() => iniciarReto(tema.titulo)}
                  >
                    Iniciar
                  </Button> */}

                  <Button
                    variant="outline-success"
                    className="w-100 mt-2"
                    onClick={() => completarReto(tema.nombre)}
                  >
                    Completar
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      ) : (
        // Vista del Perfil
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
            {/* Encabezado del Perfil */}
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
                        {monedas ?? 0}
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
                    {/* <div
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
                        {Math.round(progresoTotal)}%
                      </Badge>
                    </div>
                    <ProgressBar
                      now={progresoTotal}
                      style={{ height: "12px", borderRadius: "10px" }}
                      variant="primary"
                    /> */}
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
                              {leccion.descripcion ? "✅" : "⏳"}
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
                            {leccion.precio}%
                          </span>
                        </div>
                        <ProgressBar
                          now={leccion.precio}
                          style={{ height: "8px", borderRadius: "10px" }}
                          variant={leccion.descripcion ? "success" : "primary"}
                        />
                      </div>
                    ))}
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Temas;
