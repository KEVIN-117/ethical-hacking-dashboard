"use client"

import Image from "next/image"
import { GL } from "./gl"
import { useState } from "react";

export default function HeroSection() {
  const [hovering, setHovering] = useState(false);

  return (
    <section className="flex flex-col h-svh justify-between">
      <GL hovering={hovering} />
      <div className="bg-background/80 h-svh w-full px-4 sm:px-6 lg:px-8 py-20 sm:py-32 relative z-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:items-center md:place-items-stretch place-items-center h-full">
          {/* Content */}
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 rounded-full border border-primary/50 bg-primary/10 text-primary text-sm font-medium">
              🔐 Centro de Entrenamiento en Hacking Ético
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
              Domina la <span className="text-primary">Ciberseguridad</span> desde Cero
            </h1>

            <p className="text-lg text-muted-foreground">
              Identifica tus vacíos de conocimiento, sigue una ruta de estudio estructurada y accede a las mejores
              plataformas de entrenamiento en hacking ético del mundo.
            </p>

            <div className="flex gap-4 pt-4">
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity">
                Comenzar Ahora
              </button>
              <button className="px-8 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors">
                Ver Plataformas
              </button>
            </div>
          </div>

          <div className="relative h-144  hidden md:block">
            <Image
              src="/images/defensive-analyst.webp"
              alt="Defensive Security Analyst - Ethical Hacking Mascot"
              fill
              className="object-cover drop-shadow-lg w-full h-full"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
