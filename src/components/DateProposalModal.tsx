import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PlanCategory } from '../types';
import { CATEGORY_METADATA } from '../data/mockData';
import {
  X,
  Coffee,
  UtensilsCrossed,
  Sparkles,
  MapPin,
  Send
} from 'lucide-react';

export const DateProposalModal: React.FC = () => {
  const {
    proposalModalTarget,
    closeProposalModal,
    sendDateInvitation
  } = useApp();

  const [category, setCategory] = useState<PlanCategory>('cafe');
  const [spotName, setSpotName] = useState<string>('');
  const [dateTime, setDateTime] = useState<string>('Este sábado a las 11:30');
  const [customDateTime, setCustomDateTime] = useState<string>('');
  const [note, setNote] = useState<string>('');

  useEffect(() => {
    if (proposalModalTarget) {
      const initialCat = proposalModalTarget.category || 'cafe';
      setCategory(initialCat);

      // Pre-fill target's favorite spot if available
      const personPlan = proposalModalTarget.profile.plans[initialCat];
      if (personPlan && personPlan.spot) {
        setSpotName(personPlan.spot);
      } else {
        setSpotName(CATEGORY_METADATA[initialCat].spotsSuggestions[0]);
      }

      setNote(`¡Hola ${proposalModalTarget.profile.name}! Me encantaría que quedásemos para ${CATEGORY_METADATA[initialCat].label.toLowerCase()}. ¿Te apetece?`);
    }
  }, [proposalModalTarget]);

  if (!proposalModalTarget) return null;

  const { profile } = proposalModalTarget;
  const currentMeta = CATEGORY_METADATA[category];

  const handleCategoryChange = (newCat: PlanCategory) => {
    setCategory(newCat);
    const personPlan = profile.plans[newCat];
    if (personPlan && personPlan.spot) {
      setSpotName(personPlan.spot);
    } else {
      setSpotName(CATEGORY_METADATA[newCat].spotsSuggestions[0]);
    }
    setNote(`¡Hola ${profile.name}! Me encantaría que quedásemos para ${CATEGORY_METADATA[newCat].label.toLowerCase()}. ¿Te apetece?`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalDateTime = customDateTime.trim() || dateTime;
    const finalTitle = currentMeta.label;

    sendDateInvitation({
      toUserId: profile.id,
      recipientName: profile.name,
      recipientAvatar: profile.avatar,
      category,
      title: finalTitle,
      spotName: spotName || currentMeta.spotsSuggestions[0],
      dateTime: finalDateTime,
      note: note.trim()
    });
  };

  const presetTimes = [
    'Hoy a las 19:30',
    'Mañana por la tarde (18:00)',
    'Este viernes noche (21:00)',
    'Este sábado (11:30)',
    'Domingo mediodía (13:30)'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-[#1c1917] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-800 transition-colors">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={profile.avatar}
              alt={profile.name}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover border border-stone-200 dark:border-stone-700"
            />
            <div>
              <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
                Proponer cita a {profile.name}
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {profile.occupation} · {profile.city}
              </p>
            </div>
          </div>
          <button
            onClick={closeProposalModal}
            className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* 1. Category Selector */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-2">
              1. ¿Qué plan te gustaría proponer?
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleCategoryChange('cafe')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  category === 'cafe'
                    ? 'border-amber-600 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-bold ring-2 ring-amber-600/20'
                    : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 text-stone-700 dark:text-stone-300 bg-white dark:bg-[#161412]'
                }`}
              >
                <Coffee className="w-5 h-5 mx-auto mb-1 text-amber-700 dark:text-amber-400" />
                <span className="text-xs block">Tomar Café</span>
              </button>

              <button
                type="button"
                onClick={() => handleCategoryChange('comer')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  category === 'comer'
                    ? 'border-orange-600 bg-orange-50 dark:bg-orange-950/40 text-orange-900 dark:text-orange-200 font-bold ring-2 ring-orange-600/20'
                    : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 text-stone-700 dark:text-stone-300 bg-white dark:bg-[#161412]'
                }`}
              >
                <UtensilsCrossed className="w-5 h-5 mx-auto mb-1 text-orange-600 dark:text-orange-400" />
                <span className="text-xs block">Ir a Comer</span>
              </button>

              <button
                type="button"
                onClick={() => handleCategoryChange('actividad')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  category === 'actividad'
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold ring-2 ring-emerald-600/20'
                    : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 text-stone-700 dark:text-stone-300 bg-white dark:bg-[#161412]'
                }`}
              >
                <Sparkles className="w-5 h-5 mx-auto mb-1 text-emerald-700 dark:text-emerald-400" />
                <span className="text-xs block">Actividad</span>
              </button>
            </div>
          </div>

          {/* 2. Venue / Place selection */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                2. ¿Dónde quedamos?
              </label>
              {profile.plans[category]?.spot && (
                <span className="text-[11px] text-amber-800 dark:text-amber-400 font-medium">
                  Favorito de {profile.name}: {profile.plans[category].spot}
                </span>
              )}
            </div>

            <div className="relative mb-2">
              <MapPin className="w-4 h-4 absolute left-3 top-3 text-stone-400 dark:text-stone-500" />
              <input
                type="text"
                value={spotName}
                onChange={e => setSpotName(e.target.value)}
                placeholder="Nombre de la cafetería, restaurante o local..."
                required
                className="w-full text-xs pl-9 pr-3 py-2.5 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-amber-500 focus:bg-white dark:focus:bg-stone-800"
              />
            </div>

            {/* Quick venue pills */}
            <div className="flex flex-wrap gap-1.5">
              {currentMeta.spotsSuggestions.slice(0, 4).map((s, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setSpotName(s)}
                  className={`text-[11px] px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
                    spotName === s
                      ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 border-stone-900 dark:border-stone-100 font-semibold'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-transparent hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* 3. When */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-2">
              3. ¿Cuándo?
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {presetTimes.map((preset, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => {
                    setDateTime(preset);
                    setCustomDateTime('');
                  }}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                    dateTime === preset && !customDateTime
                      ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 border-stone-900 dark:border-stone-100 font-medium'
                      : 'bg-stone-50 dark:bg-stone-800/60 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-700'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={customDateTime}
              onChange={e => setCustomDateTime(e.target.value)}
              placeholder="O escribe otra fecha y hora (ej. 'Miércoles a las 17:00')..."
              className="w-full text-xs px-3 py-2 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-amber-500"
            />
          </div>

          {/* 4. Note */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                4. Mensaje personal
              </label>
              <button
                type="button"
                onClick={() => {
                  const randomIce = currentMeta.icebreakers[Math.floor(Math.random() * currentMeta.icebreakers.length)];
                  setNote(`¡Hola ${profile.name}! ${randomIce} ¿Te apetece quedar y lo comentamos?`);
                }}
                className="text-[11px] text-amber-800 dark:text-amber-400 font-semibold hover:underline cursor-pointer"
              >
                Insertar pregunta para romper el hielo
              </button>
            </div>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              rows={3}
              required
              className="w-full text-xs p-3 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-amber-500 focus:bg-white dark:focus:bg-stone-800 resize-none"
              placeholder="Escribe algo simpático para proponer la cita..."
            />
          </div>

          {/* Submit */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={closeProposalModal}
              className="px-4 py-2 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold text-white dark:text-stone-950 bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Enviar propuesta de cita</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
