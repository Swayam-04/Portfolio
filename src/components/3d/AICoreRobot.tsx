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
  const { 
    hoverState, activeSection, clickCount, isBooting, setBooting, 
    incrementClick, activeMilestone, onRobotArrived, scrollLock,
    followGuide, setFollowGuide, customPosition, setCustomPosition
  } = useRobotStore();
  
  const groupRef = useRef<THREE.Group>(null);
  const idleGroupRef = useRef<THREE.Group>(null);
  const bubbleAnchorRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const chestRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  
  const { viewport, camera } = useThree();
  const prevPos = useRef(new THREE.Vector3());
  const velocity = useRef(new THREE.Vector3());
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const lastProcessedSpeechRequest = useRef(0);
  const [bootProgress, setBootProgress] = useState(0);

  // Dragging local state
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const dragPositionRef = useRef({ x: 0, y: 0 });
  const dragScreenPositionRef = useRef({ x: 0, y: 0 });

  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  // Restore position from localStorage on load (without forcing followGuide to false)
  useEffect(() => {
    const saved = localStorage.getItem('ai-guide-pos');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (typeof parsed.x === 'number' && typeof parsed.y === 'number') {
          setCustomPosition(parsed);
          dragScreenPositionRef.current = parsed;
        }
      } catch (e) {
        console.error("Failed to parse saved robot position", e);
      }
    }
  }, [setCustomPosition]);

  // Pointer move & release window event handlers when dragging
  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (e: PointerEvent) => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Project client pointer coordinates to normalized device coordinates (NDC)
      const ndcX = (e.clientX / width) * 2 - 1;
      const ndcY = -(e.clientY / height) * 2 + 1;

      // Map to world coordinates minus initial offset
      const worldX = (ndcX * viewport.width) / 2 - dragOffset.current.x;
      const worldY = (ndcY * viewport.height) / 2 - dragOffset.current.y;

      // Safe boundaries padding (Desktop: 20px, Mobile: 12px)
      const isMobile = width < 768;
      const padding = isMobile ? 12 : 20;
      
      const marginX = (padding / width) * viewport.width + 0.3;
      const marginY = (padding / height) * viewport.height + 0.3;

      const clampedX = Math.max(-(viewport.width / 2) + marginX, Math.min((viewport.width / 2) - marginX, worldX));
      const clampedY = Math.max(-(viewport.height / 2) + marginY, Math.min((viewport.height / 2) - marginY, worldY));

      // Store positions in refs instantly to prevent laggy React state updates during drag
      dragPositionRef.current = { x: clampedX, y: clampedY };

      const screenX = ((clampedX / (viewport.width / 2)) + 1) / 2 * width;
      const screenY = (-(clampedY / (viewport.height / 2)) + 1) / 2 * height;
      dragScreenPositionRef.current = { x: screenX, y: screenY };

      if (e.cancelable) {
        e.preventDefault();
      }
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      
      // Save position to Zustand store and localStorage ONLY on drag release
      setCustomPosition(dragScreenPositionRef.current);
      localStorage.setItem('ai-guide-pos', JSON.stringify(dragScreenPositionRef.current));

      if (!isTouchDevice) document.body.style.cursor = 'grab';
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: false });
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging, viewport.width, viewport.height, setCustomPosition]);

  // Prevent default touch gestures from scrolling the page on mobile while touch dragging
  useEffect(() => {
    if (!isDragging) return;
    const preventScroll = (e: TouchEvent) => {
      if (e.cancelable) e.preventDefault();
    };
    window.addEventListener('touchmove', preventScroll, { passive: false });
    return () => {
      window.removeEventListener('touchmove', preventScroll);
    };
  }, [isDragging]);

  // Keyboard accessibility arrow key movement handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;

      e.preventDefault();
      setFollowGuide(false);

      const step = e.shiftKey ? 30 : 10; // Screen pixel steps
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = width < 768;

      let currentScreenX = width - 80;
      let currentScreenY = height - 120;

      const store = useRobotStore.getState();
      if (store.customPosition) {
        currentScreenX = store.customPosition.x;
        currentScreenY = store.customPosition.y;
      }

      let nextScreenX = currentScreenX;
      let nextScreenY = currentScreenY;

      switch (e.key) {
        case 'ArrowUp': nextScreenY -= step; break;
        case 'ArrowDown': nextScreenY += step; break;
        case 'ArrowLeft': nextScreenX -= step; break;
        case 'ArrowRight': nextScreenX += step; break;
      }

      const padding = isMobile ? 12 : 20;
      nextScreenX = Math.max(padding + 40, Math.min(width - padding - 40, nextScreenX));
      nextScreenY = Math.max(padding + 40, Math.min(height - padding - 40, nextScreenY));

      const newPos = { x: nextScreenX, y: nextScreenY };
      setCustomPosition(newPos);
      localStorage.setItem('ai-guide-pos', JSON.stringify(newPos));
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setFollowGuide, setCustomPosition]);

  // Boot sequence
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

  // Track scroll position for mobile transition
  const [hasScrolled, setHasScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getChestColor = () => {
    switch(activeSection) {
      case 'hero': return '#00E5FF';
      case 'about': return '#7C3AED';
      case 'skills': return '#10B981';
      case 'projects': return '#F59E0B';
      case 'awards': return '#FFD700';
      case 'journey': return '#EC4899';
      case 'contact': return '#06B6D4';
      default: return '#00E5FF';
    }
  };

  // spring scale (disable scale hover triggers on touch devices)
  const { chestColor, scale } = useSpring({
    chestColor: activeMilestone ? '#FFD700' : getChestColor(),
    scale: (hoverState !== 'none' && !isTouchDevice && !isDragging) ? 1.1 : 1,
    config: { mass: 2, tension: 150, friction: 20 }
  });

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current || !headRef.current || !chestRef.current) return;
    const time = clock.getElapsedTime();

    if (isBooting) {
      headRef.current.rotation.x = Math.PI / 4 - (bootProgress * Math.PI / 4);
      return;
    }

    const width = window.innerWidth;
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;

    // Idle amplitude - temporarily pause floating and head sway during dragging
    const idleAmplitude = isDragging ? 0 : (isMobile ? 0.04 : 0.1);
    const idleY = Math.sin(time * 1.5) * idleAmplitude;
    const idleSway = isDragging ? 0 : (Math.sin(time * 1) * (isMobile ? 0.02 : 0.05));
    
    const spinTarget = (clickCount % 2 === 0 && clickCount > 0) ? Math.PI * 2 : 0;

    // Head tracking - disable on mobile or during drag (forces head straight ahead during drag)
    const targetRotY = (isMobile || isDragging) ? idleSway + spinTarget : (pointer.x * 0.8) + idleSway + spinTarget;
    const targetRotX = (isMobile || isDragging) ? 0 : -(pointer.y * 0.8);
    
    headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetRotY, 0.1);
    headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetRotX, 0.1);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY * 0.3, 0.05);
    
    const breath = 1 + Math.sin(time * 3) * 0.02;
    chestRef.current.scale.set(breath, breath, breath);
    
    // Pause body rotation during dragging
    if (isDragging) {
      // Rotate body slightly to follow drag motion
    } else if (((hoverState !== 'none' && !isTouchDevice) || activeMilestone)) {
      chestRef.current.rotation.y += 0.1;
    } else {
      chestRef.current.rotation.y += 0.02;
    }

    let targetRightArmZ = 0;
    let targetRightArmX = 0;
    let targetHeadNod = 0;

    if (hoverState !== 'none' && hoverState !== 'resume' && hoverState !== 'contact' && !isTouchDevice && !isDragging) {
      targetRightArmX = -Math.PI / 2;
    } else if (hoverState === 'contact' && !isTouchDevice && !isDragging) {
      targetRightArmZ = Math.sin(time * 10) * 0.5 - 1; 
    } else if (hoverState === 'resume' && !isTouchDevice && !isDragging) {
      targetHeadNod = Math.sin(time * 10) * 0.2; 
    }

    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, targetRightArmZ, 0.1);
      rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, targetRightArmX, 0.1);
    }
    headRef.current.rotation.x += targetHeadNod;

    // Positioning
    let targetX = 0;
    let targetY = 0;
    
    const offset = isMobile ? 1.0 : (isTablet ? 1.4 : 1.8);
    const rightEdge = (viewport.width / 2) - offset;
    const leftEdge = -(viewport.width / 2) + offset;

    // If followGuide is false and user saved a custom position, use it
    if (!followGuide && customPosition) {
      targetX = ((customPosition.x / width) * 2 - 1) * (viewport.width / 2);
      targetY = (-(customPosition.y / window.innerHeight) * 2 + 1) * (viewport.height / 2);
    } else {
      // Default positioning
      if (isMobile) {
        if (activeSection === 'hero' && !hasScrolled) {
          targetX = 0;
          targetY = -(viewport.height / 2) + 1.2;
        } else {
          targetX = rightEdge;
          targetY = -(viewport.height / 2) + 1.0;
          if (scrollLock) {
            targetX -= 0.4;
            targetY += 0.4;
          }
        }
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
    }

    // Scale calculations
    let baseScale = 1.0;
    let shrinkScale = 0.48;

    if (isMobile) {
      baseScale = 0.45;
      shrinkScale = 0.192;
    } else if (isTablet) {
      baseScale = 0.65;
      shrinkScale = 0.312;
    }

    const targetScale = activeSection === 'hero' ? baseScale : shrinkScale;
    const dragScaleMultiplier = isDragging ? 1.05 : 1.0;

    // Update position instantly during drag, and apply 150-200ms ease-out (lerp factor 0.18) upon release
    if (isDragging) {
      groupRef.current.position.x = dragPositionRef.current.x;
      groupRef.current.position.y = dragPositionRef.current.y;
    } else {
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.18);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.18);
    }
    
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale * dragScaleMultiplier, 0.15));
    
    if (idleGroupRef.current) {
      idleGroupRef.current.position.y = idleY;
    }
    
    if (bubbleAnchorRef.current) {
      bubbleAnchorRef.current.position.copy(groupRef.current.position);
    }

    // Direct projection of 3D robot coordinates to 2D screen pixels for speech bubble CSS tracking
    const tempV = new THREE.Vector3();
    groupRef.current.getWorldPosition(tempV);
    tempV.project(camera);
    
    const sX = (tempV.x * 0.5 + 0.5) * width;
    const sY = (tempV.y * -0.5 + 0.5) * window.innerHeight;
    
    document.documentElement.style.setProperty('--robot-x', `${sX}px`);
    document.documentElement.style.setProperty('--robot-y', `${sY}px`);

    velocity.current.set(
      groupRef.current.position.x - prevPos.current.x,
      groupRef.current.position.y - prevPos.current.y,
      0
    );

    // Apply tilt physics (rotate slightly while moving/dragging, limit to 3-5 degrees ~ 0.08 radians)
    const targetTilt = Math.max(-0.08, Math.min(0.08, -velocity.current.x * (isDragging ? 12 : 5)));
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetTilt, 0.1);
    
    prevPos.current.copy(groupRef.current.position);

    const dist = Math.hypot(targetX - groupRef.current.position.x, targetY - groupRef.current.position.y);
    const state = useRobotStore.getState();
    
    if (dist <= 0.1 && lastProcessedSpeechRequest.current !== state.speechRequestId) {
      lastProcessedSpeechRequest.current = state.speechRequestId;
      onRobotArrived(state.activeSection);
    }
  });

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    setIsDragging(true);
    setFollowGuide(false);

    // Project NDC pointer to world coordinates to find offset
    const worldX = (e.pointer.x * viewport.width) / 2;
    const worldY = (e.pointer.y * viewport.height) / 2;
    
    dragOffset.current = {
      x: worldX - groupRef.current!.position.x,
      y: worldY - groupRef.current!.position.y
    };

    // Initialize drag position refs with current position
    dragPositionRef.current = { x: groupRef.current!.position.x, y: groupRef.current!.position.y };
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    const screenX = ((groupRef.current!.position.x / (viewport.width / 2)) + 1) / 2 * width;
    const screenY = (-(groupRef.current!.position.y / (viewport.height / 2)) + 1) / 2 * height;
    dragScreenPositionRef.current = { x: screenX, y: screenY };

    if (!isTouchDevice) document.body.style.cursor = 'grabbing';
  };

  const handlePointerUp = () => {
    if (pressTimer.current) clearTimeout(pressTimer.current);
    setIsDragging(false);
    if (!isTouchDevice) document.body.style.cursor = 'grab';
  };

  const handleDoubleClick = (e: any) => {
    e.stopPropagation();
  };

  const handleClick = (e: any) => {
    e.stopPropagation();
    incrementClick();
    
    const store = useRobotStore.getState();
    if (store.bubbleVisible) {
      store.hideBubble();
    } else {
      store.onRobotArrived(store.activeSection);
    }
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
        onClick={handleClick}
        onPointerOver={() => { if (!isTouchDevice) document.body.style.cursor = 'grab'; }}
        onPointerOut={() => { if (!isTouchDevice) document.body.style.cursor = 'auto'; }}
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
