import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import { TIMELINE } from '../../data/portfolioData';
import { TimelineMilestone } from '../../types/portfolio';
import { soundFx } from '../../utils/audio';

interface TimelineCrystalsProps {
  reducedMotion: boolean;
  onSelectMilestone: (m: TimelineMilestone) => void;
}

export const TimelineCrystals: React.FC<TimelineCrystalsProps> = ({
  reducedMotion,
  onSelectMilestone,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const timeRef = useRef(0);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    timeRef.current += delta;
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(timeRef.current * 0.3) * 0.05;
    }
  });

  return (
    <group position={[0, 0, -150]} ref={groupRef}>
      {TIMELINE.map((m, idx) => {
        const xPos = (idx - 2) * 3.8;
        const yPos = (idx % 2 === 0 ? 1 : -1) * 1.5;
        const isHovered = hoveredId === m.id;

        return (
          <group
            key={m.id}
            position={[xPos, yPos, 0]}
            data-cursor-type="crystal"
            onPointerOver={(e) => {
              e.stopPropagation();
              soundFx.playHover();
              setHoveredId(m.id);
            }}
            onPointerOut={() => setHoveredId(null)}
            onClick={(e) => {
              e.stopPropagation();
              soundFx.playWarpWhoosh();
              onSelectMilestone(m);
            }}
          >
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
              {/* Floating Crystal Geometry */}
              <CrystalMesh
                type={m.crystalType}
                color={m.color}
                isHovered={isHovered}
                reducedMotion={reducedMotion}
              />

              {/* Year Label */}
              <Text
                position={[0, -1.5, 0]}
                fontSize={0.45}
                color={isHovered ? '#38BDF8' : '#F5F5F5'}
                font="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mDoBhA8g4Px-1kJyN2pX2p7A.woff2"
                anchorX="center"
                anchorY="top"
              >
                {m.year}
              </Text>

              {/* Title Summary */}
              <Text
                position={[0, -2.0, 0]}
                fontSize={0.24}
                color="#A1A1AA"
                font="https://fonts.gstatic.com/s/jetbrainsmono/v18/t3B22o-YrFL2xO5e33aO4S7yR0s.woff2"
                anchorX="center"
                anchorY="top"
              >
                {m.title.split('—')[0]}
              </Text>
            </Float>
          </group>
        );
      })}
    </group>
  );
};

const CrystalMesh: React.FC<{
  type: TimelineMilestone['crystalType'];
  color: string;
  isHovered: boolean;
  reducedMotion: boolean;
}> = ({ type, color, isHovered, reducedMotion }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.8;
      meshRef.current.rotation.x += delta * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} scale={isHovered ? 1.35 : 1}>
      {type === 'diamond' ? (
        <octahedronGeometry args={[0.9, 0]} />
      ) : type === 'icosahedron' ? (
        <icosahedronGeometry args={[0.9, 0]} />
      ) : (
        <dodecahedronGeometry args={[0.85, 0]} />
      )}
      <meshStandardMaterial
        color={color}
        metalness={0.8}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={isHovered ? 0.8 : 0.3}
        wireframe={isHovered}
      />
    </mesh>
  );
};
