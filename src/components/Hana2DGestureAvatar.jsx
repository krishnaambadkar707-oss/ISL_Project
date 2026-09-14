import React, { useEffect, useRef, useState } from 'react';
import hanaAvatarImg from '../../Avatar_image.jpeg';
import gestureGuideImg from '../../gesture.jpeg';
import azChartImg from '../../A-Z.jpeg';
import grokVideoDemo from '../../grok-video-39aa06bf-988c-4816-b306-c3c2f1b2f8e3.mp4';
import { FastForward, Info, Play, Pause, RefreshCw, Sparkles, Volume2, Video, Image as ImageIcon, ZoomIn, ZoomOut, CheckCircle2 } from 'lucide-react';

export default function Hana2DGestureAvatar({
  currentSign,
  isSpeaking,
  speechText,
  slowMotion = false,
  onToggleSlowMotion
}) {
  const videoRef = useRef(null);

  // Sub-view state inside Hana Avatar: 'image-gesture' (DEFAULT) | 'video'
  const [demonstratorMode, setDemonstratorMode] = useState('image-gesture');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  // Handle Video Playback Speed
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = slowMotion ? 0.5 : 1.0;
    }
  }, [slowMotion, demonstratorMode]);

  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (isVideoPlaying) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    } else {
      videoRef.current.play();
      setIsVideoPlaying(true);
    }
  };

  // Determine active sign image (prioritize dedicated sign image from images folder)
  const isAlphabetSign = currentSign?.category === 'alphabet';
  const hasDedicatedImage = !!currentSign?.image;
  const activeGestureImage = currentSign?.image || (isAlphabetSign ? azChartImg : gestureGuideImg);

  return (
    <div className="glass-card relative overflow-hidden flex flex-col justify-between p-5 sm:p-6 w-full h-full min-h-[460px]">
      {/* Top Header Badge, Demonstrator Mode Tabs & Speed Control */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between z-10 gap-3 mb-2">
        <div className="flex items-center gap-2">
          <span className="badge badge-purple flex items-center gap-1 shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
            Hana 2D Avatar Demonstrator
          </span>
          {slowMotion && (
            <span className="badge badge-gold font-mono text-xs">Slow-Mo 0.5x</span>
          )}
        </div>

        {/* Demonstrator Mode Selector: Image Sign Guide (DEFAULT) | Motion Video */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-full border border-white/10 shadow-inner">
            <button
              onClick={() => setDemonstratorMode('image-gesture')}
              className={`px-3 py-1 text-xs font-bold rounded-full transition-all flex items-center gap-1 ${
                demonstratorMode === 'image-gesture'
                  ? 'bg-gradient-to-r from-amber-500 to-purple-600 text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              Sign Image Guide
            </button>

            <button
              onClick={() => setDemonstratorMode('video')}
              className={`px-3 py-1 text-xs font-bold rounded-full transition-all flex items-center gap-1 ${
                demonstratorMode === 'video'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              Motion Video
            </button>
          </div>

          <button
            onClick={onToggleSlowMotion}
            className={`px-3 py-1.5 text-xs font-extrabold rounded-full transition-all flex items-center gap-1 border ${
              slowMotion
                ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-lg shadow-amber-500/30'
                : 'bg-slate-900/80 text-slate-300 border-white/10 hover:bg-slate-800'
            }`}
            title="Toggle Speed"
          >
            <FastForward className="w-3.5 h-3.5" />
            {slowMotion ? '0.5x' : '1.0x'}
          </button>
        </div>
      </div>

      {/* Main Avatar & Image Demonstrator Content Stage */}
      <div className="relative flex-1 flex flex-col sm:flex-row items-center justify-center gap-5 my-2">
        
        {/* Hana Character Artwork (`Avatar_image.jpeg`) */}
        <div className="relative group shrink-0">
          <div className={`absolute -inset-2 rounded-3xl bg-gradient-to-tr from-amber-500 via-purple-600 to-pink-500 blur-lg transition-all ${
            isSpeaking ? 'opacity-90 scale-105 anim-glow' : 'opacity-40 group-hover:opacity-75'
          }`} />

          <div className="relative w-44 h-56 sm:w-48 sm:h-64 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl bg-slate-950">
            <img
              src={hanaAvatarImg}
              alt="Hana AI Companion Character"
              className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105 anim-breathing"
            />

            {isSpeaking && (
              <div className="absolute bottom-2 left-2 right-2 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center justify-between border border-purple-500/30">
                <span className="text-[10px] font-bold text-purple-300">Speaking...</span>
                <div className="sound-wave">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Interactive Demonstrator Area */}
        <div className="flex-1 w-full bg-slate-950/80 border border-purple-500/25 p-4 rounded-2xl flex flex-col justify-between backdrop-blur-md shadow-inner min-h-[260px]">
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-2">
            <div>
              <span className="text-[10px] font-bold text-amber-400 tracking-wider uppercase">
                {demonstratorMode === 'image-gesture' 
                  ? `Visual Sign Guide — Image for Sign "${currentSign?.sign || 'A'}"` 
                  : 'Motion Video Gesture Player'}
              </span>
              <h3 className="text-xl font-black gradient-title font-heading">
                {currentSign ? `Sign "${currentSign.sign}" — ${currentSign.title}` : 'Select a Sign'}
              </h3>
            </div>
            {currentSign && (
              <span className="badge badge-cyan font-mono text-xs">
                {currentSign.category}
              </span>
            )}
          </div>

          {/* Mode 1 (PRIMARY DEFAULT): Real Sign Image Guide (`A-Z.jpeg` / `gesture.jpeg`) */}
          {demonstratorMode === 'image-gesture' && (
            <div className="flex flex-col sm:flex-row items-center gap-4 my-auto">
              
              {/* High-Resolution Interactive Image Crop & Spotlight */}
              <div className="relative group shrink-0">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-2xl bg-slate-900 flex items-center justify-center p-2">
                  <img
                    src={activeGestureImage}
                    alt={`ASL Sign Gesture for ${currentSign?.sign}`}
                    style={{ transform: `scale(${zoomLevel})` }}
                    className="w-full h-full object-contain transform transition-transform duration-300"
                  />

                  {/* Zoom Controls Overlay */}
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-slate-950/80 p-1 rounded-lg border border-white/10 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setZoomLevel(prev => Math.min(prev + 0.3, 2.5))}
                      className="p-1 text-slate-300 hover:text-white rounded hover:bg-white/10"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setZoomLevel(prev => Math.max(prev - 0.3, 1))}
                      className="p-1 text-slate-300 hover:text-white rounded hover:bg-white/10"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="absolute bottom-2 left-2 bg-slate-950/85 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-mono text-amber-300 border border-amber-500/40 font-bold">
                    {hasDedicatedImage 
                      ? `Sign Image: "${currentSign?.sign}"` 
                      : (isAlphabetSign ? `A-Z Chart: Sign "${currentSign?.sign}"` : `Gesture Guide: "${currentSign?.sign}"`)}
                  </span>
                </div>
              </div>

              {/* Instructions & Execution Tip */}
              <div className="flex-1 space-y-2 text-left">
                <div className="bg-slate-900/90 border border-white/10 p-3 rounded-xl">
                  <h4 className="text-xs font-bold text-amber-300 mb-1 flex items-center gap-1.5 font-heading">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    How to practice Sign "{currentSign?.sign}":
                  </h4>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    {currentSign?.description}
                  </p>
                </div>

                <div className="bg-purple-950/40 border border-purple-500/30 p-2.5 rounded-xl flex items-start gap-2">
                  <Info className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-purple-200 leading-snug font-medium">
                    <strong className="text-amber-300">Pro Tip: </strong>
                    {currentSign?.tips}
                  </p>
                </div>
              </div>
            </div>
          )}


          {/* Mode 3: Motion Video Demonstration (`grok-video-39aa06bf-988c-4816-b306-c3c2f1b2f8e3.mp4`) */}
          {demonstratorMode === 'video' && (
            <div className="relative w-full h-full flex flex-col items-center justify-center my-auto">
              <div className="relative w-full max-w-md aspect-video rounded-2xl overflow-hidden border-2 border-purple-500/40 shadow-2xl bg-slate-950 group">
                <video
                  ref={videoRef}
                  src={grokVideoDemo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute bottom-2 left-2 right-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center justify-between border border-white/10">
                  <button
                    onClick={toggleVideoPlay}
                    className="p-1 text-slate-200 hover:text-white rounded-lg transition-colors flex items-center gap-1 text-xs font-bold"
                  >
                    {isVideoPlaying ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-amber-400 fill-amber-400" />}
                    {isVideoPlaying ? 'Pause Video' : 'Play Video'}
                  </button>

                  <span className="text-[10px] font-mono text-purple-300">
                    {slowMotion ? 'Playback 0.5x' : 'Playback 1.0x'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Synchronized Captions Box */}
      <div className="mt-3 bg-slate-900/90 border border-amber-500/30 p-3.5 rounded-2xl flex items-start gap-3 backdrop-blur-md shadow-lg">
        <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl mt-0.5 shrink-0">
          <Volume2 className={`w-4.5 h-4.5 ${isSpeaking ? 'animate-bounce' : ''}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-300 font-heading">Hana (AI Tutor)</span>
            <span className="text-[10px] text-slate-400">Voice Captions</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-100 font-medium mt-1 leading-relaxed">
            {speechText || currentSign?.description || "Hi! Select any sign from the curriculum below or turn on your camera to practice together! 🌸"}
          </p>
        </div>
      </div>
    </div>
  );
}
