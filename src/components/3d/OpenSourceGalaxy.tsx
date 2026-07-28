import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import { REPOSITORIES } from '../../data/portfolioData';

interface OpenSourceGalaxyProps {
  reducedMotion: boolean;
}

export const OpenSourceGalaxy: React.FC<OpenSourceGalaxyProps> = ({ reducedMotion }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    if (groupRef.current) {
      groupRef.current.rotation.y -= delta * 0.08;
    }
  });

  return (
    <group position={[0, 0, -230]} ref={groupRef}>
      {REPOSITORIES.map((repo, idx) => {
        const angle = (idx / REPOSITORIES.length) * Math.PI * 2;
        const radius = 5.5;
        const xPos = Math.cos(angle) * radius;
        const zPos = Math.sin(angle) * radius;

        return (
          <RepoStarSystem
            key={repo.id}
            repo={repo}
            position={[xPos, (idx % 2 === 0 ? 1 : -1) * 1.2, zPos]}
            reducedMotion={reducedMotion}
          />
        );
      })}
    </group>
  );
};

const RepoStarSystem: React.FC<{
  repo: typeof REPOSITORIES[0];
  position: [number, number, number];
  reducedMotion: boolean;
}> = ({ repo, position, reducedMotion }) => {
  const starRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    if (starRef.current) {
      starRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.5}>
        {/* Glowing Central Star */}
        <mesh ref={starRef}>
          <icosahedronGeometry args={[0.8, 1]} />
          <meshStandardMaterial
            color={repo.color}
            emissive={repo.color}
            emissiveIntensity={0.8}
            wireframe
          />
        </mesh>

        <Text
          position={[0, -1.3, 0]}
          fontSize={0.32}
          color="#38BDF8"
          font="https://fonts.gstatic.com/s/jetbrainsmono/v18/t3B22o-YrFL2xO5e33aO4S7yR0s.woff2"
          anchorX="center"
          anchorY="top"
        >
          {repo.name}
        </Text>

        <Text
          position={[0, -1.8, 0]}
          fontSize={0.22}
          color="#A1A1AA"
          font="https://fonts.gstatic.com/s/jetbrainsmono/v18/t3B22o-YrFL2xO5e33aO4S7yR0s.woff2"
          anchorX="center"
          anchorY="top"
        >
          {`★ ${repo.stars} Stars • ⑂ ${repo.forks} Forks`}
        </Text>
      </Float>
    </group>
  );
};
