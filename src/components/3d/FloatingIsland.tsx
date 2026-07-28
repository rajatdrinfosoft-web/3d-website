import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingIslandProps {
  reducedMotion: boolean;
}

export const FloatingIsland: React.FC<FloatingIslandProps> = ({ reducedMotion }) => {
  const islandGroup = useRef<THREE.Group>(null);
  const treeLeavesRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    if (islandGroup.current) {
      islandGroup.current.rotation.y += delta * 0.15;
    }
    if (treeLeavesRef.current) {
      treeLeavesRef.current.rotation.y -= delta * 0.3;
    }
  });

  return (
    <group position={[0, -2, -35]} ref={islandGroup}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        
        {/* Main Base Island Platform */}
        <mesh position={[0, -0.8, 0]}>
          <cylinderGeometry args={[4, 2.5, 1.2, 8]} />
          <meshStandardMaterial
            color="#111827"
            roughness={0.6}
            metalness={0.3}
            flatShading
          />
        </mesh>

        {/* Platform Glowing Rim */}
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[4.05, 4.05, 0.1, 32]} />
          <meshBasicMaterial color="#38BDF8" transparent opacity={0.6} />
        </mesh>

        {/* Glowing Tree Trunk & Leaves */}
        <group position={[-1.8, 1.2, -1]}>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.2, 0.3, 2, 8]} />
            <meshStandardMaterial color="#475569" />
          </mesh>

          <mesh ref={treeLeavesRef} position={[0, 1.4, 0]}>
            <dodecahedronGeometry args={[1.1, 1]} />
            <meshStandardMaterial
              color="#38BDF8"
              emissive="#0284C7"
              emissiveIntensity={0.6}
              wireframe
            />
          </mesh>
        </group>

        {/* Laptop Setup */}
        <group position={[0.5, 0.1, 0.5]} rotation={[0, -0.4, 0]}>
          {/* Laptop Base */}
          <mesh position={[0, 0.05, 0]}>
            <boxGeometry args={[1.2, 0.08, 0.8]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
          </mesh>

          {/* Laptop Screen */}
          <group position={[0, 0.45, -0.38]} rotation={[-0.2, 0, 0]}>
            <mesh>
              <boxGeometry args={[1.2, 0.8, 0.05]} />
              <meshStandardMaterial color="#0f172a" metalness={0.9} />
            </mesh>
            {/* Screen Glow */}
            <mesh position={[0, 0, 0.03]}>
              <planeGeometry args={[1.1, 0.7]} />
              <meshBasicMaterial color="#38BDF8" transparent opacity={0.8} />
            </mesh>
          </group>
        </group>

        {/* Books Stack */}
        <group position={[1.8, 0.2, -1.2]} rotation={[0, 0.3, 0]}>
          <mesh position={[0, 0.05, 0]}>
            <boxGeometry args={[0.8, 0.1, 0.6]} />
            <meshStandardMaterial color="#818CF8" />
          </mesh>
          <mesh position={[0.05, 0.15, 0.02]} rotation={[0, 0.2, 0]}>
            <boxGeometry args={[0.75, 0.1, 0.55]} />
            <meshStandardMaterial color="#EC4899" />
          </mesh>
        </group>

        {/* Floating Code Snippet Text */}
        <Text
          position={[0, 2.8, 0]}
          fontSize={0.35}
          color="#38BDF8"
          font="https://fonts.gstatic.com/s/jetbrainsmono/v18/t3B22o-YrFL2xO5e33aO4S7yR0s.woff2"
          anchorX="center"
          anchorY="middle"
        >
          {`const curiosity = new Passion();\nsolveProblems(curiosity);`}
        </Text>

      </Float>
    </group>
  );
};
