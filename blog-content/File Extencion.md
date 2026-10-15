---
title: "Firmas de archivo"
---

## 1. Tabla forense de firmas y offsets

| Formato            | Offset típico | Bytes / ASCII             | Qué buscar con `xxd`/`hexdump`                |
| ------------------ | ------------: | ------------------------- | --------------------------------------------- |
| **JPEG**           |        `0x00` | `FF D8 FF`                | Inicio `FF D8 FF`; final `FF D9`              |
| **PNG**            |        `0x00` | `89 50 4E 47 0D 0A 1A 0A` | Firma + `49 48 44 52` (`IHDR`)                |
| **GIF**            |        `0x00` | `47 49 46 38`             | `GIF87a` o `GIF89a`                           |
| **BMP**            |        `0x00` | `42 4D`                   | `BM` + estructura DIB                         |
| **TIFF LE**        |        `0x00` | `49 49 2A 00`             | `II*.`                                        |
| **TIFF BE**        |        `0x00` | `4D 4D 00 2A`             | `MM.*`                                        |
| **WEBP**           |        `0x00` | `RIFF`                    | `52 49 46 46`; en `0x08`: `WEBP`              |
| **PDF**            |        `0x00` | `25 50 44 46`             | `%PDF`; buscar `%EOF` al final                |
| **ZIP**            |        `0x00` | `50 4B 03 04`             | `PK..`; también buscar estructuras ZIP        |
| **RAR 4**          |        `0x00` | `52 61 72 21 1A 07 00`    | `Rar!...`                                     |
| **RAR 5**          |        `0x00` | `52 61 72 21 1A 07 01 00` | `Rar!.....`                                   |
| **7-Zip**          |        `0x00` | `37 7A BC AF 27 1C`       | `7z...'`                                      |
| **GZIP**           |        `0x00` | `1F 8B 08`                | Cabecera gzip                                 |
| **BZIP2**          |        `0x00` | `42 5A 68`                | `BZh`                                         |
| **XZ**             |        `0x00` | `FD 37 7A 58 5A 00`       | `.7zXZ.`                                      |
| **ELF**            |        `0x00` | `7F 45 4C 46`             | `\x7FELF`                                     |
| **PE/EXE/DLL**     |        `0x00` | `4D 5A`                   | `MZ`; luego PE en otro offset                 |
| **Mach-O 32 BE**   |        `0x00` | `FE ED FA CE`             | Mach-O                                        |
| **Mach-O 64 BE**   |        `0x00` | `FE ED FA CF`             | Mach-O                                        |
| **Mach-O 32 LE**   |        `0x00` | `CE FA ED FE`             | Mach-O                                        |
| **Mach-O 64 LE**   |        `0x00` | `CF FA ED FE`             | Mach-O                                        |
| **WAV**            |        `0x00` | `RIFF`                    | `0x08`: `WAVE`                                |
| **AVI**            |        `0x00` | `RIFF`                    | `0x08`: `AVI`                                 |
| **MP3**            |        `0x00` | `49 44 33`                | `ID3`; también pueden existir frames `FF FB`  |
| **FLAC**           |        `0x00` | `66 4C 61 43`             | `fLaC`                                        |
| **OGG**            |        `0x00` | `4F 67 67 53`             | `OggS`                                        |
| **MP4/MOV**        |        `0x04` | `66 74 79 70`             | `ftyp`; mirar `major_brand`                   |
| **SQLite 3**       |        `0x00` | `SQLite format 3\0`       | Texto ASCII completo                          |
| **DOC antiguo**    |        `0x00` | `D0 CF 11 E0 A1 B1 1A E1` | OLE Compound File                             |
| **DOCX/XLSX/PPTX** |        `0x00` | `50 4B 03 04`             | ZIP + archivos internos `[Content_Types].xml` |
| **TAR**            |       `0x101` | `75 73 74 61 72`          | `ustar` en offset `257` decimal               |
| **ISO 9660**       |      `0x8001` | `43 44 30 30 31`          | `CD001`                                       |
| **EXT2/3/4**       |       `0x438` | `53 EF`                   | Superblock                                    |
| **NTFS**           |        `0x03` | `4E 54 46 53`             | `NTFS` dentro del boot sector                 |
| **FAT32**          |        `0x52` | `46 41 54 33 32`          | `FAT32`                                       |
| **FAT16**          |        `0x36` | `46 41 54 31 36`          | `FAT16`                                       |

> `0x438` significa offset hexadecimal. `0x438 = 1080` en decimal.  
> Para FAT/NTFS y sistemas de archivos, el offset depende del sector/estructura que estés examinando.

---

# 2. El caso especial de EXE/DLL: `MZ` no es suficiente

Un error común en análisis forense es pensar:

```text
4D 5A = EXE
```

No exactamente.

`MZ` indica un ejecutable con formato DOS/compatible, pero un ejecutable moderno PE contiene posteriormente la firma:

```text
50 45 00 00
```

es decir:

```text
PE..
```

La ubicación de `PE\0\0` **no es fija**.

El encabezado DOS contiene en:

```text
offset 0x3C
```

un valor de 4 bytes llamado `e_lfanew`, que indica dónde comienza el encabezado PE.

Puedes comprobarlo:

```bash
xxd -g 1 -l 128 archivo
```

Busca:

```text
00000000: 4d 5a ...
...
0000003c: ?? ?? ?? ??
```

Luego interpretas esos cuatro bytes como un entero little-endian y saltas a ese offset.

Por eso, forensemente:

```text
MZ
 ↓
e_lfanew @ 0x3C
 ↓
PE\0\0
 ↓
COFF Header
 ↓
Optional Header
 ↓
Sections
```

es mucho más sólido que simplemente mirar `MZ`.

---

# 3. ZIP: uno de los más importantes para detectar archivos disfrazados

Los formatos modernos de Microsoft Office:

```text
.docx
.xlsx
.pptx
```

son esencialmente contenedores ZIP.

Por eso puedes encontrar:

```text
50 4B 03 04
```

en los tres.

Pero si tienes:

```text
malware.jpg
```

y comienza:

```text
50 4B 03 04
```

hay una inconsistencia importante:

```text
Extensión: JPG
Firma:     ZIP
```

Eso merece investigación.

Puedes comprobarlo:

```bash
file malware.jpg
unzip -l malware.jpg
```

Si `unzip` consigue listar contenido, probablemente tienes un ZIP independientemente de la extensión.

---

# 4. PDF: no basta con `%PDF`

Un PDF normalmente comienza:

```text
25 50 44 46
```

ASCII:

```text
%PDF
```

Por ejemplo:

```bash
xxd -l 32 archivo
```

podría mostrar:

```text
00000000: 25 50 44 46 2d 31 2e 37 0d 0a ...
```

que corresponde a:

```text
%PDF-1.7
```

Pero hay una particularidad forense interesante.

PDF puede contener **bytes antes de `%PDF`**. Por lo tanto, encontrar `%PDF` no necesariamente significa que esté en `0x00`.

Puedes buscarlo:

```bash
grep -aob '%PDF' archivo
```

o:

```bash
xxd archivo | grep '25504446'
```

Y al final puedes buscar:

```text
%EOF
```

Por ejemplo:

```bash
grep -aob '%EOF' archivo
```

Esto permite investigar casos como:

```text
[datos basura]
[datos ocultos]
%PDF-1.7
...
%EOF
```

---

# 5. TAR: una firma que NO está al principio

Este es un excelente ejemplo de por qué los offsets importan.

Un TAR puede contener:

```text
offset 0x101
75 73 74 61 72
```

ASCII:

```text
ustar
```

`0x101` hexadecimal = `257` decimal.

Puedes examinarlo directamente:

```bash
xxd -s 0x101 -l 20 archivo.tar
```

o:

```bash
hexdump -C -s 257 -n 20 archivo.tar
```

Podrías obtener:

```text
00000101  75 73 74 61 72 00 ...
           u  s  t  a  r
```

---

# 6. MP4: la firma está en `0x04`

Otro caso importante.

Un MP4 normalmente tiene:

```text
00 00 00 ?? 66 74 79 70
```

La palabra:

```text
66 74 79 70
```

es:

```text
ftyp
```

Por eso:

```bash
xxd -l 32 video.mp4
```

puede producir:

```text
00000000: 00 00 00 20 66 74 79 70 69 73 6f 6d ...
                  ^       ^
                size     ftyp
```

Después de `ftyp` aparece el `major_brand`.

Por ejemplo:

```text
ftypisom
```

o:

```text
ftypmp42
```

Esto es bastante más útil que buscar simplemente "MP4".

---

# 7. Archivos falsamente renombrados

Esta es una de las comprobaciones básicas de un análisis forense:

```text
Extensión declarada
        ↓
       ¿?
        ↓
Firma real
```

Ejemplo:

```text
documento.jpg
```

pero:

```bash
xxd -l 16 documento.jpg
```

produce:

```text
00000000: 25 50 44 46 2d 31 2e 37 ...
```

Tenemos:

```text
.jpg
 ↓
%PDF
```

Por tanto:

**la extensión no corresponde con la firma.**

Otro ejemplo:

```text
foto.png
```

pero:

```text
4D 5A ...
```

Eso podría indicar un ejecutable Windows disfrazado como PNG.

---

# 8. Tabla rápida de inconsistencias forenses

|Extensión|Esperado|Si aparece esto...|Sospecha|
|---|---|---|---|
|`.jpg`|`FF D8 FF`|`4D 5A`|PE/EXE disfrazado|
|`.jpg`|`FF D8 FF`|`25 50 44 46`|PDF disfrazado|
|`.png`|`89 50 4E 47...`|`4D 5A`|Ejecutable disfrazado|
|`.pdf`|`%PDF`|`50 4B 03 04`|ZIP/Office/etc.|
|`.txt`|texto|`4D 5A`|Ejecutable renombrado|
|`.docx`|`PK` + estructura OOXML|`FF D8 FF`|JPEG renombrado|
|`.zip`|`PK`|`7F 45 4C 46`|ELF renombrado|
|`.mp3`|`ID3` o frame MP3|`89 50 4E 47`|PNG renombrado|
|`.exe`|`MZ` + PE|`FF D8 FF`|No es PE normal|
|`.wav`|`RIFF` + `WAVE`|`RIFF` + `AVI`|AVI renombrado|

---

# 9. Pero cuidado: la extensión no es evidencia fuerte

En forense digital debes pensar en tres niveles:

### Nivel 1 — Extensión

```text
archivo.jpg
```

Es solamente un **nombre**.

Puede cambiarse con:

```bash
mv archivo.exe archivo.jpg
```

sin modificar ni un byte del contenido.

### Nivel 2 — Magic number

```text
FF D8 FF
```

Mucho más útil.

### Nivel 3 — Estructura interna

Es la evidencia más interesante.

Por ejemplo, para un supuesto JPG:

```text
FF D8 FF
 ↓
JPEG markers
 ↓
SOI
APP0/APP1
DQT
SOF
DHT
SOS
...
FF D9
```

Si solamente tiene:

```text
FF D8 FF
```

pero después contiene basura o una estructura incompatible, no deberías concluir automáticamente que es un JPEG válido.

---

# 10. Comandos que te recomiendo para tu análisis

### Ver primeros 64 bytes

```bash
hexdump -C -n 64 archivo
```

### Ver con `xxd`

```bash
xxd -g 1 -l 64 archivo
```

### Buscar una firma

```bash
grep -aob '%PDF' archivo
```

### Buscar bytes específicos

```bash
xxd archivo | grep '4d5a'
```

### Identificación automática

```bash
file archivo
```

### Ver MIME

```bash
file --mime-type archivo
```

### Ver strings ASCII

```bash
strings -a archivo | head -50
```

### Buscar estructuras sospechosas

```bash
binwalk archivo
```

`binwalk` es especialmente interesante porque intenta identificar firmas y estructuras embebidas dentro de archivos.

---

## 11. Una metodología forense sencilla

Cuando recibas un archivo desconocido, yo seguiría este orden:

```text
                 ┌───────────────┐
                 │ Archivo       │
                 └───────┬───────┘
                         ↓
                 ┌───────────────┐
                 │ Hash SHA-256  │
                 └───────┬───────┘
                         ↓
                 ┌───────────────┐
                 │ file          │
                 └───────┬───────┘
                         ↓
                 ┌───────────────┐
                 │ hexdump / xxd │
                 │ offset 0x00   │
                 └───────┬───────┘
                         ↓
                 ┌───────────────┐
                 │ Magic Number  │
                 └───────┬───────┘
                         ↓
              ¿Coincide con extensión?
                    ↙           ↘
                  SÍ             NO
                  ↓               ↓
             Continuar       Investigar
                  ↓               ↓
          Estructura interna   Carving
                  ↓               ↓
             Metadatos       Firmas internas
                  ↓
             Conclusión
```

Y antes de manipular el archivo original:

```bash
sha256sum archivo
```