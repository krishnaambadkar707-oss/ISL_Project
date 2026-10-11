import React, { useEffect, useRef, useState } from 'react';
import { 
  Camera, 
  CameraOff, 
  CheckCircle2, 
  RefreshCw, 
  ShieldCheck, 
  Sparkles, 
  Eye, 
  EyeOff,
  Hand,
  Layers,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/soundEffects';
import { getSignImage } from '../data/signImages';

export default function CameraPractice({ currentSign, onMasteredSign, onFeedBack }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [matchStatus, setMatchStatus] = useState({ 
    score: 0, 
    status: 'idle', 
    message: 'Position your hand(s) clearly in front of the camera' 
  });
  const [detectedHandCount, setDetectedHandCount] = useState(0);
  const [showGhostGuide, setShowGhostGuide] = useState(true);
  const cameraUtilsRef = useRef(null);
  const handsInstanceRef = useRef(null);
  const lastSuccessTimeRef = useRef(0);
  const isSuccessRef = useRef(false);

  const isTwoHandedSign = Boolean(currentSign?.isTwoHanded);

  const startCamera = async () => {
    try {
      setIsCameraActive(true);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      if (window.Hands) {
        const hands = new window.Hands({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
        });

        // Track up to 2 hands for authentic Indian Sign Language
        hands.setOptions({
          maxNumHands: 2,
          modelComplexity: 1,
          minDetectionConfidence: 0.60,
          minTrackingConfidence: 0.60
        });

        hands.onResults(onResults);
        handsInstanceRef.current = hands;

        if (window.Camera && videoRef.current) {
          const camera = new window.Camera(videoRef.current, {
            onFrame: async () => {
              if (videoRef.current && handsInstanceRef.current) {
                await handsInstanceRef.current.send({ image: videoRef.current });
              }
            },
            width: 640,
            height: 480
          });
          camera.start();
          cameraUtilsRef.current = camera;
        }
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setMatchStatus({
        score: 0,
        status: 'error',
        message: 'Camera unavailable. Please check permissions or use Voice/Text mode!'
      });
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    if (cameraUtilsRef.current) {
      cameraUtilsRef.current.stop();
    }
    setIsCameraActive(false);
    setDetectedHandCount(0);
  };

  const onResults = (results) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const handsList = results.multiHandLandmarks || [];
    const handednessList = results.multiHandedness || [];
    setDetectedHandCount(handsList.length);

    // 1. Draw Ghost Silhouette Guide Overlay (if toggled on)
    if (showGhostGuide && currentSign) {
      drawGhostSilhouetteGuide(ctx, currentSign, canvas.width, canvas.height, isSuccessRef.current);
    }

    // 2. Process Detected Hands
    if (handsList.length > 0) {
      // Draw skeleton connections & nodes for each detected hand with color coding
      handsList.forEach((landmarks, idx) => {
        const isSecondary = idx > 0;
        const handedness = handednessList[idx]?.label || (isSecondary ? 'Left' : 'Right');
        drawConnections(ctx, landmarks, canvas.width, canvas.height, isSecondary);
        drawLandmarkNodes(ctx, landmarks, canvas.width, canvas.height, isSecondary);
        drawHandBadge(ctx, landmarks, canvas.width, canvas.height, handedness, isSecondary);
      });

      if (currentSign && currentSign.recognize) {
        let isMatched = false;

        if (isTwoHandedSign) {
          if (handsList.length < 2) {
            setMatchStatus({
              score: 50,
              status: 'trying',
              message: '👐 Two-handed ISL sign! Raise your second hand into view.'
            });
            isSuccessRef.current = false;
            ctx.restore();
            return;
          } else {
            // Both hands visible: evaluate two-handed recognizer
            isMatched = currentSign.recognize(handsList[0], handsList[1], handsList);
          }
        } else {
          // Single-hand sign: works with either right hand or left hand
          isMatched = currentSign.recognize(handsList[0]) || (handsList[1] && currentSign.recognize(handsList[1]));
        }

        const now = Date.now();

        if (isMatched) {
          isSuccessRef.current = true;
          setMatchStatus({
            score: 96,
            status: 'success',
            message: `Awesome job! Perfect "${currentSign.sign}" posture detected! 🌟`
          });

          // Debounce success audio & confetti trigger (every 3 seconds max)
          if (now - lastSuccessTimeRef.current > 3000) {
            lastSuccessTimeRef.current = now;
            soundFx.playSuccessChime();

            confetti({
              particleCount: 55,
              spread: 65,
              origin: { y: 0.65 }
            });

            if (onMasteredSign) {
              onMasteredSign(currentSign.id);
            }
            if (onFeedBack) {
              onFeedBack(`Spot on! Your ${currentSign.sign} sign is clear and well-formed! 🎉`);
            }
          }
        } else {
          isSuccessRef.current = false;
          setMatchStatus({
            score: 65,
            status: 'trying',
            message: currentSign.tips || (isTwoHandedSign ? 'Adjust distance between hands to match the guide.' : 'Align fingers inside the guide silhouette.')
          });
        }
      }
    } else {
      isSuccessRef.current = false;
      setMatchStatus({
        score: 0,
        status: 'idle',
        message: isTwoHandedSign 
          ? 'Raise both hands into camera view to practice this sign!'
          : 'Raise your hand into camera view to practice!'
      });
    }

    ctx.restore();
  };

  // --- DRAW GHOST SILHOUETTE GUIDE ---
  const drawGhostSilhouetteGuide = (ctx, sign, width, height, isSuccess) => {
    ctx.save();

    const guideColor = isSuccess ? 'rgba(16, 185, 129, 0.85)' : 'rgba(56, 189, 248, 0.5)';
    const glowColor = isSuccess ? '#10b981' : '#38bdf8';
    const jointColor = isSuccess ? 'rgba(52, 211, 153, 0.9)' : 'rgba(192, 132, 252, 0.7)';

    ctx.strokeStyle = guideColor;
    ctx.fillStyle = jointColor;
    ctx.lineWidth = 2.5;
    ctx.setLineDash([6, 5]);
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 12;

    if (sign.isTwoHanded) {
      // Draw Dual Ghost Hands (Two-Handed ISL Sign)
      drawSingleGhostHand(ctx, width * 0.35, height * 0.56, width, height, sign, true, guideColor, jointColor);
      drawSingleGhostHand(ctx, width * 0.65, height * 0.56, width, height, sign, false, guideColor, jointColor);

      // Guide label for two hands
      ctx.setLineDash([]);
      ctx.font = 'bold 11px Outfit, Inter, sans-serif';
      ctx.fillStyle = guideColor;
      ctx.textAlign = 'center';
      ctx.fillText(`👐 ISL 2-HAND GUIDE: "${sign.sign}"`, width * 0.5, height * 0.22);
    } else {
      // Draw Single Center Ghost Hand
      drawSingleGhostHand(ctx, width * 0.5, height * 0.55, width, height, sign, false, guideColor, jointColor);

      // Guide label for single hand
      ctx.setLineDash([]);
      ctx.font = 'bold 11px Outfit, Inter, sans-serif';
      ctx.fillStyle = guideColor;
      ctx.textAlign = 'center';
      ctx.fillText(`👻 GHOST GUIDE: "${sign.sign}"`, width * 0.5, height * 0.22);
    }

    ctx.restore();
  };

  const drawSingleGhostHand = (ctx, originX, originY, width, height, sign, isLeft, strokeColor, fillColor) => {
    const scale = Math.min(width, height) * 0.42;
    const signName = (sign?.sign || '').toUpperCase();

    // Determine finger extensions based on current sign category/type
    const isFistSign = ['A', 'S', 'E', 'M', 'N', 'T', 'SORRY', 'YES'].includes(signName);
    const isOpenHand = ['B', '5', 'HELLO', 'PLEASE', 'THANK YOU', 'NAMASTE'].includes(signName);
    const isIndexOnly = ['D', '1', 'LEARN ISL'].includes(signName);
    const isVictory = ['V', '2', 'K'].includes(signName);
    const isILY = signName === 'I LOVE YOU';

    // Wrist
    const wrist = { x: originX, y: originY + scale * 0.45 };

    // Knuckles
    const knuckles = [
      { x: originX + (isLeft ? 0.25 : -0.25) * scale, y: originY + 0.15 * scale }, // Thumb CMC
      { x: originX + (isLeft ? 0.15 : -0.15) * scale, y: originY - 0.05 * scale }, // Index MCP
      { x: originX + (isLeft ? 0.05 : -0.05) * scale, y: originY - 0.08 * scale }, // Middle MCP
      { x: originX + (isLeft ? -0.05 : 0.05) * scale, y: originY - 0.05 * scale }, // Ring MCP
      { x: originX + (isLeft ? -0.15 : 0.15) * scale, y: originY - 0.02 * scale }, // Pinky MCP
    ];

    // Tips calculation
    const tips = knuckles.map((k, idx) => {
      let ext = 1.0;
      if (idx === 0) {
        // Thumb
        ext = isFistSign ? 0.4 : 0.85;
        return { x: k.x + (isLeft ? 0.12 : -0.12) * scale * ext, y: k.y - 0.25 * scale * ext };
      }
      if (isOpenHand) ext = 1.0;
      else if (isFistSign) ext = 0.25;
      else if (isIndexOnly) ext = idx === 1 ? 1.0 : 0.25;
      else if (isVictory) ext = (idx === 1 || idx === 2) ? 1.0 : 0.25;
      else if (isILY) ext = (idx === 1 || idx === 4) ? 1.0 : 0.25;
      else ext = 0.7; // general default

      return { x: k.x, y: k.y - 0.38 * scale * ext };
    });

    // Draw palm boundary guide
    ctx.beginPath();
    ctx.moveTo(wrist.x, wrist.y);
    knuckles.forEach(k => ctx.lineTo(k.x, k.y));
    ctx.closePath();
    ctx.stroke();

    // Draw finger rays & tip nodes
    knuckles.forEach((k, idx) => {
      const tip = tips[idx];
      ctx.beginPath();
      ctx.moveTo(k.x, k.y);
      ctx.lineTo(tip.x, tip.y);
      ctx.stroke();

      // Finger tip circle
      ctx.beginPath();
      ctx.arc(tip.x, tip.y, 4.5, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Wrist node
    ctx.beginPath();
    ctx.arc(wrist.x, wrist.y, 5.5, 0, 2 * Math.PI);
    ctx.fill();
  };

  // --- DRAW USER HAND CONNECTIONS & NODES ---
  const drawConnections = (ctx, landmarks, width, height, isSecondary) => {
    const connections = [
      [0,1],[1,2],[2,3],[3,4],
      [0,5],[5,6],[6,7],[7,8],
      [5,9],[9,10],[10,11],[11,12],
      [9,13],[13,14],[14,15],[15,16],
      [13,17],[17,18],[18,19],[19,20],[0,17]
    ];

    ctx.strokeStyle = isSecondary ? '#06b6d4' : '#f59e0b';
    ctx.lineWidth = 3.5;
    ctx.shadowColor = isSecondary ? '#06b6d4' : '#f59e0b';
    ctx.shadowBlur = 10;
    ctx.setLineDash([]);

    connections.forEach(([i, j]) => {
      const p1 = landmarks[i];
      const p2 = landmarks[j];
      ctx.beginPath();
      ctx.moveTo(p1.x * width, p1.y * height);
      ctx.lineTo(p2.x * width, p2.y * height);
      ctx.stroke();
    });
  };

  const drawLandmarkNodes = (ctx, landmarks, width, height, isSecondary) => {
    landmarks.forEach((p, idx) => {
      const isTip = [4, 8, 12, 16, 20].includes(idx);
      ctx.beginPath();
      ctx.arc(p.x * width, p.y * height, isTip ? 6 : 4, 0, 2 * Math.PI);
      ctx.fillStyle = isTip 
        ? (isSecondary ? '#38bdf8' : '#ec4899') 
        : (isSecondary ? '#0891b2' : '#a855f7');
      ctx.shadowColor = isSecondary ? '#38bdf8' : '#a855f7';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.8;
      ctx.stroke();
    });
  };

  const drawHandBadge = (ctx, landmarks, width, height, label, isSecondary) => {
    const wrist = landmarks[0];
    if (!wrist) return;

    const x = wrist.x * width;
    const y = Math.min(height - 15, wrist.y * height + 24);

    ctx.save();
    ctx.font = 'bold 10px Inter, sans-serif';
    ctx.fillStyle = isSecondary ? '#06b6d4' : '#f59e0b';
    ctx.textAlign = 'center';
    ctx.shadowColor = '#000000';
    ctx.shadowBlur = 4;
    ctx.fillText(`${label} Hand`, x, y);
    ctx.restore();
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="glass-card relative p-5 flex flex-col items-center justify-between w-full h-full min-h-[480px]">
      {/* Top Header & HUD Badges */}
      <div className="w-full flex flex-wrap items-center justify-between gap-2.5 mb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-xs text-slate-300 font-medium">ISL Vision Engine (100% On-Device AI)</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Sign Type Badge */}
          <span className={`badge text-[11px] font-bold ${isTwoHandedSign ? 'badge-purple' : 'badge-gold'}`}>
            {isTwoHandedSign ? '👐 2-Handed ISL Sign' : '🖐️ 1-Hand Sign'}
          </span>

          {/* Ghost Guide Toggle Button */}
          <button
            onClick={() => setShowGhostGuide(!showGhostGuide)}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
              showGhostGuide
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-sm shadow-cyan-950/40'
                : 'bg-slate-900/60 text-slate-400 border-white/10 hover:text-white'
            }`}
            title="Toggle Ghost Guide Overlay"
          >
            {showGhostGuide ? <Eye className="w-3.5 h-3.5 text-cyan-400" /> : <EyeOff className="w-3.5 h-3.5" />}
            Ghost Guide {showGhostGuide ? 'ON' : 'OFF'}
          </button>

          {isCameraActive && (
            <span className="badge badge-green flex items-center gap-1.5 py-1 px-2.5 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Hands Detected: {detectedHandCount}/2
            </span>
          )}
        </div>
      </div>

      {/* Camera Video / Canvas Stage */}
      <div className="relative w-full aspect-video bg-slate-950/90 rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center shadow-2xl">
        {!isCameraActive ? (
          <div className="flex flex-col items-center justify-center p-6 text-center gap-3">
            <div className="p-4 bg-gradient-to-tr from-amber-500/20 via-purple-500/20 to-cyan-500/20 text-amber-400 rounded-2xl border border-amber-500/30">
              <Camera className="w-8 h-8 animate-bounce" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100 font-heading">Live Camera Practice</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm leading-relaxed">
                Position your hand(s) in front of the webcam. Hana tracks both hands with real-time neon ghost guide alignment!
              </p>
            </div>
            <button onClick={startCamera} className="btn btn-gold mt-2">
              <Camera className="w-4 h-4" />
              Start Camera Practice
            </button>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
              playsInline
              muted
            />
            <canvas
              ref={canvasRef}
              width={640}
              height={480}
              className="absolute inset-0 w-full h-full object-cover scale-x-[-1] pointer-events-none"
            />

            {/* Corner PIP Card: Target Sign Reference */}
            {currentSign && (
              <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md border border-white/15 p-2 rounded-xl flex items-center gap-2 max-w-[200px] shadow-lg pointer-events-none">
                {(() => {
                  const targetPipImg = getSignImage(currentSign);
                  return targetPipImg ? (
                    <img
                      src={targetPipImg}
                      alt={currentSign.sign}
                      className="w-9 h-9 object-cover rounded-lg border border-white/10 bg-slate-950"
                    />
                  ) : null;
                })()}
                <div className="overflow-hidden">
                  <div className="text-[10px] text-amber-400 uppercase font-bold tracking-wider">Target Sign</div>
                  <div className="text-xs font-bold text-white truncate">{currentSign.sign}</div>
                </div>
              </div>
            )}

            {/* Stop Camera Button */}
            <button
              onClick={stopCamera}
              className="absolute top-3 right-3 p-2 bg-slate-900/80 hover:bg-rose-600 text-slate-200 hover:text-white rounded-full transition-all border border-white/10 backdrop-blur-md shadow-lg"
              title="Stop Camera"
            >
              <CameraOff className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Bottom Match Status Card */}
      {isCameraActive && (
        <div className="w-full mt-3 p-3.5 bg-slate-900/90 border border-white/10 rounded-2xl flex items-center gap-3 backdrop-blur-md">
          {matchStatus.status === 'success' ? (
            <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl">
              <CheckCircle2 className="w-5 h-5 animate-pulse" />
            </div>
          ) : matchStatus.status === 'trying' ? (
            <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl">
              <RefreshCw className="w-5 h-5 animate-spin" />
            </div>
          ) : (
            <div className="p-2.5 bg-purple-500/20 text-purple-400 rounded-xl">
              <Sparkles className="w-5 h-5" />
            </div>
          )}

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200">
                {currentSign ? `Target: Sign "${currentSign.sign}" — ${currentSign.title}` : 'Hand Gesture Recognition'}
              </span>
              {matchStatus.score > 0 && (
                <span className="text-xs font-mono font-bold text-amber-400">
                  Accuracy: {matchStatus.score}%
                </span>
              )}
            </div>
            <p className="text-xs text-slate-300 font-medium mt-0.5 leading-snug">
              {matchStatus.message}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
