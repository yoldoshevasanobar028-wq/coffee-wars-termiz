import React, { useState } from 'react';
import { ADVISORS } from '../data/gameContent';
import { MonthlyRecord, BusinessModel } from '../types/game';
import { formatSoM } from '../utils/gameEngine';
import { soundManager } from '../utils/audio';
import { Wallet, Megaphone, Target, CheckCircle2, MessageSquare } from 'lucide-react';

interface AdvisorsModalProps {
  currentMonth: number;
  currentCapital: number;
  reputation: number;
  model: BusinessModel;
  lastRecord?: MonthlyRecord;
  hasOverload: boolean;
}

export const AdvisorsModal: React.FC<AdvisorsModalProps> = ({
  currentMonth,
  currentCapital,
  reputation,
  model,
  lastRecord,
  hasOverload
}) => {
  const [selectedAdvisorId, setSelectedAdvisorId] = useState<'finance' | 'marketing' | 'strategy'>('finance');

  // Dynamic context-aware advice generator
  const getAdvisorSpeech = (id: 'finance' | 'marketing' | 'strategy'): string => {
    const netProfit = lastRecord?.netProfit || 0;

    if (id === 'finance') {
      if (currentCapital < 30000000) {
        return `Kassada atigi ${formatSoM(currentCapital)} qoldi! Hozir qimmat bonuslar yoki filiallarni ochish mutlaqo xavfli. Xarajatlarni qisqartiring, qahva donlarining tannarxini nazorat qiling va faqat sof foyda keltiruvchi tadbirlarga e'tibor qarating.`;
      }
      if (netProfit < 0) {
        return `O‘tgan oy sof zarar bilan chiqdik. Oylik xarajatlar tushumdan oshib ketgan. Agar xodimlar ortiqcha bo‘lsa yoki marketing xarajati o‘zini oqlamasa, zudlik bilan qayta ko‘rib chiqish lozim.`;
      }
      if (currentMonth >= 5 && currentCapital > 120000000) {
        return `Moliyaviy ko‘rsatkichlarimiz juda mustahkam! Kassa zaxiramiz ${formatSoM(currentCapital)} ga yetdi. Endi bemalol yuqori daromadli yangi filial yoki yetkazib berish xizmatiga sarmoya kiritish vaqti keldi.`;
      }
      return `Boshlang‘ich kapitaldan unumli foydalanmoqdamiz. Doimiy oylik xarajatlar (ijara va maosh) hisobini doimo 3 oylik zaxira bilan ushlab turing. Bank krediti yoki tashqi qarzlarga faqat zudlik bilan kengayish zarur bo‘lgandagina kiring.`;
    }

    if (id === 'marketing') {
      if (hasOverload) {
        return `Diqqat! Qahvaxonamizda allaqachon navbatlar paydo bo‘lmoqda. Hozir “1+1” yoki yirik chegirma aksiyasini e'lon qilsak, zal tiqilib, xizmat sifati tushadi va salbiy izohlar ko‘payadi. Avval xodimlar sonini ko‘paytiring, keyin reklama bering!`;
      }
      if (currentMonth === 4) {
        return `Termizda xalqaro Baxshichilik festivali boshlanmoqda! Shahar sayyohlar bilan to‘ladi. Inglizcha menyu, milliy ziravorli kofe va kechki soatlarni uzaytirish bizga rekord mijozlar oqimini olib keladi!`;
      }
      if (currentMonth === 6 || currentMonth === 7) {
        return `Termizning 44°C jaziramasi boshlandi! Odamlar issiq kofe emas, faqat muzli latte, limonad va salqinlik istaydi. Zudlik bilan “Sovuq ichimliklar” menyusini oching va Instagramda chiroyli videolar tarqating!`;
      }
      if (reputation < 65) {
        return `Brend obro‘miz pasaygan (${reputation}/100). Hozir faqat chegirma bilan emas, balki “Do‘stingiz bilan keling” yoki maxsus sifatli sovg‘a orqali mijozlar ishonchini qayta qozonishimiz kerak.`;
      }
      return `Biznes modeli (${model.name}) uchun Instagram va TikTok platformalarida Termiz yoshlarini qamrab oluvchi vizual kontent tayyorlash ayni muddao. Ayniqsa kofe + shirinlik kombo takliflari o‘rtacha chekni 30% ga oshiradi.`;
    }

    // Strategy
    if (id === 'strategy') {
      if (hasOverload) {
        return `Xizmat quvvati va talab o‘rtasidagi nomutanosiblik — kofe biznesining eng katta yashirin qotili. Barista va kassirlar sonini mijozlar oqimiga moslang. Qisqa muddatda maosh fondi oshsa ham, uzoq muddatda obro‘ingizni asrab qolasiz.`;
      }
      if (currentMonth <= 3) {
        return `Birinchi chorak — poydevor qurish davri. Raqobatchimiz “Surxon Coffee” harakatlarini sinchkovlik bilan kuzating, ammo uning har bir narx urushiga ergashmang. Barqaror xizmat va samimiy mehmondo‘stlik bilan o‘z auditoriyangizni yarating.`;
      }
      if (currentMonth >= 10) {
        return `Finita la commedia! 12 oylik chempionatning so‘nggi pallasi yaqinlashmoqda. Hozirgi asosiy vazifa — yilni rekord foyda va obro‘ bilan yakunlash. Korporativ bayram buyurtmalariga puxta tayyorlaning!`;
      }
      return `Biznesda eng muhim qoida: “Qaror → Oqibat → Tahlil → Yangi Imkoniyat”. Bir marotaba qilingan tejamkorlik (masalan, arzon qahva donlariga o‘tish) kelajakda tekshiruvlar yoki mijozlar ketishi bilan jazolanishi mumkin. Har doim 2 qadam oldinga o‘ylang.`;
    }

    return '';
  };

  const advisorIcons = {
    finance: <Wallet className="w-5 h-5 text-emerald-400" />,
    marketing: <Megaphone className="w-5 h-5 text-amber-400" />,
    strategy: <Target className="w-5 h-5 text-sky-400" />
  };

  return (
    <div className="space-y-6">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-stone-100 flex items-center gap-2 mb-1">
          <MessageSquare className="w-5 h-5 text-amber-400" />
          Biznes Maslahatchilari Kengashi
        </h2>
        <p className="text-xs text-stone-400 mb-6">
          Har bir maslahatchi o‘z sohasi bo‘yicha tahlil beradi. Maslahatlarni eshiting, lekin yakuniy qarorni tadbirkor sifatida mustaqil qabul qiling.
        </p>

        {/* Advisor Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {ADVISORS.map((advisor) => {
            const isSelected = selectedAdvisorId === advisor.id;
            return (
              <button
                key={advisor.id}
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setSelectedAdvisorId(advisor.id);
                }}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-stone-950 border-amber-500/80 shadow-md ring-1 ring-amber-500/40'
                    : 'bg-stone-950/60 border-stone-800 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-stone-800 border border-stone-700/60 flex items-center justify-center shrink-0">
                    {advisorIcons[advisor.id]}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-stone-100">{advisor.name}</h3>
                    <span className="text-xs text-amber-400/90 font-medium">{advisor.roleTitle}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Advisor Details & Speech Bubble */}
        {(() => {
          const currentAdvisor = ADVISORS.find((a) => a.id === selectedAdvisorId)!;
          return (
            <div className="bg-stone-950 border border-stone-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-stone-800/80">
                <div className="w-12 h-12 rounded-xl bg-stone-800 border border-stone-700 flex items-center justify-center">
                  {advisorIcons[currentAdvisor.id]}
                </div>
                <div>
                  <h4 className="font-bold text-base text-stone-100">{currentAdvisor.name}</h4>
                  <p className="text-xs text-stone-400">{currentAdvisor.bio}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-stone-900 border border-stone-800/80 relative">
                <span className="text-xs font-semibold text-amber-400 block mb-1">
                  {currentMonth}-oy bo‘yicha strategik tavsiya:
                </span>
                <p className="text-sm text-stone-200 leading-relaxed italic">
                  “{getAdvisorSpeech(currentAdvisor.id)}”
                </p>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};
