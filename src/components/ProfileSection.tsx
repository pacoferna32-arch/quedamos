import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Coffee,
  UtensilsCrossed,
  Sparkles,
  Save,
  Check,
  Camera,
  Sun,
  Moon
} from 'lucide-react';

export const ProfileSection: React.FC = () => {
  const { currentUser, updateCurrentUser, theme, setTheme, openRegistrationModal, showNotification } = useApp();

  const [formData, setFormData] = useState({
    name: currentUser.name,
    age: currentUser.age,
    city: currentUser.city,
    neighborhood: currentUser.neighborhood,
    occupation: currentUser.occupation,
    bio: currentUser.bio,
    coffeeStyle: currentUser.coffeeStyle,
    foodCuisine: currentUser.foodCuisine,
    activityPick: currentUser.activityPick,
    cafeSpot: currentUser.plans.cafe.spot,
    cafeTitle: currentUser.plans.cafe.title,
    cafeNote: currentUser.plans.cafe.note,
    comerSpot: currentUser.plans.comer.spot,
    comerTitle: currentUser.plans.comer.title,
    comerNote: currentUser.plans.comer.note,
    actividadSpot: currentUser.plans.actividad.spot,
    actividadTitle: currentUser.plans.actividad.title,
    actividadNote: currentUser.plans.actividad.note
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateCurrentUser({
      name: formData.name,
      age: Number(formData.age),
      city: formData.city,
      neighborhood: formData.neighborhood,
      occupation: formData.occupation,
      bio: formData.bio,
      coffeeStyle: formData.coffeeStyle,
      foodCuisine: formData.foodCuisine,
      activityPick: formData.activityPick,
      plans: {
        cafe: {
          title: formData.cafeTitle,
          spot: formData.cafeSpot,
          preference: formData.coffeeStyle,
          note: formData.cafeNote
        },
        comer: {
          title: formData.comerTitle,
          spot: formData.comerSpot,
          preference: formData.foodCuisine,
          note: formData.comerNote
        },
        actividad: {
          title: formData.actividadTitle,
          spot: formData.actividadSpot,
          preference: formData.activityPick,
          note: formData.actividadNote
        }
      }
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 lg:py-8 transition-colors duration-200">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Mi Perfil & Preferencias de Citas
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
            Configura tus gustos favoritos de café, comida y actividades para que tus citas sean 100% afines.
          </p>
        </div>

        <button
          type="button"
          onClick={openRegistrationModal}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 to-rose-600 hover:from-purple-800 hover:to-rose-700 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-200" />
          <span>Editar Cuestionario de Compatibilidad</span>
        </button>
      </div>

      {/* Questionnaire Quick Overview Banner */}
      <div className="mb-6 p-5 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <h3 className="text-sm font-bold text-purple-950 dark:text-purple-200">
              Cuestionario de Quedamos.net Activo
            </h3>
          </div>
          <p className="text-xs text-purple-800 dark:text-purple-300 mt-1">
            Buscando: <strong className="capitalize">{currentUser.lookingFor || 'mujer'}</strong> · Relación: <strong className="capitalize">{(currentUser.relationshipType || 'citas_ver_que_surge').replace(/_/g, ' ')}</strong> · Provincia: <strong>{currentUser.province || 'Madrid'}</strong>
          </p>
          {currentUser.hobbies && currentUser.hobbies.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {currentUser.hobbies.map((h, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md bg-white/80 dark:bg-purple-900/40 text-[11px] font-medium text-purple-900 dark:text-purple-200 border border-purple-200/60 dark:border-purple-800/40"
                >
                  {h}
                </span>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={openRegistrationModal}
          className="text-xs font-bold text-purple-700 dark:text-purple-300 underline shrink-0 hover:text-purple-950 dark:hover:text-white cursor-pointer"
        >
          Volver a rellenar cuestionario &rarr;
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* User Card & Identity */}
        <div className="bg-white dark:bg-[#1c1917] rounded-2xl p-6 border border-stone-200/90 dark:border-stone-800 shadow-sm transition-colors">
          <h2 className="text-sm font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-4">
            Datos Básicos
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                referrerPolicy="no-referrer"
                className="w-24 h-24 rounded-full object-cover border-2 border-stone-200 dark:border-stone-700 shadow-md"
              />
              <button
                type="button"
                onClick={() => showNotification('Foto de perfil lista. Puedes actualizar tus datos en el cuestionario.')}
                className="absolute bottom-0 right-0 p-1.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-full shadow hover:bg-stone-800 dark:hover:bg-white transition-colors cursor-pointer"
                title="Cambiar foto"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 w-full">
              <div>
                <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full text-xs px-3 py-2 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                  Edad
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={e => setFormData({ ...formData, age: Number(e.target.value) })}
                  required
                  className="w-full text-xs px-3 py-2 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-amber-500 font-mono tabular-nums"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                  Profesión / Ocupación
                </label>
                <input
                  type="text"
                  value={formData.occupation}
                  onChange={e => setFormData({ ...formData, occupation: e.target.value })}
                  required
                  className="w-full text-xs px-3 py-2 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                  Ciudad & Barrio
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Ciudad"
                    className="w-1/2 text-xs px-3 py-2 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-amber-500"
                  />
                  <input
                    type="text"
                    value={formData.neighborhood}
                    onChange={e => setFormData({ ...formData, neighborhood: e.target.value })}
                    placeholder="Barrio"
                    className="w-1/2 text-xs px-3 py-2 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
              Sobre ti (Bio y qué buscas)
            </label>
            <textarea
              value={formData.bio}
              onChange={e => setFormData({ ...formData, bio: e.target.value })}
              rows={3}
              required
              className="w-full text-xs p-3 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-amber-500 focus:bg-white dark:focus:bg-stone-800 resize-none"
            />
          </div>
        </div>

        {/* Apariencia / Modo Oscuro */}
        <div className="bg-white dark:bg-[#1c1917] rounded-2xl p-6 border border-stone-200/90 dark:border-stone-800 shadow-sm transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
                Apariencia de la aplicación
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                Elige el tema visual para una mejor experiencia diurna o nocturna
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 max-w-sm">
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition-all cursor-pointer ${
                theme === 'light'
                  ? 'bg-amber-50 border-amber-500 text-amber-900 ring-2 ring-amber-500/20'
                  : 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-600" />
              <span>Modo Claro</span>
            </button>

            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-stone-900 border-amber-400 text-white ring-2 ring-amber-400/20'
                  : 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700'
              }`}
            >
              <Moon className="w-4 h-4 text-amber-400" />
              <span>Modo Oscuro</span>
            </button>
          </div>
        </div>

        {/* 1. Preferencias de Café */}
        <div className="bg-white dark:bg-[#1c1917] rounded-2xl p-6 border border-stone-200/90 dark:border-stone-800 shadow-sm transition-colors">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 flex items-center justify-center">
              <Coffee className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
                Tu Plan de Café Ideal
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                ¿Cómo te gusta el café y a qué cafetería te encanta ir?
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                ¿Cómo tomas el café?
              </label>
              <input
                type="text"
                value={formData.coffeeStyle}
                onChange={e => setFormData({ ...formData, coffeeStyle: e.target.value })}
                placeholder="Ej: Flat white con bebida de avena, Espresso doble..."
                className="w-full text-xs px-3 py-2 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                Tu cafetería predilecta en la ciudad
              </label>
              <input
                type="text"
                value={formData.cafeSpot}
                onChange={e => setFormData({ ...formData, cafeSpot: e.target.value })}
                placeholder="Ej: Toma Café, Misión Café, Café de la Luz..."
                className="w-full text-xs px-3 py-2 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-amber-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                Detalle o anécdota para la cita de café
              </label>
              <input
                type="text"
                value={formData.cafeNote}
                onChange={e => setFormData({ ...formData, cafeNote: e.target.value })}
                placeholder="Ej: Me encanta sentarme en la terraza al sol y charlar de música..."
                className="w-full text-xs px-3 py-2 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-amber-500"
              />
            </div>
          </div>
        </div>

        {/* 2. Preferencias de Comida */}
        <div className="bg-white dark:bg-[#1c1917] rounded-2xl p-6 border border-stone-200/90 dark:border-stone-800 shadow-sm transition-colors">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-400 flex items-center justify-center">
              <UtensilsCrossed className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
                Tu Plan de Comida / Cena Ideal
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                ¿Qué tipo de comida te apasiona y cuál es tu restaurante fetiche?
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                Gastronomía favorita
              </label>
              <input
                type="text"
                value={formData.foodCuisine}
                onChange={e => setFormData({ ...formData, foodCuisine: e.target.value })}
                placeholder="Ej: Tapas de autor y vinos, Ramen artesanal, Tacos..."
                className="w-full text-xs px-3 py-2 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                Restaurante o taberna favorita
              </label>
              <input
                type="text"
                value={formData.comerSpot}
                onChange={e => setFormData({ ...formData, comerSpot: e.target.value })}
                placeholder="Ej: Taberna Sylkar, Sala de Despiece, Chuka Ramen..."
                className="w-full text-xs px-3 py-2 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-amber-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                Detalle para compartir mesa
              </label>
              <input
                type="text"
                value={formData.comerNote}
                onChange={e => setFormData({ ...formData, comerNote: e.target.value })}
                placeholder="Ej: Compartir varias raciones al centro es mi filosofía de vida..."
                className="w-full text-xs px-3 py-2 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-amber-500"
              />
            </div>
          </div>
        </div>

        {/* 3. Preferencias de Actividad */}
        <div className="bg-white dark:bg-[#1c1917] rounded-2xl p-6 border border-stone-200/90 dark:border-stone-800 shadow-sm transition-colors">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
                Tu Actividad Favorita para Citas
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Hacer algo juntos para reírse y olvidarse de los silencios incómodos.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                Actividad predilecta
              </label>
              <input
                type="text"
                value={formData.activityPick}
                onChange={e => setFormData({ ...formData, activityPick: e.target.value })}
                placeholder="Ej: Taller de cerámica, Escalada en bloque, Ruta en bici..."
                className="w-full text-xs px-3 py-2 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                Lugar de la actividad
              </label>
              <input
                type="text"
                value={formData.actividadSpot}
                onChange={e => setFormData({ ...formData, actividadSpot: e.target.value })}
                placeholder="Ej: Atelier Lumbre, Sputnik Climbing, Matadero..."
                className="w-full text-xs px-3 py-2 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-amber-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                Por qué te gusta esta actividad
              </label>
              <input
                type="text"
                value={formData.actividadNote}
                onChange={e => setFormData({ ...formData, actividadNote: e.target.value })}
                placeholder="Ej: Rompe el hielo de forma cero forzada y nos llevamos un recuerdo..."
                className="w-full text-xs px-3 py-2 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="flex items-center justify-end gap-3 pt-4">
          {savedSuccess && (
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              ¡Cambios guardados con éxito!
            </span>
          )}
          <button
            type="submit"
            className="px-6 py-3 text-sm font-bold text-white dark:text-stone-950 bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Guardar Perfil y Preferencias</span>
          </button>
        </div>
      </form>
    </div>
  );
};
