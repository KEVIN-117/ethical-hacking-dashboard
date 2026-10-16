---
title: "Linux: observación y documentación"
date: 2026-10-13
description: "Fundamentos de Linux para identificar el entorno, navegar archivos y permisos, y registrar evidencias en un laboratorio local autorizado."
tags:
  - daily
  - linux
  - fundamentos
sticker: emoji//1f4d0
cover: "/images/article-headers/header-daily-session-1.webp"
---

Ya quedó programado, con **prioridad en HTB** y TryHackMe como complemento:

- **Martes:** estudio intensivo de conceptos.
- **Jueves:** profundización y ejercicios del mismo tema.
- **Sábado:** una máquina o challenge para aplicar lo aprendido.

Elegí las **19:00 aproximadamente, hora de Bolivia (America/La_Paz)**, comenzando hoy.

Cada sesión incluirá objetivos, recursos oficiales y errores frecuentes; los retos tendrán pistas graduadas. La dificultad aumentará según los avances que confirmes, incorporando **Pro Labs** cuando estés preparado.

**Sesión 1 — Martes 13 de octubre: Linux para observar y documentar un objetivo**

Hoy comenzarás por una habilidad esencial: **usar la terminal para obtener información y explicar qué significa**. Todavía no hay avances confirmados, así que esta sesión establece una base para las próximas prácticas.

**Objetivo:** al terminar, podrás identificar tu usuario, navegar por directorios, buscar archivos, interpretar permisos y registrar evidencias. Reserva **110 minutos**.

**Preparación y recursos**

Necesitas una terminal Linux: tu equipo, una VM, WSL o el entorno de HTB si tu cuenta lo permite. Para los ejercicios locales, trabaja como usuario normal en una carpeta propia.

El recurso principal es [HTB Academy — Linux Fundamentals](https://academy.hackthebox.com/course/preview/linux-fundamentals). El módulo está clasificado como _Fundamental_, no exige conocimientos previos e incluye ejercicios prácticos. Hoy estudiarás solo una parte; completar todo el módulo llevará más sesiones. La vista pública permite consultar la introducción y el temario, pero requiere iniciar sesión para desbloquear el resto; no he comprobado el acceso de tu cuenta. Recursos consultados el **13/10/2026**. [HTB Academy](https://academy.hackthebox.com/course/preview/linux-fundamentals?utm_source=chatgpt.com)

| Tiempo      | Trabajo                                                                               |
| ----------- | ------------------------------------------------------------------------------------- |
| 0–10 min    | Abre la terminal y prepara una nota con fecha, objetivo y entorno utilizado.          |
| 10–35 min   | Estudia _Introduction to Shell_, _Getting Help_, _System Information_ y _Navigation_. |
| 35–55 min   | Practica identificación del sistema y navegación.                                     |
| 55–75 min   | Estudia _Find Files and Directories_, _Filter Contents_ y _Permission Management_.    |
| 75–100 min  | Resuelve el laboratorio local descrito abajo.                                         |
| 100–110 min | Comprueba tu comprensión y escribe el reporte.                                        |

Estos nombres corresponden a secciones del temario oficial de HTB. [HTB Academy](https://academy.hackthebox.com/course/preview/linux-fundamentals?utm_source=chatgpt.com)

Como complemento opcional tienes [TryHackMe — Linux Fundamentals (Pt1)](https://tryhackme.com/room/linuxfundamentalspart1), con práctica introductoria en una máquina Ubuntu. La página exige iniciar sesión para acceder al material y arrancar máquinas; no está confirmado aquí si tu cuenta tiene acceso gratuito. [Linux Fundamentals (Pt1)](https://tryhackme.com/room/linuxfundamentalspart1?utm_source=chatgpt.com)

**Conceptos que debes comprender**

- **Terminal y shell:** la terminal muestra la interacción; la shell interpreta los comandos. Bash es una shell.
- **Usuario y permisos:** tus acciones dependen de tu identidad y grupos. En archivos, `r`, `w` y `x` representan lectura, escritura y ejecución; en directorios, `x` permite atravesarlos.
- **Rutas:** una ruta absoluta empieza en `/`; una relativa parte del directorio actual. `/` y `/root` son lugares distintos.
- **Enumeración:** consiste en reunir e interpretar información. Encontrar un archivo o un servicio no demuestra por sí mismo una vulnerabilidad.
- **Evidencia:** registra el comando, la salida relevante y tu interpretación. Distingue lo observado de lo que supones.

**Práctica 1: conoce tu entorno**

Ejecuta estos comandos y explica cada resultado con tus palabras:

```bash
whoami
id
hostname
uname -r
pwd
ls -la
```

Usa `man ls` o `ls --help` para averiguar qué aportan las opciones `-l` y `-a`. Después identifica tu directorio personal, navega a `/tmp` y regresa sin cerrar la terminal.

**Práctica 2: laboratorio de archivos y permisos**

Prepara un pequeño escenario local:

```bash
mkdir -p ~/lab-seguridad/sesion-01/evidencias
cd ~/lab-seguridad/sesion-01
printf 'servicio=web\npuerto=8080\nentorno=laboratorio\n' > servicio.txt
printf 'nota de prueba\n' > .nota.txt
chmod 600 servicio.txt
```

Ahora resuelve estas tareas sin copiar una solución completa:

1. Encuentra ambos archivos desde la terminal, incluido el oculto.
2. Muestra únicamente la línea que contiene `puerto`.
3. Explica quién puede leer y modificar `servicio.txt`.
4. Guarda en `evidencias/inventario.txt` un listado detallado del directorio.
5. Añade una segunda observación al inventario sin borrar su contenido.
6. Busca archivos `.txt` limitando la búsqueda a esta carpeta.

**Pistas graduadas:** primero consulta la ayuda; después revisa `ls`, `grep` y `find`; finalmente investiga la diferencia entre `>` y `>>`. Antes de ejecutar una instrucción, predice qué cambiará.

**Errores frecuentes**

- Usar `sudo` ante cualquier error, sin entender la causa.
- Buscar desde `/` cuando basta una carpeta concreta.
- Confundir archivos ocultos con archivos protegidos.
- Sobrescribir evidencias con `>` cuando querías añadir contenido.
- Copiar comandos sin poder explicar sus opciones.

**Criterio de logro:** completa al menos cinco de las seis tareas y explica, sin apuntes, una ruta absoluta, los permisos `600` y la diferencia entre `>` y `>>`. Si necesitas ayuda, registra dónde te bloqueaste: eso servirá para ajustar el nivel.

El jueves profundizaremos en procesos, servicios, IP y puertos. El sábado aplicaremos las dos sesiones en un reto seleccionado según lo que hayas confirmado.

Al terminar, deja un reporte breve: **tiempo dedicado, secciones estudiadas, tareas completadas, dos conceptos comprendidos y principal dificultad**.
