import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ThemeMode } from '../../types';

interface FullScreenParticleCanvasProps {
  className?: string;
  theme?: ThemeMode;
}

export const FullScreenParticleCanvas: React.FC<FullScreenParticleCanvasProps> = ({ className = '', theme = 'dark' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const particleGeoRef = useRef<THREE.BufferGeometry | null>(null);
  const particleMatRef = useRef<THREE.PointsMaterial | null>(null);
  const particleCount = 1100;

  const mouseRef = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
  });

  // Dark / Cyberpunk particle palette: vibrant cyan, sky blue, indigo, purple
  const darkPalette = [
    new THREE.Color('#38bdf8'), // Cyan
    new THREE.Color('#60a5fa'), // Sky Blue
    new THREE.Color('#818cf8'), // Indigo
    new THREE.Color('#06b6d4'), // Teal
    new THREE.Color('#93c5fd'), // Soft Ice Blue
    new THREE.Color('#a855f7'), // Light Purple
  ];

  // Light theme particle palette: crisp dark slate, royal blue, deep violet, cyan blue
  const lightPalette = [
    new THREE.Color('#0f172a'), // Dark Slate
    new THREE.Color('#1d4ed8'), // Royal Blue
    new THREE.Color('#6d28d9'), // Deep Violet
    new THREE.Color('#0284c7'), // Dark Cyan Blue
    new THREE.Color('#0f766e'), // Dark Teal
    new THREE.Color('#3b82f6'), // Bright Blue Accent
  ];

  // Reactivity when theme prop updates
  useEffect(() => {
    if (!particleGeoRef.current || !particleMatRef.current) return;

    const geo = particleGeoRef.current;
    const mat = particleMatRef.current;
    const colorAttr = geo.attributes.color as THREE.BufferAttribute;
    if (!colorAttr) return;

    const colors = colorAttr.array as Float32Array;
    const palette = theme === 'light' ? lightPalette : darkPalette;

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      const chosenColor = palette[Math.floor(Math.random() * palette.length)];
      colors[idx] = chosenColor.r;
      colors[idx + 1] = chosenColor.g;
      colors[idx + 2] = chosenColor.b;
    }

    colorAttr.needsUpdate = true;
    mat.blending = theme === 'light' ? THREE.NormalBlending : THREE.AdditiveBlending;
    mat.opacity = theme === 'light' ? 0.65 : 0.85;
  }, [theme]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const isMobile = width < 768;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.z = 18;

    // 3. Renderer with Alpha & DPR Cap (max 1.5 on mobile to optimize GPU performance)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    container.appendChild(renderer.domElement);

    // Particle Group for global parallax & rotation
    const particleGroup = new THREE.Group();
    scene.add(particleGroup);

    // 4. Particle Generation (scaled down 50%-60% on mobile below 768px)
    const activeParticleCount = isMobile ? 500 : 1100;
    const particleGeo = new THREE.BufferGeometry();
    particleGeoRef.current = particleGeo;

    const positions = new Float32Array(activeParticleCount * 3);
    const basePositions = new Float32Array(activeParticleCount * 3);
    const colors = new Float32Array(activeParticleCount * 3);
    const sizes = new Float32Array(activeParticleCount);
    const phases = new Float32Array(activeParticleCount);
    const frequencies = new Float32Array(activeParticleCount);

    const initialPalette = theme === 'light' ? lightPalette : darkPalette;

    for (let i = 0; i < activeParticleCount; i++) {
      const idx = i * 3;

      // Wide distribution across the viewport 3D space
      const x = (Math.random() - 0.5) * 44;
      const y = (Math.random() - 0.5) * 32;
      const z = (Math.random() - 0.5) * 20 - 2;

      positions[idx] = x;
      positions[idx + 1] = y;
      positions[idx + 2] = z;

      basePositions[idx] = x;
      basePositions[idx + 1] = y;
      basePositions[idx + 2] = z;

      // Random color from palette
      const chosenColor = initialPalette[Math.floor(Math.random() * initialPalette.length)];
      colors[idx] = chosenColor.r;
      colors[idx + 1] = chosenColor.g;
      colors[idx + 2] = chosenColor.b;

      // Varied particle sizes
      sizes[i] = 0.04 + Math.random() * 0.08;

      // Random phase and frequency for natural organic twinkling & float
      phases[i] = Math.random() * Math.PI * 2;
      frequencies[i] = 0.4 + Math.random() * 1.2;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom Canvas Texture for sharp pixelated square points
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(2, 2, 12, 12);
    }
    const pointTexture = new THREE.CanvasTexture(canvas);
    pointTexture.magFilter = THREE.NearestFilter;
    pointTexture.minFilter = THREE.NearestFilter;

    const particleMat = new THREE.PointsMaterial({
      size: theme === 'light' ? 0.22 : 0.18,
      vertexColors: true,
      map: pointTexture,
      transparent: true,
      opacity: theme === 'light' ? 0.65 : 0.85,
      blending: theme === 'light' ? THREE.NormalBlending : THREE.AdditiveBlending,
      depthWrite: false,
    });
    particleMatRef.current = particleMat;

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    particleGroup.add(particleSystem);

    // 5. Global Mouse & Touch Parallax Event Listener
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouseRef.current.targetX = (touch.clientX / window.innerWidth) * 2 - 1;
        mouseRef.current.targetY = -(touch.clientY / window.innerHeight) * 2 + 1;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // 6. Responsive Resize Handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const nowMobile = width < 768;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, nowMobile ? 1.5 : 2));
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // 7. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth Mouse Parallax LERPing
      const lerpSpeed = 0.035;
      mouseRef.current.currentX += (mouseRef.current.targetX - mouseRef.current.currentX) * lerpSpeed;
      mouseRef.current.currentY += (mouseRef.current.targetY - mouseRef.current.currentY) * lerpSpeed;

      const currX = mouseRef.current.currentX;
      const currY = mouseRef.current.currentY;

      // Parallax Group Translation & Gentle Shift
      particleGroup.position.x = currX * 1.2;
      particleGroup.position.y = currY * 1.2;
      particleGroup.rotation.y = currX * 0.04 + elapsedTime * 0.015;
      particleGroup.rotation.x = -currY * 0.04 + Math.sin(elapsedTime * 0.2) * 0.02;

      // Particle Floating & Twinkling Physics
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < activeParticleCount; i++) {
        const idx = i * 3;
        const phase = phases[i];
        const freq = frequencies[i];

        // Organic slow floating movement
        const floatX = Math.sin(elapsedTime * freq * 0.5 + phase) * 0.003;
        const floatY = Math.cos(elapsedTime * freq * 0.6 + phase) * 0.004;
        const floatZ = Math.sin(elapsedTime * freq * 0.3 + phase) * 0.002;

        posArray[idx] = basePositions[idx] + floatX;
        posArray[idx + 1] = basePositions[idx + 1] + floatY;
        posArray[idx + 2] = basePositions[idx + 2] + floatZ;
      }

      posAttr.needsUpdate = true;

      // Gentle twinkle
      const baseOp = theme === 'light' ? 0.6 : 0.75;
      particleMat.opacity = baseOp + Math.sin(elapsedTime * 1.5) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
      pointTexture.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`fixed inset-0 w-screen h-screen pointer-events-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
};

