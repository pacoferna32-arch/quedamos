import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Sparkles,
  Heart,
  Coffee,
  UtensilsCrossed,
  Compass,
  Check,
  UserCheck,
  MapPin,
  Calendar,
  Briefcase,
  Layers,
  ArrowRight,
  ArrowLeft,
  Mail,
  Lock,
  User,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { LookingFor, RelationshipType } from '../types';

// Spanish provinces
const SPANISH_PROVINCES = [
  'Madrid',
  'Barcelona',
  'Valencia',
  'Sevilla',
  'Málaga',
  'Zaragoza',
  'Bizkaia (Bilbao)',
  'A Coruña',
  'Granada',
  'Alicante',
  'Murcia',
  'Cádiz',
  'Córdoba',
  'Valladolid',
  'Baleares',
  'Las Palmas',
  'Santa Cruz de Tenerife',
  'Asturias',
  'Gipuzkoa (San Sebastián)',
  'Toledo',
  'Navarra',
  'Cantabria'
];

// Professions list
const PROFESSIONS = [
  'Diseño, Arte & Creatividad',
  'Tecnología, Software & Datos',
  'Sanidad, Medicina & Enfermería',
  'Educación, Docencia & Universidad',
  'Arquitectura, Urbanismo & Paisajismo',
  'Hostelería, Sommelier & Gastronomía',
  'Marketing, Publicidad & Comunicación',
  'Derecho, Jurídico & Asesoría',
  'Finanzas, Economía & Banca',
  'Ciencia, Investigación & Medio Ambiente',
  'Gestión Cultural & Editorial',
  'Deporte, Fitness & Fisioterapia',
  'Emprendimiento / Autónomo',
  'Estudiante / Opositor',
  'Otra profesión'
];

// Verbatim checkbox hobbies from the user attachment
const QUESTIONNAIRE_HOBBIES = [
  'Hacer Deporte',
  'Viajar',
  'La Naturaleza',
  'El Cine',
  'Los Animales',
  'El Teatro',
  'La Televisión',
  'La Lectura',
  'La Tecnología',
  'Los Niños',
  'Cocinar',
  'Música en vivo'
];

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const MONTHS = [
  { value: 1, label: 'Enero' },
  { value: 2, label: 'Febrero' },
  { value: 3, label: 'Marzo' },
  { value: 4, label: 'Abril' },
  { value: 5, label: 'Mayo' },
  { value: 6, label: 'Junio' },
  { value: 7, label: 'Julio' },
  { value: 8, label: 'Agosto' },
  { value: 9, label: 'Septiembre' },
  { value: 10, label: 'Octubre' },
  { value: 11, label: 'Noviembre' },
  { value: 12, label: 'Diciembre' }
];
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 50 }, (_, i) => CURRENT_YEAR - 18 - i);

export const RegistrationModal: React.FC = () => {
  const {
    isRegistrationOpen,
    closeRegistrationModal,
    currentUser,
    updateCurrentUser,
    showNotification,
    setActiveTab
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states initialized with currentUser
  const [authMethod, setAuthMethod] = useState<'google' | 'apple' | 'email'>('google');
  const [name, setName] = useState(currentUser.name || '');
  const [email, setEmail] = useState(currentUser.email || 'alex.moreno@gmail.com');
  const [password, setPassword] = useState('••••••••');

  // Step 2: Cuestionario Quedamos.net (fiel a la captura)
  const [gender, setGender] = useState<'hombre' | 'mujer' | 'no_binario'>(currentUser.gender || 'hombre');
  const [lookingFor, setLookingFor] = useState<LookingFor>(currentUser.lookingFor || 'mujer');
  const [relationshipType, setRelationshipType] = useState<RelationshipType>(
    currentUser.relationshipType || 'citas_ver_que_surge'
  );
  const [birthDay, setBirthDay] = useState<number>(currentUser.birthDay || 14);
  const [birthMonth, setBirthMonth] = useState<number>(currentUser.birthMonth || 6);
  const [birthYear, setBirthYear] = useState<number>(currentUser.birthYear || 1998);
  const [nationality, setNationality] = useState<string>(currentUser.nationality || 'Española');
  const [country, setCountry] = useState<string>(currentUser.country || 'España');
  const [province, setProvince] = useState<string>(currentUser.province || 'Madrid');
  const [city, setCity] = useState<string>(currentUser.city || 'Madrid');
  const [neighborhood, setNeighborhood] = useState<string>(currentUser.neighborhood || 'La Latina');
  const [occupation, setOccupation] = useState<string>(currentUser.occupation || 'Diseñador Visual & Creativo');
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>(
    currentUser.hobbies && currentUser.hobbies.length > 0
      ? currentUser.hobbies
      : ['Hacer Deporte', 'Viajar', 'El Cine', 'Cocinar', 'La Naturaleza']
  );

  // Step 3: Campos Relevantes para la Cita Perfecta
  const [coffeeStyle, setCoffeeStyle] = useState<string>(currentUser.coffeeStyle || 'Flat White con bebida de avena');
  const [coffeeVibe, setCoffeeVibe] = useState<string>(
    currentUser.datePreferences?.coffeeVibe || 'Terraza al sol sin prisas'
  );
  const [coffeePayment, setCoffeePayment] = useState<'Invito yo' | 'A medias' | 'Invita quien propone'>(
    currentUser.datePreferences?.coffeePayment || 'A medias'
  );

  const [foodCuisine, setFoodCuisine] = useState<string>(
    currentUser.foodCuisine || 'Tapas tradicionales reinterpretadas & comida mediterránea'
  );
  const [diningVibe, setDiningVibe] = useState<string>(
    currentUser.datePreferences?.diningVibe || 'Compartir raciones al centro'
  );

  const [activityPick, setActivityPick] = useState<string>(
    currentUser.activityPick || 'Taller de alfarería / cerámica o ruta botánica'
  );
  const [energyLevel, setEnergyLevel] = useState<'tranquilo' | 'dinamico' | 'aventurero'>(
    currentUser.datePreferences?.energyLevel || 'dinamico'
  );

  if (!isRegistrationOpen) return null;

  const toggleHobby = (hobby: string) => {
    setSelectedHobbies(prev =>
      prev.includes(hobby) ? prev.filter(h => h !== hobby) : [...prev, hobby]
    );
  };

  const handleSimulateOAuth = (provider: 'google' | 'apple') => {
    setAuthMethod(provider);
    if (provider === 'google') {
      setName(currentUser.name || 'Álex Moreno');
      setEmail('alex.moreno@gmail.com');
      showNotification('Conectado con cuenta de Google exitosamente');
    } else {
      setName(currentUser.name || 'Álex Moreno');
      setEmail('alex.moreno@icloud.com');
      showNotification('Conectado con Apple ID exitosamente');
    }
    setStep(2);
  };

  const calculateAge = (year: number) => {
    return CURRENT_YEAR - year;
  };

  const handleSaveAndMatch = () => {
    const computedAge = calculateAge(birthYear);

    updateCurrentUser({
      name: name.trim() || 'Álex Moreno',
      email,
      age: computedAge,
      gender,
      lookingFor,
      relationshipType,
      birthDay,
      birthMonth,
      birthYear,
      nationality,
      country,
      province,
      city,
      neighborhood,
      occupation,
      hobbies: selectedHobbies,
      coffeeStyle,
      foodCuisine,
      activityPick,
      authProvider: authMethod,
      datePreferences: {
        coffeeVibe,
        coffeePayment,
        foodStyle: foodCuisine,
        diningVibe,
        activityVibe: activityPick,
        energyLevel
      }
    });

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 }
    });

    showNotification('¡Cuestionario guardado! El algoritmo ha recalculado la compatibilidad con todas las citas.');
    closeRegistrationModal();
    setActiveTab('descubrir');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-900/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-white dark:bg-[#1c1917] rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-6 flex flex-col max-h-[90vh]"
        >
          {/* Header Banner - Quedamos.net inspired */}
          <div className="bg-gradient-to-r from-purple-700 via-pink-600 to-rose-500 px-6 py-5 text-white relative shrink-0">
            <button
              onClick={closeRegistrationModal}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
              aria-label="Cerrar cuestionario de registro"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-xl text-white shadow-inner">
                Q
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
                    Quedamos<span className="text-amber-300">.net</span>
                  </h2>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/20 text-white font-medium border border-white/20">
                    Cuestionario de Compatibilidad
                  </span>
                </div>
                <p className="text-xs text-purple-100 font-medium">
                  Contactos Amor y Amistad · Encuentra a tu persona compatible para Café, Comer y Actividades
                </p>
              </div>
            </div>

            {/* Stepper Progress Bar */}
            <div className="mt-5 grid grid-cols-4 gap-2">
              {[
                { num: 1, label: 'Cuenta' },
                { num: 2, label: 'Cuestionario' },
                { num: 3, label: 'Cita Ideal' },
                { num: 4, label: 'Matching' }
              ].map(s => {
                const isActive = step === s.num;
                const isPassed = step > s.num;
                return (
                  <button
                    key={s.num}
                    onClick={() => setStep(s.num as any)}
                    className="flex flex-col items-center text-center group"
                  >
                    <div
                      className={`w-full h-1.5 rounded-full transition-all ${
                        isPassed
                          ? 'bg-amber-300'
                          : isActive
                          ? 'bg-white'
                          : 'bg-white/30'
                      }`}
                    />
                    <span
                      className={`text-[11px] mt-1.5 font-semibold transition-colors ${
                        isActive ? 'text-white' : 'text-purple-200'
                      }`}
                    >
                      {s.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Modal Scrollable Content */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-stone-800 dark:text-stone-200">
            {/* STEP 1: AUTHENTICATION */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="text-center max-w-md mx-auto">
                  <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                    Crea tu cuenta o inicia sesión
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                    Únete a más de 12.000 solteros en Madrid y encuentra citas compatibles según tus planes favoritos.
                  </p>
                </div>

                {/* Social Login Buttons */}
                <div className="space-y-3 max-w-md mx-auto">
                  <button
                    type="button"
                    onClick={() => handleSimulateOAuth('google')}
                    className="w-full py-3 px-4 rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-750 text-stone-800 dark:text-white font-semibold text-sm shadow-sm flex items-center justify-center gap-3 transition-all cursor-pointer active:scale-[0.99]"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Continuar con Google</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSimulateOAuth('apple')}
                    className="w-full py-3 px-4 rounded-2xl bg-black hover:bg-stone-900 text-white font-semibold text-sm shadow-sm flex items-center justify-center gap-3 transition-all cursor-pointer active:scale-[0.99]"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 170 170">
                      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.94-14.3-5.74-8.71-10.23-18.7-13.48-29.98-3.25-11.28-4.88-21.73-4.88-31.35 0-14.88 3.73-27.12 11.19-36.71 7.46-9.6 16.73-14.46 27.81-14.59 4.36 0 9.29 1.15 14.8 3.45 5.51 2.3 9.4 3.51 11.66 3.63 2.05-.12 6.04-1.37 11.96-3.75 5.92-2.38 10.8-3.45 14.64-3.21 11.4 1.01 20.35 5.56 26.85 13.66-9.87 5.97-14.72 14.28-14.55 24.94.18 8.16 3.38 15.22 9.61 21.18 6.23 5.96 13.72 9.27 22.47 9.94-2.14 6.72-4.84 13.61-8.1 20.67zM119.22 33.15c0-6.72 2.45-13.14 7.36-18.27 4.91-5.13 10.87-8.23 17.88-9.3-1.03 6.94-3.8 13.3-8.31 18.08-4.51 4.78-10.82 7.94-16.93 9.49z" />
                    </svg>
                    <span>Continuar con Apple</span>
                  </button>
                </div>

                <div className="flex items-center gap-3 max-w-md mx-auto my-4">
                  <div className="flex-1 h-px bg-stone-200 dark:bg-stone-800" />
                  <span className="text-xs text-stone-400 uppercase tracking-wider font-medium">o con tu email</span>
                  <div className="flex-1 h-px bg-stone-200 dark:bg-stone-800" />
                </div>

                {/* Email Registration Form */}
                <div className="space-y-3.5 max-w-md mx-auto">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Tu Nombre o Apodo
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Ej. Álex Moreno"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Correo Electrónico
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="tu@email.com"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Contraseña
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                      <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Mínimo 8 caracteres"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMethod('email');
                        setStep(2);
                      }}
                      className="w-full py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Continuar al Cuestionario</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-[11px] text-center text-stone-400 flex items-center justify-center gap-1.5 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    Tus datos son 100% privados y protegidos según normativa RGPD.
                  </p>
                </div>
              </motion.div>
            )}

            {/* STEP 2: CUESTIONARIO QUEDAMOS.NET (REPRODUCCIÓN FIEL DE LA IMAGEN) */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="border-b border-stone-100 dark:border-stone-800 pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
                      <Layers className="w-5 h-5 text-rose-500" /> Cuestionario de Compatibilidad
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                      Campos requeridos de Quedamos.net para afinar el algoritmo de búsqueda.
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 px-2.5 py-1 rounded-full border border-rose-200 dark:border-rose-900">
                    Paso 2 de 4
                  </span>
                </div>

                <div className="space-y-5 text-sm">
                  {/* Soy / Género */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:items-center">
                    <div>
                      <span className="font-bold text-stone-900 dark:text-white block">Soy:</span>
                      <span className="text-[11px] text-rose-500 italic block">*Requerido</span>
                    </div>
                    <div className="sm:col-span-2 flex items-center gap-4">
                      {[
                        { id: 'hombre', label: 'Hombre' },
                        { id: 'mujer', label: 'Mujer' },
                        { id: 'no_binario', label: 'No binario' }
                      ].map(g => (
                        <label
                          key={g.id}
                          className="flex items-center gap-2 cursor-pointer font-medium text-stone-700 dark:text-stone-300"
                        >
                          <input
                            type="radio"
                            name="gender"
                            checked={gender === g.id}
                            onChange={() => setGender(g.id as any)}
                            className="w-4 h-4 text-rose-600 focus:ring-rose-500"
                          />
                          <span>{g.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Busco: Hombre / Mujer / Indiferente (VERBATIM FROM SCREENSHOT) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:items-center pt-2 border-t border-stone-100 dark:border-stone-800">
                    <div>
                      <span className="font-bold text-stone-900 dark:text-white block">Busco:</span>
                      <span className="text-[11px] text-rose-500 italic block">*Requerido</span>
                    </div>
                    <div className="sm:col-span-2 flex items-center gap-4">
                      {[
                        { id: 'hombre', label: 'Hombre' },
                        { id: 'mujer', label: 'Mujer' },
                        { id: 'indiferente', label: 'Indiferente' }
                      ].map(b => (
                        <label
                          key={b.id}
                          className="flex items-center gap-2 cursor-pointer font-medium text-blue-600 dark:text-blue-400 italic"
                        >
                          <input
                            type="radio"
                            name="lookingFor"
                            checked={lookingFor === b.id}
                            onChange={() => setLookingFor(b.id as any)}
                            className="w-4 h-4 text-rose-600 focus:ring-rose-500"
                          />
                          <span>{b.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Tipo de relación: Dropdown (VERBATIM FROM SCREENSHOT) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:items-center pt-2 border-t border-stone-100 dark:border-stone-800">
                    <div>
                      <span className="font-bold text-stone-900 dark:text-white block">Tipo de relación:</span>
                      <span className="text-[11px] text-rose-500 italic block">*Requerido</span>
                    </div>
                    <div className="sm:col-span-2">
                      <select
                        value={relationshipType}
                        onChange={e => setRelationshipType(e.target.value as RelationshipType)}
                        className="w-full py-2.5 px-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-white font-medium focus:ring-2 focus:ring-rose-500"
                      >
                        <option value="pareja_estable">Pareja estable y seria</option>
                        <option value="citas_ver_que_surge">Citas relajadas y ver qué surge</option>
                        <option value="amistad_planes">Amistad y hacer planes divertidos</option>
                        <option value="relacion_abierta">Relación abierta / no monógama</option>
                      </select>
                    </div>
                  </div>

                  {/* Fecha de nacimiento: Día, Mes, Año (VERBATIM FROM SCREENSHOT) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:items-center pt-2 border-t border-stone-100 dark:border-stone-800">
                    <div>
                      <span className="font-bold text-stone-900 dark:text-white block">Fecha de nacimiento:</span>
                      <span className="text-[11px] text-rose-500 italic block">*Requerido</span>
                    </div>
                    <div className="sm:col-span-2 grid grid-cols-3 gap-2">
                      <select
                        value={birthDay}
                        onChange={e => setBirthDay(Number(e.target.value))}
                        className="py-2.5 px-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-white font-medium"
                      >
                        {DAYS.map(d => (
                          <option key={d} value={d}>
                            Día {d}
                          </option>
                        ))}
                      </select>

                      <select
                        value={birthMonth}
                        onChange={e => setBirthMonth(Number(e.target.value))}
                        className="py-2.5 px-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-white font-medium"
                      >
                        {MONTHS.map(m => (
                          <option key={m.value} value={m.value}>
                            {m.label}
                          </option>
                        ))}
                      </select>

                      <select
                        value={birthYear}
                        onChange={e => setBirthYear(Number(e.target.value))}
                        className="py-2.5 px-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-white font-medium"
                      >
                        {YEARS.map(y => (
                          <option key={y} value={y}>
                            {y} ({calculateAge(y)} años)
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Nacionalidad & País (VERBATIM FROM SCREENSHOT) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:items-center pt-2 border-t border-stone-100 dark:border-stone-800">
                    <div>
                      <span className="font-bold text-stone-900 dark:text-white block">Nacionalidad:</span>
                      <span className="text-[11px] text-rose-500 italic block">*Requerido</span>
                    </div>
                    <div className="sm:col-span-2">
                      <select
                        value={nationality}
                        onChange={e => setNationality(e.target.value)}
                        className="w-full py-2.5 px-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-white font-medium"
                      >
                        <option value="Española">Española</option>
                        <option value="Mexicana">Mexicana</option>
                        <option value="Colombiana">Colombiana</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Italiana">Italiana</option>
                        <option value="Francesa">Francesa</option>
                        <option value="Alemana">Alemana</option>
                        <option value="Otra">Otra nacionalidad</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:items-center pt-2 border-t border-stone-100 dark:border-stone-800">
                    <div>
                      <span className="font-bold text-stone-900 dark:text-white block">País:</span>
                      <span className="text-[11px] text-rose-500 italic block">*Requerido</span>
                    </div>
                    <div className="sm:col-span-2">
                      <select
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        className="w-full py-2.5 px-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-white font-medium"
                      >
                        <option value="España">España</option>
                        <option value="Andorra">Andorra</option>
                        <option value="Portugal">Portugal</option>
                      </select>
                    </div>
                  </div>

                  {/* Provincia & Ciudad (VERBATIM FROM SCREENSHOT) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:items-center pt-2 border-t border-stone-100 dark:border-stone-800">
                    <div>
                      <span className="font-bold text-stone-900 dark:text-white block">Provincia:</span>
                      <span className="text-[11px] text-rose-500 italic block">*Requerido</span>
                    </div>
                    <div className="sm:col-span-2">
                      <select
                        value={province}
                        onChange={e => setProvince(e.target.value)}
                        className="w-full py-2.5 px-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-white font-medium"
                      >
                        {SPANISH_PROVINCES.map(p => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:items-center pt-2 border-t border-stone-100 dark:border-stone-800">
                    <div>
                      <span className="font-bold text-stone-900 dark:text-white block">Ciudad / Barrio:</span>
                      <span className="text-[11px] text-rose-500 italic block">*Requerido</span>
                    </div>
                    <div className="sm:col-span-2 grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        placeholder="Ciudad (Ej. Madrid)"
                        className="py-2.5 px-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-white font-medium"
                      />
                      <input
                        type="text"
                        value={neighborhood}
                        onChange={e => setNeighborhood(e.target.value)}
                        placeholder="Barrio (Ej. Malasaña, La Latina)"
                        className="py-2.5 px-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-white font-medium"
                      />
                    </div>
                  </div>

                  {/* Profesión: Dropdown (VERBATIM FROM SCREENSHOT) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:items-center pt-2 border-t border-stone-100 dark:border-stone-800">
                    <div>
                      <span className="font-bold text-stone-900 dark:text-white block">Profesión:</span>
                      <span className="text-[11px] text-rose-500 italic block">*Requerido</span>
                    </div>
                    <div className="sm:col-span-2">
                      <select
                        value={occupation}
                        onChange={e => setOccupation(e.target.value)}
                        className="w-full py-2.5 px-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-white font-medium"
                      >
                        {PROFESSIONS.map(pr => (
                          <option key={pr} value={pr}>
                            {pr}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Aficiones: Checkbox grid (VERBATIM FROM SCREENSHOT) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-stone-100 dark:border-stone-800">
                    <div>
                      <span className="font-bold text-stone-900 dark:text-white block">Aficiones:</span>
                      <span className="text-[11px] text-rose-500 italic block">*Requerido</span>
                      <span className="text-[11px] text-stone-400 block mt-1">
                        Elige las que más definan tu estilo de vida
                      </span>
                    </div>
                    <div className="sm:col-span-2 grid grid-cols-2 gap-2.5">
                      {QUESTIONNAIRE_HOBBIES.map(hobby => {
                        const isChecked = selectedHobbies.includes(hobby);
                        return (
                          <label
                            key={hobby}
                            className={`flex items-center gap-2 p-2 rounded-xl border cursor-pointer transition-all ${
                              isChecked
                                ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                                : 'bg-stone-50 dark:bg-stone-900/60 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-stone-300'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleHobby(hobby)}
                              className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
                            />
                            <span className="text-xs font-semibold italic">{hobby}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-stone-200 dark:border-stone-800">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-sm font-semibold hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> Anterior
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold shadow-md transition-all flex items-center gap-2"
                  >
                    <span>Siguiente: Tu Cita Ideal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: CAMPOS RELEVANTES PARA LA CITA PERFECTA (CAFÉ, COMER, ACTIVIDAD) */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="border-b border-stone-100 dark:border-stone-800 pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-500" /> Preferencias para la Cita Perfecta
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                      Quedamos.net conecta a personas no solo por afinidad, sino por cómo disfrutan de un Café, la Comida y las Actividades.
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 px-2.5 py-1 rounded-full border border-rose-200 dark:border-rose-900">
                    Paso 3 de 4
                  </span>
                </div>

                <div className="space-y-5">
                  {/* 1. EL CAFÉ PERFECTO */}
                  <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 space-y-3">
                    <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-bold text-sm">
                      <Coffee className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <span>1. Tu Cita de Café Ideal</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                          ¿Qué café sueles pedir?
                        </label>
                        <input
                          type="text"
                          value={coffeeStyle}
                          onChange={e => setCoffeeStyle(e.target.value)}
                          placeholder="Ej. Flat white con leche de avena, capuchino..."
                          className="w-full py-2 px-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white font-medium"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                          ¿Quién suele invitar en la primera cita?
                        </label>
                        <select
                          value={coffeePayment}
                          onChange={e => setCoffeePayment(e.target.value as any)}
                          className="w-full py-2 px-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white font-medium"
                        >
                          <option value="A medias">A medias (50/50)</option>
                          <option value="Invito yo">Invito yo sin problema</option>
                          <option value="Invita quien propone">Invita quien propone el plan</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                          Vibra de la cafetería
                        </label>
                        <input
                          type="text"
                          value={coffeeVibe}
                          onChange={e => setCoffeeVibe(e.target.value)}
                          placeholder="Ej. Terraza al sol en plaza tranquila, cafetería nórdica con libros..."
                          className="w-full py-2 px-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 2. LA COMIDA / CENA PERFECTA */}
                  <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/40 space-y-3">
                    <div className="flex items-center gap-2 text-rose-900 dark:text-rose-300 font-bold text-sm">
                      <UtensilsCrossed className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                      <span>2. Tu Plan Gastronómico Favorito</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                          Estilo de comida que te vuelve loco/a
                        </label>
                        <input
                          type="text"
                          value={foodCuisine}
                          onChange={e => setFoodCuisine(e.target.value)}
                          placeholder="Ej. Tapas y vino, ramen japonés, cocina de mercado..."
                          className="w-full py-2 px-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white font-medium"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                          Dinámica en la mesa
                        </label>
                        <select
                          value={diningVibe}
                          onChange={e => setDiningVibe(e.target.value)}
                          className="w-full py-2 px-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white font-medium"
                        >
                          <option value="Compartir raciones al centro">Compartir raciones al centro (probar de todo)</option>
                          <option value="Cena íntima con luz tenue">Cena íntima con luz tenue y velas</option>
                          <option value="Barra castiza animada y vermut">Barra castiza animada y vermut</option>
                          <option value="Picnic al aire libre">Picnic al atardecer en el parque</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* 3. LA ACTIVIDAD */}
                  <div className="p-4 rounded-2xl bg-teal-50/70 dark:bg-teal-950/20 border border-teal-200/80 dark:border-teal-900/40 space-y-3">
                    <div className="flex items-center gap-2 text-teal-900 dark:text-teal-300 font-bold text-sm">
                      <Compass className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                      <span>3. Actividad para Romper el Hielo</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                          Nivel de energía deseado
                        </label>
                        <div className="grid grid-cols-3 gap-1.5">
                          {[
                            { id: 'tranquilo', label: 'Tranquilo' },
                            { id: 'dinamico', label: 'Dinámico' },
                            { id: 'aventurero', label: 'Aventurero' }
                          ].map(e => (
                            <button
                              key={e.id}
                              type="button"
                              onClick={() => setEnergyLevel(e.id as any)}
                              className={`py-2 px-1 rounded-xl text-center font-bold border transition-all ${
                                energyLevel === e.id
                                  ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                                  : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                              }`}
                            >
                              {e.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                          Plan de actividad que te gustaría hacer
                        </label>
                        <input
                          type="text"
                          value={activityPick}
                          onChange={e => setActivityPick(e.target.value)}
                          placeholder="Ej. Taller de cerámica, rocódromo, ruta de vinilos..."
                          className="w-full py-2 px-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white font-medium"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-stone-200 dark:border-stone-800">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-sm font-semibold hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> Anterior
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold shadow-md transition-all flex items-center gap-2"
                  >
                    <span>Ver Resultado de Compatibilidad</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: FINALIZACIÓN & ALGORITMO ACTIVADO */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 text-center py-4"
              >
                <div className="w-20 h-20 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center border-4 border-rose-200 dark:border-rose-800 shadow-xl">
                  <Heart className="w-10 h-10 fill-rose-500 text-rose-500 animate-pulse" />
                </div>

                <div>
                  <h3 className="text-2xl font-black text-stone-900 dark:text-white">
                    ¡Cuestionario completado con éxito!
                  </h3>
                  <p className="text-sm text-stone-600 dark:text-stone-400 max-w-md mx-auto mt-1">
                    Nuestro algoritmo de emparejamiento ha procesado tus preferencias de relación, aficiones y planes favoritos de café, comida y actividades.
                  </p>
                </div>

                {/* Summary Card */}
                <div className="max-w-md mx-auto bg-stone-50 dark:bg-stone-900 rounded-2xl p-4 border border-stone-200 dark:border-stone-800 text-left space-y-2.5 text-xs">
                  <div className="flex justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
                    <span className="text-stone-500">Buscando:</span>
                    <span className="font-bold capitalize text-stone-900 dark:text-white">
                      {lookingFor} ({relationshipType.replace(/_/g, ' ')})
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
                    <span className="text-stone-500">Ubicación:</span>
                    <span className="font-bold text-stone-900 dark:text-white">
                      {neighborhood}, {city} ({province})
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
                    <span className="text-stone-500">Aficiones seleccionadas:</span>
                    <span className="font-bold text-stone-900 dark:text-white truncate max-w-[200px]">
                      {selectedHobbies.slice(0, 3).join(', ')} +{Math.max(0, selectedHobbies.length - 3)} más
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-stone-500">Estilo de Cita:</span>
                    <span className="font-bold text-stone-900 dark:text-white">
                      Café ({coffeeStyle.slice(0, 16)}...) · {energyLevel}
                    </span>
                  </div>
                </div>

                <div className="pt-2 max-w-md mx-auto space-y-3">
                  <button
                    type="button"
                    onClick={handleSaveAndMatch}
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-700 hover:to-amber-600 text-white font-extrabold text-base shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 transform active:scale-[0.98]"
                  >
                    <Sparkles className="w-5 h-5 text-amber-200" />
                    <span>¡Guardar y Ver Perfiles Compatibles!</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 font-semibold underline"
                  >
                    Revisar o cambiar respuestas
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
