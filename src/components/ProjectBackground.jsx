import React, { useEffect, useRef } from 'react';

/**
 * ProjectBackground
 * Dedicated, highly visible, immersive Indian Sign Language (ISL) background.
 * Features:
 * - 5 high-visibility MediaPipe 21-point hand tracking constellation meshes with glowing bones & neon joint nodes
 * - Distinct, clearly visible ISL gesture silhouettes (Namaste, Peace/V, I-Love-You, Hello/Open Hand, OK)
 * - Rich luminous saffron-amber, cosmic purple, neon magenta, and electric cyan aurora glow orbs that refract through glassmorphic cards
 * - Fine isometric cyber-matrix grid with high visibility
 */
export default function ProjectBackground({ theme = 'dark' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Standard 21 Hand Landmark Bones (MediaPipe topology)
    const BONES = [
      // Thumb
      [0, 1], [1, 2], [2, 3], [3, 4],
      // Index
      [0, 5], [5, 6], [6, 7], [7, 8],
      // Middle
      [0, 9], [9, 10], [10, 11], [11, 12],
      // Ring
      [0, 13], [13, 14], [14, 15], [15, 16],
      // Pinky
      [0, 17], [17, 18], [18, 19], [19, 20],
      // Palm Knuckle Connections
      [5, 9], [9, 13], [13, 17]
    ];

    // Base template coordinates for an open hand normalized (-1 to 1)
    const BASE_HAND = [
      { x: 0.0, y: 0.75 },   // 0: Wrist
      { x: -0.26, y: 0.52 }, // 1: Thumb CMC
      { x: -0.42, y: 0.32 }, // 2: Thumb MCP
      { x: -0.52, y: 0.12 }, // 3: Thumb IP
      { x: -0.58, y: -0.08 },// 4: Thumb Tip
      { x: -0.24, y: 0.05 }, // 5: Index MCP
      { x: -0.27, y: -0.25 },// 6: Index PIP
      { x: -0.29, y: -0.52 },// 7: Index DIP
      { x: -0.31, y: -0.78 },// 8: Index Tip
      { x: -0.04, y: 0.0 },  // 9: Middle MCP
      { x: -0.04, y: -0.32 },// 10: Middle PIP
      { x: -0.04, y: -0.62 },// 11: Middle DIP
      { x: -0.04, y: -0.88 },// 12: Middle Tip
      { x: 0.16, y: 0.05 },  // 13: Ring MCP
      { x: 0.18, y: -0.25 }, // 14: Ring PIP
      { x: 0.20, y: -0.52 }, // 15: Ring DIP
      { x: 0.22, y: -0.74 }, // 16: Ring Tip
      { x: 0.34, y: 0.15 },  // 17: Pinky MCP
      { x: 0.38, y: -0.10 }, // 18: Pinky PIP
      { x: 0.42, y: -0.32 }, // 19: Pinky DIP
      { x: 0.45, y: -0.54 }, // 20: Pinky Tip
    ];

    // 5 vibrant, clearly visible background hand tracking constellations
    const hands = [
      {
        cx: width * 0.12,
        cy: height * 0.28,
        scale: 155,
        vx: 0.22,
        vy: 0.15,
        angle: -0.22,
        color: '168, 85, 247', // Royal Purple
        pulseSpeed: 0.02,
        pulsePhase: 0
      },
      {
        cx: width * 0.88,
        cy: height * 0.30,
        scale: 165,
        vx: -0.20,
        vy: 0.12,
        angle: 0.25,
        color: '245, 158, 11', // Saffron Amber Gold
        pulseSpeed: 0.018,
        pulsePhase: 2.1
      },
      {
        cx: width * 0.28,
        cy: height * 0.82,
        scale: 145,
        vx: 0.15,
        vy: -0.18,
        angle: 0.12,
        color: '6, 182, 212', // Electric Cyan
        pulseSpeed: 0.024,
        pulsePhase: 4.2
      },
      {
        cx: width * 0.78,
        cy: height * 0.85,
        scale: 150,
        vx: -0.18,
        vy: -0.14,
        angle: -0.16,
        color: '236, 72, 153', // Neon Magenta Pink
        pulseSpeed: 0.02,
        pulsePhase: 1.4
      },
      {
        cx: width * 0.50,
        cy: height * 0.15,
        scale: 130,
        vx: 0.10,
        vy: 0.16,
        angle: 0.05,
        color: '16, 185, 129', // Emerald Mint
        pulseSpeed: 0.022,
        pulsePhase: 3.3
      }
    ];

    let t = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      t += 0.016;

      hands.forEach((hand) => {
        // Organic drift motion
        hand.cx += hand.vx;
        hand.cy += hand.vy;

        // Bounce gently inside viewport bounds
        if (hand.cx < 70 || hand.cx > width - 70) hand.vx *= -1;
        if (hand.cy < 80 || hand.cy > height - 80) hand.vy *= -1;

        const pulse = 0.5 + 0.5 * Math.sin(t * 1.8 + hand.pulsePhase);
        const currentScale = hand.scale * (0.95 + 0.12 * Math.sin(t + hand.pulsePhase));
        const rot = hand.angle + 0.12 * Math.sin(t * 0.9 + hand.pulsePhase);

        const cosR = Math.cos(rot);
        const sinR = Math.sin(rot);

        // Project 21 joints
        const projected = BASE_HAND.map((pt, i) => {
          // Add organic finger flex wave
          const wave = Math.sin(t * 2.2 + i * 0.45) * 0.09;
          const px = pt.x + wave;
          const py = pt.y + (pt.y < 0 ? wave * 1.8 : 0);

          const rx = px * cosR - py * sinR;
          const ry = px * sinR + py * cosR;

          return {
            x: hand.cx + rx * currentScale,
            y: hand.cy + ry * currentScale
          };
        });

        // 1. Draw Bones with high visibility, neon glow & gradients
        ctx.lineWidth = 3.0;
        BONES.forEach(([i, j]) => {
          const p1 = projected[i];
          const p2 = projected[j];
          const boneGrad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
          boneGrad.addColorStop(0, `rgba(${hand.color}, ${0.55 + 0.35 * pulse})`);
          boneGrad.addColorStop(1, `rgba(${hand.color}, ${0.35 + 0.35 * pulse})`);
          ctx.strokeStyle = boneGrad;
          ctx.shadowColor = `rgba(${hand.color}, 0.85)`;
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        });
        ctx.shadowBlur = 0; // reset

        // 2. Draw Joints (MediaPipe Landmark Nodes) - prominent and glowing
        projected.forEach((pt, i) => {
          const isTip = [4, 8, 12, 16, 20].includes(i);
          const isWrist = i === 0;
          const radius = isTip ? 6.0 : isWrist ? 5.0 : 4.0;
          const alpha = isTip ? 0.95 : 0.80 + 0.20 * pulse;

          // Glowing Outer Halo
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${hand.color}, ${0.30 + 0.25 * pulse})`;
          ctx.fill();

          // Joint Core with intense glow
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${hand.color}, ${alpha})`;
          ctx.shadowColor = `rgba(${hand.color}, 1.0)`;
          ctx.shadowBlur = isTip ? 20 : 12;
          ctx.fill();
          ctx.shadowBlur = 0; // reset

          // Bright center pinpoint for fingertips
          if (isTip) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 2.4, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
          }
        });
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isBright = theme === 'bright';

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden select-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* 1. Deep Base Ambient Atmosphere */}
      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          isBright
            ? 'bg-gradient-to-b from-slate-100 via-amber-50/70 to-purple-50/60'
            : 'bg-gradient-to-b from-[#050713] via-[#090d24] to-[#04050e]'
        }`}
      />

      {/* 2. Highly Visible Luminous Aurora Orbs (bathes background in rich vibrant lights) */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Saffron & Amber Sunlight Orb (Top-Right) */}
        <div
          className="absolute -top-20 -right-20 w-[680px] h-[680px] rounded-full blur-[90px] animate-pulse"
          style={{
            background: isBright
              ? 'radial-gradient(circle, rgba(245, 158, 11, 0.45) 0%, rgba(217, 119, 6, 0.22) 50%, transparent 70%)'
              : 'radial-gradient(circle, rgba(245, 158, 11, 0.42) 0%, rgba(217, 119, 6, 0.24) 45%, transparent 70%)',
            animationDuration: '6s'
          }}
        />

        {/* Royal Indian Purple & Violet Orb (Top-Left) */}
        <div
          className="absolute top-1/6 -left-20 w-[720px] h-[720px] rounded-full blur-[100px]"
          style={{
            background: isBright
              ? 'radial-gradient(circle, rgba(168, 85, 247, 0.40) 0%, rgba(147, 51, 234, 0.20) 50%, transparent 70%)'
              : 'radial-gradient(circle, rgba(168, 85, 247, 0.45) 0%, rgba(126, 34, 206, 0.28) 45%, transparent 70%)'
          }}
        />

        {/* Cyber Cyan AI Vision Orb (Bottom-Center) */}
        <div
          className="absolute -bottom-32 left-1/4 w-[760px] h-[760px] rounded-full blur-[110px]"
          style={{
            background: isBright
              ? 'radial-gradient(circle, rgba(6, 182, 212, 0.35) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(6, 182, 212, 0.38) 0%, rgba(37, 99, 235, 0.22) 50%, transparent 70%)'
          }}
        />

        {/* Magenta Accent Center Orb */}
        <div
          className="absolute top-1/2 right-1/4 w-[550px] h-[550px] rounded-full blur-[110px] opacity-75"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.32) 0%, transparent 65%)'
          }}
        />

        {/* Emerald & Mint Glow Orb (Bottom-Right) */}
        <div
          className="absolute -bottom-20 -right-20 w-[620px] h-[620px] rounded-full blur-[100px] opacity-75"
          style={{
            background: isBright
              ? 'radial-gradient(circle, rgba(16, 185, 129, 0.35) 0%, transparent 65%)'
              : 'radial-gradient(circle, rgba(16, 185, 129, 0.32) 0%, rgba(5, 150, 105, 0.18) 45%, transparent 70%)'
          }}
        />

        {/* Sunset Coral & Tangerine Glow Orb (Center-Left) */}
        <div
          className="absolute top-1/2 -left-28 w-[580px] h-[580px] rounded-full blur-[105px] opacity-70"
          style={{
            background: 'radial-gradient(circle, rgba(255, 107, 107, 0.32) 0%, rgba(249, 115, 22, 0.18) 50%, transparent 70%)'
          }}
        />
      </div>

      {/* 3. Tech Dot-Matrix Grid with Subtle Radial Mask */}
      <div
        className="absolute inset-0 opacity-[0.70]"
        style={{
          backgroundImage: isBright
            ? 'radial-gradient(rgba(100, 116, 139, 0.35) 1.5px, transparent 1.5px)'
            : 'radial-gradient(rgba(255, 255, 255, 0.24) 1.5px, transparent 1.5px)',
          backgroundSize: '30px 30px',
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 60%, rgba(0,0,0,0.5) 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 60%, rgba(0,0,0,0.5) 100%)'
        }}
      />

      {/* 4. Canvas Layer: 21-Point MediaPipe Hand Tracking Constellations (High Visibility) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-100"
      />

      {/* 5. Distinctly Visible Floating Project Watermarks: ISL Hand Gestures & Typography */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        
        {/* Namaste Joined Hands Silhouette (Top Left - High Visibility) */}
        <div
          className="absolute top-12 left-6 opacity-[0.38] transform -rotate-6 select-none animate-float"
          style={{ filter: isBright ? 'invert(0.85)' : 'none' }}
        >
          <svg width="260" height="260" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.8" className="text-amber-400">
            {/* Joined Namaste Palms */}
            <path d="M50 8 C47 22 38 42 36 64 C34 82 46 94 50 94 C54 94 66 82 64 64 C62 42 53 22 50 8 Z" fill="rgba(245, 158, 11, 0.28)" />
            {/* Left Thumb & Wrist */}
            <path d="M36 64 C28 54 18 48 14 58 C10 68 24 82 36 88" strokeWidth="2.5" />
            {/* Right Thumb & Wrist */}
            <path d="M64 64 C72 54 82 48 86 58 C90 68 76 82 64 88" strokeWidth="2.5" />
            {/* Spiritual Rays / Namaste Halo */}
            <circle cx="50" cy="50" r="44" stroke="currentColor" strokeDasharray="4 6" opacity="0.8" />
          </svg>
          <div className="text-center text-xs font-black tracking-widest text-amber-300 uppercase mt-1 drop-shadow-md">
            नमस्ते • Namaste
          </div>
        </div>

        {/* Peace / Letter V Sign Silhouette (Top Right - High Visibility) */}
        <div
          className="absolute top-24 right-10 opacity-[0.35] transform rotate-12 select-none animate-float"
          style={{ animationDelay: '1.5s', filter: isBright ? 'invert(0.85)' : 'none' }}
        >
          <svg width="210" height="210" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.8" className="text-purple-400">
            {/* Index Finger */}
            <path d="M42 60 L38 20 C38 15 45 15 45 20 L47 50" strokeWidth="2.8" fill="rgba(168, 85, 247, 0.25)" />
            {/* Middle Finger */}
            <path d="M53 50 L55 18 C55 13 62 13 62 18 L60 60" strokeWidth="2.8" fill="rgba(168, 85, 247, 0.25)" />
            {/* Folded Fingers & Palm */}
            <path d="M36 62 C34 75 42 88 52 88 C62 88 68 75 66 62 Z" fill="rgba(168, 85, 247, 0.15)" />
            {/* Folded Thumb */}
            <path d="M36 66 C32 68 32 75 38 76 L52 74" />
          </svg>
          <div className="text-center text-[11px] font-black tracking-widest text-purple-300 uppercase drop-shadow-md">
            ISL • Peace (V)
          </div>
        </div>

        {/* I-Love-You Sign Silhouette (Bottom Left - High Visibility) */}
        <div
          className="absolute bottom-20 left-12 opacity-[0.38] transform -rotate-12 select-none animate-float"
          style={{ animationDelay: '2.8s', filter: isBright ? 'invert(0.85)' : 'none' }}
        >
          <svg width="220" height="220" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.8" className="text-cyan-400">
            {/* Thumb extended */}
            <path d="M38 66 L20 54 C16 50 12 56 16 60 L34 76" strokeWidth="2.5" fill="rgba(6, 182, 212, 0.25)" />
            {/* Index Finger extended */}
            <path d="M40 60 L36 18 C36 13 43 13 43 18 L46 54" strokeWidth="2.8" fill="rgba(6, 182, 212, 0.25)" />
            {/* Pinky extended */}
            <path d="M62 60 L68 28 C68 23 75 23 75 28 L70 64" strokeWidth="2.8" fill="rgba(6, 182, 212, 0.25)" />
            {/* Middle and Ring folded */}
            <path d="M46 54 C46 44 60 44 60 54 L62 62" strokeWidth="2.5" fill="rgba(6, 182, 212, 0.12)" />
            {/* Palm base */}
            <path d="M34 74 C36 86 48 92 56 92 C66 92 72 82 68 64" fill="rgba(6, 182, 212, 0.15)" />
          </svg>
          <div className="text-center text-[11px] font-black tracking-widest text-cyan-300 uppercase drop-shadow-md">
            प्यार • I Love You
          </div>
        </div>

        {/* Hello / Open Palm Gesture Silhouette (Center Left) */}
        <div
          className="absolute top-1/2 left-8 -translate-y-1/2 opacity-[0.32] transform rotate-6 select-none animate-float"
          style={{ animationDelay: '3.5s', filter: isBright ? 'invert(0.85)' : 'none' }}
        >
          <svg width="180" height="180" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-400">
            {/* 5 Open Fingers */}
            <path d="M32 55 L22 42 C18 38 24 32 28 36 L36 50" fill="rgba(16, 185, 129, 0.2)" />
            <path d="M38 48 L36 18 C36 12 43 12 43 18 L44 48" fill="rgba(16, 185, 129, 0.2)" />
            <path d="M47 48 L50 14 C50 8 57 8 57 14 L56 48" fill="rgba(16, 185, 129, 0.2)" />
            <path d="M59 48 L64 20 C64 14 71 14 71 20 L68 50" fill="rgba(16, 185, 129, 0.2)" />
            <path d="M70 52 L78 32 C78 26 84 28 84 34 L78 62" fill="rgba(16, 185, 129, 0.2)" />
            <path d="M32 55 C32 78 44 90 56 90 C68 90 78 78 78 62" fill="rgba(16, 185, 129, 0.15)" />
          </svg>
          <div className="text-center text-[10px] font-black tracking-widest text-emerald-300 uppercase drop-shadow-md">
            नमस्ते • Hello
          </div>
        </div>

        {/* Prominent ISL Branding Typography Watermark (Bottom Right - High Visibility) */}
        <div className="absolute bottom-16 right-8 opacity-[0.30] text-right font-black font-heading select-none leading-none">
          <div className="text-[150px] tracking-tighter text-purple-400 font-extrabold drop-shadow-2xl">
            ISL
          </div>
          <div className="text-2xl sm:text-3xl tracking-widest text-amber-400 font-bold -mt-4 drop-shadow-lg">
            भारतीय सांकेतिक भाषा
          </div>
          <div className="text-xs sm:text-sm tracking-widest text-cyan-300 mt-1 uppercase font-semibold">
            Indian Sign Language AI Studio
          </div>
        </div>

        {/* Geometric Sacred Mandala Accent Ring (Center Right) */}
        <div className="absolute top-1/3 -right-20 w-[460px] h-[460px] rounded-full border-2 border-purple-500/[0.22] animate-spin-slow pointer-events-none flex items-center justify-center">
          <div className="w-[340px] h-[340px] rounded-full border-2 border-amber-500/[0.20] border-dashed" />
          <div className="w-[240px] h-[240px] rounded-full border border-cyan-500/[0.18]" />
        </div>
      </div>
    </div>
  );
}
