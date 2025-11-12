import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Table, Form, Badge } from "react-bootstrap";
import logo from "../assets/logo.png";

const PerfilAdministrador = () => {
  const navigate = useNavigate()
  const [datosAdmin] = useState({
    nombre: "Administrador Principal",
    rol: "Administrador",
    correo: "admin@edufinanzas.com",
    id: "001",
    fotoPerfil: logo,
  })

  const [usuarios, setUsuarios] = useState([
    { id: "001", nombre: "Ana García López", correo: "ana.garcia@email.com", rol: "Usuario" },
    { id: "002", nombre: "Carlos Mendoza", correo: "carlos.mendoza@email.com", rol: "Usuario" },
    { id: "003", nombre: "María Torres", correo: "maria.torres@email.com", rol: "Usuario" },
    { id: "004", nombre: "Juan Pérez", correo: "juan.perez@email.com", rol: "Usuario" },
  ])

  const [modoEdicion, setModoEdicion] = useState(null)
  const [usuarioEditado, setUsuarioEditado] = useState(null)

  const handleCrearReto = () => {
    navigate("/crear-reto")
  }

  const handleEditarUsuario = (usuario) => {
    setModoEdicion(usuario.id)
    setUsuarioEditado({ ...usuario })
  }

  const handleGuardarUsuario = () => {
    if (usuarioEditado) {
      setUsuarios(usuarios.map(u => u.id === usuarioEditado.id ? usuarioEditado : u))
      setModoEdicion(null)
      setUsuarioEditado(null)
    }
  }

  const handleCancelarEdicion = () => {
    setModoEdicion(null)
    setUsuarioEditado(null)
  }

  const handleEliminarUsuario = (id) => {
    if (window.confirm("¿Está seguro de eliminar este usuario?")) {
      setUsuarios(usuarios.filter(u => u.id !== id))
    }
  }

  const handleInputChange = (field, value) => {
    if (usuarioEditado) {
      setUsuarioEditado({ ...usuarioEditado, [field]: value })
    }
  }

  const estadisticas = {
    totalUsuarios: usuarios.length,
    retosCreados: 12,
    usuariosActivos: usuarios.length,
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        fontFamily: "Poppins, sans-serif",
        paddingBottom: "40px"
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
            Panel de Administración
          </h1>
          <Button
            onClick={handleCrearReto}
            style={{
              borderRadius: "25px",
              fontWeight: "600",
              padding: "10px 25px",
              backgroundColor: "#10b981",
              border: "none",
              fontSize: "1.05rem"
            }}
          >
            + Crear Nuevo Reto
          </Button>
        </div>

        <Row className="g-4">
          {/* Columna Izquierda */}
          <Col lg={4}>
            {/* Tarjeta de perfil */}
            <Card
              className="shadow-sm border-0 text-center"
              style={{ borderRadius: "20px", padding: "20px" }}
            >
              <img
                src={datosAdmin.fotoPerfil}
                alt="Foto de perfil"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  margin: "0 auto 15px",
                  border: "4px solid #4f46e5"
                }}
              />
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "#3730a3",
                  marginBottom: "5px"
                }}
              >
                {datosAdmin.nombre}
              </h2>
              <Badge
                bg="success"
                style={{
                  fontSize: "0.9rem",
                  padding: "5px 15px",
                  marginBottom: "10px"
                }}
              >
                {datosAdmin.rol}
              </Badge>
              <p style={{ color: "#6b7280", fontSize: "0.95rem" }}>
                {datosAdmin.correo}
              </p>
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
                Estadísticas Generales
              </h3>
              <div className="d-flex flex-column gap-3">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "15px",
                    backgroundColor: "#f9fafb",
                    borderRadius: "12px"
                  }}
                >
                  <div style={{ fontSize: "2rem", marginRight: "15px" }}>👥</div>
                  <div>
                    <div
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        color: "#3730a3"
                      }}
                    >
                      {estadisticas.totalUsuarios}
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "#6b7280" }}>
                      Usuarios
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "15px",
                    backgroundColor: "#f9fafb",
                    borderRadius: "12px"
                  }}
                >
                  <div style={{ fontSize: "2rem", marginRight: "15px" }}>🎯</div>
                  <div>
                    <div
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        color: "#3730a3"
                      }}
                    >
                      {estadisticas.retosCreados}
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "#6b7280" }}>
                      Retos
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "15px",
                    backgroundColor: "#f9fafb",
                    borderRadius: "12px"
                  }}
                >
                  <div style={{ fontSize: "2rem", marginRight: "15px" }}>✅</div>
                  <div>
                    <div
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        color: "#3730a3"
                      }}
                    >
                      {estadisticas.usuariosActivos}
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "#6b7280" }}>
                      Activos
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Col>

          {/* Columna Derecha */}
          <Col lg={8}>
            {/* Lista de Usuarios */}
            <Card
              className="shadow-sm border-0"
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
                Gestión de Usuarios
              </h3>
              <Table responsive hover>
                <thead
                  style={{
                    backgroundColor: "#f9fafb",
                    borderRadius: "10px"
                  }}
                >
                  <tr>
                    <th style={{ fontWeight: "600", color: "#374151", padding: "12px" }}>
                      Nombre
                    </th>
                    <th style={{ fontWeight: "600", color: "#374151", padding: "12px" }}>
                      Correo
                    </th>
                    <th style={{ fontWeight: "600", color: "#374151", padding: "12px" }}>
                      Rol
                    </th>
                    <th style={{ fontWeight: "600", color: "#374151", padding: "12px" }}>
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usuario) => (
                    <tr key={usuario.id}>
                      <td style={{ padding: "12px", verticalAlign: "middle" }}>
                        {modoEdicion === usuario.id && usuarioEditado ? (
                          <Form.Control
                            type="text"
                            value={usuarioEditado.nombre}
                            onChange={(e) => handleInputChange("nombre", e.target.value)}
                            style={{
                              borderRadius: "8px",
                              border: "1.5px solid #cbd5e1",
                              padding: "8px 12px",
                              fontSize: "0.9rem"
                            }}
                          />
                        ) : (
                          usuario.nombre
                        )}
                      </td>
                      <td style={{ padding: "12px", verticalAlign: "middle" }}>
                        {modoEdicion === usuario.id && usuarioEditado ? (
                          <Form.Control
                            type="email"
                            value={usuarioEditado.correo}
                            onChange={(e) => handleInputChange("correo", e.target.value)}
                            style={{
                              borderRadius: "8px",
                              border: "1.5px solid #cbd5e1",
                              padding: "8px 12px",
                              fontSize: "0.9rem"
                            }}
                          />
                        ) : (
                          usuario.correo
                        )}
                      </td>
                      <td style={{ padding: "12px", verticalAlign: "middle" }}>
                        {modoEdicion === usuario.id && usuarioEditado ? (
                          <Form.Select
                            value={usuarioEditado.rol}
                            onChange={(e) => handleInputChange("rol", e.target.value)}
                            style={{
                              borderRadius: "8px",
                              border: "1.5px solid #cbd5e1",
                              padding: "8px 12px",
                              fontSize: "0.9rem"
                            }}
                          >
                            <option value="Usuario">Usuario</option>
                            <option value="Administrador">Administrador</option>
                          </Form.Select>
                        ) : (
                          <Badge
                            bg={usuario.rol === "Administrador" ? "success" : "primary"}
                            style={{
                              fontSize: "0.85rem",
                              padding: "6px 12px",
                              fontWeight: "600"
                            }}
                          >
                            {usuario.rol}
                          </Badge>
                        )}
                      </td>
                      <td style={{ padding: "12px", verticalAlign: "middle" }}>
                        <div className="d-flex gap-2">
                          {modoEdicion === usuario.id ? (
                            <>
                              <Button
                                size="sm"
                                onClick={handleGuardarUsuario}
                                style={{
                                  backgroundColor: "#10b981",
                                  border: "none",
                                  borderRadius: "8px",
                                  padding: "6px 12px"
                                }}
                              >
                                💾
                              </Button>
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={handleCancelarEdicion}
                                style={{
                                  borderRadius: "8px",
                                  padding: "6px 12px"
                                }}
                              >
                                ✖
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                size="sm"
                                variant="outline-primary"
                                onClick={() => handleEditarUsuario(usuario)}
                                style={{
                                  borderRadius: "8px",
                                  padding: "6px 12px",
                                  borderColor: "#4f46e5",
                                  color: "#4f46e5"
                                }}
                              >
                                ✏️
                              </Button>
                              <Button
                                size="sm"
                                variant="outline-danger"
                                onClick={() => handleEliminarUsuario(usuario.id)}
                                style={{
                                  borderRadius: "8px",
                                  padding: "6px 12px"
                                }}
                              >
                                🗑️
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PerfilAdministrador;
