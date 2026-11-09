import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Users,
  User,
  Coffee,
  UtensilsCrossed,
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  Check,
  Send,
  Search,
  Plus
} from 'lucide-react';
import { PlanCategory, UserContact } from '../types';

export const ContactPlanModal: React.FC = () => {
  const {
    isContactPlanModalOpen,
    closeContactPlanModal,
    contactPlanTarget,
    isContactPlanGroupMode,
    contacts,
    handleCreateContactPlan,
    setIsAddContactModalOpen
  } = useApp();

  const [isGroup, setIsGroup] = useState<boolean>(false);
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);
  const [category, setCategory] = useState<PlanCategory>('cafe');
  const [title, setTitle] = useState('');
  const [spotName, setSpotName] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [splitOption, setSplitOption] = useState<string>('A medias');
  const [note, setNote] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [circleFilter, setCircleFilter] = useState<string>('todos');

  // Initialize when modal opens or target changes
  useEffect(() => {
    if (isContactPlanModalOpen) {
      if (contactPlanTarget) {
        setSelectedContactIds([contactPlanTarget.id]);
        setIsGroup(Boolean(isContactPlanGroupMode));
        setCategory(contactPlanTarget.favoritePillar || 'cafe');
        if (contactPlanTarget.favoriteSpot) {
          setSpotName(contactPlanTarget.favoriteSpot);
        }
      } else {
        setSelectedContactIds(contacts.length > 0 ? [contacts[0].id] : []);
        setIsGroup(Boolean(isContactPlanGroupMode));
        setCategory('cafe');
      }

      // Default datetime: tomorrow evening
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      const formatted = `${days[tomorrow.getDay()]} ${tomorrow.getDate()} ${months[tomorrow.getMonth()]}, 19:30`;
      setDateTime(formatted);
      setSplitOption('A medias');
      setNote('');
    }
  }, [isContactPlanModalOpen, contactPlanTarget, isContactPlanGroupMode, contacts]);

  // Dynamic quick titles based on category
  useEffect(() => {
    if (!title || title.startsWith('Café') || title.startsWith('Tapeo') || title.startsWith('Plan') || title.startsWith('Quedada')) {
      if (isGroup) {
        if (category === 'cafe') setTitle('Quedada cafetera & tertulia en grupo');
        else if (category === 'comer') setTitle('Ruta de tapas y raciones para compartir');
        else setTitle('Actividad grupal divertida + cañas');
      } else {
        const contactName = contacts.find(c => c.id === selectedContactIds[0])?.name || 'nosotros';
        if (category === 'cafe') setTitle(`Café de especialidad con ${contactName}`);
        else if (category === 'comer') setTitle(`Comida y sobremesa con ${contactName}`);
        else setTitle(`Actividad y charla distendida con ${contactName}`);
      }
    }
  }, [category, isGroup, selectedContactIds, contacts]);

  if (!isContactPlanModalOpen) return null;

  const filteredContacts = contacts.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.city && c.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.hobbies && c.hobbies.some(h => h.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesCircle = circleFilter === 'todos' || c.circle === circleFilter;
    return matchesSearch && matchesCircle;
  });

  const toggleSelectContact = (id: string) => {
    if (!isGroup) {
      setSelectedContactIds([id]);
    } else {
      if (selectedContactIds.includes(id)) {
        if (selectedContactIds.length > 1) {
          setSelectedContactIds(prev => prev.filter(item => item !== id));
        }
      } else {
        setSelectedContactIds(prev => [...prev, id]);
      }
    }
  };

  const selectEntireCircle = (circleName: string) => {
    const ids = contacts.filter(c => c.circle === circleName).map(c => c.id);
    if (ids.length > 0) {
      setSelectedContactIds(ids);
      setIsGroup(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedContactIds.length === 0) return;

    handleCreateContactPlan({
      targetContactIds: selectedContactIds,
      category,
      title: title || (category === 'cafe' ? 'Tomar un café' : category === 'comer' ? 'Salir a comer' : 'Hacer una actividad'),
      spotName: spotName || 'Lugar por confirmar',
      dateTime: dateTime || 'Próximamente',
      note,
      isGroup,
      splitOption
    });
  };

  const selectedContacts = contacts.filter(c => selectedContactIds.includes(c.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="bg-white dark:bg-[#1a1715] rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl w-full max-w-2xl overflow-hidden my-6 transition-colors">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/80 dark:bg-[#151311]">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300">
                Red Social · Quedar en Persona
              </span>
            </div>
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 mt-1">
              Organizar Plan con tus Contactos
            </h2>
          </div>
          <button
            onClick={closeContactPlanModal}
            className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-xl hover:bg-stone-200/50 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[78vh] overflow-y-auto">
          {/* Format selector: 2 Personas vs Grupo */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-2">
              Formato del plan
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsGroup(false);
                  if (selectedContactIds.length > 1) {
                    setSelectedContactIds([selectedContactIds[0]]);
                  }
                }}
                className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                  !isGroup
                    ? 'border-amber-600 dark:border-amber-500 bg-amber-50/70 dark:bg-amber-950/40 ring-2 ring-amber-600/20 dark:ring-amber-500/20'
                    : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 bg-white dark:bg-[#161412]'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                    Plan para 2 personas
                  </h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    Tú y 1 contacto de tu red. Cita íntima o quedada para charlar con calma.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsGroup(true);
                  if (selectedContactIds.length === 1 && contacts.length > 1) {
                    const second = contacts.find(c => c.id !== selectedContactIds[0]);
                    if (second) setSelectedContactIds(prev => [...prev, second.id]);
                  }
                }}
                className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                  isGroup
                    ? 'border-amber-600 dark:border-amber-500 bg-amber-50/70 dark:bg-amber-950/40 ring-2 ring-amber-600/20 dark:ring-amber-500/20'
                    : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 bg-white dark:bg-[#161412]'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                    Plan en Grupo
                  </h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    Tú y varios contactos (mesa de amigos, grupo de pádel o afterwork).
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Contact selector section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                {isGroup ? 'Selecciona los contactos invitados' : 'Selecciona el contacto'}
              </label>
              <div className="flex items-center gap-2">
                {isGroup && (
                  <button
                    type="button"
                    onClick={() => selectEntireCircle('amigos')}
                    className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 hover:underline cursor-pointer"
                  >
                    + Todos mis amigos
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsAddContactModalOpen(true)}
                  className="text-[11px] font-semibold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Nuevo</span>
                </button>
              </div>
            </div>

            {/* Quick Circles Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 text-[11px]">
              {(['todos', 'amigos', 'aficiones', 'trabajo', 'citas', 'familia'] as const).map(circle => (
                <button
                  key={circle}
                  type="button"
                  onClick={() => setCircleFilter(circle)}
                  className={`px-2.5 py-1 rounded-lg capitalize whitespace-nowrap transition-colors cursor-pointer ${
                    circleFilter === circle
                      ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 font-bold'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  {circle}
                </button>
              ))}
            </div>

            {/* Search within contacts */}
            <div className="relative mb-2.5">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre, afición o ciudad..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-amber-500"
              />
            </div>

            {/* Contacts list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1 border border-stone-100 dark:border-stone-800/80 rounded-2xl">
              {filteredContacts.map(contact => {
                const isSelected = selectedContactIds.includes(contact.id);
                return (
                  <button
                    key={contact.id}
                    type="button"
                    onClick={() => toggleSelectContact(contact.id)}
                    className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'border-amber-600 dark:border-amber-500 bg-amber-50/50 dark:bg-amber-950/30'
                        : 'border-stone-200/80 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        referrerPolicy="no-referrer"
                        className="w-8 h-8 rounded-full object-cover shrink-0 border border-stone-200 dark:border-stone-700"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                            {contact.name}
                          </span>
                          <span className="px-1.5 py-0.2 text-[9px] rounded uppercase font-semibold bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                            {contact.circle}
                          </span>
                        </div>
                        <p className="text-[10px] text-stone-500 dark:text-stone-400 truncate">
                          {contact.statusMessage || contact.city}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-amber-600 text-white'
                          : 'border border-stone-300 dark:border-stone-700'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected contacts chip row */}
            <div className="mt-2 flex items-center gap-2 flex-wrap">
              <span className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">
                Invitados ({selectedContacts.length}):
              </span>
              {selectedContacts.map(c => (
                <span
                  key={c.id}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-100/70 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 rounded-lg text-xs font-semibold"
                >
                  <img
                    src={c.avatar}
                    alt={c.name}
                    referrerPolicy="no-referrer"
                    className="w-4 h-4 rounded-full object-cover"
                  />
                  <span>{c.name}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Category Selection: Café, Comer, Actividad */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-2">
              Tipo de plan
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setCategory('cafe')}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  category === 'cafe'
                    ? 'border-amber-600 bg-amber-50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200 font-bold ring-2 ring-amber-600/20'
                    : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 text-stone-700 dark:text-stone-300 bg-white dark:bg-[#161412]'
                }`}
              >
                <Coffee className="w-5 h-5 mx-auto mb-1 text-amber-700 dark:text-amber-400" />
                <span className="text-xs block">Tomar Café</span>
                <span className="text-[10px] text-stone-500 dark:text-stone-400">Tertulia & brunch</span>
              </button>

              <button
                type="button"
                onClick={() => setCategory('comer')}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  category === 'comer'
                    ? 'border-orange-600 bg-orange-50 dark:bg-orange-950/40 text-orange-950 dark:text-orange-200 font-bold ring-2 ring-orange-600/20'
                    : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 text-stone-700 dark:text-stone-300 bg-white dark:bg-[#161412]'
                }`}
              >
                <UtensilsCrossed className="w-5 h-5 mx-auto mb-1 text-orange-600 dark:text-orange-400" />
                <span className="text-xs block">Ir a Comer</span>
                <span className="text-[10px] text-stone-500 dark:text-stone-400">Tapas & sobremesa</span>
              </button>

              <button
                type="button"
                onClick={() => setCategory('actividad')}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  category === 'actividad'
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 font-bold ring-2 ring-emerald-600/20'
                    : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 text-stone-700 dark:text-stone-300 bg-white dark:bg-[#161412]'
                }`}
              >
                <Sparkles className="w-5 h-5 mx-auto mb-1 text-emerald-700 dark:text-emerald-400" />
                <span className="text-xs block">Actividad</span>
                <span className="text-[10px] text-stone-500 dark:text-stone-400">Ocio, deporte, arte</span>
              </button>
            </div>
          </div>

          {/* Title input */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-1">
              Título del plan
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Ej: Desayuno tardío y paseo por El Retiro"
              required
              className="w-full text-xs px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-amber-500"
            />
          </div>

          {/* Spot / Venue + suggestions */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-1">
              Lugar / Local recomendado
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="text"
                value={spotName}
                onChange={e => setSpotName(e.target.value)}
                placeholder="Ej: Toma Café (Malasaña) o Taberna Laredo"
                required
                className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-amber-500"
              />
            </div>
            {/* Quick venue tags */}
            <div className="mt-1.5 flex items-center gap-1.5 flex-wrap text-[11px]">
              <span className="text-stone-400">Sugerencias:</span>
              {(category === 'cafe'
                ? ['Toma Café (Malasaña)', 'La Bicicleta Café', 'Misión Café', 'Acid Bakehouse']
                : category === 'comer'
                ? ['Taberna Laredo', 'Plaza Olavide', 'Chuka Ramen Bar', 'Sala de Despiece']
                : ['Club Pádel Canal', 'Sputnik Climbing', 'Paseo El Retiro', 'Taller Cerámica Lumbre']
              ).map(suggestion => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setSpotName(suggestion)}
                  className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors cursor-pointer"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Date & Time + Split Option */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-1">
                Fecha y Hora
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={dateTime}
                  onChange={e => setDateTime(e.target.value)}
                  placeholder="Ej: Sábado 14 Nov, 17:30"
                  required
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-1">
                La cuenta
              </label>
              <select
                value={splitOption}
                onChange={e => setSplitOption(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-amber-500 cursor-pointer"
              >
                <option value="A medias">A medias (50% cada uno)</option>
                <option value="A escote / A partes iguales">A escote / A partes iguales (grupo)</option>
                <option value="Cada uno lo suyo">Cada uno paga su consumición</option>
                <option value="Invito yo">Invito yo</option>
              </select>
            </div>
          </div>

          {/* Personal Note */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-1">
              Mensaje o nota para los invitados (opcional)
            </label>
            <textarea
              rows={2}
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Ej: ¿Qué os parece este sitio? Tienen terraza cubierta y buena música."
              className="w-full text-xs px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-amber-500 resize-none"
            />
          </div>

          {/* Submit button */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-stone-100 dark:border-stone-800">
            <button
              type="button"
              onClick={closeContactPlanModal}
              className="px-4 py-2 text-xs font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={selectedContactIds.length === 0}
              className="px-5 py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 text-xs font-bold rounded-xl hover:bg-stone-800 dark:hover:bg-white transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
              <span>
                {isGroup
                  ? `Invitar al Grupo (${selectedContacts.length} contactos)`
                  : `Proponer Plan a ${selectedContacts[0]?.name || 'Contacto'}`}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
