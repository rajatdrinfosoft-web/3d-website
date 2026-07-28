import React, { useState } from 'react';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useMousePosition } from './hooks/useMousePosition';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { CustomCursor } from './components/ui/CustomCursor';
import { Navigation } from './components/ui/Navigation';
import { UniverseCanvas } from './components/3d/UniverseCanvas';
import { SectionOverlays } from './components/ui/SectionOverlays';
import { ProjectModal } from './components/ui/ProjectModal';
import { CrystalModal } from './components/ui/CrystalModal';
import { ContactFormModal } from './components/ui/ContactFormModal';
import { Project, TimelineMilestone } from './types/portfolio';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Modals state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedMilestone, setSelectedMilestone] = useState<TimelineMilestone | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Scroll & Mouse position tracking
  const { progress, chapterIndex, scrollSpeed, scrollToChapter } = useScrollProgress();
  const { mousePos } = useMousePosition();

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F5F5F5] selection:bg-[#38BDF8] selection:text-[#050505] overflow-x-hidden">
      
      {/* 1. Terminal Boot Loading Screen */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* 2. Custom Magnetic Glowing Cursor */}
      <CustomCursor />

      {/* 3. Header & Navigation HUD */}
      <Navigation
        currentChapter={chapterIndex}
        scrollProgress={progress}
        onNavigate={scrollToChapter}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion((prev) => !prev)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* 4. Background 3D Universe Canvas */}
      <UniverseCanvas
        scrollProgress={progress}
        scrollSpeed={scrollSpeed}
        reducedMotion={reducedMotion}
        mouseNorm={{ x: mousePos.normX, y: mousePos.normY }}
        onSelectProject={(p) => setSelectedProject(p)}
        onSelectMilestone={(m) => setSelectedMilestone(m)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* 5. Content Section Overlays */}
      <SectionOverlays
        currentChapter={chapterIndex}
        onNavigate={scrollToChapter}
        onSelectProject={(p) => setSelectedProject(p)}
        onSelectMilestone={(m) => setSelectedMilestone(m)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* 6. Interactive Detail Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <CrystalModal
        milestone={selectedMilestone}
        onClose={() => setSelectedMilestone(null)}
      />

      <ContactFormModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

    </div>
  );
}
