import React, { useState } from 'react';
import { TournamentParticipant } from '../types/game';
import {
  getLeaderboard,
  resetLeaderboardToDefault,
  exportLeaderboardJSON,
  importLeaderboardJSON
} from '../utils/leaderboard';
import { formatSoM } from '../utils/gameEngine';
import { soundManager } from '../utils/audio';
import {
  Trophy,
  Medal,
  Award,
  Search,
  Download,
  Upload,
  RotateCcw,
  Star,
  Users,
  Check
} from 'lucide-react';

interface LeaderboardViewProps {
  currentPlayerId?: string;
  onViewReport?: () => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ currentPlayerId, onViewReport }) => {
  const [participants, setParticipants] = useState<TournamentParticipant[]>(getLeaderboard());
  const [searchQuery, setSearchQuery] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const top1 = participants[0];
  const top2 = participants[1];
  const top3 = participants[2];

  const filtered = participants.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.playerName.toLowerCase().includes(q) ||
      p.businessName.toLowerCase().includes(q) ||
      p.groupOrClass.toLowerCase().includes(q)
    );
  });

  const handleExport = () => {
    soundManager.playClick();
    const data = exportLeaderboardJSON();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `coffee_wars_termiz_leaderboard_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importLeaderboardJSON(content);
      if (success) {
        soundManager.playSuccess();
        setParticipants(getLeaderboard());
        setImportStatus('Turnir natijalari muvaffaqiyatli yuklandi!');
      } else {
        soundManager.playWarning();
        setImportStatus('Xatolik: JSON fayl formati noto‘g‘ri.');
      }
      setTimeout(() => setImportStatus(null), 4000);
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (window.confirm('Reyting jadvalini dastlabki holatga qaytarmoqchimisiz?')) {
      soundManager.playClick();
      const list = resetLeaderboardToDefault();
      setParticipants(list);
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. Header & Controls */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-1">
              <Trophy className="w-3.5 h-3.5" />
              <span>Termiz Kofe Chempionati · Maksimal 30 Ishtirokchi</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-100 tracking-tight">
              Musobaqa Reytingi va Asosiy TOP-3
            </h2>
            <p className="text-xs text-stone-400 mt-1">
              Surxondaryo maktablari, litseylari va TerDU talabalari o‘rtasidagi rasmiy biznes strategiya reytingi.
            </p>
          </div>

          {/* Export / Import & Reset Actions */}
          <div className="flex flex-wrap items-center gap-2">
            {onViewReport && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onViewReport();
                }}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Mening Hisobotim</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleExport}
              title="JSON fayl sifatida yuklab olish"
              className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-lg border border-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Eksport</span>
            </button>

            <label className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-lg border border-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>Import</span>
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>

            <button
              type="button"
              onClick={handleReset}
              title="Reytingni qayta o‘rnatish"
              className="p-1.5 text-stone-400 hover:text-stone-200 bg-stone-800 hover:bg-stone-700 rounded-lg border border-stone-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {importStatus && (
          <div className="mb-4 p-3 bg-amber-950/30 border border-amber-500/40 rounded-xl text-xs text-amber-300">
            {importStatus}
          </div>
        )}

        {/* 2. Grand TOP-3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* 🥈 2-o‘rin — Eng barqaror va muvaffaqiyatli biznes */}
          {top2 && (
            <div className="order-2 md:order-1 bg-stone-950/90 border border-stone-800 rounded-2xl p-5 flex flex-col justify-between relative">
              <div className="text-center pb-3 border-b border-stone-800">
                <span className="text-2xl mb-1 block">🥈</span>
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  2-O‘rin
                </span>
                <span className="text-[11px] text-amber-400 font-semibold block mt-0.5">
                  Eng Barqaror va Muvaffaqiyatli Biznes
                </span>
              </div>

              <div className="my-3 text-center">
                <h4 className="font-extrabold text-base text-stone-100">{top2.playerName}</h4>
                <p className="text-xs text-amber-300 font-medium">{top2.businessName}</p>
                <span className="text-[11px] text-stone-400 block mt-0.5">{top2.groupOrClass}</span>
              </div>

              <div className="pt-3 border-t border-stone-800 space-y-1 text-xs font-mono tabular-nums">
                <div className="flex justify-between">
                  <span className="text-stone-500">Umumiy ball:</span>
                  <span className="text-stone-100 font-bold">{top2.totalScore} / 100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Yakuniy kapital:</span>
                  <span className="text-emerald-400 font-semibold">{formatSoM(top2.finalCapital)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Obro‘:</span>
                  <span className="text-stone-300">{top2.reputation}/100</span>
                </div>
              </div>
            </div>
          )}

          {/* 🥇 1-o‘rin — Eng yaxshi biznes strategiyasi */}
          {top1 && (
            <div className="order-1 md:order-2 bg-gradient-to-b from-amber-950/30 to-stone-950 border-2 border-amber-500/80 rounded-2xl p-6 flex flex-col justify-between relative shadow-xl shadow-amber-950/40">
              <div className="text-center pb-3 border-b border-amber-500/30">
                <span className="text-4xl mb-1 block animate-bounce">🥇</span>
                <span className="text-xs font-black text-amber-400 uppercase tracking-widest block">
                  1-O‘rin Chempioni
                </span>
                <span className="text-xs text-amber-300 font-bold block mt-0.5">
                  Eng Yaxshi Biznes Strategiyasi
                </span>
              </div>

              <div className="my-4 text-center">
                <h3 className="font-black text-lg text-stone-100 tracking-tight">{top1.playerName}</h3>
                <p className="text-sm text-amber-400 font-bold mt-0.5">{top1.businessName}</p>
                <span className="text-xs text-stone-300 block mt-1">{top1.groupOrClass}</span>
                <span className="inline-block mt-2 text-[11px] font-semibold text-stone-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-500/40">
                  {top1.archetypeTitle}
                </span>
              </div>

              <div className="pt-3 border-t border-amber-500/30 space-y-1.5 text-xs font-mono tabular-nums">
                <div className="flex justify-between">
                  <span className="text-stone-400">Umumiy ball:</span>
                  <span className="text-amber-400 font-black text-base">{top1.totalScore} / 100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Yakuniy kapital:</span>
                  <span className="text-emerald-400 font-bold">{formatSoM(top1.finalCapital)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Jami mijozlar:</span>
                  <span className="text-stone-200">{top1.totalCustomers.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* 🥉 3-o‘rin — Eng yaxshi umumiy natija */}
          {top3 && (
            <div className="order-3 bg-stone-950/90 border border-stone-800 rounded-2xl p-5 flex flex-col justify-between relative">
              <div className="text-center pb-3 border-b border-stone-800">
                <span className="text-2xl mb-1 block">🥉</span>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
                  3-O‘rin
                </span>
                <span className="text-[11px] text-amber-400 font-semibold block mt-0.5">
                  Eng Yaxshi Umumiy Natija
                </span>
              </div>

              <div className="my-3 text-center">
                <h4 className="font-extrabold text-base text-stone-100">{top3.playerName}</h4>
                <p className="text-xs text-amber-300 font-medium">{top3.businessName}</p>
                <span className="text-[11px] text-stone-400 block mt-0.5">{top3.groupOrClass}</span>
              </div>

              <div className="pt-3 border-t border-stone-800 space-y-1 text-xs font-mono tabular-nums">
                <div className="flex justify-between">
                  <span className="text-stone-500">Umumiy ball:</span>
                  <span className="text-stone-100 font-bold">{top3.totalScore} / 100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Yakuniy kapital:</span>
                  <span className="text-emerald-400 font-semibold">{formatSoM(top3.finalCapital)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Obro‘:</span>
                  <span className="text-stone-300">{top3.reputation}/100</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Full Tournament Table (30 participants) */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <h3 className="text-base font-bold text-stone-100">
            Barcha Ishtirokchilar Jadvali ({filtered.length} ta)
          </h3>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-stone-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ism, biznes yoki guruh bo‘yicha qidirish..."
              className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-100 placeholder:text-stone-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-800 text-stone-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-3">O‘rin</th>
                <th className="py-3 px-3">Ishtirokchi & Guruh</th>
                <th className="py-3 px-3">Kofexona Nomi</th>
                <th className="py-3 px-3">Model</th>
                <th className="py-3 px-3 text-right">Kapital</th>
                <th className="py-3 px-3 text-right">Obro‘</th>
                <th className="py-3 px-3 text-right">Umumiy Ball</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60 font-mono tabular-nums">
              {filtered.map((item) => {
                const isCurrent = item.isCurrentPlayer || item.id === currentPlayerId;
                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-stone-800/50 transition-colors ${
                      isCurrent ? 'bg-amber-950/20 font-semibold' : ''
                    }`}
                  >
                    <td className="py-3 px-3">
                      <span className="flex items-center gap-1.5 font-bold">
                        {item.rank === 1 ? '🥇 1' : item.rank === 2 ? '🥈 2' : item.rank === 3 ? '🥉 3' : item.rank}
                        {isCurrent && (
                          <span className="text-[10px] bg-amber-500 text-stone-950 px-1.5 py-0.2 rounded font-sans font-bold">
                            SIZ
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-sans">
                      <div className="font-bold text-stone-100">{item.playerName}</div>
                      <div className="text-[11px] text-stone-400">{item.groupOrClass}</div>
                    </td>
                    <td className="py-3 px-3 font-sans text-stone-300">{item.businessName}</td>
                    <td className="py-3 px-3 font-sans text-stone-400">{item.modelName}</td>
                    <td className="py-3 px-3 text-right text-emerald-400 font-semibold">
                      {formatSoM(item.finalCapital)}
                    </td>
                    <td className="py-3 px-3 text-right text-stone-300">{item.reputation}/100</td>
                    <td className="py-3 px-3 text-right text-amber-400 font-bold text-sm">
                      {item.totalScore}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
