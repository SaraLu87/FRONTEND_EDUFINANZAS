"use client"

import type React from "react"
import Image from "next/image"
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
            <h1 className="titulo-principal mb-3">
              Aprende a manejar tu dinero como un <span className="texto-destacado">Pro</span>
              <span className="emoji-cohete">🚀</span>
            </h1>

            <div className="badge-edad mb-4">Para jóvenes de 14-17 años</div>

            <p className="descripcion-hero mb-5">
              Descubre el mundo de las finanzas personales a través de retos divertidos y
              <br />
              aprende habilidades que te servirán toda la vida.
            </p>

            <div className="seccion-tips mt-5">
              <h2 className="titulo-tips mb-4">Recibe tips financieros</h2>
              <button className="btn btn-quiero-tip" onClick={alHacerClicTip}>
                Quiero mi tip
              </button>
            </div>

            <div className="ilustraciones-hero">
              <div className="ilustracion-izquierda">
                <Image
                  // la imagen esta en public
                  src="/primera_image.jpg"
                  alt="Mujer enseñando finanzas a una niña"
                  width={300}
                  height={250}
                  className="imagen-decorativa"
                />
              </div>
              <div className="ilustracion-derecha">
                <Image
                  src="/segunda_image.jpg"
                  alt="Mujer trabajando con finanzas en laptop"
                  width={300}
                  height={250}
                  className="imagen-decorativa"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SeccionHero
