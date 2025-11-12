import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMonedas } from "../componentes/MonedasContext";
import { useProgreso } from "../componentes/ProgresoContext";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import "../componentes/RetoInversion.css";

function RetoInversion() {
  const navigate = useNavigate();
  const { monedas, ganarMonedas } = useMonedas();
  const { progreso, actualizarProgreso } = useProgreso();

  // 🪙 Completar reto (doble clic)
  const completarReto = (nivel) => {
    ganarMonedas(60);
    const nuevoProgreso = Math.min(progreso.inversion + 33.3, 100);
    actualizarProgreso("inversion", nuevoProgreso);
    alert(`🎉 Has completado "${nivel}" y ganado 60 monedas.`);
  };

  return (
    <>
      <Encabezado monedas={monedas} />

      <div className="reto-fondo">
        <Container className="text-center py-5">
          <h1 className="titulo-reto">💹 Inversión Inteligente</h1>
          <h3 className="subtitulo-reto text-muted mb-5">
            ¡Haz que tu dinero trabaje por ti!
          </h3>

          <div className="flujo-retos">
            {/* 🔹 1. Lo que debes saber */}
            <div
              className="reto-circulo circulo-azul"
              onClick={() => navigate("/inversion-info")}
              onDoubleClick={() => completarReto("Lo que debes saber")}
            >
              <h5>Lo que debes saber</h5>
            </div>

            {/* Conector */}
            <div className="conector-efecto"></div>

            {/* 🔹 2. Datos curiosos */}
            <div
              className="reto-circulo circulo-verde"
              onClick={() => navigate("/inversion-datos")}
              onDoubleClick={() => completarReto("Datos curiosos")}
            >
              <h5>Datos curiosos</h5>
            </div>

            {/* Conector */}
            <div className="conector-efecto"></div>

            {/* 🔹 3. Preguntas */}
            <div
              className="reto-circulo circulo-morado"
              onClick={() => navigate("/inversion-preguntas")}
              onDoubleClick={() => completarReto("Preguntas")}
            >
              <h5>Preguntas</h5>
            </div>
          </div>

          <p className="texto-instruccion mt-4 text-secondary">
            Haz clic para ingresar al reto o doble clic para marcarlo como completado.
          </p>
        </Container>
      </div>

      <Footer />
    </>
  );
}

export default RetoInversion;
