import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { MobileBottomNav } from './components/MobileBottomNav';
import { DiscoverySection } from './components/DiscoverySection';
import { PlansBoardSection } from './components/PlansBoardSection';
import { DatesAgendaSection } from './components/DatesAgendaSection';
import { ChatAndDatesSection } from './components/ChatAndDatesSection';
import { ProfileSection } from './components/ProfileSection';
import { SocialNetworkSection } from './components/SocialNetworkSection';
import { DateProposalModal } from './components/DateProposalModal';
import { NewPlanModal } from './components/NewPlanModal';
import { MatchModal } from './components/MatchModal';
import { RegistrationModal } from './components/RegistrationModal';
import { CompatibilityModal } from './components/CompatibilityModal';
import { ContactPlanModal } from './components/ContactPlanModal';
import { AddContactModal } from './components/AddContactModal';
import { Check, Heart } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { activeTab, notificationMessage } = useApp();

  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-[#12100e] text-stone-900 dark:text-stone-100 flex flex-col antialiased selection:bg-amber-200 dark:selection:bg-amber-900/60 selection:text-stone-900 dark:selection:text-stone-100 transition-colors duration-200">
      {/* Top Bar adhering to 3-zone contract */}
      <Header />

      {/* Main Tab Content */}
      <main className="flex-1 pb-20 md:pb-12">
        {activeTab === 'descubrir' && <DiscoverySection />}
        {activeTab === 'tablon' && <PlansBoardSection />}
        {activeTab === 'red' && <SocialNetworkSection />}
        {activeTab === 'citas' && <DatesAgendaSection />}
        {activeTab === 'mensajes' && <ChatAndDatesSection />}
        {activeTab === 'perfil' && <ProfileSection />}
      </main>

      {/* Floating Toast Notification */}
      {notificationMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 max-w-sm bg-stone-900 dark:bg-stone-800 text-white text-xs px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 animate-slide-up border border-stone-800 dark:border-stone-700">
          <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <Check className="w-3 h-3 stroke-[3]" />
          </div>
          <span className="leading-snug">{notificationMessage}</span>
        </div>
      )}

      {/* Modals */}
      <DateProposalModal />
      <NewPlanModal />
      <MatchModal />
      <RegistrationModal />
      <CompatibilityModal />
      <ContactPlanModal />
      <AddContactModal />

      {/* Mobile Sticky Thumb Navigation */}
      <MobileBottomNav />

      {/* Minimal clean footer */}
      <footer className="hidden md:block py-6 border-t border-stone-200 dark:border-stone-800/80 text-center text-xs text-stone-500 dark:text-stone-400 bg-transparent transition-colors">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <p>Quedamos · Citas reales para tomar un café, salir a comer y hacer actividades.</p>
          <p className="flex items-center gap-1">
            Diseñado para conectar en persona
          </p>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
