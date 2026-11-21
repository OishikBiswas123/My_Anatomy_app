import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  Sparkles, 
  ChevronRight 
} from 'lucide-react';
import { ANATOMY_QUIZZES } from '../../data';
import { StorageService } from '../../services/storage';

interface StudyScreenProps {
  onBack: () => void;
  onExploreStructure?: (structureId: string) => void;
}

export const StudyScreen: React.FC<StudyScreenProps> = ({ onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = ANATOMY_QUIZZES[currentQuestionIndex];

  const handleSelectOption = (optId: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionId(optId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || isAnswerSubmitted) return;
    
    const selectedOption = currentQuestion.options.find((o) => o.id === selectedOptionId);
    if (selectedOption?.isCorrect) {
      setScore((prev) => prev + 1);
    }
    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < ANATOMY_QUIZZES.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
      StorageService.recordQuizResult(
        score + (currentQuestion.options.find((o) => o.id === selectedOptionId)?.isCorrect ? 1 : 0),
        ANATOMY_QUIZZES.length
      );
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0e17] text-slate-100 overflow-y-auto pb-20 pt-safe px-4 sm:px-8 select-none">
      <div className="max-w-2xl mx-auto py-6 space-y-6">
        
        {/* Top Header */}
        <header className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl"
          >
            <ArrowLeft size={16} />
            <span>Back to Atlas</span>
          </button>
          <div className="text-right">
            <h1 className="text-base font-bold text-white">Anatomy Study & Quiz</h1>
            <span className="text-[11px] font-mono text-cyan-400">Offline Medical Question Bank</span>
          </div>
        </header>

        {!quizFinished ? (
          <div className="space-y-6">
            {/* Progress counter */}
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Question {currentQuestionIndex + 1} of {ANATOMY_QUIZZES.length}</span>
              <span className="text-amber-400 font-semibold">Score: {score}</span>
            </div>

            {/* Question Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {currentQuestion.system} system
              </span>
              <h2 className="text-lg font-semibold text-white leading-relaxed">
                {currentQuestion.question}
              </h2>

              {/* Options */}
              <div className="space-y-2.5 pt-2">
                {currentQuestion.options.map((opt) => {
                  let optStyle = 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700';

                  if (selectedOptionId === opt.id) {
                    optStyle = 'border-cyan-500 bg-cyan-950/40 text-cyan-200';
                  }

                  if (isAnswerSubmitted) {
                    if (opt.isCorrect) {
                      optStyle = 'border-emerald-500 bg-emerald-950/50 text-emerald-200 font-medium';
                    } else if (selectedOptionId === opt.id && !opt.isCorrect) {
                      optStyle = 'border-rose-500 bg-rose-950/50 text-rose-200';
                    } else {
                      optStyle = 'opacity-50 border-slate-800 bg-slate-950/30 text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      disabled={isAnswerSubmitted}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between text-sm ${optStyle}`}
                    >
                      <span>{opt.text}</span>
                      {isAnswerSubmitted && opt.isCorrect && (
                        <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
                      )}
                      {isAnswerSubmitted && selectedOptionId === opt.id && !opt.isCorrect && (
                        <XCircle size={18} className="text-rose-400 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Card when submitted */}
              {isAnswerSubmitted && (
                <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1.5 animate-fadeIn">
                  <h4 className="font-semibold text-cyan-400 flex items-center gap-1.5">
                    <Sparkles size={14} /> Clinical Explanation
                  </h4>
                  <p className="leading-relaxed">{currentQuestion.explanation}</p>
                </div>
              )}

              {/* Submit or Next Button */}
              <div className="pt-4 flex justify-end">
                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={!selectedOptionId}
                    className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 font-semibold text-sm transition-all"
                  >
                    Check Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-400 text-slate-950 font-semibold text-sm flex items-center gap-1.5 hover:brightness-110"
                  >
                    <span>{currentQuestionIndex + 1 === ANATOMY_QUIZZES.length ? 'Finish Quiz' : 'Next Question'}</span>
                    <ChevronRight size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Quiz Results Summary */
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400/40 mx-auto flex items-center justify-center text-cyan-400">
              <Award size={36} />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">Quiz Completed!</h2>
              <p className="text-sm text-slate-400 mt-1">Review your score and mastery</p>
            </div>

            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 inline-block">
              <span className="text-4xl font-extrabold text-cyan-400 font-mono">
                {score} / {ANATOMY_QUIZZES.length}
              </span>
              <p className="text-xs text-slate-400 mt-1">
                Accuracy: {Math.round((score / ANATOMY_QUIZZES.length) * 100)}%
              </p>
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
              >
                <RotateCcw size={16} />
                <span>Retry Quiz</span>
              </button>
              <button
                onClick={onBack}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-semibold"
              >
                Back to Atlas
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
