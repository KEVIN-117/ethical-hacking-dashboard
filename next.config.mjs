/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  experimental: {
    cpus: 1,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    if (process.env.NODE_ENV !== "development") return []

    return {
      beforeFiles: [],
      afterFiles: [
        { source: "/blog", destination: "/blog/index.html" },
        { source: "/blog/:slug*/", destination: "/blog/:slug*/index.html" },
        {
          source: "/blog/:slug*",
          destination: "/blog/:slug*/index.html",
        },
      ],
      fallback: [],
    }
  },
}

export default nextConfig
