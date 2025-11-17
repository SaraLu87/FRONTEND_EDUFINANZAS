import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Container, Row, Col, Card, Button, Table, Form, Badge } from "react-bootstrap";


import axios from "axios";
// Importar el archivo CSS refactorizado
import "../componentes/PerfilAdministrador.css";
// Importar logo para la foto de perfil del administrador
import logo from "../assets/logo.png";

const PerfilAdministrador = () => {
  const navigate = useNavigate();
  const [datosAdmin] = useState({
    nombre: "Administrador Principal",
    rol: "Administrador",
    correo: "admin@edufinanzas.com",
    id: "001",
    fotoPerfil: logo,
  });

  // Estado para perfiles (http://127.0.0.1:8000/api/perfiles/)
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/perfiles/");
        // Asumiendo que 'perfiles' de la API son los datos de los usuarios en la tabla
        setUsuarios(res.data);
      } catch (error) {
        console.error("Error al obtener perfiles:", error);
      }
    };
    obtenerUsuarios();
  }, []);

  // Estado para usuarios (http://127.0.0.1:8000/api/usuarios/)
  // **Nota:** Los nombres de las variables `usuarios` y `perfiles` parecen estar invertidos
  // con respecto a las URLs de la API. Asumo que la intención era cargar todos los registros
  // para poder vincular información.
  const [perfiles, setPefiles] = useState([]);

  useEffect(() => {
    const obtenerPerfiles = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/usuarios/");
        setPefiles(res.data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };
    obtenerPerfiles();
  }, []);

  const [modoEdicion, setModoEdicion] = useState(null);
  const [usuarioEditado, setUsuarioEditado] = useState(null);

  /**
   * Busca el perfil de usuario (API /usuarios/) asociado al correo del perfil (API /perfiles/).
   * Esto se usa para obtener el "rol" que parece estar en la respuesta de /usuarios/.
   */
  const perfilEncontrado = (correo) => {
    return perfiles.find(p => p.correo === correo);
  };

  const handleCrearReto = () => {
    navigate("/crear-reto");
  };

  const handleEditarUsuario = (usuario) => {
        setModoEdicion(usuario.id_perfil);    
    const datosRol = perfilEncontrado(usuario.correo) || {};
    setUsuarioEditado({
      ...usuario,
      rol: datosRol.rol || 'Usuario', // Asignar un rol por defecto
      nombre: usuario.nombre_perfil // Usar el nombre actual de la tabla
    });

    /*
      Nota: La llamada a la API para actualizar un usuario debe hacerse en `handleGuardarUsuario`.
      La llamada comentada aquí no es necesaria:
      // const res = await axios.put(
      //   `http://127.0.0.1:8000/api/usuarios/${usuario.id_usuario}/`,
      //   datosActualizados
      // );
      // console.log("Usuario actualizado:", res.data);
    */
  };

  const handleGuardarUsuario = async () => {
    if (usuarioEditado) {
      try {
        // En un entorno real, enviarías el `usuarioEditado` a la API
        // para actualizar ambos registros si fuera necesario (perfil y usuario).
        
        // Simulación de actualización local:
        setUsuarios(usuarios.map(u => 
          u.id_perfil === modoEdicion ? { ...u, nombre_perfil: usuarioEditado.nombre, correo: usuarioEditado.correo } : u
        ));

        // Simulación de actualización local del rol:
        setPefiles(perfiles.map(p => 
          p.correo === usuarioEditado.correo ? { ...p, rol: usuarioEditado.rol } : p
        ));
        
        // Aquí iría el código de Axios para actualizar en la API
        /*
        const datosActualizadosPerfil = {
          nombre_perfil: usuarioEditado.nombre,
          correo: usuarioEditado.correo,
          // otros campos del perfil
        };
        const resPerfil = await axios.put(`http://127.0.0.1:8000/api/perfiles/${modoEdicion}/`, datosActualizadosPerfil);
        
        // Si el rol está en /api/usuarios, necesitarías el ID del usuario
        // El mapeo de ID es crucial para esto. Aquí se usa el correo como llave.
        const usuarioDB = perfilEncontrado(usuarioEditado.correo);
        if (usuarioDB) {
          const datosActualizadosUsuario = { rol: usuarioEditado.rol };
          await axios.put(`http://127.0.0.1:8000/api/usuarios/${usuarioDB.id}/`, datosActualizadosUsuario);
        }
        */

        setModoEdicion(null);
        setUsuarioEditado(null);

      } catch (error) {
        console.error("Error al guardar usuario:", error);
        // Manejar error (e.g., mostrar notificación)
      }
    }
  };

  const handleCancelarEdicion = () => {
    setModoEdicion(null);
    setUsuarioEditado(null);
  };

  const handleEliminarUsuario = (id_usuario) => {
    if (window.confirm("¿Está seguro de eliminar este usuario?")) {
      // En un entorno real, usarías axios.delete
      // Simulación de eliminación local:
      setUsuarios(usuarios.filter(u => u.id_usuario !== id_usuario));
      
      /*
      try {
        await axios.delete(`http://127.0.0.1:8000/api/perfiles/${id_usuario}/`);
        setUsuarios(usuarios.filter(u => u.id_usuario !== id_usuario));
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
      }
      */
    }
  };

  const handleInputChange = (field, value) => {
    if (usuarioEditado) {
      setUsuarioEditado({ ...usuarioEditado, [field]: value });
    }
  };

  const estadisticas = {
    totalUsuarios: usuarios.length,
    retosCreados: 12, // Valor fijo de ejemplo
    usuariosActivos: usuarios.length, // Se usa el mismo valor de ejemplo
  };

  return (
    <div className="admin-page">
      <Container className="py-5">
        {/* Encabezado */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="admin-header-title">
            Panel de Administración
          </h1>
          <Button
            onClick={handleCrearReto}
            className="create-challenge-btn"
          >
            + Crear Nuevo Reto
          </Button>
        </div>

        <Row className="g-4">
          {/* Columna Izquierda - Perfil y Estadísticas */}
          <Col lg={4}>
            {/* Tarjeta de perfil */}
            <Card className="profile-card border-0 text-center">
              <img
                src={datosAdmin.fotoPerfil}
                alt="Foto de perfil"
                className="profile-avatar"
              />
              <h2 className="profile-name">
                {datosAdmin.nombre}
              </h2>
              <Badge
                bg="success"
                style={{ fontSize: "0.9rem", padding: "5px 15px", marginBottom: "10px" }}
              >
                {datosAdmin.rol}
              </Badge>
              <p className="profile-email">
                {datosAdmin.correo}
              </p>
            </Card>

            {/* Estadísticas */}
            <Card className="stats-card border-0">
              <h3 className="stats-title">
                Estadísticas Generales
              </h3>
              <div className="d-flex flex-column gap-3">
                {/* Total Usuarios */}
                <div className="stat-item">
                  <div className="stat-icon">👥</div>
                  <div>
                    <div className="stat-value">
                      {estadisticas.totalUsuarios}
                    </div>
                    <div className="stat-label">
                      Usuarios
                    </div>
                  </div>
                </div>
                {/* Retos Creados */}
                <div className="stat-item">
                  <div className="stat-icon">🎯</div>
                  <div>
                    <div className="stat-value">
                      {estadisticas.retosCreados}
                    </div>
                    <div className="stat-label">
                      Retos
                    </div>
                  </div>
                </div>
                {/* Usuarios Activos */}
                <div className="stat-item">
                  <div className="stat-icon">✅</div>
                  <div>
                    <div className="stat-value">
                      {estadisticas.usuariosActivos}
                    </div>
                    <div className="stat-label">
                      Activos
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Col>

          {/* Columna Derecha - Gestión de Usuarios */}
          <Col lg={8}>
            {/* Lista de Usuarios */}
            <Card className="users-card border-0">
              <h3 className="users-title">
                Gestión de Usuarios
              </h3>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usuario) => {
                    const rolUsuario = perfilEncontrado(usuario.correo)?.rol || "Sin Rol";
                    const isEditing = modoEdicion === usuario.id_perfil;
                    
                    // Ajuste para usar el ID correcto en la fila
                    const uniqueKey = usuario.id_perfil || usuario.id_usuario; 

                    return (
                      <tr key={uniqueKey}>
                        <td>
                          {isEditing && usuarioEditado ? (
                            <Form.Control
                              type="text"
                              // Usar el campo correcto del perfil original/editado
                              value={usuarioEditado.nombre}
                              onChange={(e) => handleInputChange("nombre", e.target.value)}
                              className="edit-input"
                            />
                          ) : (
                            usuario.nombre_perfil
                          )}
                        </td>
                        <td>
                          {isEditing && usuarioEditado ? (
                            <Form.Control
                              type="email"
                              value={usuarioEditado.correo}
                              onChange={(e) => handleInputChange("correo", e.target.value)}
                              className="edit-input"
                            />
                          ) : (
                            usuario.correo
                          )}
                        </td>
                        <td>
                          {isEditing && usuarioEditado ? (
                            <Form.Select
                              value={usuarioEditado.rol}
                              onChange={(e) => handleInputChange("rol", e.target.value)}
                              className="edit-select"
                            >
                              <option value="Usuario">Usuario</option>
                              <option value="Administrador">Administrador</option>
                            </Form.Select>
                          ) : (
                            <Badge
                              bg={rolUsuario === "Administrador" ? "success" : "primary"}
                              style={{ fontSize: "0.85rem", padding: "6px 12px", fontWeight: "600" }}
                            >
                              {rolUsuario}
                            </Badge>
                          )}
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            {modoEdicion === usuario.id_perfil ? (
                              <>
                                <Button
                                  size="sm"
                                  onClick={handleGuardarUsuario}
                                  className="save-btn"
                                >
                                  💾
                                </Button>
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  onClick={handleCancelarEdicion}
                                  className="cancel-btn"
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
                                  className="edit-btn"
                                >
                                  ✏️
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline-danger"
                                  onClick={() => handleEliminarUsuario(usuario.id_usuario)}
                                  className="delete-btn"
                                >
                                  🗑️
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
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