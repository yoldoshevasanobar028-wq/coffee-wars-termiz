import React, { useState } from 'react';
import { GameEvent, GameEventChoice } from '../types/game';
import { formatSoM } from '../utils/gameEngine';
import { soundManager } from '../utils/audio';
import { AlertCircle, HelpCircle, Check, ArrowRight, ShieldAlert } from 'lucide-react';

interface EventModalProps {
  event: GameEvent;
  currentCapital: number;
  onSelectChoice: (choice: GameEventChoice) => void;
}

export const EventModal: React.FC<EventModalProps> = ({
  event,
  currentCapital,
  onSelectChoice
}) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleConfirm = () => {
    if (selectedIdx === null) return;
    const choice = event.choices[selectedIdx];
    soundManager.playCash();
    onSelectChoice(choice);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-stone-900 border border-amber-500/40 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
        {/* Header Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-semibold text-amber-400">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Kutilmagan Biznes Vaziyati · {event.month}-oy</span>
          </div>
          <span className="text-xs font-mono text-stone-400">
            Mavjud kassa: <strong className="text-stone-200">{formatSoM(currentCapital)}</strong>
          </span>
        </div>

        {/* Title & Situation */}
        <h2 className="text-xl sm:text-2xl font-bold text-stone-100 tracking-tight">
          {event.title}
        </h2>
        <p className="text-xs sm:text-sm font-medium text-amber-300/90 mt-1 mb-3">
          {event.subtitle}
        </p>

        <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-xs sm:text-sm text-stone-300 leading-relaxed mb-4">
          {event.situation}
        </div>

        <div className="mb-6 p-3 rounded-lg bg-stone-900/90 border border-stone-800 text-xs text-stone-400">
          <span className="font-semibold text-amber-400">Termiz konteksti: </span>
          {event.termizContext}
        </div>

        {/* Choices (at least 3 choices) */}
        <div className="space-y-3 mb-6">
          <div className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
            Qaror Variantini Tanlang:
          </div>

          {event.choices.map((choice, index) => {
            const isSelected = selectedIdx === index;
            const canAfford = choice.costSoM <= 0 || currentCapital >= choice.costSoM;

            return (
              <div
                key={index}
                onClick={() => {
                  if (!canAfford) {
                    soundManager.playWarning();
                    return;
                  }
                  soundManager.playClick();
                  setSelectedIdx(index);
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  !canAfford
                    ? 'opacity-40 bg-stone-950/40 border-stone-800 cursor-not-allowed'
                    : isSelected
                    ? 'bg-amber-950/25 border-amber-500 ring-1 ring-amber-500/50 shadow-md'
                    : 'bg-stone-950/70 border-stone-800 hover:border-stone-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full border border-stone-700 flex items-center justify-center text-xs font-mono shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-stone-100">
                        {choice.text}
                      </h4>
                      <p className="text-xs text-stone-400 mt-1">
                        {choice.description}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-bold block">
                      {choice.costSoM === 0
                        ? '0 so‘m'
                        : choice.costSoM < 0
                        ? `+${formatSoM(Math.abs(choice.costSoM))}`
                        : `-${formatSoM(choice.costSoM)}`}
                    </span>
                    {!canAfford && (
                      <span className="text-[10px] text-rose-400 font-semibold block mt-0.5">
                        Mablag‘ yetarli emas
                      </span>
                    )}
                  </div>
                </div>

                {/* Predicted impact preview */}
                <div className="mt-2.5 pt-2 border-t border-stone-800/80 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono">
                  {choice.customerDeltaPercent !== 0 && (
                    <span className={choice.customerDeltaPercent > 0 ? 'text-emerald-400' : 'text-rose-400'}>
                      Mijozlar: {choice.customerDeltaPercent > 0 ? `+${choice.customerDeltaPercent}%` : `${choice.customerDeltaPercent}%`}
                    </span>
                  )}
                  {choice.reputationDelta !== 0 && (
                    <span className={choice.reputationDelta > 0 ? 'text-emerald-400' : 'text-rose-400'}>
                      Obro‘: {choice.reputationDelta > 0 ? `+${choice.reputationDelta}` : `${choice.reputationDelta}`}
                    </span>
                  )}
                  {choice.satisfactionDelta !== 0 && (
                    <span className={choice.satisfactionDelta > 0 ? 'text-emerald-400' : 'text-rose-400'}>
                      Qoniqish: {choice.satisfactionDelta > 0 ? `+${choice.satisfactionDelta}%` : `${choice.satisfactionDelta}%`}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Advisor Tip on selected choice */}
        {selectedIdx !== null && (
          <div className="mb-6 p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-stone-300">
            <span className="font-semibold text-amber-400 block mb-0.5">Strateg maslahati:</span>
            {event.choices[selectedIdx].advisorFeedback}
          </div>
        )}

        {/* Confirm Action */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            disabled={selectedIdx === null}
            onClick={handleConfirm}
            className="w-full sm:w-auto px-6 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:bg-stone-800 disabled:text-stone-500 text-stone-950 font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
          >
            <span>Qarorni Tasdiqlash</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
