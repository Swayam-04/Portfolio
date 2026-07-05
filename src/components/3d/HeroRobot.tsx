import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder, Sphere, Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

export const HeroRobot = () => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);

  useFrame(({ clock, pointer }) => {
    if (groupRef.current) {
      // Gentle floating and rotation
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 2) * 0.1;
      
      // Look at mouse
      if (headRef.current) {
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, (pointer.x * 0.8), 0.1);
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -(pointer.y * 0.8), 0.1);
      }
      
      // Slight body rotation based on mouse
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, (pointer.x * 0.3), 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -(pointer.y * 0.1), 0.05);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={1.2}>
      <ambientLight intensity={2} />
      <directionalLight position={[10, 10, 5]} intensity={3} color="#00E5FF" />
      <directionalLight position={[-10, -10, -5]} intensity={2} color="#7C3AED" />
      <directionalLight position={[0, 0, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[0, 0, 2]} intensity={2} color="#00E5FF" distance={5} />

      {/* Head Group */}
      <group ref={headRef} position={[0, 1.2, 0]}>
        {/* Main Head */}
        <RoundedBox args={[1, 0.8, 1]} radius={0.2} smoothness={4}>
          <meshStandardMaterial color="#1E293B" roughness={0.2} metalness={0.8} />
        </RoundedBox>
        
        {/* Face Plate */}
        <Box args={[0.9, 0.5, 1.05]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#0F172A" roughness={0.4} metalness={0.9} />
        </Box>

        {/* Glowing Eyes */}
        <Sphere args={[0.1, 16, 16]} position={[-0.2, 0, 0.52]}>
          <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={2} toneMapped={false} />
        </Sphere>
        <Sphere args={[0.1, 16, 16]} position={[0.2, 0, 0.52]}>
          <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={2} toneMapped={false} />
        </Sphere>
        
        {/* Antenna */}
        <Cylinder args={[0.02, 0.02, 0.4, 8]} position={[0, 0.6, 0]}>
          <meshStandardMaterial color="#7C3AED" />
        </Cylinder>
        <Sphere args={[0.08, 16, 16]} position={[0, 0.8, 0]}>
          <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={2} toneMapped={false} />
        </Sphere>
      </group>

      {/* Body */}
      <group position={[0, 0, 0]}>
        {/* Neck */}
        <Cylinder args={[0.2, 0.2, 0.6, 16]} position={[0, 0.7, 0]}>
          <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.5} />
        </Cylinder>
        
        {/* Torso */}
        <Cylinder args={[0.7, 0.5, 1.2, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#1E293B" roughness={0.3} metalness={0.7} />
        </Cylinder>
        
        {/* Core Glow */}
        <Sphere args={[0.25, 32, 32]} position={[0, 0, 0.45]}>
          <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={1.5} toneMapped={false} wireframe />
        </Sphere>
      </group>

      {/* Hover Base / Thruster */}
      <group position={[0, -0.8, 0]}>
        <Cylinder args={[0.3, 0.5, 0.4, 32]}>
          <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
        </Cylinder>
        {/* Thruster flame/glow */}
        <Cylinder args={[0.4, 0.1, 0.6, 16]} position={[0, -0.4, 0]}>
          <meshBasicMaterial color="#00E5FF" transparent opacity={0.4} />
        </Cylinder>
      </group>

      {/* Floating Hands */}
      <Float speed={4} rotationIntensity={0.5} floatIntensity={1}>
        <group position={[-1, 0, 0]}>
          <RoundedBox args={[0.3, 0.6, 0.3]} radius={0.1}>
            <meshStandardMaterial color="#1E293B" roughness={0.2} metalness={0.8} />
          </RoundedBox>
          <Sphere args={[0.1, 16, 16]} position={[0, -0.3, 0]}>
            <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={1} />
          </Sphere>
        </group>
      </Float>
      
      <Float speed={4} rotationIntensity={0.5} floatIntensity={1} >
        <group position={[1, 0, 0]}>
          <RoundedBox args={[0.3, 0.6, 0.3]} radius={0.1}>
            <meshStandardMaterial color="#1E293B" roughness={0.2} metalness={0.8} />
          </RoundedBox>
          <Sphere args={[0.1, 16, 16]} position={[0, -0.3, 0]}>
            <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={1} />
          </Sphere>
        </group>
      </Float>

    </group>
  );
};
