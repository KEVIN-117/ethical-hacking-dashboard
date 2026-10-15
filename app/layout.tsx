import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

const assetBasePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

export const metadata: Metadata = {
  title: "HackerHub — Aprende pentesting ético",
  description:
    "Construye tus fundamentos de seguridad ofensiva, practica en laboratorios autorizados y sigue una ruta de aprendizaje en pentesting ético.",
  icons: {
    icon: [
      {
        url: `${assetBasePath}/icon-light-32x32.png`,
        media: "(prefers-color-scheme: light)",
      },
      {
        url: `${assetBasePath}/icon-dark-32x32.png`,
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: `${assetBasePath}/apple-icon.png`,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
