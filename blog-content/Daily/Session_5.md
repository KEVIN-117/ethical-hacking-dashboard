---
title: "5. HTB Space Explorer: análisis de autenticación"
date: 2026-10-18
description: "Práctica de seguridad web para analizar la autenticación entre los servicios Sender y Receiver de HTB Space Explorer."
tags:
  - daily
  - htb
  - web
  - autenticacion
  - codigo
sticker: emoji//1f426
cover: "/images/article-headers/header-daily-session-5.webp"
---

## Práctica 5 — Domingo 18 de octubre

### HTB Space Explorer: análisis de autenticación

Esta práctica introduce el análisis de autenticación en aplicaciones web a partir de la comunicación entre dos servicios: _Sender_ y _Receiver_. El trabajo consiste en seguir el recorrido de una petición, localizar las decisiones de validación y comprobar una hipótesis dentro de la instancia asignada.

**Reto:** [Space Explorer, en HTB Challenges](https://app.hackthebox.com/challenges)  
**Categoría:** Web · **Dificultad indicada:** Very Easy  
**Duración estimada:** 60–90 minutos.

**Objetivo:** explicar cómo se comunican ambos servicios, identificar una posible diferencia en la validación de autenticación y verificar su efecto en el laboratorio.

### Preparación y alcance

Consulta el reto en [HTB Challenges](https://app.hackthebox.com/challenges) y confirma su disponibilidad y condiciones de acceso para la cuenta utilizada. Descarga los archivos indicados por HTB, extrae el material en una carpeta independiente e inicia la instancia cuando el entorno esté preparado. Trabaja únicamente contra la dirección y el puerto asignados por la plataforma.

Se necesita un navegador, una terminal con `curl` y un editor para revisar el código. Burp Suite es opcional.

```bash
mkdir -p ~/lab-seguridad/space-explorer/evidencias
cd ~/lab-seguridad/space-explorer
```

Registra el enunciado, los archivos recibidos y la dirección de la instancia. Evita guardar secretos o datos ajenos al laboratorio.

### Conceptos de la práctica

- **Autenticación:** proceso mediante el cual un servicio comprueba la identidad de quien realiza una petición.
- **Comunicación entre servicios:** intercambio de datos entre componentes y forma en que cada uno los interpreta.
- **Validación:** comprobaciones aplicadas a los datos antes de aceptar una petición.
- **Límite de confianza:** punto en el que una aplicación decide confiar en la información recibida.

### Plan de trabajo

| Tiempo | Actividad | Evidencia |
| --- | --- | --- |
| 0–10 min | Preparar los archivos y revisar el escenario | Inventario del material |
| 10–30 min | Identificar las rutas y responsabilidades de los servicios | Esquema de comunicación |
| 30–45 min | Seguir la lógica de autenticación en el código | Condiciones de aceptación y rechazo |
| 45–70 min | Probar una hipótesis en la instancia asignada | Petición, respuesta e interpretación |
| 70–90 min | Completar el reto y redactar el reporte | Resultado y mitigación propuesta |

### Procedimiento

1. Identifica los archivos que implementan la lógica de _Sender_ y _Receiver_.
2. Localiza las rutas disponibles y los datos que recibe cada servicio.
3. Dibuja el recorrido de una petición entre ambos componentes.
4. Señala dónde se valida la autenticación y qué información se utiliza para decidir.
5. Registra el comportamiento normal con una petición de referencia antes de modificarla.
6. Formula una hipótesis sobre una posible inconsistencia y cambia un solo elemento por prueba.
7. Compara la respuesta con la referencia e interpreta el resultado; un error del servidor no demuestra por sí mismo que se haya evitado la autenticación.
8. Si se completa el reto, envía la flag en HTB y documenta por qué funcionó el procedimiento, sin publicar la flag.

### Pistas graduadas

Utiliza una pista por vez y registra cuándo fue necesaria.

- **Pista 1 — Recorrido:** identifica quién envía la petición, quién la recibe y qué información se intercambia.
- **Pista 2 — Decisiones:** localiza las condiciones que aceptan o rechazan una petición. Comprueba qué ocurre con valores ausentes, vacíos o inesperados.
- **Pista 3 — Comparación:** verifica si ambos servicios interpretan y validan los mismos datos de la misma manera. Convierte cada diferencia observada en una hipótesis comprobable.
- **Pista 4 — Referencia:** compara cada prueba con una petición inicial conocida y conserva tanto la solicitud como la respuesta.

### Errores frecuentes

- Modificar peticiones antes de comprender el flujo entre servicios.
- Confundir autenticación con autorización.
- Cambiar varios parámetros a la vez y perder la causa del resultado.
- Suponer que una respuesta `200` demuestra acceso al recurso protegido.
- Probar contra el dominio principal de HTB en vez de la instancia asignada.

### Entregable y criterio de logro

El reporte debe incluir el alcance del laboratorio, el esquema de comunicación, la hipótesis, las pruebas realizadas, la evidencia del resultado y una corrección propuesta. No debe incluir la flag.

La práctica se considera completada cuando se puede explicar y respaldar con código y evidencias el recorrido **petición → validación → comunicación entre servicios → resultado**. Si no se termina, registra la última hipótesis probada y el punto en que se produjo el bloqueo.

---
