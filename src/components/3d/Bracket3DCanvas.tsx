import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SKILL_NODES } from '../../data/portfolioData';

interface Bracket3DCanvasProps {
  className?: string;
  activeSkill?: string | null;
}

export const Bracket3DCanvas: React.FC<Bracket3DCanvasProps> = ({ className = '', activeSkill }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeSkillRef = useRef(activeSkill);

  const stateRef = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    isHovered: false,
    clickSpin: 0,
    clickGlow: 0,
  });

  useEffect(() => {
    activeSkillRef.current = activeSkill;
  }, [activeSkill]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;
    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.z = isMobile ? 6.8 : 5.8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Left bracket: '<'
    const leftShape = new THREE.Shape();
    leftShape.moveTo(0, 0);
    leftShape.lineTo(-0.72, 0.9);
    leftShape.lineTo(-0.42, 1.1);
    leftShape.lineTo(0.52, 0.12);
    leftShape.lineTo(0.52, -0.12);
    leftShape.lineTo(-0.42, -1.1);
    leftShape.lineTo(-0.72, -0.9);
    leftShape.closePath();

    const extrudeSettings = {
      steps: 1,
      depth: 0.26,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.035,
      bevelOffset: 0,
      bevelSegments: 4
    };

    // Default indigo/purple materials
    const defaultBracketColor = new THREE.Color(0x6366f1);
    const defaultSlashColor = new THREE.Color(0xa855f7);

    const leftMat = new THREE.MeshPhysicalMaterial({
      color: defaultBracketColor.clone(),
      emissive: 0x4f46e5,
      emissiveIntensity: 0.8,
      roughness: 0.15,
      metalness: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    const leftMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(leftShape, extrudeSettings), leftMat);
    leftMesh.position.x = -0.85;
    mainGroup.add(leftMesh);

    // Slash: '/'
    const slashShape = new THREE.Shape();
    slashShape.moveTo(-0.15, -1.18);
    slashShape.lineTo(0.15, -1.18);
    slashShape.lineTo(0.42, 1.18);
    slashShape.lineTo(0.12, 1.18);
    slashShape.closePath();

    const slashMat = new THREE.MeshPhysicalMaterial({
      color: defaultSlashColor.clone(),
      emissive: 0xa855f7,
      emissiveIntensity: 0.9,
      roughness: 0.1,
      metalness: 0.9,
      clearcoat: 1.0,
    });

    const slashMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(slashShape, extrudeSettings), slashMat);
    slashMesh.position.x = 0;
    mainGroup.add(slashMesh);

    // Right bracket: '>'
    const rightShape = new THREE.Shape();
    rightShape.moveTo(0, 0);
    rightShape.lineTo(0.72, 0.9);
    rightShape.lineTo(0.42, 1.1);
    rightShape.lineTo(-0.52, 0.12);
    rightShape.lineTo(-0.52, -0.12);
    rightShape.lineTo(0.42, -1.1);
    rightShape.lineTo(0.72, -0.9);
    rightShape.closePath();

    const rightMat = new THREE.MeshPhysicalMaterial({
      color: defaultBracketColor.clone(),
      emissive: 0x4f46e5,
      emissiveIntensity: 0.8,
      roughness: 0.15,
      metalness: 0.85,
      clearcoat: 1.0,
    });

    const rightMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(rightShape, extrudeSettings), rightMat);
    rightMesh.position.x = 0.85;
    mainGroup.add(rightMesh);

    // Dynamic Orbit Sparkle Particles surrounding the 3D Code Symbol (scaled down on mobile below 768px)
    const particleCount = isMobile ? 25 : 80;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleVel = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      const radius = (isMobile ? 1.1 : 1.4) + Math.random() * (isMobile ? 0.8 : 1.1);
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      particlePos[idx] = radius * Math.cos(theta) * Math.cos(phi);
      particlePos[idx + 1] = radius * Math.sin(phi);
      particlePos[idx + 2] = radius * Math.sin(theta) * Math.cos(phi);

      particleVel[idx] = (Math.random() - 0.5) * 0.01;
      particleVel[idx + 1] = (Math.random() - 0.5) * 0.01;
      particleVel[idx + 2] = (Math.random() - 0.5) * 0.01;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x8b5cf6,
      size: isMobile ? 0.045 : 0.055,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particlePoints);

    // Lights
    const amb = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(amb);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 2.5);
    dirLight1.position.set(3, 3, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xa855f7, 2.5);
    dirLight2.position.set(-3, -3, 3);
    scene.add(dirLight2);

    // Global Viewport Cursor Mouse & Touch Tracking
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize global mouse coordinates (X, Y) relative to window center: X in [-1, 1], Y in [-1, 1]
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
      // Trigger interactive 360 spin & light glow pulse!
      stateRef.current.clickSpin = Math.PI * 2;
      stateRef.current.clickGlow = 1.0;

      // Scatter orbit particles slightly on click
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        particleVel[idx] += (Math.random() - 0.5) * 0.1;
        particleVel[idx + 1] += (Math.random() - 0.5) * 0.1;
        particleVel[idx + 2] += (Math.random() - 0.5) * 0.1;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    container.addEventListener('click', handleClick);

    // Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const observer = new ResizeObserver(() => handleResize());
    observer.observe(container);

    let animationId: number;
    let clock = new THREE.Clock();
    let accumulatedSpin = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth mouse tilt tracking with damping factor (~0.06)
      const lerpFactor = 0.06;
      stateRef.current.currentX += (stateRef.current.targetX - stateRef.current.currentX) * lerpFactor;
      stateRef.current.currentY += (stateRef.current.targetY - stateRef.current.currentY) * lerpFactor;

      const currX = stateRef.current.currentX;
      const currY = stateRef.current.currentY;

      // Handle Click Spin Impulse
      if (stateRef.current.clickSpin > 0.01) {
        const spinStep = stateRef.current.clickSpin * 0.12;
        accumulatedSpin += spinStep;
        stateRef.current.clickSpin -= spinStep;
      }

      // Handle Click Glow Decay
      if (stateRef.current.clickGlow > 0.01) {
        stateRef.current.clickGlow *= 0.91;
      } else {
        stateRef.current.clickGlow = 0;
      }

      // Main rotation equation: subtle float + tilt + spin impulse
      mainGroup.rotation.y = Math.sin(t * 0.8) * 0.15 + currX * 0.75 + accumulatedSpin;
      mainGroup.rotation.x = Math.cos(t * 0.6) * 0.12 + currY * -0.55;
      mainGroup.rotation.z = Math.sin(t * 0.4) * 0.05 + currX * 0.15;
      mainGroup.position.y = Math.sin(t * 1.2) * 0.08;

      // NODE HIGHLIGHT SYNC: Smooth color transition based on active selected/hovered skill node
      const currentActiveSkillId = activeSkillRef.current;
      const targetSkill = SKILL_NODES.find(s => s.id === currentActiveSkillId);

      let targetColorHex = 0x6366f1;
      let targetSlashHex = 0xa855f7;

      if (targetSkill) {
        targetColorHex = parseInt(targetSkill.color.replace('#', '0x'), 16);
        targetSlashHex = targetColorHex;
      }

      const targetCol = new THREE.Color(targetColorHex);
      const targetSlashCol = new THREE.Color(targetSlashHex);

      // Lerp material colors
      leftMat.color.lerp(targetCol, 0.08);
      rightMat.color.lerp(targetCol, 0.08);
      slashMat.color.lerp(targetSlashCol, 0.08);

      leftMat.emissive.lerp(targetCol, 0.08);
      rightMat.emissive.lerp(targetCol, 0.08);
      slashMat.emissive.lerp(targetSlashCol, 0.08);

      particleMat.color.lerp(targetCol, 0.08);

      // Emissive Intensity boosting when node active or clicked
      const activePulse = currentActiveSkillId ? (1.2 + Math.sin(t * 8) * 0.4) : 0.7;
      const extraGlow = stateRef.current.clickGlow * 1.5;

      leftMat.emissiveIntensity = activePulse + extraGlow;
      rightMat.emissiveIntensity = activePulse + extraGlow;
      slashMat.emissiveIntensity = activePulse + 0.3 + extraGlow;

      // Update particles drift
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        posArray[idx] += particleVel[idx] + Math.sin(t + i) * 0.001;
        posArray[idx + 1] += particleVel[idx + 1] + Math.cos(t + i) * 0.001;
        posArray[idx + 2] += particleVel[idx + 2];

        // Friction damp
        particleVel[idx] *= 0.92;
        particleVel[idx + 1] *= 0.92;
        particleVel[idx + 2] *= 0.92;
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
      observer.disconnect();
      cancelAnimationFrame(animationId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-visible cursor-pointer group/bracket ${className}`}>
      <div ref={mountRef} className="w-full h-full min-h-[220px]" />

      {/* Helper label indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-slate-950/80 border border-violet-500/30 text-[10px] text-violet-300 font-mono opacity-60 group-hover/bracket:opacity-100 transition-opacity pointer-events-none">
        ✦ Interactive Code Symbol // Global Mouse Reactivity
      </div>
    </div>
  );
};
