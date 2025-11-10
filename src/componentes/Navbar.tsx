import { Link } from "react-router-dom"
import "./Navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src="/logo.png"
            alt="Logo EduFinanzas"
            className="logo-circulo"
          />
          <span className="logo-texto ms-2 text-black">EduFinanzas</span>
        </Link>
        <div className="d-flex gap-2 align-items-center">
          <Link to="/perfil" className="text-decoration-none">
            <span className="btn-perfil">👤 Mi Perfil</span>
          </Link>
          <Link to="/login">
            <button className="btn btn-iniciar-reto">Iniciar Reto</button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
