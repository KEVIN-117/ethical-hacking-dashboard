---
title: "2. Procesos, IP y puertos en Linux"
date: 2026-10-15
description: "Relaciona procesos, sockets y respuestas HTTP con una práctica de servicio local, limitada a loopback y con alcance autorizado."
tags:
  - daily
  - linux
  - redes
sticker: emoji//1f4d0
cover: "/images/article-headers/header-daily-session-2.webp"
---

## Sesión 2 — Jueves 15 de octubre

### Del archivo al servicio: procesos, IP y puertos

Hoy relacionarás lo visto sobre Linux con una pregunta básica de enumeración: **¿qué programa está atendiendo conexiones y qué evidencia lo demuestra?**

Como aún no has confirmado avances, mantenemos el nivel inicial. No necesitas explotar vulnerabilidades ni escanear redes externas.

**Objetivo:** levantar un servicio HTTP local, identificar su proceso y puerto, consultar una respuesta y documentar qué cambia al detenerlo. **Duración: 110 minutos.**

### Recursos y preparación

Recurso principal: [HTB Academy — Linux Fundamentals](https://academy.hackthebox.com/course/preview/linux-fundamentals). Selecciona _Service and Process Management_, _Network Services_ y _Working with Web Services_. Son secciones del temario oficial; no hace falta completar hoy todo el módulo. [HTB Academy](https://academy.hackthebox.com/course/preview/linux-fundamentals?utm_source=chatgpt.com)

Como referencia de redes utiliza [HTB Academy — Introduction to Networking](https://academy.hackthebox.com/course/preview/introduction-to-networking). Consulta únicamente los conceptos de IP y conexiones TCP/UDP que necesites para esta práctica. [HTB Academy](https://academy.hackthebox.com/course/preview/introduction-to-networking?utm_source=chatgpt.com)

Enlaces consultados el **15/10/2026**. No he verificado tu suscripción ni el acceso completo de tu cuenta.

Necesitas Linux —equipo propio, VM o WSL—, dos terminales y estos programas:

```bash
python3 --version
curl --version
command -v ss
```

### Plan de estudio

| Bloque                     | Tiempo | Resultado esperado                            |
| -------------------------- | -----: | --------------------------------------------- |
| Repaso de rutas y permisos | 10 min | Explicar `pwd`, `ls -la` y `600`              |
| Lectura de HTB             | 25 min | Distinguir proceso, servicio y puerto         |
| Laboratorio guiado         | 40 min | Observar el servicio desde servidor y cliente |
| Investigación autónoma     | 25 min | Reunir evidencias y justificar conclusiones   |
| Cierre                     | 10 min | Comprobar comprensión                         |

Si el repaso inicial cuesta, dedica parte de la lectura a recuperar esos fundamentos; no necesitas acelerar.

### Conceptos esenciales

- **Proceso:** programa en ejecución, identificado mediante un PID.
- **Servicio:** funcionalidad ofrecida por un programa. No todo proceso es un servicio de red.
- **IP y puerto:** la IP identifica una dirección de red; el puerto permite distinguir puntos de comunicación dentro de un host.
- **Escucha y conexión:** un socket en `LISTEN` espera conexiones; eso no significa que ya haya un cliente conectado.
- **Loopback:** `127.0.0.1` apunta al propio entorno de red. En una VM o contenedor no representa automáticamente al equipo anfitrión.
- **Evidencia e hipótesis:** una respuesta HTTP demuestra que algo respondió usando ese protocolo; no demuestra por sí sola que exista una vulnerabilidad.

### Laboratorio: un servicio bajo tu control

Trabaja como usuario normal y sirve únicamente archivos de prueba.

**1. Prepara el entorno en la primera terminal**

```bash
mkdir -p ~/lab-seguridad/sesion-02/publico
cd ~/lab-seguridad/sesion-02/publico
printf 'Laboratorio autorizado: servicio HTTP local\n' > index.html
python3 -m http.server 8000 --bind 127.0.0.1
```

Deja esa terminal abierta. El servidor queda limitado a loopback mediante `--bind`; el servidor HTTP de Python es apropiado para esta demostración, no para producción. [Python 3.15.0 documentation](https://docs.python.org/3/library/http.server.html?utm_source=chatgpt.com)

**2. Observa desde la segunda terminal**

```bash
ss -ltnp 'sport = :8000'
ps -eo pid,user,args | grep '[h]ttp.server'
curl -i --max-time 5 http://127.0.0.1:8000/
```

Antes de continuar, identifica:

- La dirección y el puerto de escucha.
- El PID del servidor, si aparece.
- El código de estado HTTP y el cuerpo recibido.
- La línea registrada en la primera terminal después de la petición.

`ss -ltnp` selecciona sockets TCP en escucha, muestra direcciones numéricas e intenta mostrar procesos. La información de procesos puede estar limitada por permisos; no uses `sudo` automáticamente.

**3. Compara dos peticiones**

Solicita `/` y después `/no-existe-sesion-02`. Anota qué cambia en el estado HTTP, el cuerpo y el registro del servidor.

Después detén **solo el servidor que acabas de iniciar**, usando `Ctrl+C` en su terminal. Repite `ss` y `curl`.

Tu explicación debe distinguir **una respuesta HTTP de error** de **no poder establecer la conexión**.

### Investigación autónoma y entregables

Sin copiar una solución completa:

1. Guarda las cabeceras de una respuesta y su cuerpo en archivos separados; consulta `curl --help`.
2. Elabora un inventario con: dirección, puerto, protocolo, PID, usuario y evidencia.
3. Explica qué observaciones permiten relacionar el proceso Python con el servicio.
4. Escribe dos límites de tus conclusiones: por ejemplo, qué no puedes afirmar sobre accesibilidad desde otro equipo.

**Pistas graduadas:** consulta primero la ayuda; después busca las opciones `-D` y `-o` de `curl`; finalmente compara los resultados antes y después de detener el servidor.

### Errores frecuentes

- Confundir el PID con el puerto.
- Interpretar `LISTEN` como una conexión activa.
- Suponer que el puerto identifica con certeza el servicio.
- Servir accidentalmente una carpeta con documentos personales.
- Cambiar a `0.0.0.0` sin comprender que amplía las interfaces de escucha.
- Tratar un fallo de conexión como si fuera un código HTTP.

**Criterio de logro:** puedes relacionar proceso, socket y respuesta HTTP, explicar el cambio al detener el servidor y distinguir hechos de suposiciones. Si algo falla, documentar correctamente el fallo también cuenta como aprendizaje.

Para el sábado mantendremos un reto introductorio de enumeración; sin avances confirmados no pasaremos todavía a Pro Labs.

Al terminar, deja un reporte de cinco líneas: **tiempo dedicado, secciones estudiadas, pruebas completadas, conclusión principal y dificultad encontrada**.
