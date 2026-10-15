"use client";

import { useState } from "react";
import Link from "next/link";
import { GL } from "@/components/gl";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Crosshair,
  FileText,
  Radio,
  ShieldCheck,
} from "lucide-react";

const workflow = [
  "Definir alcance",
  "Enumerar",
  "Validar hallazgos",
  "Documentar",
];

export default function HeroSection() {
  const [hovering, setHovering] = useState(false);

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden border-b border-border"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 hidden opacity-45 md:block"
      >
        <GL hovering={hovering} />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/75 to-background/45" />
      </div>
      <div
        aria-hidden="true"
        className="hero-orbit pointer-events-none absolute -right-48 -top-40 z-0 size-136 rounded-full border border-primary/10 sm:-right-32 sm:size-184"
      />
      <div
        aria-hidden="true"
        className="hero-orbit hero-orbit-delayed pointer-events-none absolute -right-24 -top-16 z-0 size-112 rounded-full border border-primary/10 sm:right-8 sm:size-152"
      />

      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.17em] text-primary">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-40 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            Laboratorio de aprendizaje · práctica autorizada
          </p>
          <h1
            id="hero-title"
            className="font-display text-5xl font-semibold leading-[1.04] tracking-[-0.035em] text-foreground sm:text-6xl lg:text-[4.5rem]"
          >
            Piensa como un <span className="text-primary">pentester.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Aprende a evaluar sistemas con permiso y alcance definidos.
            Construye tus fundamentos, practica en laboratorios y convierte cada
            hallazgo en un reporte claro.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#roadmap"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Explorar la ruta{" "}
              <ArrowDown
                aria-hidden="true"
                size={17}
                className="transition-transform group-hover:translate-y-0.5"
              />
            </Link>
            <Link
              href="#resources"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-border px-5 py-3 font-semibold text-foreground transition-colors hover:border-primary/60 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Encontrar laboratorios{" "}
              <ArrowUpRight aria-hidden="true" size={17} />
            </Link>
          </div>

          <p className="mt-7 flex items-start gap-2 text-sm leading-6 text-muted-foreground">
            <ShieldCheck
              aria-hidden="true"
              size={17}
              className="mt-0.5 shrink-0 text-primary"
            />
            Practica únicamente en entornos propios o con autorización expresa.
          </p>
        </div>

        <div
          className="relative mx-auto w-full max-w-xl lg:ml-auto"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <div
            aria-hidden="true"
            className="absolute -inset-3 rounded-2xl border border-primary/10"
          />
          <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-[0_24px_80px_-32px_rgba(0,0,0,0.9)]">
            <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-5">
              <div className="flex items-center gap-2.5">
                <Crosshair
                  aria-hidden="true"
                  size={16}
                  className="text-primary"
                />
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground">
                  Flujo de evaluación
                </span>
              </div>
              <span className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary">
                Simulación
              </span>
            </div>

            <div className="grid grid-cols-2 divide-x divide-border border-b border-border">
              <div className="p-4 sm:p-5">
                <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Entorno
                </span>
                <p className="mt-1 font-mono text-sm text-foreground">
                  lab.local
                </p>
              </div>
              <div className="p-4 sm:p-5">
                <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Alcance
                </span>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-foreground">
                  <ShieldCheck
                    aria-hidden="true"
                    size={14}
                    className="text-primary"
                  />{" "}
                  Autorizado
                </p>
              </div>
            </div>

            <ol className="divide-y divide-border px-4 sm:px-5">
              {workflow.map((step, index) => {
                const Icon = [FileText, Radio, Crosshair, Check][index];
                return (
                  <li key={step} className="flex items-center gap-3 py-3.5">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-background text-primary">
                      <Icon aria-hidden="true" size={15} />
                    </span>
                    <span className="flex-1 text-sm font-medium text-foreground">
                      {step}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </li>
                );
              })}
            </ol>

            <div className="border-t border-border bg-background/70 px-4 py-3 sm:px-5">
              <p className="font-mono text-[11px] leading-5 text-muted-foreground">
                <span className="text-primary">›</span> Cada fase combina
                criterio técnico, práctica segura y comunicación.
              </p>
            </div>
          </div>
          <p className="mt-3 text-right text-[11px] text-muted-foreground">
            Vista conceptual · los datos no representan un escaneo real
          </p>
        </div>
      </div>
    </section>
  );
}
