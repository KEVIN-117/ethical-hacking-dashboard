import Link from "next/link"

const learningLinks = [
  { label: "Hack The Box", href: "https://www.hackthebox.com/" },
  { label: "TryHackMe", href: "https://tryhackme.com/" },
  { label: "PortSwigger Academy", href: "https://portswigger.net/web-security" },
]

const internalLinks = [
  { label: "Habilidades", href: "#skills" },
  { label: "Ruta de aprendizaje", href: "#roadmap" },
  { label: "Laboratorios", href: "#resources" },
  { label: "Comunidad", href: "#community" },
  { label: "Blog Red Team", href: "/blog/" },
  { label: "Daily", href: "/blog/daily/" },
]

const socialChannels = ["Twitter", "Discord", "GitHub"]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_0.8fr] lg:px-8">
        <div>
          <a href="#inicio" className="font-display text-xl font-bold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            Hacker<span className="text-primary">Hub</span>
          </a>
          <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">Tu guía para aprender pentesting ético: fundamentos, práctica autorizada y documentación.</p>
          <p className="mt-4 text-xs leading-5 text-muted-foreground">Los recursos externos pertenecen a sus respectivos autores y plataformas.</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground">Plataformas</h2>
          <ul className="mt-4 space-y-3">
            {learningLinks.map((item) => (
              <li key={item.label}>
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  {item.label}<span className="sr-only"> (se abre en una pestaña nueva)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground">Explora</h2>
          <ul className="mt-4 space-y-3">
            {internalLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground">Conecta</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            {socialChannels.map((channel) => <li key={channel}>{channel}</li>)}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-muted-foreground sm:px-6 lg:px-8">© {new Date().getFullYear()} HackerHub · Aprende, practica con autorización y documenta.</p>
      </div>
    </footer>
  )
}
