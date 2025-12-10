"use client"

import { useState } from "react"
import { motion, AnimatePresence } from 'motion/react'
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

  const [updatedActiveLevel, setUpdatedActiveLevel] = useState(false);

  return (
    <section id="skills" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Visualiza tu Perfil Técnico</h2>
        <p className="text-muted-foreground">
          Selecciona tu nivel actual para ver qué habilidades necesitas fortalecer
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <div className="space-y-3">
            {skillLevels.map((level) => (
              <motion.button
                key={level.id}
                initial={false}
                animate={{
                  scale: activeLevel === level.id ? 1.02 : 1,
                  transition: { type: "tween", stiffness: 300, damping: 20 }
                }}
                onClick={() => setActiveLevel(level.id)}
                className={`w-full text-left p-4 rounded-lg transition-all border ${activeLevel === level.id
                  ? "border-primary bg-primary/10 text-primary glow-cyan"
                  : "border-border bg-card/50 text-muted-foreground hover:border-primary/50"
                  }`}
              >
                <div className="font-semibold text-lg">{level.label}</div>
                <div className="text-sm opacity-75">{level.description}</div>
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
                <CardTitle className="text-primary">Habilidades Clave</CardTitle>
                <CardDescription>Domina estas áreas en tu nivel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {current?.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-background/50 border border-border/50"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-foreground font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}
