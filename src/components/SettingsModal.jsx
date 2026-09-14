import React, { useState } from 'react';
import { X, Settings, ShieldCheck, Volume2, Key, User, Moon, Sun, Bell, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export default function SettingsModal({ isOpen, onClose, settings, onSaveSettings, onTriggerNotification }) {
  if (!isOpen) return null;

  const [userName, setUserName] = useState(settings?.userName || 'Learner');
  const [theme, setTheme] = useState(settings?.theme || 'dark'); // 'dark' | 'bright'
  const [voicePitch, setVoicePitch] = useState(settings?.voicePitch || 1.2);
  const [voiceRate, setVoiceRate] = useState(settings?.voiceRate || 1.0);
  const [soundEnabled, setSoundEnabled] = useState(settings?.soundEnabled ?? true);
  const [browserNotifications, setBrowserNotifications] = useState(settings?.browserNotifications ?? false);
  const [apiKey, setApiKey] = useState(settings?.apiKey || '');
  const [textOnlyMode, setTextOnlyMode] = useState(settings?.textOnlyMode || false);

  const handleToggleNotifications = async (e) => {
    const checked = e.target.checked;
    if (checked && 'Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setBrowserNotifications(true);
        if (onTriggerNotification) {
          onTriggerNotification('Notifications Enabled! 🔔', 'You will receive daily ASL practice reminders from Hana!');
        }
      } else {
        alert('Browser notifications permission was not granted.');
        setBrowserNotifications(false);
      }
    } else {
      setBrowserNotifications(checked);
    }
  };

  const handleTestNotification = () => {
    soundFx.playSuccessChime();
    if (onTriggerNotification) {
      onTriggerNotification('Hana Practice Reminder 🌸', 'Keep up your daily streak! Practice 2 new ASL signs today!');
    }
    if (browserNotifications && 'Notification' in window && Notification.permission === 'granted') {
      new Notification('Hana ASL Companion 🌸', {
        body: 'Time for your daily ASL practice! Keep your streak alive!',
        icon: '/favicon.ico'
      });
    }
  };

  const handleSave = () => {
    soundFx.enabled = soundEnabled;
    onSaveSettings({
      userName,
      theme,
      voicePitch,
      voiceRate,
      soundEnabled,
      browserNotifications,
      apiKey,
      textOnlyMode
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="glass-card w-full max-w-lg p-6 sm:p-7 relative border border-purple-500/30 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-100 hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <Settings className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-extrabold text-slate-100 font-heading">Settings & Customization</h2>
        </div>

        {/* 1. Theme Selector (Dark vs Bright) */}
        <div className="bg-slate-900/70 border border-white/10 p-4 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              {theme === 'dark' ? <Moon className="w-4 h-4 text-purple-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
              Appearance & Theme
            </span>
            <span className="text-[10px] font-mono text-purple-300 font-bold uppercase">{theme} Mode</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => setTheme('dark')}
              className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                theme === 'dark'
                  ? 'bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-950/50'
                  : 'bg-slate-950/80 border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <Moon className="w-4 h-4" />
              Dark Theme
            </button>

            <button
              onClick={() => setTheme('bright')}
              className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                theme === 'bright'
                  ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-md shadow-amber-500/30'
                  : 'bg-slate-950/80 border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-400" />
              Bright / Light Theme
            </button>
          </div>
        </div>

        {/* 2. Notifications System */}
        <div className="bg-slate-900/70 border border-white/10 p-4 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-amber-400" />
              Notifications & Practice Reminders
            </span>
          </div>

          <label className="flex items-center justify-between text-xs text-slate-300 cursor-pointer">
            <span>Enable Browser Notifications</span>
            <input
              type="checkbox"
              checked={browserNotifications}
              onChange={handleToggleNotifications}
              className="w-4 h-4 accent-purple-500 rounded cursor-pointer"
            />
          </label>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-slate-400">Test practice reminder toast</span>
            <button
              onClick={handleTestNotification}
              className="btn btn-secondary py-1 px-3 text-xs"
            >
              Send Test Alert 🔔
            </button>
          </div>
        </div>

        {/* 3. Learner Profile */}
        <div className="bg-slate-900/70 border border-white/10 p-4 rounded-2xl space-y-2">
          <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <User className="w-4 h-4 text-amber-400" />
            Learner Name (For Greetings & Certificates)
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Your Name"
            className="w-full bg-slate-950/80 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* 4. Voice Tuning & Sound System */}
        <div className="bg-slate-900/70 border border-white/10 p-4 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-purple-400" />
              Hana Voice Pitch & Sound FX
            </span>
          </div>

          <label className="flex items-center justify-between text-xs text-slate-300 cursor-pointer">
            <span>Enable UI Sound Effects (Chimes & Tones)</span>
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={(e) => setSoundEnabled(e.target.checked)}
              className="w-4 h-4 accent-purple-500 rounded cursor-pointer"
            />
          </label>

          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Voice Pitch</span>
              <span>{voicePitch}x</span>
            </div>
            <input
              type="range"
              min="0.8"
              max="1.6"
              step="0.1"
              value={voicePitch}
              onChange={(e) => setVoicePitch(parseFloat(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Speech Speed</span>
              <span>{voiceRate}x</span>
            </div>
            <input
              type="range"
              min="0.7"
              max="1.3"
              step="0.1"
              value={voiceRate}
              onChange={(e) => setVoiceRate(parseFloat(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>
        </div>

        {/* 5. Privacy & Fallback Mode */}
        <div className="bg-slate-900/70 border border-white/10 p-4 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Camera & Privacy Toggles
            </span>
          </div>

          <label className="flex items-center justify-between text-xs text-slate-300 cursor-pointer">
            <span>Text/Voice Only Mode (Disable Camera)</span>
            <input
              type="checkbox"
              checked={textOnlyMode}
              onChange={(e) => setTextOnlyMode(e.target.checked)}
              className="w-4 h-4 accent-purple-500 rounded cursor-pointer"
            />
          </label>
        </div>

        {/* 6. Optional API Key Input */}
        <div className="bg-slate-900/70 border border-white/10 p-4 rounded-2xl space-y-2">
          <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Key className="w-4 h-4 text-amber-400" />
            Optional LLM API Key (OpenAI / Gemini)
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
            className="w-full bg-slate-950/80 border border-white/15 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button onClick={onClose} className="btn btn-secondary text-xs">
            Cancel
          </button>
          <button onClick={handleSave} className="btn btn-primary text-xs">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
