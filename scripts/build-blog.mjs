import { existsSync } from "node:fs"
import { copyFile, readdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { spawnSync } from "node:child_process"
import { prepareQuartzPages } from "./prepare-quartz-pages.mjs"

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const quartzRoot = path.resolve(process.env.QUARTZ_DIR || path.join(projectRoot, "..", "quartz"))
const quartzCli = path.join(quartzRoot, "quartz", "bootstrap-cli.mjs")
const contentDirectory = path.join(projectRoot, "blog-content")
const outputDirectory = path.join(projectRoot, "public", "blog")
const siteBasePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "")
const quartzConfigSource = path.join(projectRoot, "quartz-deploy", "quartz.config.yaml")
const quartzStylesSource = path.join(projectRoot, "quartz-deploy", "custom.scss")

if (!existsSync(contentDirectory) && !existsSync(path.join(outputDirectory, "index.html"))) {
  console.error(`No se encontró el contenido del blog: ${contentDirectory}`)
  process.exit(1)
}

let buildStatus = 0
if (existsSync(quartzCli) && existsSync(path.join(quartzRoot, "node_modules"))) {
  if (existsSync(quartzConfigSource)) await copyFile(quartzConfigSource, path.join(quartzRoot, "quartz.config.yaml"))
  if (existsSync(quartzStylesSource)) {
    await copyFile(quartzStylesSource, path.join(quartzRoot, "quartz", "styles", "custom.scss"))
  }
  const result = spawnSync(
    process.execPath,
    [quartzCli, "build", "--directory", contentDirectory, "--output", outputDirectory],
    { cwd: quartzRoot, stdio: "inherit" },
  )
  if (result.error) {
    console.error(result.error.message)
    process.exit(1)
  }
  buildStatus = result.status ?? 1
} else if (existsSync(path.join(outputDirectory, "index.html"))) {
  console.log("Quartz no está disponible; se conservará el blog estático incluido en public/blog.")
} else {
  console.error("No se encontró Quartz. Define QUARTZ_DIR o conserva la salida estática en public/blog.")
  process.exit(1)
}

if (buildStatus === 0 && !existsSync(path.join(outputDirectory, "index.html"))) {
  console.error("Quartz terminó sin generar public/blog/index.html. Revisa blog-content/index.md.")
  process.exit(1)
}

async function addQuartzBaseUrls(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      await addQuartzBaseUrls(entryPath)
      continue
    }

    if (entry.name !== "index.html") continue

    const relativeDirectory = path.relative(outputDirectory, directory).split(path.sep).join("/")
    const basePath = `${siteBasePath}/blog/${relativeDirectory ? `${relativeDirectory}/` : ""}`
    const html = await readFile(entryPath, "utf8")
    const withoutOldBase = html.replace(/<base href="[^"]*"\s*\/?\s*>/gi, "")
    const updatedHtml = withoutOldBase.replace("<head>", `<head><base href="${basePath}">`)
    if (updatedHtml !== html) {
      await writeFile(entryPath, updatedHtml, "utf8")
    }
  }
}

async function addHackerHubBrandImage(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      await addHackerHubBrandImage(entryPath)
      continue
    }

    if (path.extname(entry.name) !== ".html") continue

    const html = await readFile(entryPath, "utf8")
    const updatedHtml = html.replace(
      /(<h2 class="page-title"><a)([^>]*)>[\s\S]*?<\/a><\/h2>/i,
      `$1$2 class="brand-link"><img class="brand-image" src="${siteBasePath}/images/hackerhub-red-team-mascot.png" alt="HackerHub · Bitácora Red Team" width="216" height="72" /></a></h2>`,
    )
    if (updatedHtml !== html) await writeFile(entryPath, updatedHtml, "utf8")
  }
}

async function makeRecentNotesCollapsible(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      await makeRecentNotesCollapsible(entryPath)
      continue
    }

    if (path.extname(entry.name) !== ".html") continue

    let html = await readFile(entryPath, "utf8")
    const openingTag = /<div class="([^"]*\brecent-notes\b[^"]*)">/i.exec(html)
    if (!openingTag) continue

    const start = openingTag.index
    let depth = 1
    const divTagPattern = /<\/?div\b[^>]*>/gi
    divTagPattern.lastIndex = start + openingTag[0].length
    let closingEnd = -1
    let match

    while ((match = divTagPattern.exec(html))) {
      if (/^<div\b/i.test(match[0]) && !/\/>$/.test(match[0])) {
        depth += 1
      } else {
        depth -= 1
        if (depth === 0) {
          closingEnd = divTagPattern.lastIndex
          break
        }
      }
    }

    if (closingEnd < 0) continue

    let recentNotes = html.slice(start, closingEnd)
    recentNotes = recentNotes.replace(openingTag[0], `<details class="${openingTag[1]}">`)
    recentNotes = recentNotes.replace(
      /^(<details\b[^>]*>)<h3>([\s\S]*?)<\/h3>/i,
      "$1<summary class=\"recent-notes-summary\"><h3>$2</h3></summary>",
    )
    recentNotes = recentNotes.replace(/<\/div>$/i, "</details>")

    html = `${html.slice(0, start)}${recentNotes}${html.slice(closingEnd)}`
    await writeFile(entryPath, html, "utf8")
  }
}

async function shortenCollectionLabels(directory) {
  const labels = new Map([
    ["Kerberos - The Definitive Guide", "Kerberos"],
    [
      "Practical Reverse Engineering - x86, x64, ARM, Windows Kernel, Reversing Tools, and Obfuscation",
      "Ingeniería inversa",
    ],
  ])

  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      await shortenCollectionLabels(entryPath)
      continue
    }

    if (![".html", ".json"].includes(path.extname(entry.name))) continue

    let html = await readFile(entryPath, "utf8")
    for (const [longLabel, shortLabel] of labels) {
      html = html.replaceAll(longLabel, shortLabel)
    }
    await writeFile(entryPath, html, "utf8")
  }
}

if (buildStatus === 0) {
  await addQuartzBaseUrls(outputDirectory)
  await addHackerHubBrandImage(outputDirectory)
  await makeRecentNotesCollapsible(outputDirectory)
  await shortenCollectionLabels(outputDirectory)
  await prepareQuartzPages()
}

process.exit(buildStatus)
