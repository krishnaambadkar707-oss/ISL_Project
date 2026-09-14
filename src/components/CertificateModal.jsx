import React, { useState } from 'react';
import { X, Award, Printer, Sparkles, CheckCircle2, Heart } from 'lucide-react';

export default function CertificateModal({ 
  isOpen, 
  onClose, 
  masteredCount = 0, 
  totalSigns = 40,
  userName = 'Learner'
}) {
  if (!isOpen) return null;

  const [nameInput, setNameInput] = useState(userName);
  const dateStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-2xl bg-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 relative shadow-2xl text-slate-100 print:border-none print:shadow-none print:bg-white print:text-black print:p-0">
        
        {/* Close Button (Hidden on Print) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-100 hover:bg-white/10 rounded-full transition-colors print:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Printable Area */}
        <div id="certificate-print-area" className="border-4 border-double border-amber-500/60 p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 print:bg-white print:text-slate-950 text-center relative overflow-hidden">
          
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-2 left-2 text-amber-500/40 text-xl print:text-amber-600">✦</div>
          <div className="absolute top-2 right-2 text-amber-500/40 text-xl print:text-amber-600">✦</div>
          <div className="absolute bottom-2 left-2 text-amber-500/40 text-xl print:text-amber-600">✦</div>
          <div className="absolute bottom-2 right-2 text-amber-500/40 text-xl print:text-amber-600">✦</div>

          {/* Header Badge */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 via-purple-500 to-pink-500 p-0.5 mx-auto mb-3 shadow-lg shadow-amber-500/30 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-amber-400">
              <Award className="w-8 h-8" />
            </div>
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 print:text-amber-700">
            Certificate of Achievement
          </span>

          <h1 className="text-2xl sm:text-3xl font-black gradient-title mt-1 mb-2 font-heading print:text-slate-900">
            American Sign Language Foundations
          </h1>

          <p className="text-xs text-slate-400 print:text-slate-600 max-w-md mx-auto leading-relaxed">
            This official certificate hereby verifies that
          </p>

          {/* Recipient Name Input / Display */}
          <div className="my-4">
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Enter Your Name"
              className="text-2xl sm:text-3xl font-extrabold text-center text-amber-300 bg-transparent border-b-2 border-amber-500/50 focus:outline-none focus:border-amber-400 px-4 py-1 max-w-sm print:border-none print:text-slate-900"
            />
          </div>

          <p className="text-xs text-slate-300 print:text-slate-700 max-w-lg mx-auto leading-relaxed">
            has successfully practiced and mastered <span className="font-extrabold text-amber-400 print:text-amber-800">{masteredCount} ASL Signs</span> including Fingerspelling, Numbers, and Everyday Greetings with <span className="font-bold text-purple-400 print:text-purple-800">Hana AI Companion</span>.
          </p>

          {/* Stat Badges */}
          <div className="flex items-center justify-center gap-4 my-6">
            <div className="bg-slate-900/80 border border-white/10 px-4 py-2 rounded-xl text-center print:border-slate-300">
              <span className="block text-[10px] text-slate-400 print:text-slate-500">Date Issued</span>
              <span className="text-xs font-bold text-slate-200 print:text-slate-800">{dateStr}</span>
            </div>

            <div className="bg-slate-900/80 border border-white/10 px-4 py-2 rounded-xl text-center print:border-slate-300">
              <span className="block text-[10px] text-slate-400 print:text-slate-500">Curriculum Mastery</span>
              <span className="text-xs font-bold text-emerald-400 print:text-emerald-700">{masteredCount} / {totalSigns} Signs</span>
            </div>
          </div>

          {/* Signatures Footer */}
          <div className="flex items-center justify-between pt-6 border-t border-white/10 print:border-slate-300 text-left">
            <div>
              <span className="block text-[10px] text-slate-400 print:text-slate-500 uppercase tracking-wider">Tutor Signature</span>
              <span className="text-sm font-bold font-serif text-pink-400 print:text-purple-700">Hana AI Companion</span>
            </div>

            <div className="text-right">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300 mx-auto mb-1">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <span className="text-[9px] text-amber-400 print:text-amber-700 font-bold uppercase tracking-wider">Verified Mastered</span>
            </div>
          </div>
        </div>

        {/* Action Controls (Hidden on Print) */}
        <div className="flex items-center justify-between mt-6 print:hidden">
          <p className="text-xs text-slate-400 flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Tip: You can print or save this as a PDF!
          </p>
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="btn btn-secondary text-xs">
              Close
            </button>
            <button onClick={handlePrint} className="btn btn-gold text-xs">
              <Printer className="w-4 h-4" />
              Print / Save PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
