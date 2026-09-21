import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroCanvas3DProps {
  className?: string;
}

export const HeroCanvas3D: React.FC<HeroCanvas3DProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  const stateRef = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    isHovered: false,
    clickImpulse: 0,
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;
    const isMobile = window.innerWidth < 768;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera - scaled Z-distance on mobile to ensure zero clipping & clean text framing
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = isMobile ? 7.6 : 6.6;

    // Renderer with DPR cap (1.5 on mobile to prevent GPU lag)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    container.appendChild(renderer.domElement);

    // Group for main 3D sculpture
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Geometry 1: Torus Knot Wireframe (scaled down ~20% on mobile for comfortable framing)
    const torusKnotRadius = isMobile ? 0.82 : 1.05;
    const torusKnotGeo = new THREE.TorusKnotGeometry(torusKnotRadius, 0.25, 140, 20, 2, 3);
    const wireframeMat = new THREE.MeshPhysicalMaterial({
      color: 0x7c3aed,
      emissive: 0x4f46e5,
      emissiveIntensity: 0.7,
      roughness: 0.1,
      metalness: 0.95,
      wireframe: true,
      transparent: true,
      opacity: 0.92,
    });
    const torusKnotMesh = new THREE.Mesh(torusKnotGeo, wireframeMat);
    mainGroup.add(torusKnotMesh);

    // Geometry 2: Inner Core Octahedron
    const innerRadius = isMobile ? 0.55 : 0.7;
    const innerGeo = new THREE.OctahedronGeometry(innerRadius, 2);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.8,
      roughness: 0.15,
      metalness: 0.9,
      flatShading: true,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerMesh);

    // Geometry 3: Dual Orbit Rings
    const ringRadius = isMobile ? 1.4 : 1.8;
    const ringGeo = new THREE.TorusGeometry(ringRadius, 0.025, 16, 120);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.5 });
    
    const ringMesh1 = new THREE.Mesh(ringGeo, ringMat);
    ringMesh1.rotation.x = Math.PI / 3;
    mainGroup.add(ringMesh1);

    const ringMesh2 = new THREE.Mesh(ringGeo, ringMat);
    ringMesh2.rotation.y = Math.PI / 4;
    mainGroup.add(ringMesh2);

    // Local Halo Orbit Particles around central 3D sculpture (scaled down on mobile by 60% to maintain 60 FPS)
    const particleCount = isMobile ? 35 : 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleBasePositions = new Float32Array(particleCount * 3);
    const particleVelocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      // Spherical orbital halo distribution around the torus knot sculpture
      const radius = (isMobile ? 1.3 : 1.7) + Math.random() * (isMobile ? 0.9 : 1.3);
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      const x = radius * Math.cos(theta) * Math.cos(phi);
      const y = radius * Math.sin(phi);
      const z = radius * Math.sin(theta) * Math.cos(phi);

      particlePositions[idx] = x;
      particlePositions[idx + 1] = y;
      particlePositions[idx + 2] = z;

      particleBasePositions[idx] = x;
      particleBasePositions[idx + 1] = y;
      particleBasePositions[idx + 2] = z;

      particleVelocities[idx] = 0;
      particleVelocities[idx + 1] = 0;
      particleVelocities[idx + 2] = 0;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: isMobile ? 0.05 : 0.065,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xa855f7, 3, 20);
    pointLight1.position.set(4, 4, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x06b6d4, 3, 20);
    pointLight2.position.set(-4, -4, 2);
    scene.add(pointLight2);

    // Global Viewport Mouse & Touch Drag Tracking Event Handlers
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize global mouse coordinates (X, Y) relative to the window center: X in [-1, 1], Y in [-1, 1]
      stateRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      stateRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        stateRef.current.targetX = (touch.clientX / window.innerWidth) * 2 - 1;
        stateRef.current.targetY = -(touch.clientY / window.innerHeight) * 2 + 1;
      }
    };

    const handleMouseLeaveWindow = (e: MouseEvent) => {
      if (!e.relatedTarget) {
        stateRef.current.targetX = 0;
        stateRef.current.targetY = 0;
      }
    };

    const handleClick = () => {
      stateRef.current.clickImpulse = 1.0;
      // Scatter particles slightly on click
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;

      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        particleVelocities[idx] += (Math.random() - 0.5) * 0.12;
        particleVelocities[idx + 1] += (Math.random() - 0.5) * 0.12;
        particleVelocities[idx + 2] += (Math.random() - 0.5) * 0.12;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    container.addEventListener('click', handleClick);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous & Smooth Damping (LERP) towards normalized mouse coordinates
      const dampingFactor = 0.06;
      stateRef.current.currentX += (stateRef.current.targetX - stateRef.current.currentX) * dampingFactor;
      stateRef.current.currentY += (stateRef.current.targetY - stateRef.current.currentY) * dampingFactor;

      const currX = stateRef.current.currentX;
      const currY = stateRef.current.currentY;

      // Smooth tracking & continuous Y-axis auto-rotation idle fallback so it never looks frozen
      mainGroup.rotation.y = elapsedTime * 0.2 + currX * 0.75;
      mainGroup.rotation.x = currY * -0.55 + Math.sin(elapsedTime * 0.4) * 0.08;
      mainGroup.rotation.z = Math.cos(elapsedTime * 0.3) * 0.05;

      // Inner elements gentle counter-rotations
      innerMesh.rotation.y = -elapsedTime * 0.3;
      innerMesh.rotation.x = elapsedTime * 0.2;

      ringMesh1.rotation.z = elapsedTime * 0.1;
      ringMesh2.rotation.z = -elapsedTime * 0.12;

      // Click Impulse Light Decay
      if (stateRef.current.clickImpulse > 0.01) {
        stateRef.current.clickImpulse *= 0.92;
        wireframeMat.emissiveIntensity = 0.6 + stateRef.current.clickImpulse * 1.2;
        innerMat.emissiveIntensity = 0.7 + stateRef.current.clickImpulse * 1.5;
        pointLight1.intensity = 3.0 + stateRef.current.clickImpulse * 5.0;
      } else {
        wireframeMat.emissiveIntensity = 0.6;
        innerMat.emissiveIntensity = 0.7;
        pointLight1.intensity = 3.0;
      }

      // Update Expanded Background Particles
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;

        // Apply impulse velocity
        posArray[idx] += particleVelocities[idx];
        posArray[idx + 1] += particleVelocities[idx + 1];
        posArray[idx + 2] += particleVelocities[idx + 2];

        // Velocity friction
        particleVelocities[idx] *= 0.90;
        particleVelocities[idx + 1] *= 0.90;
        particleVelocities[idx + 2] *= 0.90;

        // Gentle ambient floating & subtle reaction to mouse
        const driftX = Math.sin(elapsedTime * 0.4 + i) * 0.002 + currX * 0.003;
        const driftY = Math.cos(elapsedTime * 0.3 + i) * 0.002 + currY * 0.003;

        // Spring return towards base position
        posArray[idx] += (particleBasePositions[idx] - posArray[idx]) * 0.02 + driftX;
        posArray[idx + 1] += (particleBasePositions[idx + 1] - posArray[idx + 1]) * 0.02 + driftY;
        posArray[idx + 2] += (particleBasePositions[idx + 2] - posArray[idx + 2]) * 0.02;
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      container.removeEventListener('click', handleClick);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-visible cursor-pointer ${className}`}>
      <div ref={mountRef} className="w-full h-full min-h-[300px] flex items-center justify-center" />
      
      {/* Visual cue overlay */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full bg-slate-950/70 border border-indigo-500/30 text-[10px] text-indigo-300 font-mono opacity-60 hover:opacity-100 transition-opacity pointer-events-none">
        ✦ Interactive Spatial Canvas // Global Mouse Reactivity
      </div>
    </div>
  );
};
