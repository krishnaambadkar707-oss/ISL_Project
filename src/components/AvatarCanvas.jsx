import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { FastForward, RotateCw, Sparkles, Volume2, Eye } from 'lucide-react';

export default function AvatarCanvas({ 
  currentSign, 
  isSpeaking, 
  speechText, 
  slowMotion = false,
  onToggleSlowMotion 
}) {
  const mountRef = useRef(null);
  const [cameraAngle, setCameraAngle] = useState('front'); // 'front' | 'side' | 'close'
  
  // Three.js scene references
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const rightHandGroupRef = useRef(null);
  const fingerBonesRef = useRef({});
  const mouthMeshRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 420;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.2, 3.2);
    camera.lookAt(0, 1.0, 0);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfff0f5, 1.2);
    mainLight.position.set(2, 4, 3);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(0x00e5ff, 0.8);
    rimLight.position.set(-3, 2, -2);
    scene.add(rimLight);

    const pinkFillLight = new THREE.PointLight(0xf472b6, 0.8, 10);
    pinkFillLight.position.set(0, 1, 2);
    scene.add(pinkFillLight);

    // 5. Procedural Anime Avatar ("Hana")
    const avatarGroup = new THREE.Group();

    // Body
    const bodyGeo = new THREE.CylinderGeometry(0.35, 0.45, 0.9, 32);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x1e1b4b, roughness: 0.3 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.45;
    avatarGroup.add(body);

    // Collar
    const collarGeo = new THREE.TorusGeometry(0.26, 0.05, 16, 32);
    const collarMat = new THREE.MeshStandardMaterial({ color: 0xa855f7 });
    const collar = new THREE.Mesh(collarGeo, collarMat);
    collar.rotation.x = Math.PI / 2;
    collar.position.y = 0.82;
    avatarGroup.add(collar);

    // Head
    const headGeo = new THREE.SphereGeometry(0.32, 32, 32);
    headGeo.scale(1, 1.1, 0.95);
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xffdfd3, roughness: 0.4 });
    const head = new THREE.Mesh(headGeo, skinMat);
    head.position.y = 1.25;
    avatarGroup.add(head);

    // Anime Hair
    const hairGroup = new THREE.Group();
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x9333ea, roughness: 0.2 });
    
    const backHairGeo = new THREE.SphereGeometry(0.36, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.7);
    const backHair = new THREE.Mesh(backHairGeo, hairMat);
    backHair.position.y = 1.30;
    hairGroup.add(backHair);

    const bangGeo = new THREE.ConeGeometry(0.12, 0.4, 16);
    const leftBang = new THREE.Mesh(bangGeo, hairMat);
    leftBang.position.set(-0.16, 1.3, 0.26);
    leftBang.rotation.z = -0.3;
    hairGroup.add(leftBang);

    const rightBang = new THREE.Mesh(bangGeo, hairMat);
    rightBang.position.set(0.16, 1.3, 0.26);
    rightBang.rotation.z = 0.3;
    hairGroup.add(rightBang);

    avatarGroup.add(hairGroup);

    // Eyes
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4 });
    const eyeGeo = new THREE.SphereGeometry(0.05, 16, 16);
    eyeGeo.scale(0.8, 1.2, 0.3);

    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.11, 1.28, 0.29);
    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.11, 1.28, 0.29);
    avatarGroup.add(leftEye);
    avatarGroup.add(rightEye);

    // Mouth
    const mouthGeo = new THREE.TorusGeometry(0.035, 0.01, 12, 24, Math.PI);
    const mouthMat = new THREE.MeshBasicMaterial({ color: 0xe11d48 });
    const mouth = new THREE.Mesh(mouthGeo, mouthMat);
    mouth.position.set(0, 1.16, 0.31);
    mouth.rotation.x = Math.PI;
    avatarGroup.add(mouth);
    mouthMeshRef.current = mouth;

    // 6. Rigged 3D Hand & Arm for ISL Demonstration
    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.35, 0.85, 0.35);
    rightArmGroup.rotation.set(0.1, -0.3, 0);

    const armMat = new THREE.MeshStandardMaterial({ color: 0xffdfd3, roughness: 0.4 });
    const armGeo = new THREE.CylinderGeometry(0.05, 0.045, 0.38, 16);
    const arm = new THREE.Mesh(armGeo, armMat);
    arm.position.y = 0.19;
    rightArmGroup.add(arm);

    // Palm
    const palmGroup = new THREE.Group();
    palmGroup.position.y = 0.38;

    const palmGeo = new THREE.BoxGeometry(0.14, 0.16, 0.04);
    const palm = new THREE.Mesh(palmGeo, armMat);
    palmGroup.add(palm);

    // 5 Procedural Finger Digits
    const fingerBones = {};
    const fingerNames = ['thumb', 'index', 'middle', 'ring', 'pinky'];
    const fingerXOffsets = [-0.07, -0.04, 0.0, 0.04, 0.07];

    fingerNames.forEach((name, idx) => {
      const digitGroup = new THREE.Group();
      const isThumb = name === 'thumb';
      
      digitGroup.position.set(
        fingerXOffsets[idx], 
        isThumb ? 0.02 : 0.08, 
        0
      );

      const phalanxGeo = new THREE.CylinderGeometry(0.014, 0.014, isThumb ? 0.07 : 0.09, 12);
      const phalanx = new THREE.Mesh(phalanxGeo, armMat);
      phalanx.position.y = (isThumb ? 0.07 : 0.09) / 2;
      digitGroup.add(phalanx);

      palmGroup.add(digitGroup);
      fingerBones[name] = digitGroup;
    });

    fingerBonesRef.current = fingerBones;
    rightArmGroup.add(palmGroup);
    rightHandGroupRef.current = rightArmGroup;

    avatarGroup.add(rightArmGroup);
    scene.add(avatarGroup);

    // 7. Render Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Idle breathing float
      avatarGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.02;

      // Lip-sync mouth scale
      if (isSpeaking && mouthMeshRef.current) {
        const mouthScale = 1 + Math.abs(Math.sin(elapsedTime * 15)) * 0.8;
        mouthMeshRef.current.scale.set(mouthScale, mouthScale, 1);
      } else if (mouthMeshRef.current) {
        mouthMeshRef.current.scale.set(1, 1, 1);
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update 3D Hand Pose when currentSign changes
  useEffect(() => {
    if (!rightHandGroupRef.current || !fingerBonesRef.current) return;

    const pose = currentSign?.pose3d || {
      thumb: [0.2, 0.4, 0.1],
      index: [1.4, 0.1, 0.1],
      middle: [1.4, 0.1, 0.1],
      ring: [1.4, 0.1, 0.1],
      pinky: [1.4, 0.1, 0.1]
    };

    const speed = slowMotion ? 0.4 : 1.0;
    
    Object.keys(pose).forEach((finger) => {
      if (fingerBonesRef.current[finger]) {
        const rot = pose[finger];
        if (Array.isArray(rot)) {
          fingerBonesRef.current[finger].rotation.set(rot[0] * speed, rot[1] * speed, rot[2] * speed);
        }
      }
    });

    if (rightHandGroupRef.current) {
      rightHandGroupRef.current.position.set(0.32, 0.88, 0.35);
    }
  }, [currentSign, slowMotion]);

  // Adjust Camera View Angle
  useEffect(() => {
    if (!cameraRef.current) return;
    const cam = cameraRef.current;

    if (cameraAngle === 'front') {
      cam.position.set(0, 1.2, 3.2);
    } else if (cameraAngle === 'side') {
      cam.position.set(1.8, 1.2, 2.2);
    } else if (cameraAngle === 'close') {
      cam.position.set(0.3, 1.1, 1.8);
    }
    cam.lookAt(0, 1.0, 0);
  }, [cameraAngle]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between">
      {/* View Angle & Speed Controls */}
      <div className="absolute top-2 right-2 z-10 flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-full border border-white/10 backdrop-blur-md">
        <button
          onClick={() => setCameraAngle(cameraAngle === 'front' ? 'side' : cameraAngle === 'side' ? 'close' : 'front')}
          className="px-2 py-1 text-[11px] font-bold text-slate-300 hover:text-white rounded-full flex items-center gap-1 transition-colors"
          title="Change View Angle"
        >
          <RotateCw className="w-3.5 h-3.5" />
          {cameraAngle.toUpperCase()}
        </button>
        <button
          onClick={onToggleSlowMotion}
          className={`px-2.5 py-1 text-[11px] font-bold rounded-full transition-all ${
            slowMotion 
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30' 
              : 'text-slate-300 hover:bg-white/10'
          }`}
        >
          {slowMotion ? '0.5x' : '1.0x'}
        </button>
      </div>

      {/* 3D Canvas Element */}
      <div ref={mountRef} className="w-full h-[320px] cursor-grab active:cursor-grabbing" />
    </div>
  );
}
