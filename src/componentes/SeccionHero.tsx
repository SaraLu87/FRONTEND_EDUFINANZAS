import type React from "react"
import "./SeccionHero.css"

interface SeccionHeroProps {
  alHacerClicTip: () => void
}

const SeccionHero: React.FC<SeccionHeroProps> = ({ alHacerClicTip }) => {
  return (
    <section className="seccion-hero">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12 text-center">
            <h1 className="titulo-principal mb-5">
              Aprende a manejar tu dinero como un <span className="texto-destacado">Pro</span>
              <span className="emoji-cohete">🚀</span>
            </h1>

            <div className="badge-edad mb-5">Para jóvenes de 14-17 años</div>

            <p className="descripcion-hero mb-0">
              Descubre el mundo de las finanzas personales a través de retos divertidos y
              <br />
              aprende habilidades que te servirán toda la vida.
            </p>          

                       
             
          </div>
        </div>
      </div>
    </section>
  )
}

export default SeccionHero