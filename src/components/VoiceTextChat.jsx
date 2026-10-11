import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Send, 
  Sparkles, 
  User, 
  MessageSquare, 
  Lightbulb, 
  Key, 
  Bot, 
  Zap, 
  Settings, 
  ExternalLink,
  Camera
} from 'lucide-react';
import { HANA_PERSONALITY, ISL_CURRICULUM } from '../data/islCurriculum';
import { askHanaAI, detectProvider } from '../utils/aiService';

export default function VoiceTextChat({ 
  currentSign, 
  onSpeakText, 
  userMemory, 
  onSelectSign,
  settings,
  onOpenSettings
}) {
  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      sender: 'hana',
      text: HANA_PERSONALITY.greeting,
      source: 'offline',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const hasApiKey = Boolean(settings?.apiKey?.trim());
  const activeProvider = settings?.llmProvider || detectProvider(settings?.apiKey || '');

  // Quick Suggestion Chips
  const suggestionChips = [
    { label: "How to sign Hello?", signName: "HELLO" },
    { label: "Show letter A in ISL", signName: "A" },
    { label: "Two-handed signs in ISL?", query: "How do two-handed signs work in ISL?" },
    { label: "Sign Namaste", signName: "NAMASTE" },
    { label: "Who is Hana?", query: "Who are you?" }
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

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

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim() || isThinking) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsThinking(true);

    try {
      // Call AI Service (Live LLM or Offline Fallback)
      const aiResponse = await askHanaAI({
        userQuery: query,
        currentSign,
        userMemory,
        history: messages,
        apiKey: settings?.apiKey || '',
        provider: activeProvider,
        allCurriculum: ISL_CURRICULUM
      });

      // Detect if an ISL sign matches the query or reply
      const qLower = query.toLowerCase();
      const matchedSign = ISL_CURRICULUM.find(s => 
        qLower.includes(` ${s.sign.toLowerCase()} `) || 
        qLower.startsWith(`${s.sign.toLowerCase()} `) ||
        qLower.endsWith(` ${s.sign.toLowerCase()}`) ||
        qLower === s.sign.toLowerCase() ||
        qLower.includes(s.title.toLowerCase())
      ) || (qLower.includes('sign') ? currentSign : null);

      const hanaMsg = {
        id: `hana-${Date.now()}`,
        sender: 'hana',
        text: aiResponse.text,
        source: aiResponse.source,
        isLive: aiResponse.isLive,
        matchedSign: matchedSign || null,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, hanaMsg]);

      // Read reply aloud with text-to-speech
      if (onSpeakText) {
        onSpeakText(aiResponse.text);
      }
    } catch (err) {
      console.error("Chat error:", err);
      const fallbackMsg = {
        id: `hana-${Date.now()}`,
        sender: 'hana',
        text: "I'm right here with you! Let's keep practicing ISL together. Which sign would you like to view next? 🌸",
        source: 'offline',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleChipClick = (chip) => {
    if (chip.signName && onSelectSign) {
      const targetSign = ISL_CURRICULUM.find(s => s.sign.toUpperCase() === chip.signName.toUpperCase());
      if (targetSign) {
        onSelectSign(targetSign);
      }
    }
    handleSendMessage(chip.query || chip.label);
  };

  return (
    <div className="glass-card flex flex-col h-full w-full min-h-[480px] overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/[0.04] backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 leading-none">Hana AI Voice & Text Companion</h3>
            <span className="text-[11px] text-purple-300 font-medium">Interactive ISL Tutor</span>
          </div>
        </div>

        {/* Live AI Status Badge */}
        <div className="flex items-center gap-2">
          {hasApiKey ? (
            <div className="flex items-center gap-1.5 bg-purple-500/15 px-3 py-1 rounded-full border border-purple-400/30">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-[11px] text-purple-200 font-bold uppercase tracking-wider">
                Live AI ({activeProvider === 'openai' ? 'OpenAI' : 'Gemini'})
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/25">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] text-amber-300 font-medium">Smart Offline Mode</span>
              {onOpenSettings && (
                <button
                  onClick={onOpenSettings}
                  className="text-[10px] text-amber-400 underline hover:text-white ml-1 font-bold"
                  title="Configure Gemini or OpenAI API Key"
                >
                  (Connect Live AI)
                </button>
              )}
            </div>
          )}
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
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-900/40'
                  : 'bg-gradient-to-tr from-purple-600 to-pink-600 text-white shadow-md shadow-purple-900/40'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-cyan-600/30 border border-cyan-500/40 text-slate-100 rounded-tr-none backdrop-blur-md'
                  : 'bg-white/[0.06] border border-purple-500/30 text-slate-100 rounded-tl-none shadow-md backdrop-blur-md'
              }`}
            >
              <p className="whitespace-pre-line">{msg.text}</p>

              {/* Matched Sign Preview Card with Practice Button */}
              {msg.matchedSign && (
                <div className="mt-3 p-2.5 bg-white/[0.05] backdrop-blur-md rounded-xl border border-purple-500/30 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    {msg.matchedSign.image && (
                      <div className="w-11 h-11 rounded-lg overflow-hidden bg-slate-900 border border-white/10 p-0.5 shrink-0">
                        <img 
                          src={msg.matchedSign.image} 
                          alt="ISL Sign visual" 
                          className="w-full h-full object-contain rounded" 
                        />
                      </div>
                    )}
                    <div>
                      <span className="text-[10px] uppercase font-mono text-purple-300 font-bold block">
                        Sign: {msg.matchedSign.sign}
                      </span>
                      <span className="text-xs font-bold text-slate-200">
                        {msg.matchedSign.title}
                      </span>
                    </div>
                  </div>

                  {onSelectSign && (
                    <button
                      onClick={() => onSelectSign(msg.matchedSign)}
                      className="btn btn-secondary text-[11px] py-1 px-2.5 flex items-center gap-1 shrink-0"
                    >
                      <Camera className="w-3 h-3 text-amber-400" />
                      Practice Sign
                    </button>
                  )}
                </div>
              )}

              {/* Message Footer: Timestamp and AI Source Badge */}
              <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/5 text-[10px] text-slate-400">
                {msg.sender === 'hana' ? (
                  <span className="flex items-center gap-1 font-mono text-purple-300">
                    {msg.source === 'gemini' ? (
                      <>✨ Gemini 1.5 Flash</>
                    ) : msg.source === 'openai' ? (
                      <>✨ GPT-4o-mini</>
                    ) : (
                      <>⚡ Hana Offline Companion</>
                    )}
                  </span>
                ) : <span />}
                <span className="font-mono">{msg.timestamp}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Thinking Indicator */}
        {isThinking && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 text-white flex items-center justify-center shrink-0 animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3 bg-slate-900/90 border border-purple-500/30 rounded-2xl rounded-tl-none text-xs text-purple-300 flex items-center gap-2 shadow-md">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
              <span>Hana is thinking... 🌸</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Quick Suggestion Chips */}
      <div className="px-4 py-2 border-t border-white/10 bg-white/[0.03] backdrop-blur-md flex items-center gap-2 overflow-x-auto scrollbar-none">
        <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
        {suggestionChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleChipClick(chip)}
            className="px-3 py-1 bg-white/[0.05] border border-white/12 hover:border-purple-500/50 hover:bg-white/[0.10] text-slate-300 hover:text-white rounded-full text-xs font-medium whitespace-nowrap transition-colors backdrop-blur-sm"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-3.5 border-t border-white/10 bg-white/[0.05] backdrop-blur-md flex items-center gap-2.5">
        {speechSupported && (
          <button
            onClick={toggleListening}
            className={`p-3 rounded-xl border transition-all ${
              isListening
                ? 'bg-rose-500 text-white border-rose-400 animate-pulse shadow-lg shadow-rose-500/40'
                : 'bg-white/[0.06] text-slate-300 border-white/15 hover:bg-white/[0.12]'
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
          placeholder={isListening ? "Listening... Speak to Hana" : "Ask Hana about signs, letters, or practice..."}
          className="flex-1 bg-white/[0.05] border border-white/20 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-purple-400 backdrop-blur-md transition-colors shadow-inner"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={!inputText.trim() || isThinking}
          className="btn btn-primary p-3 rounded-xl disabled:opacity-40 disabled:hover:transform-none"
        >
          <Send className="w-4.5 h-4.5" />
        </button>
      </div>
    </div>
  );
}
