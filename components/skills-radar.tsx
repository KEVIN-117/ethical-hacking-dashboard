"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { GL } from "@/components/gl"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const skillLevels = [
  {
    id: "beginner",
    label: "Principiante",
    description: "Enfócate en fundamentos: Sistemas Operativos y Redes",
    skills: ["Linux Fundamentos", "Redes TCP/IP", "Scripting Básico", "Web Security 101", "Herramientas Básicas"],
  },
  {
    id: "intermediate",
    label: "Intermedio",
    description: "Equilibrio entre teoría y práctica: Web Hacking y Automatización",
    skills: ["Web Pentesting", "Scripting Python", "Metasploit", "Enumeración Red", "Análisis Forense"],
  },
  {
    id: "advanced",
    label: "Avanzado",
    description: "Especialista: Active Directory, Evasión y Reverse Engineering",
    skills: ["Active Directory", "Red Team Tactics", "Reverse Engineering", "Cloud Security", "Malware Analysis"],
  },
]

export default function SkillsRadar() {
  const [activeLevel, setActiveLevel] = useState("beginner")
  const current = skillLevels.find((level) => level.id === activeLevel)

  return (
    <section id="skills" className="relative isolate overflow-hidden border-b border-border">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 hidden opacity-30 md:block">
        <GL hovering={false} />
        <div className="absolute inset-0 bg-linear-to-b from-background/20 via-background/40 to-background/75" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-2xl">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Elige tu punto de partida</h2>
        <p className="mt-3 max-w-prose leading-7 text-muted-foreground">
          Selecciona tu nivel actual para ver qué habilidades necesitas fortalecer en tu camino al pentest.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <div className="space-y-3" role="group" aria-label="Selecciona tu nivel actual">
            {skillLevels.map((level) => (
              <motion.button
                key={level.id}
                initial={false}
                animate={{
                  scale: activeLevel === level.id ? 1.02 : 1,
                  transition: { type: "tween", stiffness: 300, damping: 20 }
                }}
                onClick={() => setActiveLevel(level.id)}
                aria-pressed={activeLevel === level.id}
                className={`w-full text-left p-4 rounded-lg transition-all border ${activeLevel === level.id
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-card/50 text-muted-foreground hover:border-primary/50"
                  }`}
              >
                <div className="font-semibold text-lg">{level.label}</div>
                <div className="mt-1 text-sm leading-6 text-muted-foreground">{level.description}</div>
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeLevel ? activeLevel : "empty"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="border-border bg-card/50 backdrop-blur">
              <CardHeader>
              <CardTitle className="font-display text-xl text-foreground">Habilidades clave</CardTitle>
                <CardDescription>Domina estas áreas en tu nivel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {current?.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-background/50 border border-border/50"
                    >
                      <div aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
                      <span className="text-foreground font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

      </div>
      </div>
    </section>
  )
}
