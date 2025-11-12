import { createContext, useContext, useState, useEffect } from "react";

// ✅ Crear el contexto global
const MonedasContext = createContext();

// ✅ Provider que envuelve la aplicación
export function MonedasProvider({ children }) {
  const [monedas, setMonedas] = useState(() => {
    // Guarda las monedas incluso si se recarga la página
    const guardado = localStorage.getItem("monedas");
    return guardado ? Number(guardado) : 0;
  });

  // Guardar el valor actualizado en localStorage
  useEffect(() => {
    localStorage.setItem("monedas", monedas);
  }, [monedas]);

  // ✅ Función para ganar monedas
  const ganarMonedas = (cantidad) => {
    setMonedas((prev) => prev + cantidad);
  };

  // ✅ Función para gastar monedas (sin ir negativo)
  const gastarMonedas = (cantidad) => {
    setMonedas((prev) => Math.max(prev - cantidad, 0));
  };

  // ✅ Reiniciar monedas (por ejemplo, al reiniciar el juego)
  const reiniciarMonedas = () => {
    setMonedas(0);
    localStorage.removeItem("monedas");
  };

  // ✅ Lo que compartimos con toda la app
  return (
    <MonedasContext.Provider
      value={{ monedas, ganarMonedas, gastarMonedas, reiniciarMonedas }}
    >
      {children}
    </MonedasContext.Provider>
  );
}

// ✅ Hook personalizado para acceder fácilmente
export const useMonedas = () => useContext(MonedasContext);
