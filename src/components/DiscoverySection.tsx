import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { UserProfile, PlanCategory } from '../types';
import {
  Coffee,
  UtensilsCrossed,
  Sparkles,
  MapPin,
  Heart,
  X,
  ChevronLeft,
  ChevronRight,
  Flame,
  CheckCircle2,
  CalendarPlus,
  Navigation,
  Compass
} from 'lucide-react';

export const DiscoverySection: React.FC = () => {
  const {
    profiles,
    maxDistance,
    setMaxDistance,
    handleLikeProfile,
    openProposalModal,
    openCompatibilityModal,
    openRegistrationModal,
    setActiveTab,
    currentUser
  } = useApp();

  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [selectedCategoryHighlight, setSelectedCategoryHighlight] = useState<PlanCategory | 'all'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showProximityPanel, setShowProximityPanel] = useState(true);

  // Filter profiles based on proximity & category
  const filteredProfiles = useMemo(() => {
    return profiles.filter(profile => {
      const withinDistance = profile.distanceKm <= maxDistance;
      const matchesCategory =
        selectedCategoryHighlight === 'all' ||
        Boolean(profile.plans[selectedCategoryHighlight]);
      return withinDistance && matchesCategory;
    });
  }, [profiles, maxDistance, selectedCategoryHighlight]);

  // Find nearest profile overall for empty state suggestion
  const nearestProfile = useMemo(() => {
    if (profiles.length === 0) return null;
    return [...profiles].sort((a, b) => a.distanceKm - b.distanceKm)[0];
  }, [profiles]);

  // Ensure index is within range
  const safeIndex = filteredProfiles.length > 0 ? currentIndex % filteredProfiles.length : 0;
  const currentProfile: UserProfile | undefined = filteredProfiles[safeIndex];

  const handleNext = () => {
    if (filteredProfiles.length > 0) {
      setCurrentIndex(prev => (prev + 1) % filteredProfiles.length);
      setActivePhotoIndex(0);
    }
  };

  const handlePass = () => {
    handleNext();
  };

  const handleLike = (profile: UserProfile) => {
    handleLikeProfile(profile);
    handleNext();
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentProfile) return;
    if (activePhotoIndex < currentProfile.photos.length - 1) {
      setActivePhotoIndex(prev => prev + 1);
    } else {
      setActivePhotoIndex(0);
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentProfile) return;
    if (activePhotoIndex > 0) {
      setActivePhotoIndex(prev => prev - 1);
    } else {
      setActivePhotoIndex(currentProfile.photos.length - 1);
    }
  };

  const distancePresets = [
    { label: '3 km', value: 3, desc: 'A pie / Mismo barrio' },
    { label: '5 km', value: 5, desc: 'Centro de la ciudad' },
    { label: '10 km', value: 10, desc: 'Distritos cercanos' },
    { label: '20 km', value: 20, desc: 'Área metropolitana' },
    { label: '50 km', value: 50, desc: 'Toda la región' }
  ];

  const getWalkingEstimate = (km: number) => {
    if (km <= 2.0) return 'A unos 15-20 min a pie';
    if (km <= 4.0) return 'A unos 10 min en metro o bici';
    if (km <= 10.0) return 'A unos 20 min en transporte';
    return 'En la misma región';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 lg:py-8 transition-colors duration-200">
      {/* Top Bar with Title, Proximity Toggle and Category Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              Conoce gente con planes reales
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mt-1">
            <span className="flex items-center gap-1 text-stone-700 dark:text-stone-300 font-medium">
              <MapPin className="w-3.5 h-3.5 text-amber-700 dark:text-amber-500" />
              <span>Tu zona: {currentUser.neighborhood}, {currentUser.city}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums text-stone-700 dark:text-stone-300 font-medium">
              Radio: {maxDistance} km
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {filteredProfiles.length}{' '}
              {filteredProfiles.length === 1 ? 'persona disponible' : 'personas disponibles'}
            </span>
          </div>
        </div>

        {/* Action controls: Proximity Filter trigger & Category pills */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          {/* Proximity Toggle Button */}
          <button
            onClick={() => setShowProximityPanel(!showProximityPanel)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer ${
              showProximityPanel
                ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 border-stone-900 dark:border-stone-100 shadow-xs'
                : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            <Navigation className="w-3.5 h-3.5 text-amber-400" />
            <span>Filtro de proximidad: {maxDistance} km</span>
          </button>

          {/* Filter by date intention */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-800/80 rounded-lg">
            <button
              onClick={() => setSelectedCategoryHighlight('all')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                selectedCategoryHighlight === 'all'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setSelectedCategoryHighlight('cafe')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors flex items-center gap-1 cursor-pointer ${
                selectedCategoryHighlight === 'cafe'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <Coffee className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
              <span>Café</span>
            </button>
            <button
              onClick={() => setSelectedCategoryHighlight('comer')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors flex items-center gap-1 cursor-pointer ${
                selectedCategoryHighlight === 'comer'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <UtensilsCrossed className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
              <span>Comer</span>
            </button>
            <button
              onClick={() => setSelectedCategoryHighlight('actividad')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors flex items-center gap-1 cursor-pointer ${
                selectedCategoryHighlight === 'actividad'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              <span>Actividad</span>
            </button>
          </div>
        </div>
      </div>

      {/* Proximity Slider & Quick Distance Presets Panel */}
      {showProximityPanel && (
        <div className="bg-white dark:bg-[#1c1917] rounded-2xl p-4 sm:p-5 border border-stone-200/90 dark:border-stone-800 shadow-xs mb-6 transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 flex items-center justify-center">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-stone-900 dark:text-stone-100 block">
                  Ajustar radio de proximidad máxima
                </span>
                <span className="text-[11px] text-stone-500 dark:text-stone-400">
                  Encuentra personas para tomar un café o comer cerca de ti
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500 dark:text-stone-400">Radio actual:</span>
              <span className="font-mono tabular-nums text-sm font-bold text-amber-900 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-md border border-amber-200 dark:border-amber-800/60">
                {maxDistance} km
              </span>
            </div>
          </div>

          {/* Slider */}
          <div className="space-y-1.5 mb-4">
            <input
              type="range"
              min="1"
              max="50"
              step="1"
              value={maxDistance}
              onChange={e => setMaxDistance(Number(e.target.value))}
              className="w-full h-2 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-stone-900 dark:accent-amber-400"
              aria-label="Radio de distancia en kilómetros"
            />
            <div className="flex justify-between text-[10px] text-stone-400 dark:text-stone-500 font-mono tabular-nums">
              <span>1 km (Muy cerca)</span>
              <span>10 km</span>
              <span>25 km</span>
              <span>50 km (Comunidad)</span>
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-stone-100 dark:border-stone-800/70">
            <span className="text-[11px] text-stone-500 dark:text-stone-400 font-medium mr-1">
              Atajos rápidos:
            </span>
            {distancePresets.map(preset => {
              const isActive = maxDistance === preset.value;
              return (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => setMaxDistance(preset.value)}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 font-semibold shadow-xs'
                      : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200/80 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <span className="font-mono tabular-nums">{preset.label}</span>
                  <span className="text-[10px] opacity-75 hidden sm:inline">
                    ({preset.desc})
                  </span>
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setMaxDistance(50)}
              className="text-xs text-amber-800 dark:text-amber-400 hover:text-amber-950 dark:hover:text-amber-300 font-semibold ml-auto cursor-pointer"
            >
              Restablecer a máximo
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area: Either Profiles or Proximity Empty State */}
      {filteredProfiles.length === 0 ? (
        <div className="bg-white dark:bg-[#1c1917] rounded-3xl p-8 sm:p-12 text-center border border-stone-200/80 dark:border-stone-800 max-w-lg mx-auto shadow-sm my-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center text-amber-800 dark:text-amber-400">
            <Navigation className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2">
            No hay personas a menos de {maxDistance} km
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mb-4 leading-relaxed">
            {nearestProfile ? (
              <>
                La persona más cercana es <strong className="text-stone-900 dark:text-stone-200">{nearestProfile.name}</strong> a solo{' '}
                <span className="font-mono font-bold text-stone-700 dark:text-amber-400">
                  {nearestProfile.distanceKm} km
                </span>{' '}
                en {nearestProfile.neighborhood} ({nearestProfile.city}).
              </>
            ) : (
              'Amplía el radio para encontrar personas interesadas en compartir café, comidas y actividades.'
            )}
          </p>

          <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
            {nearestProfile && (
              <button
                onClick={() => setMaxDistance(Math.ceil(nearestProfile.distanceKm) + 1)}
                className="px-4 py-2.5 text-xs font-bold bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 rounded-xl hover:bg-stone-800 dark:hover:bg-white transition-colors shadow-xs cursor-pointer"
              >
                Ampliar a {Math.ceil(nearestProfile.distanceKm) + 1} km
              </button>
            )}
            <button
              onClick={() => setMaxDistance(15)}
              className="px-4 py-2.5 text-xs font-semibold bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-xl hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors cursor-pointer"
            >
              Fijar radio en 15 km
            </button>
            <button
              onClick={() => setMaxDistance(50)}
              className="px-4 py-2.5 text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 rounded-xl hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors cursor-pointer"
            >
              Ver todos (50 km)
            </button>
          </div>
        </div>
      ) : !currentProfile ? null : (
        /* Main Grid: Card & Detail Split */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Visual Profile Card (5 cols on lg) */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-[#1c1917] rounded-3xl overflow-hidden border border-stone-200/80 dark:border-stone-800 shadow-md relative group transition-colors">
              {/* Image viewport */}
              <div className="relative aspect-[4/5] w-full bg-stone-900 overflow-hidden">
                <img
                  src={currentProfile.photos[activePhotoIndex] || currentProfile.avatar}
                  alt={currentProfile.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-300"
                />

                {/* Proximity badge top left */}
                <div className="absolute top-3 left-3 bg-stone-950/85 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-medium text-white flex items-center gap-1.5 shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-mono tabular-nums font-bold">{currentProfile.distanceKm} km</span>
                  <span className="text-[10px] text-stone-300">({getWalkingEstimate(currentProfile.distanceKm)})</span>
                </div>

                {/* Profile queue counter top right */}
                <div className="absolute top-3 right-3 bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-mono tabular-nums text-stone-200">
                  {safeIndex + 1} / {filteredProfiles.length}
                </div>

                {/* Top photo progress bar */}
                {currentProfile.photos.length > 1 && (
                  <div className="absolute top-10 left-4 right-4 flex gap-1 z-10">
                    {currentProfile.photos.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          i === activePhotoIndex ? 'bg-white' : 'bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Photo Navigation Overlays */}
                {currentProfile.photos.length > 1 && (
                  <>
                    <button
                      onClick={prevPhoto}
                      aria-label="Foto anterior"
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm opacity-80 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextPhoto}
                      aria-label="Foto siguiente"
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm opacity-80 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Bottom Scrim with Name, Age & Neighborhood */}
                <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-stone-950/95 via-stone-950/60 to-transparent text-white">
                  <div className="flex items-baseline gap-2">
                    <h2 className="text-2xl font-bold tracking-tight text-white">
                      {currentProfile.name}, {currentProfile.age}
                    </h2>
                  </div>
                  <p className="text-sm text-stone-200 mt-0.5 font-medium">
                    {currentProfile.occupation}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-stone-300 mt-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>
                      {currentProfile.neighborhood}, {currentProfile.city}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums text-amber-300 font-semibold">
                      {currentProfile.distanceKm} km
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick action bar */}
              <div className="p-4 bg-stone-50 dark:bg-[#161412] border-t border-stone-200/80 dark:border-stone-800 flex items-center justify-around gap-2 transition-colors">
                <button
                  onClick={handlePass}
                  title="Pasar"
                  className="w-13 h-13 rounded-full bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 hover:border-stone-400 dark:hover:border-stone-600 hover:bg-stone-100 dark:hover:bg-stone-700 flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>

                <button
                  onClick={() => handleLike(currentProfile)}
                  title="Me gusta"
                  className="w-14 h-14 rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 hover:bg-stone-800 dark:hover:bg-white flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <Heart className="w-7 h-7 fill-white dark:fill-stone-950" />
                </button>

                <button
                  onClick={() => openProposalModal(currentProfile)}
                  title="Proponer Cita Directa"
                  className="w-13 h-13 rounded-full bg-amber-600 dark:bg-amber-500 text-white hover:bg-amber-700 dark:hover:bg-amber-600 flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  <CalendarPlus className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Date Invitations & Full Profile Context (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Bio statement & Questionnaire Data */}
            <div className="bg-white dark:bg-[#1c1917] rounded-2xl p-6 border border-stone-200/80 dark:border-stone-800 shadow-sm transition-colors space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  Sobre mí & Afinidad
                </h3>

                {/* Algorithmic Match Score Button */}
                <button
                  type="button"
                  onClick={() => openCompatibilityModal(currentProfile)}
                  className="px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 font-bold text-xs flex items-center gap-1.5 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-all shadow-xs cursor-pointer group"
                  title="Haz clic para ver el desglose del algoritmo de compatibilidad"
                >
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 group-hover:scale-110 transition-transform" />
                  <span className="font-mono">{currentProfile.matchPercentage}% de afinidad</span>
                  <span className="text-[10px] text-rose-600 dark:text-rose-400 underline font-semibold ml-0.5">
                    ¿Por qué?
                  </span>
                </button>
              </div>

              <p className="text-stone-800 dark:text-stone-200 text-base leading-relaxed">
                "{currentProfile.bio}"
              </p>

              {/* Questionnaire Badges: Relationship intent & Location */}
              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center gap-2 text-xs">
                {currentProfile.relationshipType && (
                  <span className="px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/50 text-purple-700 dark:text-purple-300 font-semibold">
                    Busca:{' '}
                    {currentProfile.relationshipType === 'pareja_estable'
                      ? 'Pareja estable'
                      : currentProfile.relationshipType === 'amistad_planes'
                      ? 'Amistad y planes'
                      : 'Citas y ver qué surge'}
                  </span>
                )}

                {currentProfile.province && (
                  <span className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium">
                    Provincia: {currentProfile.province}
                  </span>
                )}

                {currentProfile.datePreferences?.energyLevel && (
                  <span className="px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/50 text-teal-700 dark:text-teal-300 font-medium capitalize">
                    Energía: {currentProfile.datePreferences.energyLevel}
                  </span>
                )}
              </div>

              {/* Questionnaire Hobbies */}
              {currentProfile.hobbies && currentProfile.hobbies.length > 0 && (
                <div className="pt-2">
                  <p className="text-[11px] uppercase font-bold tracking-wider text-stone-400 dark:text-stone-500 mb-1.5">
                    Aficiones del cuestionario:
                  </p>
                  <div className="flex flex-wrap gap-1.5 text-xs">
                    {currentProfile.hobbies.map((hobby, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-stone-100 dark:bg-stone-800/80 rounded-md text-stone-700 dark:text-stone-300 font-medium"
                      >
                        {hobby}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Core Feature: Planes Ideales para Quedar (Coffee, Food, Activity) */}
            <div className="bg-white dark:bg-[#1c1917] rounded-2xl p-6 border border-stone-200/80 dark:border-stone-800 shadow-sm transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                    Planes ideales para romper el hielo
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    Elige uno y propónselo directamente con un solo clic
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Option 1: TOMAR UN CAFÉ */}
                <div
                  className={`p-4 rounded-xl border transition-all ${
                    selectedCategoryHighlight === 'cafe' || selectedCategoryHighlight === 'all'
                      ? 'border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20 hover:bg-amber-50/70 dark:hover:bg-amber-950/30'
                      : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-[#161412] opacity-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 flex items-center justify-center shrink-0">
                        <Coffee className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                            {currentProfile.plans.cafe.title}
                          </h4>
                          <span className="text-xs font-medium text-amber-800 dark:text-amber-400">
                            · {currentProfile.plans.cafe.spot}
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
                          {currentProfile.plans.cafe.note}
                        </p>
                        <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
                          Preferencia: <span className="font-medium text-stone-700 dark:text-stone-200">{currentProfile.coffeeStyle}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => openProposalModal(currentProfile, 'cafe')}
                      className="px-3.5 py-2 text-xs font-semibold bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 rounded-lg hover:bg-stone-800 dark:hover:bg-white transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
                    >
                      Proponer Café
                    </button>
                  </div>
                </div>

                {/* Option 2: IR A COMER */}
                <div
                  className={`p-4 rounded-xl border transition-all ${
                    selectedCategoryHighlight === 'comer' || selectedCategoryHighlight === 'all'
                      ? 'border-orange-200 dark:border-orange-900/60 bg-orange-50/40 dark:bg-orange-950/20 hover:bg-orange-50/70 dark:hover:bg-orange-950/30'
                      : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-[#161412] opacity-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-400 flex items-center justify-center shrink-0">
                        <UtensilsCrossed className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                            {currentProfile.plans.comer.title}
                          </h4>
                          <span className="text-xs font-medium text-orange-800 dark:text-orange-400">
                            · {currentProfile.plans.comer.spot}
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
                          {currentProfile.plans.comer.note}
                        </p>
                        <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
                          Preferencia: <span className="font-medium text-stone-700 dark:text-stone-200">{currentProfile.foodCuisine}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => openProposalModal(currentProfile, 'comer')}
                      className="px-3.5 py-2 text-xs font-semibold bg-orange-600 dark:bg-orange-500 text-white rounded-lg hover:bg-orange-700 dark:hover:bg-orange-600 transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
                    >
                      Invitar a Comer
                    </button>
                  </div>
                </div>

                {/* Option 3: HACER UNA ACTIVIDAD */}
                <div
                  className={`p-4 rounded-xl border transition-all ${
                    selectedCategoryHighlight === 'actividad' || selectedCategoryHighlight === 'all'
                      ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/30'
                      : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-[#161412] opacity-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 flex items-center justify-center shrink-0">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                            {currentProfile.plans.actividad.title}
                          </h4>
                          <span className="text-xs font-medium text-emerald-800 dark:text-emerald-400">
                            · {currentProfile.plans.actividad.spot}
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
                          {currentProfile.plans.actividad.note}
                        </p>
                        <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
                          Actividad: <span className="font-medium text-stone-700 dark:text-stone-200">{currentProfile.activityPick}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => openProposalModal(currentProfile, 'actividad')}
                      className="px-3.5 py-2 text-xs font-semibold bg-emerald-700 dark:bg-emerald-600 text-white rounded-lg hover:bg-emerald-800 dark:hover:bg-emerald-700 transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
                    >
                      Proponer Actividad
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Social reassurance / Vibe badges */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-500 dark:text-stone-400 gap-2 px-2">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>
                  A {currentProfile.distanceKm} km · Dispuesto/a a quedar esta semana
                </span>
              </div>
              <button
                onClick={() => setActiveTab('tablon')}
                className="text-stone-800 dark:text-amber-400 font-semibold hover:underline text-left sm:text-right"
              >
                Ver propuestas en el Tablón →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
