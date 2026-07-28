import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { soundFx } from '../../utils/audio';

interface Hero3DCoreProps {
  reducedMotion: boolean;
}

export const Hero3DCore: React.FC<Hero3DCoreProps> = ({ reducedMotion }) => {
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const [hovered, setHovered] = useState(false);

  // Particle positions around core
  const particlePositions = React.useMemo(() => {
    const count = 120;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 3.5 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  const timeRef = useRef(0);

  useFrame((state, delta) => {
    if (reducedMotion) return;

    timeRef.current += delta;
    const t = timeRef.current;

    // Rotate core
    if (coreRef.current) {
      coreRef.current.rotation.x = t * 0.3;
      coreRef.current.rotation.y = t * 0.5;
      const targetScale = hovered ? 1.3 : 1.0;
      coreRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5);
    }

    // Rotate outer energy rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.4;
      ring1Ref.current.rotation.x = Math.sin(t * 0.5) * 0.5;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.6;
      ring2Ref.current.rotation.y = Math.cos(t * 0.5) * 0.5;
    }

    // Swirl particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.2;
      particlesRef.current.rotation.x = t * 0.1;
    }
  });

  return (
    <group position={[0, 0, -2]}>
      <Float speed={reducedMotion ? 0 : 2} rotationIntensity={0.4} floatIntensity={0.6}>
        {/* Central Quantum Core Mesh */}
        <mesh
          ref={coreRef}
          onPointerOver={() => {
            setHovered(true);
            soundFx.playHover();
          }}
          onPointerOut={() => setHovered(false)}
          onClick={() => soundFx.playClick()}
        >
          <icosahedronGeometry args={[1.6, 2]} />
          <MeshDistortMaterial
            color={hovered ? '#38BDF8' : '#818CF8'}
            emissive={hovered ? '#0284C7' : '#4F46E5'}
            emissiveIntensity={hovered ? 0.8 : 0.4}
            roughness={0.2}
            metalness={0.8}
            distort={hovered ? 0.4 : 0.25}
            speed={2}
            wireframe={false}
          />
        </mesh>

        {/* Inner Glowing Wireframe Frame */}
        <mesh scale={[1.85, 1.85, 1.85]}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshBasicMaterial
            color="#38BDF8"
            wireframe
            transparent
            opacity={hovered ? 0.6 : 0.3}
          />
        </mesh>

        {/* Ring 1 - Cyan Cyber Ring */}
        <group ref={ring1Ref}>
          <mesh rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[2.8, 0.03, 16, 64]} />
            <meshStandardMaterial
              color="#38BDF8"
              emissive="#38BDF8"
              emissiveIntensity={0.8}
              roughness={0.1}
            />
          </mesh>
        </group>

        {/* Ring 2 - Pink Energy Ring */}
        <group ref={ring2Ref}>
          <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
            <torusGeometry args={[3.3, 0.02, 16, 64]} />
            <meshStandardMaterial
              color="#EC4899"
              emissive="#EC4899"
              emissiveIntensity={0.9}
              roughness={0.1}
            />
          </mesh>
        </group>

        {/* Orbiting Quantum Particles */}
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[particlePositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.12}
            color="#38BDF8"
            transparent
            opacity={0.8}
            sizeAttenuation
          />
        </points>

        {/* Dynamic Light source */}
        <pointLight
          color={hovered ? '#38BDF8' : '#818CF8'}
          intensity={hovered ? 5 : 2.5}
          distance={10}
        />
      </Float>
    </group>
  );
};
