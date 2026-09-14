import React, { useState, useEffect } from 'react';
import { ASL_CURRICULUM } from './data/aslCurriculum';
import AvatarDisplay from './components/AvatarDisplay';
import CameraPractice from './components/CameraPractice';
import VoiceTextChat from './components/VoiceTextChat';
import LessonModule from './components/LessonModule';
import QuizView from './components/QuizView';
import ProgressDashboard from './components/ProgressDashboard';
import SettingsModal from './components/SettingsModal';
import CertificateModal from './components/CertificateModal';
import ToastNotification from './components/ToastNotification';
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
  Image as ImageIcon
} from 'lucide-react';

export default function App() {
  // Navigation tab state: 'learn' | 'quiz' | 'progress'
  const [activeTab, setActiveTab] = useState('learn');

  // Studio Stage Tab state inside 'learn': '2d-avatar' | 'camera' | 'chat'
  const [studioStage, setStudioStage] = useState('2d-avatar');
  
  // Selected sign for demo & practice
  const [currentSign, setCurrentSign] = useState(ASL_CURRICULUM[0]); // Starts with 'A'
  
  // Learner Memory & Progress State
  const [masteredSigns, setMasteredSigns] = useState(() => {
    const saved = localStorage.getItem('hana_mastered_signs');
    return saved ? JSON.parse(saved) : ['asl-a', 'asl-b', 'asl-hello'];
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
      const signObj = ASL_CURRICULUM.find(s => s.id === signId);
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

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <header className="glass-card px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-400 via-purple-500 to-pink-500 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black gradient-title tracking-tight font-heading">Hana</h1>
            <p className="text-xs text-slate-400 font-medium">AI Voice & ASL Learning Companion</p>
          </div>
        </div>

        {/* Center Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-2xl border border-white/10 shadow-inner">
          <button
            onClick={() => handleTabChange('learn')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'learn'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-950/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Learn & Practice
          </button>

          <button
            onClick={() => handleTabChange('quiz')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'quiz'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-950/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Quizzes
          </button>

          <button
            onClick={() => handleTabChange('progress')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'progress'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-950/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </button>
        </div>

        {/* Right Controls: Quick Theme Toggle, Streak, Cert, Settings */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleThemeQuick}
            className="p-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-amber-300 hover:bg-slate-800 transition-colors"
            title={`Switch to ${settings.theme === 'bright' ? 'Dark' : 'Bright'} Theme`}
          >
            {settings.theme === 'bright' ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5 text-amber-400" />}
          </button>

          <span className="badge badge-gold flex items-center gap-1.5 py-1 px-3">
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
            {streak} Day Streak
          </span>

          <button
            onClick={() => setIsCertificateOpen(true)}
            className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 hover:bg-amber-500/30 transition-colors"
            title="View ASL Certificate"
          >
            <Printer className="w-4.5 h-4.5" />
          </button>

          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-slate-300 hover:bg-slate-800 transition-colors"
            title="Settings"
          >
            <Settings className="w-4.5 h-4.5" />
          </button>
        </div>
      </header>

      {/* Welcome Banner */}
      <div className="glass-card p-5 sm:p-6 bg-gradient-to-r from-purple-950/50 via-slate-900/80 to-amber-950/40 border border-purple-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="badge badge-purple text-xs mb-1">Welcome back, {settings.userName || 'Learner'}! 🌸</span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-100 font-heading">
            Ready to master ASL sign language today?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Watch Hana demonstrate hand gestures below or start camera practice!
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => handleTabChange('quiz')} className="btn btn-gold text-xs">
            <HelpCircle className="w-4 h-4" />
            Start Quick Quiz
          </button>
        </div>
      </div>

      {/* Main Content Sections */}
      {activeTab === 'learn' && (
        <div className="space-y-6">
          {/* Practice Studio Stage Container */}
          <div className="glass-card p-5 sm:p-6 space-y-4">
            {/* Stage Selector Tabs */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Practice Studio</span>
                <span className="text-xs text-slate-400">| Target: <strong className="text-purple-300 font-mono font-bold">Sign "{currentSign?.sign}"</strong></span>
              </div>

              {/* Stage Mode Tabs */}
              <div className="flex items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-2xl border border-white/10">
                <button
                  onClick={() => handleStudioStageChange('2d-avatar')}
                  className={`studio-tab-btn ${studioStage === '2d-avatar' ? 'active' : ''}`}
                >
                  <ImageIcon className="w-4 h-4" />
                  Hana 2D Avatar Demonstrator
                </button>

                <button
                  onClick={() => handleStudioStageChange('camera')}
                  className={`studio-tab-btn ${studioStage === 'camera' ? 'active' : ''}`}
                >
                  <Camera className="w-4 h-4" />
                  Live Camera Practice
                </button>

                <button
                  onClick={() => handleStudioStageChange('chat')}
                  className={`studio-tab-btn ${studioStage === 'chat' ? 'active' : ''}`}
                >
                  <MessageSquare className="w-4 h-4" />
                  Hana AI Chat
                </button>
              </div>
            </div>

            {/* Focused Active Studio Stage */}
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
                />
              )}
            </div>
          </div>

          {/* Bottom ASL Curriculum Hub */}
          <LessonModule
            currentSign={currentSign}
            onSelectSign={handleSelectSign}
            masteredSigns={masteredSigns}
          />
        </div>
      )}

      {activeTab === 'quiz' && (
        <div className="py-2">
          <QuizView
            onSelectSign={handleSelectSign}
            onQuizComplete={(score) => {
              if (score > quizHighScore) {
                setQuizHighScore(score);
                localStorage.setItem('hana_quiz_score', score.toString());
                showToast('New High Score! 🏆', `Awesome! You scored ${score} pts on Hana's ASL Quiz!`, 'badge');
              }
            }}
          />
        </div>
      )}

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
      <footer className="mt-auto py-3 px-4 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between border-t border-white/5">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>Hana AI Sign Language Companion v1.0</span>
        </div>
        <p className="mt-1 sm:mt-0 text-[11px] text-slate-400">
          Designed for beginner ASL practice. Always connect with human Deaf instructors for full fluency.
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
        totalSigns={ASL_CURRICULUM.length}
        userName={settings.userName}
      />

      {/* Toast Notification Alert */}
      <ToastNotification
        toast={activeToast}
        onClose={() => setActiveToast(null)}
      />
    </div>
  );
}
