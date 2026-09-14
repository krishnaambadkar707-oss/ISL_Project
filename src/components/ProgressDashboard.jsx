import React from 'react';
import { Flame, Award, BookOpen, Sparkles, CheckCircle2, Heart, Trophy, Printer, Type, Hash } from 'lucide-react';
import { ASL_CURRICULUM, ASL_BADGES } from '../data/aslCurriculum';

export default function ProgressDashboard({ 
  streak = 3, 
  masteredSigns = [], 
  quizHighScore = 80,
  userName = 'Learner',
  onOpenCertificate
}) {
  const totalSigns = ASL_CURRICULUM.length;
  const progressPercent = Math.round((masteredSigns.length / totalSigns) * 100);

  // Check which badges are unlocked
  const isBadgeUnlocked = (badge) => {
    if (badge.type === 'streak') {
      return streak >= badge.target;
    }
    if (badge.type === 'quiz') {
      return quizHighScore >= badge.target;
    }
    return masteredSigns.length >= badge.unlockedAt;
  };

  const getBadgeIcon = (iconName) => {
    switch (iconName) {
      case 'Type': return <Type className="w-5 h-5" />;
      case 'Hash': return <Hash className="w-5 h-5" />;
      case 'Heart': return <Heart className="w-5 h-5" />;
      case 'Flame': return <Flame className="w-5 h-5" />;
      case 'HelpCircle': return <Trophy className="w-5 h-5" />;
      default: return <Award className="w-5 h-5" />;
    }
  };

  return (
    <div className="glass-card p-6 w-full space-y-6">
      {/* Header & Certificate Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-4 gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            Learner Progress & Badges Dashboard
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Track daily practice streaks, unlock achievement badges, and print your official ASL certificate
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="badge badge-purple flex items-center gap-1.5 py-1 px-3">
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
            {streak} Day Streak
          </span>

          <button onClick={onOpenCertificate} className="btn btn-gold text-xs">
            <Printer className="w-4 h-4" />
            Claim ASL Certificate
          </button>
        </div>
      </div>

      {/* Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 border border-white/10 p-4 rounded-2xl flex items-center gap-3.5">
          <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Curriculum Mastery</span>
            <div className="text-xl font-extrabold text-slate-100 font-mono mt-0.5">
              {masteredSigns.length} / {totalSigns}
            </div>
            <span className="text-[10px] text-purple-400 font-semibold">{progressPercent}% Completed</span>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-white/10 p-4 rounded-2xl flex items-center gap-3.5">
          <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-xl">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Quiz High Score</span>
            <div className="text-xl font-extrabold text-slate-100 font-mono mt-0.5">
              {quizHighScore} pts
            </div>
            <span className="text-[10px] text-cyan-400 font-semibold">Mastery Achieved</span>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-white/10 p-4 rounded-2xl flex items-center gap-3.5">
          <div className="p-3 bg-pink-500/20 text-pink-400 rounded-xl">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Hana Friendship Level</span>
            <div className="text-xl font-extrabold text-slate-100 font-mono mt-0.5">
              Level 4
            </div>
            <span className="text-[10px] text-pink-400 font-semibold">Kind ASL Companion</span>
          </div>
        </div>
      </div>

      {/* Main Progress Bar */}
      <div className="bg-slate-900/80 border border-white/10 p-4 rounded-2xl">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-bold text-slate-200">Overall Beginner ASL Progress</span>
          <span className="font-mono font-bold text-purple-400">{progressPercent}%</span>
        </div>
        <div className="w-full bg-slate-950 rounded-full h-3.5 overflow-hidden p-0.5 border border-white/5">
          <div
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 h-full rounded-full transition-all duration-500 shadow-md shadow-purple-500/50"
            style={{ width: `${Math.max(progressPercent, 4)}%` }}
          />
        </div>
      </div>

      {/* Achievement Badges Grid */}
      <div>
        <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-400" />
          Achievement Badges
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {ASL_BADGES.map((badge) => {
            const unlocked = isBadgeUnlocked(badge);
            return (
              <div
                key={badge.id}
                className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between min-h-[120px] ${
                  unlocked
                    ? 'bg-gradient-to-br from-amber-500/15 to-purple-600/20 border-amber-500/40 text-slate-100 shadow-md'
                    : 'bg-slate-900/40 border-white/5 text-slate-500 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-xl ${unlocked ? 'bg-amber-400/20 text-amber-300' : 'bg-slate-800 text-slate-500'}`}>
                    {getBadgeIcon(badge.icon)}
                  </div>
                  {unlocked ? (
                    <span className="badge badge-gold text-[9px] px-2 py-0.5">Unlocked</span>
                  ) : (
                    <span className="text-[10px] text-slate-500 font-mono">Locked</span>
                  )}
                </div>

                <div className="mt-2">
                  <h4 className="text-xs font-bold text-slate-100">{badge.title}</h4>
                  <p className="text-[10px] text-slate-400 leading-snug mt-0.5">{badge.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mastered Signs Vocabulary Grid */}
      <div>
        <h3 className="text-sm font-bold text-slate-200 mb-3">Mastered ASL Vocabulary ({masteredSigns.length})</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {ASL_CURRICULUM.map((item) => {
            const isDone = masteredSigns.includes(item.id);
            return (
              <div
                key={item.id}
                className={`p-2.5 rounded-xl border text-xs flex items-center justify-between transition-all ${
                  isDone
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-slate-900/40 border-white/5 text-slate-500'
                }`}
              >
                <span className="font-bold">Sign {item.sign}</span>
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <span className="text-[10px] text-slate-600">Pending</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
