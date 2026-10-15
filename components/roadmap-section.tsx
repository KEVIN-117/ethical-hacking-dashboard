"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ExternalLink } from "lucide-react"

const roadmapPhases = [
  {
    id: 1,
    title: "Fundamentos sólidos",
    certImage: "/images/junior-cybersecurity.webp",
    topics: ["Modelo OSI y TCP/IP", "Linux CLI (Bash)", "Subnetting y DNS", "Virtualización"],
    searchQueries: "Linux commands, How DNS works, TCP 3-way handshake",
    platform: "TryHackMe — Pre Security",
    url: "https://tryhackme.com/path/outline/presecurity",
  },
  {
    id: 2,
    title: "Scripting y programación",
    certImage: "/images/web-exploitation-expert.webp",
    topics: ["Python para hacking", "Bash scripting", "HTML/JS/PHP", "Expresiones regulares"],
    searchQueries: "Python cybersecurity, Bash automation, Regex tutorial",
    platform: "Hack The Box Academy",
    url: "https://academy.hackthebox.com/",
  },
  {
    id: 3,
    title: "Seguridad web",
    certImage: "/images/web-exploitation-specialist.webp",
    topics: ["OWASP Top 10", "SQL Injection", "XSS", "Burp Suite"],
    searchQueries: "PortSwigger Web Security, Burp Suite tutorial, OWASP testing",
    platform: "PortSwigger Web Security Academy",
    url: "https://portswigger.net/web-security",
  },
  {
    id: 4,
    title: "Infraestructura y redes",
    certImage: "/images/pentesting-specialist.webp",
    topics: ["Escaneo con Nmap", "Metasploit Framework", "Escalada de privilegios", "Active Directory"],
    searchQueries: "Nmap cheat sheet, Windows PrivEsc, Active Directory attacks",
    platform: "Hack The Box — máquinas y laboratorios",
    url: "https://www.hackthebox.com/",
  },
]

const assetBasePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

export default function RoadmapSection() {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null)

  return (
    <section id="roadmap" aria-labelledby="roadmap-title" className="border-y border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <h2 id="roadmap-title" className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Una ruta hacia el pentest</h2>
          <p className="mt-3 max-w-prose leading-7 text-muted-foreground">Avanza desde los fundamentos hasta las prácticas de evaluación. Abre cada fase para ver los temas y recursos asociados.</p>
        </div>

        <ol className="divide-y divide-border border-y border-border">
          {roadmapPhases.map((phase) => {
            const isExpanded = expandedPhase === phase.id
            const contentId = `phase-content-${phase.id}`
            return (
              <li key={phase.id}>
                <Card className="overflow-hidden rounded-none border-0 bg-transparent py-0 shadow-none">
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={contentId}
                    onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
                    className="group flex min-h-24 w-full items-center gap-4 px-3 py-4 text-left transition-colors hover:bg-card/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary sm:gap-6 sm:px-5"
                  >
                    <span className="font-mono text-sm tabular-nums text-primary">0{phase.id}</span>
                    <Image src={`${assetBasePath}${phase.certImage}`} alt="" width={54} height={54} className="size-12 rounded-md object-cover sm:size-14" />
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-lg font-semibold text-foreground sm:text-xl">{phase.title}</span>
                      <span className="mt-1 block truncate text-sm text-muted-foreground">{phase.platform}</span>
                    </span>
                    <ChevronDown aria-hidden="true" size={18} className={`shrink-0 text-primary transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                  </button>

                  {isExpanded && (
                    <CardContent id={contentId} className="grid gap-6 border-t border-border px-5 py-6 sm:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] sm:px-8 sm:py-8">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Temas de práctica</p>
                        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                          {phase.topics.map((topic) => (
                            <li key={topic} className="flex items-start gap-2.5 text-sm leading-6 text-foreground">
                              <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />{topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="border-t border-border pt-5 sm:border-l sm:border-t-0 sm:pl-7 sm:pt-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Recurso recomendado</p>
                        <a href={phase.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                          {phase.platform}<ExternalLink aria-hidden="true" size={14} />
                          <span className="sr-only"> (se abre en una pestaña nueva)</span>
                        </a>
                        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Búsquedas recomendadas</p>
                        <p className="mt-2 text-sm leading-6 text-foreground">{phase.searchQueries}</p>
                      </div>
                    </CardContent>
                  )}
                </Card>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
