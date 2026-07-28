import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { SKILL_NODES } from '../../data/portfolioData';
import { SkillNode } from '../../types/portfolio';
import { soundFx } from '../../utils/audio';

interface SkillConstellationProps {
  reducedMotion: boolean;
}

export const SkillConstellation: React.FC<SkillConstellationProps> = ({ reducedMotion }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredSkill, setHoveredSkill] = useState<SkillNode | null>(null);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
    }
  });

  // Build line geometry pairs for connected skills
  const linePositions = React.useMemo(() => {
    const coords: number[] = [];
    const skillMap = new Map(SKILL_NODES.map((s) => [s.id, s.position]));

    SKILL_NODES.forEach((s) => {
      s.connections.forEach((targetId) => {
        const targetPos = skillMap.get(targetId);
        if (targetPos) {
          coords.push(...s.position, ...targetPos);
        }
      });
    });

    return new Float32Array(coords);
  }, []);

  return (
    <group position={[0, 0, -70]} ref={groupRef}>
      {/* Constellation Connecting Lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#38BDF8"
          transparent
          opacity={0.35}
          linewidth={1}
        />
      </lineSegments>

      {/* Skill Nodes (Stars) */}
      {SKILL_NODES.map((skill) => {
        const isSelected = hoveredSkill?.id === skill.id;

        return (
          <group
            key={skill.id}
            position={skill.position}
            onPointerOver={(e) => {
              e.stopPropagation();
              soundFx.playHover();
              setHoveredSkill(skill);
            }}
            onPointerOut={() => setHoveredSkill(null)}
          >
            {/* Glowing Star Sphere */}
            <mesh scale={isSelected ? 1.4 : 1}>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshStandardMaterial
                color={isSelected ? '#38BDF8' : '#818CF8'}
                emissive={isSelected ? '#0284C7' : '#4F46E5'}
                emissiveIntensity={isSelected ? 1.5 : 0.6}
              />
            </mesh>

            {/* Pulsing Outer Halo */}
            <mesh scale={isSelected ? 2.2 : 1.4}>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshBasicMaterial
                color="#38BDF8"
                transparent
                opacity={isSelected ? 0.4 : 0.15}
              />
            </mesh>

            {/* Label */}
            <Text
              position={[0, -0.4, 0]}
              fontSize={0.28}
              color={isSelected ? '#38BDF8' : '#F5F5F5'}
              font="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mDoBhA8g4Px-1kJyN2pX2p7A.woff2"
              anchorX="center"
              anchorY="top"
            >
              {skill.name}
            </Text>

            {/* Hover Html Tooltip */}
            {isSelected && (
              <Html distanceFactor={12} position={[0, 0.6, 0]} center>
                <div className="px-3 py-2 rounded-xl bg-slate-950/90 border border-[#38BDF8] text-left text-xs font-mono shadow-2xl backdrop-blur-md w-48 text-slate-100 pointer-events-none animate-scaleUp">
                  <div className="text-[#38BDF8] font-bold text-xs uppercase mb-1 flex items-center justify-between">
                    <span>{skill.category}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-tight">
                    {skill.description}
                  </p>
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
};
