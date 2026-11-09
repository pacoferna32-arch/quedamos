import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PlanCategory, DatePlanProposal } from '../types';
import {
  Coffee,
  UtensilsCrossed,
  Sparkles,
  MapPin,
  Clock,
  Plus,
  Send,
  Users,
  Check
} from 'lucide-react';

export const PlansBoardSection: React.FC = () => {
  const {
    publicPlans,
    handleJoinPlan,
    setIsNewPlanModalOpen
  } = useApp();

  const [categoryFilter, setCategoryFilter] = useState<'all' | PlanCategory>('all');
  const [formatFilter, setFormatFilter] = useState<'all' | 'individual' | 'group'>('all');
  const [applyingPlanId, setApplyingPlanId] = useState<string | null>(null);
  const [customNote, setCustomNote] = useState<string>('');

  const filteredPlans = publicPlans.filter(plan => {
    const matchesCategory = categoryFilter === 'all' || plan.category === categoryFilter;
    const matchesFormat =
      formatFilter === 'all' ||
      (formatFilter === 'group' && plan.isGroupDate) ||
      (formatFilter === 'individual' && !plan.isGroupDate);
    return matchesCategory && matchesFormat;
  });

  const groupPlansCount = publicPlans.filter(p => p.isGroupDate).length;
  const individualPlansCount = publicPlans.filter(p => !p.isGroupDate).length;

  const handleApplyClick = (plan: DatePlanProposal) => {
    if (plan.hasApplied) return;
    setApplyingPlanId(plan.id);
    if (plan.isGroupDate) {
      setCustomNote(`¡Hola a todos! Me encantaría unirme a la mesa de ${plan.title}.`);
    } else {
      setCustomNote(`¡Hola ${plan.creatorName}! Me apunto encantado/a a tu plan.`);
    }
  };

  const submitApplication = (planId: string) => {
    handleJoinPlan(planId, customNote);
    setApplyingPlanId(null);
    setCustomNote('');
  };

  const getCategoryTheme = (category: PlanCategory) => {
    switch (category) {
      case 'cafe':
        return {
          icon: Coffee,
          label: 'Tomar Café',
          color: 'text-amber-800 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60',
          borderColor: 'border-amber-200 dark:border-amber-800'
        };
      case 'comer':
        return {
          icon: UtensilsCrossed,
          label: 'Ir a Comer',
          color: 'text-orange-800 dark:text-orange-400 bg-orange-100 dark:bg-orange-950/60',
          borderColor: 'border-orange-200 dark:border-orange-800'
        };
      case 'actividad':
        return {
          icon: Sparkles,
          label: 'Actividad',
          color: 'text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60',
          borderColor: 'border-emerald-200 dark:border-emerald-800'
        };
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 lg:py-8 transition-colors duration-200">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              Tablón de Quedadas & Citas en Grupo
            </h1>
          </div>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1 max-w-xl">
            Descubre citas individuales (1 a 1) o apúntate a mesas y quedadas en grupo (4 a 8 personas) para conocer solteros con cero presiones.
          </p>
        </div>

        {/* Action Button to Create New Plan or Group Date */}
        <button
          onClick={() => setIsNewPlanModalOpen(true)}
          className="self-start md:self-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 to-rose-600 hover:from-purple-800 hover:to-rose-700 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <Users className="w-4 h-4 text-purple-200" />
          <span>Organizar Cita en Grupo o Individual</span>
        </button>
      </div>

      {/* Filter Row 1: Format Toggle (Todos vs 1 a 1 vs Citas en Grupo) */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-2 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setFormatFilter('all')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              formatFilter === 'all'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            Todos los planes ({publicPlans.length})
          </button>

          <button
            onClick={() => setFormatFilter('group')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              formatFilter === 'group'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Citas en Grupo (4-8 personas)</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${formatFilter === 'group' ? 'bg-white/20 text-white' : 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'}`}>
              {groupPlansCount}
            </span>
          </button>

          <button
            onClick={() => setFormatFilter('individual')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              formatFilter === 'individual'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            <span>Citas 1 a 1 ({individualPlansCount})</span>
          </button>
        </div>

        {/* Filter Category pills */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-2.5 py-1 text-xs rounded-lg transition-colors cursor-pointer ${
              categoryFilter === 'all'
                ? 'font-bold text-stone-900 dark:text-stone-100 bg-white/70 dark:bg-stone-800'
                : 'text-stone-500 hover:text-stone-700 dark:text-stone-400'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setCategoryFilter('cafe')}
            className={`px-2.5 py-1 text-xs rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
              categoryFilter === 'cafe'
                ? 'font-bold text-amber-800 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40'
                : 'text-stone-500 hover:text-stone-700 dark:text-stone-400'
            }`}
          >
            <Coffee className="w-3 h-3" />
            <span>Café</span>
          </button>
          <button
            onClick={() => setCategoryFilter('comer')}
            className={`px-2.5 py-1 text-xs rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
              categoryFilter === 'comer'
                ? 'font-bold text-orange-800 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40'
                : 'text-stone-500 hover:text-stone-700 dark:text-stone-400'
            }`}
          >
            <UtensilsCrossed className="w-3 h-3" />
            <span>Comer</span>
          </button>
          <button
            onClick={() => setCategoryFilter('actividad')}
            className={`px-2.5 py-1 text-xs rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
              categoryFilter === 'actividad'
                ? 'font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40'
                : 'text-stone-500 hover:text-stone-700 dark:text-stone-400'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>Actividad</span>
          </button>
        </div>
      </div>

      {/* Grid of Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlans.map(plan => {
          const theme = getCategoryTheme(plan.category);
          const CategoryIcon = theme.icon;
          const isApplying = applyingPlanId === plan.id;

          return (
            <div
              key={plan.id}
              className="bg-white dark:bg-[#1c1917] rounded-2xl overflow-hidden border border-stone-200/90 dark:border-stone-800 shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              {/* Media image header */}
              <div className="relative aspect-[16/9] w-full bg-stone-100 dark:bg-stone-900 overflow-hidden">
                <img
                  src={plan.imageBanner}
                  alt={plan.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />

                {/* Category Pill Tag */}
                <div className="absolute top-3 left-3 bg-white/95 dark:bg-[#1c1917]/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-stone-800 dark:text-stone-200 shadow-sm flex items-center gap-1.5 border border-stone-200/40 dark:border-stone-700">
                  <CategoryIcon className="w-3.5 h-3.5 text-amber-800 dark:text-amber-400" />
                  <span>{theme.label}</span>
                </div>

                {/* Group Date Badge or 1v1 Pill */}
                {plan.isGroupDate ? (
                  <div className="absolute top-3 right-3 bg-purple-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-white flex items-center gap-1.5 shadow-md border border-purple-400/30">
                    <Users className="w-3.5 h-3.5 text-amber-300" />
                    <span>Cita en Grupo ({plan.maxParticipants || 6}p)</span>
                  </div>
                ) : (
                  <div className="absolute top-3 right-3 bg-stone-900/85 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-medium text-white flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-amber-300" />
                    <span>{plan.datetime}</span>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Creator Info Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={plan.creatorAvatar}
                        alt={plan.creatorName}
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded-full object-cover border border-stone-200 dark:border-stone-700"
                      />
                      <div>
                        <div className="text-xs font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                          <span>{plan.creatorName}, {plan.creatorAge}</span>
                          {plan.isGroupDate && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold">
                              Organizador
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-stone-500 dark:text-stone-400">
                          {plan.creatorOccupation}
                        </div>
                      </div>
                    </div>

                    {plan.isGroupDate && (
                      <span className="text-xs font-medium text-stone-500 dark:text-stone-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {plan.datetime}
                      </span>
                    )}
                  </div>

                  {/* Group Participants & Spots Card */}
                  {plan.isGroupDate && (
                    <div className="mb-3.5 p-3 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200/70 dark:border-purple-900/40">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-bold text-purple-950 dark:text-purple-200 flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                          <span>{plan.currentParticipants?.length || 1} de {plan.maxParticipants || 6} plazas</span>
                        </span>
                        <span className="text-[11px] font-bold text-purple-700 dark:text-purple-300">
                          {Math.max(0, (plan.maxParticipants || 6) - (plan.currentParticipants?.length || 1))} plazas libres
                        </span>
                      </div>

                      {/* Avatars */}
                      <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
                        {plan.currentParticipants?.map((pt, idx) => (
                          <div key={idx} className="relative group/avatar">
                            <img
                              src={pt.avatar}
                              alt={pt.name}
                              className="w-7 h-7 rounded-full object-cover border-2 border-white dark:border-stone-800 shadow-xs shrink-0"
                            />
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover/avatar:block bg-stone-900 text-white text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap z-20 shadow-md">
                              {pt.name}
                            </span>
                          </div>
                        ))}
                        {Array.from({ length: Math.max(0, (plan.maxParticipants || 6) - (plan.currentParticipants?.length || 1)) }).map((_, idx) => (
                          <div
                            key={`empty_${idx}`}
                            title="Plaza libre disponible para ti"
                            className="w-7 h-7 rounded-full border-2 border-dashed border-purple-300 dark:border-purple-700 bg-purple-100/50 dark:bg-purple-900/20 flex items-center justify-center text-[10px] text-purple-600 dark:text-purple-400 font-bold shrink-0"
                          >
                            +1
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Title & Description */}
                  <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 leading-snug mb-2">
                    {plan.title}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-3 leading-relaxed mb-4">
                    {plan.description}
                  </p>

                  {/* Location & Split Option */}
                  <div className="space-y-1.5 text-xs text-stone-500 dark:text-stone-400 mb-4 pb-4 border-b border-stone-100 dark:border-stone-800">
                    <div className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400 shrink-0" />
                      <span className="truncate">{plan.locationName} ({plan.locationArea})</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-stone-500 dark:text-stone-400">
                      <span>Cuenta: <strong className="text-stone-700 dark:text-stone-200">{plan.splitOption}</strong></span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1 text-stone-600 dark:text-stone-400">
                        <Users className="w-3 h-3" />
                        {plan.isGroupDate
                          ? `${plan.currentParticipants?.length || 1}/${plan.maxParticipants || 6} en mesa`
                          : `${plan.interestedCount} interesados`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Area */}
                <div>
                  {isApplying ? (
                    <div className="bg-stone-50 dark:bg-[#161412] p-3 rounded-xl border border-stone-200 dark:border-stone-800 space-y-2">
                      <label className="text-[11px] font-semibold text-stone-700 dark:text-stone-300 block">
                        {plan.isGroupDate ? 'Mensaje para el grupo:' : `Mensaje para ${plan.creatorName}:`}
                      </label>
                      <textarea
                        value={customNote}
                        onChange={e => setCustomNote(e.target.value)}
                        rows={2}
                        className="w-full text-xs p-2 rounded-lg bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-amber-500"
                        placeholder={plan.isGroupDate ? 'Preséntate al grupo de la quedada...' : 'Dile por qué te apetece este plan...'}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => submitApplication(plan.id)}
                          className="flex-1 py-1.5 text-xs font-semibold bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 rounded-lg hover:bg-stone-800 dark:hover:bg-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Send className="w-3 h-3" />
                          <span>{plan.isGroupDate ? 'Unirme al Grupo' : 'Enviar y apuntarme'}</span>
                        </button>
                        <button
                          onClick={() => setApplyingPlanId(null)}
                          className="px-2.5 py-1.5 text-xs font-medium text-stone-600 dark:text-stone-400 bg-stone-200/70 dark:bg-stone-800 rounded-lg hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors cursor-pointer"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : plan.hasApplied ? (
                    <button
                      disabled
                      className="w-full py-2.5 text-xs font-semibold bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900 text-purple-700 dark:text-purple-300 rounded-xl flex items-center justify-center gap-1.5 cursor-default"
                    >
                      <Check className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <span>{plan.isGroupDate ? '¡Estás en la mesa! (Ver Chat Grupal)' : '¡Ya te has apuntado! (Revisa Mensajes)'}</span>
                    </button>
                  ) : plan.isGroupDate ? (
                    <button
                      onClick={() => handleApplyClick(plan)}
                      className="w-full py-2.5 text-xs font-bold text-white bg-gradient-to-r from-purple-700 to-rose-600 hover:from-purple-800 hover:to-rose-700 rounded-xl transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Users className="w-4 h-4" />
                      <span>¡Unirme a esta Cita en Grupo!</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApplyClick(plan)}
                      className="w-full py-2.5 text-xs font-bold text-white dark:text-stone-950 bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white rounded-xl transition-all shadow-sm active:scale-[0.99] flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>¡Me apunto a este plan!</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating CTA to publish new plan */}
      <div className="mt-12 p-8 bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 dark:from-stone-950 dark:via-[#1c1917] dark:to-stone-900 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg border border-transparent dark:border-stone-800">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">
            ¿Tienes ganas de un café, salir a cenar o hacer algo divertido?
          </h2>
          <p className="text-stone-300 text-sm mt-1 max-w-xl">
            Publica tu propio plan en el tablón en menos de un minuto. La gente cercana que comparta tu vibra podrá apuntarse.
          </p>
        </div>
        <button
          onClick={() => setIsNewPlanModalOpen(true)}
          className="px-5 py-3 text-sm font-semibold bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl transition-colors shadow-md flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Publicar mi propuesta</span>
        </button>
      </div>
    </div>
  );
};
