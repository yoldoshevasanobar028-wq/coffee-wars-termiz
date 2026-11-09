import React, { useState } from 'react';
import { BUSINESS_MODELS } from '../data/gameContent';
import { BusinessModelId, PlayerProfile } from '../types/game';
import { soundManager } from '../utils/audio';
import { Check, Coffee, Sparkles, Building, User, Users } from 'lucide-react';

interface RegistrationModalProps {
  onStartGame: (profile: PlayerProfile) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ onStartGame }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [groupOrClass, setGroupOrClass] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [selectedModelId, setSelectedModelId] = useState<BusinessModelId>('classic');
  const [errorMsg, setErrorMsg] = useState('');

  const handleFillDemo = () => {
    soundManager.playClick();
    setFirstName('Azizbek');
    setLastName('Rahimov');
    setGroupOrClass('TerDU Iqtisodiyot 3-kurs');
    setBusinessName('Termiz Artisanal Roastery');
    setSelectedModelId('classic');
    setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !groupOrClass.trim() || !businessName.trim()) {
      setErrorMsg('Iltimos, barcha maydonlarni to‘ldiring.');
      soundManager.playWarning();
      return;
    }

    soundManager.playSuccess();
    onStartGame({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      groupOrClass: groupOrClass.trim(),
      businessName: businessName.trim(),
      modelId: selectedModelId,
      startedAt: new Date().toISOString()
    });
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full">
        {/* Hero Title & City Context */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-medium text-amber-400 mb-3">
            <Coffee className="w-3.5 h-3.5" />
            <span>Surxondaryo · Termiz Shahri</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-100">
            Coffee Wars: Termiz
          </h1>
          <p className="mt-2 text-sm sm:text-base text-stone-400 max-w-xl mx-auto">
            12 oylik interaktiv biznes simulyatsiyasi. Boshlang‘ich kapital: <span className="text-amber-400 font-mono font-bold">150 000 000 so‘m</span>.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-8">
          {/* Player Info Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-stone-100 flex items-center gap-2">
                <User className="w-4 h-4 text-amber-400" />
                1. Qatnashchi Ma'lumotlari
              </h2>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-xs text-amber-400 hover:text-amber-300 font-medium px-2.5 py-1 rounded bg-stone-800 border border-stone-700/60 hover:bg-stone-700 transition-colors"
              >
                Demo to‘ldirish
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">Ism</label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Masalan: Sardor"
                  className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3.5 py-2.5 text-sm text-stone-100 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">Familiya</label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Masalan: Qodirov"
                  className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3.5 py-2.5 text-sm text-stone-100 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">Guruh yoki Sinf</label>
                <input
                  type="text"
                  required
                  value={groupOrClass}
                  onChange={(e) => setGroupOrClass(e.target.value)}
                  placeholder="Masalan: TerDU Iqtisodiyot 3-kurs yoki 11-maktab 10-A"
                  className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3.5 py-2.5 text-sm text-stone-100 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">Kofexona Nomi (Brend)</label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Masalan: Surxon Artisan Coffee"
                  className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3.5 py-2.5 text-sm text-stone-100 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Business Model Selection Section */}
          <div className="pt-4 border-t border-stone-800">
            <h2 className="text-lg font-bold text-stone-100 flex items-center gap-2 mb-2">
              <Building className="w-4 h-4 text-amber-400" />
              2. Biznes Modelini Tanlang
            </h2>
            <p className="text-xs text-stone-400 mb-4">
              Har bir modelning boshlang‘ich marjasi, narx siyosati va talab ko‘lami farq qiladi.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {BUSINESS_MODELS.map((model) => {
                const isSelected = selectedModelId === model.id;
                return (
                  <div
                    key={model.id}
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedModelId(model.id);
                    }}
                    className={`relative cursor-pointer rounded-xl border p-4 transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-amber-950/20 border-amber-500/80 shadow-md ring-1 ring-amber-500/50'
                        : 'bg-stone-950/60 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    <div>
                      {/* Image Preview with safe fallback */}
                      <div className="h-32 w-full rounded-lg overflow-hidden mb-3 bg-gradient-to-br from-amber-950/40 to-stone-900 border border-stone-800 relative flex items-center justify-center">
                        <Coffee className="w-10 h-10 text-amber-500/20 absolute" />
                        <img
                          src={model.image}
                          alt={model.name}
                          className="w-full h-full object-cover relative z-10"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent z-20" />
                        <span className="absolute bottom-2 left-2 text-xs font-semibold text-white drop-shadow z-30">
                          {model.name}
                        </span>
                      </div>

                      <p className="text-xs text-stone-300 mb-3">{model.description}</p>

                      <div className="space-y-1 mb-3">
                        <div className="text-[11px] text-emerald-400">
                          <span className="font-semibold">Ustunlik:</span> {model.pros[0]}
                        </div>
                        <div className="text-[11px] text-amber-300">
                          <span className="font-semibold">Ehtiyotkorlik:</span> {model.cons[0]}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between text-xs font-mono tabular-nums text-stone-400">
                      <span>Baza narx: <strong className="text-stone-200">{model.basePrice.toLocaleString()} so‘m</strong></span>
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center border ${isSelected ? 'bg-amber-500 border-amber-400 text-stone-950' : 'border-stone-700'}`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-lg text-xs text-rose-300">
              {errorMsg}
            </div>
          )}

          {/* Submit CTA */}
          <div className="pt-4 flex items-center justify-end gap-4">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm rounded-xl shadow-lg shadow-amber-950/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Biznesni Boshlash (150 000 000 so‘m)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
