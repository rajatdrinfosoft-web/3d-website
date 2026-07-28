import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import { ACHIEVEMENTS } from '../../data/portfolioData';

interface AchievementGemsProps {
  reducedMotion: boolean;
}

export const AchievementGems: React.FC<AchievementGemsProps> = ({ reducedMotion }) => {
  return (
    <group position={[0, 0, -190]}>
      {ACHIEVEMENTS.map((item, idx) => {
        const xPos = (idx - 1.5) * 4.2;
        const yPos = Math.sin(idx * 1.5) * 1.2;

        return (
          <GemItem
            key={item.id}
            item={item}
            position={[xPos, yPos, 0]}
            reducedMotion={reducedMotion}
          />
        );
      })}
    </group>
  );
};

const GemItem: React.FC<{
  item: typeof ACHIEVEMENTS[0];
  position: [number, number, number];
  reducedMotion: boolean;
}> = ({ item, position, reducedMotion }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.6;
      meshRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <group position={position}>
      <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.8}>
        {/* Glowing Octahedron Gem */}
        <mesh ref={meshRef}>
          <octahedronGeometry args={[1.1, 0]} />
          <meshStandardMaterial
            color={item.color}
            metalness={0.9}
            roughness={0.1}
            emissive={item.color}
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Big Value Number */}
        <Text
          position={[0, 1.8, 0]}
          fontSize={0.65}
          color="#38BDF8"
          font="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mDoBhA8g4Px-1kJyN2pX2p7A.woff2"
          anchorX="center"
          anchorY="bottom"
        >
          {item.value}
        </Text>

        {/* Title */}
        <Text
          position={[0, -1.6, 0]}
          fontSize={0.32}
          color="#F5F5F5"
          font="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mDoBhA8g4Px-1kJyN2pX2p7A.woff2"
          anchorX="center"
          anchorY="top"
        >
          {item.title}
        </Text>

        {/* Subtitle */}
        <Text
          position={[0, -2.1, 0]}
          fontSize={0.22}
          color="#A1A1AA"
          font="https://fonts.gstatic.com/s/jetbrainsmono/v18/t3B22o-YrFL2xO5e33aO4S7yR0s.woff2"
          anchorX="center"
          anchorY="top"
        >
          {item.subtitle}
        </Text>
      </Float>
    </group>
  );
};
