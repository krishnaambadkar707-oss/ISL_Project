import React, { useEffect, useRef, useState } from 'react';
import hanaAvatarImg from '../../Avatar_image.jpeg';
import gestureGuideImg from '../../gesture.jpeg';
import azChartImg from '../../A-Z.jpeg';
import { ISL_VIDEOS_LIST, getSignVideo } from '../data/signVideos';
import { soundFx } from '../utils/soundEffects';
import { 
  FastForward, 
  Info, 
  Play, 
  Pause, 
  Sparkles, 
  Volume2, 
  VolumeX,
  Video, 
  Image as ImageIcon, 
  ZoomIn, 
  ZoomOut, 
  CheckCircle2, 
  Film,
  RotateCcw,
  Maximize2,
  Columns,
  X
} from 'lucide-react';

export default function Hana2DGestureAvatar({
  currentSign,
  isSpeaking,
  speechText,
  slowMotion = false,
  onToggleSlowMotion
}) {
  const videoRef = useRef(null);
  const modalVideoRef = useRef(null);

  // Sub-view state inside Hana Avatar: 'image-gesture' (DEFAULT) | 'video' | 'dual'
  const [demonstratorMode, setDemonstratorMode] = useState('image-gesture');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [selectedVideoObj, setSelectedVideoObj] = useState(null);
  
  // Video Sound Mute Toggle (Audio from the video file itself, defaults to unmuted sound)
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState(false);

  // Active video object determination
  const activeVideoSrc = selectedVideoObj?.src || getSignVideo(currentSign);
  const activeVideoTitle = selectedVideoObj?.title || (currentSign ? `ISL Demo: "${currentSign.sign}"` : 'ISL Video Demonstration');
  const activeVideoSign = selectedVideoObj?.sign || currentSign?.sign || 'HELLO';

  // Sync video speed with slowMotion prop
  useEffect(() => {
    if (slowMotion) {
      setPlaybackSpeed(0.5);
    } else {
      setPlaybackSpeed(1.0);
    }
  }, [slowMotion]);

  // Update selected video when currentSign changes
  useEffect(() => {
    const defaultSrc = getSignVideo(currentSign);
    const foundVid = ISL_VIDEOS_LIST.find(v => v.src === defaultSrc) || ISL_VIDEOS_LIST[0];
    setSelectedVideoObj(foundVid);
  }, [currentSign]);

  // Apply speed & mute changes to video elements
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
      videoRef.current.muted = isVideoMuted;
    }
    if (modalVideoRef.current) {
      modalVideoRef.current.playbackRate = playbackSpeed;
      modalVideoRef.current.muted = isVideoMuted;
    }
  }, [playbackSpeed, isVideoMuted, demonstratorMode, activeVideoSrc, isFullscreenModalOpen]);

  const handleVideoSelect = (vidObj) => {
    soundFx.playClick();
    setSelectedVideoObj(vidObj);
    setIsVideoPlaying(true);
  };

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

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsVideoPlaying(true);
      soundFx.playClick();
    }
  };

  // Determine active sign image (prioritize dedicated sign image from images folder)
  const isAlphabetSign = currentSign?.category === 'alphabet';
  const hasDedicatedImage = !!currentSign?.image;
  const activeGestureImage = currentSign?.image || (isAlphabetSign ? azChartImg : gestureGuideImg);

  return (
    <div className="glass-card relative overflow-hidden flex flex-col justify-between p-4 sm:p-6 w-full h-full min-h-[500px]">
      
      {/* Top Header & Demonstrator View Mode Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between z-10 gap-3 mb-3 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="badge badge-purple flex items-center gap-1.5 shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
            Hana ISL Demonstrator
          </span>
          {playbackSpeed < 1.0 && (
            <span className="badge badge-gold font-mono text-xs">Slow-Mo {playbackSpeed}x</span>
          )}
        </div>

        {/* View Mode Selector Tabs: Sign Image Guide | Motion Video | Dual View */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-full border border-white/10 shadow-inner">
            <button
              onClick={() => {
                setDemonstratorMode('image-gesture');
                soundFx.playClick();
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 ${
                demonstratorMode === 'image-gesture'
                  ? 'bg-gradient-to-r from-amber-500 to-purple-600 text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              Sign Image Guide
            </button>

            <button
              onClick={() => {
                setDemonstratorMode('video');
                soundFx.playClick();
              }}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 ${
                demonstratorMode === 'video'
                  ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white shadow-md shadow-purple-950/60 font-extrabold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Film className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              Motion Video ({ISL_VIDEOS_LIST.length})
            </button>

            <button
              onClick={() => {
                setDemonstratorMode('dual');
                soundFx.playClick();
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 hidden md:flex ${
                demonstratorMode === 'dual'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              Dual View
            </button>
          </div>
        </div>
      </div>

      {/* Main Avatar & Demonstrator Content Stage */}
      <div className="relative flex-1 flex flex-col sm:flex-row items-center justify-center gap-5 my-1">
        
        {/* Hana Character Artwork (`Avatar_image.jpeg`) */}
        <div className="relative group shrink-0 hidden lg:block">
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
        <div className="flex-1 w-full bg-slate-950/80 border border-purple-500/25 p-4 rounded-2xl flex flex-col justify-between backdrop-blur-md shadow-inner min-h-[320px]">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
            <div>
              <span className="text-[10px] font-bold text-amber-400 tracking-wider uppercase flex items-center gap-1.5">
                {demonstratorMode === 'video' ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    HD ISL Motion Video Stage
                  </>
                ) : (
                  `Visual Sign Guide — Image for Sign "${currentSign?.sign || 'A'}"`
                )}
              </span>
              <h3 className="text-lg sm:text-xl font-black gradient-title font-heading">
                {demonstratorMode === 'video' ? activeVideoTitle : (currentSign ? `Sign "${currentSign.sign}" — ${currentSign.title}` : 'Select a Sign')}
              </h3>
            </div>
            
            {/* Right Action Controls: Fullscreen & Mute Toggle */}
            <div className="flex items-center gap-2">
              {demonstratorMode === 'video' && (
                <>
                  <button
                    onClick={() => setIsVideoMuted(!isVideoMuted)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border ${
                      !isVideoMuted
                        ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                        : 'bg-slate-900 border-white/10 text-slate-400'
                    }`}
                    title={isVideoMuted ? "Unmute Video Audio" : "Mute Video Audio"}
                  >
                    {!isVideoMuted ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
                    Video Sound {!isVideoMuted ? 'ON' : 'OFF'}
                  </button>

                  <button
                    onClick={() => setIsFullscreenModalOpen(true)}
                    className="px-3 py-1.5 rounded-lg bg-purple-600 border border-purple-400 text-white hover:bg-purple-500 transition-colors text-xs font-bold flex items-center gap-1.5 shadow-md"
                    title="Expand to Fullscreen Theater"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    Fullscreen Theater
                  </button>
                </>
              )}
            </div>
          </div>

          {/* MODE 1: Sign Image Guide (`A-Z.jpeg` / `gesture.jpeg`) */}
          {demonstratorMode === 'image-gesture' && (
            <div className="flex flex-col sm:flex-row items-center gap-4 my-auto">
              <div className="relative group shrink-0">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-2xl bg-slate-900 flex items-center justify-center p-2">
                  <img
                    src={activeGestureImage}
                    alt={`ISL Sign Gesture for ${currentSign?.sign}`}
                    style={{ transform: `scale(${zoomLevel})` }}
                    className="w-full h-full object-contain transform transition-transform duration-300"
                  />

                  {/* Zoom Overlay */}
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
                </div>
              </div>

              {/* Instructions */}
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

          {/* MODE 2: PROPERLY SIZED 9:6 FRAME ISL MOTION VIDEO PLAYER */}
          {demonstratorMode === 'video' && (
            <div className="relative w-full flex flex-col items-center justify-between space-y-4 my-auto">
              
              {/* Prominent 9:6 Aspect Ratio Video Stage Container */}
              <div 
                className="relative w-full max-w-3xl aspect-[9/6] rounded-2xl overflow-hidden border-2 border-purple-500/50 shadow-2xl shadow-purple-950/80 bg-slate-950 group mx-auto flex items-center justify-center"
                style={{ aspectRatio: '9 / 6' }}
              >
                
                {/* Glow Backdrop Accent */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-amber-500/20 via-purple-500/30 to-pink-500/20 blur-md pointer-events-none" />

                <video
                  ref={videoRef}
                  key={activeVideoSrc}
                  src={activeVideoSrc}
                  autoPlay
                  loop
                  muted={isVideoMuted}
                  playsInline
                  onClick={toggleVideoPlay}
                  className="w-full h-full object-contain bg-slate-950 cursor-pointer rounded-2xl"
                />

                {/* Center Hover Big Play Button */}
                {!isVideoPlaying && (
                  <button
                    onClick={toggleVideoPlay}
                    className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-500/90 text-slate-950 flex items-center justify-center shadow-2xl border-2 border-amber-300 hover:scale-110 transition-transform z-10"
                  >
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-slate-950 ml-1" />
                  </button>
                )}

                {/* Top Overlay Badge */}
                <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-slate-100">
                    9:6 Video Frame • {selectedVideoObj ? selectedVideoObj.title : `ISL Gesture: ${currentSign?.sign || 'Greeting'}`}
                  </span>
                </div>

                {/* Bottom Cinema Control HUD Bar */}
                <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 backdrop-blur-md px-4 py-2.5 rounded-xl flex flex-wrap items-center justify-between border border-white/15 gap-2 opacity-90 group-hover:opacity-100 transition-opacity z-10">
                  
                  {/* Left Controls: Play/Pause + Restart + Mute Toggle */}
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={toggleVideoPlay}
                      className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors flex items-center gap-1.5 text-xs font-bold shadow-md"
                    >
                      {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                      {isVideoPlaying ? 'Pause Video' : 'Play Video'}
                    </button>

                    <button
                      onClick={restartVideo}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors text-xs"
                      title="Replay Video"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setIsVideoMuted(!isVideoMuted)}
                      className={`px-3 py-1.5 rounded-lg border transition-colors text-xs font-bold flex items-center gap-1.5 ${
                        !isVideoMuted
                          ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                          : 'bg-slate-800 text-slate-400 border-white/10'
                      }`}
                      title={isVideoMuted ? "Unmute Video Audio" : "Mute Video Audio"}
                    >
                      {!isVideoMuted ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
                      Video Audio {!isVideoMuted ? 'ON' : 'OFF'}
                    </button>
                  </div>

                  {/* Right Speed Controls HUD */}
                  <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-lg border border-white/10">
                    <span className="text-[10px] text-slate-400 font-mono px-1 font-bold">Playback Speed:</span>
                    {[0.5, 0.75, 1.0, 1.25].map((spd) => (
                      <button
                        key={spd}
                        onClick={() => {
                          setPlaybackSpeed(spd);
                          soundFx.playClick();
                        }}
                        className={`px-2.5 py-1 rounded text-xs font-bold font-mono transition-all ${
                          playbackSpeed === spd
                            ? 'bg-amber-400 text-slate-950 font-extrabold shadow'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {spd}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* DEDICATED VIDEO GESTURE DESCRIPTION BOX */}
              <div className="w-full max-w-3xl bg-slate-900/90 border border-amber-500/30 p-3.5 rounded-2xl backdrop-blur-md shadow-md text-left">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5 font-heading">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Video Gesture Description: {selectedVideoObj?.title || activeVideoSign}
                  </h4>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-900/60 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30">
                    {selectedVideoObj?.category || 'Greeting'}
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {selectedVideoObj?.description || currentSign?.description || "Click any thumbnail clip below to load the video and view its step-by-step ISL gesture guide."}
                </p>
              </div>

              {/* VISUAL THUMBNAIL GALLERY CAROUSEL WITH LARGE PREVIEWS */}
              <div className="w-full bg-slate-900/90 border border-purple-500/30 p-3.5 rounded-2xl space-y-2.5">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5 font-heading">
                    <Film className="w-4 h-4 text-amber-400" />
                    ISL Motion Video Demonstrations ({ISL_VIDEOS_LIST.length} Clips)
                  </span>
                  <span className="text-[10px] text-purple-300 font-medium">Click thumbnail to load video clip</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-52 overflow-y-auto scrollbar-thin pr-1">
                  {ISL_VIDEOS_LIST.map((vid) => {
                    const isSelected = activeVideoSrc === vid.src;
                    return (
                      <button
                        key={vid.id}
                        onClick={() => handleVideoSelect(vid)}
                        className={`p-2 rounded-xl border text-left transition-all flex items-center gap-2.5 relative group ${
                          isSelected
                            ? 'bg-gradient-to-r from-purple-600/40 via-pink-600/30 to-amber-500/30 border-amber-400 ring-2 ring-amber-400/60 shadow-xl text-white scale-[1.02]'
                            : 'bg-slate-950/80 border-white/10 hover:bg-slate-800/90 hover:border-white/20 text-slate-300'
                        }`}
                      >
                        {/* Real Image Preview Thumbnail */}
                        {vid.image && (
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-900 border border-white/15 p-0.5 shrink-0 relative">
                            <img src={vid.image} alt={vid.title} className="w-full h-full object-contain rounded-md" />
                            <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center group-hover:bg-slate-950/20 transition-colors">
                              <Play className={`w-4 h-4 ${isSelected ? 'text-amber-400 fill-amber-400' : 'text-white/80'}`} />
                            </div>
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] font-black uppercase tracking-wider text-amber-300 block font-mono truncate">
                            {vid.videoText || vid.title}
                          </span>
                          <h4 className="text-xs font-bold text-slate-100 truncate mt-0.5">{vid.title}</h4>
                          <p className="text-[9px] text-slate-400 truncate mt-0.5 font-medium leading-tight">
                            {vid.shortHint || vid.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* MODE 3: DUAL VIEW (IMAGE + VIDEO SIDE-BY-SIDE) */}
          {demonstratorMode === 'dual' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-auto">
              
              {/* Left: Image Diagram */}
              <div className="bg-slate-900/90 border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center min-h-[300px]">
                <span className="text-xs font-bold text-amber-400 uppercase mb-2">ISL Diagram: "{currentSign?.sign}"</span>
                <div className="w-48 h-48 rounded-xl overflow-hidden border border-amber-500/30 bg-slate-950 p-1">
                  <img src={activeGestureImage} alt={currentSign?.sign} className="w-full h-full object-contain" />
                </div>
              </div>

              {/* Right: Real Motion Video in 9:6 Frame */}
              <div className="bg-slate-900/90 border border-purple-500/40 p-4 rounded-2xl flex flex-col items-center justify-center min-h-[300px]">
                <span className="text-xs font-bold text-purple-300 uppercase mb-2">Real ISL Video Motion (9:6 Frame)</span>
                <div 
                  className="w-full aspect-[9/6] rounded-xl overflow-hidden border border-purple-500/40 bg-slate-950"
                  style={{ aspectRatio: '9 / 6' }}
                >
                  <video src={activeVideoSrc} autoPlay loop muted={isVideoMuted} playsInline className="w-full h-full object-contain bg-black" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Captions Box */}
      <div className="mt-3 bg-slate-900/90 border border-amber-500/30 p-3.5 rounded-2xl flex items-start gap-3 backdrop-blur-md shadow-lg">
        <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl mt-0.5 shrink-0 flex items-center justify-center">
          <Volume2 className={`w-5 h-5 ${isSpeaking ? 'animate-bounce' : ''}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-300 font-heading flex items-center gap-1.5">
              Hana (AI Tutor)
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Captions</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-100 font-medium mt-1 leading-relaxed">
            {speechText || (demonstratorMode === 'video' 
              ? (selectedVideoObj?.description || `Now watching ISL video demonstration for "${activeVideoSign}". Practice the gesture along with the video clip!`)
              : (currentSign?.description || "Hi! Select any sign from the curriculum below or turn on your camera to practice together! 🌸"))}
          </p>
        </div>
      </div>

      {/* FULLSCREEN CINEMA THEATER MODAL */}
      {isFullscreenModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl">
          <div className="glass-card w-full max-w-5xl p-6 relative border border-purple-500/40 shadow-2xl space-y-4 max-h-[95vh] overflow-y-auto">
            
            <button
              onClick={() => setIsFullscreenModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-900 border border-white/10 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-2">
              <Film className="w-6 h-6 text-amber-400 animate-pulse" />
              <div>
                <h2 className="text-xl font-extrabold text-slate-100 font-heading">
                  ISL Cinema Theater — {activeVideoTitle}
                </h2>
                <span className="text-xs text-purple-300">High-Definition ISL Video Motion Guide (9:6 Frame)</span>
              </div>
            </div>

            {/* Video Theater Screen in 9:6 Frame */}
            <div 
              className="relative w-full aspect-[9/6] max-h-[70vh] mx-auto rounded-2xl overflow-hidden border-2 border-purple-500/50 shadow-2xl bg-black"
              style={{ aspectRatio: '9 / 6' }}
            >
              <video
                ref={modalVideoRef}
                key={activeVideoSrc}
                src={activeVideoSrc}
                autoPlay
                loop
                muted={isVideoMuted}
                playsInline
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md p-3 rounded-xl border border-white/15 flex items-center justify-between">
                <button onClick={restartVideo} className="btn btn-gold text-xs py-1.5 px-4">
                  <RotateCcw className="w-4 h-4" /> Replay Clip
                </button>
                <span className="text-xs font-mono text-purple-300">Playing at {playbackSpeed}x Speed</span>
              </div>
            </div>

            {/* Video Gesture Description in Theater */}
            {selectedVideoObj?.description && (
              <div className="bg-slate-900/90 border border-amber-500/30 p-3 rounded-xl text-left">
                <h4 className="text-xs font-bold text-amber-300 mb-1 font-heading">Gesture Description:</h4>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">{selectedVideoObj.description}</p>
              </div>
            )}

            {/* Video Thumbnails Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 pt-2">
              {ISL_VIDEOS_LIST.map((vid) => (
                <button
                  key={vid.id}
                  onClick={() => handleVideoSelect(vid)}
                  className={`p-2 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                    activeVideoSrc === vid.src ? 'bg-purple-600 text-white border-amber-400' : 'bg-slate-900 border-white/10 text-slate-300'
                  }`}
                >
                  {vid.image && <img src={vid.image} alt={vid.title} className="w-10 h-10 rounded object-contain bg-slate-950 shrink-0" />}
                  <div className="min-w-0">
                    <span className="text-[9px] font-bold text-amber-300 block truncate font-mono">{vid.videoText || vid.title}</span>
                    <h4 className="text-xs font-bold truncate">{vid.title}</h4>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

