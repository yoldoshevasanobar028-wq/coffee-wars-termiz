import React from 'react';
import { PlayerProfile, MonthlyRecord, ScoreBreakdown, StaffMember } from '../types/game';
import { BONUS_ITEMS } from '../data/gameContent';
import { formatSoM } from '../utils/gameEngine';
import { soundManager } from '../utils/audio';
import {
  Trophy,
  Award,
  Sparkles,
  TrendingUp,
  DollarSign,
  Users,
  ShieldCheck,
  Brain,
  RotateCcw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface FinalReportViewProps {
  profile: PlayerProfile;
  finalCapital: number;
  records: MonthlyRecord[];
  scores: ScoreBreakdown;
  staff: StaffMember[];
  unlockedBonusIds: string[];
  rankPosition?: number;
  onViewLeaderboard: () => void;
  onRestart: () => void;
}

export const FinalReportView: React.FC<FinalReportViewProps> = ({
  profile,
  finalCapital,
  records,
  scores,
  staff,
  unlockedBonusIds,
  rankPosition,
  onViewLeaderboard,
  onRestart
}) => {
  const totalNetProfit = records.reduce((acc, r) => acc + r.netProfit, 0);
  const totalCustomersServed = records.reduce((acc, r) => acc + r.customers, 0);
  const finalReputation = records[records.length - 1]?.reputation || 70;
  const totalStaffCount = staff.reduce((acc, s) => acc + s.count, 0);
  const unlockedBonuses = BONUS_ITEMS.filter((b) => unlockedBonusIds.includes(b.id));

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* 1. Grand Trophy Banner */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-900 to-amber-950/40 border-2 border-amber-500/60 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-stone-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
              <Trophy className="w-3.5 h-3.5" />
              <span>12 Oylik Biznes Simulyatsiyasi Yakuni</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-stone-100 tracking-tight">
              {profile.businessName}
            </h1>
            <p className="text-sm text-stone-300 mt-1 font-medium">
              Tadbirkor: <strong className="text-amber-400">{profile.firstName} {profile.lastName}</strong> · {profile.groupOrClass}
            </p>
          </div>

          <div className="text-center sm:text-right bg-stone-950/80 border border-stone-800/80 p-4 rounded-2xl shrink-0">
            <span className="text-xs text-stone-400 uppercase font-mono block">Umumiy Natija</span>
            <div className="text-4xl sm:text-5xl font-black font-mono text-amber-400 tabular-nums">
              {scores.totalScore}
              <span className="text-lg text-stone-500 font-sans font-normal"> / 100</span>
            </div>
            {rankPosition && (
              <span className="text-xs font-bold text-emerald-400 block mt-1">
                🏆 Musobaqada {rankPosition}-o‘rin
              </span>
            )}
          </div>
        </div>

        {/* 2. Business Archetype Spotlight */}
        <div className="my-6 p-5 rounded-2xl bg-stone-950/90 border border-stone-800">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">🧠</span>
            <h3 className="text-lg font-bold text-amber-400">
              Sizning Biznes Uslubingiz: {scores.archetype.title}
            </h3>
          </div>
          <p className="text-sm text-stone-300 leading-relaxed mb-4">
            {scores.archetype.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-3 border-t border-stone-800/80">
            <div>
              <span className="font-semibold text-emerald-400 block mb-1">
                Kuchli tomonlaringiz:
              </span>
              <ul className="space-y-1 text-stone-300 list-disc list-inside">
                {scores.archetype.strengths.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="font-semibold text-amber-300 block mb-1">
                Kelajakdagi o‘sish nuqtasi:
              </span>
              <ul className="space-y-1 text-stone-300 list-disc list-inside">
                {scores.archetype.improvements.map((imp, idx) => (
                  <li key={idx}>{imp}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 3. 100-Point Detailed Breakdown (Mezonlar) */}
        <div>
          <h3 className="text-base font-bold text-stone-100 mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            100 Ballik Baholash Tizimi
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
            <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
              <span className="text-stone-400 block mb-1">💰 Biznes Foydasi</span>
              <span className="text-lg font-bold font-mono text-amber-400 block">
                {scores.profitScore} <span className="text-stone-500 text-xs font-normal">/ 30</span>
              </span>
              <span className="text-[10px] text-stone-500 mt-1 block">Yakuniy kapital va oylik foyda</span>
            </div>

            <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
              <span className="text-stone-400 block mb-1">🧠 Qarorlar Sifati</span>
              <span className="text-lg font-bold font-mono text-amber-400 block">
                {scores.decisionScore} <span className="text-stone-500 text-xs font-normal">/ 25</span>
              </span>
              <span className="text-[10px] text-stone-500 mt-1 block">Voqealardagi oqilona tanlovlar</span>
            </div>

            <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
              <span className="text-stone-400 block mb-1">📈 Barqaror O‘sish</span>
              <span className="text-lg font-bold font-mono text-amber-400 block">
                {scores.growthScore} <span className="text-stone-500 text-xs font-normal">/ 20</span>
              </span>
              <span className="text-[10px] text-stone-500 mt-1 block">1-oydan 12-oygacha dinamika</span>
            </div>

            <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
              <span className="text-stone-400 block mb-1">⭐ Obro‘ & Brend</span>
              <span className="text-lg font-bold font-mono text-amber-400 block">
                {scores.reputationScore} <span className="text-stone-500 text-xs font-normal">/ 15</span>
              </span>
              <span className="text-[10px] text-stone-500 mt-1 block">Mijozlar mamnunligi va sadoqati</span>
            </div>

            <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
              <span className="text-stone-400 block mb-1">⚖️ Xavfni Boshqarish</span>
              <span className="text-lg font-bold font-mono text-amber-400 block">
                {scores.riskScore} <span className="text-stone-500 text-xs font-normal">/ 10</span>
              </span>
              <span className="text-[10px] text-stone-500 mt-1 block">Bankrotlikdan xoli xavfsiz kassa</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Complete Financial & Operational Summary */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <h3 className="text-lg font-bold text-stone-100">
          Asosiy Biznes Ko‘rsatkichlari Yakuni
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
            <span className="text-stone-500 block mb-1">Yakuniy Kapital</span>
            <span className="text-base font-bold text-emerald-400 block">
              {formatSoM(finalCapital)}
            </span>
          </div>

          <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
            <span className="text-stone-500 block mb-1">Jami Sof Foyda</span>
            <span className="text-base font-bold text-stone-100 block">
              {formatSoM(totalNetProfit)}
            </span>
          </div>

          <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
            <span className="text-stone-500 block mb-1">Jami Mijozlar</span>
            <span className="text-base font-bold text-stone-100 block">
              {totalCustomersServed.toLocaleString()} nafar
            </span>
          </div>

          <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
            <span className="text-stone-500 block mb-1">Yakuniy Obro‘</span>
            <span className="text-base font-bold text-amber-400 block">
              {finalReputation} / 100
            </span>
          </div>
        </div>

        {/* Unlocked Bonuses & Expansion */}
        <div className="pt-4 border-t border-stone-800">
          <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-2">
            Ochilgan Bonuslar va Rivojlanish ({unlockedBonuses.length} ta):
          </span>
          {unlockedBonuses.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {unlockedBonuses.map((b) => (
                <span
                  key={b.id}
                  className="px-3 py-1 bg-stone-950 border border-stone-800 rounded-lg text-xs font-medium text-stone-200"
                >
                  ✓ {b.name}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-xs text-stone-500 italic">
              Hech qanday qo‘shimcha bonus ochilmadi.
            </span>
          )}
        </div>

        {/* Staff Team Status */}
        <div className="pt-4 border-t border-stone-800 flex flex-wrap items-center gap-4 text-xs font-mono">
          <span className="text-stone-400 font-sans font-semibold">Jamoa tarkibi:</span>
          {staff.map((s) => (
            <span key={s.role} className="bg-stone-950 px-2.5 py-1 rounded border border-stone-800 text-stone-300">
              {s.title}: <strong className="text-amber-400">{s.count}</strong>
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onViewLeaderboard();
            }}
            className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Trophy className="w-4 h-4" />
            <span>Umumiy Reyting Jadvalini Ko‘rish</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onRestart();
            }}
            className="w-full sm:w-auto px-6 py-3 bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs sm:text-sm rounded-xl border border-stone-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Yangi Strategiya Bilan Boshlash</span>
          </button>
        </div>
      </div>
    </div>
  );
};
