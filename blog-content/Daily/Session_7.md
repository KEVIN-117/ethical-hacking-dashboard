---
title: "7. HTB Academy: uso de proxies web"
date: 2026-10-28
description: "Práctica local con Burp Suite para capturar, repetir y comparar solicitudes HTTP con cambios controlados."
tags:
  - daily
  - htb
  - burp-suite
  - seguridad-web
  - http
sticker: emoji//1f50e
cover: "/images/article-headers/header-daily-session-7.webp"
---

## Práctica 7

### HTB Academy: captura y repetición de solicitudes con Burp Suite

Esta práctica introduce el uso de un proxy web para observar solicitudes HTTP, conservar una petición de referencia y repetirla con cambios aislados. El laboratorio se ejecuta en `127.0.0.1`, por lo que el tráfico permanece en el propio equipo.

**Recurso principal:** [Using Web Proxies — HTB Academy](https://academy.hackthebox.com/course/preview/using-web-proxies)  
**Herramienta:** Burp Suite Community Edition  
**Duración estimada:** 110 minutos.

**Objetivo:** capturar una solicitud propia, enviarla a Repeater y explicar cómo cambian las respuestas al modificar la ruta, el método o los parámetros de una aplicación local.

### Preparación y alcance

El módulo de HTB Academy cubre proxies web, Burp Suite y ZAP, y clasifica el contenido como _Easy_. Para esta sesión basta con repasar sus secciones introductorias sobre configuración, interceptación y repetición de solicitudes. El módulo presupone familiaridad básica con aplicaciones web y solicitudes HTTP.

Se necesita Burp Suite Community Edition y su navegador integrado. Consulta la [documentación oficial de Proxy Intercept](https://portswigger.net/burp/documentation/desktop/tools/proxy/intercept-messages) y [Repeater](https://portswigger.net/burp/documentation/desktop/tools/repeater) si es necesario.

El único destino de esta práctica es el servidor local `127.0.0.1:8000`. No cambies el destino para enviar estas pruebas a un sitio externo.

### Conceptos de la práctica

- **Proxy de interceptación:** se sitúa entre el navegador y el servidor para registrar e inspeccionar mensajes HTTP.
- **Intercept:** retiene una solicitud antes de enviarla; mientras esté retenida, el navegador puede quedarse esperando.
- **Repeater:** permite editar y reenviar manualmente una solicitud para comparar respuestas.
- **Solicitud de referencia:** copia original que se conserva para distinguir el efecto de cada cambio.
- **Destino y cabecera `Host`:** deben corresponder al servidor local de la práctica.

### Plan de trabajo

| Tiempo     | Actividad                                 | Resultado esperado                              |
| ---------- | ----------------------------------------- | ----------------------------------------------- |
| 0–15 min   | Repasar HTTP y preparar el servidor local | Destino y partes de una solicitud identificados |
| 15–35 min  | Revisar el recurso introductorio          | Función del proxy comprendida                   |
| 35–55 min  | Capturar una solicitud propia             | Solicitud visible en HTTP history               |
| 55–90 min  | Repetir solicitudes en Repeater           | Comparación de cambios controlados              |
| 90–110 min | Analizar evidencias y redactar el reporte | Conclusiones justificadas                       |

Si método, ruta, cabeceras o cuerpo aún no resultan familiares, utiliza los primeros 20 minutos para repasarlos y ajusta el resto del plan.

### Laboratorio local

Prepara dos archivos de prueba y ejecuta el servidor limitado a loopback:

```bash
mkdir -p ~/lab-seguridad/proxy-01/publico
cd ~/lab-seguridad/proxy-01/publico
printf 'Pagina inicial\n' > index.html
printf 'Documento de laboratorio\n' > informe.txt
python3 -m http.server 8000 --bind 127.0.0.1
```

Mantén abierta la terminal del servidor. En Burp, abre su navegador integrado desde **Proxy → Intercept → Open browser** y deja **Intercept off** al comienzo. Visita:

```text
http://127.0.0.1:8000/
```

Busca la solicitud en **Proxy → HTTP history** y registra el método, la ruta, el destino, la cabecera `Host` y la respuesta. Envía una copia a Repeater mediante **Send to Repeater** y conserva esa copia como referencia.

### Procedimiento

Antes de cada prueba, escribe una predicción y modifica un solo elemento. Compara método, ruta, código de estado, cabeceras y cuerpo.

1. Reenvía la solicitud original y comprueba si reproduce la respuesta inicial.
2. Cambia la ruta a `/informe.txt` y registra el contenido recibido.
3. Solicita una ruta inexistente y compara la respuesta con las anteriores.
4. Añade `?modo=prueba` a `/informe.txt` y observa si el servidor utiliza ese parámetro.
5. Añade una cookie ficticia y registra el resultado. En este servidor estático no hay autenticación configurada, así que la presencia de la cookie no debe interpretarse por sí sola como un control de acceso.
6. Cambia el método de `GET` a `HEAD` y compara las cabeceras y el cuerpo.
7. Activa Intercept, recarga una vez, observa la solicitud retenida y libérala con **Forward**. Después, desactiva Intercept.

### Pistas graduadas

- **Pista 1 — Tráfico:** utiliza el navegador integrado y comprueba que la URL incluye el puerto `8000`.
- **Pista 2 — Espera:** si el navegador no termina de cargar, revisa si Intercept retuvo una solicitud y libérala.
- **Pista 3 — Comparación:** revisa código de estado, cabeceras y cuerpo. Una diferencia de longitud no explica por sí sola la causa.

### Errores frecuentes

- Editar la única copia de la solicitud y perder la referencia inicial.
- Cambiar varias cabeceras y la ruta a la vez.
- Confundir una solicitud retenida con un servidor detenido.
- Concluir que existe una vulnerabilidad porque una cookie ficticia fue aceptada por un servidor sin autenticación.
- Generalizar el comportamiento de un servidor estático a una aplicación con sesiones y permisos.

### Entregable y criterio de logro

Prepara una tabla con **cambio, predicción, estado HTTP, diferencia observada y conclusión**. Incluye al menos dos pares de solicitud y respuesta, y explica qué demuestra cada comparación.

La práctica se considera completada cuando puedes capturar una solicitud, repetirla y explicar al menos tres cambios controlados con evidencia.

---
