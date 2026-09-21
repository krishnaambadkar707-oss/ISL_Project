import React, { useState } from 'react';
import { ISL_CURRICULUM } from '../data/islCurriculum';
import { HelpCircle, Award, CheckCircle2, XCircle, RotateCcw, Camera, Sparkles, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/soundEffects';
import CameraPractice from './CameraPractice';

export default function QuizView({ onSelectSign, onQuizComplete }) {
  // Mode State: 'multiple-choice' | 'camera-challenge'
  const [quizMode, setQuizMode] = useState('multiple-choice');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  // Generate 5 random items for quiz
  const [quizItems, setQuizItems] = useState(() => {
    const shuffled = [...ISL_CURRICULUM].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  });

  const currentItem = quizItems[currentQuestionIndex];

  const getOptions = (correctItem) => {
    const options = [correctItem];
    const others = ISL_CURRICULUM.filter(s => s.id !== correctItem.id);
    const shuffledOthers = [...others].sort(() => 0.5 - Math.random());
    options.push(...shuffledOthers.slice(0, 3));
    return options.sort(() => 0.5 - Math.random());
  };

  const [currentOptions, setCurrentOptions] = useState(() => getOptions(currentItem));

  const handleSelectOption = (option) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    if (option.id === currentItem.id) {
      setScore(prev => prev + 20);
      soundFx.playQuizCorrect();
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
    } else {
      soundFx.playQuizWrong();
    }

    if (onSelectSign) {
      onSelectSign(currentItem);
    }
  };

  const handleCameraSignMastered = (signId) => {
    if (signId === currentItem.id && !isAnswered) {
      setIsAnswered(true);
      setScore(prev => prev + 20);
      soundFx.playSuccessChime();
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < quizItems.length) {
      const nextIdx = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIdx);
      setSelectedOption(null);
      setIsAnswered(false);
      setCurrentOptions(getOptions(quizItems[nextIdx]));
    } else {
      setQuizFinished(true);
      soundFx.playFanfare();
      if (onQuizComplete) {
        onQuizComplete(score + (selectedOption?.id === currentItem.id ? 20 : 0));
      }
    }
  };

  const handleRestart = (newMode = quizMode) => {
    const shuffled = [...ISL_CURRICULUM].sort(() => 0.5 - Math.random());
    const newItems = shuffled.slice(0, 5);
    setQuizItems(newItems);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setQuizFinished(false);
    setQuizMode(newMode);
    setCurrentOptions(getOptions(newItems[0]));
  };

  return (
    <div className="glass-card p-6 w-full max-w-3xl mx-auto">
      {/* Top Quiz Header & Mode Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-4 mb-5 gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-xl text-white">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100">Hana's ISL Knowledge Quiz</h2>
            <p className="text-xs text-slate-400">Test your sign recognition & camera execution skills</p>
          </div>
        </div>

        {/* Mode Selector Buttons */}
        <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => handleRestart('multiple-choice')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              quizMode === 'multiple-choice'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Multiple Choice
          </button>

          <button
            onClick={() => handleRestart('camera-challenge')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              quizMode === 'camera-challenge'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            Camera Challenge
          </button>
        </div>
      </div>

      {!quizFinished ? (
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
            <span>Question {currentQuestionIndex + 1} of {quizItems.length}</span>
            <span className="badge badge-purple font-mono font-bold text-xs">
              Score: {score} / 100 pts
            </span>
          </div>

          {quizMode === 'multiple-choice' ? (
            /* Mode 1: Multiple Choice Question */
            <div>
              <div className="bg-slate-900/80 border border-white/10 p-5 rounded-2xl text-center mb-6 flex flex-col sm:flex-row items-center justify-around gap-4">
                {currentItem.image && (
                  <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-purple-500/40 shadow-xl bg-slate-950 p-2 shrink-0">
                    <img
                      src={currentItem.image}
                      alt={`Target ISL Sign Gesture`}
                      className="w-full h-full object-contain rounded-xl"
                    />
                    <span className="absolute bottom-1 right-1 bg-slate-950/90 text-[9px] font-mono text-purple-300 px-1.5 py-0.5 rounded border border-purple-500/30">
                      Sign Image
                    </span>
                  </div>
                )}
                <div className="text-center sm:text-left space-y-1">
                  <span className="text-xs font-semibold text-purple-400 tracking-wider uppercase">What sign is shown or described below:</span>
                  <h3 className="text-2xl font-black text-slate-100">"{currentItem.meaning}"</h3>
                  <p className="text-xs text-slate-400 italic max-w-md">
                    Hint: {currentItem.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {currentOptions.map((opt) => {
                  const isCorrect = opt.id === currentItem.id;
                  const isSelected = selectedOption?.id === opt.id;

                  let btnStyle = 'bg-slate-900/60 border-white/10 hover:bg-slate-800 text-slate-200';
                  if (isAnswered) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-500/25 border-emerald-400 text-emerald-200 font-bold scale-[1.01]';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-rose-500/25 border-rose-400 text-rose-200';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(opt)}
                      disabled={isAnswered}
                      className={`p-4 rounded-xl border text-left font-bold text-sm transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        {opt.image && (
                          <div className="w-9 h-9 rounded-lg overflow-hidden bg-slate-950 border border-white/10 p-0.5 shrink-0">
                            <img src={opt.image} alt={opt.sign} className="w-full h-full object-contain" />
                          </div>
                        )}
                        <span>Sign "{opt.sign}" — {opt.title}</span>
                      </div>
                      {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                      {isAnswered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Mode 2: Camera Sign-Off Challenge */
            <div className="space-y-4 mb-6">
              <div className="bg-slate-900/80 border border-amber-500/30 p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                {currentItem.image && (
                  <div className="w-28 h-28 rounded-xl overflow-hidden border border-amber-500/40 bg-slate-950 p-1.5 shrink-0 shadow-lg">
                    <img src={currentItem.image} alt={currentItem.sign} className="w-full h-full object-contain rounded-lg" />
                  </div>
                )}
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Live Camera Challenge</span>
                  <h3 className="text-xl font-black text-slate-100 mt-0.5">Show the sign for "{currentItem.sign}" ({currentItem.title})</h3>
                  <p className="text-xs text-slate-400 mt-1">{currentItem.description}</p>
                </div>
              </div>

              <CameraPractice
                currentSign={currentItem}
                onMasteredSign={handleCameraSignMastered}
              />
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="flex justify-end">
              <button onClick={handleNext} className="btn btn-gold">
                {currentQuestionIndex + 1 === quizItems.length ? 'Finish Quiz' : 'Next Question'}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Finished Summary */
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-gradient-to-tr from-amber-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-slate-950 mx-auto mb-4 shadow-xl shadow-amber-500/30">
            <Award className="w-10 h-10 animate-bounce" />
          </div>

          <h2 className="text-2xl font-black gradient-title font-heading">Quiz Completed! 🎉</h2>
          <p className="text-sm text-slate-300 mt-1">
            Final Score: <span className="text-amber-400 font-black font-mono text-xl">{score} / 100</span> pts!
          </p>

          <p className="text-xs text-slate-400 mt-3 max-w-sm mx-auto leading-relaxed">
            Hana is super proud of your dedication! You're making real progress in ISL fingerspelling and sign recognition!
          </p>

          <div className="flex items-center justify-center gap-3 mt-6">
            <button onClick={() => handleRestart('multiple-choice')} className="btn btn-secondary text-xs">
              <RotateCcw className="w-4 h-4" />
              Retake Multiple Choice
            </button>
            <button onClick={() => handleRestart('camera-challenge')} className="btn btn-gold text-xs">
              <Camera className="w-4 h-4" />
              Retake Camera Challenge
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
