"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import "./Login.css"

const Login = () => {
  const [email, setEmail] = useState("")
  const [contrasena, setContrasena] = useState("")
  const [mostrarContrasena, setMostrarContrasena] = useState(false)
  const [errores, setErrores] = useState<{ email?: string; contrasena?: string }>({})

  // Función para validar el formulario
  const validarFormulario = () => {
    const nuevosErrores: { email?: string; contrasena?: string } = {}

    // Validar email
    if (!email) {
      nuevosErrores.email = "El correo electrónico es requerido"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      nuevosErrores.email = "El correo electrónico no es válido"
    }

    // Validar contraseña
    if (!contrasena) {
      nuevosErrores.contrasena = "La contraseña es requerida"
    } else if (contrasena.length < 6) {
      nuevosErrores.contrasena = "La contraseña debe tener al menos 6 caracteres"
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  // Función para manejar el envío del formulario
  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault()

    if (validarFormulario()) {
      // Aquí iría la lógica de autenticación
      console.log("Formulario válido:", { email, contrasena })
      alert("¡Inicio de sesión exitoso! (Funcionalidad de demostración)")
    }
  }

  // Función para alternar visibilidad de contraseña
  const toggleMostrarContrasena = () => {
    setMostrarContrasena(!mostrarContrasena)
  }

  return (
    <div className="pagina-login">
      <div className="contenedor-login">
        <div className="tarjeta-login">
          {/* Logo y título */}
          <div className="encabezado-login">
            <div className="logo-login">
              <div className="logo-circulo-login">
                <span className="logo-simbolo-login">$</span>
              </div>
              <span className="logo-texto-login">EduFinanzas</span>
            </div>
            <h1 className="titulo-login">Iniciar Sesión</h1>
            <p className="subtitulo-login">Continúa tu aventura financiera</p>
          </div>

          {/* Formulario */}
          <form onSubmit={manejarEnvio} className="formulario-login">
            {/* Campo de correo electrónico */}
            <div className="grupo-formulario">
              <label htmlFor="email" className="etiqueta-formulario">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                className={`campo-formulario ${errores.email ? "campo-error" : ""}`}
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errores.email && <span className="mensaje-error">{errores.email}</span>}
            </div>

            {/* Campo de contraseña */}
            <div className="grupo-formulario">
              <label htmlFor="contrasena" className="etiqueta-formulario">
                Contraseña
              </label>
              <div className="contenedor-contrasena">
                <input
                  type={mostrarContrasena ? "text" : "password"}
                  id="contrasena"
                  className={`campo-formulario ${errores.contrasena ? "campo-error" : ""}`}
                  placeholder="Tu contraseña"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                />
                <button
                  type="button"
                  className="boton-toggle-contrasena"
                  onClick={toggleMostrarContrasena}
                  aria-label={mostrarContrasena ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {mostrarContrasena ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {errores.contrasena && <span className="mensaje-error">{errores.contrasena}</span>}
            </div>

            {/* Enlace olvidaste contraseña */}
            <div className="texto-derecha mb-4">
              <a href="#" className="enlace-recuperar">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Botón de Google */}
            <button type="button" className="boton-google mb-3">
              <svg className="icono-google" viewBox="0 0 24 24" width="20" height="20">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continuar con Google
            </button>

            {/* Botón de iniciar sesión */}
            <button type="submit" className="boton-iniciar-sesion">
              Iniciar Sesión
            </button>

            {/* Enlace de registro */}
            <div className="texto-centro mt-4">
              <span className="texto-registro">¿No tienes cuenta? </span>
              <a href="#" className="enlace-registro">
                Regístrate aquí
              </a>
            </div>

            {/* Volver al inicio */}
            <div className="texto-centro mt-3">
              <Link href="/" className="enlace-volver">
                Volver al inicio
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
