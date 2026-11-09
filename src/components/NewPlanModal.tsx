import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PlanCategory } from '../types';
import { X, Coffee, UtensilsCrossed, Sparkles, Plus, Users, User } from 'lucide-react';

export const NewPlanModal: React.FC = () => {
  const { isNewPlanModalOpen, setIsNewPlanModalOpen, handleCreatePlan } = useApp();

  // Plan format: 1v1 vs Group
  const [isGroupDate, setIsGroupDate] = useState(false);
  const [maxParticipants, setMaxParticipants] = useState<number>(6);
  const [groupType, setGroupType] = useState<'mesa_mixta' | 'solteros_abierto' | 'doble_cita' | 'actividad_grupal'>('mesa_mixta');

  const [category, setCategory] = useState<PlanCategory>('comer');
  const [title, setTitle] = useState('Ruta de tapas y vinos para 6 solteros');
  const [description, setDescription] = useState('Mesa reservada en La Latina para conocernos en grupo, picotear algo rico y charlar sin prisas ni incomodidades.');
  const [locationName, setLocationName] = useState('Taberna La Latina & Cava Baja');
  const [locationArea, setLocationArea] = useState('La Latina, Madrid');
  const [datetime, setDatetime] = useState('Viernes, 21:00');
  const [splitOption, setSplitOption] = useState<'Invito yo' | 'A medias' | 'Invitación mutua' | 'A escote / A partes iguales' | 'Cada uno lo suyo'>('A escote / A partes iguales');
  const [tagsInput, setTagsInput] = useState('Cita en Grupo, Tapas, Vinos, Risas');

  if (!isNewPlanModalOpen) return null;

  const defaultBanners: Record<PlanCategory, string> = {
    cafe: '/src/assets/images/date_coffee_1794149700019.jpg',
    comer: '/src/assets/images/date_food_1794149700596.jpg',
    actividad: '/src/assets/images/date_activity_1794149699279.jpg'
  };

  const handleFormatChange = (group: boolean) => {
    setIsGroupDate(group);
    if (group) {
      setSplitOption('A escote / A partes iguales');
      if (category === 'cafe') {
        setTitle(`Cata de café & tertulia para ${maxParticipants} solteros`);
        setDescription('Mesa reservada para probar buen café y conocernos en un ambiente distendido y relajado.');
        setTagsInput('Cita en Grupo, Café, Tertulia');
      } else if (category === 'comer') {
        setTitle(`Ruta de tapas y vinos para ${maxParticipants} solteros`);
        setDescription('Mesa reservada en taberna para picotear y conocernos en grupo.');
        setTagsInput('Cita en Grupo, Tapas, Buena mesa');
      } else {
        setTitle(`Actividad grupal / Escape room para ${maxParticipants} personas`);
        setDescription('Plan dinámico en equipo para romper el hielo y luego tomar unas cañas comentando la jugada.');
        setTagsInput('Cita en Grupo, Actividad, Risas');
      }
    } else {
      setSplitOption('A medias');
      if (category === 'cafe') {
        setTitle('Tomar un café de especialidad y charlar sin prisa');
        setTagsInput('Café de autor, Conversación, Relax');
      } else if (category === 'comer') {
        setTitle('Tapeo de autor y raciones para compartir');
        setTagsInput('Tapas, Vino, Buena comida');
      } else {
        setTitle('Tarde de cerámica / taller creativo');
        setTagsInput('Cerámica, Creatividad, Risas');
      }
    }
  };

  const handleCategorySelect = (cat: PlanCategory) => {
    setCategory(cat);
    if (isGroupDate) {
      if (cat === 'cafe') {
        setTitle(`Cata de café de especialidad & brunch para ${maxParticipants} personas`);
        setLocationName('Acid Bakehouse o Misión Café');
        setTagsInput('Cita en Grupo, Café, Brunch, Mesa abierta');
      } else if (cat === 'comer') {
        setTitle(`Cena de tapas y vinos para ${maxParticipants} solteros`);
        setLocationName('Taberna La Latina o Mercado San Ildefonso');
        setTagsInput('Cita en Grupo, Tapas, Mesa compartida');
      } else {
        setTitle(`Tarde de bolos / Escape room en grupo (${maxParticipants} plazas)`);
        setLocationName('Bowling Chamartín o Fox in a Box');
        setTagsInput('Cita en Grupo, Actividad, Equipo');
      }
    } else {
      if (cat === 'cafe') {
        setTitle('Tomar un café de especialidad y charlar sin prisa');
        setLocationName('Toma Café o Misión Café');
        setTagsInput('Café de autor, Conversación, Relax');
      } else if (cat === 'comer') {
        setTitle('Tapeo de autor y raciones para compartir');
        setLocationName('Taberna Sylkar o Sala de Despiece');
        setTagsInput('Tapas, Vino, Buena comida');
      } else {
        setTitle('Tarde de cerámica / taller creativo');
        setLocationName('Atelier Lumbre Cerámica');
        setTagsInput('Cerámica, Creatividad, Risas');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !locationName.trim()) return;

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    handleCreatePlan({
      category,
      title: title.trim(),
      description: description.trim(),
      locationName: locationName.trim(),
      locationArea: locationArea.trim(),
      datetime: datetime.trim(),
      imageBanner: defaultBanners[category],
      splitOption,
      tags,
      isGroupDate,
      maxParticipants: isGroupDate ? maxParticipants : undefined,
      groupType: isGroupDate ? groupType : undefined
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-[#1c1917] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-800 transition-colors">
        <div className="px-6 py-4 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
              {isGroupDate ? 'Organizar Cita en Grupo' : 'Publicar Plan de Cita'}
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {isGroupDate
                ? 'Reúne a un grupo de solteros (4-8 personas) en una mesa o actividad divertida'
                : 'Propón algo que te apetezca hacer e invita a alguien afín a sumarse'}
            </p>
          </div>
          <button
            onClick={() => setIsNewPlanModalOpen(false)}
            className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Plan Format: Individual vs Grupo */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-2">
              Modalidad de la Quedada
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleFormatChange(false)}
                className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                  !isGroupDate
                    ? 'border-stone-900 dark:border-white bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white font-bold ring-2 ring-stone-900/10'
                    : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 bg-white dark:bg-[#161412]'
                }`}
              >
                <div className={`p-2 rounded-lg ${!isGroupDate ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-950' : 'bg-stone-100 dark:bg-stone-800'}`}>
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold block">Cita Individual (1 a 1)</span>
                  <span className="text-[10px] opacity-75 block">A solas para charlar</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleFormatChange(true)}
                className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                  isGroupDate
                    ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/40 text-purple-950 dark:text-purple-200 font-bold ring-2 ring-purple-600/20'
                    : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 bg-white dark:bg-[#161412]'
                }`}
              >
                <div className={`p-2 rounded-lg ${isGroupDate ? 'bg-purple-600 text-white' : 'bg-stone-100 dark:bg-stone-800'}`}>
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold block">Cita en Grupo</span>
                  <span className="text-[10px] opacity-75 block">4 a 8 personas · Sin presión</span>
                </div>
              </button>
            </div>
          </div>

          {/* Group Specific Options */}
          {isGroupDate && (
            <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-900 dark:text-purple-200 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> Plazas para el grupo
                </span>
                <span className="text-xs font-mono font-bold text-purple-700 dark:text-purple-300">
                  {maxParticipants} personas
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { count: 4, desc: 'Doble cita (4)' },
                  { count: 6, desc: 'Mesa de 6 solteros' },
                  { count: 8, desc: 'Grupo grande (8)' }
                ].map(p => (
                  <button
                    key={p.count}
                    type="button"
                    onClick={() => {
                      setMaxParticipants(p.count);
                      setTitle(prev => prev.replace(/\d+/, String(p.count)));
                    }}
                    className={`py-2 px-1 rounded-xl text-center font-bold border transition-all cursor-pointer ${
                      maxParticipants === p.count
                        ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                        : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                    }`}
                  >
                    {p.desc}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-purple-950 dark:text-purple-300 mb-1">
                    Tipo de ambiente
                  </label>
                  <select
                    value={groupType}
                    onChange={e => setGroupType(e.target.value as any)}
                    className="w-full py-1.5 px-2 bg-white dark:bg-stone-900 border border-purple-200 dark:border-purple-800 rounded-lg text-xs text-stone-800 dark:text-stone-200 font-medium"
                  >
                    <option value="mesa_mixta">Mesa mixta equilibrada</option>
                    <option value="solteros_abierto">Solteros abierto a todos</option>
                    <option value="doble_cita">Doble cita con amigos</option>
                    <option value="actividad_grupal">Actividad / Equipo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-purple-950 dark:text-purple-300 mb-1">
                    Reparto de la cuenta
                  </label>
                  <select
                    value={splitOption}
                    onChange={e => setSplitOption(e.target.value as any)}
                    className="w-full py-1.5 px-2 bg-white dark:bg-stone-900 border border-purple-200 dark:border-purple-800 rounded-lg text-xs text-stone-800 dark:text-stone-200 font-medium"
                  >
                    <option value="A escote / A partes iguales">A escote / A partes iguales</option>
                    <option value="Cada uno lo suyo">Cada uno su consumición</option>
                    <option value="Invito yo">Invito yo a la mesa</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Category */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-2">
              Tipo de plan
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleCategorySelect('cafe')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  category === 'cafe'
                    ? 'border-amber-600 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-bold ring-2 ring-amber-600/20'
                    : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 text-stone-700 dark:text-stone-300 bg-white dark:bg-[#161412]'
                }`}
              >
                <Coffee className="w-5 h-5 mx-auto mb-1 text-amber-700 dark:text-amber-400" />
                <span className="text-xs block">Tomar Café</span>
              </button>

              <button
                type="button"
                onClick={() => handleCategorySelect('comer')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  category === 'comer'
                    ? 'border-orange-600 bg-orange-50 dark:bg-orange-950/40 text-orange-900 dark:text-orange-200 font-bold ring-2 ring-orange-600/20'
                    : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 text-stone-700 dark:text-stone-300 bg-white dark:bg-[#161412]'
                }`}
              >
                <UtensilsCrossed className="w-5 h-5 mx-auto mb-1 text-orange-600 dark:text-orange-400" />
                <span className="text-xs block">Ir a Comer</span>
              </button>

              <button
                type="button"
                onClick={() => handleCategorySelect('actividad')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  category === 'actividad'
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold ring-2 ring-emerald-600/20'
                    : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 text-stone-700 dark:text-stone-300 bg-white dark:bg-[#161412]'
                }`}
              >
                <Sparkles className="w-5 h-5 mx-auto mb-1 text-emerald-700 dark:text-emerald-400" />
                <span className="text-xs block">Actividad</span>
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-1">
              Título del plan
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Ej: Café y tarta en Malasaña para charlar"
              required
              className="w-full text-xs px-3 py-2.5 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-amber-500 focus:bg-white dark:focus:bg-stone-800"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-1">
              Descripción y qué buscas
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
              placeholder="Explica qué te apetece hacer, el ambiente que buscas o qué te gustaría compartir..."
              required
              className="w-full text-xs p-3 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-amber-500 focus:bg-white dark:focus:bg-stone-800 resize-none"
            />
          </div>

          {/* Location & Area */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-1">
                Lugar o local
              </label>
              <input
                type="text"
                value={locationName}
                onChange={e => setLocationName(e.target.value)}
                placeholder="Ej: Misión Café"
                required
                className="w-full text-xs px-3 py-2 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-1">
                Barrio o zona
              </label>
              <input
                type="text"
                value={locationArea}
                onChange={e => setLocationArea(e.target.value)}
                placeholder="Ej: Malasaña, Madrid"
                required
                className="w-full text-xs px-3 py-2 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-amber-500"
              />
            </div>
          </div>

          {/* When & Split Option */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-1">
                Fecha / Hora
              </label>
              <input
                type="text"
                value={datetime}
                onChange={e => setDatetime(e.target.value)}
                placeholder="Ej: Sábado, 17:00"
                required
                className="w-full text-xs px-3 py-2 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-1">
                Pago de la cuenta
              </label>
              <select
                value={splitOption}
                onChange={e => setSplitOption(e.target.value as any)}
                className="w-full text-xs px-3 py-2 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-amber-500 cursor-pointer"
              >
                <option value="A medias">A medias (50/50)</option>
                <option value="Invito yo">Invito yo</option>
                <option value="Invitación mutua">Invitación mutua (ronda y ronda)</option>
              </select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-1">
              Etiquetas (separadas por comas)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={e => setTagsInput(e.target.value)}
              placeholder="Ej: Café artesano, Vinilos, Charla"
              className="w-full text-xs px-3 py-2 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-amber-500"
            />
          </div>

          {/* Buttons */}
          <div className="pt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsNewPlanModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold text-white dark:text-stone-950 bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Publicar propuesta</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
