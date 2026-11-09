import React from 'react';
import { MonthlyRecord, BusinessModel, CompetitorState, StaffMember } from '../types/game';
import { TERMIZ_NEWS } from '../data/gameContent';
import { formatSoM } from '../utils/gameEngine';
import { MetricCard } from './MetricCard';
import { soundManager } from '../utils/audio';
import {
  Coins,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Star,
  Award,
  Briefcase,
  AlertTriangle,
  Newspaper,
  Shield,
  ArrowRight,
  Sparkles,
  Coffee
} from 'lucide-react';

interface DashboardViewProps {
  currentMonth: number;
  maxMonths: number;
  currentCapital: number;
  reputation: number;
  model: BusinessModel;
  staff: StaffMember[];
  unlockedBonusIds: string[];
  competitor: CompetitorState;
  lastRecord?: MonthlyRecord;
  onSimulateMonth: () => void;
  onNavigateTab: (tab: 'staff' | 'decisions' | 'advisors' | 'leaderboard') => void;
  priceStrategy: string;
  qualityTier: string;
  activePromotionName: string;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentMonth,
  maxMonths,
  currentCapital,
  reputation,
  model,
  staff,
  unlockedBonusIds,
  competitor,
  lastRecord,
  onSimulateMonth,
  onNavigateTab,
  priceStrategy,
  qualityTier,
  activePromotionName
}) => {
  const currentNews = TERMIZ_NEWS.find((n) => n.month === currentMonth) || TERMIZ_NEWS[0];

  const totalStaffCount = staff.reduce((acc, s) => acc + s.count, 0);
  const baristas = staff.find((s) => s.role === 'barista')?.count || 0;
  const cashiers = staff.find((s) => s.role === 'cashier')?.count || 0;
  const effectiveCapacity = Math.min(baristas * 1800, cashiers * 3600);

  const riskLevel = lastRecord?.riskLevel || (currentCapital > 50000000 ? 'Past' : 'O‘rtacha');
  const satisfaction = lastRecord?.satisfaction || 85;

  const strategyNames: Record<string, string> = {
    budget: 'Hamyonbop (-15%)',
    balanced: 'Muvozanatli',
    premium: 'Yuqori Narx (+25%)'
  };

  const qualityNames: Record<string, string> = {
    standard: 'Standart',
    specialty: 'Specialty 100% Arabica',
    premium_blend: 'Italiya Premium Qovurmasi'
  };

  return (
    <div className="space-y-6">
      {/* 1. Hero City Panorama & Termiz Business News Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-stone-800 bg-stone-900 shadow-xl">
        <div className="h-48 sm:h-56 w-full relative bg-gradient-to-r from-stone-900 via-amber-950/40 to-stone-900">
          <img
            src="/src/assets/images/termiz_coffee_hero_1793950469298.jpg"
            alt="Termiz Coffee Hero"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent" />

          {/* Overlay Content */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold mb-1 backdrop-blur-sm">
                <Coffee className="w-3.5 h-3.5" />
                <span>{model.name}</span>
                <span className="text-stone-400">·</span>
                <span>Termiz Shahri</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-stone-100 tracking-tight">
                {currentMonth}-Oy Operatsion Jarayoni
              </h1>
            </div>

            {/* Quick Action Button to Advance Month */}
            <button
              type="button"
              onClick={() => {
                soundManager.playCash();
                onSimulateMonth();
              }}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-950/60 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <span>{currentMonth}-Oyni Yakunlash va Hisobot</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Termiz Business News & Competitor Sub-strip */}
        <div className="p-4 sm:p-5 bg-stone-950/90 border-t border-stone-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Termiz Business News */}
          <div className="flex items-start gap-3 bg-stone-900/60 p-3 rounded-xl border border-stone-800">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
              <Newspaper className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-bold text-amber-400">TERMIZ BUSINESS NEWS</span>
                <span className="text-[10px] text-stone-500 font-mono">#{currentMonth}-oy</span>
              </div>
              <h4 className="font-semibold text-stone-200 mb-1">{currentNews.headline}</h4>
              <p className="text-stone-400">{currentNews.snippet}</p>
              <div className="mt-1 text-[11px] text-amber-300/90 font-medium">
                💡 <span className="underline">Strategik maslahat:</span> {currentNews.strategicTip}
              </div>
            </div>
          </div>

          {/* Competitor: Surxon Coffee Roasters */}
          <div className="flex items-start gap-3 bg-stone-900/60 p-3 rounded-xl border border-stone-800">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-bold text-sky-400">RAQOBATCHI: {competitor.name}</span>
                <span className="text-[10px] font-mono text-stone-400">
                  Ulush: {competitor.marketShare}%
                </span>
              </div>
              <p className="text-stone-300 mt-1">{competitor.recentAction}</p>
              <div className="mt-1 text-[11px] text-stone-400">
                Finjon narxi: <span className="text-stone-200 font-mono">{competitor.pricePerCup.toLocaleString()} so‘m</span> · Obro‘si: <span className="text-stone-200 font-mono">{competitor.reputation}/100</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Key Business Metrics Grid (9 required cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* 1. Kapital va pul zaxirasi */}
        <MetricCard
          title="Kapital va Pul Zaxirasi"
          value={formatSoM(currentCapital)}
          subValue={currentCapital > 150000000 ? `Boshlang‘ichdan +${formatSoM(currentCapital - 150000000)}` : `Boshlang‘ich: 150 mln`}
          icon={Coins}
          trend={currentCapital >= 150000000 ? 'up' : 'down'}
          trendText={currentCapital >= 150000000 ? 'O‘sishda' : 'Kamayishda'}
          statusBadge={{
            label: currentCapital < 25000000 ? 'Xavfli zaxira' : 'Barqaror',
            variant: currentCapital < 25000000 ? 'danger' : 'good'
          }}
        />

        {/* 2. Oylik Daromad */}
        <MetricCard
          title="Oylik Daromad"
          value={lastRecord ? formatSoM(lastRecord.revenue) : 'Kutilmoqda'}
          subValue={lastRecord ? `${lastRecord.customers.toLocaleString()} ta sotuv` : '1-oy boshlanishi'}
          icon={TrendingUp}
          trend="up"
          trendText={lastRecord ? `Finjon o‘rtacha narxi: ${Math.round(lastRecord.revenue / (lastRecord.customers || 1)).toLocaleString()} so‘m` : undefined}
        />

        {/* 3. Oylik Xarajat */}
        <MetricCard
          title="Oylik Xarajat"
          value={lastRecord ? formatSoM(lastRecord.expenses.total) : 'Hisoblanmoqda'}
          subValue={lastRecord ? `Maosh: ${formatSoM(lastRecord.expenses.salaries)}` : 'Ijara + maosh + xomashyo'}
          icon={TrendingDown}
          trend={lastRecord && lastRecord.expenses.total > 25000000 ? 'down' : 'neutral'}
          trendText={lastRecord ? `Xomashyo: ${formatSoM(lastRecord.expenses.inventory)}` : undefined}
        />

        {/* 4. Sof Foyda */}
        <MetricCard
          title="Sof Foyda"
          value={lastRecord ? formatSoM(lastRecord.netProfit) : '0 so‘m'}
          subValue={lastRecord && lastRecord.netProfit >= 0 ? 'Foydali oy' : lastRecord ? 'Zarar' : 'Hisob-kitob kutilmoqda'}
          icon={DollarSign}
          trend={lastRecord && lastRecord.netProfit >= 0 ? 'up' : 'down'}
          trendText={lastRecord && lastRecord.netProfit >= 0 ? `+${formatSoM(lastRecord.netProfit)}` : lastRecord ? `${formatSoM(lastRecord.netProfit)}` : undefined}
          statusBadge={{
            label: lastRecord && lastRecord.netProfit >= 0 ? 'Ijobiy' : 'Salbiy',
            variant: lastRecord && lastRecord.netProfit >= 0 ? 'good' : 'danger'
          }}
        />

        {/* 5. Mijozlar Soni */}
        <MetricCard
          title="Mijozlar Soni (Oylik)"
          value={lastRecord ? `${lastRecord.customers.toLocaleString()} nafar` : `~${model.baseMonthlyDemand.toLocaleString()}`}
          subValue={`Xizmat quvvati: ${effectiveCapacity.toLocaleString()}`}
          icon={Users}
          trend={lastRecord && lastRecord.isOverloaded ? 'down' : 'up'}
          trendText={lastRecord && lastRecord.isOverloaded ? 'Navbat tiqilishi!' : 'Barqaror oqim'}
          statusBadge={{
            label: lastRecord && lastRecord.isOverloaded ? 'Yuklama yuqori' : 'Normal',
            variant: lastRecord && lastRecord.isOverloaded ? 'warning' : 'good'
          }}
        />

        {/* 6. Mijozlar Mamnunligi */}
        <MetricCard
          title="Mijozlar Mamnunligi"
          value={`${satisfaction}%`}
          subValue={satisfaction >= 85 ? 'Mijozlar juda rozi' : satisfaction >= 70 ? 'O‘rtacha qoniqish' : 'Shikoyatlar mavjud'}
          icon={Star}
          trend={satisfaction >= 80 ? 'up' : 'down'}
          statusBadge={{
            label: satisfaction >= 85 ? 'A\'lo daraja' : satisfaction >= 70 ? 'Yetarli' : 'Past',
            variant: satisfaction >= 85 ? 'good' : satisfaction >= 70 ? 'warning' : 'danger'
          }}
        />

        {/* 7. Brend Obro‘si */}
        <MetricCard
          title="Brend Obro‘si"
          value={`${reputation} / 100`}
          subValue={reputation >= 80 ? 'Termizda taniqli brend' : reputation >= 60 ? 'Rivojlanayotgan' : 'Noma\'lum'}
          icon={Award}
          trend={reputation >= 70 ? 'up' : 'neutral'}
          statusBadge={{
            label: reputation >= 80 ? 'Yuqori obro‘' : 'O‘rtacha',
            variant: reputation >= 80 ? 'good' : 'warning'
          }}
        />

        {/* 8. Xodimlar Soni */}
        <MetricCard
          title="Xodimlar Soni"
          value={`${totalStaffCount} nafar`}
          subValue={`${baristas} barista · ${cashiers} kassir`}
          icon={Briefcase}
          trend="neutral"
          trendText={`Quvvat: ${effectiveCapacity.toLocaleString()} ta kofe`}
        />

        {/* 9. Biznes Xavfi */}
        <MetricCard
          title="Biznes Xavfi"
          value={riskLevel}
          subValue={riskLevel === 'Past' ? 'Moliyaviy xavfsiz holat' : riskLevel === 'O‘rtacha' ? 'Ehtiyotkorlik talab' : 'Kritik holat!'}
          icon={AlertTriangle}
          trend={riskLevel === 'Past' ? 'up' : 'down'}
          statusBadge={{
            label: riskLevel === 'Past' ? 'Xavfsiz' : riskLevel === 'O‘rtacha' ? 'O‘rtacha xavf' : 'Yuqori xavf',
            variant: riskLevel === 'Past' ? 'good' : riskLevel === 'O‘rtacha' ? 'warning' : 'danger'
          }}
        />
      </div>

      {/* 3. Operational Quick Summary & Control Strip */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-stone-400 block">Joriy Oy Sozlamalari:</span>
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-stone-200">
            <span>Sifat: <strong className="text-amber-400">{qualityNames[qualityTier] || qualityTier}</strong></span>
            <span className="text-stone-600">·</span>
            <span>Narx: <strong className="text-amber-400">{strategyNames[priceStrategy] || priceStrategy}</strong></span>
            <span className="text-stone-600">·</span>
            <span>Aksiya: <strong className="text-amber-400">{activePromotionName}</strong></span>
            <span className="text-stone-600">·</span>
            <span>Ochilgan bonuslar: <strong className="text-amber-400">{unlockedBonusIds.length} ta</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onNavigateTab('decisions');
            }}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xl border border-stone-700 transition-colors cursor-pointer"
          >
            Aksiya va Narxlarni O‘zgartirish
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onNavigateTab('staff');
            }}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xl border border-stone-700 transition-colors cursor-pointer"
          >
            Xodimlarni Boshqarish
          </button>
        </div>
      </div>
    </div>
  );
};
