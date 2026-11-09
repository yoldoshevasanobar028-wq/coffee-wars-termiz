import React from 'react';
import { MonthlyRecord } from '../types/game';
import { formatSoM } from '../utils/gameEngine';
import { soundManager } from '../utils/audio';
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Users,
  AlertTriangle,
  Award,
  Sparkles,
  CheckCircle2,
  DollarSign
} from 'lucide-react';

interface MonthSummaryModalProps {
  record: MonthlyRecord;
  month: number;
  onNextMonth: () => void;
  onOpenStaffModal: () => void;
  profitTriggerQuestion?: 'hire' | 'fire' | null;
  overloadWarning?: string;
  isLastMonth: boolean;
}

export const MonthSummaryModal: React.FC<MonthSummaryModalProps> = ({
  record,
  month,
  onNextMonth,
  onOpenStaffModal,
  profitTriggerQuestion,
  overloadWarning,
  isLastMonth
}) => {
  const isProfitable = record.netProfit >= 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-6">
        {/* Month Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div>
            <span className="text-xs font-mono text-amber-400 font-semibold block">
              OYLIK BIZNES HISOBOTI
            </span>
            <h2 className="text-2xl font-black text-stone-100 tracking-tight">
              {month}-Oy Natijalari
            </h2>
          </div>

          <div className="text-right font-mono">
            <span className="text-xs text-stone-500 block">Yakuniy Kassa</span>
            <span className="text-lg font-bold text-amber-400">
              {formatSoM(record.endingCapital)}
            </span>
          </div>
        </div>

        {/* Overload Alert Warning if triggered */}
        {overloadWarning && (
          <div className="mt-4 p-3.5 bg-rose-950/40 border border-rose-800/80 rounded-xl flex items-start gap-3 text-xs text-rose-200">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-rose-300">Navbat tiqilishi va xodimlar yetishmovchiligi!</span>
              {overloadWarning}
            </div>
          </div>
        )}

        {/* P&L Statement Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
          <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800/80">
            <span className="text-[11px] text-stone-400 block mb-1">Oylik Tushum</span>
            <span className="text-sm font-bold font-mono text-stone-100 block">
              {formatSoM(record.revenue)}
            </span>
          </div>

          <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800/80">
            <span className="text-[11px] text-stone-400 block mb-1">Oylik Xarajat</span>
            <span className="text-sm font-bold font-mono text-stone-100 block">
              {formatSoM(record.expenses.total)}
            </span>
          </div>

          <div className={`p-3.5 rounded-xl border ${isProfitable ? 'bg-emerald-950/20 border-emerald-800/50' : 'bg-rose-950/20 border-rose-800/50'}`}>
            <span className="text-[11px] text-stone-400 block mb-1">Sof Foyda</span>
            <span className={`text-sm font-bold font-mono flex items-center gap-1 ${isProfitable ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isProfitable ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              {formatSoM(record.netProfit)}
            </span>
          </div>

          <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800/80">
            <span className="text-[11px] text-stone-400 block mb-1">Mijozlar Soni</span>
            <span className="text-sm font-bold font-mono text-stone-100 block">
              {record.customers.toLocaleString()} nafar
            </span>
          </div>
        </div>

        {/* Decision -> Consequence -> Analysis -> Next Opportunity Chain */}
        <div className="bg-stone-950/80 border border-stone-800 rounded-xl p-4 space-y-3 mb-5">
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Strategik Zanjir: Qaror va Oqibat</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
              <span className="text-stone-500 font-mono text-[10px] block">1. AMALGA OSHIRILGAN QAROR</span>
              <p className="text-stone-200 mt-1 font-medium">
                {record.chosenEventChoice || `Standart ish tartibi: ${record.activePromotion}`}
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
              <span className="text-stone-500 font-mono text-[10px] block">2. BOZOR JAVOBI VA TAHLIL</span>
              <p className="text-stone-200 mt-1">
                Mijozlar mamnunligi: <strong className="text-amber-400">{record.satisfaction}%</strong> · Brend obro‘si: <strong className="text-amber-400">{record.reputation}/100</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Strategic Staff Question Trigger if applicable */}
        {profitTriggerQuestion === 'hire' && (
          <div className="p-4 bg-amber-950/25 border border-amber-500/40 rounded-xl mb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="text-xs">
              <span className="font-bold text-amber-300 block mb-0.5">
                💼 Biznesingiz rivojlanmoqda! Mijozlar soni oshdi.
              </span>
              <p className="text-stone-300">
                Xizmat tezligini saqlash va yangi mijozlarni yo‘qotmaslik uchun yangi barista yoki kassir olishni rejalashtirasizmi?
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onOpenStaffModal();
              }}
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-lg shrink-0 transition-colors cursor-pointer"
            >
              Xodimlarga o‘tish
            </button>
          </div>
        )}

        {profitTriggerQuestion === 'fire' && (
          <div className="p-4 bg-rose-950/25 border border-rose-500/40 rounded-xl mb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="text-xs">
              <span className="font-bold text-rose-300 block mb-0.5">
                ⚠️ Xarajatlar oshdi va foyda kamaymoqda!
              </span>
              <p className="text-stone-300">
                Oylik xarajatlarni qisqartirish uchun xodimlarni optimallashtirasizmi yoki yangi aksiya bilan savdoni oshirasizmi?
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onOpenStaffModal();
              }}
              className="px-3.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-rose-300 border border-rose-800 text-xs font-bold rounded-lg shrink-0 transition-colors cursor-pointer"
            >
              Xodimlarni ko‘rish
            </button>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onNextMonth();
            }}
            className="w-full sm:w-auto px-7 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{isLastMonth ? 'Yakuniy Hisobotga O‘tish' : `${month + 1}-Oyga O‘tish`}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
