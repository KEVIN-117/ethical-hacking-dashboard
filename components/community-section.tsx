import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Users, Lightbulb } from "lucide-react"

const communities = [
  {
    name: "Reddit: r/netsec & r/hacking",
    description: "Noticias técnicas, discusiones de carrera y write-ups de la comunidad.",
    icon: Users,
  },
  {
    name: "Discord: The Cyber Mentor",
    description: "Comunidad muy activa y amigable. Perfecta para principiantes.",
    icon: MessageSquare,
  },
  {
    name: "Hack The Box Forums",
    description: "Ayuda específica para máquinas, retos CTF y técnicas de hacking.",
    icon: Lightbulb,
  },
]

const mindsets = [
  {
    title: "Metodología Black Box",
    description:
      "No mires la solución de inmediato. Intenta resolver durante 30 minutos. Si fallas, lee una pista, no la respuesta completa.",
  },
  {
    title: "Documentación (Write-ups)",
    description: "Crea tus propios reportes de las máquinas que hackeas. Si no puedes explicarlo, no lo entendiste.",
  },
  {
    title: "Certificaciones Clave",
    description: "Sigue esta progresión: eJPT → PNPT → OSCP. Cada una valida tu conocimiento.",
  },
]

export default function CommunitySection() {
  return (
    <section id="community" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="mb-10 max-w-2xl">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Aprender también es compartir</h2>
        <p className="mt-3 max-w-prose leading-7 text-muted-foreground">Contrasta ideas, aprende de otros y desarrolla el criterio que convierte la práctica en un trabajo responsable.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-foreground mb-6">Conecta con la Comunidad</h3>
          {communities.map((community) => {
            const Icon = community.icon
            return (
              <Card
                key={community.name}
                className="border-border bg-card/50 backdrop-blur hover:border-primary/50 transition-all"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start space-x-3">
                    <Icon aria-hidden="true" className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <div>
                      <CardTitle className="text-base text-foreground">{community.name}</CardTitle>
                      <CardDescription className="mt-1 text-foreground/70">{community.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            )
          })}
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-foreground mb-6">Mentalidad de Estudio</h3>
          {mindsets.map((mindset) => (
            <Card key={mindset.title} className="border-border bg-card/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-primary">{mindset.title}</CardTitle>
                <CardDescription className="mt-2 text-foreground/70">{mindset.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
