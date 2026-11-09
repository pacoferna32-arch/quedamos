import React from 'react';
import { useApp } from '../context/AppContext';
import { Compass, Flame, CalendarHeart, MessageCircle, User, Users } from 'lucide-react';
import { ActiveTab } from '../types';

export const MobileBottomNav: React.FC = () => {
  const { activeTab, setActiveTab, allDates, conversations, contacts } = useApp();

  const unreadCount = conversations.reduce((acc, c) => acc + c.unreadCount, 0);
  const activeDatesCount = allDates.filter(d => d.status === 'accepted' || d.status === 'pending').length;

  const tabs: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'descubrir', label: 'Descubrir', icon: Flame },
    { id: 'tablon', label: 'Planes', icon: Compass },
    { id: 'red', label: 'Mi Red', icon: Users },
    { id: 'citas', label: 'Citas', icon: CalendarHeart },
    { id: 'mensajes', label: 'Mensajes', icon: MessageCircle },
    { id: 'perfil', label: 'Perfil', icon: User }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#161412]/95 backdrop-blur-md border-t border-stone-200 dark:border-stone-800 transition-colors duration-200">
      <div className="grid grid-cols-6 items-center h-16 max-w-lg mx-auto">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-col items-center justify-center h-full relative cursor-pointer group"
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive
                      ? 'text-stone-900 dark:text-amber-400 scale-105'
                      : 'text-stone-400 dark:text-stone-500 group-hover:text-stone-600 dark:group-hover:text-stone-300'
                  }`}
                />
                {tab.id === 'mensajes' && unreadCount > 0 && (
                  <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-amber-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
                {tab.id === 'citas' && activeDatesCount > 0 && (
                  <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-[10px] font-bold flex items-center justify-center">
                    {activeDatesCount}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] font-medium tracking-tight mt-1 ${
                  isActive
                    ? 'text-stone-900 dark:text-amber-400 font-semibold'
                    : 'text-stone-400 dark:text-stone-500'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
