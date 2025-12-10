"use client"

import { useState } from "react"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import SkillsRadar from "@/components/skills-radar"
import RoadmapSection from "@/components/roadmap-section"
import ResourcesSection from "@/components/resources-section"
import CommunitySection from "@/components/community-section"
import Footer from "@/components/footer"
import { Leva } from "leva"

export default function Home() {
  const [scrolled, setScrolled] = useState(false)

  return (
    <div className="bg-background min-h-screen">
      <Header scrolled={scrolled} />
      <Leva hidden />
      <HeroSection />
      <SkillsRadar />
      <RoadmapSection />
      <ResourcesSection />
      <CommunitySection />
      <Footer />
    </div>
  )
}
