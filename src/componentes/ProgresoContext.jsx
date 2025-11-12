import { createContext, useContext, useState, useEffect } from "react";

const ProgresoContext = createContext();

export function ProgresoProvider({ children }) {
  // Guarda progreso por tema (Ahorro, Presupuesto, etc.)
  const [progreso, setProgreso] = useState(() => {
    const guardado = localStorage.getItem("progreso");
    return guardado ? JSON.parse(guardado) : {};
  });

  useEffect(() => {
    localStorage.setItem("progreso", JSON.stringify(progreso));
  }, [progreso]);

  // ✅ Actualiza el progreso de un tema específico
  const actualizarProgreso = (tema, nuevoPorcentaje) => {
    setProgreso((prev) => ({
      ...prev,
      [tema]: Math.min(nuevoPorcentaje, 100),
    }));
  };

  // ✅ Obtener progreso actual de un tema
  const obtenerProgreso = (tema) => {
    return progreso[tema] || 0;
  };

  // ✅ Reiniciar todo el progreso
  const reiniciarProgreso = () => {
    setProgreso({});
    localStorage.removeItem("progreso");
  };

  return (
    <ProgresoContext.Provider
      value={{ progreso, actualizarProgreso, obtenerProgreso, reiniciarProgreso }}
    >
      {children}
    </ProgresoContext.Provider>
  );
}

// Hook personalizado
export const useProgreso = () => useContext(ProgresoContext);
