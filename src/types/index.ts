export type PlanCategory = 'cafe' | 'comer' | 'actividad';

export type Gender = 'hombre' | 'mujer' | 'no_binario';
export type LookingFor = 'hombre' | 'mujer' | 'indiferente';
export type RelationshipType =
  | 'pareja_estable'
  | 'amistad_planes'
  | 'citas_ver_que_surge'
  | 'relacion_abierta';

export interface PlanDetail {
  title: string;
  spot: string;
  preference: string;
  note: string;
}

export interface CompatibilityDetails {
  score: number;
  reasons: string[];
  sharedHobbies: string[];
  relationshipMatch: boolean;
  dateAffinity: string;
}

export interface DateVibePreferences {
  coffeeVibe: string;
  coffeePayment: 'Invito yo' | 'A medias' | 'Invita quien propone';
  foodStyle: string;
  diningVibe: string;
  activityVibe: string;
  energyLevel: 'tranquilo' | 'dinamico' | 'aventurero';
}

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender?: Gender;
  lookingFor?: LookingFor;
  relationshipType?: RelationshipType;
  birthDay?: number;
  birthMonth?: number;
  birthYear?: number;
  nationality?: string;
  country?: string;
  province?: string;
  city: string;
  neighborhood: string;
  occupation: string;
  bio: string;
  avatar: string;
  photos: string[];
  distanceKm: number;
  matchPercentage: number;
  compatibilityDetails?: CompatibilityDetails;
  hobbies?: string[];
  coffeeStyle: string;
  foodCuisine: string;
  activityPick: string;
  datePreferences?: DateVibePreferences;
  plans: {
    cafe: PlanDetail;
    comer: PlanDetail;
    actividad: PlanDetail;
  };
  interests: string[];
  vibeKeywords: string[];
  authProvider?: 'email' | 'google' | 'apple';
  email?: string;
}

export interface GroupParticipant {
  id: string;
  name: string;
  avatar: string;
  age?: number;
  occupation?: string;
}

export interface DateInvitation {
  id: string;
  fromUserId: string;
  toUserId: string;
  recipientName: string;
  recipientAvatar: string;
  category: PlanCategory;
  title: string;
  spotName: string;
  dateTime: string;
  note: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed';
  createdAt: string;
  isGroupDate?: boolean;
  maxParticipants?: number;
  currentParticipants?: GroupParticipant[];
}

export interface DatePlanProposal {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  creatorAge: number;
  creatorCity: string;
  creatorOccupation: string;
  category: PlanCategory;
  title: string;
  description: string;
  locationName: string;
  locationArea: string;
  datetime: string;
  imageBanner: string;
  splitOption: 'Invito yo' | 'A medias' | 'Invitación mutua' | 'A escote / A partes iguales' | 'Cada uno lo suyo';
  interestedCount: number;
  hasApplied?: boolean;
  tags: string[];
  isGroupDate?: boolean;
  maxParticipants?: number;
  currentParticipants?: GroupParticipant[];
  groupType?: 'mesa_mixta' | 'solteros_abierto' | 'doble_cita' | 'actividad_grupal';
}

export interface ChatMessage {
  id: string;
  senderId: 'me' | string;
  senderName?: string;
  senderAvatar?: string;
  text: string;
  timestamp: string;
  dateProposal?: DateInvitation;
}

export interface Conversation {
  id: string;
  participant: UserProfile;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
  activeDate?: DateInvitation;
  isGroupChat?: boolean;
  groupTitle?: string;
  groupParticipants?: GroupParticipant[];
}

export type ActiveTab = 'descubrir' | 'tablon' | 'red' | 'citas' | 'mensajes' | 'perfil';

export type ContactCircle = 'amigos' | 'trabajo' | 'familia' | 'citas' | 'aficiones';

export interface UserContact {
  id: string;
  name: string;
  avatar: string;
  phone?: string;
  email?: string;
  circle: ContactCircle;
  status: 'disponible' | 'en_plan' | 'ocupado' | 'libre_fin_de_semana';
  statusMessage?: string;
  city: string;
  neighborhood?: string;
  favoritePillar: PlanCategory;
  favoriteSpot?: string;
  hobbies?: string[];
  isCloseFriend?: boolean;
  connectedSince: string;
}

export interface SocialCircle {
  id: string;
  name: string;
  description: string;
  category: PlanCategory | 'mixto';
  memberCount: number;
  memberIds: string[];
}

export interface SocialPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorCircle: ContactCircle | 'mixto';
  createdAt: string;
  content: string;
  image?: string;
  planCategory?: PlanCategory;
  planDetails?: {
    title: string;
    spot: string;
    datetime: string;
    isGroup: boolean;
    maxParticipants?: number;
    attendees: { id: string; name: string; avatar: string }[];
  };
  likes: number;
  hasLiked?: boolean;
  comments: {
    id: string;
    authorName: string;
    authorAvatar: string;
    text: string;
    time: string;
  }[];
}
