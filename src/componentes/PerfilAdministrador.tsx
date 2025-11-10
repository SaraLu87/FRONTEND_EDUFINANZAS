import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./PerfilAdministrador.css"

interface Usuario {
  id: string
  nombre: string
  correo: string
  rol: string
}

const PerfilAdministrador = () => {
  const navigate = useNavigate()
  const [datosAdmin] = useState({
    nombre: "Administrador Principal",
    rol: "Administrador",
    correo: "admin@edufinanzas.com",
    id: "001",
    fotoPerfil: "/logo.png",
  })

  const [usuarios, setUsuarios] = useState<Usuario[]>([
    { id: "001", nombre: "Ana García López", correo: "ana.garcia@email.com", rol: "Usuario" },
    { id: "002", nombre: "Carlos Mendoza", correo: "carlos.mendoza@email.com", rol: "Usuario" },
    { id: "003", nombre: "María Torres", correo: "maria.torres@email.com", rol: "Usuario" },
    { id: "004", nombre: "Juan Pérez", correo: "juan.perez@email.com", rol: "Usuario" },
  ])

  const [modoEdicion, setModoEdicion] = useState<string | null>(null)
  const [usuarioEditado, setUsuarioEditado] = useState<Usuario | null>(null)

  const handleCrearReto = () => {
    navigate("/crear-reto")
  }

  const handleEditarUsuario = (usuario: Usuario) => {
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

  const handleEliminarUsuario = (id: string) => {
    if (window.confirm("¿Está seguro de eliminar este usuario?")) {
      setUsuarios(usuarios.filter(u => u.id !== id))
    }
  }

  const handleInputChange = (field: keyof Usuario, value: string) => {
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
    <div className="perfil-admin-container">
      <div className="container py-5">
        {/* Encabezado */}
        <div className="perfil-header mb-4">
          <h1 className="perfil-titulo">Panel de Administración</h1>
          <button className="btn-crear-reto" onClick={handleCrearReto}>
            + Crear Nuevo Reto
          </button>
        </div>

        <div className="row g-4">
          {/* Columna Izquierda */}
          <div className="col-lg-4">
            {/* Tarjeta de perfil */}
            <div className="perfil-tarjeta">
              <div className="perfil-foto-container">
                <img
                  src={datosAdmin.fotoPerfil}
                  alt="Foto de perfil"
                  className="perfil-foto"
                />
              </div>
              <h2 className="perfil-nombre">{datosAdmin.nombre}</h2>
              <p className="perfil-rol-admin">{datosAdmin.rol}</p>
              <p className="perfil-correo">{datosAdmin.correo}</p>
            </div>

            {/* Estadísticas */}
            <div className="perfil-tarjeta mt-4">
              <h3 className="tarjeta-titulo">Estadísticas Generales</h3>
              <div className="estadisticas-grid">
                <div className="estadistica-item">
                  <div className="estadistica-icono">👥</div>
                  <div className="estadistica-info">
                    <span className="estadistica-numero">{estadisticas.totalUsuarios}</span>
                    <span className="estadistica-label">Usuarios</span>
                  </div>
                </div>
                <div className="estadistica-item">
                  <div className="estadistica-icono">🎯</div>
                  <div className="estadistica-info">
                    <span className="estadistica-numero">{estadisticas.retosCreados}</span>
                    <span className="estadistica-label">Retos</span>
                  </div>
                </div>
                <div className="estadistica-item">
                  <div className="estadistica-icono">✅</div>
                  <div className="estadistica-info">
                    <span className="estadistica-numero">{estadisticas.usuariosActivos}</span>
                    <span className="estadistica-label">Activos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha */}
          <div className="col-lg-8">
            {/* Lista de Usuarios */}
            <div className="perfil-tarjeta">
              <h3 className="tarjeta-titulo">Gestión de Usuarios</h3>
              <div className="tabla-usuarios">
                <table className="tabla-usuarios-contenido">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Correo</th>
                      <th>Rol</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map((usuario) => (
                      <tr key={usuario.id}>
                        <td>
                          {modoEdicion === usuario.id && usuarioEditado ? (
                            <input
                              type="text"
                              className="input-tabla"
                              value={usuarioEditado.nombre}
                              onChange={(e) => handleInputChange("nombre", e.target.value)}
                            />
                          ) : (
                            usuario.nombre
                          )}
                        </td>
                        <td>
                          {modoEdicion === usuario.id && usuarioEditado ? (
                            <input
                              type="email"
                              className="input-tabla"
                              value={usuarioEditado.correo}
                              onChange={(e) => handleInputChange("correo", e.target.value)}
                            />
                          ) : (
                            usuario.correo
                          )}
                        </td>
                        <td>
                          {modoEdicion === usuario.id && usuarioEditado ? (
                            <select
                              className="input-tabla"
                              value={usuarioEditado.rol}
                              onChange={(e) => handleInputChange("rol", e.target.value)}
                            >
                              <option value="Usuario">Usuario</option>
                              <option value="Administrador">Administrador</option>
                            </select>
                          ) : (
                            <span className={`badge-rol ${usuario.rol.toLowerCase()}`}>
                              {usuario.rol}
                            </span>
                          )}
                        </td>
                        <td>
                          <div className="acciones-grupo">
                            {modoEdicion === usuario.id ? (
                              <>
                                <button
                                  className="btn-accion btn-guardar"
                                  onClick={handleGuardarUsuario}
                                >
                                  💾
                                </button>
                                <button
                                  className="btn-accion btn-cancelar-tabla"
                                  onClick={handleCancelarEdicion}
                                >
                                  ✖
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  className="btn-accion btn-editar-tabla"
                                  onClick={() => handleEditarUsuario(usuario)}
                                >
                                  ✏️
                                </button>
                                <button
                                  className="btn-accion btn-eliminar"
                                  onClick={() => handleEliminarUsuario(usuario.id)}
                                >
                                  🗑️
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PerfilAdministrador
