import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const HeroSphere = () => {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock, pointer }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = clock.getElapsedTime() * 0.2;
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.3;
      
      // Slight mouse interaction
      sphereRef.current.position.x = THREE.MathUtils.lerp(sphereRef.current.position.x, (pointer.x * 0.5), 0.1);
      sphereRef.current.position.y = THREE.MathUtils.lerp(sphereRef.current.position.y, (pointer.y * 0.5), 0.1);
    }
  });

  return (
    <group>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#00E5FF" />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#7C3AED" />
      
      <Sphere ref={sphereRef} args={[1.5, 64, 64]}>
        <MeshDistortMaterial
          color="#00E5FF"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          wireframe={true}
        />
      </Sphere>
    </group>
  );
};
