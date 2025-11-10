import type React from "react"
import { useState } from "react"
import "./Perfil.css"

const Perfil = () => {
  const [modoEdicion, setModoEdicion] = useState(false)
  const [datosUsuario, setDatosUsuario] = useState({
    nombre: "Ana García López",
    rol: "Usuario",
    correo: "ana.garcia@email.com",
    id: "001",
    monedas: 1250,
    fotoPerfil: "/logo.png",
  })

  const [datosEditados, setDatosEditados] = useState({ ...datosUsuario })

  // Progreso de lecciones
  const lecciones = [
    { nombre: "Ahorro Inteligente", completada: true, progreso: 100 },
    { nombre: "Presupuesto Personal", completada: true, progreso: 100 },
    { nombre: "Inversión Responsable", completada: false, progreso: 65 },
    { nombre: "Seguridad Digital", completada: false, progreso: 30 },
  ]

  const leccionesCompletadas = lecciones.filter((l) => l.completada).length
  const retosCompletados = 8
  const progresoTotal = Math.round(
    lecciones.reduce((acc, l) => acc + l.progreso, 0) / lecciones.length
  )

  const handleEditarClick = () => {
    if (modoEdicion) {
      // Guardar cambios
      setDatosUsuario(datosEditados)
    }
    setModoEdicion(!modoEdicion)
  }

  const handleCancelar = () => {
    setDatosEditados({ ...datosUsuario })
    setModoEdicion(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDatosEditados({
      ...datosEditados,
      [e.target.name]: e.target.value,
    })
  }

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setDatosEditados({
          ...datosEditados,
          fotoPerfil: reader.result as string,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="perfil-container">
      <div className="container py-5">
        {/* Encabezado */}
        <div className="perfil-header mb-4">
          <h1 className="perfil-titulo">Mi Perfil</h1>
          <div className="perfil-acciones">
            {modoEdicion && (
              <button className="btn-cancelar" onClick={handleCancelar}>
                Cancelar
              </button>
            )}
            <button
              className={`btn-editar ${modoEdicion ? "btn-guardar" : ""}`}
              onClick={handleEditarClick}
            >
              {modoEdicion ? "Guardar Cambios" : "Editar Perfil"}
            </button>
          </div>
        </div>

        <div className="row g-4">
          {/* Columna Izquierda */}
          <div className="col-lg-4">
            {/* Tarjeta de perfil */}
            <div className="perfil-tarjeta">
              <div className="perfil-foto-container">
                <img
                  src={modoEdicion ? datosEditados.fotoPerfil : datosUsuario.fotoPerfil}
                  alt="Foto de perfil"
                  className="perfil-foto"
                />
                {modoEdicion && (
                  <label className="perfil-foto-editar">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFotoChange}
                      style={{ display: "none" }}
                    />
                    <span className="icono-camara">📷</span>
                  </label>
                )}
              </div>
              <h2 className="perfil-nombre">
                {modoEdicion ? datosEditados.nombre : datosUsuario.nombre}
              </h2>
              <p className="perfil-correo">{datosUsuario.correo}</p>

              <div className="perfil-monedas">
                <span className="monedas-icono">💰</span>
                <div className="monedas-info">
                  <span className="monedas-cantidad">{datosUsuario.monedas}</span>
                  <span className="monedas-texto">Monedas Ganadas</span>
                </div>
              </div>
            </div>

            {/* Estadísticas */}
            <div className="perfil-tarjeta mt-4">
              <h3 className="tarjeta-titulo">Estadísticas</h3>
              <div className="estadisticas-grid">
                <div className="estadistica-item">
                  <div className="estadistica-icono">📚</div>
                  <div className="estadistica-info">
                    <span className="estadistica-numero">{leccionesCompletadas}/4</span>
                    <span className="estadistica-label">Lecciones</span>
                  </div>
                </div>
                <div className="estadistica-item">
                  <div className="estadistica-icono">🏆</div>
                  <div className="estadistica-info">
                    <span className="estadistica-numero">{retosCompletados}</span>
                    <span className="estadistica-label">Retos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha */}
          <div className="col-lg-8">
            {/* Datos Personales */}
            <div className="perfil-tarjeta mb-4">
              <h3 className="tarjeta-titulo">Datos Personales</h3>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="perfil-label">Nombre del perfil</label>
                  {modoEdicion ? (
                    <input
                      type="text"
                      name="nombre"
                      className="perfil-input"
                      value={datosEditados.nombre}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p className="perfil-valor">{datosUsuario.nombre}</p>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="perfil-label">Rol</label>
                  <p className="perfil-valor">{datosUsuario.rol}</p>
                </div>
                <div className="col-md-6">
                  <label className="perfil-label">Correo electrónico</label>
                  {modoEdicion ? (
                    <input
                      type="email"
                      name="correo"
                      className="perfil-input"
                      value={datosEditados.correo}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p className="perfil-valor">{datosUsuario.correo}</p>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="perfil-label">ID de usuario</label>
                  <p className="perfil-valor">{datosUsuario.id}</p>
                </div>
              </div>
            </div>

            {/* Mis Metas de Aprendizaje */}
            <div className="perfil-tarjeta mb-4">
              <h3 className="tarjeta-titulo">Mis Metas de Aprendizaje</h3>
              <div className="progreso-general mb-4">
                <div className="progreso-header">
                  <span className="progreso-label">Progreso General</span>
                  <span className="progreso-porcentaje">{progresoTotal}%</span>
                </div>
                <div className="progreso-barra-container">
                  <div
                    className="progreso-barra-fill"
                    style={{ width: `${progresoTotal}%` }}
                  />
                </div>
              </div>

              <div className="lecciones-lista">
                {lecciones.map((leccion, index) => (
                  <div key={index} className="leccion-item">
                    <div className="leccion-header">
                      <div className="leccion-info">
                        <span className="leccion-estado">
                          {leccion.completada ? "✅" : "⏳"}
                        </span>
                        <span className="leccion-nombre">{leccion.nombre}</span>
                      </div>
                      <span className="leccion-porcentaje">{leccion.progreso}%</span>
                    </div>
                    <div className="leccion-barra-container">
                      <div
                        className="leccion-barra-fill"
                        style={{ width: `${leccion.progreso}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Perfil

