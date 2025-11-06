import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "../src/index.css"

export const metadata: Metadata = {
  title: "EduFinanzas - Aprende a manejar tu dinero",
  description: "Plataforma educativa de finanzas personales para jóvenes de 14-17 años",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
