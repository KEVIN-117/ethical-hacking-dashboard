"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#skills", label: "Habilidades" },
  { href: "#roadmap", label: "Ruta de aprendizaje" },
  { href: "#resources", label: "Laboratorios" },
  { href: "#community", label: "Comunidad" },
  { href: "/blog/", label: "Blog Red Team" },
  { href: "/blog/daily/", label: "Daily" },
];

const assetBasePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 supports-backdrop-filter:bg-background/85 supports-backdrop-filter:backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="#inicio"
          className="flex items-center gap-2.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="HackerHub, ir al inicio"
        >
          <Image
            src={`${assetBasePath}/images/spartan-logo.webp`}
            alt=""
            width={32}
            height={32}
            className="object-contain"
            priority
          />
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            Hacker<span className="text-primary">Hub</span>
          </span>
        </Link>

        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-7 lg:flex"
        >
          {links.map((item) => (
            <Link
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            className="hidden rounded-md border border-primary/60 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:inline-flex"
            href="/auth/login"
          >
            Iniciar sesión
          </Link>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:hidden"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X aria-hidden="true" size={19} />
            ) : (
              <Menu aria-hidden="true" size={19} />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Navegación móvil"
          className="border-t border-border bg-background px-4 py-3 lg:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-card hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/auth/login"
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-3 py-3 text-sm font-semibold text-primary hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:hidden"
            >
              Iniciar sesión
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
