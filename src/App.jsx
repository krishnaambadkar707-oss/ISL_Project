import React, { useState, useEffect } from 'react';
import { ISL_CURRICULUM } from './data/islCurriculum';
import AvatarDisplay from './components/AvatarDisplay';
import CameraPractice from './components/CameraPractice';
import VoiceTextChat from './components/VoiceTextChat';
import LessonModule from './components/LessonModule';
import QuizView from './components/QuizView';
import ProgressDashboard from './components/ProgressDashboard';
import SettingsModal from './components/SettingsModal';
import CertificateModal from './components/CertificateModal';
import ToastNotification from './components/ToastNotification';
import ProjectBackground from './components/ProjectBackground';
import { soundFx } from './utils/soundEffects';

import { 
  Sparkles, 
  BookOpen, 
  HelpCircle, 
  Flame, 
  Settings, 
  ShieldCheck, 
  LayoutDashboard, 
  Printer, 
  Camera, 
  MessageSquare, 
  Moon, 
  Sun, 
  Image as ImageIcon,
  Award,
  CheckCircle2,
  TrendingUp,
  Volume2,
  VolumeX,
  Target,
  Zap
} from 'lucide-react';

export default function App() {
  // Navigation tab state: 'learn' | 'quiz' | 'progress'
  const [activeTab, setActiveTab] = useState('learn');

  // Studio Stage Tab state inside 'learn': '2d-avatar' | 'camera' | 'chat'
  const [studioStage, setStudioStage] = useState('2d-avatar');
  
  // Selected sign for demo & practice
  const [currentSign, setCurrentSign] = useState(ISL_CURRICULUM[0]); // Starts with 'A'
  
  // Learner Memory & Progress State
  const [masteredSigns, setMasteredSigns] = useState(() => {
    const saved = localStorage.getItem('hana_mastered_signs');
    return saved ? JSON.parse(saved) : ['isl-a', 'isl-b', 'isl-hello'];
  });
  
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('hana_streak');
    return saved ? parseInt(saved, 10) : 3;
  });

  const [quizHighScore, setQuizHighScore] = useState(() => {
    const saved = localStorage.getItem('hana_quiz_score');
    return saved ? parseInt(saved, 10) : 80;
  });

  // Toast Notification state
  const [activeToast, setActiveToast] = useState(null);

  // App Settings & Customization
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('hana_settings');
    return saved ? JSON.parse(saved) : {
      userName: 'Learner',
      theme: 'dark',
      voicePitch: 1.2,
      voiceRate: 1.0,
      soundEnabled: true,
      browserNotifications: false,
      apiKey: '',
      llmProvider: 'auto',
      textOnlyMode: false
    };
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [slowMotion, setSlowMotion] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hanaSpeechText, setHanaSpeechText] = useState('');

  // Apply Theme & Settings to Document Root
  useEffect(() => {
    soundFx.enabled = settings.soundEnabled ?? true;
    localStorage.setItem('hana_settings', JSON.stringify(settings));

    if (settings.theme === 'bright') {
      document.body.classList.add('bright-theme');
      document.documentElement.setAttribute('data-theme', 'bright');
    } else {
      document.body.classList.remove('bright-theme');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, [settings]);

  // Trigger Toast Notification helper
  const showToast = (title, message, type = 'info') => {
    setActiveToast({ title, message, type });
  };

  // Save progress to LocalStorage
  useEffect(() => {
    localStorage.setItem('hana_mastered_signs', JSON.stringify(masteredSigns));
  }, [masteredSigns]);

  useEffect(() => {
    localStorage.setItem('hana_streak', streak.toString());
  }, [streak]);

  // Handle Speech Synthesis for Hana
  const speakText = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    setHanaSpeechText(text);
    setIsSpeaking(true);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = settings.voicePitch;
    utterance.rate = settings.voiceRate;

    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(v => v.lang.includes('en') && (v.name.includes('Female') || v.name.includes('Zira') || v.name.includes('Samantha')));
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleMasteredSign = (signId) => {
    if (!masteredSigns.includes(signId)) {
      const updated = [...masteredSigns, signId];
      setMasteredSigns(updated);
      const signObj = ISL_CURRICULUM.find(s => s.id === signId);
      showToast('Sign Mastered! 🎉', `Awesome job! You mastered the sign for "${signObj?.sign || signId}"!`, 'mastered');
    }
  };

  const handleSelectSign = (signItem) => {
    soundFx.playClick();
    setCurrentSign(signItem);
    speakText(`Let's practice the sign for '${signItem.sign}'. ${signItem.description}`);
  };

  const handleTabChange = (tab) => {
    soundFx.playClick();
    setActiveTab(tab);
  };

  const handleStudioStageChange = (stage) => {
    soundFx.playClick();
    setStudioStage(stage);
  };

  const toggleThemeQuick = () => {
    const nextTheme = settings.theme === 'bright' ? 'dark' : 'bright';
    setSettings(prev => ({ ...prev, theme: nextTheme }));
    soundFx.playClick();
    showToast('Theme Changed', `Switched to ${nextTheme === 'bright' ? 'Bright / Light' : 'Dark'} Theme!`, 'info');
  };

  const toggleSoundQuick = () => {
    const nextSound = !(settings.soundEnabled ?? true);
    setSettings(prev => ({ ...prev, soundEnabled: nextSound }));
    soundFx.enabled = nextSound;
    if (nextSound) soundFx.playClick();
    showToast('Sound Effects', nextSound ? 'Sound effects enabled 🔊' : 'Sound effects muted 🔇', 'info');
  };

  const progressPercent = Math.round((masteredSigns.length / ISL_CURRICULUM.length) * 100);

  return (
    <>
      {/* 1. Immersive Animated Indian Sign Language Background */}
      <ProjectBackground theme={settings.theme} />

      {/* 2. Main Application Workspace Container */}
      <div className="app-container">
        
        {/* Top Navbar */}
        <header className="glass-card px-5 py-3.5 sm:px-6 sm:py-4 flex flex-col md:flex-row items-center justify-between gap-4 border border-white/10 shadow-2xl backdrop-blur-2xl">
          
          {/* Brand Logo & Companion Identity */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center gap-3.5">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-500 via-purple-600 to-pink-500 blur-md opacity-70 group-hover:opacity-100 transition duration-500" />
                <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-400 via-purple-600 to-pink-600 flex items-center justify-center text-slate-950 font-black shadow-lg">
                  <Sparkles className="w-6 h-6 text-slate-950 animate-spin-slow" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black gradient-title tracking-tight font-heading">
                    Hana
                  </h1>
                  <span className="badge badge-purple text-[10px] py-0.5 px-2">ISL AI</span>
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">
                  Indian Sign Language (ISL) Interactive Companion
                </p>
              </div>
            </div>

            {/* Mobile Streak & Theme Toggle */}
            <div className="flex items-center gap-2 md:hidden">
              <span className="badge badge-gold text-xs py-1 px-2.5">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
                {streak}d
              </span>
              <button
                onClick={toggleThemeQuick}
                className="p-2 rounded-xl bg-slate-900/60 border border-white/10 text-amber-300"
                aria-label="Toggle Theme"
              >
                {settings.theme === 'bright' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Center Navigation Segmented Tabs */}
          <nav className="flex items-center gap-1.5 bg-slate-950/85 p-1.5 rounded-2xl border border-white/10 shadow-inner w-full md:w-auto justify-center">
            <button
              onClick={() => handleTabChange('learn')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'learn'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-950/60 font-extrabold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Learn & Practice</span>
            </button>

            <button
              onClick={() => handleTabChange('quiz')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'quiz'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-950/60 font-extrabold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Quizzes</span>
            </button>

            <button
              onClick={() => handleTabChange('progress')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'progress'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-950/60 font-extrabold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
          </nav>

          {/* Right Action Controls: Quick Stats, Sound, Cert, Settings */}
          <div className="hidden md:flex items-center gap-2">
            
            {/* Sound FX Toggle */}
            <button
              onClick={toggleSoundQuick}
              className={`p-2.5 rounded-xl border transition-all ${
                settings.soundEnabled ?? true
                  ? 'bg-purple-950/40 border-purple-500/40 text-purple-300 hover:bg-purple-900/60'
                  : 'bg-slate-900/60 border-white/10 text-slate-500 hover:bg-slate-800'
              }`}
              title={settings.soundEnabled ?? true ? "Sound Effects Enabled (Click to Mute)" : "Sound Effects Muted (Click to Unmute)"}
            >
              {settings.soundEnabled ?? true ? <Volume2 className="w-4 h-4 text-purple-300" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Quick Theme Switcher */}
            <button
              onClick={toggleThemeQuick}
              className="p-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-amber-300 hover:bg-slate-800 transition-colors shadow-sm"
              title={`Switch to ${settings.theme === 'bright' ? 'Dark' : 'Bright'} Theme`}
            >
              {settings.theme === 'bright' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>

            {/* Daily Streak Counter */}
            <span className="badge badge-gold flex items-center gap-1.5 py-1.5 px-3 shadow-md" title="Consecutive Practice Days">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
              <span className="font-mono font-extrabold">{streak}</span> Days
            </span>

            {/* Certificate Trigger */}
            <button
              onClick={() => setIsCertificateOpen(true)}
              className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-400/40 text-amber-300 hover:bg-amber-500/30 transition-all shadow-sm"
              title="View Official ISL Certificate of Mastery"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Settings Trigger */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-slate-300 hover:bg-slate-800 transition-colors shadow-sm"
              title="Open Settings & AI Configuration"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Dynamic Studio Dashboard Hero Banner */}
        <section className="glass-card p-5 sm:p-6 bg-gradient-to-r from-purple-950/60 via-slate-900/80 to-amber-950/50 border border-purple-500/30 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
            
            {/* Welcome & Learning Headline */}
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="badge badge-purple text-xs font-bold">
                  Namaste, {settings.userName || 'Learner'}! 🌸
                </span>
                <span className="text-[11px] text-amber-400 font-semibold font-mono">
                  Target: Sign "{currentSign?.sign || 'A'}"
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-100 font-heading tracking-tight">
                Master Indian Sign Language with Hana
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                Practice fingerspelling, 100% photographic gestures, two-handed camera recognition, and AI voice dialogue.
              </p>
            </div>

            {/* Curriculum Progress Meter & Quick Action */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-slate-950/70 p-3.5 rounded-2xl border border-white/10 backdrop-blur-md shrink-0">
              <div className="space-y-1 sm:w-44">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    Mastery
                  </span>
                  <span className="text-purple-300 font-mono">{progressPercent}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/5">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 via-purple-500 to-pink-500 rounded-full transition-all duration-700 shadow-md"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-400 text-right">
                  {masteredSigns.length} / {ISL_CURRICULUM.length} Signs Mastered
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleTabChange('quiz')}
                  className="btn btn-gold text-xs py-2 px-3.5 shadow-md flex items-center gap-1.5 shrink-0"
                >
                  <Zap className="w-3.5 h-3.5 fill-slate-950" />
                  Quick Quiz
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Tab 1: Learn & Practice */}
        {activeTab === 'learn' && (
          <div className="space-y-6">
            
            {/* Interactive Studio Stage Container */}
            <div className="glass-card p-5 sm:p-6 space-y-4 border border-purple-500/25 shadow-2xl">
              
              {/* Studio Header Bar & Stage Mode Switcher */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="badge badge-gold text-xs flex items-center gap-1.5 font-black uppercase tracking-wider">
                    <Target className="w-3.5 h-3.5 text-amber-400" />
                    Practice Studio
                  </span>
                  <span className="text-xs text-slate-300 font-medium">
                    Current Sign: <strong className="text-purple-300 font-mono font-bold">"{currentSign?.sign}"</strong> ({currentSign?.title})
                  </span>
                </div>

                {/* Studio Mode Tabs: 2D Avatar Demonstrator | Live Camera Practice | Hana AI Chat */}
                <div className="flex items-center gap-1 bg-slate-950/85 p-1 rounded-2xl border border-white/10 shadow-inner overflow-x-auto max-w-full">
                  <button
                    onClick={() => handleStudioStageChange('2d-avatar')}
                    className={`studio-tab-btn ${studioStage === '2d-avatar' ? 'active' : ''}`}
                    title="View Hana demonstration photos and motion videos"
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>Hana Demonstrator</span>
                  </button>

                  <button
                    onClick={() => handleStudioStageChange('camera')}
                    className={`studio-tab-btn ${studioStage === 'camera' ? 'active' : ''}`}
                    title="Real-time two-handed camera practice with ghost silhouette"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Camera Practice</span>
                  </button>

                  <button
                    onClick={() => handleStudioStageChange('chat')}
                    className={`studio-tab-btn ${studioStage === 'chat' ? 'active' : ''}`}
                    title="Conversational voice & text AI tutor"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Hana AI Chat</span>
                  </button>
                </div>
              </div>

              {/* Active Studio View Stage */}
              <div className="w-full min-h-[460px]">
                {studioStage === '2d-avatar' && (
                  <AvatarDisplay
                    currentSign={currentSign}
                    isSpeaking={isSpeaking}
                    speechText={hanaSpeechText}
                    slowMotion={slowMotion}
                    onToggleSlowMotion={() => setSlowMotion(!slowMotion)}
                  />
                )}

                {studioStage === 'camera' && (
                  <CameraPractice
                    currentSign={currentSign}
                    onMasteredSign={handleMasteredSign}
                    onFeedBack={(msg) => speakText(msg)}
                  />
                )}

                {studioStage === 'chat' && (
                  <VoiceTextChat
                    currentSign={currentSign}
                    onSpeakText={speakText}
                    userMemory={{ name: settings.userName }}
                    onSelectSign={handleSelectSign}
                    settings={settings}
                    onOpenSettings={() => setIsSettingsOpen(true)}
                  />
                )}
              </div>
            </div>

            {/* Bottom ISL Curriculum Hub & Sign Finder */}
            <LessonModule
              currentSign={currentSign}
              onSelectSign={handleSelectSign}
              masteredSigns={masteredSigns}
            />
          </div>
        )}

        {/* Tab 2: Interactive Quizzes */}
        {activeTab === 'quiz' && (
          <div className="py-2">
            <QuizView
              onSelectSign={handleSelectSign}
              onQuizComplete={(score) => {
                if (score > quizHighScore) {
                  setQuizHighScore(score);
                  localStorage.setItem('hana_quiz_score', score.toString());
                  showToast('New High Score! 🏆', `Awesome! You scored ${score} pts on Hana's ISL Quiz!`, 'badge');
                }
              }}
            />
          </div>
        )}

        {/* Tab 3: Progress Dashboard */}
        {activeTab === 'progress' && (
          <div className="py-2">
            <ProgressDashboard
              streak={streak}
              masteredSigns={masteredSigns}
              quizHighScore={quizHighScore}
              userName={settings.userName}
              onOpenCertificate={() => setIsCertificateOpen(true)}
            />
          </div>
        )}

        {/* Footer */}
        <footer className="mt-auto py-4 px-4 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between border-t border-white/10 gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span className="font-semibold text-slate-300">Hana AI Sign Language Companion v1.0</span>
            <span className="text-[10px] text-purple-400 font-mono">ISL Curriculum Dataset</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Designed for Indian Sign Language (ISL) learners. Always connect with human Deaf instructors for cultural and expressive fluency.
          </p>
        </footer>

        {/* Settings Modal */}
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          settings={settings}
          onSaveSettings={(newSettings) => setSettings(newSettings)}
          onTriggerNotification={(title, msg) => showToast(title, msg, 'reminder')}
        />

        {/* Certificate Modal */}
        <CertificateModal
          isOpen={isCertificateOpen}
          onClose={() => setIsCertificateOpen(false)}
          masteredCount={masteredSigns.length}
          totalSigns={ISL_CURRICULUM.length}
          userName={settings.userName}
        />

        {/* Toast Notification Alert */}
        <ToastNotification
          toast={activeToast}
          onClose={() => setActiveToast(null)}
        />
      </div>
    </>
  );
}
