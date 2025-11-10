import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Inicio from "./paginas/Inicio"
import Login from "./paginas/Login"
import PerfilPage from "./paginas/PerfilPage"
import PerfilAdministradorPage from "./paginas/PerfilAdministradorPage"
import CrearRetoPage from "./paginas/CrearRetoPage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={<PerfilPage />} />
        <Route path="/perfil-administrador" element={<PerfilAdministradorPage />} />
        <Route path="/crear-reto" element={<CrearRetoPage />} />
      </Routes>
    </Router>
  )
}

export default App
