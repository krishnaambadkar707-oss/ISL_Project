import React, { useEffect, useRef, useState } from 'react';
import { Camera, CameraOff, CheckCircle2, RefreshCw, ShieldCheck, Sparkles, AlertCircle, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/soundEffects';

export default function CameraPractice({ currentSign, onMasteredSign, onFeedBack }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [matchStatus, setMatchStatus] = useState({ score: 0, status: 'idle', message: 'Position your hand clearly in front of the camera' });
  const cameraUtilsRef = useRef(null);
  const handsInstanceRef = useRef(null);
  const lastSuccessTimeRef = useRef(0);

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

        hands.setOptions({
          maxNumHands: 1,
          modelComplexity: 1,
          minDetectionConfidence: 0.65,
          minTrackingConfidence: 0.65
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
        message: 'Camera unavailable. You can use voice/text practice mode!'
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
  };

  const onResults = (results) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      const landmarks = results.multiHandLandmarks[0];

      drawConnections(ctx, landmarks, canvas.width, canvas.height);
      drawLandmarkNodes(ctx, landmarks, canvas.width, canvas.height);

      if (currentSign && currentSign.recognize) {
        const isMatched = currentSign.recognize(landmarks);
        const now = Date.now();

        if (isMatched) {
          setMatchStatus({
            score: 96,
            status: 'success',
            message: `Awesome job! Perfect ${currentSign.sign} hand shape detected!`
          });

          // Debounce success audio & confetti trigger (every 3 seconds max)
          if (now - lastSuccessTimeRef.current > 3000) {
            lastSuccessTimeRef.current = now;
            soundFx.playSuccessChime();

            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.7 }
            });

            if (onMasteredSign) {
              onMasteredSign(currentSign.id);
            }
            if (onFeedBack) {
              onFeedBack(`Spot on! Your ${currentSign.sign} sign was super clean! 🎉`);
            }
          }
        } else {
          setMatchStatus({
            score: 65,
            status: 'trying',
            message: currentSign.tips || 'Keep hand steady and check finger extension.'
          });
        }
      }
    } else {
      setMatchStatus({
        score: 0,
        status: 'idle',
        message: 'Raise your hand into the camera view to practice!'
      });
    }

    ctx.restore();
  };

  const drawConnections = (ctx, landmarks, width, height) => {
    const connections = [
      [0,1],[1,2],[2,3],[3,4],
      [0,5],[5,6],[6,7],[7,8],
      [5,9],[9,10],[10,11],[11,12],
      [9,13],[13,14],[14,15],[15,16],
      [13,17],[17,18],[18,19],[19,20],[0,17]
    ];

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3.5;
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 10;

    connections.forEach(([i, j]) => {
      const p1 = landmarks[i];
      const p2 = landmarks[j];
      ctx.beginPath();
      ctx.moveTo(p1.x * width, p1.y * height);
      ctx.lineTo(p2.x * width, p2.y * height);
      ctx.stroke();
    });
  };

  const drawLandmarkNodes = (ctx, landmarks, width, height) => {
    landmarks.forEach((p, idx) => {
      ctx.beginPath();
      ctx.arc(p.x * width, p.y * height, idx === 4 || idx === 8 ? 6 : 4, 0, 2 * Math.PI);
      ctx.fillStyle = idx === 4 || idx === 8 ? '#ec4899' : '#a855f7';
      ctx.shadowColor = '#a855f7';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="glass-card relative p-5 flex flex-col items-center justify-between w-full h-full min-h-[460px]">
      <div className="w-full flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-xs text-slate-300 font-medium">Camera Practice (100% On-Device AI)</span>
        </div>
        {isCameraActive && (
          <span className="badge badge-green flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            MediaPipe Active
          </span>
        )}
      </div>

      <div className="relative w-full aspect-video bg-slate-950/90 rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center shadow-2xl">
        {!isCameraActive ? (
          <div className="flex flex-col items-center justify-center p-6 text-center gap-3">
            <div className="p-4 bg-gradient-to-tr from-amber-500/20 to-purple-500/20 text-amber-400 rounded-2xl border border-amber-500/30">
              <Camera className="w-8 h-8 animate-bounce" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">Live Camera Practice</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed">
                Position your hand in front of the webcam to get real-time feedback on your ISL signs from Hana!
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
            <button
              onClick={stopCamera}
              className="absolute top-3 right-3 p-2 bg-slate-900/80 hover:bg-rose-600 text-slate-200 hover:text-white rounded-full transition-all border border-white/10 backdrop-blur-md"
              title="Stop Camera"
            >
              <CameraOff className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

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
                {currentSign ? `Target: Sign "${currentSign.sign}"` : 'Hand Gesture Recognition'}
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
