// src/components/hero/Sonu3DWorkstation.tsx
// High-fidelity interactive 3D human developer workstation model powered by Three.js & Ready Player Me GLTF.
// Features: Real photorealistic human avatar with bone rigging, real-time head/neck/eye cursor tracking,
// signature light-blue bucket hat, sculpted beard, sitting at a developer desk with a glowing laptop,
// ergonomic chair, coffee mug, studio lighting, and tactile click-to-wave interaction.

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Laptop, Coffee, Loader2 } from 'lucide-react';
import { usePortfolioContent } from '../../context/PortfolioContentContext';
import { sounds } from '../../utils/soundEffects';

interface Sonu3DWorkstationProps {
  className?: string;
}

const STATUS_MESSAGES = [
  "Building full-stack MERN & AI apps ⚡",
  "Refining ACID transaction integrity 🛡️",
  "Tracking your cursor in 3D WebGL ✨",
  "Coffee fueled & ready to deploy ☕",
  "Click me to say hello! 🖐️",
];

export const Sonu3DWorkstation: React.FC<Sonu3DWorkstationProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = usePortfolioContent();

  const [isLoading, setIsLoading] = useState(true);
  const [statusIndex, setStatusIndex] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  const isWavingRef = useRef(false);
  const waveTimeRef = useRef(0);

  // Mouse tracking targets
  const mouseTargetRef = useRef({ x: 0, y: 0 });
  const mouseCurrentRef = useRef({ x: 0, y: 0 });

  // Handle click on the 3D model
  const handleClick = useCallback(() => {
    sounds.playClick(920);
    setClickCount((c) => c + 1);
    setStatusIndex((prev) => (prev + 1) % STATUS_MESSAGES.length);
    isWavingRef.current = true;
    waveTimeRef.current = 0;
  }, []);

  // Track cursor position across the window
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseTargetRef.current = { x, y };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Three.js 3D Scene construction with Ready Player Me Model
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    let isDisposed = false;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const width = container.clientWidth || 550;
    const height = container.clientHeight || 550;

    // 1. Scene & Perspective Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    // Framed closely at developer desk height showing real human face, hands, laptop and workstation
    camera.position.set(0, 1.25, 2.75);
    camera.lookAt(0, 0.98, 0);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    // 3. Dynamic Studio 3-Point Lighting
    const isDark = theme === 'dark';

    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 1.4 : 1.8);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, isDark ? 0x1e1b4b : 0x64748b, isDark ? 1.0 : 1.2);
    scene.add(hemiLight);

    // Key Directional Light
    const keyLight = new THREE.DirectionalLight(0xffffff, isDark ? 2.5 : 2.8);
    keyLight.position.set(2.8, 3.8, 3.2);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    // Cool Rim Light behind character
    const rimLight = new THREE.DirectionalLight(isDark ? 0xa855f7 : 0x0284c7, isDark ? 2.8 : 2.0);
    rimLight.position.set(-2.8, 2.8, -2.2);
    scene.add(rimLight);

    // Mouse-following Dynamic Point Light
    const cursorPointLight = new THREE.PointLight(isDark ? 0xc084fc : 0x38bdf8, isDark ? 2.2 : 1.8, 6.0);
    cursorPointLight.position.set(0, 2.0, 2.2);
    scene.add(cursorPointLight);

    // Laptop Screen Reflection Light (casts cyan glow upwards onto face and hands)
    const screenGlowLight = new THREE.PointLight(0x38bdf8, 2.2, 1.8);
    screenGlowLight.position.set(0, 0.88, 0.35);
    scene.add(screenGlowLight);

    // Master World Group
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);
    worldGroup.position.set(0, -0.15, 0);

    // =========================================================================
    // A. WORKSTATION DESK & ACCESSORIES
    // =========================================================================
    const deskGroup = new THREE.Group();
    worldGroup.add(deskGroup);

    const tableTopMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x0f172a : 0xf1f5f9,
      roughness: 0.25,
      metalness: 0.1,
    });
    const tableTopGeo = new THREE.BoxGeometry(2.1, 0.06, 1.15);
    const tableTop = new THREE.Mesh(tableTopGeo, tableTopMat);
    tableTop.position.set(0, 0.72, 0.3);
    tableTop.receiveShadow = true;
    deskGroup.add(tableTop);

    // Desk Legs
    const legGeo = new THREE.CylinderGeometry(0.028, 0.028, 0.72, 16);
    const legMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x1e293b : 0x94a3b8,
      roughness: 0.4,
      metalness: 0.8,
    });
    const legCoords = [
      [-0.95, 0.36, -0.15],
      [0.95, 0.36, -0.15],
      [-0.95, 0.36, 0.75],
      [0.95, 0.36, 0.75],
    ];
    legCoords.forEach(([lx, ly, lz]) => {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(lx, ly, lz);
      deskGroup.add(leg);
    });

    // Laptop Base & Keyboard
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(0, 0.755, 0.32);
    deskGroup.add(laptopGroup);

    const laptopMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.85, roughness: 0.2 });
    const laptopBaseGeo = new THREE.BoxGeometry(0.56, 0.015, 0.38);
    const laptopBase = new THREE.Mesh(laptopBaseGeo, laptopMat);
    laptopGroup.add(laptopBase);

    // Laptop Screen Lid (Angled back)
    const screenGroup = new THREE.Group();
    screenGroup.position.set(0, 0.008, -0.18);
    screenGroup.rotation.x = -Math.PI / 7.5;
    laptopGroup.add(screenGroup);

    const lidGeo = new THREE.BoxGeometry(0.56, 0.36, 0.014);
    const lid = new THREE.Mesh(lidGeo, laptopMat);
    lid.position.set(0, 0.18, 0);
    screenGroup.add(lid);

    // Glowing Code Screen
    const screenGeo = new THREE.PlaneGeometry(0.52, 0.32);
    const screenMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 0.18, 0.008);
    screenGroup.add(screenMesh);

    // Ceramic Coffee Mug
    const mugGeo = new THREE.CylinderGeometry(0.075, 0.065, 0.14, 16);
    const mugMat = new THREE.MeshStandardMaterial({ color: 0xec4899, roughness: 0.3 });
    const mug = new THREE.Mesh(mugGeo, mugMat);
    mug.position.set(0.62, 0.825, 0.3);
    deskGroup.add(mug);

    // Ergonomic Chair Backrest & Seat behind desk
    const chairGroup = new THREE.Group();
    chairGroup.position.set(0, 0, -0.28);
    worldGroup.add(chairGroup);

    const chairMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.65 });
    const chairBackGeo = new THREE.BoxGeometry(0.72, 0.88, 0.08);
    const chairBack = new THREE.Mesh(chairBackGeo, chairMat);
    chairBack.position.set(0, 1.05, -0.32);
    chairGroup.add(chairBack);

    const chairSeatGeo = new THREE.BoxGeometry(0.78, 0.1, 0.72);
    const chairSeat = new THREE.Mesh(chairSeatGeo, chairMat);
    chairSeat.position.set(0, 0.54, 0);
    chairGroup.add(chairSeat);

    // Orbiting 3D Stardust Embers
    const pCount = 50;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 4.2;
      pPos[i * 3 + 1] = 0.2 + Math.random() * 2.5;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 3.5;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: isDark ? 0xc084fc : 0x06b6d4,
      size: 0.035,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeo, pMat);
    worldGroup.add(particles);

    // Holographic Base Ring
    const ringGeo = new THREE.RingGeometry(1.5, 2.2, 36);
    const ringMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0xa855f7 : 0x06b6d4,
      transparent: true,
      opacity: isDark ? 0.22 : 0.16,
      side: THREE.DoubleSide,
    });
    const baseRing = new THREE.Mesh(ringGeo, ringMat);
    baseRing.rotation.x = Math.PI / 2;
    baseRing.position.set(0, 0.01, 0.1);
    worldGroup.add(baseRing);

    // =========================================================================
    // B. REAL HUMAN 3D MODEL (READY PLAYER ME GLTF WITH BONE RIGGING)
    // =========================================================================
    let headBone: THREE.Bone | null = null;
    let neckBone: THREE.Bone | null = null;
    let spineBone: THREE.Bone | null = null;
    let rightArmBone: THREE.Bone | null = null;
    let rightForeArmBone: THREE.Bone | null = null;
    let headMesh: THREE.SkinnedMesh | null = null;
    let mouthSmileIndex = -1;

    // Bone initial rest rotations
    const initialHeadRot = new THREE.Euler();
    const initialNeckRot = new THREE.Euler();
    const initialSpineRot = new THREE.Euler();
    const initialRightArmRot = new THREE.Euler();
    const initialRightForeArmRot = new THREE.Euler();

    const loader = new GLTFLoader();
    loader.load(
      '/character/readyplayer.me.glb',
      (gltf) => {
        if (isDisposed) return;

        const model = gltf.scene;
        // Position seated at desk chair
        model.position.set(0, -0.42, -0.22);
        model.scale.set(1.02, 1.02, 1.02);
        worldGroup.add(model);

        // Traverse meshes and customize materials according to Sonu's character identity
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            const mesh = child as THREE.Mesh;

            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;

              // 1. Signature Light-Blue Bucket Hat styling
              if (mesh.name === 'Wolf3D_Headwear' || mat.name === 'Wolf3D_Headwear') {
                mat.color.setHex(0x93c5fd);
                mat.roughness = 0.65;
              }
              // 2. Athletic Shirt styling
              else if (mesh.name === 'Wolf3D_Outfit_Top' || mat.name === 'Wolf3D_Outfit_Top') {
                mat.color.setHex(0x18181b);
                mat.roughness = 0.7;
              }
              // 3. Dark Cargo Pants styling
              else if (mesh.name === 'Wolf3D_Outfit_Bottom' || mat.name === 'Wolf3D_Outfit_Bottom') {
                mat.color.setHex(0x27272a);
                mat.roughness = 0.8;
              }
              // 4. Trekking Boots styling
              else if (mesh.name === 'Wolf3D_Outfit_Footwear' || mat.name === 'Wolf3D_Outfit_Footwear') {
                mat.color.setHex(0x854d0e);
                mat.roughness = 0.75;
              }
              // 5. Realistic Skin tone
              else if (mesh.name === 'Wolf3D_Skin' || mat.name === 'Wolf3D_Skin' || mesh.name === 'Wolf3D_Head') {
                mat.roughness = 0.58;
              }
            }
          }

          // Find head mesh with morph targets
          if (child.name === 'Wolf3D_Head' && (child as THREE.SkinnedMesh).isSkinnedMesh) {
            headMesh = child as THREE.SkinnedMesh;
            if (headMesh.morphTargetDictionary) {
              mouthSmileIndex = headMesh.morphTargetDictionary['mouthSmile'] ?? -1;
              if (mouthSmileIndex >= 0 && headMesh.morphTargetInfluences) {
                headMesh.morphTargetInfluences[mouthSmileIndex] = 0.35; // Gentle pleasant resting smile
              }
            }
          }

          // Bone discovery
          if ((child as THREE.Bone).isBone) {
            const bone = child as THREE.Bone;
            if (bone.name === 'Head') headBone = bone;
            if (bone.name === 'Neck') neckBone = bone;
            if (bone.name === 'Spine') spineBone = bone;
            if (bone.name === 'RightArm') rightArmBone = bone;
            if (bone.name === 'RightForeArm') rightForeArmBone = bone;

            // Pose legs in a sitting posture under desk
            if (bone.name === 'LeftUpLeg' || bone.name === 'RightUpLeg') {
              bone.rotation.x = -1.42; // Thigh lifted forward 90 degrees
            }
            if (bone.name === 'LeftLeg' || bone.name === 'RightLeg') {
              bone.rotation.x = 1.42; // Calf straight down
            }

            // Left Arm resting on table near keyboard
            if (bone.name === 'LeftArm') {
              bone.rotation.x = 0.95;
              bone.rotation.z = -0.32;
            }
            if (bone.name === 'LeftForeArm') {
              bone.rotation.x = 0.55;
              bone.rotation.y = 0.25;
            }

            // Right Arm initial resting pose near trackpad
            if (bone.name === 'RightArm') {
              bone.rotation.x = 0.95;
              bone.rotation.z = 0.32;
            }
            if (bone.name === 'RightForeArm') {
              bone.rotation.x = 0.55;
              bone.rotation.y = -0.25;
            }
          }
        });

        // Store initial rest rotations for real-time delta tracking
        if (headBone) initialHeadRot.copy(headBone.rotation);
        if (neckBone) initialNeckRot.copy(neckBone.rotation);
        if (spineBone) initialSpineRot.copy(spineBone.rotation);
        if (rightArmBone) initialRightArmRot.copy(rightArmBone.rotation);
        if (rightForeArmBone) initialRightForeArmRot.copy(rightForeArmBone.rotation);

        setIsLoading(false);
      },
      undefined,
      (error) => {
        console.error('Failed to load 3D character avatar:', error);
        setIsLoading(false);
      }
    );

    // =========================================================================
    // C. ANIMATION & RENDER LOOP (REAL-TIME 3D CURSOR TRACKING)
    // =========================================================================
    let animationFrameId: number;
    const startTime = performance.now();

    const render = () => {
      const elapsedTime = (performance.now() - startTime) / 1000;

      // Spring lerp mouse coordinates
      mouseCurrentRef.current.x += (mouseTargetRef.current.x - mouseCurrentRef.current.x) * 0.06;
      mouseCurrentRef.current.y += (mouseTargetRef.current.y - mouseCurrentRef.current.y) * 0.06;

      const mx = mouseCurrentRef.current.x;
      const my = mouseCurrentRef.current.y;

      // 1. Natural idle breathing motion
      const breathing = Math.sin(elapsedTime * 2.0) * 0.008;
      if (spineBone) {
        spineBone.rotation.x = initialSpineRot.x + breathing;
        spineBone.rotation.y = initialSpineRot.y + mx * 0.12;
      }

      // 2. REAL-TIME 3D HEAD & NECK CURSOR TRACKING
      if (headBone) {
        // Head smoothly turns left/right to look at user's cursor
        headBone.rotation.y = initialHeadRot.y + mx * 0.72;
        // Head looks up/down following cursor height
        headBone.rotation.x = initialHeadRot.x - my * 0.42;
        // Slight natural lateral head tilt
        headBone.rotation.z = initialHeadRot.z - mx * 0.08;
      }

      if (neckBone) {
        // Neck shares 35% of the head turn for realistic human articulation
        neckBone.rotation.y = initialNeckRot.y + mx * 0.28;
        neckBone.rotation.x = initialNeckRot.x - my * 0.18;
      }

      // 3. Interactive Hand Wave Gesture on click
      if (isWavingRef.current && rightArmBone && rightForeArmBone) {
        waveTimeRef.current += 0.05;
        // Lift right arm up
        rightArmBone.rotation.x = -1.1 + Math.sin(waveTimeRef.current * 8) * 0.2;
        rightArmBone.rotation.z = 0.55 + Math.sin(waveTimeRef.current * 10) * 0.3;
        rightForeArmBone.rotation.z = 0.75 + Math.sin(waveTimeRef.current * 12) * 0.35;

        // Warm smile while waving
        if (headMesh && mouthSmileIndex >= 0 && headMesh.morphTargetInfluences) {
          headMesh.morphTargetInfluences[mouthSmileIndex] = 0.85;
        }

        if (waveTimeRef.current > 2.6) {
          isWavingRef.current = false;
          // Smoothly reset arm
          rightArmBone.rotation.copy(initialRightArmRot);
          rightForeArmBone.rotation.copy(initialRightForeArmRot);
          if (headMesh && mouthSmileIndex >= 0 && headMesh.morphTargetInfluences) {
            headMesh.morphTargetInfluences[mouthSmileIndex] = 0.35;
          }
        }
      }

      // 4. Dynamic cursor spotlight moves with mouse
      cursorPointLight.position.set(mx * 3.2, 1.8 + my * 1.8, 2.6);

      // 5. Pulsing laptop screen glow
      screenMesh.material.color.setHex(isDark ? 0x38bdf8 : 0x0284c7);
      screenGlowLight.intensity = 1.8 + Math.sin(elapsedTime * 3.5) * 0.45;

      // 6. Slowly rotating base ring
      baseRing.rotation.z = elapsedTime * 0.18;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Resize handling
    const handleResize = () => {
      if (!containerRef.current || !renderer) return;
      const w = containerRef.current.clientWidth || 550;
      const h = containerRef.current.clientHeight || 550;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Cleanup on unmount
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      renderer.dispose();
      tableTopGeo.dispose();
      tableTopMat.dispose();
      legGeo.dispose();
      legMat.dispose();
      laptopBaseGeo.dispose();
      laptopMat.dispose();
      lidGeo.dispose();
      screenGeo.dispose();
      screenMat.dispose();
      mugGeo.dispose();
      mugMat.dispose();
      chairBackGeo.dispose();
      chairSeatGeo.dispose();
      chairMat.dispose();
      pGeo.dispose();
      pMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className={`relative w-full max-w-[480px] sm:max-w-[540px] lg:max-w-[580px] xl:max-w-[620px] aspect-square mx-auto flex flex-col items-center justify-center select-none group cursor-pointer ${className}`}
      role="button"
      tabIndex={0}
      aria-label="Interactive Photorealistic 3D Human Developer Model. Head and eyes track your cursor in real time. Click to interact."
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* 1. Speech Bubble / Live Status Badge */}
      <div className="absolute top-2 z-30 pointer-events-none w-full px-4 flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={statusIndex}
            initial={{ opacity: 0, y: -10, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/90 dark:bg-black/85 backdrop-blur-md border border-purple-500/40 shadow-[0_10px_30px_rgba(168,85,247,0.25)] text-xs font-mono font-medium text-foreground tracking-wide"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="truncate max-w-[280px] sm:max-w-[340px]">
              {STATUS_MESSAGES[statusIndex]}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute inset-0 z-25 flex flex-col items-center justify-center gap-3 bg-background/50 backdrop-blur-sm rounded-3xl">
          <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
          <span className="text-xs font-mono text-muted-foreground animate-pulse">
            Loading Real 3D Human Avatar...
          </span>
        </div>
      )}

      {/* 2. Interactive Three.js WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full relative z-20 outline-none transition-transform duration-300 group-hover:scale-[1.02]"
      />

      {/* 3. Ambient Radial Glow behind the workstation */}
      <div
        className="absolute inset-0 z-10 pointer-events-none rounded-full blur-[90px] opacity-40 transition-opacity duration-500 group-hover:opacity-60"
        style={{
          background:
            theme === 'dark'
              ? 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.28) 0%, rgba(6, 182, 212, 0.16) 50%, transparent 75%)'
              : 'radial-gradient(circle at 50% 50%, rgba(217, 70, 239, 0.2) 0%, rgba(14, 165, 233, 0.14) 50%, transparent 75%)',
        }}
      />

      {/* 4. Bottom Controls & Telemetry HUD */}
      <div className="absolute bottom-2 z-30 flex items-center justify-between w-full px-4 sm:px-6 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono text-muted-foreground bg-surface/80 dark:bg-neutral-900/80 backdrop-blur-md border border-border">
          <Laptop className="w-3.5 h-3.5 text-cyan-400" />
          <span>Real 3D Human Avatar</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono text-muted-foreground/80 bg-surface/60 dark:bg-neutral-900/60 backdrop-blur-md border border-border/60">
          <Coffee className="w-3 h-3 text-amber-400" />
          <span>Click to wave 🖐️</span>
        </div>
      </div>

      {/* Click feedback spark */}
      {clickCount > 0 && (
        <motion.div
          key={clickCount}
          initial={{ opacity: 1, scale: 0.8, y: 0 }}
          animate={{ opacity: 0, scale: 1.5, y: -40 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute z-40 pointer-events-none text-purple-400 flex items-center gap-1 font-mono text-xs font-bold"
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Hello! ✨</span>
        </motion.div>
      )}
    </div>
  );
};
