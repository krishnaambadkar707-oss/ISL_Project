import React, { useState } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  HelpCircle, 
  Camera, 
  MessageSquare, 
  Award, 
  ArrowRight, 
  Zap, 
  CheckCircle2, 
  ShieldCheck, 
  Play, 
  Heart, 
  GraduationCap, 
  Users, 
  Star, 
  Globe, 
  Volume2, 
  Flame, 
  Target,
  Layers,
  ChevronRight,
  Eye,
  Smile
} from 'lucide-react';
import { ISL_CURRICULUM, ISL_CATEGORIES } from '../data/islCurriculum';
import { getSignImage } from '../data/signImages';
import { soundFx } from '../utils/soundEffects';

export default function LandingPage({ 
  onStartLearning, 
  onStartCamera, 
  onStartQuiz, 
  onStartChat, 
  onSelectSign,
  masteredCount = 0,
  streak = 3 
}) {
  // Interactive Sign Preview in Hero
  const featuredSigns = [
    { id: 'isl-namaste', label: 'Namaste 🌸', sign: 'NAMASTE', category: 'greetings' },
    { id: 'isl-hello', label: 'Hello 👋', sign: 'HELLO', category: 'greetings' },
    { id: 'isl-thankyou', label: 'Thank You 🙏', sign: 'THANK YOU', category: 'greetings' },
    { id: 'isl-iloveyou', label: 'I Love You 🤟', sign: 'I LOVE YOU', category: 'greetings' },
    { id: 'isl-a', label: 'Letter A 🔤', sign: 'A', category: 'alphabet' },
    { id: 'isl-s', label: 'Letter S 🔤', sign: 'S', category: 'alphabet' },
    { id: 'isl-1', label: 'Number 1 🔢', sign: '1', category: 'numbers' },
    { id: 'isl-friend', label: 'Friend 🤝', sign: 'FRIEND', category: 'phrases' }
  ];

  const [selectedPreviewIndex, setSelectedPreviewIndex] = useState(0);
  const activePreview = featuredSigns[selectedPreviewIndex];
  const activeSignData = ISL_CURRICULUM.find(s => s.id === activePreview.id) || ISL_CURRICULUM[0];
  const activeSignImg = getSignImage(activeSignData);

  const handlePreviewChange = (index) => {
    soundFx.playClick();
    setSelectedPreviewIndex(index);
  };

  const handleLaunchWithSign = (signItem) => {
    soundFx.playClick();
    if (onSelectSign) onSelectSign(signItem);
    if (onStartLearning) onStartLearning();
  };

  const stats = [
    { value: '100+', label: 'Photographic Signs', color: 'from-amber-400 to-orange-500', icon: BookOpen },
    { value: '2-Handed', label: 'Authentic Indian Fingerspelling', color: 'from-fuchsia-500 to-pink-500', icon: Layers },
    { value: '98.4%', label: 'Vision AI Accuracy', color: 'from-cyan-400 to-blue-500', icon: Eye },
    { value: '100% Free', label: 'Accessible & Private', color: 'from-emerald-400 to-teal-500', icon: ShieldCheck }
  ];

  const features = [
    {
      title: 'Dual-Handed ISL Fingerspelling',
      tagline: 'Authentic Indian Standard',
      description: 'Unlike American Sign Language (ASL) single-handed alphabet, Indian Sign Language uses intricate two-handed gestures. Learn with high-res photographic master guides.',
      gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
      borderColor: 'border-amber-500/40 hover:border-amber-400',
      badgeColor: 'badge-gold',
      icon: Layers,
      iconColor: 'text-amber-400',
      ctaText: 'Explore A-Z Signs',
      onClick: () => {
        const signA = ISL_CURRICULUM.find(s => s.id === 'isl-a') || ISL_CURRICULUM[0];
        handleLaunchWithSign(signA);
      }
    },
    {
      title: 'Real-Time Neural Vision Camera',
      tagline: '21-Point Hand Tracking',
      description: 'Practice gestures in front of your webcam. Hana superimposes a neon holographic skeletal guide and evaluates your thumb and finger positions with instant feedback.',
      gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
      borderColor: 'border-cyan-500/40 hover:border-cyan-400',
      badgeColor: 'badge-cyan',
      icon: Camera,
      iconColor: 'text-cyan-400',
      ctaText: 'Test Camera Studio',
      onClick: onStartCamera
    },
    {
      title: 'Hana Conversational Voice AI',
      tagline: 'Natural Dialogue Companion',
      description: 'Ask sign language questions with your voice or text. Hana responds with crystal-clear speech synthesis, explains gesture meanings, and guides your learning journey.',
      gradient: 'from-purple-500/20 via-pink-500/10 to-transparent',
      borderColor: 'border-purple-500/40 hover:border-purple-400',
      badgeColor: 'badge-purple',
      icon: MessageSquare,
      iconColor: 'text-purple-400',
      ctaText: 'Chat with Hana',
      onClick: onStartChat
    },
    {
      title: 'Gamified Quizzes & Daily Streaks',
      tagline: 'Visual Recall Challenges',
      description: 'Challenge your sign recognition with timed multi-choice quizzes, sound effects, streak fire badges, and unlockable achievement milestones.',
      gradient: 'from-rose-500/20 via-red-500/10 to-transparent',
      borderColor: 'border-rose-500/40 hover:border-rose-400',
      badgeColor: 'badge-sunset',
      icon: Zap,
      iconColor: 'text-rose-400',
      ctaText: 'Take a Quick Quiz',
      onClick: onStartQuiz
    },
    {
      title: 'Official ISL Certificate of Mastery',
      tagline: 'Verified Milestone Recognition',
      description: 'Track your mastered signs in your personal dashboard. Reach curriculum goals to unlock a verified, printable Certificate of Completion.',
      gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      borderColor: 'border-emerald-500/40 hover:border-emerald-400',
      badgeColor: 'badge-emerald',
      icon: Award,
      iconColor: 'text-emerald-400',
      ctaText: 'View Dashboard',
      onClick: onStartLearning
    },
    {
      title: '100% Private & Browser-Powered',
      tagline: 'No Cloud Camera Uploads',
      description: 'Your webcam video feeds never leave your computer. Hand landmarks are computed locally via WebAssembly and MediaPipe for ultimate privacy and speed.',
      gradient: 'from-indigo-500/20 via-blue-500/10 to-transparent',
      borderColor: 'border-indigo-500/40 hover:border-indigo-400',
      badgeColor: 'badge-cyan',
      icon: ShieldCheck,
      iconColor: 'text-indigo-400',
      ctaText: 'Learn Offline Ready',
      onClick: onStartLearning
    }
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-8">
      {/* =========================================================================
          HERO SECTION: High-Voltage Gradient, Headline & Live Interactive Deck
          ========================================================================= */}
      <section className="relative overflow-hidden rounded-3xl p-6 sm:p-10 lg:p-12 glass-card border border-white/20 shadow-2xl">
        {/* Prismatic Radial Glow Highlights */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-amber-500/30 to-purple-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tl from-cyan-400/30 to-pink-500/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Value Proposition & Hero CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Pill Highlights */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge badge-rainbow text-xs py-1 px-3 shadow-md animate-pulse">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Next-Gen Indian Sign Language Studio
              </span>
              <span className="badge badge-cyan text-xs py-1 px-2.5">
                🇮🇳 Authentic Two-Handed ISL
              </span>
              <span className="badge badge-emerald text-xs py-1 px-2.5 hidden sm:inline-flex">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Live Camera AI
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight leading-[1.1]">
                <span className="text-slate-100">Speak with Hands,</span><br />
                <span className="gradient-rainbow">Connect with Hearts.</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-300 max-w-xl font-medium leading-relaxed">
                Meet <strong className="text-white font-bold">Hana</strong>, your interactive AI companion for Indian Sign Language. 
                Experience real-time webcam hand tracking, conversational voice tutoring, and photographic gesture guides designed for every learner.
              </p>
            </div>

            {/* Call To Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  soundFx.playSuccess();
                  onStartLearning();
                }}
                className="btn btn-primary px-6 py-3.5 text-sm sm:text-base font-extrabold shadow-xl shadow-purple-900/50 flex items-center gap-2.5 group"
              >
                <Play className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
                <span>Launch Learning Studio</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  onStartCamera();
                }}
                className="btn btn-cyber px-5 py-3.5 text-sm sm:text-base font-extrabold shadow-lg shadow-cyan-950/50 flex items-center gap-2"
              >
                <Camera className="w-4 h-4 text-cyan-200" />
                <span>Try Camera AI</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  onStartQuiz();
                }}
                className="btn btn-gold px-5 py-3.5 text-sm sm:text-base font-extrabold shadow-lg shadow-amber-950/50 flex items-center gap-2"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Play Quiz</span>
              </button>
            </div>

            {/* Micro Feature Bullets */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-300 font-semibold">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Zero setup required
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Audio voice feedback
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                100% private in browser
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Live Preview Card */}
          <div className="lg:col-span-5">
            <div className="glass-card-elevated p-5 sm:p-6 border border-white/30 shadow-2xl relative overflow-hidden bg-gradient-to-b from-white/[0.08] via-slate-900/60 to-slate-950/80">
              
              {/* Header inside Preview Box */}
              <div className="flex items-center justify-between pb-3 border-b border-white/15">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-wider text-slate-200 font-heading">
                    Interactive Sign Preview
                  </span>
                </div>
                <span className="badge badge-purple text-[10px] py-0.5 px-2">
                  {activeSignData.category?.toUpperCase() || 'ISL'}
                </span>
              </div>

              {/* Photo Display with Animated Glow Frame */}
              <div className="relative mt-4 rounded-2xl overflow-hidden bg-slate-950/80 border border-white/20 aspect-square flex items-center justify-center p-3 shadow-inner group">
                <img
                  src={activeSignImg}
                  alt={activeSignData.sign}
                  className="w-full h-full object-contain rounded-xl transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlaid Corner Tag */}
                <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-xs font-mono font-black text-amber-300 shadow-lg">
                  "{activeSignData.sign}"
                </div>

                {/* Action Overlay Button */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                  <button
                    onClick={() => handleLaunchWithSign(activeSignData)}
                    className="btn btn-primary text-xs py-2 px-3 shadow-lg flex items-center gap-1.5"
                  >
                    <span>Practice Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Sign Details & Description */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black text-white font-heading">
                      {activeSignData.title || activeSignData.sign}
                    </h3>
                    <p className="text-xs text-amber-300 font-medium">
                      {activeSignData.meaning || 'Indian Sign Language Gesture'}
                    </p>
                  </div>
                  <span className="badge badge-gold text-[11px] py-0.5 px-2 font-mono">
                    ISL Standard
                  </span>
                </div>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {activeSignData.description}
                </p>
              </div>

              {/* Interactive Quick Switch Chips */}
              <div className="mt-4 pt-3 border-t border-white/10">
                <p className="text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">
                  Try another sign right now:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {featuredSigns.map((fs, idx) => (
                    <button
                      key={fs.id}
                      onClick={() => handlePreviewChange(idx)}
                      className={`text-xs py-1 px-2.5 rounded-xl font-bold transition-all ${
                        selectedPreviewIndex === idx
                          ? 'bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 text-white shadow-md scale-105'
                          : 'bg-white/[0.06] hover:bg-white/15 text-slate-300 border border-white/10'
                      }`}
                    >
                      {fs.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          KEY NUMERICAL METRICS STRIP
          ========================================================================= */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((st, i) => {
          const Icon = st.icon;
          return (
            <div 
              key={i} 
              className="glass-card p-4 sm:p-5 border border-white/15 rounded-2xl flex flex-col items-center sm:items-start text-center sm:text-left space-y-1.5 hover:border-purple-400/50 transition-all"
            >
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-white/10 text-white">
                  <Icon className="w-4 h-4 text-amber-400" />
                </div>
                <span className={`text-2xl sm:text-3xl font-black font-heading bg-gradient-to-r ${st.color} bg-clip-text text-transparent`}>
                  {st.value}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-semibold">
                {st.label}
              </p>
            </div>
          );
        })}
      </section>

      {/* =========================================================================
          INTERACTIVE FEATURE SHOWCASE: 6 Vibrant Feature Pillars
          ========================================================================= */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="badge badge-rainbow text-xs py-1 px-3">
            ✨ Comprehensive AI Learning System
          </span>
          <h2 className="text-2xl sm:text-4xl font-black font-heading text-white tracking-tight">
            Designed for Natural, Joyful Sign Fluency
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Everything you need to master Indian Sign Language from first gestures to conversational confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div
                key={i}
                className={`glass-card p-6 rounded-3xl border ${feat.borderColor} transition-all duration-300 flex flex-col justify-between space-y-5 bg-gradient-to-b ${feat.gradient} hover:shadow-2xl hover:-translate-y-1`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-white/10 border border-white/15 shadow-md">
                      <Icon className={`w-6 h-6 ${feat.iconColor}`} />
                    </div>
                    <span className={`badge ${feat.badgeColor} text-[10px] py-0.5 px-2.5 font-bold`}>
                      {feat.tagline}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-white font-heading">
                    {feat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {feat.description}
                  </p>
                </div>

                <button
                  onClick={feat.onClick}
                  className="btn btn-secondary w-full py-2.5 text-xs font-bold flex items-center justify-between group hover:border-purple-400"
                >
                  <span>{feat.ctaText}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          CURRICULUM TRACKS OVERVIEW
          ========================================================================= */}
      <section className="glass-card p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="badge badge-gold text-xs py-0.5 px-2.5 font-bold mb-2">
              📚 Curriculum Tracks
            </span>
            <h2 className="text-xl sm:text-3xl font-black font-heading text-white">
              Explore What You'll Learn
            </h2>
            <p className="text-xs text-slate-300">
              Structured progressive tracks covering complete fingerspelling, daily counting, social etiquette, and conversational sentences.
            </p>
          </div>

          <button
            onClick={onStartLearning}
            className="btn btn-primary text-xs py-2.5 px-4 font-bold shrink-0 self-start md:self-auto flex items-center gap-2"
          >
            <span>Open Full Curriculum</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ISL_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                soundFx.playClick();
                const firstMatch = ISL_CURRICULUM.find(s => s.category === cat.id) || ISL_CURRICULUM[0];
                handleLaunchWithSign(firstMatch);
              }}
              className="p-4 rounded-2xl bg-white/[0.04] border border-white/15 hover:border-purple-400/60 hover:bg-white/[0.08] transition-all cursor-pointer group flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="badge badge-purple text-[10px] py-0.5 px-2">
                  {cat.count} Master Signs
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
              </div>

              <div>
                <h4 className="text-sm font-black text-white font-heading group-hover:text-amber-300 transition-colors">
                  {cat.title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1">
                  Click to start practicing this track in Studio.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          CULTURAL CONTEXT & ACCESSIBILITY MISSION
          ========================================================================= */}
      <section className="glass-card p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden bg-gradient-to-r from-purple-950/40 via-slate-900/60 to-amber-950/30">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <span className="badge badge-rainbow text-xs py-1 px-3">
              🇮🇳 Empowering Inclusive India
            </span>
            <h2 className="text-xl sm:text-3xl font-black font-heading text-white">
              Why Indian Sign Language (ISL)?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Over <strong>18 million Deaf and hard-of-hearing citizens in India</strong> rely on Indian Sign Language (ISL) as their primary mother tongue. Unlike ASL or BSL, ISL has its own rich grammatical syntax, two-handed alphabet, and cultural idioms. Hana was built to make ISL accessible to learners, students, teachers, friends, and family everywhere.
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-white/[0.06] border border-white/15 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Heart className="w-7 h-7 text-white fill-white animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-black text-white font-heading">
                100% Free & Open
              </h4>
              <p className="text-[11px] text-slate-300">
                Created with love for the Indian Deaf Community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BOTTOM CALL TO ACTION BANNER
          ========================================================================= */}
      <section className="relative overflow-hidden rounded-3xl p-8 sm:p-12 glass-card-elevated text-center space-y-6 border border-white/30 shadow-2xl bg-gradient-to-r from-amber-500/20 via-purple-600/30 to-pink-500/20">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-4xl font-black font-heading text-white">
            Ready to Begin Your ISL Journey?
          </h2>
          <p className="text-xs sm:text-sm text-slate-200">
            Jump straight into the practice studio or test your webcam with Hana.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              soundFx.playSuccess();
              onStartLearning();
            }}
            className="btn btn-primary px-8 py-3.5 text-sm sm:text-base font-extrabold shadow-xl flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Open Practice Studio</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              onStartCamera();
            }}
            className="btn btn-cyber px-6 py-3.5 text-sm sm:text-base font-extrabold shadow-xl flex items-center gap-2"
          >
            <Camera className="w-4 h-4" />
            <span>Open Camera AI</span>
          </button>
        </div>
      </section>
    </div>
  );
}
