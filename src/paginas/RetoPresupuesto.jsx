import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMonedas } from "../componentes/MonedasContext";
import { useProgreso } from "../componentes/ProgresoContext";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import "../componentes/RetoPresupuesto.css";

function RetoPresupuesto() {
  const navigate = useNavigate();
  const { monedas, ganarMonedas, gastarMonedas } = useMonedas();
  const { progreso, actualizarProgreso } = useProgreso();

  // 🪙 Cada reto completado otorga monedas y aumenta el progreso
  const completarReto = (nivel) => {
    ganarMonedas(60);
    const nuevoProgreso = Math.min(progreso.presupuesto + 33.3, 100);
    actualizarProgreso("presupuesto", nuevoProgreso);
    alert(`🎉 Has completado "${nivel}" y ganado 60 monedas.`);
  };

  return (
    <>
      <Encabezado monedas={monedas} />

      <div className="reto-fondo">
        <Container className="text-center py-5">
          <h1 className="titulo-reto">💼 Presupuesto</h1>
          <h3 className="subtitulo-reto text-muted mb-5">
            ¡Tu Brújula Financiera!
          </h3>

          <div className="flujo-retos">
            {/* 🔹 1. Lo que debes saber */}
            <div
              className="reto-circulo circulo-azul"
              onClick={() => navigate("/presupuesto-info")}
              onDoubleClick={() => completarReto("Lo que debes saber")}
            >
              <h5>Lo que debes saber</h5>
            </div>

            <div className="conector-curvo"></div>

            {/* 🔹 2. Datos curiosos */}
            <div
              className="reto-circulo circulo-verde"
              onClick={() => navigate("/presupuesto-datos")}
              onDoubleClick={() => completarReto("Datos curiosos")}
            >
              <h5>Datos curiosos</h5>
            </div>

            <div className="conector-curvo"></div>

            {/* 🔹 3. Preguntas */}
            <div
              className="reto-circulo circulo-amarillo"
              onClick={() => navigate("/presupuesto-preguntas")}
              onDoubleClick={() => completarReto("Preguntas")}
            >
              <h5>Preguntas</h5>
            </div>
          </div>

          {/* 💬 Instrucción al usuario */}
          <p className="texto-instruccion mt-4 text-secondary">
            Haz clic para ingresar al reto o doble clic para marcarlo como completado.
          </p>
        </Container>
      </div>

      <Footer />
    </>
  );
}

export default RetoPresupuesto;
