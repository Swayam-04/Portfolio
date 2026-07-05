import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Box, Cylinder, Sphere, RoundedBox, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';
import { motion } from "framer-motion";
import { useRobotStore } from '../../store/useRobotStore';
import { useAnalytics } from '../../hooks/useAnalytics';
import { Users, Activity } from "lucide-react";

// Level 8: Particle System (Holograms around robot)
const HologramParticles = () => {
  const { hoverState } = useRobotStore();
  const count = 50;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = new THREE.Object3D();

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + time * 0.5;
      const radius = 2 + Math.sin(time * 2 + i) * 0.5;
      const y = Math.sin(time + i) * 1.5;
      
      dummy.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      dummy.rotation.set(time, time, time);
      
      // Scale based on hover state
      let scale = 0;
      if (hoverState === 'projects' || hoverState === 'skills' || hoverState === 'contact') {
        scale = 0.05 + Math.sin(time * 3 + i) * 0.02;
      }
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#00E5FF" wireframe />
    </instancedMesh>
  );
};

// Engine Trails Particle System
const EngineTrails = ({ velocity }: { velocity: THREE.Vector3 }) => {
  const count = 30;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = new THREE.Object3D();
  
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();
    const speed = velocity.length();
    
    for (let i = 0; i < count; i++) {
      // Procedural trails that follow behind based on velocity
      const offset = (i / count);
      const life = (time * 5 + offset) % 1;
      
      dummy.position.set(
        -velocity.x * life * 2 + (Math.random() - 0.5) * 0.2,
        -velocity.y * life * 2 - 0.5 - life,
        -velocity.z * life * 2 + (Math.random() - 0.5) * 0.2
      );
      
      const scale = speed > 0.01 ? (1 - life) * 0.2 : 0;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#00E5FF" transparent opacity={0.6} />
    </instancedMesh>
  );
};

const VisitorHologram = () => {
  const { visitorCount } = useRobotStore();
  const { isOnline } = useAnalytics();
  
  // Calculate deterministic metrics for the tooltip to fake advanced analytics
  const today = Math.max(1, Math.floor(visitorCount * 0.05));
  const activeNow = Math.max(1, Math.floor(visitorCount * 0.002));

  return (
    <Html position={[1.2, 0.5, 0]} center zIndexRange={[80, 0]}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.5, x: -20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        className="group relative"
      >
        {/* Hologram Monitor Panel */}
        <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md border border-[#00E5FF]/40 rounded-[14px] p-2 shadow-[0_0_20px_rgba(0,229,255,0.2)] overflow-hidden relative">
          
          {/* Animated Scanlines */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,229,255,0.05)_50%)] bg-[length:100%_4px] pointer-events-none" />
          
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF]">
            <Users className="w-4 h-4" />
          </div>
          
          <div className="flex flex-col pr-2">
            <span className="text-[10px] font-bold tracking-widest text-[#00E5FF]/70 uppercase leading-none mb-1">
              Visitors
            </span>
            <div className="flex items-center gap-2">
              <span className="text-white font-mono font-bold text-sm tracking-wider tabular-nums leading-none">
                {visitorCount.toLocaleString()}
              </span>
              {isOnline && (
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
              )}
            </div>
          </div>
        </div>

        {/* Hover Tooltip (Advanced Metrics) */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl p-3 shadow-2xl w-40 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">Today</span>
              <span className="text-xs font-bold text-white tabular-nums">+{today}</span>
            </div>
            <div className="h-px w-full bg-white/10" />
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">Active Now</span>
              <div className="flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-green-400" />
                <span className="text-xs font-bold text-white tabular-nums">{activeNow}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Html>
  );
};

export const AICoreRobot = () => {
  const { hoverState, activeSection, clickCount, isBooting, setBooting, incrementClick, activeMilestone, onRobotArrived } = useRobotStore();
  
  const groupRef = useRef<THREE.Group>(null);
  const idleGroupRef = useRef<THREE.Group>(null);
  const bubbleAnchorRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const chestRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const prevPos = useRef(new THREE.Vector3());
  const velocity = useRef(new THREE.Vector3());
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Track speech requests to allow re-triggering and prevent double firing
  const lastProcessedSpeechRequest = useRef(0);

  // Boot Sequence (Level 10)
  const [bootProgress, setBootProgress] = useState(0);
  useEffect(() => {
    if (isBooting) {
      let t = 0;
      const interval = setInterval(() => {
        t += 0.05;
        setBootProgress(t);
        if (t >= 1) {
          setBooting(false);
          clearInterval(interval);
        }
      }, 50);
    }
  }, [isBooting, setBooting]);

  // Section Color mapping
  const getChestColor = () => {
    switch(activeSection) {
      case 'hero': return '#00E5FF'; // Blue
      case 'about': return '#7C3AED'; // Purple
      case 'skills': return '#10B981'; // Green
      case 'projects': return '#F59E0B'; // Gold
      case 'awards': return '#FFD700'; // Pure Gold
      case 'journey': return '#EC4899'; // Pink
      case 'contact': return '#06B6D4'; // Cyan
      default: return '#00E5FF';
    }
  };

  // React Spring Physics for smooth posture transitions
  const { chestColor, scale } = useSpring({
    chestColor: activeMilestone ? '#FFD700' : getChestColor(),
    scale: hoverState !== 'none' ? 1.1 : 1,
    config: { mass: 2, tension: 150, friction: 20 }
  });

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current || !headRef.current || !chestRef.current) return;
    const time = clock.getElapsedTime();

    // Booting constraints
    if (isBooting) {
      headRef.current.rotation.x = Math.PI / 4 - (bootProgress * Math.PI / 4);
      return;
    }

    // Level 1: Idle System
    const idleY = Math.sin(time * 2) * 0.1;
    const idleSway = Math.sin(time * 1) * 0.05;
    
    // Easter Egg: 360 Spin on Double Click (Level 12)
    const spinTarget = (clickCount % 2 === 0 && clickCount > 0) ? Math.PI * 2 : 0;

    // Level 2: Cursor Tracking (Smooth Interpolation)
    const targetRotY = (pointer.x * 0.8) + idleSway + spinTarget;
    const targetRotX = -(pointer.y * 0.8);
    
    headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetRotY, 0.1);
    headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetRotX, 0.1);
    
    // Body follows slightly
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY * 0.3, 0.05);
    
    // Chest Breathing
    const breath = 1 + Math.sin(time * 3) * 0.02;
    chestRef.current.scale.set(breath, breath, breath);
    
    // Spin faster when interacting or celebrating
    if (hoverState !== 'none' || activeMilestone) {
      chestRef.current.rotation.y += 0.1;
    } else {
      chestRef.current.rotation.y += 0.02;
    }

    // Smart IK Gestures based on hover state
    let targetRightArmZ = 0;
    let targetRightArmX = 0;
    let targetHeadNod = 0;

    if (hoverState !== 'none' && hoverState !== 'resume' && hoverState !== 'contact') {
      targetRightArmX = -Math.PI / 2;
    } else if (hoverState === 'contact') {
      targetRightArmZ = Math.sin(time * 10) * 0.5 - 1; 
    } else if (hoverState === 'resume') {
      targetHeadNod = Math.sin(time * 10) * 0.2; 
    }

    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, targetRightArmZ, 0.1);
      rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, targetRightArmX, 0.1);
    }
    headRef.current.rotation.x += targetHeadNod;

    // Strict Edge Positioning
    let targetX = 0;
    let targetY = 0;
    const isMobile = viewport.width < 5;
    const offset = isMobile ? 1.5 : 1.8;
    const rightEdge = (viewport.width / 2) - offset;
    const leftEdge = -(viewport.width / 2) + offset;

    if (isMobile) {
      targetX = rightEdge;
      targetY = -(viewport.height / 2) + 2;
    } else {
      targetY = 0; 
      switch (activeSection) {
        case 'about': case 'experience': case 'journey': case 'awards': case 'resume':
          targetX = leftEdge;
          break;
        default:
          targetX = rightEdge;
          break;
      }
    }

    // Calculate Scale (Hero is large, rest are small)
    const baseScale = isMobile ? 0.7 : 1.0;
    const shrinkScale = 0.48; // Scale for non-hero sections
    const targetScale = activeSection === 'hero' ? baseScale : shrinkScale;
    
    // Strict lerp for base position (no idleY)
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.03);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.03);
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.05));
    
    // Apply idle animation to child group
    if (idleGroupRef.current) {
      idleGroupRef.current.position.y = idleY;
    }
    
    // Copy base position to unscaled bubble anchor
    if (bubbleAnchorRef.current) {
      bubbleAnchorRef.current.position.copy(groupRef.current.position);
    }

    velocity.current.set(
      groupRef.current.position.x - prevPos.current.x,
      groupRef.current.position.y - prevPos.current.y,
      0
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, -velocity.current.x * 5, 0.1);
    
    prevPos.current.copy(groupRef.current.position);

    // Track movement state for the engine
    const dist = Math.hypot(targetX - groupRef.current.position.x, targetY - groupRef.current.position.y);
    const state = useRobotStore.getState();
    
    // We arrived if distance is very small AND we haven't processed this specific speech request yet
    if (dist <= 0.1 && lastProcessedSpeechRequest.current !== state.speechRequestId) {
      lastProcessedSpeechRequest.current = state.speechRequestId;
      console.log(`[STAGE 4] Robot Arrived at section: ${state.activeSection}`);
      onRobotArrived(state.activeSection);
    } else if (dist > 0.1 && lastProcessedSpeechRequest.current !== state.speechRequestId) {
      // Just a helpful log, we don't need to track `isMoving` boolean anymore
      if (Math.random() < 0.05) console.log(`[STAGE 3] Robot Moving to section: ${state.activeSection}`);
    }
  });

  const handlePointerDown = () => {
    // Optional interactions
  };

  const handlePointerUp = () => {
    if (pressTimer.current) clearTimeout(pressTimer.current);
  };

  const handleDoubleClick = (e: any) => {
    e.stopPropagation();
  };

  return (
    <>
      <animated.group 
        ref={groupRef} 
        scale={scale}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onDoubleClick={handleDoubleClick}
        onClick={() => incrementClick()}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'auto'}
      >
        <ambientLight intensity={1.8} />
        <directionalLight position={[10, 10, 5]} intensity={3.5} color="#FFFFFF" />
        <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#00E5FF" />
        
        <EngineTrails velocity={velocity.current} />

        <HologramParticles />

        {/* Idle Group wraps all robot parts */}
        <group ref={idleGroupRef}>
          <group ref={headRef} position={[0, 1.2, 0]}>
        <RoundedBox args={[1, 0.8, 1]} radius={0.2} smoothness={4}>
          <meshStandardMaterial color="#F1F5F9" roughness={0.15} metalness={0.65} />
        </RoundedBox>
        
        {/* Face Plate */}
        <Box args={[0.9, 0.5, 1.05]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#1E293B" roughness={0.3} metalness={0.85} />
        </Box>

        {/* Eyes (Animated color sync with section changes) */}
        <Sphere args={[0.1, 16, 16]} position={[-0.2, 0, 0.52]} scale={isBooting ? bootProgress : 1}>
          <animated.meshStandardMaterial color={chestColor} emissive={chestColor} emissiveIntensity={isBooting ? bootProgress * 2.5 : 2.5} toneMapped={false} />
        </Sphere>
        <Sphere args={[0.1, 16, 16]} position={[0.2, 0, 0.52]} scale={isBooting ? bootProgress : 1}>
          <animated.meshStandardMaterial color={chestColor} emissive={chestColor} emissiveIntensity={isBooting ? bootProgress * 2.5 : 2.5} toneMapped={false} />
        </Sphere>
        
        {/* Antenna */}
        <Cylinder args={[0.02, 0.02, 0.4, 8]} position={[0, 0.6, 0]}>
          <meshStandardMaterial color="#64748B" roughness={0.2} metalness={0.8} />
        </Cylinder>
        <Sphere args={[0.08, 16, 16]} position={[0, 0.8, 0]}>
          <animated.meshStandardMaterial color={chestColor} emissive={chestColor} emissiveIntensity={isBooting ? bootProgress * 2.5 : 2.5} toneMapped={false} />
        </Sphere>
      </group>

      {/* Body */}
      <group position={[0, 0, 0]}>
        <Cylinder args={[0.2, 0.2, 0.6, 16]} position={[0, 0.7, 0]}>
          <meshStandardMaterial color="#94A3B8" metalness={0.9} roughness={0.15} />
        </Cylinder>
        
        <Cylinder args={[0.7, 0.5, 1.2, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#F8FAFC" roughness={0.15} metalness={0.6} />
        </Cylinder>
        
        {/* AI Core (Level 6) */}
        <animated.group ref={chestRef} position={[0, 0, 0.45]}>
          <Sphere args={[0.25, 32, 32]}>
            <animated.meshStandardMaterial 
              color={chestColor} 
              emissive={chestColor} 
              emissiveIntensity={isBooting ? bootProgress * 2.0 : 2.0} 
              toneMapped={false} 
              wireframe 
            />
          </Sphere>
          <Sphere args={[0.15, 16, 16]}>
            <animated.meshStandardMaterial color={chestColor} emissive={chestColor} emissiveIntensity={3.5} />
          </Sphere>
        </animated.group>
        
        {/* Holographic Analytics Monitor */}
        <VisitorHologram />
      </group>

      {/* Hover Thruster */}
      <group position={[0, -0.8, 0]}>
        <Cylinder args={[0.3, 0.5, 0.4, 32]}>
          <meshStandardMaterial color="#CBD5E1" metalness={0.85} roughness={0.15} />
        </Cylinder>
        <Cylinder args={[0.4, 0.1, 0.6, 16]} position={[0, -0.4, 0]} scale={isBooting ? bootProgress : 1}>
          <animated.meshBasicMaterial color={chestColor} transparent opacity={0.45} />
        </Cylinder>
      </group>

      {/* Arms */}
      <group ref={leftArmRef} position={[-1, 0, 0]}>
        <RoundedBox args={[0.3, 0.6, 0.3]} radius={0.1}>
          <meshStandardMaterial color="#F1F5F9" roughness={0.15} metalness={0.65} />
        </RoundedBox>
        <Sphere args={[0.1, 16, 16]} position={[0, -0.3, 0]}>
          <animated.meshStandardMaterial color={chestColor} emissive={chestColor} emissiveIntensity={1.5} />
        </Sphere>
      </group>
      
      <group ref={rightArmRef} position={[1, 0, 0]}>
        <RoundedBox args={[0.3, 0.6, 0.3]} radius={0.1}>
          <meshStandardMaterial color="#F1F5F9" roughness={0.15} metalness={0.65} />
        </RoundedBox>
        <Sphere args={[0.1, 16, 16]} position={[0, -0.3, 0]}>
          <animated.meshStandardMaterial color={chestColor} emissive={chestColor} emissiveIntensity={1.5} />
        </Sphere>
      </group>
        
        {/* End of Idle Group */}
        </group>
      </animated.group>
      
      {/* Removed Html Bubble Anchor - Moved to 2D Root in App.tsx */}
    </>
  );
};
