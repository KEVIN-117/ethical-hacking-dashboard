export default function Footer() {
  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-foreground mb-4">HackerHub</h3>
            <p className="text-muted-foreground text-sm">Tu guía completa para dominar el hacking ético.</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Plataformas</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Hack The Box
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  TryHackMe
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  PortSwigger
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Recursos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#skills" className="hover:text-primary transition-colors">
                  Habilidades
                </a>
              </li>
              <li>
                <a href="#roadmap" className="hover:text-primary transition-colors">
                  Ruta de Estudio
                </a>
              </li>
              <li>
                <a href="#community" className="hover:text-primary transition-colors">
                  Comunidad
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Conecta</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Discord
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 HackerHub. Aprende, Practica, Domina.</p>
        </div>
      </div>
    </footer>
  )
}
