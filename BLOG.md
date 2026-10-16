# Blog Red Team

Quartz publica el contenido de `blog-content/` dentro de `public/blog/`. La app Next.js sirve esa salida en `/blog/` y adapta las URLs limpias de Quartz.

Para regenerarlo, ejecuta `bun run blog:build`. El proyecto Quartz debe estar en `../quartz` o indicarse con `QUARTZ_DIR`; instala sus dependencias una vez con `bun install` dentro de ese proyecto. Los comandos `bun run dev` y `bun run build` también actualizan el blog antes de iniciar Next.js.

Los artículos se editan en `blog-content/`. Para publicar una nota Daily, duplica `templates/daily-note.md` en `blog-content/Daily/`, completa el contenido y súbelo a `main`. La acción de GitHub genera Quartz y la app, y publica ambos en Pages.

GitHub Pages es un hosting estático: no permite editar ni guardar notas desde el navegador. El flujo Markdown + push mantiene cada nota en el repositorio y activa la publicación automáticamente.

El sitio se publica en `https://kevin-117.github.io/ethical-hacking-dashboard/`. En el repositorio, configura **Settings → Pages → Build and deployment → Source: GitHub Actions**. La acción necesita Pages write y OIDC token write; los permisos están definidos en `.github/workflows/pages.yml`.
