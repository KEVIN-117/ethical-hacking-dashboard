---
title: "3. HTB Meow: enumeración de servicios"
date: 2026-10-17
description: "Práctica introductoria de reconocimiento con Nmap e interacción con un servicio expuesto en HTB Starting Point."
tags:
  - daily
  - htb
  - nmap
  - linux
sticker: emoji//1f489
cover: "/images/article-headers/header-daily-session-3.webp"
---

## Práctica 3

### HTB Meow: del reconocimiento al acceso

Esta práctica aplica los fundamentos de Linux, redes, IP, puertos y servicios en **Meow**, de HTB Starting Point. El trabajo se centra en enumerar el objetivo, validar el servicio identificado y explicar con evidencia cómo se obtuvo el acceso.

**Objetivo:** completar la máquina y documentar la secuencia **IP → puerto → servicio → interacción → acceso**. **Duración estimada: 90–120 minutos.** La práctica puede realizarse por etapas si el tiempo disponible no alcanza.

### Preparación y alcance

Busca **Meow** en [HTB Starting Point](https://app.hackthebox.com/starting-point) y comprueba que esté disponible para la cuenta utilizada. Inicia la máquina y conéctate al laboratorio mediante la configuración OpenVPN correspondiente o un entorno HTB autorizado. La disponibilidad y las condiciones de acceso dependen de la cuenta.

Utiliza únicamente la IP asignada por HTB. Ten preparada una terminal Linux con Nmap y crea un directorio para las evidencias:

```bash
mkdir -p ~/lab-seguridad/meow/evidencias
cd ~/lab-seguridad/meow
nmap --help
```

Pwnbox puede ser una alternativa si está disponible en la cuenta. Consulta la [guía oficial de Starting Point](https://help.hackthebox.com/en/articles/6007919-introduction-to-starting-point) para revisar las opciones de conexión y las condiciones vigentes.

### Plan de trabajo

| Tiempo     | Actividad                                                    | Evidencia                                  |
| ---------- | ------------------------------------------------------------ | ------------------------------------------ |
| 0–15 min   | Preparar el entorno y confirmar conexión con el objetivo     | IP asignada y método de conexión           |
| 15–35 min  | Enumerar puertos TCP frecuentes                              | Comando y puertos observados               |
| 35–55 min  | Identificar y validar el servicio                            | Protocolo, respuesta y conclusión          |
| 55–90 min  | Interactuar con el servicio y resolver las preguntas guiadas | Decisiones y resultados                    |
| 90–120 min | Completar la máquina y redactar el informe                   | Confirmación de envío de la flag e informe |

### Procedimiento

Comienza con un reconocimiento limitado a los 100 puertos TCP más frecuentes. Sustituye `IP_DE_HTB` por la dirección asignada:

```bash
nmap -sT --top-ports 100 -oN evidencias/puertos.txt IP_DE_HTB
```

Este comando no examina todos los puertos. Si no aparecen resultados, verifica primero la IP, la conexión VPN, la ruta y el estado de la máquina. Un objetivo puede no responder a ping y aun así tener puertos accesibles.

Después, ejecuta detección de versiones contra los puertos encontrados. Revisa la sintaxis con `nmap --help` y especifica solo esos puertos, por ejemplo:

```bash
nmap -sV -p PUERTOS_ENCONTRADOS -oN evidencias/servicios.txt IP_DE_HTB
```

La opción `-sV` envía sondas para ayudar a identificar los servicios; el número de puerto por sí solo no los confirma. Consulta la [referencia oficial de detección de versiones de Nmap](https://nmap.org/book/man-version-detection.html).

Completa el análisis con estas tareas:

1. Registra la IP objetivo y revisa la ruta con `ip route get IP_DE_HTB`.
2. Identifica al menos un puerto abierto y explica qué indica ese estado.
3. Valida el servicio y determina qué cliente permite interactuar con él.
4. Usa las preguntas de la máquina para avanzar y registra las decisiones relevantes.
5. Si obtienes una shell, confirma el contexto del sistema antes de ejecutar `whoami`, `id`, `pwd` y `ls -la`.
6. Explica qué configuración permitió el acceso y propone una medida correctiva.

### Pistas graduadas

Abre cada pista solo cuando sea necesaria.

<details>
<summary>Pista 1: conectividad y enumeración</summary>

La IP objetivo es remota; `127.0.0.1` se refiere al propio entorno. Comprueba la conexión VPN, la ruta y que la máquina siga activa. La ausencia de respuesta a ping no demuestra por sí sola que el objetivo esté apagado.

</details>

<details>
<summary>Pista 2: del puerto al servicio</summary>

Compara el reconocimiento inicial con la detección mediante `-sV`. Usa la ayuda del cliente correspondiente al protocolo identificado. No des por hecho que el objetivo ofrece HTTP.

</details>

<details>
<summary>Pista 3: interacción y acceso</summary>

Observa el diálogo del servicio y las preguntas guiadas de Meow. La práctica se enfoca en una configuración insegura sencilla. Si hace falta, consulta primero una pista de HTB y registra qué ayuda utilizaste.

</details>

### Errores frecuentes

- Ejecutar comandos en el equipo local suponiendo que ya se está dentro del objetivo.
- Tratar el nombre asociado a un puerto como prueba de una vulnerabilidad.
- Ampliar el escaneo antes de comprobar la VPN, la ruta y la IP.
- Consultar un recorrido completo sin intentar explicar primero la evidencia disponible.

### Entregable y criterio de logro

Redacta un informe breve que incluya el alcance, los comandos utilizados, los puertos y servicios observados, las evidencias del acceso, la causa del problema y una mitigación. Envía la flag en HTB, pero no la incluyas en el informe.

La práctica se considera completada cuando se puede reconstruir y justificar con evidencia la secuencia **IP → puerto → servicio → interacción → acceso**. Si no se termina, registra el último paso alcanzado, la dificultad y las pistas utilizadas.

---
