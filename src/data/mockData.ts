import { UserProfile, DatePlanProposal, Conversation } from '../types';

export const CURRENT_USER: UserProfile = {
  id: 'me',
  name: 'Álex Moreno',
  age: 28,
  gender: 'hombre',
  lookingFor: 'mujer',
  relationshipType: 'citas_ver_que_surge',
  birthDay: 14,
  birthMonth: 6,
  birthYear: 1998,
  nationality: 'Española',
  country: 'España',
  province: 'Madrid',
  city: 'Madrid',
  neighborhood: 'La Latina',
  occupation: 'Diseñador Visual & Creativo',
  bio: 'Creo que una buena charla con café de especialidad o unas cañas con bravas dice más que tres semanas chateando. ¡Quedemos!',
  avatar: '/src/assets/images/avatar_mateo_1794149698903.jpg',
  photos: [
    '/src/assets/images/avatar_mateo_1794149698903.jpg',
    '/src/assets/images/date_coffee_1794149700019.jpg'
  ],
  distanceKm: 0,
  matchPercentage: 100,
  coffeeStyle: 'Flat White con bebida de avena',
  foodCuisine: 'Tapas creativas y ramen artesanal',
  activityPick: 'Ruta en bici por la sierra o taller creativo',
  hobbies: ['Hacer Deporte', 'Viajar', 'La Naturaleza', 'El Cine', 'Cocinar', 'La Tecnología'],
  datePreferences: {
    coffeeVibe: 'Terraza al sol sin prisas',
    coffeePayment: 'A medias',
    foodStyle: 'Tapas de autor y raciones para compartir',
    diningVibe: 'Compartir raciones al centro',
    activityVibe: 'Creativa o al aire libre',
    energyLevel: 'dinamico'
  },
  plans: {
    cafe: {
      title: 'Café & croissant artesano',
      spot: 'Toma Café (Malasaña)',
      preference: 'Flat white caliente sin prisa',
      note: 'Me encanta sentarme en la mesa alta a ver pasar gente y charlar de música.'
    },
    comer: {
      title: 'Tapas de autor y buen vino',
      spot: 'Taberna Laredo o Sala de Despiece',
      preference: 'Maridaje con vino tinto y platos para compartir',
      note: 'Compartir raciones es la prueba de fuego de una cita.'
    },
    actividad: {
      title: 'Exposición y paseo fotográfico',
      spot: 'Matadero Madrid / Río',
      preference: 'Paseo al atardecer y charlar',
      note: 'Ideal para romper el hielo de forma cero forzada.'
    }
  },
  interests: ['Café de especialidad', 'Gastronomía', 'Fotografía', 'Cine indie', 'Escalada'],
  vibeKeywords: ['Espontáneo', 'Buena conversación', 'Foodie curioso'],
  authProvider: 'google',
  email: 'alex.moreno@gmail.com'
};

export const MOCK_PROFILES: UserProfile[] = [
  {
    id: 'user_lucia',
    name: 'Lucía Romero',
    age: 27,
    gender: 'mujer',
    lookingFor: 'hombre',
    relationshipType: 'pareja_estable',
    birthDay: 18,
    birthMonth: 4,
    birthYear: 1999,
    nationality: 'Española',
    country: 'España',
    province: 'Madrid',
    city: 'Madrid',
    neighborhood: 'Malasaña',
    occupation: 'Arquitecta de Interiores',
    bio: 'Fanática del buen café por la mañana y de descubrir pequeños restaurantes escondidos por la noche. Si propones un plan que implique probar algo nuevo o hacer cerámica, ya tienes mi atención.',
    avatar: '/src/assets/images/avatar_lucia_1794149698456.jpg',
    photos: [
      '/src/assets/images/avatar_lucia_1794149698456.jpg',
      '/src/assets/images/date_coffee_1794149700019.jpg',
      '/src/assets/images/date_activity_1794149699279.jpg'
    ],
    distanceKm: 2.4,
    matchPercentage: 96,
    coffeeStyle: 'Capuchino artesanal con canela suave',
    foodCuisine: 'Tapas tradicionales reinterpretadas & comida mediterránea',
    activityPick: 'Taller de alfarería / cerámica o librerías de viejo',
    hobbies: ['Hacer Deporte', 'Viajar', 'El Cine', 'El Teatro', 'La Lectura', 'Cocinar', 'Música en vivo'],
    datePreferences: {
      coffeeVibe: 'Cafetería de especialidad con luz natural',
      coffeePayment: 'A medias',
      foodStyle: 'Tapas mediterráneas para compartir',
      diningVibe: 'Platos al centro en taberna acogedora',
      activityVibe: 'Creativa y con algo manual para llevarse',
      energyLevel: 'dinamico'
    },
    plans: {
      cafe: {
        title: 'Café de especialidad + charla distendida',
        spot: 'Café Federal o Misión Café',
        preference: 'Capuchino templado con bollería de masa madre',
        note: 'Las mejores conversaciones empiezan con el aroma a café recién molido.'
      },
      comer: {
        title: 'Cena de tapas y vinos en taberna con encanto',
        spot: 'La Gabinoteca o Mercado de San Ildefonso',
        preference: 'Pedir 4 platos variados para picotear entre dos',
        note: 'Si te gustan las croquetas crujientes y los vinos ligeros, nos vamos a llevar bien.'
      },
      actividad: {
        title: 'Tarde de torno cerámico & risas',
        spot: 'Atelier Lumbre Cerámica (Conde Duque)',
        preference: 'Ensuciarse las manos y llevarse una taza hecha a mano',
        note: 'Cero presión, mucha risa y algo tangible que recordar.'
      }
    },
    interests: ['Café de autor', 'Cerámica', 'Diseño', 'Rutas botánicas', 'Vinilos'],
    vibeKeywords: ['Cálida', 'Creativa', 'Conversadora']
  },
  {
    id: 'user_mateo',
    name: 'Mateo Sánchez',
    age: 29,
    gender: 'hombre',
    lookingFor: 'mujer',
    relationshipType: 'citas_ver_que_surge',
    birthDay: 22,
    birthMonth: 9,
    birthYear: 1997,
    nationality: 'Española',
    country: 'España',
    province: 'Madrid',
    city: 'Madrid',
    neighborhood: 'Chamberí',
    occupation: 'Diseñador de Iluminación Urbana',
    bio: 'Menos pantallas y más planes en la calle. Un café en una terraza soleada, una buena tortilla de patata poco cuajada y un partido de bouldering o pádel son mi definición de un gran día.',
    avatar: '/src/assets/images/avatar_mateo_1794149698903.jpg',
    photos: [
      '/src/assets/images/avatar_mateo_1794149698903.jpg',
      '/src/assets/images/date_food_1794149700596.jpg'
    ],
    distanceKm: 3.8,
    matchPercentage: 92,
    coffeeStyle: 'Doble espresso o cortado intenso',
    foodCuisine: 'Guisos tradicionales, tortilla de patata y arroces',
    activityPick: 'Rocódromo / escalada en bloque o ruta en bici',
    hobbies: ['Hacer Deporte', 'La Naturaleza', 'Los Animales', 'La Tecnología', 'Viajar'],
    datePreferences: {
      coffeeVibe: 'Terraza soleada con buen café solo',
      coffeePayment: 'Invito yo',
      foodStyle: 'Tapas castizas y tortilla melosa',
      diningVibe: 'Barra animada y tapeo informal',
      activityVibe: 'Deportiva y al aire libre',
      energyLevel: 'dinamico'
    },
    plans: {
      cafe: {
        title: 'Cortado al sol en terraza tranquila',
        spot: 'Plaza de Olavide',
        preference: 'Café intenso y sol de media tarde',
        note: 'Mirar el movimiento de la plaza mientras nos conocemos sin postureos.'
      },
      comer: {
        title: 'Ruta gastronómica de croquetas y tortilla',
        spot: 'Taberna Sylkar & La Ardosa',
        preference: 'Barra castiza, vermut de grifo y tortilla melosa',
        note: 'Plan infalible para romper cualquier hielo en los primeros diez minutos.'
      },
      actividad: {
        title: 'Sesión de escalada fácil y unas cañas después',
        spot: 'Sputnik Climbing o Sharma Climbing',
        preference: 'Rutas aptas para cualquier nivel y risas garantizadas',
        note: 'Desafío divertido y luego celebramos con unas cervezas frías.'
      }
    },
    interests: ['Escalada', 'Fotografía urbana', 'Gastronomía local', 'Jazz en directo'],
    vibeKeywords: ['Aventurero', 'Auténtico', 'Enérgico']
  },
  {
    id: 'user_elena',
    name: 'Elena Vega',
    age: 26,
    gender: 'mujer',
    lookingFor: 'hombre',
    relationshipType: 'pareja_estable',
    birthDay: 5,
    birthMonth: 11,
    birthYear: 2000,
    nationality: 'Española',
    country: 'España',
    province: 'Madrid',
    city: 'Madrid',
    neighborhood: 'Barrio de las Letras',
    occupation: 'Editora de Libros & Redactora',
    bio: 'Apasionada de los libros con olor a papel antiguo, los cafés acogedores con luz suave y la comida asiática reconfortante. Me gusta la gente que sabe escuchar y que se entusiasma con pequeñas cosas.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    photos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      '/src/assets/images/date_food_1794149700596.jpg'
    ],
    distanceKm: 1.7,
    matchPercentage: 89,
    coffeeStyle: 'Matcha Latte o filtro V60 aromático',
    foodCuisine: 'Ramen japonés artesanal y dumplings al vapor',
    activityPick: 'Búsqueda de vinilos vintage o tarde en galería de arte',
    hobbies: ['La Lectura', 'El Cine', 'El Teatro', 'Viajar', 'Cocinar', 'Música en vivo'],
    datePreferences: {
      coffeeVibe: 'Café íntimo con estanterías de libros y música suave',
      coffeePayment: 'A medias',
      foodStyle: 'Ramen reconfortante o cocina japonesa',
      diningVibe: 'Mesa pequeña y velita para hablar con calma',
      activityVibe: 'Cultural e intelectual',
      energyLevel: 'tranquilo'
    },
    plans: {
      cafe: {
        title: 'Café filtro y tertulia literaria',
        spot: 'La Bicicleta Café o El Imparcial',
        preference: 'Café de filtro suave con tarta de zanahoria',
        note: 'Hablamos de nuestras pelis y canciones favoritas sin prisas.'
      },
      comer: {
        title: 'Ramen caliente y gyozas crujientes',
        spot: 'Chuka Ramen Bar',
        preference: 'Caldo denso paitan, fideos al punto y gyozas caseras',
        note: 'La comida reconfortante perfecta para una cita íntima y deliciosa.'
      },
      actividad: {
        title: 'Ruta de librerías independientes y anticuarios',
        spot: 'Cuesta de Moyano & Huertas',
        preference: 'Recomendarse mutuamente un libro especial',
        note: 'Conocerás a una persona por los pasajes que subraya.'
      }
    },
    interests: ['Literatura', 'Cine clásico', 'Ramen', 'Galerías', 'Música indie'],
    vibeKeywords: ['Curiosa', 'Sensible', 'Conversación profunda']
  },
  {
    id: 'user_carlos',
    name: 'Carlos Navarro',
    age: 30,
    gender: 'hombre',
    lookingFor: 'mujer',
    relationshipType: 'citas_ver_que_surge',
    birthDay: 30,
    birthMonth: 1,
    birthYear: 1996,
    nationality: 'Española',
    country: 'España',
    province: 'Madrid',
    city: 'Madrid',
    neighborhood: 'Retiro',
    occupation: 'Chef Repostero & Sommelier',
    bio: 'Trabajo con sabores y texturas todos los días, así que mis planes siempre tienen algo sabroso entre manos. Me encantan las mañanas activas corriendo por el Retiro y las tardes de terraceo relajado.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      '/src/assets/images/date_activity_1794149699279.jpg'
    ],
    distanceKm: 4.1,
    matchPercentage: 88,
    coffeeStyle: 'Cold Brew infusionado o espresso etíope',
    foodCuisine: 'Cocina mediterránea de mercado & postres artesanos',
    activityPick: 'Cata de vinos o paseo botánico por el parque',
    hobbies: ['Cocinar', 'Hacer Deporte', 'La Naturaleza', 'Viajar', 'Los Animales'],
    datePreferences: {
      coffeeVibe: 'Degustación de café de origen con dulce casero',
      coffeePayment: 'Invito yo',
      foodStyle: 'Cocina mediterránea y maridaje de vino',
      diningVibe: 'Restaurante con producto de temporada',
      activityVibe: 'Cata gastronómica interactiva',
      energyLevel: 'dinamico'
    },
    plans: {
      cafe: {
        title: 'Degustación de café & tarta casera',
        spot: 'Acid Bakehouse',
        preference: 'Filtro frío y hojaldre recién horneado',
        note: 'Prometo llevar algo dulce hecho por mí como detalle.'
      },
      comer: {
        title: 'Arroz meloso y pescado fresco',
        spot: 'Taberna Verdejo',
        preference: 'Cocina de mercado con ingredientes de temporada',
        note: 'Comer rico es de los mayores placeres de la vida.'
      },
      actividad: {
        title: 'Cata a ciegas de quesos artesanos & vinos',
        spot: 'Poncelet Cheese Bar',
        preference: 'Probar 5 maridajes diferentes y puntuar juntos',
        note: 'Divertidísimo para ver si coincidimos en gustos.'
      }
    },
    interests: ['Gastronomía', 'Vinos', 'Repostería', 'Senderismo', 'Pádel'],
    vibeKeywords: ['Generoso', 'Detallista', 'Vital']
  },
  {
    id: 'user_sofia',
    name: 'Sofía Morales',
    age: 28,
    gender: 'mujer',
    lookingFor: 'indiferente',
    relationshipType: 'amistad_planes',
    birthDay: 12,
    birthMonth: 7,
    birthYear: 1998,
    nationality: 'Española',
    country: 'España',
    province: 'Madrid',
    city: 'Madrid',
    neighborhood: 'Lavapiés',
    occupation: 'Ilustradora & Muralista',
    bio: 'Me muevo por colores, buen humor y ganas de compartir buenos momentos. Si sabes dónde sirven el mejor chai de la ciudad o te atreves a una clase de baile o kayak, seremos grandes compis de aventuras.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
    photos: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80'
    ],
    distanceKm: 2.1,
    matchPercentage: 94,
    coffeeStyle: 'Chai Latte especiado con leche de almendra',
    foodCuisine: 'Cocina fusión mexicana-mediterránea & ceviches',
    activityPick: 'Taller de pintura acuarela o concierto en acústico',
    hobbies: ['Viajar', 'El Cine', 'El Teatro', 'La Naturaleza', 'Música en vivo', 'Cocinar'],
    datePreferences: {
      coffeeVibe: 'Rincón bohemio con música acústica de fondo',
      coffeePayment: 'A medias',
      foodStyle: 'Tacos callejeros gourmet y ceviche fresco',
      diningVibe: 'Picoteo desenfadado con bebidas de autor',
      activityVibe: 'Artística y participativa',
      energyLevel: 'dinamico'
    },
    plans: {
      cafe: {
        title: 'Chai latte con vistas a los tejados',
        spot: 'Café de la Luz',
        preference: 'Butacas vintage y té aromático',
        note: 'Un rincón íntimo donde el tiempo parece detenerse.'
      },
      comer: {
        title: 'Tacos gourmet & margaritas de fruta de la pasión',
        spot: 'Taquería La Lupita',
        preference: 'Tacos al pastor, guacamole recién hecho y buena música',
        note: 'Color, sabor y cero momentos incómodos.'
      },
      actividad: {
        title: 'Música en vivo en club de jazz íntimo',
        spot: 'Café Central o Clamores',
        preference: 'Tomar una copa mientras escuchamos jazz en directo',
        note: 'La música en vivo crea una vibra magnética al instante.'
      }
    },
    interests: ['Música en vivo', 'Ilustración', 'Viajes mochileros', 'Yoga', 'Plantas'],
    vibeKeywords: ['Alegre', 'Espontánea', 'Apasionada']
  },
  {
    id: 'user_pablo',
    name: 'Pablo Ruiz',
    age: 31,
    gender: 'hombre',
    lookingFor: 'mujer',
    relationshipType: 'pareja_estable',
    birthDay: 3,
    birthMonth: 3,
    birthYear: 1995,
    nationality: 'Española',
    country: 'España',
    province: 'Madrid',
    city: 'Madrid',
    neighborhood: 'Moncloa / Pozuelo',
    occupation: 'Arquitecto de Paisaje & Botánico',
    bio: 'Me apasionan los espacios verdes, las conversaciones honestas y descubrir terrazas con jardín. Si te apetece un buen café al aire libre o una caminata fotográfica, me apunto.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    photos: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      '/src/assets/images/date_coffee_1794149700019.jpg'
    ],
    distanceKm: 8.5,
    matchPercentage: 91,
    coffeeStyle: 'Aeropress aromático de origen único',
    foodCuisine: 'Cocina de huerto ecológica & tapas vegetarianas ricas',
    activityPick: 'Ruta botánica por El Capricho o Casa de Campo en gravel',
    hobbies: ['La Naturaleza', 'Hacer Deporte', 'La Lectura', 'Viajar', 'Los Animales', 'La Tecnología'],
    datePreferences: {
      coffeeVibe: 'Café al aire libre rodeado de vegetación',
      coffeePayment: 'Invita quien propone',
      foodStyle: 'Platos frescos de temporada y zumos naturales',
      diningVibe: 'Terraza de huerto urbano o picnic verde',
      activityVibe: 'Al aire libre y contemplativa',
      energyLevel: 'tranquilo'
    },
    plans: {
      cafe: {
        title: 'Café en terraza ajardinada',
        spot: 'Terraza Casa de Campo o Real Jardín Botánico',
        preference: 'Café solo filtrado con vistas a los árboles',
        note: 'Desconectar del asfalto y hablar con tranquilidad.'
      },
      comer: {
        title: 'Brunch campestre con productos locales',
        spot: 'La Huerta de Almería o Honest Greens',
        preference: 'Platos frescos de temporada y zumos naturales',
        note: 'Comida rica y digestiva para recargar pilas.'
      },
      actividad: {
        title: 'Paseo en bicicleta y picnic al atardecer',
        spot: 'Parque del Oeste & Templo de Debod',
        preference: 'Mirar el atardecer con algo de picoteo',
        note: 'El atardecer más bonito de Madrid con la mejor compañía.'
      }
    },
    interests: ['Botánica', 'Gravel bike', 'Café filtrado', 'Fotografía natural'],
    vibeKeywords: ['Tranquilo', 'Consciente', 'Amable']
  },
  {
    id: 'user_valeria',
    name: 'Valeria Torres',
    age: 27,
    gender: 'mujer',
    lookingFor: 'hombre',
    relationshipType: 'citas_ver_que_surge',
    birthDay: 19,
    birthMonth: 8,
    birthYear: 1999,
    nationality: 'Española',
    country: 'España',
    province: 'Madrid',
    city: 'Madrid',
    neighborhood: 'Alcobendas / Norte',
    occupation: 'Directora de Arte & Creadora Sonora',
    bio: 'Vivo entre tipografías, sintetizadores analógicos y rutas gastronómicas curiosas. Busco gente con inquietudes artísticas o que le apetezca salir a cenar algo rico sin prisa.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    photos: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
      '/src/assets/images/date_food_1794149700596.jpg'
    ],
    distanceKm: 13.5,
    matchPercentage: 87,
    coffeeStyle: 'Flat White doble con leche de avena barista',
    foodCuisine: 'Comida callejera coreana y tacos al carbón',
    activityPick: 'Sesión de escucha de vinilos o exposición inmersiva',
    hobbies: ['El Cine', 'El Teatro', 'La Tecnología', 'Viajar', 'Música en vivo', 'Cocinar'],
    datePreferences: {
      coffeeVibe: 'Diseño minimalista nórdico con café cremoso',
      coffeePayment: 'A medias',
      foodStyle: 'Barbacoa coreana interactiva o ramen',
      diningVibe: 'Cocinar en la propia mesa con música alternativa',
      activityVibe: 'Inmersiva, musical o expositiva',
      energyLevel: 'dinamico'
    },
    plans: {
      cafe: {
        title: 'Café de autor y charla sobre diseño',
        spot: 'Ruda Café o Hanso Cafe',
        preference: 'Café cremoso en taza de cerámica',
        note: 'Podemos intercambiar recomendaciones musicales y de cine.'
      },
      comer: {
        title: 'Barbacoa coreana interactiva',
        spot: 'Restaurante Seoul en Noviciado',
        preference: 'Cocinar en la parrilla de la mesa y brindar con soju',
        note: 'Super divertido para romper el hielo y reírse un buen rato.'
      },
      actividad: {
        title: 'Tarde de vinilos & sintetizadores',
        spot: 'Marilians Records & Club Acústico',
        preference: 'Rebuscar joyas de segunda mano en cubetas',
        note: 'La música revela todo sobre la sensibilidad de alguien.'
      }
    },
    interests: ['Música electrónica', 'Diseño sonoro', 'Cine de autor', 'Comida asiática'],
    vibeKeywords: ['Creativa', 'Melómana', 'Original']
  },
  {
    id: 'user_javier',
    name: 'Javier Méndez',
    age: 32,
    gender: 'hombre',
    lookingFor: 'mujer',
    relationshipType: 'pareja_estable',
    birthDay: 8,
    birthMonth: 12,
    birthYear: 1994,
    nationality: 'Española',
    country: 'España',
    province: 'Madrid',
    city: 'Madrid',
    neighborhood: 'Sierra de Guadarrama / Collado',
    occupation: 'Ingeniero de Software & Guía de Montaña',
    bio: 'Trabajo en remoto desde la sierra. Entre semana bajo a la ciudad para exposiciones, conciertos o un buen café de especialidad, y los findes me encontrarás en la roca o en una cumbre.',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    photos: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
      '/src/assets/images/date_activity_1794149699279.jpg'
    ],
    distanceKm: 26.0,
    matchPercentage: 85,
    coffeeStyle: 'Café solo largo en cafetera italiana moka',
    foodCuisine: 'Carnes a la brasa, setas de temporada y quesos curados',
    activityPick: 'Vía ferrata, senderismo a una laguna o escalada clásica',
    hobbies: ['Hacer Deporte', 'La Naturaleza', 'Viajar', 'La Tecnología', 'Cocinar', 'Los Animales'],
    datePreferences: {
      coffeeVibe: 'Café de termo en lo alto de un mirador de montaña',
      coffeePayment: 'Invito yo',
      foodStyle: 'Guisos de montaña, carnes a la brasa y buen pan',
      diningVibe: 'Mesón rústico con chimenea crepitante',
      activityVibe: 'Aventurera al 100% en plena naturaleza',
      energyLevel: 'aventurero'
    },
    plans: {
      cafe: {
        title: 'Café caliente tras una caminata fresca',
        spot: 'Cafetería El Montañero (Cercedilla) o Toma Café (Centro)',
        preference: 'Café cargado con tostada de pan de pueblo y tomate',
        note: 'Sabe el doble de rico después de haber respirado aire puro.'
      },
      comer: {
        title: 'Cena rústica de asador y vino de Madrid',
        spot: 'Asador La Chimenea o Taberna Laredo',
        preference: 'Parrilla de leña, setas de cardo y charla distendida',
        note: 'Comida sincera, sin pretensiones y llena de sabor.'
      },
      actividad: {
        title: 'Ruta fácil a las Pozas de La Pedriza',
        spot: 'Parque Nacional de Guadarrama',
        preference: 'Caminar entre pinares, meter los pies en el agua y picnic',
        note: 'La mejor forma de conocer a alguien en su estado más natural.'
      }
    },
    interests: ['Montañismo', 'Escalada', 'Tecnología', 'Fotografía de paisaje'],
    vibeKeywords: ['Natural', 'Decidido', 'Leal']
  }
];

export const MOCK_PUBLIC_PLANS: DatePlanProposal[] = [
  {
    id: 'plan_1',
    creatorId: 'user_lucia',
    creatorName: 'Lucía Romero',
    creatorAvatar: '/src/assets/images/avatar_lucia_1794149698456.jpg',
    creatorAge: 27,
    creatorCity: 'Madrid',
    creatorOccupation: 'Arquitecta de Interiores',
    category: 'cafe',
    title: 'Café de especialidad & tarta casera en Malasaña',
    description: '¿Alguien se anima a probar el nuevo grano etíope en Misión Café este sábado por la mañana? Busco charla agradable y risas sin postureo.',
    locationName: 'Misión Café',
    locationArea: 'Malasaña, Madrid',
    datetime: 'Sábado, 11:30',
    imageBanner: '/src/assets/images/date_coffee_1794149700019.jpg',
    splitOption: 'A medias',
    interestedCount: 3,
    hasApplied: false,
    tags: ['Especialidad', 'Masa Madre', 'Charla Relajada']
  },
  {
    id: 'plan_2',
    creatorId: 'user_mateo',
    creatorName: 'Mateo Sánchez',
    creatorAvatar: '/src/assets/images/avatar_mateo_1794149698903.jpg',
    creatorAge: 29,
    creatorCity: 'Madrid',
    creatorOccupation: 'Diseñador de Iluminación',
    category: 'comer',
    title: 'Ruta de tapas y cañas por tabernas de Chamberí',
    description: 'Propongo probar la famosa tortilla de Sylkar y unas croquetas crujientes este jueves después de trabajar. Plan castizo de diez.',
    locationName: 'Taberna Sylkar & La Ardosa',
    locationArea: 'Chamberí, Madrid',
    datetime: 'Jueves, 20:30',
    imageBanner: '/src/assets/images/date_food_1794149700596.jpg',
    splitOption: 'Invitación mutua',
    interestedCount: 5,
    hasApplied: false,
    tags: ['Tortilla de patata', 'Cañas', 'Vibra castiza']
  },
  {
    id: 'plan_3',
    creatorId: 'user_lucia',
    creatorName: 'Lucía Romero',
    creatorAvatar: '/src/assets/images/avatar_lucia_1794149698456.jpg',
    creatorAge: 27,
    creatorCity: 'Madrid',
    creatorOccupation: 'Arquitecta de Interiores',
    category: 'actividad',
    title: 'Tarde de torno cerámico para principiantes',
    description: 'Tengo plaza reservada para dos en un atelier de alfarería. Moldeamos unas tazas con las manos y luego nos tomamos un vinito. ¿Te atreves?',
    locationName: 'Atelier Lumbre Cerámica',
    locationArea: 'Conde Duque, Madrid',
    datetime: 'Domingo, 17:00',
    imageBanner: '/src/assets/images/date_activity_1794149699279.jpg',
    splitOption: 'Invito yo',
    interestedCount: 7,
    hasApplied: false,
    tags: ['Creativo', 'Cerámica', 'Risas garantizadas']
  },
  {
    id: 'plan_4',
    creatorId: 'user_elena',
    creatorName: 'Elena Vega',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    creatorAge: 26,
    creatorCity: 'Madrid',
    creatorOccupation: 'Editora de Libros',
    category: 'comer',
    title: 'Noche de ramen reconfortante y gyozas en barra',
    description: 'Chuka Ramen Bar tiene un shoyu ramen increíble. Busco acompañante gourmet para una cena deliciosa y cero pretenciosa.',
    locationName: 'Chuka Ramen Bar',
    locationArea: 'Barrio de las Letras',
    datetime: 'Viernes, 21:00',
    imageBanner: '/src/assets/images/date_food_1794149700596.jpg',
    splitOption: 'A medias',
    interestedCount: 4,
    hasApplied: false,
    tags: ['Ramen artesanal', 'Dumplings', 'Ambiente íntimo']
  },
  {
    id: 'plan_5',
    creatorId: 'user_carlos',
    creatorName: 'Carlos Navarro',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    creatorAge: 30,
    creatorCity: 'Madrid',
    creatorOccupation: 'Chef Repostero',
    category: 'cafe',
    title: 'Brunch y degustación de hojaldres al sol',
    description: 'He reservado mesa en la terraza de Acid Bakehouse. Llevo una cajita de financiers caseros para compartir. ¿Cafecito?',
    locationName: 'Acid Bakehouse',
    locationArea: 'Lavapiés / Tirso',
    datetime: 'Domingo, 12:00',
    imageBanner: '/src/assets/images/date_coffee_1794149700019.jpg',
    splitOption: 'Invito yo',
    interestedCount: 6,
    hasApplied: false,
    tags: ['Brunch', 'Repostería', 'Sol de mediodía']
  },
  {
    id: 'plan_6',
    creatorId: 'user_sofia',
    creatorName: 'Sofía Morales',
    creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
    creatorAge: 28,
    creatorCity: 'Madrid',
    creatorOccupation: 'Ilustradora',
    category: 'actividad',
    title: 'Concierto de jazz acústico en club subterráneo',
    description: 'Tengo dos entradas para el cuarteto de swing en Café Central. Mesita íntima cerca del piano y cóctel de bienvenida.',
    locationName: 'Café Central Jazz',
    locationArea: 'Plaza del Ángel, Madrid',
    datetime: 'Sábado, 21:30',
    imageBanner: '/src/assets/images/date_activity_1794149699279.jpg',
    splitOption: 'A medias',
    interestedCount: 8,
    hasApplied: false,
    tags: ['Jazz en vivo', 'Cócteles', 'Noche mágica']
  },
  {
    id: 'plan_group_tapas',
    creatorId: 'user_mateo',
    creatorName: 'Mateo Sánchez',
    creatorAvatar: '/src/assets/images/avatar_mateo_1794149698903.jpg',
    creatorAge: 29,
    creatorCity: 'Madrid',
    creatorOccupation: 'Diseñador de Iluminación',
    category: 'comer',
    title: 'Ruta de tapas y vinos en La Latina (Mesa de 6 solteros)',
    description: '¡Cita en grupo! Mesa mixta de 6 personas en La Latina para picotear croquetas, tortilla melosa y brindar con vinos. Ambiente distendido, cero incomodidad y para romper el hielo riendo.',
    locationName: 'Taberna La Latina & Cava Baja',
    locationArea: 'La Latina, Madrid',
    datetime: 'Viernes, 21:00',
    imageBanner: '/src/assets/images/date_food_1794149700596.jpg',
    splitOption: 'A escote / A partes iguales',
    interestedCount: 4,
    hasApplied: false,
    tags: ['Cita en Grupo', 'Mesa de 6', 'Vinos & Tapas', 'Solteros Madrid'],
    isGroupDate: true,
    maxParticipants: 6,
    currentParticipants: [
      { id: 'user_mateo', name: 'Mateo Sánchez', avatar: '/src/assets/images/avatar_mateo_1794149698903.jpg', age: 29, occupation: 'Diseñador' },
      { id: 'user_lucia', name: 'Lucía Romero', avatar: '/src/assets/images/avatar_lucia_1794149698456.jpg', age: 27, occupation: 'Arquitecta' },
      { id: 'user_carlos', name: 'Carlos Navarro', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80', age: 30, occupation: 'Chef' },
      { id: 'user_sofia', name: 'Sofía Morales', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80', age: 28, occupation: 'Ilustradora' }
    ],
    groupType: 'mesa_mixta'
  },
  {
    id: 'plan_group_coffee',
    creatorId: 'user_elena',
    creatorName: 'Elena Vega',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    creatorAge: 26,
    creatorCity: 'Madrid',
    creatorOccupation: 'Editora de Libros',
    category: 'cafe',
    title: 'Cata de cafés de especialidad & brunch para 4 solteros (2 chicos + 2 chicas)',
    description: 'Mesa reservada para 4 en Acid Bakehouse. Degustaremos 3 cafés filtrados de origen con bollería de masa madre. Charla distendida de cine, viajes y libros favoritos.',
    locationName: 'Acid Bakehouse',
    locationArea: 'Lavapiés / Tirso',
    datetime: 'Sábado, 11:30',
    imageBanner: '/src/assets/images/date_coffee_1794149700019.jpg',
    splitOption: 'A escote / A partes iguales',
    interestedCount: 3,
    hasApplied: false,
    tags: ['Cita en Grupo', 'Mesa de 4', 'Brunch & Café', 'Conversación'],
    isGroupDate: true,
    maxParticipants: 4,
    currentParticipants: [
      { id: 'user_elena', name: 'Elena Vega', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80', age: 26, occupation: 'Editora' },
      { id: 'user_pablo', name: 'Pablo Ruiz', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80', age: 31, occupation: 'Botánico' },
      { id: 'user_valeria', name: 'Valeria Torres', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80', age: 27, occupation: 'Directora de Arte' }
    ],
    groupType: 'doble_cita'
  },
  {
    id: 'plan_group_activity',
    creatorId: 'user_javier',
    creatorName: 'Javier Méndez',
    creatorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    creatorAge: 32,
    creatorCity: 'Madrid',
    creatorOccupation: 'Ingeniero de Software & Guía',
    category: 'actividad',
    title: 'Escape Room misterio + cañas posteriores para 6 personas',
    description: '¿Quién se apunta a resolver enigmas en equipo? La mejor forma de romper el hielo en grupo es descifrar pistas juntos y luego celebrarlo comentando la jugada con unas cañas bien frías.',
    locationName: 'Fox in a Box Escape Room',
    locationArea: 'Chueca / Gran Vía',
    datetime: 'Domingo, 18:00',
    imageBanner: '/src/assets/images/date_activity_1794149699279.jpg',
    splitOption: 'A escote / A partes iguales',
    interestedCount: 3,
    hasApplied: false,
    tags: ['Cita en Grupo', 'Escape Room', 'Equipo', 'Risas'],
    isGroupDate: true,
    maxParticipants: 6,
    currentParticipants: [
      { id: 'user_javier', name: 'Javier Méndez', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80', age: 32, occupation: 'Ingeniero' },
      { id: 'user_lucia', name: 'Lucía Romero', avatar: '/src/assets/images/avatar_lucia_1794149698456.jpg', age: 27, occupation: 'Arquitecta' },
      { id: 'user_mateo', name: 'Mateo Sánchez', avatar: '/src/assets/images/avatar_mateo_1794149698903.jpg', age: 29, occupation: 'Diseñador' }
    ],
    groupType: 'actividad_grupal'
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv_group_tapas',
    isGroupChat: true,
    groupTitle: 'Mesa de Tapas & Vinos (La Latina)',
    groupParticipants: [
      { id: 'user_mateo', name: 'Mateo Sánchez', avatar: '/src/assets/images/avatar_mateo_1794149698903.jpg', age: 29 },
      { id: 'user_lucia', name: 'Lucía Romero', avatar: '/src/assets/images/avatar_lucia_1794149698456.jpg', age: 27 },
      { id: 'user_carlos', name: 'Carlos Navarro', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80', age: 30 },
      { id: 'user_sofia', name: 'Sofía Morales', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80', age: 28 }
    ],
    participant: {
      ...MOCK_PROFILES[1],
      name: 'Mesa de Tapas & Vinos (Grupo)'
    },
    lastMessage: 'Mateo: ¡Qué ganas del viernes! Ya he reservado la mesa alta para todos.',
    lastMessageTime: '11:15',
    unreadCount: 2,
    activeDate: {
      id: 'date_group_tapas',
      fromUserId: 'user_mateo',
      toUserId: 'group',
      recipientName: 'Cita en Grupo (6 personas)',
      recipientAvatar: '/src/assets/images/date_food_1794149700596.jpg',
      category: 'comer',
      title: 'Ruta de tapas y vinos en La Latina',
      spotName: 'Taberna La Latina & Cava Baja',
      dateTime: 'Viernes, 21:00',
      note: 'Mesa reservada para picotear y conocernos en grupo.',
      status: 'accepted',
      createdAt: 'Hoy',
      isGroupDate: true,
      maxParticipants: 6,
      currentParticipants: [
        { id: 'user_mateo', name: 'Mateo', avatar: '/src/assets/images/avatar_mateo_1794149698903.jpg' },
        { id: 'user_lucia', name: 'Lucía', avatar: '/src/assets/images/avatar_lucia_1794149698456.jpg' },
        { id: 'user_carlos', name: 'Carlos', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80' },
        { id: 'user_sofia', name: 'Sofía', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80' }
      ]
    },
    messages: [
      {
        id: 'gm1',
        senderId: 'user_mateo',
        senderName: 'Mateo',
        senderAvatar: '/src/assets/images/avatar_mateo_1794149698903.jpg',
        text: '¡Hola a todos! Qué buena mesa hemos montado. He reservado la mesa alta del fondo en Taberna La Latina.',
        timestamp: 'Hoy 10:15'
      },
      {
        id: 'gm2',
        senderId: 'user_lucia',
        senderName: 'Lucía',
        senderAvatar: '/src/assets/images/avatar_lucia_1794149698456.jpg',
        text: '¡Planazo total! Mucho mejor que una cita formal de uno a uno para romper el hielo. ¿Pedimos croquetas de jamón y boletus?',
        timestamp: 'Hoy 10:30'
      },
      {
        id: 'gm3',
        senderId: 'user_carlos',
        senderName: 'Carlos',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
        text: '¡Totalmente de acuerdo! Y una de pimientos de padrón y una botella de Ribera para empezar. ¡Nos vemos el viernes!',
        timestamp: 'Hoy 11:00'
      }
    ]
  },
  {
    id: 'conv_lucia',
    participant: MOCK_PROFILES[0],
    lastMessage: '¡Me encanta la idea del café! ¿Te viene bien el sábado a las 11:30 en Misión Café?',
    lastMessageTime: '10:45',
    unreadCount: 1,
    activeDate: {
      id: 'date_lucia_1',
      fromUserId: 'me',
      toUserId: 'user_lucia',
      recipientName: 'Lucía Romero',
      recipientAvatar: '/src/assets/images/avatar_lucia_1794149698456.jpg',
      category: 'cafe',
      title: 'Tomar un café de especialidad',
      spotName: 'Misión Café (Malasaña)',
      dateTime: 'Sábado, 11:30',
      note: '¡Será genial conocernos en persona y charlar con calma!',
      status: 'accepted',
      createdAt: 'Ayer'
    },
    messages: [
      {
        id: 'm1',
        senderId: 'me',
        text: '¡Hola Lucía! Vi que te encanta la cerámica y el buen café. ¿Eres más de flat white o capuchino?',
        timestamp: 'Ayer 19:20'
      },
      {
        id: 'm2',
        senderId: 'user_lucia',
        text: '¡Hola Álex! Sin duda capuchino artesanal con buena espuma y canela. ¿Y tú? Me alegra ver a alguien que prefiere planes reales en vez de días de chat infinito jaja',
        timestamp: 'Ayer 19:35'
      },
      {
        id: 'm3',
        senderId: 'me',
        text: '¡Totalmente de acuerdo! Por eso prefiero proponerte directamente quedar a tomar un café o probar ese taller de torno que tienes en el perfil.',
        timestamp: 'Ayer 20:00',
        dateProposal: {
          id: 'date_lucia_1',
          fromUserId: 'me',
          toUserId: 'user_lucia',
          recipientName: 'Lucía Romero',
          recipientAvatar: '/src/assets/images/avatar_lucia_1794149698456.jpg',
          category: 'cafe',
          title: 'Tomar un café de especialidad',
          spotName: 'Misión Café (Malasaña)',
          dateTime: 'Sábado, 11:30',
          note: '¡Será genial conocernos en persona y charlar con calma!',
          status: 'accepted',
          createdAt: 'Ayer'
        }
      },
      {
        id: 'm4',
        senderId: 'user_lucia',
        text: '¡Me encanta la idea del café! ¿Te viene bien el sábado a las 11:30 en Misión Café?',
        timestamp: '10:45'
      }
    ]
  },
  {
    id: 'conv_mateo',
    participant: MOCK_PROFILES[1],
    lastMessage: 'Venga, ese tapeo por Chamberí está hecho. Te sigo el ritmo con la tortilla.',
    lastMessageTime: '09:15',
    unreadCount: 0,
    activeDate: {
      id: 'date_mateo_1',
      fromUserId: 'user_mateo',
      toUserId: 'me',
      recipientName: 'Mateo Sánchez',
      recipientAvatar: '/src/assets/images/avatar_mateo_1794149698903.jpg',
      category: 'comer',
      title: 'Tapeo & Cañas de autor',
      spotName: 'Taberna Sylkar (Chamberí)',
      dateTime: 'Jueves, 20:30',
      note: 'Probamos la tortilla jugosa y brindamos por vernos.',
      status: 'pending',
      createdAt: 'Hoy'
    },
    messages: [
      {
        id: 'mm1',
        senderId: 'user_mateo',
        text: '¡Buenas Álex! Tienes buen gusto con los sitios. Vi que te mola la comida sin pretensiones.',
        timestamp: 'Ayer 21:10'
      },
      {
        id: 'mm2',
        senderId: 'me',
        text: '¡Qué tal Mateo! Sí señor, donde haya una buena tortilla y buen rollo, ahí estoy.',
        timestamp: 'Ayer 21:25'
      },
      {
        id: 'mm3',
        senderId: 'user_mateo',
        text: 'Venga, ese tapeo por Chamberí está hecho. Te sigo el ritmo con la tortilla.',
        timestamp: '09:15',
        dateProposal: {
          id: 'date_mateo_1',
          fromUserId: 'user_mateo',
          toUserId: 'me',
          recipientName: 'Mateo Sánchez',
          recipientAvatar: '/src/assets/images/avatar_mateo_1794149698903.jpg',
          category: 'comer',
          title: 'Tapeo & Cañas de autor',
          spotName: 'Taberna Sylkar (Chamberí)',
          dateTime: 'Jueves, 20:30',
          note: 'Probamos la tortilla jugosa y brindamos por vernos.',
          status: 'pending',
          createdAt: 'Hoy'
        }
      }
    ]
  }
];

export const CATEGORY_METADATA = {
  cafe: {
    label: 'Tomar un Café',
    shortLabel: 'Café',
    icon: 'Coffee',
    description: 'Encuentros tranquilos, aromas tostados y primeras miradas sin prisa.',
    spotsSuggestions: [
      'Toma Café (Malasaña)',
      'Misión Café (Conde Duque)',
      'Café de la Luz (Chueca)',
      'Acid Bakehouse (Lavapiés)',
      'Federal Café (Plaza de las Comendadoras)',
      'Hola Coffee (Lagasca)'
    ],
    icebreakers: [
      '¿Eres de café solo intenso o café con avena suave?',
      '¿Dulce o salado para acompañar un buen cortado?',
      '¿Tu cafetería favorita para perder la noción del tiempo?'
    ],
    color: '#8A533E',
    badgeBg: 'bg-amber-50 text-amber-900 border-amber-200'
  },
  comer: {
    label: 'Ir a Comer',
    shortLabel: 'Comer',
    icon: 'UtensilsCrossed',
    description: 'Rutas de tapas, cenas íntimas, ramen humeante o sobremesas eternas.',
    spotsSuggestions: [
      'Taberna Sylkar (Chamberí)',
      'Chuka Ramen Bar (Huertas)',
      'Sala de Despiece (Ponzano)',
      'Mercado de San Antón (Chueca)',
      'La Gabinoteca (Chamberí)',
      'Taquería La Lupita (Barrio Salamanca)'
    ],
    icebreakers: [
      '¿Tortilla de patata: muy poco cuajada o término medio?',
      '¿Cuál es el plato que te hace sonreír pase lo que pase?',
      '¿Picante valiente o sabores suaves y tradicionales?'
    ],
    color: '#C2410C',
    badgeBg: 'bg-orange-50 text-orange-900 border-orange-200'
  },
  actividad: {
    label: 'Hacer una Actividad',
    shortLabel: 'Actividad',
    icon: 'Compass',
    description: 'Tornos cerámicos, boulder, conciertos íntimos y planes para divertirse.',
    spotsSuggestions: [
      'Atelier Lumbre Cerámica (Conde Duque)',
      'Sputnik Climbing / Sharma Boulder',
      'Café Central Jazz (Plaza del Ángel)',
      'Ruta de vinilos & librerías por Huertas',
      'Paseo botánico al atardecer en El Retiro',
      'Taller de cocina o cata de vinos maridados'
    ],
    icebreakers: [
      '¿Qué afición o curiosidad te gustaría probar por primera vez?',
      '¿Prefieres actividades creativas con las manos o algo más físico?',
      '¿Cuál ha sido la anécdota más divertida que has vivido probando algo nuevo?'
    ],
    color: '#047857',
    badgeBg: 'bg-emerald-50 text-emerald-900 border-emerald-200'
  }
};
