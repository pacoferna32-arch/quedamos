import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  User,
  Share2,
  Plus,
  Coffee,
  UtensilsCrossed,
  Sparkles,
  Heart,
  MessageSquare,
  Calendar,
  MapPin,
  Clock,
  Check,
  Send,
  Search,
  Filter,
  Smartphone,
  ChevronRight,
  Flame,
  UserPlus
} from 'lucide-react';
import { ContactCircle, PlanCategory, UserContact } from '../types';

export const SocialNetworkSection: React.FC = () => {
  const {
    contacts,
    socialPosts,
    circles,
    openContactPlanModal,
    setIsAddContactModalOpen,
    importPhoneContacts,
    createSocialPost,
    likeSocialPost,
    addPostComment,
    joinPostPlan,
    setActiveConversationId,
    setActiveTab,
    currentUser
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'feed' | 'contactos' | 'circulos'>('feed');
  const [circleFilter, setCircleFilter] = useState<string>('todos');
  const [searchContact, setSearchContact] = useState('');

  // Post composer state
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostPlanCategory, setNewPostPlanCategory] = useState<PlanCategory | null>(null);
  const [newPostPlanTitle, setNewPostPlanTitle] = useState('');
  const [newPostSpot, setNewPostSpot] = useState('');
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [showCommentsFor, setShowCommentsFor] = useState<Record<string, boolean>>({});

  const handlePublishPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    createSocialPost(
      newPostContent.trim(),
      newPostPlanCategory || undefined,
      newPostPlanTitle.trim() || undefined,
      newPostSpot.trim() || undefined,
      'Este fin de semana',
      true
    );

    setNewPostContent('');
    setNewPostPlanCategory(null);
    setNewPostPlanTitle('');
    setNewPostSpot('');
  };

  const handleCommentSubmit = (postId: string) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;
    addPostComment(postId, text);
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchContact.toLowerCase()) ||
      contact.city.toLowerCase().includes(searchContact.toLowerCase()) ||
      (contact.favoriteSpot && contact.favoriteSpot.toLowerCase().includes(searchContact.toLowerCase()));
    const matchesCircle = circleFilter === 'todos' || contact.circle === circleFilter;
    return matchesSearch && matchesCircle;
  });

  const getPillarIcon = (pillar: PlanCategory) => {
    switch (pillar) {
      case 'cafe':
        return <Coffee className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />;
      case 'comer':
        return <UtensilsCrossed className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 lg:py-8 space-y-8">
      {/* Top Hero Banner */}
      <div className="bg-white dark:bg-[#1c1917] rounded-3xl p-6 sm:p-8 border border-stone-200/90 dark:border-stone-800 shadow-sm relative overflow-hidden transition-colors">
        <div className="max-w-3xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 border border-amber-200/60 dark:border-amber-900/40 text-amber-900 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>Red Social de Contactos</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100">
            Conecta con tus amigos y queda para un café, comer o hacer actividades.
          </h1>

          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 leading-relaxed">
            Crea tu red social personalizada con tus contactos de confianza. Organiza planes{' '}
            <strong>a 2 (cita individual)</strong> o <strong>en grupo</strong> (mesas compartidas, actividades o afterworks) con un solo clic.
          </p>

          {/* Quick Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => openContactPlanModal(null, false)}
              className="px-4 py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 rounded-xl hover:bg-stone-800 dark:hover:bg-white text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <User className="w-4 h-4" />
              <span>Hacer Plan a 2 Personas</span>
            </button>

            <button
              onClick={() => openContactPlanModal(null, true)}
              className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>Organizar Plan en Grupo</span>
            </button>

            <button
              onClick={() => setIsAddContactModalOpen(true)}
              className="px-4 py-2.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Añadir Contactos</span>
            </button>
          </div>
        </div>

        {/* Stats Pill in Corner */}
        <div className="mt-6 pt-6 border-t border-stone-100 dark:border-stone-800 grid grid-cols-3 gap-4 sm:max-w-md">
          <div>
            <div className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 font-mono">
              {contacts.length}
            </div>
            <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">Contactos en red</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-amber-700 dark:text-amber-400 font-mono">
              {circles.length}
            </div>
            <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">Círculos de amigos</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-emerald-700 dark:text-emerald-400 font-mono">
              {socialPosts.length}
            </div>
            <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">Planes en muro</div>
          </div>
        </div>
      </div>

      {/* Sub Tabs Navigation: Muro & Planes | Mis Contactos | Círculos */}
      <div className="flex items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-2">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setActiveSubTab('feed')}
            className={`pb-2 px-1 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'feed'
                ? 'border-stone-900 dark:border-amber-400 text-stone-950 dark:text-stone-100'
                : 'border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>Muro de Planes</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
              {socialPosts.length}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('contactos')}
            className={`pb-2 px-1 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'contactos'
                ? 'border-stone-900 dark:border-amber-400 text-stone-950 dark:text-stone-100'
                : 'border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Mis Contactos</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
              {contacts.length}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('circulos')}
            className={`pb-2 px-1 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'circulos'
                ? 'border-stone-900 dark:border-amber-400 text-stone-950 dark:text-stone-100'
                : 'border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Círculos Sociales</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
              {circles.length}
            </span>
          </button>
        </div>

        {/* Sync Address Book Button */}
        <button
          onClick={importPhoneContacts}
          title="Sincronizar contactos desde la libreta de direcciones o Google"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-xs font-semibold hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-colors cursor-pointer"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Sincronizar Agenda</span>
        </button>
      </div>

      {/* Subtab 1: FEED / MURO */}
      {activeSubTab === 'feed' && (
        <div className="space-y-6">
          {/* Post Composer Card */}
          <div className="bg-white dark:bg-[#1c1917] rounded-3xl p-5 border border-stone-200/90 dark:border-stone-800 shadow-sm transition-colors">
            <form onSubmit={handlePublishPost} className="space-y-3">
              <div className="flex items-start gap-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-stone-200 dark:border-stone-700 shrink-0"
                />
                <div className="flex-1">
                  <textarea
                    rows={2}
                    value={newPostContent}
                    onChange={e => setNewPostContent(e.target.value)}
                    placeholder="¿Qué te apetece hacer hoy? Propón un café, unas cañas o un plan a tus contactos..."
                    className="w-full text-xs sm:text-sm p-3 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-2xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-amber-500 resize-none"
                  />
                </div>
              </div>

              {/* Optional Attached Plan builder */}
              {newPostPlanCategory && (
                <div className="p-3 bg-stone-50 dark:bg-stone-800/40 rounded-2xl border border-stone-200 dark:border-stone-700/60 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                      {getPillarIcon(newPostPlanCategory)}
                      <span>Adjuntando invitación de {newPostPlanCategory}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setNewPostPlanCategory(null)}
                      className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer text-xs"
                    >
                      Quitar plan
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={newPostPlanTitle}
                      onChange={e => setNewPostPlanTitle(e.target.value)}
                      placeholder="Título (Ej: Desayuno tardío en Toma Café)"
                      className="px-3 py-1.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                    />
                    <input
                      type="text"
                      value={newPostSpot}
                      onChange={e => setNewPostSpot(e.target.value)}
                      placeholder="Lugar / Cafetería / Restaurante"
                      className="px-3 py-1.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                    />
                  </div>
                </div>
              )}

              {/* Composer Toolbar */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800 flex-wrap gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-stone-500 dark:text-stone-400 font-medium mr-1">
                    Adjuntar plan:
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setNewPostPlanCategory('cafe');
                      if (!newPostPlanTitle) setNewPostPlanTitle('Café y charla tranquila');
                    }}
                    className={`px-2.5 py-1 text-xs rounded-lg border flex items-center gap-1 cursor-pointer transition-colors ${
                      newPostPlanCategory === 'cafe'
                        ? 'bg-amber-100 dark:bg-amber-950/80 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 font-bold'
                        : 'border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    <Coffee className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                    <span>Café</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setNewPostPlanCategory('comer');
                      if (!newPostPlanTitle) setNewPostPlanTitle('Tapeo o cena para compartir');
                    }}
                    className={`px-2.5 py-1 text-xs rounded-lg border flex items-center gap-1 cursor-pointer transition-colors ${
                      newPostPlanCategory === 'comer'
                        ? 'bg-orange-100 dark:bg-orange-950/80 border-orange-300 dark:border-orange-800 text-orange-900 dark:text-orange-300 font-bold'
                        : 'border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    <UtensilsCrossed className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                    <span>Comer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setNewPostPlanCategory('actividad');
                      if (!newPostPlanTitle) setNewPostPlanTitle('Pádel o plan de ocio');
                    }}
                    className={`px-2.5 py-1 text-xs rounded-lg border flex items-center gap-1 cursor-pointer transition-colors ${
                      newPostPlanCategory === 'actividad'
                        ? 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 font-bold'
                        : 'border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                    <span>Actividad</span>
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={!newPostContent.trim()}
                  className="px-4 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 text-xs font-bold rounded-xl hover:bg-stone-800 dark:hover:bg-white transition-all shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publicar en mi Red</span>
                </button>
              </div>
            </form>
          </div>

          {/* Social Posts Stream */}
          <div className="space-y-4">
            {socialPosts.map(post => {
              const hasJoined = post.planDetails?.attendees.some(a => a.id === 'me');
              const showComments = showCommentsFor[post.id] ?? true;

              return (
                <div
                  key={post.id}
                  className="bg-white dark:bg-[#1c1917] rounded-3xl p-5 sm:p-6 border border-stone-200/90 dark:border-stone-800 shadow-sm transition-colors space-y-4"
                >
                  {/* Post Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.authorAvatar}
                        alt={post.authorName}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full object-cover border border-stone-200 dark:border-stone-700 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                            {post.authorName}
                          </h4>
                          <span className="px-2 py-0.5 text-[9px] font-bold uppercase rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                            {post.authorCircle}
                          </span>
                        </div>
                        <span className="text-[11px] text-stone-400 dark:text-stone-500 font-mono">
                          {post.createdAt}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        const targetContact = contacts.find(c => c.id === post.authorId);
                        openContactPlanModal(targetContact || null, false);
                      }}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 transition-colors cursor-pointer"
                    >
                      Proponer Cita
                    </button>
                  </div>

                  {/* Post Text */}
                  <p className="text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
                    {post.content}
                  </p>

                  {/* Optional Post Image */}
                  {post.image && (
                    <div className="rounded-2xl overflow-hidden max-h-72 border border-stone-200 dark:border-stone-800">
                      <img
                        src={post.image}
                        alt="Plan"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Embedded Plan Card */}
                  {post.planDetails && (
                    <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/90 dark:border-stone-700/80 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                          {post.planCategory && getPillarIcon(post.planCategory)}
                          <span>
                            {post.planDetails.isGroup ? 'Quedada en Grupo' : 'Plan para 2'}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
                          {post.planDetails.datetime}
                        </span>
                      </div>

                      <div>
                        <h5 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                          {post.planDetails.title}
                        </h5>
                        <div className="mt-1 flex items-center gap-1.5 text-xs text-stone-600 dark:text-stone-400">
                          <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                          <span>{post.planDetails.spot}</span>
                        </div>
                      </div>

                      {/* Attendees and Join action */}
                      <div className="pt-2 border-t border-stone-200/60 dark:border-stone-700/60 flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center -space-x-2">
                            {post.planDetails.attendees.map(a => (
                              <img
                                key={a.id}
                                src={a.avatar}
                                alt={a.name}
                                title={a.name}
                                referrerPolicy="no-referrer"
                                className="w-6 h-6 rounded-full object-cover border border-white dark:border-stone-800"
                              />
                            ))}
                          </div>
                          <span className="text-xs text-stone-600 dark:text-stone-400">
                            {post.planDetails.attendees.length} apuntados
                            {post.planDetails.maxParticipants && (
                              <span> · {post.planDetails.maxParticipants - post.planDetails.attendees.length} plazas libres</span>
                            )}
                          </span>
                        </div>

                        {post.authorId !== 'me' && (
                          <button
                            type="button"
                            onClick={() => joinPostPlan(post.id)}
                            disabled={hasJoined}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5 ${
                              hasJoined
                                ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                                : 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 hover:bg-stone-800 dark:hover:bg-white'
                            }`}
                          >
                            {hasJoined ? (
                              <>
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                                <span>¡Apuntado a la Cita!</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                <span>¡Apuntarme al plan!</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Post Footer: Likes & Comments count */}
                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-500 dark:text-stone-400">
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => likeSocialPost(post.id)}
                        className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                          post.hasLiked
                            ? 'text-rose-600 font-bold'
                            : 'hover:text-stone-800 dark:hover:text-stone-200'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${post.hasLiked ? 'fill-current text-rose-600' : ''}`} />
                        <span>{post.likes}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setShowCommentsFor(prev => ({ ...prev, [post.id]: !showComments }))
                        }
                        className="flex items-center gap-1.5 hover:text-stone-800 dark:hover:text-stone-200 transition-colors cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>{post.comments.length} comentarios</span>
                      </button>
                    </div>

                    <span className="text-[11px] text-stone-400">Visible para tus contactos</span>
                  </div>

                  {/* Comments Thread */}
                  {showComments && (
                    <div className="space-y-3 pt-2">
                      {post.comments.map(c => (
                        <div key={c.id} className="flex items-start gap-2.5 text-xs bg-stone-50/70 dark:bg-stone-800/40 p-2.5 rounded-2xl">
                          <img
                            src={c.authorAvatar}
                            alt={c.authorName}
                            referrerPolicy="no-referrer"
                            className="w-6 h-6 rounded-full object-cover shrink-0 mt-0.5"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-stone-900 dark:text-stone-100">
                                {c.authorName}
                              </span>
                              <span className="text-[10px] text-stone-400 font-mono">{c.time}</span>
                            </div>
                            <p className="text-stone-700 dark:text-stone-300 mt-0.5">{c.text}</p>
                          </div>
                        </div>
                      ))}

                      {/* Comment input form */}
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          value={commentInputs[post.id] || ''}
                          onChange={e =>
                            setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))
                          }
                          onKeyDown={e => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleCommentSubmit(post.id);
                            }
                          }}
                          placeholder="Escribe un comentario o pregunta..."
                          className="flex-1 text-xs px-3.5 py-2 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-amber-500"
                        />
                        <button
                          type="button"
                          onClick={() => handleCommentSubmit(post.id)}
                          className="p-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 rounded-xl hover:bg-stone-800 dark:hover:bg-white transition-colors cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Subtab 2: MIS CONTACTOS */}
      {activeSubTab === 'contactos' && (
        <div className="space-y-6">
          {/* Controls: Search and Circle filter */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchContact}
                onChange={e => setSearchContact(e.target.value)}
                placeholder="Buscar por nombre o lugar..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-[#1c1917] border border-stone-200 dark:border-stone-800 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-amber-500 shadow-xs"
              />
            </div>

            {/* Circle filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 text-xs">
              {(['todos', 'amigos', 'aficiones', 'trabajo', 'citas', 'familia'] as const).map(circle => (
                <button
                  key={circle}
                  onClick={() => setCircleFilter(circle)}
                  className={`px-3 py-1.5 rounded-xl capitalize font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    circleFilter === circle
                      ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 shadow-xs'
                      : 'bg-white dark:bg-[#1c1917] border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'
                  }`}
                >
                  {circle}
                </button>
              ))}
            </div>
          </div>

          {/* Contacts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredContacts.map(contact => (
              <div
                key={contact.id}
                className="bg-white dark:bg-[#1c1917] rounded-3xl p-5 border border-stone-200/90 dark:border-stone-800 shadow-sm flex flex-col justify-between transition-colors hover:border-stone-300 dark:hover:border-stone-700"
              >
                <div>
                  {/* Card top */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="relative">
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 rounded-2xl object-cover border border-stone-200 dark:border-stone-700"
                      />
                      <span
                        title={contact.status}
                        className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-stone-900 ${
                          contact.status === 'disponible'
                            ? 'bg-emerald-500'
                            : contact.status === 'en_plan'
                            ? 'bg-amber-500'
                            : contact.status === 'libre_fin_de_semana'
                            ? 'bg-blue-500'
                            : 'bg-stone-400'
                        }`}
                      />
                    </div>

                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                      {contact.circle}
                    </span>
                  </div>

                  {/* Name & status */}
                  <div className="mt-3">
                    <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                      {contact.name}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                      {contact.city} {contact.neighborhood ? `· ${contact.neighborhood}` : ''}
                    </p>
                    {contact.statusMessage && (
                      <p className="mt-2 text-xs italic text-stone-700 dark:text-stone-300 bg-stone-50 dark:bg-stone-800/60 p-2 rounded-xl">
                        "{contact.statusMessage}"
                      </p>
                    )}
                  </div>

                  {/* Favorite plan & spot */}
                  <div className="mt-3 space-y-1 text-xs text-stone-600 dark:text-stone-400">
                    <div className="flex items-center gap-1.5">
                      {getPillarIcon(contact.favoritePillar)}
                      <span className="capitalize font-medium">Plan fav: {contact.favoritePillar}</span>
                    </div>
                    {contact.favoriteSpot && (
                      <div className="flex items-center gap-1.5 text-[11px] text-stone-500 dark:text-stone-400">
                        <MapPin className="w-3 h-3 text-stone-400" />
                        <span className="truncate">{contact.favoriteSpot}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions: Plan 2 vs Plan Grupo */}
                <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => openContactPlanModal(contact, false)}
                    className="py-2 px-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 text-xs font-bold rounded-xl hover:bg-stone-800 dark:hover:bg-white transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Plan a 2</span>
                  </button>

                  <button
                    onClick={() => openContactPlanModal(contact, true)}
                    className="py-2 px-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Plan Grupo</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtab 3: CÍRCULOS SOCIALES */}
      {activeSubTab === 'circulos' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {circles.map(circle => {
              const circleMembers = contacts.filter(c => circle.memberIds.includes(c.id));

              return (
                <div
                  key={circle.id}
                  className="bg-white dark:bg-[#1c1917] rounded-3xl p-6 border border-stone-200/90 dark:border-stone-800 shadow-sm flex flex-col justify-between transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                        {circle.name}
                      </h3>
                      <span className="px-2 py-0.5 text-xs font-bold font-mono rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300">
                        {circle.memberCount} miembros
                      </span>
                    </div>

                    <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                      {circle.description}
                    </p>

                    {/* Member Avatars */}
                    <div className="mt-4 flex items-center gap-2">
                      <div className="flex items-center -space-x-2">
                        {circleMembers.slice(0, 5).map(m => (
                          <img
                            key={m.id}
                            src={m.avatar}
                            alt={m.name}
                            title={m.name}
                            referrerPolicy="no-referrer"
                            className="w-8 h-8 rounded-full object-cover border-2 border-white dark:border-stone-900"
                          />
                        ))}
                      </div>
                      <span className="text-xs text-stone-500 dark:text-stone-400">
                        {circleMembers.map(m => m.name.split(' ')[0]).join(', ')}
                      </span>
                    </div>
                  </div>

                  {/* Circle Action */}
                  <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                    <span className="text-xs text-stone-500 dark:text-stone-400">
                      Quedadas grupales automáticas
                    </span>
                    <button
                      onClick={() => {
                        // Pre-select first member and open in group mode
                        const first = circleMembers[0];
                        openContactPlanModal(first || null, true);
                      }}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>Hacer Plan con este Círculo</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
