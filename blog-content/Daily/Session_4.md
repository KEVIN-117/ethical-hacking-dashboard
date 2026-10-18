---
title: "4. HTB misDIRection: análisis de archivos"
date: 2026-10-18
description: "Práctica de análisis de archivos y directorios en Linux para descubrir un patrón y reconstruir información en HTB."
tags:
  - daily
  - htb
  - linux
  - archivos
  - directorios
sticker: emoji//1f4e1
cover: "/images/article-headers/header-daily-session-4.webp"
---

## Práctica 4

### HTB misDIRection: análisis de archivos y directorios

Esta práctica aborda el reto **misDIRection** de Hack The Box. El objetivo es examinar el material entregado, reconocer cómo se organiza la información y comprobar una hipótesis sobre su estructura antes de recuperar la flag. La actividad refuerza la observación y el uso de herramientas básicas de Linux.

**Objetivo:** identificar un patrón en los archivos o directorios y explicar cómo permite reconstruir información. **Duración estimada: 45–75 minutos.**

### Preparación y alcance

Busca **misDIRection** en [HTB Challenges](https://app.hackthebox.com/challenges) y confirma su disponibilidad y condiciones de acceso para la cuenta utilizada. La práctica se basa en el material que proporcione la plataforma; el catálogo puede requerir iniciar sesión.

Prepara un directorio independiente para trabajar con los archivos descargados:

```bash
mkdir -p ~/lab-seguridad/misdirection
cd ~/lab-seguridad/misdirection
```

### Plan de trabajo

| Tiempo    | Actividad                                        | Resultado esperado                          |
| --------- | ------------------------------------------------ | ------------------------------------------- |
| 0–10 min  | Leer el enunciado y descargar el material        | Alcance y archivos de trabajo identificados |
| 10–25 min | Inspeccionar archivos, incluidos los ocultos     | Inventario inicial                          |
| 25–55 min | Buscar patrones y poner a prueba una hipótesis   | Método de reconstrucción documentado        |
| 55–75 min | Validar el resultado y redactar las conclusiones | Flag enviada en HTB e informe breve         |

### Procedimiento

Comienza identificando el tipo de archivo y revisando su contenido antes de extraerlo. Sustituye los nombres de ejemplo por los del material descargado:

```bash
file ARCHIVO_DESCARGADO
unzip -l ARCHIVO.zip
```

Si el archivo es un ZIP, revisa el listado antes de extraerlo y usa la contraseña indicada por HTB, si corresponde. Una vez extraído, inspecciona archivos visibles y ocultos:

```bash
ls -la
find . -maxdepth 3 -print
```

Compara el contenido de los archivos con sus nombres y la estructura de directorios. Registra cualquier patrón que aparezca, formula una hipótesis sobre el orden de lectura o reconstrucción y compruébala con el material disponible. Si obtienes una cadena codificada, identifica primero una codificación posible antes de intentar transformarla.

Completa estas tareas:

1. Identifica el tipo de cada archivo relevante.
2. Registra la estructura de directorios, incluidos los elementos ocultos.
3. Distingue qué información proviene del contenido, los nombres y la ubicación de los archivos.
4. Describe el patrón observado y propón una forma de reconstruir el mensaje.
5. Comprueba la hipótesis con una evidencia concreta y explica el resultado.
6. Envía la flag en HTB y documenta el razonamiento sin incluirla en la nota.

### Pistas graduadas

Utiliza una pista por vez y registra cuándo fue necesaria.

- **Pista 1:** los archivos ocultos también forman parte de la evidencia.
- **Pista 2:** si leer el contenido no ayuda, examina los nombres y las carpetas que los contienen.
- **Pista 3:** busca elementos que indiquen un orden; el orden alfabético y el numérico pueden dar resultados distintos.
- **Pista 4:** al reconstruir una cadena, identifica su posible codificación antes de decodificarla.

### Errores frecuentes

- Suponer que un archivo vacío no contiene información útil.
- Ignorar los archivos ocultos o la estructura de directorios.
- Probar herramientas de descifrado sin una hipótesis respaldada por evidencia.
- Asumir un orden de lectura sin comprobarlo.

### Entregable y criterio de logro

Prepara una nota con tres comandos relevantes, el patrón descubierto, la comprobación de la hipótesis y las pistas utilizadas. No incluyas la flag.

La práctica se considera completada cuando el patrón puede explicarse y el resultado se puede reproducir a partir de la evidencia. Si no se termina, registra la hipótesis probada y el punto en que se produjo el bloqueo.

---
