import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Coffee,
  UtensilsCrossed,
  Sparkles,
  Send,
  CheckCircle2,
  XCircle,
  MapPin,
  Clock,
  CalendarPlus,
  ChevronLeft,
  Users
} from 'lucide-react';

export const ChatAndDatesSection: React.FC = () => {
  const {
    conversations,
    activeConversationId,
    setActiveConversationId,
    sendMessage,
    respondToDateInvitation,
    openProposalModal
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');

  // Default to first conversation if none selected
  const activeConv =
    conversations.find(c => c.id === activeConversationId) || conversations[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeConv) return;
    sendMessage(activeConv.id, inputMessage);
    setInputMessage('');
  };

  const insertIcebreaker = (question: string) => {
    setInputMessage(question);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cafe':
        return <Coffee className="w-4 h-4 text-amber-700 dark:text-amber-400" />;
      case 'comer':
        return <UtensilsCrossed className="w-4 h-4 text-orange-600 dark:text-orange-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 lg:py-8 transition-colors duration-200">
      <div className="bg-white dark:bg-[#1c1917] rounded-3xl border border-stone-200/90 dark:border-stone-800 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[640px]">
        {/* Left column: Conversations list (4 cols) */}
        <div
          className={`md:col-span-5 lg:col-span-4 border-r border-stone-200 dark:border-stone-800 flex flex-col ${
            activeConversationId && 'hidden md:flex'
          }`}
        >
          {/* Header */}
          <div className="p-4 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">Mensajes & Citas</h2>
            <span className="text-xs text-stone-500 dark:text-stone-400 font-medium font-mono tabular-nums">
              {conversations.length} conversaciones
            </span>
          </div>

          {/* Matches & Convs list */}
          <div className="flex-1 overflow-y-auto divide-y divide-stone-100 dark:divide-stone-800/60">
            {conversations.length === 0 ? (
              <div className="p-8 text-center text-stone-400 dark:text-stone-500 text-xs">
                Aún no tienes conversaciones. ¡Da me gusta a perfiles o apúntate a un plan!
              </div>
            ) : (
              conversations.map(conv => {
                const isSelected = activeConv?.id === conv.id;
                const hasPendingDate = conv.activeDate?.status === 'pending';
                const hasAcceptedDate = conv.activeDate?.status === 'accepted';

                return (
                  <button
                    key={conv.id}
                    onClick={() => setActiveConversationId(conv.id)}
                    className={`w-full p-4 text-left flex items-start gap-3 transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-stone-100/80 dark:bg-stone-800/80'
                        : 'hover:bg-stone-50 dark:hover:bg-stone-800/40'
                    }`}
                  >
                    <div className="relative shrink-0">
                      {conv.isGroupChat ? (
                        <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 flex items-center justify-center text-amber-700 dark:text-amber-400 font-bold">
                          <Users className="w-6 h-6" />
                        </div>
                      ) : (
                        <img
                          src={conv.participant.avatar}
                          alt={conv.participant.name}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded-full object-cover border border-stone-200 dark:border-stone-700"
                        />
                      )}
                      {conv.isGroupChat && (
                        <div
                          title="Cita en grupo"
                          className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px]"
                        >
                          <Users className="w-3 h-3" />
                        </div>
                      )}
                      {hasAcceptedDate && !conv.isGroupChat && (
                        <div
                          title="Cita confirmada"
                          className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                      )}
                      {hasPendingDate && !conv.isGroupChat && (
                        <div
                          title="Cita pendiente de respuesta"
                          className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]"
                        >
                          <Clock className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="text-sm font-bold text-stone-900 dark:text-stone-100 truncate">
                            {conv.isGroupChat ? (conv.groupTitle || 'Cita en Grupo') : conv.participant.name}
                          </span>
                          {conv.isGroupChat && (
                            <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 shrink-0">
                              Grupo ({conv.groupParticipants?.length || 4}p)
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-stone-400 dark:text-stone-500 font-mono tabular-nums shrink-0">
                          {conv.lastMessageTime}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 dark:text-stone-400 truncate">
                        {conv.lastMessage}
                      </p>
                      {conv.activeDate && (
                        <div className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-stone-700 dark:text-stone-300">
                          {getCategoryIcon(conv.activeDate.category)}
                          <span className="truncate">
                            {conv.activeDate.status === 'accepted' ? 'Cita confirmada: ' : 'Propuesta: '}
                            {conv.activeDate.spotName}
                          </span>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right column: Active Chat & Interactive Date Card (8 cols) */}
        {activeConv ? (
          <div
            className={`md:col-span-7 lg:col-span-8 flex flex-col h-full ${
              !activeConversationId && 'hidden md:flex'
            }`}
          >
            {/* Chat Header */}
            <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/50 dark:bg-[#161412]">
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={() => setActiveConversationId(null)}
                  className="md:hidden p-1 rounded-lg text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {activeConv.isGroupChat ? (
                  <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 flex items-center justify-center text-amber-700 dark:text-amber-400 shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                ) : (
                  <img
                    src={activeConv.participant.avatar}
                    alt={activeConv.participant.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-stone-200 dark:border-stone-700 shrink-0"
                  />
                )}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 truncate">
                      {activeConv.isGroupChat ? (activeConv.groupTitle || 'Cita en Grupo') : `${activeConv.participant.name}, ${activeConv.participant.age}`}
                    </h3>
                    {activeConv.isGroupChat && (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 shrink-0">
                        👥 {activeConv.groupParticipants?.length || 4} personas
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                    {activeConv.isGroupChat
                      ? (activeConv.groupParticipants?.map(p => p.name).join(', ') || 'Grupo de quedada')
                      : `${activeConv.participant.occupation} · ${activeConv.participant.city}`}
                  </p>
                </div>
              </div>

              {/* Header Action */}
              {activeConv.isGroupChat ? (
                <div className="flex items-center -space-x-2 overflow-hidden py-1">
                  {activeConv.groupParticipants?.slice(0, 4).map(p => (
                    <img
                      key={p.id}
                      src={p.avatar}
                      alt={p.name}
                      title={`${p.name} (${p.occupation || ''})`}
                      referrerPolicy="no-referrer"
                      className="w-7 h-7 rounded-full object-cover border-2 border-white dark:border-stone-900"
                    />
                  ))}
                </div>
              ) : (
                <button
                  onClick={() => openProposalModal(activeConv.participant)}
                  className="px-3.5 py-1.5 text-xs font-semibold bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 rounded-lg hover:bg-stone-800 dark:hover:bg-white transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer shrink-0"
                >
                  <CalendarPlus className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Proponer Cita</span>
                  <span className="sm:hidden">Cita</span>
                </button>
              )}
            </div>

            {/* Active Date Banner if confirmed */}
            {activeConv.activeDate && activeConv.activeDate.status === 'accepted' && (
              <div className="bg-emerald-50 dark:bg-emerald-950/40 border-b border-emerald-100 dark:border-emerald-900/60 px-4 py-2.5 flex items-center justify-between text-xs text-emerald-900 dark:text-emerald-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>
                    <strong>{activeConv.isGroupChat ? '¡Cita en grupo confirmada!' : '¡Cita confirmada!'}</strong> {activeConv.activeDate.title} en <strong>{activeConv.activeDate.spotName}</strong> ({activeConv.activeDate.dateTime}).
                  </span>
                </div>
              </div>
            )}

            {/* Messages Area */}
            <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4 bg-stone-50/30 dark:bg-[#12100e]">
              {activeConv.messages.map(msg => {
                const isMe = msg.senderId === 'me';

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    {/* Sender badge for group chats */}
                    {activeConv.isGroupChat && !isMe && (
                      <div className="flex items-center gap-1.5 mb-1 px-1">
                        {msg.senderAvatar && (
                          <img
                            src={msg.senderAvatar}
                            alt={msg.senderName || 'Participante'}
                            referrerPolicy="no-referrer"
                            className="w-4 h-4 rounded-full object-cover"
                          />
                        )}
                        <span className="text-[10px] font-bold text-stone-500 dark:text-stone-400">
                          {msg.senderName || activeConv.participant.name}
                        </span>
                      </div>
                    )}

                    {/* If there's an embedded date proposal */}
                    {msg.dateProposal && (
                      <div className="mb-2 max-w-sm w-full bg-white dark:bg-[#1c1917] rounded-2xl p-4 border border-stone-200 dark:border-stone-800 shadow-md">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 mb-2">
                          {getCategoryIcon(msg.dateProposal.category)}
                          <span>Propuesta de Cita</span>
                        </div>
                        <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                          {msg.dateProposal.title}
                        </h4>
                        <div className="mt-2 space-y-1 text-xs text-stone-600 dark:text-stone-300">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500" />
                            <span>{msg.dateProposal.spotName}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500" />
                            <span>{msg.dateProposal.dateTime}</span>
                          </div>
                          {msg.dateProposal.note && (
                            <p className="pt-2 text-stone-700 dark:text-stone-300 italic border-t border-stone-100 dark:border-stone-800 mt-2">
                              "{msg.dateProposal.note}"
                            </p>
                          )}
                        </div>

                        {/* Status / Response buttons */}
                        <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800">
                          {msg.dateProposal.status === 'accepted' ? (
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Cita Aceptada · ¡Nos vemos allí!</span>
                            </div>
                          ) : msg.dateProposal.status === 'declined' ? (
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 dark:text-stone-400">
                              <XCircle className="w-4 h-4" />
                              <span>Propuesta rechazada</span>
                            </div>
                          ) : isMe ? (
                            <div className="text-xs text-amber-800 dark:text-amber-400 font-medium">
                              Esperando confirmación de {activeConv.participant.name}...
                            </div>
                          ) : (
                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  respondToDateInvitation(activeConv.id, msg.dateProposal!.id, 'accepted')
                                }
                                className="flex-1 py-1.5 text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition-colors shadow-sm cursor-pointer"
                              >
                                ¡Aceptar Cita!
                              </button>
                              <button
                                onClick={() =>
                                  respondToDateInvitation(activeConv.id, msg.dateProposal!.id, 'declined')
                                }
                                className="px-3 py-1.5 text-xs font-medium text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors cursor-pointer"
                              >
                                Rechazar
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Standard text bubble */}
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                        isMe
                          ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 rounded-br-xs font-medium'
                          : 'bg-white dark:bg-[#1c1917] text-stone-800 dark:text-stone-100 border border-stone-200/80 dark:border-stone-800 rounded-bl-xs shadow-xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-stone-400 dark:text-stone-500 mt-1 px-1 font-mono tabular-nums">
                      {msg.timestamp}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Icebreaker quick suggestions */}
            {activeConv.isGroupChat ? (
              <div className="px-4 py-2 bg-stone-100/60 dark:bg-[#161412] border-t border-stone-200/60 dark:border-stone-800 flex items-center gap-2 overflow-x-auto text-[11px]">
                <span className="text-stone-500 dark:text-stone-400 font-medium whitespace-nowrap">
                  👥 Grupo:
                </span>
                <button
                  onClick={() => insertIcebreaker('¡Hola a todos! ¿A qué hora nos vemos en la entrada del local?')}
                  className="px-2.5 py-1 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-750 border border-stone-200 dark:border-stone-700 rounded-md text-stone-700 dark:text-stone-300 whitespace-nowrap cursor-pointer transition-colors"
                >
                  ⏰ ¿A qué hora llegamos?
                </button>
                <button
                  onClick={() => insertIcebreaker('¿Alguien tiene alguna preferencia de tapas o intolerancia alimentaria?')}
                  className="px-2.5 py-1 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-750 border border-stone-200 dark:border-stone-700 rounded-md text-stone-700 dark:text-stone-300 whitespace-nowrap cursor-pointer transition-colors"
                >
                  🍷 Preferencias o intolerancias
                </button>
                <button
                  onClick={() => insertIcebreaker('¡Qué buena pinta tiene el plan! Con ganas de conoceros a todos')}
                  className="px-2.5 py-1 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-750 border border-stone-200 dark:border-stone-700 rounded-md text-stone-700 dark:text-stone-300 whitespace-nowrap cursor-pointer transition-colors"
                >
                  👋 ¡Con ganas de veros!
                </button>
              </div>
            ) : (
              <div className="px-4 py-2 bg-stone-100/60 dark:bg-[#161412] border-t border-stone-200/60 dark:border-stone-800 flex items-center gap-2 overflow-x-auto text-[11px]">
                <span className="text-stone-500 dark:text-stone-400 font-medium whitespace-nowrap">
                  Romper el hielo:
                </span>
                <button
                  onClick={() => insertIcebreaker('¿Eres más de café solo o flat white con avena?')}
                  className="px-2.5 py-1 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-750 border border-stone-200 dark:border-stone-700 rounded-md text-stone-700 dark:text-stone-300 whitespace-nowrap cursor-pointer transition-colors"
                >
                  ☕ ¿Café solo o con avena?
                </button>
                <button
                  onClick={() => insertIcebreaker('¿Cuál es tu restaurante favorito de la ciudad ahora mismo?')}
                  className="px-2.5 py-1 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-750 border border-stone-200 dark:border-stone-700 rounded-md text-stone-700 dark:text-stone-300 whitespace-nowrap cursor-pointer transition-colors"
                >
                  🍽️ Restaurante favorito
                </button>
                <button
                  onClick={() => insertIcebreaker('¿Qué actividad diferente te gustaría probar este finde?')}
                  className="px-2.5 py-1 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-750 border border-stone-200 dark:border-stone-700 rounded-md text-stone-700 dark:text-stone-300 whitespace-nowrap cursor-pointer transition-colors"
                >
                  🎯 Actividad para el finde
                </button>
              </div>
            )}

            {/* Input Bar */}
            <form onSubmit={handleSend} className="p-3 md:p-4 bg-white dark:bg-[#161412] border-t border-stone-200 dark:border-stone-800 flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                placeholder={activeConv.isGroupChat ? 'Escribe en el chat del grupo...' : `Escribe a ${activeConv.participant.name}...`}
                className="flex-1 text-xs sm:text-sm px-4 py-2.5 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-amber-500 focus:bg-white dark:focus:bg-stone-800"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="p-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 hover:bg-stone-800 dark:hover:bg-white disabled:opacity-40 transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="col-span-8 hidden md:flex items-center justify-center p-8 text-center text-stone-400 dark:text-stone-500">
            Selecciona una conversación para chatear y organizar vuestra cita.
          </div>
        )}
      </div>
    </div>
  );
};
