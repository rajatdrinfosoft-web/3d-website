import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import { soundFx } from '../../utils/audio';

interface PortalDestinationProps {
  reducedMotion: boolean;
  onOpenContact: () => void;
  scrollProgress: number;
}

export const PortalDestination: React.FC<PortalDestinationProps> = ({
  reducedMotion,
  onOpenContact,
  scrollProgress,
}) => {
  const portalRingRef = useRef<THREE.Mesh>(null);
  const portalInnerRef = useRef<THREE.Mesh>(null);
  const initialsGroupRef = useRef<THREE.Group>(null);

  const isEnding = scrollProgress > 0.92;

  const timeRef = useRef(0);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    timeRef.current += delta;
    if (portalRingRef.current) {
      portalRingRef.current.rotation.z += delta * 0.4;
    }
    if (portalInnerRef.current) {
      portalInnerRef.current.rotation.z -= delta * 0.8;
    }
    if (initialsGroupRef.current && isEnding) {
      initialsGroupRef.current.rotation.y = Math.sin(timeRef.current * 0.5) * 0.2;
    }
  });

  return (
    <group position={[0, 0, -280]}>
      {!isEnding ? (
        /* Portal Ring */
        <group
          onClick={(e) => {
            e.stopPropagation();
            soundFx.playWarpWhoosh();
            onOpenContact();
          }}
        >
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            {/* Outer Glowing Torus */}
            <mesh ref={portalRingRef}>
              <torusGeometry args={[4.5, 0.25, 16, 100]} />
              <meshStandardMaterial
                color="#38BDF8"
                emissive="#0284C7"
                emissiveIntensity={1.5}
                wireframe
              />
            </mesh>

            {/* Inner Swirling Vortex Disc */}
            <mesh ref={portalInnerRef}>
              <circleGeometry args={[4.2, 64]} />
              <meshBasicMaterial
                color="#818CF8"
                transparent
                opacity={0.35}
                wireframe
              />
            </mesh>

            {/* Portal Heading Text */}
            <Text
              position={[0, 5.8, 0]}
              fontSize={0.65}
              color="#38BDF8"
              font="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mDoBhA8g4Px-1kJyN2pX2p7A.woff2"
              anchorX="center"
              anchorY="bottom"
            >
              LET'S BUILD TOGETHER
            </Text>

            <Text
              position={[0, -5.5, 0]}
              fontSize={0.35}
              color="#F5F5F5"
              font="https://fonts.gstatic.com/s/jetbrainsmono/v18/t3B22o-YrFL2xO5e33aO4S7yR0s.woff2"
              anchorX="center"
              anchorY="top"
            >
              [ CLICK PORTAL TO TRANSMIT MESSAGE ]
            </Text>
          </Float>
        </group>
      ) : (
        /* Ending State: Stars Rearrange Into Initials "A S" */
        <group ref={initialsGroupRef} position={[0, 0, 0]}>
          <Text
            position={[0, 0, 0]}
            fontSize={3.5}
            color="#38BDF8"
            font="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mDoBhA8g4Px-1kJyN2pX2p7A.woff2"
            anchorX="center"
            anchorY="middle"
          >
            A S
          </Text>

          <Text
            position={[0, -2.8, 0]}
            fontSize={0.4}
            color="#A1A1AA"
            font="https://fonts.gstatic.com/s/jetbrainsmono/v18/t3B22o-YrFL2xO5e33aO4S7yR0s.woff2"
            anchorX="center"
            anchorY="top"
          >
            Aarav Sharma • 2026 Universe
          </Text>
        </group>
      )}
    </group>
  );
};
