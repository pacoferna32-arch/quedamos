import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Heart, Coffee, UtensilsCrossed, Compass, CheckCircle2, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { calculateCompatibility } from '../utils/matchingAlgorithm';

export const CompatibilityModal: React.FC = () => {
  const { selectedCompatibilityTarget, closeCompatibilityModal, currentUser, openProposalModal } = useApp();

  if (!selectedCompatibilityTarget) return null;

  const candidate = selectedCompatibilityTarget;
  const compatibility = candidate.compatibilityDetails || calculateCompatibility(currentUser, candidate);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg bg-white dark:bg-[#1c1917] rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-6"
        >
          {/* Header Banner */}
          <div className="relative bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 px-6 py-6 text-white">
            <button
              onClick={closeCompatibilityModal}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
              aria-label="Cerrar análisis de compatibilidad"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-sm">
                <Sparkles className="w-6 h-6 text-amber-200" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-rose-100">
                  Algoritmo de Compatibilidad
                </span>
                <h3 className="text-xl font-bold">¿Por qué sois compatibles?</h3>
              </div>
            </div>

            {/* User vs Candidate Avatars & Big Match Badge */}
            <div className="mt-5 flex items-center justify-between bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
              <div className="flex items-center gap-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                />
                <div className="text-left">
                  <p className="text-xs font-medium text-rose-100">Tú</p>
                  <p className="text-sm font-bold truncate max-w-[90px]">{currentUser.name}</p>
                </div>
              </div>

              <div className="flex flex-col items-center px-2">
                <div className="px-3 py-1 rounded-full bg-white text-rose-600 font-extrabold text-sm shadow-md flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                  <span>{compatibility.score}%</span>
                </div>
                <span className="text-[10px] text-white/90 mt-1 font-medium text-center">
                  Afinidad calculada
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs font-medium text-rose-100">Candidato/a</p>
                  <p className="text-sm font-bold truncate max-w-[90px]">{candidate.name}</p>
                </div>
                <img
                  src={candidate.avatar}
                  alt={candidate.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                />
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* Highlighted Affinity summary */}
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40">
              <p className="text-sm font-semibold text-rose-800 dark:text-rose-300">
                {compatibility.dateAffinity}
              </p>
              <p className="text-xs text-rose-600 dark:text-rose-400 mt-1">
                Basado en vuestro cuestionario de relación, afinidades de ocio y sintonía en planes de Café, Comida y Actividad.
              </p>
            </div>

            {/* Why you match bullet points */}
            <div>
              <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Puntos clave de conexión
              </h4>
              <ul className="space-y-2.5">
                {compatibility.reasons.map((reason, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-sm text-stone-700 dark:text-stone-300 bg-stone-50 dark:bg-stone-900/60 p-3 rounded-xl border border-stone-200/60 dark:border-stone-800"
                  >
                    <span className="inline-block w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Shared Hobbies Grid */}
            {compatibility.sharedHobbies.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-500" /> Aficiones compartidas del cuestionario
                </h4>
                <div className="flex flex-wrap gap-2">
                  {compatibility.sharedHobbies.map((hobby, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-800/40 text-amber-800 dark:text-amber-300 text-xs font-semibold"
                    >
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      {hobby}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Chemistry in Date Categories */}
            <div className="space-y-3 pt-2 border-t border-stone-100 dark:border-stone-800">
              <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
                Sintonía en los 3 Pilares de Quedar
              </h4>

              <div className="grid grid-cols-1 gap-2.5">
                {/* Café */}
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900/50 border border-stone-200/70 dark:border-stone-800 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 shrink-0">
                    <Coffee className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-900 dark:text-stone-100">Café y Conversación</p>
                    <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                      {candidate.name} propone: <span className="font-medium text-stone-800 dark:text-stone-200">{candidate.coffeeStyle}</span>
                    </p>
                  </div>
                </div>

                {/* Comer */}
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900/50 border border-stone-200/70 dark:border-stone-800 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 shrink-0">
                    <UtensilsCrossed className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-900 dark:text-stone-100">Cena o Tapeo</p>
                    <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                      {candidate.name} prefiere: <span className="font-medium text-stone-800 dark:text-stone-200">{candidate.foodCuisine}</span>
                    </p>
                  </div>
                </div>

                {/* Actividad */}
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900/50 border border-stone-200/70 dark:border-stone-800 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 shrink-0">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-900 dark:text-stone-100">Actividad Dinámica</p>
                    <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                      Propuesta: <span className="font-medium text-stone-800 dark:text-stone-200">{candidate.activityPick}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Proximity Pill */}
            <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 pt-1">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              <span>
                Ubicación: <strong className="text-stone-700 dark:text-stone-300">{candidate.neighborhood}, {candidate.city}</strong> (a {candidate.distanceKm} km de ti)
              </span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-4 bg-stone-50 dark:bg-stone-900/80 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between gap-3">
            <button
              onClick={closeCompatibilityModal}
              className="px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-sm font-semibold hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              Cerrar
            </button>

            <button
              onClick={() => {
                closeCompatibilityModal();
                openProposalModal(candidate);
              }}
              className="flex-1 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-white" /> Proponer una Cita a {candidate.name.split(' ')[0]}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
