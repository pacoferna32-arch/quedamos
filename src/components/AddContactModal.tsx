import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, UserPlus, Smartphone, Coffee, UtensilsCrossed, Sparkles } from 'lucide-react';
import { ContactCircle, PlanCategory } from '../types';

export const AddContactModal: React.FC = () => {
  const {
    isAddContactModalOpen,
    setIsAddContactModalOpen,
    addContact,
    importPhoneContacts
  } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [circle, setCircle] = useState<ContactCircle>('amigos');
  const [city, setCity] = useState('Madrid');
  const [neighborhood, setNeighborhood] = useState('Centro');
  const [favoritePillar, setFavoritePillar] = useState<PlanCategory>('cafe');
  const [statusMessage, setStatusMessage] = useState('Disponible para planes');

  if (!isAddContactModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Pick a high-quality avatar based on name / random index
    const avatarList = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80'
    ];
    const pickedAvatar = avatarList[Math.floor(Math.random() * avatarList.length)];

    addContact({
      name: name.trim(),
      avatar: pickedAvatar,
      phone: phone.trim() || undefined,
      email: email.trim() || undefined,
      circle,
      status: 'disponible',
      statusMessage: statusMessage.trim() || 'Disponible para planes',
      city: city.trim() || 'Madrid',
      neighborhood: neighborhood.trim() || 'Madrid',
      favoritePillar,
      hobbies: [favoritePillar === 'cafe' ? 'Café' : favoritePillar === 'comer' ? 'Gastronomía' : 'Deporte'],
      isCloseFriend: circle === 'amigos'
    });

    setName('');
    setPhone('');
    setEmail('');
    setIsAddContactModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="bg-white dark:bg-[#1a1715] rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl w-full max-w-md overflow-hidden my-6 transition-colors">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/80 dark:bg-[#151311]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                Añadir a tu Red de Contactos
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Guarda tus amigos y conocidos para organizar planes
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAddContactModalOpen(false)}
            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg hover:bg-stone-200/50 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sync from address book quick action */}
        <div className="p-4 bg-amber-50/60 dark:bg-amber-950/20 border-b border-amber-100/80 dark:border-amber-900/40 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0" />
            <span className="text-xs text-amber-900 dark:text-amber-200 font-medium">
              ¿Quieres importar contactos de tu teléfono o cuenta?
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              importPhoneContacts();
              setIsAddContactModalOpen(false);
            }}
            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold whitespace-nowrap shadow-xs cursor-pointer transition-colors"
          >
            Sincronizar
          </button>
        </div>

        {/* Manual form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-1">
              Nombre y Apellidos *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Ej: Laura Sanz"
              className="w-full text-xs px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-1">
                Teléfono móvil
              </label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+34 600 000 000"
                className="w-full text-xs px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="contacto@email.com"
                className="w-full text-xs px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-1">
              Círculo o categoría
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['amigos', 'aficiones', 'trabajo', 'citas', 'familia'] as ContactCircle[]).map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCircle(c)}
                  className={`py-2 px-1 text-center text-xs font-semibold rounded-xl border capitalize transition-all cursor-pointer ${
                    circle === c
                      ? 'border-amber-600 bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 ring-2 ring-amber-600/20'
                      : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-1">
              Plan favorito para quedar
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setFavoritePillar('cafe')}
                className={`p-2 rounded-xl border text-center text-xs transition-colors cursor-pointer ${
                  favoritePillar === 'cafe'
                    ? 'border-amber-600 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-bold'
                    : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400'
                }`}
              >
                <Coffee className="w-4 h-4 mx-auto mb-1 text-amber-700 dark:text-amber-400" />
                <span>Café</span>
              </button>
              <button
                type="button"
                onClick={() => setFavoritePillar('comer')}
                className={`p-2 rounded-xl border text-center text-xs transition-colors cursor-pointer ${
                  favoritePillar === 'comer'
                    ? 'border-orange-600 bg-orange-50 dark:bg-orange-950/40 text-orange-900 dark:text-orange-200 font-bold'
                    : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400'
                }`}
              >
                <UtensilsCrossed className="w-4 h-4 mx-auto mb-1 text-orange-600 dark:text-orange-400" />
                <span>Comer</span>
              </button>
              <button
                type="button"
                onClick={() => setFavoritePillar('actividad')}
                className={`p-2 rounded-xl border text-center text-xs transition-colors cursor-pointer ${
                  favoritePillar === 'actividad'
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold'
                    : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400'
                }`}
              >
                <Sparkles className="w-4 h-4 mx-auto mb-1 text-emerald-700 dark:text-emerald-400" />
                <span>Actividad</span>
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-1">
              Estado o frase corta
            </label>
            <input
              type="text"
              value={statusMessage}
              onChange={e => setStatusMessage(e.target.value)}
              placeholder="Ej: Siempre libre para un buen café de especialidad"
              className="w-full text-xs px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-amber-500"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-stone-100 dark:border-stone-800">
            <button
              type="button"
              onClick={() => setIsAddContactModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 text-xs font-bold rounded-xl hover:bg-stone-800 dark:hover:bg-white transition-all shadow-md cursor-pointer"
            >
              Guardar Contacto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
