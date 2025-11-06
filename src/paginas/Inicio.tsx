"use client"
import Navbar from "../componentes/Navbar"
import SeccionHero from "../componentes/SeccionHero"
import SeccionAprendizaje from "../componentes/SeccionAprendizaje"
import Footer from "../componentes/Footer"

const Inicio = () => {
  // Función para hacer scroll suave a la sección de aprendizaje
  const manejarScrollATips = () => {
    const seccionAprendizaje = document.getElementById("que-aprenderas")
    if (seccionAprendizaje) {
      seccionAprendizaje.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <div>
      <Navbar />
      <SeccionHero alHacerClicTip={manejarScrollATips} />
      <SeccionAprendizaje />
      <Footer />
    </div>
  )
}

export default Inicio
