"use client"
import Link from "next/link"
import "./Navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
      <div className="container">
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <div className="logo-circulo">
            <span className="logo-simbolo">$</span>
          </div>
          <span className="logo-texto ms-2 text-black">EduFinanzas</span>
        </Link>
        <Link href="/login">
          <button className="btn btn-iniciar-reto">Iniciar Reto</button>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
