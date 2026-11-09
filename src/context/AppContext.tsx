import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  UserProfile,
  DatePlanProposal,
  Conversation,
  DateInvitation,
  ActiveTab,
  PlanCategory,
  ChatMessage
} from '../types';
import {
  CURRENT_USER,
  MOCK_PROFILES,
  MOCK_PUBLIC_PLANS,
  INITIAL_CONVERSATIONS
} from '../data/mockData';
import { rankProfilesByCompatibility } from '../utils/matchingAlgorithm';

interface AppContextType {
  currentUser: UserProfile;
  updateCurrentUser: (profile: Partial<UserProfile>) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  profiles: UserProfile[];
  currentProfileIndex: number;
  setCurrentProfileIndex: (idx: number) => void;
  maxDistance: number;
  setMaxDistance: (dist: number) => void;
  handleLikeProfile: (profile: UserProfile, preSelectedPlan?: PlanCategory) => void;
  handlePassProfile: () => void;
  publicPlans: DatePlanProposal[];
  handleJoinPlan: (planId: string, note?: string) => void;
  handleCreatePlan: (newPlan: Omit<DatePlanProposal, 'id' | 'creatorId' | 'creatorName' | 'creatorAvatar' | 'creatorAge' | 'creatorCity' | 'creatorOccupation' | 'interestedCount' | 'hasApplied'>) => void;
  conversations: Conversation[];
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  sendMessage: (conversationId: string, text: string) => void;
  sendDateInvitation: (invitation: Omit<DateInvitation, 'id' | 'fromUserId' | 'createdAt' | 'status'>) => void;
  respondToDateInvitation: (conversationId: string, invitationId: string, response: 'accepted' | 'declined') => void;
  allDates: DateInvitation[];
  // Modals state
  proposalModalTarget: { profile: UserProfile; category?: PlanCategory } | null;
  openProposalModal: (profile: UserProfile, category?: PlanCategory) => void;
  closeProposalModal: () => void;
  isNewPlanModalOpen: boolean;
  setIsNewPlanModalOpen: (open: boolean) => void;
  matchModalTarget: UserProfile | null;
  closeMatchModal: () => void;
  // Registration and Compatibility Modals
  isRegistrationOpen: boolean;
  openRegistrationModal: () => void;
  closeRegistrationModal: () => void;
  selectedCompatibilityTarget: UserProfile | null;
  openCompatibilityModal: (profile: UserProfile) => void;
  closeCompatibilityModal: () => void;
  isLoggedIn: boolean;
  loginWithAccount: (provider: 'google' | 'apple' | 'email', name: string, email?: string) => void;
  logout: () => void;
  notificationMessage: string | null;
  showNotification: (msg: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persistence via localStorage with fallback to mock data
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('quedamos_current_user');
      return saved ? JSON.parse(saved) : CURRENT_USER;
    } catch {
      return CURRENT_USER;
    }
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('descubrir');

  // Compute dynamic ranking based on compatibility algorithm
  const profiles = React.useMemo(() => {
    const ranked = rankProfilesByCompatibility(currentUser, MOCK_PROFILES);
    return [...ranked].sort((a, b) => b.matchPercentage - a.matchPercentage);
  }, [currentUser]);

  const [currentProfileIndex, setCurrentProfileIndex] = useState<number>(0);
  const [maxDistance, setMaxDistanceState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('quedamos_max_distance');
      return saved ? Number(saved) : 15;
    } catch {
      return 15;
    }
  });

  const setMaxDistance = (dist: number) => {
    setMaxDistanceState(dist);
    try {
      localStorage.setItem('quedamos_max_distance', String(dist));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  };

  const [publicPlans, setPublicPlans] = useState<DatePlanProposal[]>(() => {
    try {
      const saved = localStorage.getItem('quedamos_public_plans');
      return saved ? JSON.parse(saved) : MOCK_PUBLIC_PLANS;
    } catch {
      return MOCK_PUBLIC_PLANS;
    }
  });

  const [conversations, setConversations] = useState<Conversation[]>(() => {
    try {
      const saved = localStorage.getItem('quedamos_conversations');
      return saved ? JSON.parse(saved) : INITIAL_CONVERSATIONS;
    } catch {
      return INITIAL_CONVERSATIONS;
    }
  });

  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  // Modals
  const [proposalModalTarget, setProposalModalTarget] = useState<{ profile: UserProfile; category?: PlanCategory } | null>(null);
  const [isNewPlanModalOpen, setIsNewPlanModalOpen] = useState(false);
  const [matchModalTarget, setMatchModalTarget] = useState<UserProfile | null>(null);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

  // Registration & Compatibility State
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [selectedCompatibilityTarget, setSelectedCompatibilityTarget] = useState<UserProfile | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Theme state with system preference & localStorage
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('quedamos_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      return 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      localStorage.setItem('quedamos_theme', theme);
    } catch (e) {
      console.warn('Theme storage error', e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
  };

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('quedamos_current_user', JSON.stringify(currentUser));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem('quedamos_public_plans', JSON.stringify(publicPlans));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [publicPlans]);

  useEffect(() => {
    try {
      localStorage.setItem('quedamos_conversations', JSON.stringify(conversations));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [conversations]);

  const showNotification = (msg: string) => {
    setNotificationMessage(msg);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 3800);
  };

  const updateCurrentUser = (updated: Partial<UserProfile>) => {
    setCurrentUser(prev => ({ ...prev, ...updated }));
    showNotification('Perfil actualizado correctamente');
  };

  const handlePassProfile = () => {
    if (currentProfileIndex < profiles.length - 1) {
      setCurrentProfileIndex(prev => prev + 1);
    } else {
      setCurrentProfileIndex(0); // loop around
    }
  };

  const handleLikeProfile = (profile: UserProfile, preSelectedPlan?: PlanCategory) => {
    // If specific plan button was clicked, open date proposal
    if (preSelectedPlan) {
      openProposalModal(profile, preSelectedPlan);
      return;
    }

    // Trigger match celebration for profiles that like back
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setMatchModalTarget(profile);

    // Ensure conversation exists
    setConversations(prev => {
      const exists = prev.some(c => c.participant.id === profile.id);
      if (!exists) {
        const newConv: Conversation = {
          id: `conv_${profile.id}`,
          participant: profile,
          lastMessage: `¡Tenéis un Match! Os apetece quedar para ${profile.coffeeStyle || 'tomar un café'}.`,
          lastMessageTime: 'Ahora',
          unreadCount: 1,
          messages: [
            {
              id: `sys_${Date.now()}`,
              senderId: profile.id,
              text: `¡Hola ${currentUser.name}! He visto tus gustos y tenemos muchas cosas en común. ¿Te apetecería tomar un café o picar algo pronto?`,
              timestamp: 'Ahora'
            }
          ]
        };
        return [newConv, ...prev];
      }
      return prev;
    });

    // Advance to next profile
    if (currentProfileIndex < profiles.length - 1) {
      setCurrentProfileIndex(prev => prev + 1);
    } else {
      setCurrentProfileIndex(0);
    }
  };

  const openProposalModal = (profile: UserProfile, category?: PlanCategory) => {
    setProposalModalTarget({ profile, category });
  };

  const closeProposalModal = () => {
    setProposalModalTarget(null);
  };

  const closeMatchModal = () => {
    setMatchModalTarget(null);
  };

  const handleJoinPlan = (planId: string, note?: string) => {
    const plan = publicPlans.find(p => p.id === planId);
    if (!plan) return;

    if (plan.hasApplied) {
      showNotification('Ya te has apuntado a este plan');
      return;
    }

    // 1. Group Date handling
    if (plan.isGroupDate) {
      const myParticipant = {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
        age: currentUser.age,
        occupation: currentUser.occupation
      };

      const updatedParticipants = [...(plan.currentParticipants || []), myParticipant];

      // Update plan participants and status
      setPublicPlans(prev =>
        prev.map(p =>
          p.id === planId
            ? {
                ...p,
                interestedCount: p.interestedCount + 1,
                hasApplied: true,
                currentParticipants: updatedParticipants
              }
            : p
        )
      );

      // Create or update group conversation
      const groupConvId = `conv_group_${plan.id}`;
      const groupDateInvite: DateInvitation = {
        id: `date_${plan.id}`,
        fromUserId: plan.creatorId,
        toUserId: 'group',
        recipientName: `Grupo: ${plan.title}`,
        recipientAvatar: plan.imageBanner,
        category: plan.category,
        title: plan.title,
        spotName: plan.locationName,
        dateTime: plan.datetime,
        note: `Cita grupal en ${plan.locationName} (${plan.datetime})`,
        status: 'accepted',
        createdAt: 'Ahora',
        isGroupDate: true,
        maxParticipants: plan.maxParticipants,
        currentParticipants: updatedParticipants
      };

      const joinText = note?.trim() || `¡Hola a todos! Me he unido a la cita en grupo para "${plan.title}". ¡Nos vemos el ${plan.datetime}!`;
      const joinMsg: ChatMessage = {
        id: `msg_${Date.now()}`,
        senderId: 'me',
        senderName: currentUser.name,
        senderAvatar: currentUser.avatar,
        text: joinText,
        timestamp: 'Ahora'
      };

      setConversations(prev => {
        const existing = prev.find(c => c.id === groupConvId);
        if (existing) {
          return prev.map(c =>
            c.id === groupConvId
              ? {
                  ...c,
                  activeDate: groupDateInvite,
                  lastMessage: `${currentUser.name}: ${joinText}`,
                  lastMessageTime: 'Ahora',
                  groupParticipants: updatedParticipants,
                  messages: [...c.messages, joinMsg]
                }
              : c
          );
        } else {
          const newGroupConv: Conversation = {
            id: groupConvId,
            isGroupChat: true,
            groupTitle: plan.title,
            groupParticipants: updatedParticipants,
            participant: {
              id: plan.creatorId,
              name: `Grupo: ${plan.title}`,
              age: plan.creatorAge,
              city: plan.creatorCity,
              neighborhood: plan.locationArea,
              occupation: 'Cita en Grupo',
              bio: plan.description,
              avatar: plan.imageBanner,
              photos: [plan.imageBanner, plan.creatorAvatar],
              distanceKm: 2.0,
              matchPercentage: 96,
              coffeeStyle: 'Café en grupo',
              foodCuisine: 'Mesa compartida',
              activityPick: plan.title,
              plans: {
                cafe: { title: 'Café', spot: plan.locationName, preference: '', note: '' },
                comer: { title: 'Comer', spot: plan.locationName, preference: '', note: '' },
                actividad: { title: 'Actividad', spot: plan.locationName, preference: '', note: '' }
              },
              interests: plan.tags,
              vibeKeywords: ['Cita en Grupo', 'Ambiente distendido']
            },
            lastMessage: `${currentUser.name}: ${joinText}`,
            lastMessageTime: 'Ahora',
            unreadCount: 0,
            activeDate: groupDateInvite,
            messages: [
              {
                id: `sys_group_${Date.now()}`,
                senderId: plan.creatorId,
                senderName: plan.creatorName,
                senderAvatar: plan.creatorAvatar,
                text: `¡Bienvenidos a la cita en grupo! Quedamos en ${plan.locationName} (${plan.datetime}).`,
                timestamp: 'Ahora'
              },
              joinMsg
            ]
          };
          return [newGroupConv, ...prev];
        }
      });

      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });

      showNotification(`¡Te has unido a la cita en grupo "${plan.title}"! Se ha añadido a tu agenda y chat grupal.`);
      return;
    }

    // 2. Individual 1v1 Plan handling
    setPublicPlans(prev =>
      prev.map(p =>
        p.id === planId
          ? { ...p, interestedCount: p.interestedCount + 1, hasApplied: true }
          : p
      )
    );

    // Fire celebratory confetti
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 }
    });

    // Add conversation with creator
    const creatorProfile = profiles.find(pr => pr.id === plan.creatorId) || {
      id: plan.creatorId,
      name: plan.creatorName,
      age: plan.creatorAge,
      city: plan.creatorCity,
      neighborhood: 'Centro',
      occupation: plan.creatorOccupation,
      bio: plan.description,
      avatar: plan.creatorAvatar,
      photos: [plan.creatorAvatar, plan.imageBanner],
      distanceKm: 2.0,
      matchPercentage: 95,
      coffeeStyle: 'Café de especialidad',
      foodCuisine: 'Tapas variadas',
      activityPick: plan.title,
      plans: {
        cafe: { title: 'Café', spot: plan.locationName, preference: 'Agradable', note: '' },
        comer: { title: 'Comer', spot: plan.locationName, preference: 'Compartir', note: '' },
        actividad: { title: 'Actividad', spot: plan.locationName, preference: 'Divertido', note: '' }
      },
      interests: plan.tags,
      vibeKeywords: ['Espontáneo', 'Buena compañía']
    };

    const userMessage = note?.trim()
      ? `¡Hola ${plan.creatorName}! Me ha encantado tu plan "${plan.title}". ${note}`
      : `¡Hola ${plan.creatorName}! Me apunto a tu plan de ${plan.title} en ${plan.locationName} (${plan.datetime}). ¿Sigue en pie?`;

    setConversations(prev => {
      const existingConv = prev.find(c => c.participant.id === plan.creatorId);
      if (existingConv) {
        const updatedMessages: ChatMessage[] = [
          ...existingConv.messages,
          {
            id: `msg_${Date.now()}`,
            senderId: 'me',
            text: userMessage,
            timestamp: 'Ahora'
          }
        ];
        return prev.map(c =>
          c.id === existingConv.id
            ? { ...c, messages: updatedMessages, lastMessage: userMessage, lastMessageTime: 'Ahora' }
            : c
        );
      } else {
        const newConv: Conversation = {
          id: `conv_${plan.creatorId}`,
          participant: creatorProfile,
          lastMessage: userMessage,
          lastMessageTime: 'Ahora',
          unreadCount: 0,
          messages: [
            {
              id: `msg_${Date.now()}`,
              senderId: 'me',
              text: userMessage,
              timestamp: 'Ahora'
            }
          ]
        };
        return [newConv, ...prev];
      }
    });

    showNotification(`¡Te has apuntado al plan de ${plan.creatorName}! Le hemos enviado tu mensaje.`);
  };

  const handleCreatePlan = (newPlanData: Omit<DatePlanProposal, 'id' | 'creatorId' | 'creatorName' | 'creatorAvatar' | 'creatorAge' | 'creatorCity' | 'creatorOccupation' | 'interestedCount' | 'hasApplied'>) => {
    const isGroup = Boolean(newPlanData.isGroupDate);
    const myParticipant = {
      id: currentUser.id,
      name: currentUser.name,
      avatar: currentUser.avatar,
      age: currentUser.age,
      occupation: currentUser.occupation
    };

    const planId = `plan_user_${Date.now()}`;
    const newPlan: DatePlanProposal = {
      ...newPlanData,
      id: planId,
      creatorId: currentUser.id,
      creatorName: currentUser.name,
      creatorAvatar: currentUser.avatar,
      creatorAge: currentUser.age,
      creatorCity: currentUser.city,
      creatorOccupation: currentUser.occupation,
      interestedCount: 1,
      hasApplied: true,
      currentParticipants: isGroup ? [myParticipant] : undefined,
      maxParticipants: isGroup ? (newPlanData.maxParticipants || 6) : undefined
    };

    setPublicPlans(prev => [newPlan, ...prev]);

    // If it's a group date, automatically initialize its group conversation and calendar entry
    if (isGroup) {
      const groupConvId = `conv_group_${planId}`;
      const groupDateInvite: DateInvitation = {
        id: `date_${planId}`,
        fromUserId: currentUser.id,
        toUserId: 'group',
        recipientName: `Grupo: ${newPlan.title}`,
        recipientAvatar: newPlan.imageBanner,
        category: newPlan.category,
        title: newPlan.title,
        spotName: newPlan.locationName,
        dateTime: newPlan.datetime,
        note: `Cita grupal creada por ti en ${newPlan.locationName}`,
        status: 'accepted',
        createdAt: 'Ahora',
        isGroupDate: true,
        maxParticipants: newPlan.maxParticipants,
        currentParticipants: [myParticipant]
      };

      const groupConv: Conversation = {
        id: groupConvId,
        isGroupChat: true,
        groupTitle: newPlan.title,
        groupParticipants: [myParticipant],
        participant: {
          id: `group_${planId}`,
          name: `Grupo: ${newPlan.title}`,
          age: currentUser.age,
          city: currentUser.city,
          neighborhood: newPlan.locationArea,
          occupation: 'Cita en Grupo',
          bio: newPlan.description,
          avatar: newPlan.imageBanner,
          photos: [newPlan.imageBanner],
          distanceKm: 0,
          matchPercentage: 100,
          coffeeStyle: 'Café en grupo',
          foodCuisine: 'Comida compartida',
          activityPick: newPlan.title,
          plans: {
            cafe: { title: 'Café', spot: newPlan.locationName, preference: '', note: '' },
            comer: { title: 'Comer', spot: newPlan.locationName, preference: '', note: '' },
            actividad: { title: 'Actividad', spot: newPlan.locationName, preference: '', note: '' }
          },
          interests: newPlan.tags,
          vibeKeywords: ['Cita en Grupo', 'Organizada por ti']
        },
        lastMessage: 'Has creado esta cita en grupo. Los solteros interesados se irán uniendo aquí.',
        lastMessageTime: 'Ahora',
        unreadCount: 0,
        activeDate: groupDateInvite,
        messages: [
          {
            id: `msg_init_${Date.now()}`,
            senderId: 'me',
            senderName: currentUser.name,
            senderAvatar: currentUser.avatar,
            text: `¡He organizado la cita en grupo "${newPlan.title}" en ${newPlan.locationName} (${newPlan.datetime})! Plazas: ${newPlan.maxParticipants || 6} personas.`,
            timestamp: 'Ahora'
          }
        ]
      };

      setConversations(prev => [groupConv, ...prev]);
    }

    setIsNewPlanModalOpen(false);

    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.5 }
    });

    showNotification(
      isGroup
        ? `¡Tu cita en grupo "${newPlan.title}" (${newPlan.maxParticipants} plazas) ha sido publicada!`
        : '¡Tu plan ha sido publicado en el Tablón de Quedadas!'
    );
  };

  const sendMessage = (conversationId: string, text: string) => {
    if (!text.trim()) return;

    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      senderId: 'me',
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      text: text.trim(),
      timestamp: 'Ahora'
    };

    setConversations(prev =>
      prev.map(c => {
        if (c.id === conversationId) {
          return {
            ...c,
            lastMessage: c.isGroupChat ? `${currentUser.name}: ${text.trim()}` : text.trim(),
            lastMessageTime: 'Ahora',
            messages: [...c.messages, newMessage]
          };
        }
        return c;
      })
    );

    // Auto-reply simulation
    setTimeout(() => {
      setConversations(currentConvs => {
        const targetConv = currentConvs.find(c => c.id === conversationId);
        if (!targetConv) return currentConvs;

        if (targetConv.isGroupChat) {
          const otherParticipants = (targetConv.groupParticipants || []).filter(p => p.id !== 'me' && p.id !== currentUser.id);
          const responder = otherParticipants.length > 0
            ? otherParticipants[Math.floor(Math.random() * otherParticipants.length)]
            : { name: 'Lucía', avatar: '/src/assets/images/avatar_lucia_1794149698456.jpg', id: 'user_lucia' };

          const groupReplies = [
            `¡Totalmente de acuerdo! Qué buen grupo se ha juntado para esta quedada.`,
            `¡Perfecto! Nos vemos entonces directamente en la puerta del sitio a esa hora.`,
            `¡Qué ganas! Yo me pido probar las croquetas y una buena caña nada más llegar jaja.`,
            `¡Me parece genial! ¿Alguien más viene en metro o vamos directos?`
          ];
          const replyText = groupReplies[Math.floor(Math.random() * groupReplies.length)];

          const replyMsg: ChatMessage = {
            id: `reply_${Date.now()}`,
            senderId: responder.id,
            senderName: responder.name,
            senderAvatar: responder.avatar,
            text: replyText,
            timestamp: 'Ahora'
          };

          return currentConvs.map(c => {
            if (c.id === conversationId) {
              return {
                ...c,
                lastMessage: `${responder.name}: ${replyText}`,
                lastMessageTime: 'Ahora',
                messages: [...c.messages, replyMsg]
              };
            }
            return c;
          });
        }

        const replies = [
          `¡Qué buena vibra! Cuenta conmigo para eso, me apetece un montón vernos en persona.`,
          `¡Totalmente! Me cuadra el sitio. ¿Nos vemos entonces a esa hora?`,
          `¡Genial! Me pides un buen café y te cuento una historia divertida cuando lleguemos.`,
          `¡Me parece un planazo! Es justo lo que me apetecía hacer esta semana.`
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];

        const replyMsg: ChatMessage = {
          id: `reply_${Date.now()}`,
          senderId: targetConv.participant.id,
          text: randomReply,
          timestamp: 'Ahora'
        };

        return currentConvs.map(c => {
          if (c.id === conversationId) {
            return {
              ...c,
              lastMessage: randomReply,
              lastMessageTime: 'Ahora',
              messages: [...c.messages, replyMsg]
            };
          }
          return c;
        });
      });
    }, 1500);
  };

  const sendDateInvitation = (invitationData: Omit<DateInvitation, 'id' | 'fromUserId' | 'createdAt' | 'status'>) => {
    const newInvitation: DateInvitation = {
      ...invitationData,
      id: `date_${Date.now()}`,
      fromUserId: 'me',
      status: 'pending',
      createdAt: 'Ahora'
    };

    // Find or create conversation with recipient
    const targetProfile = profiles.find(p => p.id === invitationData.toUserId) || {
      id: invitationData.toUserId,
      name: invitationData.recipientName,
      age: 27,
      city: 'Madrid',
      neighborhood: 'Centro',
      occupation: 'Profesional',
      bio: '',
      avatar: invitationData.recipientAvatar,
      photos: [invitationData.recipientAvatar],
      distanceKm: 2,
      matchPercentage: 90,
      coffeeStyle: 'Café',
      foodCuisine: 'Tapas',
      activityPick: 'Actividad',
      plans: {
        cafe: { title: 'Café', spot: invitationData.spotName, preference: '', note: '' },
        comer: { title: 'Comer', spot: invitationData.spotName, preference: '', note: '' },
        actividad: { title: 'Actividad', spot: invitationData.spotName, preference: '', note: '' }
      },
      interests: [],
      vibeKeywords: []
    };

    setConversations(prev => {
      const existingConv = prev.find(c => c.participant.id === targetProfile.id);
      const inviteMsg: ChatMessage = {
        id: `msg_invite_${Date.now()}`,
        senderId: 'me',
        text: `¡Te he propuesto una cita! ${newInvitation.title} en ${newInvitation.spotName} (${newInvitation.dateTime}).`,
        timestamp: 'Ahora',
        dateProposal: newInvitation
      };

      if (existingConv) {
        return prev.map(c =>
          c.id === existingConv.id
            ? {
                ...c,
                activeDate: newInvitation,
                lastMessage: `Cita propuesta: ${newInvitation.title}`,
                lastMessageTime: 'Ahora',
                messages: [...c.messages, inviteMsg]
              }
            : c
        );
      } else {
        const newConv: Conversation = {
          id: `conv_${targetProfile.id}`,
          participant: targetProfile,
          lastMessage: `Cita propuesta: ${newInvitation.title}`,
          lastMessageTime: 'Ahora',
          unreadCount: 0,
          activeDate: newInvitation,
          messages: [inviteMsg]
        };
        return [newConv, ...prev];
      }
    });

    closeProposalModal();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    showNotification(`¡Propuesta de cita enviada a ${invitationData.recipientName}!`);

    // Auto-accept by mock user after 3 seconds for delightful UX
    setTimeout(() => {
      setConversations(prev =>
        prev.map(c => {
          if (c.participant.id === targetProfile.id && c.activeDate?.id === newInvitation.id) {
            const acceptedDate: DateInvitation = { ...newInvitation, status: 'accepted' };
            const replyMsg: ChatMessage = {
              id: `msg_accepted_${Date.now()}`,
              senderId: targetProfile.id,
              text: `¡Siii! Me encanta la propuesta en ${newInvitation.spotName}. ¡Cuenta conmigo, nos vemos el ${newInvitation.dateTime}! 🎉`,
              timestamp: 'Ahora'
            };
            return {
              ...c,
              activeDate: acceptedDate,
              lastMessage: `¡Cita confirmada! Nos vemos el ${newInvitation.dateTime}.`,
              lastMessageTime: 'Ahora',
              messages: [...c.messages, replyMsg]
            };
          }
          return c;
        })
      );
      showNotification(`¡${invitationData.recipientName} ha aceptado tu propuesta de cita! Quedáis el ${newInvitation.dateTime}.`);
    }, 3200);
  };

  const respondToDateInvitation = (conversationId: string, invitationId: string, response: 'accepted' | 'declined') => {
    setConversations(prev =>
      prev.map(c => {
        if (c.id === conversationId) {
          const updatedActiveDate = c.activeDate && c.activeDate.id === invitationId
            ? { ...c.activeDate, status: response }
            : c.activeDate;

          const responseText = response === 'accepted'
            ? '¡He aceptado la propuesta de cita! Nos vemos allí. ☕✨'
            : 'En esta ocasión no puedo en esa fecha, pero hablemos de otro momento.';

          const replyMsg: ChatMessage = {
            id: `msg_res_${Date.now()}`,
            senderId: 'me',
            text: responseText,
            timestamp: 'Ahora'
          };

          return {
            ...c,
            activeDate: updatedActiveDate,
            lastMessage: responseText,
            lastMessageTime: 'Ahora',
            messages: [...c.messages, replyMsg]
          };
        }
        return c;
      })
    );

    if (response === 'accepted') {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
      showNotification('¡Cita confirmada! Se ha añadido a tu agenda de citas.');
    } else {
      showNotification('Propuesta rechazada.');
    }
  };

  const openRegistrationModal = () => setIsRegistrationOpen(true);
  const closeRegistrationModal = () => setIsRegistrationOpen(false);

  const openCompatibilityModal = (profile: UserProfile) => {
    setSelectedCompatibilityTarget(profile);
  };
  const closeCompatibilityModal = () => {
    setSelectedCompatibilityTarget(null);
  };

  const loginWithAccount = (provider: 'google' | 'apple' | 'email', name: string, email?: string) => {
    setIsLoggedIn(true);
    setCurrentUser(prev => ({
      ...prev,
      name: name || prev.name,
      email: email || prev.email,
      authProvider: provider
    }));
    showNotification(`¡Bienvenido de nuevo! Sesión iniciada con ${provider.toUpperCase()}.`);
  };

  const logout = () => {
    setIsLoggedIn(false);
    showNotification('Has cerrado sesión. Puedes registrarte o volver a iniciar sesión cuando quieras.');
  };

  // Compile all dates across conversations
  const allDates: DateInvitation[] = conversations
    .map(c => c.activeDate)
    .filter((d): d is DateInvitation => Boolean(d));

  return (
    <AppContext.Provider
      value={{
        currentUser,
        updateCurrentUser,
        activeTab,
        setActiveTab,
        profiles,
        currentProfileIndex,
        setCurrentProfileIndex,
        maxDistance,
        setMaxDistance,
        handleLikeProfile,
        handlePassProfile,
        publicPlans,
        handleJoinPlan,
        handleCreatePlan,
        conversations,
        activeConversationId,
        setActiveConversationId,
        sendMessage,
        sendDateInvitation,
        respondToDateInvitation,
        allDates,
        proposalModalTarget,
        openProposalModal,
        closeProposalModal,
        isNewPlanModalOpen,
        setIsNewPlanModalOpen,
        matchModalTarget,
        closeMatchModal,
        isRegistrationOpen,
        openRegistrationModal,
        closeRegistrationModal,
        selectedCompatibilityTarget,
        openCompatibilityModal,
        closeCompatibilityModal,
        isLoggedIn,
        loginWithAccount,
        logout,
        notificationMessage,
        showNotification,
        theme,
        toggleTheme,
        setTheme
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
