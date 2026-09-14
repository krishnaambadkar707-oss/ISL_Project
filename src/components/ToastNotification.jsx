import React, { useEffect } from 'react';
import { Sparkles, X, Bell, Award, Flame, CheckCircle2 } from 'lucide-react';

export default function ToastNotification({ toast, onClose }) {
  if (!toast) return null;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  const getToastIcon = () => {
    switch (toast.type) {
      case 'badge': return <Award className="w-5 h-5 text-amber-400" />;
      case 'streak': return <Flame className="w-5 h-5 text-amber-400" />;
      case 'mastered': return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'reminder': return <Bell className="w-5 h-5 text-purple-400" />;
      default: return <Sparkles className="w-5 h-5 text-pink-400" />;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-bounce-short">
      <div className="glass-card p-4 bg-slate-900/95 border border-purple-500/40 shadow-2xl rounded-2xl flex items-start gap-3 backdrop-blur-xl">
        <div className="p-2.5 rounded-xl bg-purple-500/20 shrink-0 mt-0.5">
          {getToastIcon()}
        </div>

        <div className="flex-1 pr-2">
          <h4 className="text-xs font-bold text-slate-100 font-heading">{toast.title || 'Hana Notification'}</h4>
          <p className="text-xs text-slate-300 mt-0.5 leading-snug">{toast.message}</p>
        </div>

        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-slate-100 hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
