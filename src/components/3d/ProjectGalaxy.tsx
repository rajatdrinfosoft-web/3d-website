import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import { PROJECTS } from '../../data/portfolioData';
import { Project } from '../../types/portfolio';
import { soundFx } from '../../utils/audio';

interface ProjectGalaxyProps {
  reducedMotion: boolean;
  onSelectProject: (project: Project) => void;
}

export const ProjectGalaxy: React.FC<ProjectGalaxyProps> = ({
  reducedMotion,
  onSelectProject,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  // Position planets in an elliptical galaxy orbit arrangement
  const planetPositions: [number, number, number][] = [
    [-6, 2, 0],
    [6, -1.5, 3],
    [-2, -4, -4],
    [5, 4, -2],
    [-7, -3, 2],
    [0, 5, -5],
  ];

  return (
    <group position={[0, 0, -110]} ref={groupRef}>
      {PROJECTS.map((project, idx) => {
        const pos = planetPositions[idx] || [0, 0, 0];
        const isHovered = hoveredId === project.id;

        return (
          <PlanetItem
            key={project.id}
            project={project}
            position={pos}
            isHovered={isHovered}
            reducedMotion={reducedMotion}
            onHover={(hover) => setHoveredId(hover ? project.id : null)}
            onClick={() => {
              soundFx.playWarpWhoosh();
              onSelectProject(project);
            }}
          />
        );
      })}
    </group>
  );
};

interface PlanetItemProps {
  project: Project;
  position: [number, number, number];
  isHovered: boolean;
  reducedMotion: boolean;
  onHover: (hover: boolean) => void;
  onClick: () => void;
}

const PlanetItem: React.FC<PlanetItemProps> = ({
  project,
  position,
  isHovered,
  reducedMotion,
  onHover,
  onClick,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const moonRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.2;
    }
    if (moonRef.current) {
      moonRef.current.rotation.y += delta * 0.8;
    }
  });

  return (
    <group
      position={position}
      data-cursor-type="explore"
      onPointerOver={(e) => {
        e.stopPropagation();
        soundFx.playHover();
        onHover(true);
      }}
      onPointerOut={() => onHover(false)}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
        {/* Planet Sphere */}
        <mesh ref={meshRef} scale={isHovered ? project.size * 1.25 : project.size}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color={project.planetColor}
            roughness={0.4}
            metalness={0.6}
            wireframe={isHovered}
          />
        </mesh>

        {/* Planet Ring */}
        <mesh
          ref={ringRef}
          rotation={[Math.PI / 3, 0, 0]}
          scale={isHovered ? project.size * 1.3 : project.size}
        >
          <ringGeometry args={[1.4, 1.8, 32]} />
          <meshBasicMaterial
            color={project.ringColor}
            side={THREE.DoubleSide}
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Orbiting Moon */}
        <group ref={moonRef}>
          <mesh position={[2.2, 0.2, 0]}>
            <sphereGeometry args={[0.22, 16, 16]} />
            <meshStandardMaterial color="#F5F5F5" />
          </mesh>
        </group>

        {/* Floating Label */}
        <Text
          position={[0, -1.8, 0]}
          fontSize={0.4}
          color={isHovered ? '#38BDF8' : '#F5F5F5'}
          font="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mDoBhA8g4Px-1kJyN2pX2p7A.woff2"
          anchorX="center"
          anchorY="top"
        >
          {project.title}
        </Text>

        <Text
          position={[0, -2.3, 0]}
          fontSize={0.25}
          color="#A1A1AA"
          font="https://fonts.gstatic.com/s/jetbrainsmono/v18/t3B22o-YrFL2xO5e33aO4S7yR0s.woff2"
          anchorX="center"
          anchorY="top"
        >
          {`[ Click to Explore ]`}
        </Text>
      </Float>
    </group>
  );
};
