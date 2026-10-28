---
title: "6. PortSwigger: control de acceso basado en parámetros"
date: 2026-10-28
description: "Práctica de control de acceso en un laboratorio de PortSwigger: análisis de cookies, roles y decisiones de autorización."
tags:
  - daily
  - portswigger
  - seguridad-web
  - control-de-acceso
  - autenticacion
sticker: emoji//1f426
cover: "/images/article-headers/header-daily-session-6.webp"
---

## Práctica 6

### PortSwigger: control de acceso basado en parámetros

Esta práctica analiza cómo una aplicación decide si una persona puede acceder a funciones administrativas. El laboratorio permite observar el inicio de sesión, revisar las cookies intercambiadas y comprobar si el servidor confía indebidamente en información controlada por el cliente.

**Laboratorio:** [User role controlled by request parameter — PortSwigger Web Security Academy](https://portswigger.net/web-security/access-control/lab-user-role-controlled-by-request-parameter)  
**Tema:** control de acceso y elevación vertical de privilegios  
**Duración estimada:** 60–90 minutos, con hasta 20 minutos adicionales para el informe.

**Objetivo:** identificar qué dato influye en la decisión de acceso al panel administrativo, demostrar el fallo únicamente en la instancia del laboratorio y proponer una corrección del lado del servidor.

### Preparación y alcance

La Web Security Academy ofrece laboratorios interactivos gratuitos; se puede crear una cuenta para guardar el progreso. Inicia el laboratorio desde su ficha y realiza todas las solicitudes únicamente contra el dominio temporal asignado. No uses el dominio de la plataforma ni otro sitio como objetivo.

Se necesita un navegador con herramientas de desarrollo. Burp Suite Community es opcional; también se pueden observar las solicitudes desde DevTools.

Antes de empezar, lee el enunciado sin consultar la solución y prepara una tabla para registrar las solicitudes y respuestas de referencia.

### Conceptos de la práctica

- **Autenticación:** confirma la identidad asociada a una sesión.
- **Autorización:** determina qué acciones puede realizar esa identidad.
- **Cookie de sesión:** transporta información que permite asociar solicitudes consecutivas con una sesión.
- **Control de acceso basado en parámetros:** una aplicación toma decisiones de privilegios usando valores incluidos en la solicitud o en datos controlados por el cliente.

### Plan de trabajo

| Tiempo           | Actividad                                  | Evidencia                                    |
| ---------------- | ------------------------------------------ | -------------------------------------------- |
| 0–10 min         | Leer el enunciado y preparar la instancia  | Alcance y dominio asignado                   |
| 10–25 min        | Examinar el acceso antes de iniciar sesión | Respuesta inicial y restricciones observadas |
| 25–45 min        | Iniciar sesión y comparar las solicitudes  | Cambios en cookies, cabeceras y respuesta    |
| 45–70 min        | Formular y comprobar una hipótesis         | Pruebas controladas y resultados             |
| 70–90 min        | Completar el objetivo y analizar la causa  | Indicador de éxito y mitigación              |
| Opcional: 20 min | Repetir y redactar el informe              | Procedimiento reproducible                   |

### Procedimiento

1. Abre la ruta del panel administrativo antes de iniciar sesión y registra la respuesta y cualquier redirección.
2. Inicia sesión con las credenciales de prueba incluidas en el enunciado del laboratorio.
3. Compara las solicitudes y respuestas anteriores y posteriores al inicio de sesión. Registra las cookies, cabeceras, redirecciones y cambios de contenido relevantes.
4. Clasifica qué datos identifican la sesión y cuáles parecen influir en la decisión de privilegios.
5. Formula una hipótesis sobre la información que controla el cliente. Cambia un solo elemento por prueba y conserva una solicitud original para comparar.
6. Verifica el acceso efectivo al panel y el indicador de éxito del laboratorio; una respuesta `200` por sí sola no demuestra que la acción autorizada se haya realizado.
7. Explica qué validación debería hacer el servidor para impedir que el cliente determine su propio rol.

### Pistas graduadas

Utiliza una pista por vez y anota cuál fue necesaria.

- **Pista 1 — Comparación:** observa las solicitudes antes y después del inicio de sesión; no te limites al aspecto visual de la página.
- **Pista 2 — Identidad y permisos:** iniciar sesión confirma una identidad, pero el servidor todavía debe comprobar qué acciones permite a esa identidad.
- **Pista 3 — Confianza:** investiga si una decisión sensible depende de un valor que puede modificar el navegador y comprueba esa hipótesis de forma aislada.

### Errores frecuentes

- Confundir un cambio visual con acceso efectivo a una función.
- Interpretar cualquier respuesta `200` como prueba de éxito.
- Mezclar cookies de distintas instancias o sesiones.
- Culpar al uso de cookies sin identificar qué decisión tomó el servidor y por qué.
- Probar fuera del dominio temporal asignado.

### Entregable y criterio de logro

Entrega una tabla con **estado inicial, cambio realizado, resultado e interpretación**, seguida de una explicación de la causa y una corrección concreta. No incluyas credenciales ni datos de sesión en el informe.

La práctica se considera completada cuando se puede demostrar qué control de acceso falló y explicar por qué autenticar a una persona no basta para autorizar sus acciones.

---
