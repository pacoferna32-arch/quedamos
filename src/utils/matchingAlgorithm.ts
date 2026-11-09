import { UserProfile, CompatibilityDetails } from '../types';

/**
 * Algoritmo de Emparejamiento y Compatibilidad para Quedamos
 * Evalúa múltiples dimensiones:
 * 1. Afinidad de relación y búsqueda (20%)
 * 2. Aficiones e intereses compartidos (25%)
 * 3. Química en citas de Café, Comida y Actividad (35%)
 * 4. Proximidad geográfica y estilo de vida (20%)
 */
export function calculateCompatibility(
  user: UserProfile,
  candidate: UserProfile
): CompatibilityDetails {
  let score = 50; // base score
  const reasons: string[] = [];
  const sharedHobbies: string[] = [];

  // 1. Tipo de Relación (20 pts)
  const userRel = user.relationshipType || 'citas_ver_que_surge';
  const candRel = candidate.relationshipType || 'citas_ver_que_surge';
  let relationshipMatch = false;

  if (userRel === candRel) {
    score += 18;
    relationshipMatch = true;
    const relLabels: Record<string, string> = {
      pareja_estable: 'relación estable con futuro',
      amistad_planes: 'hacer amistad y planes divertidos',
      citas_ver_que_surge: 'citas relajadas y ver qué surge',
      relacion_abierta: 'relación abierta'
    };
    reasons.push(`Ambos buscáis lo mismo: ${relLabels[userRel] || 'conectar'}.`);
  } else if (
    (userRel === 'citas_ver_que_surge' && candRel === 'pareja_estable') ||
    (userRel === 'pareja_estable' && candRel === 'citas_ver_que_surge')
  ) {
    score += 10;
    relationshipMatch = true;
    reasons.push('Vuestras expectativas de relación son complementarias y flexibles.');
  } else {
    score += 4;
  }

  // 2. Aficiones en Común (25 pts)
  const userHobbies = user.hobbies || user.interests || [];
  const candHobbies = candidate.hobbies || candidate.interests || [];

  if (userHobbies.length > 0 && candHobbies.length > 0) {
    userHobbies.forEach(h => {
      const isShared = candHobbies.some(
        ch => ch.toLowerCase().includes(h.toLowerCase()) || h.toLowerCase().includes(ch.toLowerCase())
      );
      if (isShared && !sharedHobbies.includes(h)) {
        sharedHobbies.push(h);
      }
    });

    const commonCount = sharedHobbies.length;
    if (commonCount >= 4) {
      score += 22;
      reasons.push(
        `Compartís ${commonCount} aficiones clave: ${sharedHobbies.slice(0, 3).join(', ')} y más.`
      );
    } else if (commonCount >= 2) {
      score += 15;
      reasons.push(`Tenéis gustos en común: ${sharedHobbies.join(' y ')}.`);
    } else if (commonCount === 1) {
      score += 8;
      reasons.push(`Ambos disfrutáis de ${sharedHobbies[0]}.`);
    } else {
      score += 4;
      reasons.push('Vuestras aficiones son diferentes, lo que aporta novedades y frescura a vuestras citas.');
    }
  }

  // 3. Sinergia en Citas: Café, Comida y Actividad (35 pts)
  let dateAffinity = 'Alta afinidad en planes';

  // 3a. Café
  const userCoffee = (user.coffeeStyle || '').toLowerCase();
  const candCoffee = (candidate.coffeeStyle || '').toLowerCase();
  if (
    (userCoffee.includes('avena') && candCoffee.includes('avena')) ||
    (userCoffee.includes('espresso') && candCoffee.includes('espresso')) ||
    (userCoffee.includes('especialidad') && candCoffee.includes('especialidad')) ||
    (userCoffee.includes('filtro') && candCoffee.includes('filtro')) ||
    (userCoffee.includes('capuchino') && candCoffee.includes('capuchino'))
  ) {
    score += 8;
    reasons.push('Química de café: Coincidís en el estilo de café para una primera cita tranquila.');
  } else {
    score += 4;
  }

  // 3b. Comida
  const userFood = (user.foodCuisine || '').toLowerCase();
  const candFood = (candidate.foodCuisine || '').toLowerCase();
  if (
    (userFood.includes('tapas') && candFood.includes('tapas')) ||
    (userFood.includes('ramen') && candFood.includes('ramen')) ||
    (userFood.includes('mediterránea') && candFood.includes('mediterránea')) ||
    (userFood.includes('vino') && candFood.includes('vino'))
  ) {
    score += 8;
    reasons.push('Gusto gastronómico compartido: A los dos os atrae picar algo y compartir mesa.');
  } else {
    score += 4;
  }

  // 3c. Actividad y Nivel de Energía
  const userEnergy = user.datePreferences?.energyLevel || 'dinamico';
  const candEnergy = candidate.datePreferences?.energyLevel || 'dinamico';
  if (userEnergy === candEnergy) {
    score += 8;
    const energyDesc =
      userEnergy === 'tranquilo'
        ? 'planes pausados de conversación profunda'
        : userEnergy === 'aventurero'
        ? 'planes atrevidos al aire libre o creativos'
        : 'planes activos y divertidos para romper el hielo';
    reasons.push(`Mismo nivel de energía: Ambos preferís ${energyDesc}.`);
  } else {
    score += 4;
  }

  // 4. Proximidad Geográfica (10 pts)
  if (candidate.distanceKm <= 3) {
    score += 8;
    reasons.push(`Gran cercanía: Vivís a tan solo ${candidate.distanceKm} km, ideal para quedar espontáneamente.`);
  } else if (candidate.distanceKm <= 10) {
    score += 5;
    reasons.push(`Buena ubicación: A ${candidate.distanceKm} km de distancia.`);
  } else {
    score += 2;
  }

  // Cap between 65% and 98% for realism
  const finalScore = Math.min(Math.max(score, 68), 98);

  if (finalScore >= 90) {
    dateAffinity = '¡Excelente química y planes complementarios!';
  } else if (finalScore >= 80) {
    dateAffinity = 'Muy alta compatibilidad para quedar en persona';
  } else {
    dateAffinity = 'Buena base para romper el hielo';
  }

  return {
    score: finalScore,
    reasons,
    sharedHobbies,
    relationshipMatch,
    dateAffinity
  };
}

/**
 * Recalcula las afinidades de todos los perfiles disponibles
 * respecto al usuario activo y los ordena por mayor compatibilidad.
 */
export function rankProfilesByCompatibility(
  currentUser: UserProfile,
  profiles: UserProfile[]
): UserProfile[] {
  return profiles.map(profile => {
    const details = calculateCompatibility(currentUser, profile);
    return {
      ...profile,
      matchPercentage: details.score,
      compatibilityDetails: details
    };
  });
}
