import { useState } from "react";
import { Container, Row, Col, Card, Button, Form, ProgressBar, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMonedas } from "../componentes/MonedasContext";
import { useProgreso } from "../componentes/ProgresoContext";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import logo from "../assets/logo.png";
import "../componentes/Perfil.css"; 

const Perfil = () => {
    const navigate = useNavigate();
    const { monedas } = useMonedas(); 
    const { progreso, obtenerProgreso } = useProgreso(); 

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
            <div className="profile-main-container"> {/* ⬅️ CLASE CSS */}
                <Container className="py-5">
                    {/* Encabezado */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1 className="profile-title"> {/* ⬅️ CLASE CSS */}
                            Mi Perfil
                        </h1>
                        <div className="d-flex gap-2">
                            {modoEdicion && (
                                <Button
                                    variant="outline-secondary"
                                    onClick={handleCancelar}
                                    className="profile-button" // ⬅️ CLASE CSS
                                >
                                    Cancelar
                                </Button>
                            )}
                            <Button
                                onClick={handleEditarClick}
                                className={`profile-button ${modoEdicion ? 'profile-button-save' : 'profile-button-edit'}`} // ⬅️ CLASES CONDICIONALES
                            >
                                {modoEdicion ? "Guardar Cambios" : "Editar Perfil"}
                            </Button>
                        </div>
                    </div>

                    <Row className="g-4">
                        {/* Columna Izquierda */}
                        <Col lg={4}>
                            {/* Tarjeta de perfil */}
                            <Card className="shadow-sm text-center profile-card"> {/* ⬅️ CLASE CSS */}
                                <div className="profile-picture-container"> {/* ⬅️ CLASE CSS */}
                                    <img
                                        src={modoEdicion ? datosEditados.fotoPerfil : datosUsuario.fotoPerfil}
                                        alt="Foto de perfil"
                                        className="profile-picture" // ⬅️ CLASE CSS
                                    />
                                    {modoEdicion && (
                                        <label className="profile-photo-change-label"> {/* ⬅️ CLASE CSS */}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFotoChange}
                                                style={{ display: "none" }}
                                            />
                                            <span style={{ fontSize: "1.2rem", color: "white" }}>📷</span>
                                        </label>
                                    )}
                                </div>
                                <h2 className="profile-name-title"> {/* ⬅️ CLASE CSS */}
                                    {modoEdicion ? datosEditados.nombre : datosUsuario.nombre}
                                </h2>
                                <p style={{ color: "#6b7280", marginBottom: "20px" }}>
                                    {datosUsuario.correo}
                                </p>

                                <div className="monedas-container"> {/* ⬅️ CLASE CSS */}
                                    <span style={{ fontSize: "2rem" }}>💰</span>
                                    <div style={{ textAlign: "left" }}>
                                        <div className="monedas-value"> {/* ⬅️ CLASE CSS */}
                                            {monedasUsuario}
                                        </div>
                                        <div style={{ fontSize: "0.9rem", color: "#92400e" }}>
                                            Monedas Ganadas
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Estadísticas */}
                            <Card className="shadow-sm mt-4 profile-card"> {/* ⬅️ CLASE CSS */}
                                <h3 className="section-title" style={{ marginBottom: "20px" }}> {/* ⬅️ CLASE CSS + override */}
                                    Estadísticas
                                </h3>
                                <Row>
                                    <Col xs={6}>
                                        <div className="stats-box"> {/* ⬅️ CLASE CSS */}
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
                                        <div className="stats-box"> {/* ⬅️ CLASE CSS */}
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
                            <Card className="shadow-sm mb-4 profile-card" style={{ padding: "30px" }}> {/* ⬅️ CLASE CSS + override */}
                                <h3 className="section-title"> {/* ⬅️ CLASE CSS */}
                                    Datos Personales
                                </h3>
                                <Row className="g-3">
                                    <Col md={6}>
                                        <Form.Label className="form-label-custom"> {/* ⬅️ CLASE CSS */}
                                            Nombre del perfil
                                        </Form.Label>
                                        {modoEdicion ? (
                                            <Form.Control
                                                type="text"
                                                name="nombre"
                                                value={datosEditados.nombre}
                                                onChange={handleInputChange}
                                                className="form-control-edit" // ⬅️ CLASE CSS
                                            />
                                        ) : (
                                            <p style={{ color: "#6b7280", marginTop: "8px" }}>
                                                {datosUsuario.nombre}
                                            </p>
                                        )}
                                    </Col>
                                    <Col md={6}>
                                        <Form.Label className="form-label-custom"> {/* ⬅️ CLASE CSS */}
                                            Rol
                                        </Form.Label>
                                        <p style={{ color: "#6b7280", marginTop: "8px" }}>
                                            {datosUsuario.rol}
                                        </p>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Label className="form-label-custom"> {/* ⬅️ CLASE CSS */}
                                            Correo electrónico
                                        </Form.Label>
                                        {modoEdicion ? (
                                            <Form.Control
                                                type="email"
                                                name="correo"
                                                value={datosEditados.correo}
                                                onChange={handleInputChange}
                                                className="form-control-edit" // ⬅️ CLASE CSS
                                            />
                                        ) : (
                                            <p style={{ color: "#6b7280", marginTop: "8px" }}>
                                                {datosUsuario.correo}
                                            </p>
                                        )}
                                    </Col>
                                    <Col md={6}>
                                        <Form.Label className="form-label-custom"> {/* ⬅️ CLASE CSS */}
                                            ID de usuario
                                        </Form.Label>
                                        <p style={{ color: "#6b7280", marginTop: "8px" }}>
                                            {datosUsuario.id}
                                        </p>
                                    </Col>
                                </Row>
                            </Card>

                            {/* Mis Metas de Aprendizaje */}
                            <Card className="shadow-sm mb-4 profile-card" style={{ padding: "30px" }}> {/* ⬅️ CLASE CSS + override */}
                                <h3 className="section-title"> {/* ⬅️ CLASE CSS */}
                                    Mis Metas de Aprendizaje
                                </h3>
                                <div className="mb-4">
                                    <div
                                        className="d-flex justify-content-between align-items-center mb-2 form-label-custom" // ⬅️ CLASE CSS
                                    >
                                        <span>Progreso General</span>
                                        <Badge
                                            bg="primary"
                                            className="badge-general-progress" // ⬅️ CLASE CSS
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
                                        <div key={index} className="leccion-item"> {/* ⬅️ CLASE CSS */}
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <div className="d-flex align-items-center gap-2">
                                                    <span style={{ fontSize: "1.2rem" }}>
                                                        {leccion.completada ? "✅" : "⏳"}
                                                    </span>
                                                    <span className="leccion-title"> {/* ⬅️ CLASE CSS */}
                                                        {leccion.nombre}
                                                    </span>
                                                </div>
                                                <span className="leccion-progress-percent"> {/* ⬅️ CLASE CSS */}
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