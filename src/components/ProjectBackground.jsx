import React, { useEffect, useRef } from 'react';

/**
 * ProjectBackground
 * Dedicated immersive background for the Indian Sign Language (ISL) Companion.
 * Features:
 * - Animated MediaPipe 21-point hand tracking constellation mesh (canvas)
 * - Floating ISL gesture watermarks (Namaste, Fingerspelling, AI Vision nodes)
 * - Deep multi-layered glowing aurora orbs (Saffron Amber, Cosmic Purple, Electric Cyan)
 * - Cybernetic dot-matrix grid with subtle radial illumination
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
      { x: 0.0, y: 0.8 },   // 0: Wrist
      { x: -0.28, y: 0.55 }, // 1: Thumb CMC
      { x: -0.42, y: 0.35 }, // 2: Thumb MCP
      { x: -0.52, y: 0.15 }, // 3: Thumb IP
      { x: -0.58, y: -0.05 },// 4: Thumb Tip
      { x: -0.25, y: 0.05 }, // 5: Index MCP
      { x: -0.28, y: -0.25 },// 6: Index PIP
      { x: -0.30, y: -0.50 },// 7: Index DIP
      { x: -0.32, y: -0.75 },// 8: Index Tip
      { x: -0.05, y: 0.0 },  // 9: Middle MCP
      { x: -0.05, y: -0.32 },// 10: Middle PIP
      { x: -0.05, y: -0.60 },// 11: Middle DIP
      { x: -0.05, y: -0.85 },// 12: Middle Tip
      { x: 0.15, y: 0.05 },  // 13: Ring MCP
      { x: 0.18, y: -0.25 }, // 14: Ring PIP
      { x: 0.20, y: -0.50 }, // 15: Ring DIP
      { x: 0.22, y: -0.72 }, // 16: Ring Tip
      { x: 0.32, y: 0.15 },  // 17: Pinky MCP
      { x: 0.38, y: -0.10 }, // 18: Pinky PIP
      { x: 0.42, y: -0.32 }, // 19: Pinky DIP
      { x: 0.45, y: -0.52 }, // 20: Pinky Tip
    ];

    // Create 3 floating background hand constellations
    const hands = [
      {
        cx: width * 0.12,
        cy: height * 0.35,
        scale: 130,
        vx: 0.15,
        vy: 0.1,
        angle: -0.15,
        color: 'rgba(168, 85, 247, ', // Purple
        pulseSpeed: 0.02,
        pulsePhase: 0
      },
      {
        cx: width * 0.88,
        cy: height * 0.42,
        scale: 145,
        vx: -0.12,
        vy: 0.08,
        angle: 0.2,
        color: 'rgba(245, 158, 11, ', // Saffron Gold
        pulseSpeed: 0.018,
        pulsePhase: 2.1
      },
      {
        cx: width * 0.5,
        cy: height * 0.85,
        scale: 110,
        vx: 0.08,
        vy: -0.12,
        angle: -0.05,
        color: 'rgba(6, 182, 212, ', // Cyan
        pulseSpeed: 0.025,
        pulsePhase: 4.2
      }
    ];

    let t = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      t += 0.015;

      hands.forEach((hand) => {
        // Drift motion
        hand.cx += hand.vx;
        hand.cy += hand.vy;

        // Bounce gently inside padding
        if (hand.cx < 80 || hand.cx > width - 80) hand.vx *= -1;
        if (hand.cy < 100 || hand.cy > height - 100) hand.vy *= -1;

        const pulse = 0.5 + 0.5 * Math.sin(t * 1.5 + hand.pulsePhase);
        const currentScale = hand.scale * (0.95 + 0.08 * Math.sin(t + hand.pulsePhase));
        const rot = hand.angle + 0.08 * Math.sin(t * 0.8 + hand.pulsePhase);

        const cosR = Math.cos(rot);
        const sinR = Math.sin(rot);

        // Project 21 joints
        const projected = BASE_HAND.map((pt, i) => {
          // Add organic finger flex wave
          const wave = Math.sin(t * 2 + i * 0.4) * 0.06;
          const px = pt.x + wave;
          const py = pt.y + (pt.y < 0 ? wave * 1.5 : 0);

          const rx = px * cosR - py * sinR;
          const ry = px * sinR + py * cosR;

          return {
            x: hand.cx + rx * currentScale,
            y: hand.cy + ry * currentScale
          };
        });

        // Draw Bones (Connecting joints)
        ctx.lineWidth = 1.6;
        BONES.forEach(([i, j]) => {
          const p1 = projected[i];
          const p2 = projected[j];
          const boneGrad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
          boneGrad.addColorStop(0, `${hand.color}${0.12 + 0.15 * pulse})`);
          boneGrad.addColorStop(1, `${hand.color}${0.05 + 0.08 * pulse})`);
          ctx.strokeStyle = boneGrad;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        });

        // Draw Joints (MediaPipe Landmarks)
        projected.forEach((pt, i) => {
          const isTip = [4, 8, 12, 16, 20].includes(i);
          const radius = isTip ? 3.5 : 2.2;
          const alpha = isTip ? 0.45 + 0.35 * pulse : 0.25 + 0.2 * pulse;

          // Glowing Joint Core
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `${hand.color}${alpha})`;
          ctx.shadowColor = `${hand.color}0.8)`;
          ctx.shadowBlur = isTip ? 10 : 4;
          ctx.fill();
          ctx.shadowBlur = 0; // reset
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
            ? 'bg-gradient-to-b from-slate-50 via-slate-100 to-amber-50/40'
            : 'bg-gradient-to-b from-[#060814] via-[#090d1f] to-[#04060d]'
        }`}
      />

      {/* 2. Fluid Ambient Glow Orbs */}
      <div className="absolute inset-0 overflow-hidden opacity-70">
        {/* Saffron & Amber Sunlight Orb (Top-Right) */}
        <div
          className="absolute -top-32 -right-32 w-[550px] h-[550px] rounded-full blur-[110px] animate-pulse"
          style={{
            background: isBright
              ? 'radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(245, 158, 11, 0.18) 0%, rgba(217, 119, 6, 0.08) 50%, transparent 70%)',
            animationDuration: '8s'
          }}
        />

        {/* Royal Indian Purple & Magenta Orb (Top-Left) */}
        <div
          className="absolute top-1/4 -left-36 w-[600px] h-[600px] rounded-full blur-[130px]"
          style={{
            background: isBright
              ? 'radial-gradient(circle, rgba(168, 85, 247, 0.20) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(147, 51, 234, 0.22) 0%, rgba(219, 39, 119, 0.10) 50%, transparent 70%)'
          }}
        />

        {/* Cyber Cyan AI Vision Orb (Bottom-Center) */}
        <div
          className="absolute -bottom-48 left-1/3 w-[650px] h-[650px] rounded-full blur-[140px]"
          style={{
            background: isBright
              ? 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(6, 182, 212, 0.14) 0%, rgba(59, 130, 246, 0.06) 50%, transparent 70%)'
          }}
        />
      </div>

      {/* 3. Tech Dot-Matrix Grid with Subtle Radial Mask */}
      <div
        className="absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage: isBright
            ? 'radial-gradient(rgba(100, 116, 139, 0.20) 1px, transparent 1px)'
            : 'radial-gradient(rgba(255, 255, 255, 0.12) 1.2px, transparent 1.2px)',
          backgroundSize: '36px 36px',
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0.3) 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0.3) 90%)'
        }}
      />

      {/* 4. Canvas Layer: 21-Point MediaPipe Hand Tracking Constellations */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-80"
      />

      {/* 5. Floating Project Watermarks: Stylized ISL Hand Gesture Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Namaste Joined Hands Watermark (Top Left) */}
        <div
          className="absolute top-20 left-10 opacity-[0.045] transform -rotate-12 select-none"
          style={{ filter: isBright ? 'invert(1)' : 'none' }}
        >
          <svg width="220" height="220" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 10 C48 20 40 40 38 60 C36 80 48 95 50 95 C52 95 64 80 62 60 C60 40 52 20 50 10 Z M38 60 C30 50 20 45 15 55 C10 65 25 80 38 85 Z M62 60 C70 50 80 45 85 55 C90 65 75 80 62 85 Z" />
          </svg>
        </div>

        {/* ISL Letters Floating Watermark Badges */}
        <div className="absolute bottom-32 right-12 opacity-[0.04] text-right font-black font-heading select-none leading-none">
          <div className="text-[120px] tracking-tighter">ISL</div>
          <div className="text-xl tracking-widest text-amber-400">भारतीय सांकेतिक भाषा</div>
        </div>

        {/* Subtle Geometric Sacred Mandala Accent Ring (Center Right) */}
        <div className="absolute top-1/3 -right-24 w-96 h-96 rounded-full border border-purple-500/[0.07] animate-spin-slow pointer-events-none flex items-center justify-center">
          <div className="w-72 h-72 rounded-full border border-amber-500/[0.06] border-dashed" />
          <div className="w-48 h-48 rounded-full border border-cyan-500/[0.05]" />
        </div>
      </div>
    </div>
  );
}
