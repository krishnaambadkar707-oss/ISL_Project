import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, Sparkles, User, MessageSquare, Lightbulb } from 'lucide-react';
import { HANA_PERSONALITY, ASL_CURRICULUM } from '../data/aslCurriculum';

export default function VoiceTextChat({ 
  currentSign, 
  onSpeakText, 
  userMemory, 
  onSelectSign 
}) {
  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      sender: 'hana',
      text: HANA_PERSONALITY.greeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Quick Suggestion Chips
  const suggestionChips = [
    { label: "Show letter A", signName: "A" },
    { label: "Show Hello sign", signName: "HELLO" },
    { label: "Practice Numbers", signName: "1" },
    { label: "Who is Hana?", query: "Who are you?" }
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          handleSendMessage(transcript);
        }
        setIsListening(false);
      };

      recognition.onerror = (err) => {
        console.error('Speech recognition error:', err);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      setSpeechSupported(false);
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      const qLower = query.toLowerCase();
      const matchedSign = ASL_CURRICULUM.find(s => 
        qLower.includes(` ${s.sign.toLowerCase()} `) || 
        qLower.startsWith(`${s.sign.toLowerCase()} `) ||
        qLower.endsWith(` ${s.sign.toLowerCase()}`) ||
        qLower === s.sign.toLowerCase() ||
        qLower.includes(s.title.toLowerCase())
      ) || (qLower.includes('sign') ? currentSign : null);

      const replyText = generateHanaReply(query, currentSign, userMemory);
      const hanaMsg = {
        id: `hana-${Date.now()}`,
        sender: 'hana',
        text: replyText,
        signImage: matchedSign?.image || null,
        signTitle: matchedSign ? `Sign "${matchedSign.sign}" — ${matchedSign.title}` : null,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, hanaMsg]);
      if (onSpeakText) {
        onSpeakText(replyText);
      }
    }, 500);
  };

  const handleChipClick = (chip) => {
    if (chip.signName && onSelectSign) {
      const targetSign = ASL_CURRICULUM.find(s => s.sign.toUpperCase() === chip.signName.toUpperCase());
      if (targetSign) {
        onSelectSign(targetSign);
      }
    }
    handleSendMessage(chip.query || chip.label);
  };

  const generateHanaReply = (userQuery, signCtx, memory) => {
    const q = userQuery.toLowerCase();

    if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
      return `Hi ${memory?.name || 'friend'}! 🌸 I'm so happy to practice ASL with you! Which sign would you like to try right now?`;
    }
    if (q.includes('who are you') || q.includes('who is hana')) {
      return "I'm Hana, your friendly AI sign-language and voice companion! 🌸 I'm here to help you practice beginner ASL with 3D demonstrations, voice chat, and live camera feedback!";
    }
    if (q.includes('deaf') || q.includes('interpreter')) {
      return "I'm an AI companion here to make beginner practice low-pressure and fun! I always encourage learning directly from human Deaf educators and community events for full fluency! 💖";
    }
    if (q.includes('thank')) {
      return "You are so very welcome! Keep up the awesome practice! ✨";
    }
    if (signCtx) {
      return `Great question about '${signCtx.sign}' (${signCtx.title})! ${signCtx.description} Would you like to practice it in front of the camera now?`;
    }

    return `That's wonderful! As your ASL tutor, I love practicing with you. Try selecting any letter (A-Z) or greeting below, or turn on your camera! 🌸`;
  };

  return (
    <div className="glass-card flex flex-col h-full w-full min-h-[460px] overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-900/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 leading-none">Hana AI Voice & Text Companion</h3>
            <span className="text-xs text-purple-400 font-medium">Voice & Text Mode Active</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-emerald-300 font-semibold">Online</span>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-purple-600 text-white'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[82%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-cyan-600/35 border border-cyan-500/40 text-slate-100 rounded-tr-none'
                  : 'bg-slate-900/90 border border-purple-500/30 text-slate-100 rounded-tl-none shadow-md'
              }`}
            >
              <p>{msg.text}</p>

              {msg.signImage && (
                <div className="mt-2.5 p-2 bg-slate-950/80 rounded-xl border border-purple-500/30 flex items-center gap-3">
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-slate-900 border border-white/10 p-1 shrink-0">
                    <img src={msg.signImage} alt="ASL Sign preview" className="w-full h-full object-contain rounded-md" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-purple-300 font-bold block">Sign Visual</span>
                    <span className="text-xs font-bold text-slate-100">{msg.signTitle}</span>
                  </div>
                </div>
              )}

              <span className="block text-[10px] text-slate-400 mt-1.5 text-right font-mono">
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Quick Suggestion Chips */}
      <div className="px-4 py-2 border-t border-white/5 bg-slate-950/60 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
        {suggestionChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleChipClick(chip)}
            className="px-3 py-1 bg-slate-900 border border-white/10 hover:border-purple-500/50 hover:bg-slate-800 text-slate-300 hover:text-white rounded-full text-xs font-medium whitespace-nowrap transition-colors"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-3.5 border-t border-white/10 bg-slate-900/90 flex items-center gap-2.5">
        {speechSupported && (
          <button
            onClick={toggleListening}
            className={`p-3 rounded-xl border transition-all ${
              isListening
                ? 'bg-rose-500 text-white border-rose-400 animate-pulse shadow-lg shadow-rose-500/40'
                : 'bg-slate-800 text-slate-300 border-white/15 hover:bg-slate-700'
            }`}
            title={isListening ? 'Listening... Speak now' : 'Click to Speak (Speech-to-Text)'}
          >
            {isListening ? <MicOff className="w-4.5 h-4.5" /> : <Mic className="w-4.5 h-4.5" />}
          </button>
        )}

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder={isListening ? "Listening..." : "Talk with Hana..."}
          className="flex-1 bg-slate-950/80 border border-white/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors shadow-inner"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={!inputText.trim()}
          className="btn btn-primary p-3 rounded-xl disabled:opacity-40 disabled:hover:transform-none"
        >
          <Send className="w-4.5 h-4.5" />
        </button>
      </div>
    </div>
  );
}
