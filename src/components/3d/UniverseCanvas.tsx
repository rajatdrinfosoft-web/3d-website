import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { Hero3DCore } from './Hero3DCore';
import { StarField } from './StarField';
import { FloatingIsland } from './FloatingIsland';
import { SkillConstellation } from './SkillConstellation';
import { ProjectGalaxy } from './ProjectGalaxy';
import { TimelineCrystals } from './TimelineCrystals';
import { AchievementGems } from './AchievementGems';
import { OpenSourceGalaxy } from './OpenSourceGalaxy';
import { PortalDestination } from './PortalDestination';
import { Project, TimelineMilestone } from '../../types/portfolio';

interface UniverseCanvasProps {
  scrollProgress: number;
  scrollSpeed: number;
  reducedMotion: boolean;
  mouseNorm: { x: number; y: number };
  onSelectProject: (p: Project) => void;
  onSelectMilestone: (m: TimelineMilestone) => void;
  onOpenContact: () => void;
}

// Camera Flight Controller
const CameraFlight: React.FC<{
  scrollProgress: number;
  mouseNorm: { x: number; y: number };
  reducedMotion: boolean;
}> = ({ scrollProgress, mouseNorm, reducedMotion }) => {
  useFrame((state) => {
    // Fly camera along Z from 10 down to -290 based on scroll progress
    const targetZ = 10 - scrollProgress * 300;

    // Mouse parallax camera tilt
    const targetX = reducedMotion ? 0 : mouseNorm.x * 2.5;
    const targetY = reducedMotion ? 0 : mouseNorm.y * 1.8;

    // Smooth lerp camera position
    state.camera.position.x += (targetX - state.camera.position.x) * 0.08;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.08;
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.12;

    state.camera.lookAt(
      state.camera.position.x * 0.2,
      state.camera.position.y * 0.2,
      state.camera.position.z - 10
    );
  });

  return null;
};

export const UniverseCanvas: React.FC<UniverseCanvasProps> = ({
  scrollProgress,
  scrollSpeed,
  reducedMotion,
  mouseNorm,
  onSelectProject,
  onSelectMilestone,
  onOpenContact,
}) => {
  return (
    <div className="fixed inset-0 z-0 bg-[#050505] pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60, near: 0.1, far: 500 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#050505']} />
        
        {/* Ambient & Directional Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 20, 15]} intensity={1.5} color="#38BDF8" />
        <pointLight position={[-10, -10, -50]} intensity={2.0} color="#818CF8" />
        <pointLight position={[10, 10, -150]} intensity={2.2} color="#EC4899" />

        {/* Camera Flight Control */}
        <CameraFlight
          scrollProgress={scrollProgress}
          mouseNorm={mouseNorm}
          reducedMotion={reducedMotion}
        />

        {/* Section 1: Hero Quantum Core */}
        <Hero3DCore reducedMotion={reducedMotion} />

        {/* Global Particle Universe */}
        <StarField scrollSpeed={scrollSpeed} reducedMotion={reducedMotion} />

        {/* Section 2: Floating Island */}
        <FloatingIsland reducedMotion={reducedMotion} />

        {/* Section 3: Skill Constellation */}
        <SkillConstellation reducedMotion={reducedMotion} />

        {/* Section 4: Project Galaxy */}
        <ProjectGalaxy
          reducedMotion={reducedMotion}
          onSelectProject={onSelectProject}
        />

        {/* Section 5: Timeline Crystals */}
        <TimelineCrystals
          reducedMotion={reducedMotion}
          onSelectMilestone={onSelectMilestone}
        />

        {/* Section 6: Achievement Gems */}
        <AchievementGems reducedMotion={reducedMotion} />

        {/* Section 7: Open Source Galaxy */}
        <OpenSourceGalaxy reducedMotion={reducedMotion} />

        {/* Section 8: Portal Destination */}
        <PortalDestination
          reducedMotion={reducedMotion}
          onOpenContact={onOpenContact}
          scrollProgress={scrollProgress}
        />

        {/* Cinematic Post-Processing Effects */}
        <EffectComposer>
          <Bloom
            intensity={1.1}
            luminanceThreshold={0.25}
            luminanceSmoothing={0.8}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.1} darkness={0.8} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

