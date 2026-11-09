import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Coffee, UtensilsCrossed, MessageCircle, X } from 'lucide-react';

export const MatchModal: React.FC = () => {
  const {
    matchModalTarget,
    closeMatchModal,
    currentUser,
    openProposalModal,
    setActiveConversationId,
    setActiveTab
  } = useApp();

  if (!matchModalTarget) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-md animate-fade-in">
      <div className="bg-white dark:bg-[#1c1917] rounded-3xl max-w-md w-full p-6 text-center shadow-2xl border border-stone-200 dark:border-stone-800 relative overflow-hidden transition-colors">
        {/* Close Button */}
        <button
          onClick={closeMatchModal}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-500 dark:text-stone-400 flex items-center justify-center cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Heart Icon */}
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center shadow-inner">
          <Heart className="w-7 h-7 fill-amber-700 dark:fill-amber-400" />
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100 mb-1">
          ¡Es un Match!
        </h2>
        <p className="text-xs text-stone-500 dark:text-stone-400 mb-6">
          A ti y a <strong className="text-stone-900 dark:text-stone-200">{matchModalTarget.name}</strong> os apetece quedar en persona.
        </p>

        {/* Dual Avatars */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            referrerPolicy="no-referrer"
            className="w-20 h-20 rounded-full object-cover border-3 border-white dark:border-[#1c1917] shadow-lg -mr-4 z-10"
          />
          <img
            src={matchModalTarget.avatar}
            alt={matchModalTarget.name}
            referrerPolicy="no-referrer"
            className="w-20 h-20 rounded-full object-cover border-3 border-white dark:border-[#1c1917] shadow-lg z-0"
          />
        </div>

        {/* Direct Action proposals */}
        <div className="space-y-2.5">
          <button
            onClick={() => {
              const target = matchModalTarget;
              closeMatchModal();
              openProposalModal(target, 'cafe');
            }}
            className="w-full py-3 px-4 rounded-xl bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-white dark:text-stone-950 font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
          >
            <Coffee className="w-4 h-4 text-amber-300 dark:text-amber-600" />
            <span>Proponer un café a {matchModalTarget.name}</span>
          </button>

          <button
            onClick={() => {
              const target = matchModalTarget;
              closeMatchModal();
              openProposalModal(target, 'comer');
            }}
            className="w-full py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Invitar a comer o picar algo</span>
          </button>

          <button
            onClick={() => {
              const targetId = `conv_${matchModalTarget.id}`;
              closeMatchModal();
              setActiveConversationId(targetId);
              setActiveTab('mensajes');
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Enviar un mensaje primero</span>
          </button>
        </div>

        <button
          onClick={closeMatchModal}
          className="mt-4 text-xs text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 cursor-pointer"
        >
          Seguir viendo perfiles
        </button>
      </div>
    </div>
  );
};
