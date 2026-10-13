// src/components/hero/AsciiPandaCanvas.tsx
// Interactive 3D ASCII Panda Mascot Canvas inspired by adithyakrishnan.com
// Features: Procedural 3D Panda model in Three.js, real-time ASCII luminance rasterizer,
// mouse head-tracking, natural breathing & eye-blinking, drag-to-rotate physics.

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface AsciiPandaCanvasProps {
  className?: string;
}

export const AsciiPandaCanvas: React.FC<AsciiPandaCanvasProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const displayCanvas = displayCanvasRef.current;
    if (!container || !displayCanvas) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // --- 1. Three.js Offscreen Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const webglRenderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance',
    });
    webglRenderer.setSize(width, height);
    webglRenderer.setPixelRatio(1);

    // --- 2. Lighting Setup for Strong High-Contrast Silhouettes ---
    const ambientLight = new THREE.AmbientLight(0x404450, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x88aacc, 1.2);
    fillLight.position.set(-5, 1, 4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 2.2);
    rimLight.position.set(0, 4, -5);
    scene.add(rimLight);

    // --- 3. Procedural 3D Panda Model Geometry ---
    const pandaGroup = new THREE.Group();
    // Position panda slightly to the right to leave space for left-aligned typography on desktop
    const isDesktop = width >= 1024;
    pandaGroup.position.set(isDesktop ? 1.4 : 0, -0.1, 0);
    scene.add(pandaGroup);

    // High contrast materials
    const whiteMat = new THREE.MeshStandardMaterial({
      color: 0xf6f6fa,
      roughness: 0.35,
      metalness: 0.05,
    });
    const blackMat = new THREE.MeshStandardMaterial({
      color: 0x111116,
      roughness: 0.6,
      metalness: 0.15,
    });
    const eyeMat = new THREE.MeshStandardMaterial({
      color: 0x06060a,
      roughness: 0.1,
      metalness: 0.9,
    });
    const glintMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const noseMat = new THREE.MeshStandardMaterial({
      color: 0x181820,
      roughness: 0.3,
    });
    const bambooMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      roughness: 0.45,
    });

    // A. Head
    const headGeo = new THREE.SphereGeometry(1.22, 32, 28);
    const headMesh = new THREE.Mesh(headGeo, whiteMat);
    headMesh.scale.set(1.15, 1.0, 1.05);
    headMesh.position.set(0, 0.45, 0);
    pandaGroup.add(headMesh);

    // B. Ears
    const earGeo = new THREE.SphereGeometry(0.42, 20, 20);
    const leftEar = new THREE.Mesh(earGeo, blackMat);
    leftEar.position.set(-0.86, 1.45, -0.1);
    leftEar.rotation.z = -0.22;
    pandaGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeo, blackMat);
    rightEar.position.set(0.86, 1.45, -0.1);
    rightEar.rotation.z = 0.22;
    pandaGroup.add(rightEar);

    // C. Eye Patches
    const patchGeo = new THREE.SphereGeometry(0.36, 20, 20);
    const leftPatch = new THREE.Mesh(patchGeo, blackMat);
    leftPatch.scale.set(1.18, 0.88, 0.35);
    leftPatch.position.set(-0.46, 0.58, 1.08);
    leftPatch.rotation.set(0.1, -0.15, -0.38);
    pandaGroup.add(leftPatch);

    const rightPatch = new THREE.Mesh(patchGeo, blackMat);
    rightPatch.scale.set(1.18, 0.88, 0.35);
    rightPatch.position.set(0.46, 0.58, 1.08);
    rightPatch.rotation.set(0.1, 0.15, 0.38);
    pandaGroup.add(rightPatch);

    // D. Eyes & Blinking Group
    const eyesGroup = new THREE.Group();
    eyesGroup.position.set(0, 0.6, 1.22);
    pandaGroup.add(eyesGroup);

    const eyeGeo = new THREE.SphereGeometry(0.13, 16, 16);
    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.45, 0, 0);
    eyesGroup.add(leftEye);

    const glintGeo = new THREE.SphereGeometry(0.04, 12, 12);
    const leftGlint = new THREE.Mesh(glintGeo, glintMat);
    leftGlint.position.set(-0.42, 0.04, 0.11);
    eyesGroup.add(leftGlint);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.45, 0, 0);
    eyesGroup.add(rightEye);

    const rightGlint = new THREE.Mesh(glintGeo, glintMat);
    rightGlint.position.set(0.48, 0.04, 0.11);
    eyesGroup.add(rightGlint);

    // E. Snout & Nose
    const muzzleGeo = new THREE.SphereGeometry(0.42, 20, 20);
    const muzzle = new THREE.Mesh(muzzleGeo, whiteMat);
    muzzle.scale.set(1.1, 0.75, 0.8);
    muzzle.position.set(0, 0.3, 1.15);
    pandaGroup.add(muzzle);

    const noseGeo = new THREE.SphereGeometry(0.14, 16, 16);
    const nose = new THREE.Mesh(noseGeo, noseMat);
    nose.scale.set(1.3, 0.85, 0.7);
    nose.position.set(0, 0.38, 1.48);
    pandaGroup.add(nose);

    // F. Body
    const bodyGeo = new THREE.SphereGeometry(1.45, 32, 28);
    const bodyMesh = new THREE.Mesh(bodyGeo, whiteMat);
    bodyMesh.scale.set(1.15, 1.2, 1.05);
    bodyMesh.position.set(0, -1.2, -0.1);
    pandaGroup.add(bodyMesh);

    // G. Black Shoulder Vest
    const collarGeo = new THREE.TorusGeometry(1.4, 0.34, 16, 32);
    const collar = new THREE.Mesh(collarGeo, blackMat);
    collar.position.set(0, -0.68, -0.05);
    collar.rotation.x = Math.PI / 2;
    pandaGroup.add(collar);

    // H. Arms
    const armGeo = new THREE.CylinderGeometry(0.32, 0.38, 1.1, 16);
    const leftArm = new THREE.Mesh(armGeo, blackMat);
    leftArm.position.set(-1.25, -1.05, 0.25);
    leftArm.rotation.set(0.4, 0, 0.5);
    pandaGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, blackMat);
    rightArm.position.set(1.25, -1.05, 0.25);
    rightArm.rotation.set(0.4, 0, -0.5);
    pandaGroup.add(rightArm);

    // I. Sitting Feet
    const footGeo = new THREE.SphereGeometry(0.45, 20, 20);
    const leftFoot = new THREE.Mesh(footGeo, blackMat);
    leftFoot.scale.set(0.9, 0.7, 1.3);
    leftFoot.position.set(-0.85, -2.1, 0.6);
    pandaGroup.add(leftFoot);

    const rightFoot = new THREE.Mesh(footGeo, blackMat);
    rightFoot.scale.set(0.9, 0.7, 1.3);
    rightFoot.position.set(0.85, -2.1, 0.6);
    pandaGroup.add(rightFoot);

    // J. Cute Bamboo Shoot
    const bambooGroup = new THREE.Group();
    bambooGroup.position.set(1.3, -0.6, 0.7);
    bambooGroup.rotation.set(-0.35, 0.2, -0.35);

    const bambooStem = new THREE.CylinderGeometry(0.07, 0.07, 1.7, 12);
    const bambooStemMesh = new THREE.Mesh(bambooStem, bambooMat);
    bambooGroup.add(bambooStemMesh);

    const leafGeo = new THREE.ConeGeometry(0.09, 0.45, 8);
    const leaf1 = new THREE.Mesh(leafGeo, bambooMat);
    leaf1.position.set(0.12, 0.6, 0);
    leaf1.rotation.z = -0.7;
    bambooGroup.add(leaf1);

    const leaf2 = new THREE.Mesh(leafGeo, bambooMat);
    leaf2.position.set(-0.12, 0.35, 0);
    leaf2.rotation.z = 0.7;
    bambooGroup.add(leaf2);

    pandaGroup.add(bambooGroup);

    // --- 4. 2D ASCII Post-Processing Sampler & Display Canvas ---
    const sampleCanvas = document.createElement('canvas');
    const sampleCtx = sampleCanvas.getContext('2d', { willReadFrequently: true });
    const displayCtx = displayCanvas.getContext('2d');
    if (!sampleCtx || !displayCtx) return;

    // ASCII Font & Grid Tuning
    const charWidth = isDesktop ? 9 : 7.5;
    const charHeight = isDesktop ? 14 : 12;
    const ASCII_RAMP = ' .·:+=*#';
    const rampLength = ASCII_RAMP.length - 1;

    let cols = Math.floor(width / charWidth);
    let rows = Math.floor(height / charHeight);
    sampleCanvas.width = cols;
    sampleCanvas.height = rows;

    displayCanvas.width = width;
    displayCanvas.height = height;

    // --- 5. Interactive Mouse & Drag Tracking Physics ---
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetRotY = 0;
    let targetRotX = 0;
    let currentRotY = 0;
    let currentRotX = 0;

    let isDragging = false;
    let previousMouseX = 0;
    let dragVelocityY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      if (isDragging) {
        const deltaX = e.clientX - previousMouseX;
        dragVelocityY = deltaX * 0.01;
        currentRotY += dragVelocityY;
        previousMouseX = e.clientX;
      } else {
        const normX = (mouseX / width - 0.5) * 2;
        const normY = (mouseY / height - 0.5) * 2;
        targetRotY = normX * 0.48;
        targetRotX = normY * 0.28;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      setIsInteracting(true);
      previousMouseX = e.clientX;
    };

    const handleMouseUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    const handleResize = () => {
      if (!container || !displayCanvas) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      webglRenderer.setSize(width, height);

      const desktopMode = width >= 1024;
      pandaGroup.position.set(desktopMode ? 1.4 : 0, -0.1, 0);

      cols = Math.floor(width / charWidth);
      rows = Math.floor(height / charHeight);
      sampleCanvas.width = cols;
      sampleCanvas.height = rows;

      displayCanvas.width = width;
      displayCanvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    displayCanvas.addEventListener('mousedown', handleMouseDown);

    // --- 6. Animation Render Loop ---
    let animationFrameId: number;
    let clock = 0;
    let nextBlinkTime = 3.5;
    const blinkDuration = 0.14;
    let blinkProgress = 0;

    const render = () => {
      clock += 0.016;

      // Natural Breathing & Gentle Floating Motion
      pandaGroup.position.y = (isDesktop ? -0.1 : -0.2) + Math.sin(clock * 1.6) * 0.07;
      pandaGroup.rotation.z = Math.sin(clock * 0.8) * 0.02;

      // Ears subtle playful wiggle
      leftEar.rotation.z = -0.22 + Math.sin(clock * 3.2) * 0.03;
      rightEar.rotation.z = 0.22 - Math.sin(clock * 3.2) * 0.03;

      // Drag Inertia & Mouse Tracking
      if (!isDragging) {
        dragVelocityY *= 0.92;
        currentRotY += dragVelocityY;
        currentRotY += (targetRotY - currentRotY) * 0.075;
        currentRotX += (targetRotX - currentRotX) * 0.075;
      }
      pandaGroup.rotation.y = currentRotY;
      pandaGroup.rotation.x = currentRotX;

      // Natural Eye Blinking Logic
      if (clock > nextBlinkTime) {
        blinkProgress += 0.016;
        if (blinkProgress < blinkDuration) {
          const t = blinkProgress / blinkDuration;
          const blinkScale = Math.max(0.05, 1 - Math.sin(t * Math.PI) * 0.95);
          eyesGroup.scale.y = blinkScale;
        } else {
          eyesGroup.scale.y = 1;
          blinkProgress = 0;
          nextBlinkTime = clock + 3.0 + Math.random() * 2.5;
        }
      }

      // Render 3D Scene to offscreen WebGL buffer
      webglRenderer.render(scene, camera);

      // Downsample to ASCII grid
      sampleCtx.clearRect(0, 0, cols, rows);
      sampleCtx.drawImage(webglRenderer.domElement, 0, 0, cols, rows);
      const pixelData = sampleCtx.getImageData(0, 0, cols, rows).data;

      // Render ASCII characters to Visible 2D Canvas
      const isDark = document.documentElement.classList.contains('dark');
      displayCtx.fillStyle = isDark ? '#000000' : '#ffffff';
      displayCtx.fillRect(0, 0, width, height);

      displayCtx.font = `bold ${isDesktop ? 12 : 10.5}px monospace`;
      displayCtx.textAlign = 'center';
      displayCtx.textBaseline = 'middle';

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const pixelIndex = (r * cols + c) * 4;
          const alpha = pixelData[pixelIndex + 3];
          if (alpha < 12) continue;

          const red = pixelData[pixelIndex];
          const green = pixelData[pixelIndex + 1];
          const blue = pixelData[pixelIndex + 2];

          // Perceptual Luminance
          const lum = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

          if (isDark) {
            const charIndex = Math.min(Math.floor(lum * rampLength), rampLength);
            const char = ASCII_RAMP[charIndex] || '.';
            const textOpacity = Math.min(0.24 + lum * 0.72, 0.92);
            displayCtx.fillStyle = `rgba(235, 242, 255, ${textOpacity})`;
            displayCtx.fillText(char, c * charWidth + charWidth / 2, r * charHeight + charHeight / 2);
          } else {
            // Light mode: dark ink on white background
            // Black fur (ears, patches, eyes) -> dense ink characters & high opacity
            // White fur (face, belly) -> delicate subtle contour glyphs
            const charIndex = Math.min(Math.floor((1 - lum) * rampLength), rampLength);
            const char = ASCII_RAMP[charIndex] || '.';
            const textOpacity = Math.min(0.25 + (1 - lum) * 0.70, 0.95);
            displayCtx.fillStyle = `rgba(15, 23, 42, ${textOpacity})`;
            displayCtx.fillText(char, c * charWidth + charWidth / 2, r * charHeight + charHeight / 2);
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // --- 7. Clean Teardown ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      displayCanvas.removeEventListener('mousedown', handleMouseDown);
      webglRenderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none bg-background transition-colors duration-300 ${className}`}
    >
      <canvas
        ref={displayCanvasRef}
        className={`block w-full h-full ${
          isInteracting ? 'cursor-grabbing' : 'cursor-grab'
        } touch-none`}
        aria-label="Interactive 3D ASCII Panda Mascot"
      />
    </div>
  );
};
