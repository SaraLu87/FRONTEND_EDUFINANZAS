import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Footer";
import "../componentes/SeguridadDatos.css";

function SeguridadDatos() {
  const navigate = useNavigate();

  const datos = [
    {
      titulo: "🎭 ¡El Ataque de la 'Ingeniería Social'!",
      texto:
        "Los 'villanos' no siempre usan computadoras. A veces solo te manipulan, haciéndose pasar por un banco o amigo para que tú mismo les des tus datos. ¡Nunca compartas tu información sin verificar!",
    },
    {
      titulo: "🔒 Contraseñas que Durarían Millones de Años",
      texto:
        "Una contraseña con 12 caracteres (mayúsculas, minúsculas, números y símbolos) puede tardar millones de años en ser adivinada. ¡Entre más larga y compleja, mejor tu escudo!",
    },
    {
      titulo: "🕵️‍♀️ El 'Candadito' No Es un Adorno",
      texto:
        "Ese pequeño candado en la barra de direcciones (https://) significa que la conexión es segura y tus datos van protegidos. ¡Asegúrate de verlo antes de pagar o ingresar información!",
    },
    {
      titulo: "💻 Tu Huella Digital es Más que tu Dedo",
      texto:
        "Todo lo que haces en internet deja un rastro: búsquedas, compras, publicaciones. ¡Cuida tu huella digital y protege tu privacidad para un futuro financiero seguro!",
    },
  ];

  return (
    <>
      <Encabezado monedas={200} />

      <motion.div
        className="seguridad-datos-fondo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <Container className="text-center py-5">
          <h1 className="titulo-datos">🧠 Datos Curiosos de la Seguridad Financiera</h1>
          <h4 className="subtitulo-datos mb-5">¡Alerta, Súper Agente! 🕵️‍♂️</h4>

          <div className="grid-datos">
            {datos.map((dato, index) => (
              <motion.div
                key={index}
                className="tarjeta-dato"
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <h3>{dato.titulo}</h3>
                <p>{dato.texto}</p>
              </motion.div>
            ))}
          </div>

          <motion.button
            className="boton-siguiente"
            onClick={() => navigate("/seguridad-preguntas")}
            whileHover={{ scale: 1.1 }}
          >
            Siguiente ➡️
          </motion.button>
        </Container>
      </motion.div>

      <Footer />
    </>
  );
}

export default SeguridadDatos;
