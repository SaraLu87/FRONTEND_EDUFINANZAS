import { ProgressBar } from "react-bootstrap";
import { motion } from "framer-motion";
import "./BarraProgreso.css";

function BarraProgreso({ progreso }) {
  const porcentaje = Math.min(progreso, 100);

  return (
    <div className="contenedor-progreso">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ProgressBar
          now={porcentaje}
          variant="info"
          animated
          style={{
            height: "28px",
            borderRadius: "20px",
            backgroundColor: "#e5e7eb",
            boxShadow: "inset 0 2px 8px rgba(0,0,0,0.2)",
          }}
        />
        <motion.div
          className="texto-porcentaje"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {porcentaje.toFixed(0)}%
        </motion.div>
      </motion.div>
    </div>
  );
}

export default BarraProgreso;
