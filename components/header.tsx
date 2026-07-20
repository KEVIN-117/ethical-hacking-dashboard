"use client"
import Image from "next/image"
import Link from "next/link"

interface HeaderProps {
  scrolled: boolean
}

const links = [
  { href: "#skills", label: "Habilidades" },
  { href: "#roadmap", label: "Ruta de Estudio" },
  { href: "#resources", label: "Academias" },
  { href: "#community", label: "Comunidad" },
]

export default function Header({ scrolled }: HeaderProps) {
  return (
    <div className="fixed z-50 pt-8 md:pt-14 top-0 left-0 w-full backdrop-blur border-b border-border">

      <header
        className={`transition-all duration-300 `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Image
                src="/images/spartan-logo.webp"
                alt="HackerHub Logo"
                width={32}
                height={32}
                className="object-contain"
              />
              <span className="text-xl font-bold text-foreground">
                Hacker<span className="text-primary">Hub</span>
              </span>
            </div>

            <nav className="flex max-lg:hidden absolute left-1/2 -translate-x-1/2 items-center justify-center gap-x-10">
              {links.map((item) => (
                <Link
                  className="uppercase inline-block font-mono text-foreground/60 hover:text-foreground duration-150 transition-colors ease-out"
                  href={`#${item.href}`}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 uppercase transition-colors ease-out duration-150 font-mono hover:text-primary/80 hover:bg-primary/20 hover:border border-primary" href="/auth/login">
              Sign In
            </Link>
          </div>
        </div>
      </header>
    </div>
  )
}
