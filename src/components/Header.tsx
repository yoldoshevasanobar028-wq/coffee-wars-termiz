import React from 'react';
import { Volume2, VolumeX, RotateCcw, Trophy, Users, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';

export type TabType = 'dashboard' | 'staff' | 'decisions' | 'advisors' | 'leaderboard' | 'report';

interface HeaderProps {
  currentMonth: number;
  maxMonths: number;
  businessName: string;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onRestart: () => void;
  isGameFinished: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentMonth,
  maxMonths,
  businessName,
  activeTab,
  setActiveTab,
  onRestart,
  isGameFinished
}) => {
  const [muted, setMuted] = React.useState<boolean>(soundManager.getIsMuted());

  const handleToggleSound = () => {
    const isNowMuted = soundManager.toggleMute();
    setMuted(isNowMuted);
    if (!isNowMuted) {
      soundManager.playClick();
    }
  };

  const navItems = [
    { id: 'dashboard' as TabType, label: 'Boshqaruv' },
    { id: 'staff' as TabType, label: 'Xodimlar' },
    { id: 'decisions' as TabType, label: 'Aksiyalar & Bonuslar' },
    { id: 'advisors' as TabType, label: 'Maslahatchilar' },
    { id: 'leaderboard' as TabType, label: 'Reyting' },
    ...(isGameFinished ? [{ id: 'report' as TabType, label: '🏆 Yakuniy Hisobot' }] : [])
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element wordmark, no tags attached) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('dashboard');
            }}
            className="text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
          >
            <span className="text-lg sm:text-xl font-bold tracking-tight text-stone-100 group-hover:text-amber-400 transition-colors whitespace-nowrap">
              Coffee Wars: Termiz
            </span>
          </button>
          {businessName && (
            <span className="hidden xl:inline text-xs text-stone-400 border-l border-stone-800 pl-3">
              {businessName}
            </span>
          )}
        </div>

        {/* Zone 2: Clean 4-5 single-line navigation links with subtle hover/active states */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab(item.id);
                }}
                className={`px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 rounded-md ${
                  isActive
                    ? 'text-amber-400 bg-stone-900 border border-stone-800 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action Area & Audio toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-xs font-mono tabular-nums text-stone-300 hidden sm:flex items-center gap-1.5 bg-stone-900 px-3 py-1.5 rounded-md border border-stone-800">
            <span className="text-stone-500">Davr:</span>
            <span className="text-amber-400 font-semibold">{isGameFinished ? '12 / 12' : `${currentMonth} / ${maxMonths}`}</span>
            <span className="text-stone-500 text-[11px]">oy</span>
          </div>

          <button
            onClick={handleToggleSound}
            aria-label={muted ? 'Ovozni yoqish' : 'Ovozni o‘chirish'}
            title={muted ? 'Ovozni yoqish' : 'Ovozni o‘chirish'}
            className="p-2 text-stone-400 hover:text-stone-200 bg-stone-900 hover:bg-stone-800 rounded-md border border-stone-800 transition-colors"
          >
            {muted ? <VolumeX className="w-4 h-4 text-stone-500" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>

          <button
            onClick={() => {
              if (window.confirm('Yangi o‘yin boshlashni xohlaysizmi? Hozirgi progress tiklanmaydi.')) {
                onRestart();
              }
            }}
            title="Yangi o‘yin"
            className="p-2 text-stone-400 hover:text-stone-200 bg-stone-900 hover:bg-stone-800 rounded-md border border-stone-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile nav bar below header */}
      <div className="md:hidden flex items-center justify-around border-t border-stone-800/80 bg-stone-950 px-2 py-1.5 overflow-x-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              soundManager.playClick();
              setActiveTab(item.id);
            }}
            className={`px-2.5 py-1 text-xs font-medium whitespace-nowrap transition-colors rounded ${
              activeTab === item.id ? 'text-amber-400 bg-stone-900' : 'text-stone-400'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
