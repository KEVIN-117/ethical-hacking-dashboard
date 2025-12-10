"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, cubicBezier } from "motion/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"

const roadmapPhases = [
  {
    id: 1,
    title: "Fundamentos Sólidos",
    icon: "🏗️",
    certImage: "/images/junior-cybersecurity.webp",
    topics: ["Modelo OSI y TCP/IP", "Linux CLI (Bash)", "Subnetting & DNS", "Virtualización"],
    searchQueries: "Linux commands, How DNS works, TCP 3-way handshake",
    platform: "TryHackMe - Pre-Security",
  },
  {
    id: 2,
    title: "Scripting y Programación",
    icon: "🐍",
    certImage: "/images/web-exploitation-expert.webp",
    topics: ["Python para Hacking", "Bash Scripting", "HTML/JS/PHP", "Regular Expressions"],
    searchQueries: "Python cybersecurity, Bash automation, Regex tutorial",
    platform: "Hack The Box Academy",
  },
  {
    id: 3,
    title: "Web Hacking",
    icon: "🌐",
    certImage: "/images/web-exploitation-specialist.webp",
    topics: ["OWASP Top 10", "SQL Injection", "XSS", "Burp Suite"],
    searchQueries: "PortSwigger Web Security, Burp Suite tutorial, OWASP testing",
    platform: "PortSwigger Academy",
  },
  {
    id: 4,
    title: "Infraestructura y Redes",
    icon: "🔌",
    certImage: "/images/pentesting-specialist.webp",
    topics: ["Escaneo (Nmap)", "Metasploit Framework", "Privilege Escalation", "Active Directory"],
    searchQueries: "Nmap cheat sheet, Windows PrivEsc, Active Directory attacks",
    platform: "Hack The Box Main Track",
  },
]

export default function RoadmapSection() {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: cubicBezier(0.25, 0.46, 0.45, 0.94) },
    },
  }

  const contentVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.4 },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3 },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  }


  return (
    <section id="roadmap" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Tu Ruta de Estudio</h2>
        <p className="text-muted-foreground">Sigue estas 4 fases para dominar la ciberseguridad</p>
      </div>

      <motion.div
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {roadmapPhases.map((phase, index) => (
          <motion.div key={phase.id} className="relative" variants={cardVariants}>
            {index !== roadmapPhases.length - 1 && (
              <div className="absolute left-8 top-20 w-1 h-100 bg-linear-to-b from-primary via-primary to-transparent pointer-events-none" />
            )}

            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Card
                className={`border-border bg-card/50 backdrop-blur cursor-pointer hover:border-primary/50 transition-all`}
                onClick={() => { setExpandedPhase(expandedPhase === phase.id ? null : phase.id); }}
              >
                <CardHeader className="pb-3">
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, height: 0 },
                      visible: {
                        opacity: 1,
                        height: "auto",
                        transition: { duration: 0.4 },
                      },
                      exit: {
                        opacity: 0,
                        height: 0,
                        transition: { duration: 0.3 },
                      }
                    }}
                    initial="hidden"
                    animate={expandedPhase === phase.id ? "hidden" : "visible"}
                    exit="exit"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col md:flex-row items-start space-x-4">
                        <div className={`${expandedPhase === phase.id ? "hidden" : ""} relative w-50 h-50 shrink-0`}>
                          <Image
                            src={phase.certImage || "/placeholder.svg"}
                            alt={`${phase.title} certification`}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        <div className={`${expandedPhase === phase.id ? "hidden" : "relative"} space-y-4`}>
                          <div className="space-y-2">
                            <span className="inline-block px-4 py-2 rounded-full border border-primary/50 bg-primary/10 text-primary text-sm font-medium">Fase {phase.id}</span>
                            <CardTitle className="text-4xl text-foreground">{phase.title}</CardTitle>
                          </div>
                          <CardDescription className="mt-1">{phase.platform}</CardDescription>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedPhase === phase.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >

                        <ChevronDown
                          className={`w-5 h-5 text-primary transition-transform`}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                </CardHeader>

                {expandedPhase === phase.id && (
                  <CardContent className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center">
                    <motion.div className="relative w-50 h-50 md:w-100 md:h-100 p-4 shrink-0 flex items-center justify-center bg-card/70 backdrop-blur rounded-md" variants={imageVariants} initial="hidden" animate="visible">
                      <Image
                        src={phase.certImage || "/placeholder.svg"}
                        alt={`${phase.title} certification`}
                        fill
                        className="object-center drop-shadow-lg rounded-md"
                      />
                    </motion.div>
                    <div className="space-y-4">
                      <motion.div variants={imageVariants} initial="hidden" animate="visible">
                        <div className="space-y-2">
                          <span className="inline-block px-4 py-2 rounded-full border border-primary/50 bg-primary/10 text-primary text-sm font-medium">Fase {phase.id}</span>
                          <CardTitle className="md:text-4xl text-md text-foreground">{phase.title}</CardTitle>
                        </div>
                        <CardDescription className="mt-1">{phase.platform}</CardDescription>
                      </motion.div>
                      <motion.div variants={imageVariants} initial="hidden" animate="visible">
                        <motion.h4 className="font-semibold text-foreground mb-2">Búsquedas Recomendadas:</motion.h4>
                        <motion.p className="text-muted-foreground text-sm">{phase.searchQueries}</motion.p>
                      </motion.div>

                      <motion.h4 className="font-semibold text-foreground mb-2">Conceptos Clave:</motion.h4>
                      <ul className="space-y-2">
                        {phase.topics.map((topic, idx) => (
                          <motion.li
                            key={idx}
                            className="flex items-center space-x-2 text-muted-foreground"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.3 }}
                          >
                            <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                            <span>{topic}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                  </CardContent>
                )}
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
