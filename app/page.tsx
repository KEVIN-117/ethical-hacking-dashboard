import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import SkillsRadar from "@/components/skills-radar"
import RoadmapSection from "@/components/roadmap-section"
import ResourcesSection from "@/components/resources-section"
import CommunitySection from "@/components/community-section"
import Footer from "@/components/footer"
import GLControls from "@/components/gl-controls"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <a href="#contenido" className="skip-link">Saltar al contenido</a>
      <Header />
      <GLControls />
      <main id="contenido">
        <HeroSection />
        <SkillsRadar />
        <RoadmapSection />
        <ResourcesSection />
        <CommunitySection />
      </main>
      <Footer />
    </div>
  )
}
