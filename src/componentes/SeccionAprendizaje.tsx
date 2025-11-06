"use client"
import "./SeccionAprendizaje.css"

const SeccionAprendizaje = () => {
  const modulos = [
    {
      icono: "🐷",
      titulo: "Ahorro Inteligente",
      descripcion: "Aprende técnicas de ahorro efectivas y crea tu primer fondo de emergencia",
    },
    {
      icono: "🧮",
      titulo: "Presupuesto Personal",
      descripcion: "Domina el arte de planificar tus gastos y maximizar tus ingresos",
    },
    {
      icono: "📊",
      titulo: "Inversión Responsable",
      descripcion: "Descubre los fundamentos de la inversión y cómo hacer crecer tu dinero",
    },
    {
      icono: "🛡️",
      titulo: "Seguridad Digital",
      descripcion: "Usa herramientas financieras digitales de forma segura y responsable",
    },
  ]

  const tips = [
    {
      titulo: "Regla 50/30/20",
      descripcion: "50% necesidades, 30% gustos, 20% ahorros. ¡Una fórmula simple para manejar tu dinero!",
      color: "#a78bfa",
    },
    {
      titulo: "Interés Compuesto",
      descripcion: "El dinero que ahorres hoy puede multiplicarse con el tiempo. ¡Empieza temprano!",
      color: "#fbbf24",
    },
  ]

  return (
    <section className="seccion-aprendizaje" id="que-aprenderas">
      <div className="container">
        {/* Sección ¿Qué aprenderás? */}
        <div className="mb-2 pb-5">
          <h2 className="titulo-seccion text-center mb-3">¿Qué aprenderás?</h2>
          <p className="subtitulo-seccion text-center mb-5">
            Módulos diseñados específicamente para adolescentes, combinando teoría y práctica.
          </p>

          <div className="row g-4">
            {modulos.map((modulo, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="tarjeta-modulo">
                  <div className="icono-modulo">{modulo.icono}</div>
                  <h3 className="titulo-modulo">{modulo.titulo}</h3>
                  <p className="descripcion-modulo">{modulo.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sección Tips Financieros del Día */}
        <div className="seccion-tips-dia">
          <div className="ilustracion-persona-celebrando mt-4">
            {/* <span className="emoji-celebracion ">🎉</span>
            <span className="emoji-moneda">💰</span> */}
          </div>

          <h2 className="titulo-tips-dia text-center mb-5">🎉 Tips Financieros del Día 💰</h2>

          <div className="row g-4 justify-content-center mb-5">
            {tips.map((tip, index) => (
              <div key={index} className="col-md-6 col-lg-5">
                <div className="tarjeta-tip" style={{ backgroundColor: tip.color }}>
                  <h3 className="titulo-tip">{tip.titulo}</h3>
                  <p className="descripcion-tip">{tip.descripcion}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="ilustracion-monedas">
            <span className="moneda-flotante">💵</span>
            <span className="moneda-flotante">💰</span>
            <span className="moneda-flotante">🪙</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SeccionAprendizaje
