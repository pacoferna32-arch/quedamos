import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DateInvitation, PlanCategory } from '../types';
import {
  Calendar,
  Clock,
  MapPin,
  Coffee,
  UtensilsCrossed,
  Sparkles,
  MessageCircle,
  CalendarHeart
} from 'lucide-react';

export const DatesAgendaSection: React.FC = () => {
  const { allDates, setActiveConversationId, setActiveTab, showNotification } = useApp();
  const [filter, setFilter] = useState<'all' | 'accepted' | 'group' | 'pending'>('all');

  const filteredDates = allDates.filter(d => {
    if (filter === 'all') return true;
    if (filter === 'group') return Boolean(d.isGroupDate);
    return d.status === filter;
  });

  const getCategoryTheme = (category: PlanCategory) => {
    switch (category) {
      case 'cafe':
        return {
          icon: Coffee,
          label: 'Cita para Tomar un Café',
          bg: 'bg-amber-50 text-amber-900 border-amber-200',
          image: '/src/assets/images/date_coffee_1794149700019.jpg'
        };
      case 'comer':
        return {
          icon: UtensilsCrossed,
          label: 'Cita para Ir a Comer',
          bg: 'bg-orange-50 text-orange-900 border-orange-200',
          image: '/src/assets/images/date_food_1794149700596.jpg'
        };
      default:
        return {
          icon: Sparkles,
          label: 'Cita de Actividad',
          bg: 'bg-emerald-50 text-emerald-900 border-emerald-200',
          image: '/src/assets/images/date_activity_1794149699279.jpg'
        };
    }
  };

  const handleAddToCalendar = (date: DateInvitation) => {
    showNotification(`Cita "${date.title}" añadida a tu calendario.`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 lg:py-8 transition-colors duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Mis Citas & Quedadas
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
            Tu agenda de citas individuales (1 a 1) y quedadas en grupo acordadas.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-800/80 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              filter === 'all'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            Todas ({allDates.length})
          </button>
          <button
            onClick={() => setFilter('accepted')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              filter === 'accepted'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            Confirmadas ({allDates.filter(d => d.status === 'accepted').length})
          </button>
          <button
            onClick={() => setFilter('group')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              filter === 'group'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-purple-700 dark:text-purple-300 hover:text-purple-900'
            }`}
          >
            <span>👥 Citas en Grupo ({allDates.filter(d => d.isGroupDate).length})</span>
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              filter === 'pending'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            Pendientes ({allDates.filter(d => d.status === 'pending').length})
          </button>
        </div>
      </div>

      {/* Date Cards List */}
      {filteredDates.length === 0 ? (
        <div className="bg-white dark:bg-[#1c1917] rounded-3xl p-12 text-center border border-stone-200/80 dark:border-stone-800 max-w-lg mx-auto shadow-sm">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-400 dark:text-stone-500">
            <CalendarHeart className="w-8 h-8 text-amber-700 dark:text-amber-400" />
          </div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-2">
            No tienes citas en esta lista todavía
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mb-6 leading-relaxed">
            Descubre perfiles cercanos o consulta el Tablón de Planes para proponer una cita individual o unirte a una cita en grupo.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setActiveTab('descubrir')}
              className="px-4 py-2 text-xs font-semibold bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 rounded-xl hover:bg-stone-800 dark:hover:bg-white transition-colors cursor-pointer"
            >
              Descubrir perfiles
            </button>
            <button
              onClick={() => setActiveTab('tablon')}
              className="px-4 py-2 text-xs font-semibold bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-xl hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors cursor-pointer"
            >
              Ver Tablón de Quedadas
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDates.map(date => {
            const theme = getCategoryTheme(date.category);
            const Icon = theme.icon;
            const isAccepted = date.status === 'accepted';
            const isGroup = Boolean(date.isGroupDate);

            return (
              <div
                key={date.id}
                className={`bg-white dark:bg-[#1c1917] rounded-2xl overflow-hidden border shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
                  isGroup ? 'border-purple-200 dark:border-purple-900/60 ring-1 ring-purple-500/10' : 'border-stone-200/90 dark:border-stone-800'
                }`}
              >
                <div>
                  {/* Photo Header */}
                  <div className="relative aspect-[16/9] w-full bg-stone-100 dark:bg-stone-900">
                    <img
                      src={theme.image}
                      alt={date.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 dark:bg-[#1c1917]/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-stone-800 dark:text-stone-200 shadow-sm flex items-center gap-1.5 border border-stone-200/40 dark:border-stone-700">
                      <Icon className="w-3.5 h-3.5 text-amber-800 dark:text-amber-400" />
                      <span>{date.title}</span>
                    </div>

                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      {isGroup && (
                        <div className="px-2 py-0.5 rounded-lg text-xs font-bold bg-purple-900/90 text-purple-100 backdrop-blur-sm">
                          👥 Grupo
                        </div>
                      )}
                      <div
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold backdrop-blur-sm ${
                          isAccepted
                            ? 'bg-emerald-900/90 text-emerald-100'
                            : 'bg-amber-900/90 text-amber-100'
                        }`}
                      >
                        {isAccepted ? 'Confirmada' : 'Pendiente'}
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    {/* Companion / Group */}
                    <div className="flex items-center gap-3 pb-3 mb-3 border-b border-stone-100 dark:border-stone-800">
                      <img
                        src={date.recipientAvatar}
                        alt={date.recipientName}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full object-cover border border-stone-200 dark:border-stone-700"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 truncate">
                          {isGroup ? date.recipientName : `Con ${date.recipientName}`}
                        </h3>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                          {isGroup
                            ? `${date.currentParticipants?.length || 4} participantes confirmados`
                            : isAccepted
                            ? '¡Todo listo para conoceros!'
                            : 'Esperando confirmación'}
                        </p>
                      </div>
                    </div>

                    {/* Group Mini Avatars if Group Date */}
                    {isGroup && date.currentParticipants && (
                      <div className="mb-3 p-2.5 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-900/40">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 dark:text-purple-300 block mb-1.5">
                          Solteros en la mesa:
                        </span>
                        <div className="flex items-center gap-1.5">
                          {date.currentParticipants.map((pt, i) => (
                            <img
                              key={i}
                              src={pt.avatar}
                              alt={pt.name}
                              title={pt.name}
                              className="w-6 h-6 rounded-full object-cover border border-white dark:border-stone-800 shadow-xs"
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Details */}
                    <div className="space-y-2 text-xs text-stone-700 dark:text-stone-300">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-stone-400 dark:text-stone-500 shrink-0" />
                        <span className="font-semibold text-stone-900 dark:text-stone-100">{date.spotName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-stone-400 dark:text-stone-500 shrink-0" />
                        <span className="font-medium">{date.dateTime}</span>
                      </div>
                      {date.note && (
                        <p className="pt-2 text-stone-500 dark:text-stone-400 italic text-[11px] border-t border-stone-100/60 dark:border-stone-800/80">
                          "{date.note}"
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer action buttons */}
                <div className="p-4 bg-stone-50 dark:bg-[#161412] border-t border-stone-100 dark:border-stone-800 flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (isGroup) {
                        setActiveConversationId('conv_group_tapas');
                      } else {
                        setActiveConversationId(`conv_${date.toUserId}`);
                      }
                      setActiveTab('mensajes');
                    }}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                      isGroup
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'text-stone-800 dark:text-stone-200 bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700'
                    }`}
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{isGroup ? 'Abrir Chat Grupal' : 'Abrir Chat'}</span>
                  </button>

                  <button
                    onClick={() => handleAddToCalendar(date)}
                    className="px-3 py-2 text-xs font-medium text-stone-600 dark:text-stone-400 bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700 rounded-xl transition-colors cursor-pointer shadow-xs"
                    title="Añadir a Google Calendar / iCal"
                  >
                    <Calendar className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
