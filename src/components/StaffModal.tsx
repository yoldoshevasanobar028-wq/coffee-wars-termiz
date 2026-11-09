import React from 'react';
import { StaffMember, StaffRole } from '../types/game';
import { formatSoM } from '../utils/gameEngine';
import { soundManager } from '../utils/audio';
import {
  Users,
  UserPlus,
  UserMinus,
  GraduationCap,
  AlertTriangle,
  CheckCircle2,
  Coffee,
  CreditCard,
  Sparkles,
  Briefcase
} from 'lucide-react';

interface StaffManagementProps {
  staff: StaffMember[];
  onUpdateStaffCount: (role: StaffRole, delta: number) => void;
  onTrainStaff: () => void;
  currentCapital: number;
  expectedCustomers: number;
  staffTrainedCount: number;
}

export const StaffManagementView: React.FC<StaffManagementProps> = ({
  staff,
  onUpdateStaffCount,
  onTrainStaff,
  currentCapital,
  expectedCustomers,
  staffTrainedCount
}) => {
  const baristas = staff.find((s) => s.role === 'barista')?.count || 0;
  const cashiers = staff.find((s) => s.role === 'cashier')?.count || 0;
  const cleaners = staff.find((s) => s.role === 'cleaner')?.count || 0;
  const managers = staff.find((s) => s.role === 'manager')?.count || 0;

  const trainingBonusMultiplier = 1 + staffTrainedCount * 0.15;
  const baristaCapacity = Math.round(baristas * 1800 * trainingBonusMultiplier);
  const cashierCapacity = cashiers * 3600;
  const totalEffectiveCapacity = Math.min(baristaCapacity, cashierCapacity > 0 ? cashierCapacity : 1000);

  const totalMonthlyPayroll = staff.reduce((acc, s) => acc + s.count * s.salary, 0);
  const isOverloaded = expectedCustomers > totalEffectiveCapacity && totalEffectiveCapacity > 0;
  const isSeverelyUnderstaffed = baristas === 0 || cashiers === 0;

  const roleIcons: Record<StaffRole, React.ReactNode> = {
    barista: <Coffee className="w-5 h-5 text-amber-400" />,
    cashier: <CreditCard className="w-5 h-5 text-sky-400" />,
    cleaner: <Sparkles className="w-5 h-5 text-emerald-400" />,
    manager: <Briefcase className="w-5 h-5 text-purple-400" />
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Live Capacity Load Meter */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-stone-100 flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-400" />
              Xodimlarni Boshqarish va Xizmat Quvvati
            </h2>
            <p className="text-xs text-stone-400 mt-1">
              Xodimlar soni va mijozlar oqimi o‘rtasida realistik muvozanat o‘rnating.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-stone-950 border border-stone-800 px-4 py-2 rounded-xl text-right">
              <span className="text-[11px] text-stone-500 block">Oylik maosh fondi</span>
              <span className="text-sm font-bold font-mono text-stone-200">
                {formatSoM(totalMonthlyPayroll)}
              </span>
            </div>
          </div>
        </div>

        {/* Capacity vs Demand Visual Indicator */}
        <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 text-xs font-mono">
            <div>
              <span className="text-stone-400">Oylik xizmat quvvati: </span>
              <span className="text-amber-400 font-bold">{totalEffectiveCapacity.toLocaleString()} ta kofe</span>
            </div>
            <div>
              <span className="text-stone-400">Kutilayotgan talab: </span>
              <span className="text-stone-200 font-bold">~{expectedCustomers.toLocaleString()} mijoz</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-3 bg-stone-800 rounded-full overflow-hidden flex">
            <div
              className={`h-full transition-all duration-300 ${
                isOverloaded
                  ? 'bg-rose-500'
                  : expectedCustomers / (totalEffectiveCapacity || 1) > 0.8
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
              }`}
              style={{
                width: `${Math.min(100, (expectedCustomers / (totalEffectiveCapacity || 1)) * 100)}%`
              }}
            />
          </div>

          <div className="mt-3 flex items-center gap-2 text-xs">
            {isSeverelyUnderstaffed ? (
              <span className="text-rose-400 flex items-center gap-1.5 font-semibold">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                DIQQAT: Kamida 1 ta barista va 1 ta kassir bo‘lishi shart! Aks holda savdo to‘xtaydi.
              </span>
            ) : isOverloaded ? (
              <span className="text-rose-400 flex items-center gap-1.5 font-semibold">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                Haddan tashqari yuklama! Quvvat yetishmayapti. Uzun navbat tufayli mijozlar ketishi va norozilik kelib chiqadi.
              </span>
            ) : (
              <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                Optimal xizmat quvvati. Xodimlar barcha mijozlarga bemalol sifatli xizmat ko‘rsatadi.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 2. Staff Roles Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {staff.map((member) => (
          <div
            key={member.role}
            className="bg-stone-900 border border-stone-800 rounded-2xl p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-stone-800 border border-stone-700/60 flex items-center justify-center">
                    {roleIcons[member.role]}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-stone-100">{member.title}</h3>
                    <span className="text-xs font-mono text-stone-400">
                      Maosh: {formatSoM(member.salary)} / oy
                    </span>
                  </div>
                </div>

                {/* Counter & Actions */}
                <div className="flex items-center gap-2 bg-stone-950 border border-stone-800 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      onUpdateStaffCount(member.role, -1);
                    }}
                    disabled={member.count <= 0}
                    className="w-7 h-7 rounded flex items-center justify-center text-stone-300 hover:text-white hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <UserMinus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-6 text-center font-mono font-bold text-sm text-amber-400">
                    {member.count}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      onUpdateStaffCount(member.role, 1);
                    }}
                    className="w-7 h-7 rounded flex items-center justify-center text-stone-300 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-stone-400 mt-2 mb-3">{member.description}</p>
            </div>

            <div className="pt-2 border-t border-stone-800/80 text-[11px] text-amber-300/90 font-mono">
              Ta'siri: {member.effect}
            </div>
          </div>
        ))}
      </div>

      {/* 3. Team Training & Motivation Panel */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-stone-100 flex items-center gap-2 mb-1">
            <GraduationCap className="w-5 h-5 text-amber-400" />
            Xodimlarni O‘qitish va Kofe Treningi
          </h3>
          <p className="text-xs text-stone-400 max-w-xl">
            Toshkentlik barista-trenerni taklif qilib, xodimlarning tezligi va xizmat sifatini oshiring.
            Barista quvvati +15% ga oshadi va mijozlar qoniqishi mustahkamlanadi.
          </p>
          <div className="mt-2 text-xs font-mono text-stone-400">
            O‘qitilgan daraja: <span className="text-amber-400 font-bold">{staffTrainedCount} marta</span>
          </div>
        </div>

        <button
          type="button"
          disabled={currentCapital < 3000000}
          onClick={() => {
            soundManager.playCash();
            onTrainStaff();
          }}
          className="px-5 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-100 font-semibold text-xs rounded-xl border border-stone-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <GraduationCap className="w-4 h-4 text-amber-400" />
          <span>Trening o‘tkazish (3 000 000 so‘m)</span>
        </button>
      </div>
    </div>
  );
};
