import React from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Sun, Moon } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    setIsNewPlanModalOpen,
    openRegistrationModal,
    allDates,
    conversations,
    contacts,
    theme,
    toggleTheme
  } = useApp();

  const unreadCount = conversations.reduce((acc, c) => acc + c.unreadCount, 0);
  const upcomingDatesCount = allDates.filter(d => d.status === 'accepted' || d.status === 'pending').length;

  return (
    <header className="sticky top-0 z-30 w-full bg-stone-50/95 dark:bg-[#161412]/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveTab('descubrir')}
          className="text-left font-bold text-xl tracking-tight text-stone-900 dark:text-stone-100 whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer"
        >
          <span className="w-8 h-8 rounded-lg bg-stone-900 dark:bg-amber-500 text-stone-100 dark:text-stone-950 flex items-center justify-center font-bold text-sm tracking-tighter transition-colors">
            Q
          </span>
          <span>Quedamos</span>
        </button>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600 dark:text-stone-400">
          <button
            onClick={() => setActiveTab('descubrir')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'descubrir'
                ? 'text-stone-950 dark:text-stone-100 border-stone-900 dark:border-amber-400 font-semibold'
                : 'border-transparent hover:text-stone-900 dark:hover:text-stone-200 hover:border-stone-300 dark:hover:border-stone-700'
            }`}
          >
            Descubrir
          </button>

          <button
            onClick={() => setActiveTab('tablon')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'tablon'
                ? 'text-stone-950 dark:text-stone-100 border-stone-900 dark:border-amber-400 font-semibold'
                : 'border-transparent hover:text-stone-900 dark:hover:text-stone-200 hover:border-stone-300 dark:hover:border-stone-700'
            }`}
          >
            Tablón de Planes
          </button>

          <button
            onClick={() => setActiveTab('red')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'red'
                ? 'text-stone-950 dark:text-stone-100 border-stone-900 dark:border-amber-400 font-semibold'
                : 'border-transparent hover:text-stone-900 dark:hover:text-stone-200 hover:border-stone-300 dark:hover:border-stone-700'
            }`}
          >
            <span>Mi Red</span>
            <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 font-mono">
              ({contacts.length})
            </span>
          </button>

          <button
            onClick={() => setActiveTab('citas')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'citas'
                ? 'text-stone-950 dark:text-stone-100 border-stone-900 dark:border-amber-400 font-semibold'
                : 'border-transparent hover:text-stone-900 dark:hover:text-stone-200 hover:border-stone-300 dark:hover:border-stone-700'
            }`}
          >
            <span>Mis Citas</span>
            {upcomingDatesCount > 0 && (
              <span className="text-[11px] font-semibold text-stone-900 dark:text-stone-200">
                ({upcomingDatesCount})
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('mensajes')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'mensajes'
                ? 'text-stone-950 dark:text-stone-100 border-stone-900 dark:border-amber-400 font-semibold'
                : 'border-transparent hover:text-stone-900 dark:hover:text-stone-200 hover:border-stone-300 dark:hover:border-stone-700'
            }`}
          >
            <span>Mensajes</span>
            {unreadCount > 0 && (
              <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400">
                ({unreadCount})
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('perfil')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'perfil'
                ? 'text-stone-950 dark:text-stone-100 border-stone-900 dark:border-amber-400 font-semibold'
                : 'border-transparent hover:text-stone-900 dark:hover:text-stone-200 hover:border-stone-300 dark:hover:border-stone-700'
            }`}
          >
            Mi Perfil
          </button>
        </nav>

        {/* Zone 3: 1 primary action + theme toggle + Cuestionario button */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={openRegistrationModal}
            title="Cuestionario de Compatibilidad y Registro"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-purple-200 dark:border-purple-900/60 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/60 text-xs font-semibold transition-colors cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span>Cuestionario</span>
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            className="w-9 h-9 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-stone-600" />
            )}
          </button>

          <button
            onClick={() => setIsNewPlanModalOpen(true)}
            className="px-4 py-2 text-sm font-medium text-white dark:text-stone-950 bg-stone-900 dark:bg-stone-100 rounded-lg hover:bg-stone-800 dark:hover:bg-white transition-colors shadow-sm flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Publicar Plan</span>
          </button>
        </div>
      </div>
    </header>
  );
};
