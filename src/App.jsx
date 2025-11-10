import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Inicio from "./paginas/Inicio"
import Login from "./paginas/Login"
import PerfilPage from "./paginas/PerfilPage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={<PerfilPage />} />
      </Routes>
    </Router>
  )
}

export default App
