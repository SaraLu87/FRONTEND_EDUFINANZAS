import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Contextos globales
import { MonedasProvider } from "./componentes/MonedasContext";
import { ProgresoProvider } from "./componentes/ProgresoContext";

// Páginas principales
import Registro from "./paginas/Registro";
import Login from "./paginas/Login";
import Inicio from "./paginas/Inicio";
import Temas from "./paginas/Temas";
import Perfil from "./paginas/Perfil";
import PerfilAdministrador from "./paginas/PerfilAdministrador";
import CrearReto from "./paginas/CrearReto";
import RetoAhorro from "./paginas/RetoAhorro";
import AhorroInfo from "./paginas/AhorroInfo";
import AhorroDatos from "./paginas/AhorroDatos";
import AhorroPreguntas from "./paginas/AhorroPreguntas";
import RetoPresupuesto from "./paginas/RetoPresupuesto";
import PresupuestoInfo from "./paginas/PresupuestoInfo";
import PresupuestoDatos from "./paginas/PresupuestoDatos";
import PresupuestoPreguntas from "./paginas/PresupuestoPreguntas";
import RetoInversion from "./paginas/RetoInversion";
import RetoSeguridad from "./paginas/RetoSeguridad";
import InversionInfo from "./paginas/InversionInfo";
import InversionPreguntas from "./paginas/InversionPreguntas";
import InversionDatos from "./paginas/InversionDatos";
import SeguridadInfo from "./paginas/SeguridadInfo";
import SeguridadDatos from "./paginas/SeguridadDatos";
import SeguridadPreguntas from "./paginas/SeguridadPreguntas";


function App() {
  return (
    //Envolvemos toda la aplicación con los contextos globales
    <MonedasProvider>
      <ProgresoProvider>
        <BrowserRouter>
          <Routes>
            {/* Redirección inicial */}
            <Route path="/" element={<Navigate to="/registro" replace />} />

            {/* Rutas principales */}
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/login" element={<Login />} /> 
            <Route path="/registro" element={<Registro />} />                       
            <Route path="/temas" element={<Temas />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/perfil-administrador" element={<PerfilAdministrador />} />
            <Route path="/crear-reto" element={<CrearReto />} />

            {/* Rutas de los retos de Ahorro */}
            <Route path="/ahorro" element={<RetoAhorro />} />
            <Route path="/ahorro-info" element={<AhorroInfo />} />
            <Route path="/ahorro-datos" element={<AhorroDatos />} />
            <Route path="/ahorro-preguntas" element={<AhorroPreguntas />} />
            <Route path="/presupuesto" element={<RetoPresupuesto />} />
            <Route path="/presupuesto-info" element={<PresupuestoInfo/>} />
            <Route path="/presupuesto-datos" element={<PresupuestoDatos />} />
            <Route path="/presupuesto-preguntas" element={<PresupuestoPreguntas />} />
            <Route path="/inversion" element={<RetoInversion />} />
            <Route path="/seguridad" element={<RetoSeguridad />} />
            <Route path="/inversion-info" element={<InversionInfo />} />
            <Route path="/inversion-preguntas" element={<InversionPreguntas />} />
            <Route path="/inversion-datos" element={<InversionDatos />} />
            <Route path="/seguridad-info" element={<SeguridadInfo />} />
            <Route path="/seguridad-datos" element={<SeguridadDatos />} />
            <Route path="/seguridad-preguntas" element={<SeguridadPreguntas />} />



            

            {/* Página de error 404 */}
            <Route
              path="*"
              element={
                <div
                  style={{
                    padding: 40,
                    textAlign: "center",
                    color: "#334155",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  <h2>⚠️ 404 - Página no encontrada</h2>
                  <p>Verifica la dirección o vuelve al inicio.</p>
                </div>
              }
            />
          </Routes>
        </BrowserRouter>
      </ProgresoProvider>
    </MonedasProvider>
  );
}

export default App;
