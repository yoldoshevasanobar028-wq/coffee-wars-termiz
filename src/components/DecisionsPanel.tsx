import React from 'react';
import { Promotion, BonusItem, PromotionId } from '../types/game';
import { PROMOTIONS, BONUS_ITEMS } from '../data/gameContent';
import { formatSoM } from '../utils/gameEngine';
import { soundManager } from '../utils/audio';
import {
  Tag,
  Coffee,
  Coins,
  Megaphone,
  Sparkles,
  Lock,
  Unlock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface DecisionsPanelProps {
  currentCapital: number;
  currentReputation: number;
  lastMonthlyProfit: number;
  lastCustomers: number;
  qualityTier: 'standard' | 'specialty' | 'premium_blend';
  setQualityTier: (tier: 'standard' | 'specialty' | 'premium_blend') => void;
  priceStrategy: 'budget' | 'balanced' | 'premium';
  setPriceStrategy: (strategy: 'budget' | 'balanced' | 'premium') => void;
  marketingBudget: number;
  setMarketingBudget: (budget: number) => void;
  activePromotionId: PromotionId;
  setActivePromotionId: (id: PromotionId) => void;
  unlockedBonusIds: string[];
  onUnlockBonus: (bonus: BonusItem) => void;
}

export const DecisionsPanel: React.FC<DecisionsPanelProps> = ({
  currentCapital,
  currentReputation,
  lastMonthlyProfit,
  lastCustomers,
  qualityTier,
  setQualityTier,
  priceStrategy,
  setPriceStrategy,
  marketingBudget,
  setMarketingBudget,
  activePromotionId,
  setActivePromotionId,
  unlockedBonusIds,
  onUnlockBonus
}) => {
  return (
    <div className="space-y-8">
      {/* 1. Monthly Operational Strategy (Pricing, Bean Quality, Marketing) */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
        <h2 className="text-base sm:text-lg font-bold text-stone-100 flex items-center gap-2 mb-1">
          <Coffee className="w-5 h-5 text-amber-400" />
          Oylik Narx va Xomashyo Strategiyasi
        </h2>
        <p className="text-xs text-stone-400 mb-6">
          Har oy uchun qahva donlari sifati, chakana sotuv narxi va marketing byudjetini moslashtiring.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Coffee Bean Quality Tier */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-stone-300 block">
              Qahva doni sifati
            </label>
            <div className="space-y-2">
              {[
                { id: 'standard', label: 'Standart Robusta/Arabica', desc: 'Baza tannarx, odatiy sifat' },
                { id: 'specialty', label: 'Specialty 100% Arabica', desc: 'Tannarx +22%, obro‘ va lazzat +4' },
                { id: 'premium_blend', label: 'Italiya Premium Qovurmasi', desc: 'Tannarx +45%, elita mijozlar sevimli tanlovi' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setQualityTier(item.id as any);
                  }}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                    qualityTier === item.id
                      ? 'bg-amber-950/30 border-amber-500/80 text-stone-100 ring-1 ring-amber-500/40'
                      : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <div className="font-semibold text-stone-200">{item.label}</div>
                  <div className="text-[11px] text-stone-400 mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Retail Pricing Strategy */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-stone-300 block">
              Chakana Narx Siyosati
            </label>
            <div className="space-y-2">
              {[
                { id: 'budget', label: 'Hamyonbop (-15% arzon)', desc: 'Mijozlar oqimi +25%, lekin finjon marjasi kamayadi' },
                { id: 'balanced', label: 'Muvozanatli (Baza narx)', desc: 'Optimal narx va marja nisbati' },
                { id: 'premium', label: 'Yuqori Narx (+25% qimmat)', desc: 'Har finjondan katta foyda, biroq talaba mijozlar kamayadi' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setPriceStrategy(item.id as any);
                  }}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                    priceStrategy === item.id
                      ? 'bg-amber-950/30 border-amber-500/80 text-stone-100 ring-1 ring-amber-500/40'
                      : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <div className="font-semibold text-stone-200">{item.label}</div>
                  <div className="text-[11px] text-stone-400 mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Marketing Spend */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-stone-300 block">
              Oylik Reklama & SMM Byudjeti
            </label>
            <div className="space-y-2">
              {[
                { amount: 0, label: '0 so‘m (Organik)', desc: 'Faqat tabiiy o‘tuvchi mijozlar' },
                { amount: 3000000, label: '3 000 000 so‘m', desc: 'Telegram va mahalliy ko‘cha flayerlari (+15% mijoz)' },
                { amount: 7000000, label: '7 000 000 so‘m', desc: 'Instagram Reels va Termiz blogerlari (+32% mijoz)' },
                { amount: 15000000, label: '15 000 000 so‘m', desc: 'Shahar bo‘ylab agressiv bilbord va targeted ads (+55% mijoz)' }
              ].map((item) => (
                <button
                  key={item.amount}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setMarketingBudget(item.amount);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all ${
                    marketingBudget === item.amount
                      ? 'bg-amber-950/30 border-amber-500/80 text-stone-100 ring-1 ring-amber-500/40'
                      : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <div className="font-mono font-semibold text-stone-200">{item.label}</div>
                  <div className="text-[11px] text-stone-400 mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Marketing Promotions (Aksiyalar) */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
        <h2 className="text-base sm:text-lg font-bold text-stone-100 flex items-center gap-2 mb-1">
          <Tag className="w-5 h-5 text-amber-400" />
          Aksiya va Marketing Tizimi
        </h2>
        <p className="text-xs text-stone-400 mb-6">
          Katta aksiya mijozlarni ko‘paytiradi. Biroq xodimlar quvvati yetarli bo‘lmasa, navbat uzayadi va mijozlar norozi bo‘ladi!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROMOTIONS.map((promo) => {
            const isSelected = activePromotionId === promo.id;
            return (
              <div
                key={promo.id}
                onClick={() => {
                  soundManager.playClick();
                  setActivePromotionId(promo.id);
                }}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-950/20 border-amber-500 ring-1 ring-amber-500/50'
                    : 'bg-stone-950/60 border-stone-800 hover:border-stone-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-sm text-stone-100">{promo.name}</span>
                    <span className="text-[11px] font-mono text-stone-400">
                      {promo.cost === 0 ? 'Bepul' : formatSoM(promo.cost)}
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 mb-3">{promo.description}</p>
                </div>

                <div className="pt-2 border-t border-stone-800/80 space-y-1 text-[11px]">
                  <div className="flex justify-between font-mono">
                    <span className="text-stone-500">Mijozlar oqimi:</span>
                    <span className="text-emerald-400 font-semibold">+{promo.customerBoostPercent}%</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-stone-500">Xodimlar yuki:</span>
                    <span className={promo.staffLoadMultiplier > 1.3 ? 'text-rose-400 font-semibold' : 'text-stone-300'}>
                      {promo.staffLoadMultiplier}x
                    </span>
                  </div>
                  <div className="text-stone-400 italic text-[10px] pt-1">
                    {promo.riskNote}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Unlockable Bonuses & Growth (Bonus va Rivojlanish Tizimi) */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-stone-100 flex items-center gap-2 mb-1">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Bonus va Rivojlanish Tizimi
            </h2>
            <p className="text-xs text-stone-400">
              Yangi mahsulot yoki xizmat qo‘shimcha daromad keltiradi, ammo kapital, zaxira va oylik texnik xarajat talab qiladi.
            </p>
          </div>
          <div className="text-xs font-mono text-stone-400 bg-stone-950 px-3 py-1.5 rounded-lg border border-stone-800 self-start sm:self-auto">
            Mavjud kapital: <span className="text-amber-400 font-semibold">{formatSoM(currentCapital)}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BONUS_ITEMS.map((bonus) => {
            const isUnlocked = unlockedBonusIds.includes(bonus.id);
            const canAfford = currentCapital >= bonus.cost;
            const meetsRequirements =
              currentCapital >= bonus.minCapitalRequired &&
              currentReputation >= bonus.minReputationRequired &&
              (lastMonthlyProfit >= bonus.minMonthlyProfitRequired || lastMonthlyProfit === 0);

            return (
              <div
                key={bonus.id}
                className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                  isUnlocked
                    ? 'bg-emerald-950/15 border-emerald-800/60'
                    : meetsRequirements && canAfford
                    ? 'bg-stone-950/70 border-stone-700 hover:border-amber-500/60'
                    : 'bg-stone-950/40 border-stone-850 opacity-75'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-stone-100 flex items-center gap-2">
                      {isUnlocked ? (
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : meetsRequirements && canAfford ? (
                        <Unlock className="w-4 h-4 text-amber-400 shrink-0" />
                      ) : (
                        <Lock className="w-4 h-4 text-stone-500 shrink-0" />
                      )}
                      {bonus.name}
                    </span>
                    <span className="text-xs font-mono font-semibold text-stone-300">
                      {formatSoM(bonus.cost)}
                    </span>
                  </div>

                  <p className="text-xs text-stone-400 mb-3">{bonus.description}</p>

                  <div className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-[11px] space-y-1 mb-3">
                    <div className="text-emerald-400 font-medium">
                      Oylik tushum: +{formatSoM(bonus.addedRevenuePerMonth)}
                    </div>
                    <div className="text-stone-400">
                      Oylik doimiy xarajat: {formatSoM(bonus.monthlyExpense)}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between">
                  <div className="text-[10px] text-stone-500 font-mono">
                    Talab: Obro‘ {bonus.minReputationRequired}+ · Kapital {formatSoM(bonus.minCapitalRequired)}
                  </div>

                  {isUnlocked ? (
                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                      Ochilgan
                    </span>
                  ) : (
                    <button
                      type="button"
                      disabled={!canAfford || !meetsRequirements}
                      onClick={() => {
                        soundManager.playCash();
                        onUnlockBonus(bonus);
                      }}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                        canAfford && meetsRequirements
                          ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 cursor-pointer shadow'
                          : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                      }`}
                    >
                      Sotib olish
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
