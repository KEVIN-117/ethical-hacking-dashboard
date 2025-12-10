"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from 'motion/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Tag } from "lucide-react"

const resources = [
  {
    name: "Hack The Box",
    type: ["practical", "intermediate"],
    description: "El estándar de la industria. Máquinas vulnerables reales con curva de dificultad progresiva.",
    cost: "Gratis / Premium",
    tags: ["Máquinas CTF", "Pro Labs", "Academia"],
    url: "https://hackthebox.com",
    icon: "/images/web-exploitation-specialist.webp",
  },
  {
    name: "TryHackMe",
    type: ["practical", "beginner"],
    description: "Perfecto para comenzar. Rutas guiadas paso a paso con gamificación.",
    cost: "Gratis / Premium",
    tags: ["Gamificado", "Principiantes", "Rápido"],
    url: "https://tryhackme.com",
    icon: "/images/spartan-logo.webp",
  },
  {
    name: "PortSwigger Web Security Academy",
    type: ["theory", "web"],
    description: "La biblia del Web Hacking. Creadores de Burp Suite. 100% gratuito.",
    cost: "Gratis",
    tags: ["Web Security", "OWASP", "Laboratorios"],
    url: "https://portswigger.net/web-security",
    icon: "/images/web-exploitation-expert.webp",
  },
  {
    name: "TCM Security Academy",
    type: ["video", "professional"],
    description: "Cursos prácticos de extrema calidad. Certificación PNPT reconocida.",
    cost: "Pago (Económico)",
    tags: ["Video", "PNPT", "Profesional"],
    url: "https://academy.tcm-sec.com",
    icon: "/images/pentesting-specialist.webp",
  },
  {
    name: "Hack4u (En Español)",
    type: ["spanish", "video"],
    description: "Comunidad y cursos en español de alta calidad. Muy accesible.",
    cost: "Freemium",
    tags: ["Español", "YouTube", "Community"],
    url: "https://hack4u.io",
    icon: "/images/junior-cybersecurity.webp",
  },
  {
    name: "HackTheBox Academy",
    type: ["theory", "professional"],
    description: "Módulos estructurados con Skill Assessments. CPTS certification.",
    cost: "Gratis / Premium",
    tags: ["Módulos", "Certificación", "Profundo"],
    url: "https://academy.hackthebox.com",
    icon: "/images/defensive-analyst.webp",
  },
]

export default function ResourcesSection() {
  const [filter, setFilter] = useState<string>("all")

  const filtered = filter === "all" ? resources : resources.filter((r) => r.type.includes(filter))

  return (
    <section id="resources" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-2">Plataformas Recomendadas</h2>
        <p className="text-muted-foreground mb-6">Selecciona el tipo de aprendizaje que mejor se adapte a ti</p>

        <div className="flex flex-wrap gap-2">
          {[
            { value: "all", label: "Todas" },
            { value: "beginner", label: "Para Principiantes" },
            { value: "practical", label: "Práctica / CTF" },
            { value: "theory", label: "Teoría / Cursos" },
            { value: "spanish", label: "En Español" },
          ].map((f) => (
            <motion.button
              key={f.value}
              initial={false}
              animate={{
                scale: filter === f.value ? 1.02 : 1,
                transition: { type: "inertia", stiffness: 500, damping: 50 },
              }}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${filter === f.value
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-muted-foreground hover:border-primary/50"
                }`}
            >
              {f.label}
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter ? filter : "empty"}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((resource, index) => (
              <Card
                key={index}
                className="border-border bg-card/50 backdrop-blur hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/20 flex flex-col pt-0"
              >
                <div className="relative h-70 w-full bg-linear-to-b from-primary/10 via-primary/5 to-transparent rounded-t-lg flex items-center justify-center p-4">
                  <Image
                    src={resource.icon || "/placeholder.svg"}
                    alt={`${resource.name} icon`}
                    fill
                    className="object-contain drop-shadow-lg"
                  />
                </div>

                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg text-foreground">{resource.name}</CardTitle>
                    <ExternalLink className="w-4 h-4 text-primary" />
                  </div>
                  <CardDescription className="text-sm text-muted-foreground">{resource.cost}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 grow flex flex-col">
                  <p className="text-foreground text-sm">{resource.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {resource.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center space-x-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium"
                      >
                        <Tag className="w-3 h-3" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full text-center px-4 py-2 bg-primary/20 border border-primary text-primary rounded-lg font-medium hover:bg-primary/30 transition-colors mt-auto"
                  >
                    Visitar Plataforma
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
