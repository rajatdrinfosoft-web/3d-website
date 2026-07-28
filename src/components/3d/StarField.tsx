import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface StarFieldProps {
  scrollSpeed: number;
  reducedMotion: boolean;
}

export const StarField: React.FC<StarFieldProps> = ({ scrollSpeed, reducedMotion }) => {
  const starsRef = useRef<THREE.Points>(null);
  const dustRef = useRef<THREE.Points>(null);
  const codeRef = useRef<THREE.Points>(null);
  const cometRef = useRef<THREE.Mesh>(null);

  // Generate 4,000 stars in 3D volume
  const { starPositions, starColors, starSizes } = useMemo(() => {
    const count = 4000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const palette = [
      new THREE.Color('#38BDF8'), // Cyan
      new THREE.Color('#818CF8'), // Indigo
      new THREE.Color('#F5F5F5'), // White
      new THREE.Color('#EC4899'), // Pink
    ];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 350; // Deep Z axis stretch

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      sizes[i] = Math.random() * 2.5 + 0.5;
    }

    return {
      starPositions: positions,
      starColors: colors,
      starSizes: sizes,
    };
  }, []);

  // Generate 1,200 floating dust particles
  const dustPositions = useMemo(() => {
    const count = 1200;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 300;
    }
    return positions;
  }, []);

  // Comet state
  const cometData = useRef({
    x: -40,
    y: 30,
    z: -50,
    speed: 0.8,
    active: true,
  });

  useFrame((state, delta) => {
    if (reducedMotion) return;

    // Slowly rotate star field
    if (starsRef.current) {
      starsRef.current.rotation.z += delta * 0.02;
      starsRef.current.rotation.y += delta * 0.01;
    }

    // Move dust particles with scroll speed dynamic stretching
    if (dustRef.current) {
      dustRef.current.rotation.z -= delta * 0.015;
      const positions = dustRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 2; i < positions.length; i += 3) {
        positions[i] += delta * (2 + scrollSpeed * 15);
        if (positions[i] > 50) {
          positions[i] = -250;
        }
      }
      dustRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Animate Shooting Star / Comet
    if (cometRef.current) {
      const c = cometData.current;
      c.x += delta * 25;
      c.y -= delta * 15;
      cometRef.current.position.set(c.x, c.y, c.z);

      if (c.x > 60 || c.y < -50) {
        c.x = -60 - Math.random() * 20;
        c.y = 20 + Math.random() * 20;
        c.z = -Math.random() * 200;
      }
    }
  });

  return (
    <group>
      {/* Stars Points */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[starColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={1.5}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
        />
      </points>

      {/* Floating Dust Particles */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[dustPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.8}
          color="#38BDF8"
          transparent
          opacity={0.4}
          sizeAttenuation
        />
      </points>

      {/* Comet Mesh */}
      <mesh ref={cometRef} position={[-40, 30, -50]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#7dd3fc" />
      </mesh>
    </group>
  );
};
