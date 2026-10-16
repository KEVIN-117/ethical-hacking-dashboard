import { copyFile, mkdir, readdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const outputDirectory = path.join(projectRoot, "public", "blog")
const siteBasePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "")
const blogBasePath = `${siteBasePath}/blog`
const localOrigin = "https://pages.local"

async function collectHtml(directory) {
  const files = []
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name)
    if (entry.isDirectory()) files.push(...(await collectHtml(entryPath)))
    else if (entry.name.endsWith(".html")) files.push(entryPath)
  }
  return files
}

function pageInfo(filePath) {
  const relativePath = path.relative(outputDirectory, filePath).split(path.sep).join("/")
  const directory = path.posix.dirname(relativePath)
  const isIndex = path.posix.basename(relativePath) === "index.html"
  const slug = isIndex
    ? directory === "." ? "" : directory
    : path.posix.join(directory === "." ? "" : directory, path.posix.basename(relativePath, ".html"))
  const logicalRoute = `${blogBasePath}${slug ? `/${slug}` : ""}`
  const canonicalPath = `${logicalRoute}/`
  const resolutionPath = isIndex ? canonicalPath : logicalRoute
  return { isIndex, slug, logicalRoute, canonicalPath, resolutionUrl: new URL(resolutionPath, localOrigin) }
}

function stripBasePath(pathname) {
  if (siteBasePath && pathname.startsWith(`${siteBasePath}/`)) return pathname.slice(siteBasePath.length)
  if (siteBasePath && pathname === siteBasePath) return "/"
  return pathname
}

function rewriteAnchor(href, resolutionUrl, pageRoutes) {
  if (!href || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href)) return href
  const resolved = new URL(href, resolutionUrl)
  if (resolved.origin !== localOrigin) return href

  let logicalPath = stripBasePath(resolved.pathname)
  if (!logicalPath.startsWith("/blog/")) {
    if (logicalPath === "/blog") logicalPath = "/blog/"
    else return href
  }
  logicalPath = logicalPath.replace(/\/$/, "") || "/blog"
  const canonicalPath = pageRoutes.get(logicalPath)
  if (!canonicalPath) return href
  return `${canonicalPath}${resolved.search}${resolved.hash}`
}

function rewriteAsset(reference, resolutionUrl) {
  if (!reference || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(reference)) return reference
  const resolved = new URL(reference, resolutionUrl)
  if (resolved.origin !== localOrigin) return reference
  if (resolved.pathname.startsWith("/images/")) return `${siteBasePath}${resolved.pathname}${resolved.search}${resolved.hash}`

  const logicalPath = stripBasePath(resolved.pathname)
  if (logicalPath.startsWith("/blog/")) {
    return `${siteBasePath}${logicalPath}${resolved.search}${resolved.hash}`
  }
  if (logicalPath === "/blog") return `${blogBasePath}/${resolved.search}${resolved.hash}`
  return reference
}

async function rewriteStaticReferences(html, resolutionUrl, canonicalPath, pageRoutes) {
  html = html.replace(/<base\b[^>]*>/gi, "")
  html = html.replace("<head>", `<head><base href="${canonicalPath}">`)
  html = html.replace(
    /fetch\((["'])(?:\.\.?\/)*static\/contentIndex\.json\1\)/g,
    `fetch("${blogBasePath}/static/contentIndex.json")`,
  )
  html = html.replace(/<a\b[^>]*>/gi, (tag) =>
    tag.replace(/\bhref="([^"]*)"/i, (_, href) => `href="${rewriteAnchor(href, resolutionUrl, pageRoutes)}"`),
  )
  html = html.replace(/<(?:link|script|img)\b[^>]*>/gi, (tag) =>
    tag.replace(/\b(href|src)="([^"]*)"/gi, (_, attribute, reference) =>
      `${attribute}="${rewriteAsset(reference, resolutionUrl)}"`,
    ),
  )
  return html
}

export async function prepareQuartzPages() {
  const pages = (await collectHtml(outputDirectory)).filter((file) => path.basename(file) !== "404.html")
  const pageRoutes = new Map()
  for (const file of pages) {
    const { logicalRoute, canonicalPath } = pageInfo(file)
    pageRoutes.set(logicalRoute.replace(/\/$/, "") || "/blog", canonicalPath)
  }
  pageRoutes.set("/blog", `${blogBasePath}/`)

  for (const file of pages) {
    const { isIndex, slug, logicalRoute, canonicalPath, resolutionUrl } = pageInfo(file)
    const original = await readFile(file, "utf8")
    const updated = await rewriteStaticReferences(original, resolutionUrl, canonicalPath, pageRoutes)
    if (updated !== original) await writeFile(file, updated, "utf8")

    if (!isIndex) {
      const alias = path.join(outputDirectory, ...slug.split("/"), "index.html")
      await mkdir(path.dirname(alias), { recursive: true })
      await copyFile(file, alias)
    }
  }
}
