import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./CrearReto.css"

interface Opcion {
  id: string
  texto: string
  esCorrecta: boolean
}

interface Pregunta {
  texto: string
  opciones: Opcion[]
  tiempoLimite: number
  puntos: number
}

interface Reto {
  id: string
  titulo: string
  descripcion: string
  contenido: string
  pregunta: Pregunta | null
  fechaCreacion: string
}

const CrearReto = () => {
  const navigate = useNavigate()

  // Lista de retos creados
  const [retosCreados] = useState<Reto[]>([
    {
      id: "1",
      titulo: "Ahorro Básico",
      descripcion: "Aprende los fundamentos del ahorro",
      contenido: "Contenido del reto...",
      pregunta: null,
      fechaCreacion: "2025-01-15",
    },
    {
      id: "2",
      titulo: "Presupuesto Personal",
      descripcion: "Crea tu primer presupuesto",
      contenido: "Contenido del reto...",
      pregunta: null,
      fechaCreacion: "2025-02-10",
    },
  ])

  // Datos del nuevo reto
  const [titulo, setTitulo] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [contenido, setContenido] = useState("")

  // Datos de la pregunta
  const [textoPregunta, setTextoPregunta] = useState("")
  const [opciones, setOpciones] = useState<Opcion[]>([
    { id: "1", texto: "", esCorrecta: false },
    { id: "2", texto: "", esCorrecta: false },
    { id: "3", texto: "", esCorrecta: false },
    { id: "4", texto: "", esCorrecta: false },
  ])
  const [tiempoLimite, setTiempoLimite] = useState(60)
  const [puntos, setPuntos] = useState(100)

  const handleVolver = () => {
    navigate("/perfil-administrador")
  }

  const handleOpcionChange = (id: string, valor: string) => {
    setOpciones(opciones.map(op => op.id === id ? { ...op, texto: valor } : op))
  }

  const handleOpcionCorrectaChange = (id: string) => {
    setOpciones(opciones.map(op => ({ ...op, esCorrecta: op.id === id })))
  }

  const handleAgregarReto = () => {
    if (!titulo || !descripcion || !contenido || !textoPregunta) {
      alert("Por favor complete todos los campos")
      return
    }

    const opcionesValidas = opciones.filter(op => op.texto.trim() !== "")
    if (opcionesValidas.length < 2) {
      alert("Debe agregar al menos 2 opciones de respuesta")
      return
    }

    const tieneCorrecta = opciones.some(op => op.esCorrecta && op.texto.trim() !== "")
    if (!tieneCorrecta) {
      alert("Debe seleccionar una respuesta correcta")
      return
    }

    const nuevoReto: Reto = {
      id: String(Date.now()),
      titulo,
      descripcion,
      contenido,
      pregunta: {
        texto: textoPregunta,
        opciones: opcionesValidas,
        tiempoLimite,
        puntos,
      },
      fechaCreacion: new Date().toISOString().split("T")[0],
    }

    console.log("Nuevo reto creado:", nuevoReto)
    alert("¡Reto creado exitosamente!")

    // Limpiar formulario
    setTitulo("")
    setDescripcion("")
    setContenido("")
    setTextoPregunta("")
    setOpciones([
      { id: "1", texto: "", esCorrecta: false },
      { id: "2", texto: "", esCorrecta: false },
      { id: "3", texto: "", esCorrecta: false },
      { id: "4", texto: "", esCorrecta: false },
    ])
    setTiempoLimite(60)
    setPuntos(100)
  }

  return (
    <div className="crear-reto-container">
      <div className="container py-5">
        {/* Botón Volver */}
        <button className="btn-volver" onClick={handleVolver}>
          ← Volver al Panel
        </button>

        <h1 className="titulo-principal">Crear Nuevo Reto</h1>

        <div className="row g-4 mt-3">
          {/* Columna Izquierda - Información */}
          <div className="col-lg-4">
            {/* Retos Creados */}
            <div className="tarjeta-info">
              <h3 className="tarjeta-titulo-info">📊 Retos Creados</h3>
              <div className="numero-retos">{retosCreados.length}</div>
              <div className="lista-retos-info">
                {retosCreados.map((reto) => (
                  <div key={reto.id} className="reto-info-item">
                    <div className="reto-info-titulo">{reto.titulo}</div>
                    <div className="reto-info-fecha">
                      📅 {new Date(reto.fechaCreacion).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Columna Derecha - Formulario */}
          <div className="col-lg-8">
            {/* Información del Reto */}
            <div className="tarjeta-formulario mb-4">
              <h3 className="tarjeta-titulo-formulario">📝 Información del Reto</h3>

              <div className="form-group">
                <label className="form-label">Título del Reto</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ej: Ahorro Inteligente"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Descripción</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Breve descripción del reto"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Contenido del Reto</label>
                <textarea
                  className="form-textarea"
                  rows={5}
                  placeholder="Contenido completo del reto, explicación, ejemplos, etc."
                  value={contenido}
                  onChange={(e) => setContenido(e.target.value)}
                />
              </div>
            </div>

            {/* Pregunta del Reto */}
            <div className="tarjeta-formulario">
              <h3 className="tarjeta-titulo-formulario">❓ Pregunta del Reto</h3>

              <div className="form-group">
                <label className="form-label">Texto de la Pregunta</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="¿Cuál es la pregunta?"
                  value={textoPregunta}
                  onChange={(e) => setTextoPregunta(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Opciones de Respuesta</label>
                <div className="opciones-container">
                  {opciones.map((opcion, index) => (
                    <div key={opcion.id} className="opcion-item">
                      <input
                        type="radio"
                        name="respuestaCorrecta"
                        className="radio-input"
                        checked={opcion.esCorrecta}
                        onChange={() => handleOpcionCorrectaChange(opcion.id)}
                      />
                      <input
                        type="text"
                        className="opcion-input"
                        placeholder={`Opción ${index + 1}`}
                        value={opcion.texto}
                        onChange={(e) => handleOpcionChange(opcion.id, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
                <p className="texto-ayuda">Selecciona el círculo de la respuesta correcta</p>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">⏱️ Tiempo Límite (segundos)</label>
                    <input
                      type="number"
                      className="form-input"
                      min="10"
                      max="300"
                      value={tiempoLimite}
                      onChange={(e) => setTiempoLimite(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">🏆 Puntos</label>
                    <input
                      type="number"
                      className="form-input"
                      min="10"
                      max="1000"
                      step="10"
                      value={puntos}
                      onChange={(e) => setPuntos(Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              <button className="btn-agregar-reto" onClick={handleAgregarReto}>
                ✅ Agregar Reto
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CrearReto
