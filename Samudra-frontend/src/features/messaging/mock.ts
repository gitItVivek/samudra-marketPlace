import type { Conversation } from '@/shared/types';

export interface ChatInboxItem {
  id: string;
  participantName: string;
  participantInitials: string;
  listingTitle: string;
  lastMessage: string;
  time: string;
  unread?: boolean;
  online?: boolean;
}

export const chatInbox: ChatInboxItem[] = [
  {
    id: 'demo',
    participantName: 'Rahul K.',
    participantInitials: 'RK',
    listingTitle: 'iPhone 12 · 64GB',
    lastMessage: 'Works for me. I will message you when I reach.',
    time: '9:43 AM',
    unread: true,
    online: true,
  },
  {
    id: 'priya-sofa',
    participantName: 'Priya M.',
    participantInitials: 'PM',
    listingTitle: '3-seater Sofa',
    lastMessage: 'Is it still available?',
    time: 'Yesterday',
    online: false,
  },
  {
    id: 'suresh-rent',
    participantName: 'Suresh P.',
    participantInitials: 'SP',
    listingTitle: '2BHK for rent',
    lastMessage: 'Can we schedule a visit this weekend?',
    time: 'Mon',
  },
];

export const conversations: Record<string, Conversation> = {
  demo: {
    id: 'demo',
    listing: {
      id: 'iphone-12',
      title: 'iPhone 12 · 64GB · Space Grey',
      price: 14500,
      location: 'Koramangala',
      postedAgo: '2h ago',
      icon: '📱',
      negotiable: true,
    },
    participant: {
      id: 'rahul-k',
      name: 'Rahul K.',
      initials: 'RK',
      memberSince: 'Jan 2022',
      listingCount: 24,
      rating: 4.2,
      reviewCount: 17,
      online: true,
    },
    messages: [
      {
        id: '1',
        type: 'received',
        text: 'Hi! Is the iPhone still available?',
        time: '9:40 AM',
        senderInitials: 'RK',
      },
      {
        id: '2',
        type: 'sent',
        text: 'Yes, it is. You can come see it today evening.',
        time: '9:41 AM',
      },
      {
        id: '3',
        type: 'received',
        text: 'Great. Can we meet near Forum Mall, Koramangala around 6 PM?',
        time: '9:42 AM',
        senderInitials: 'RK',
      },
      {
        id: '4',
        type: 'sent',
        text: 'Works for me. I will message you when I reach.',
        time: '9:43 AM',
      },
      {
        id: '5',
        type: 'system',
        text: 'Both parties agreed to meet. Stay safe!',
      },
    ],
  },
  'priya-sofa': {
    id: 'priya-sofa',
    listing: {
      id: 'sofa-set',
      title: '3-seater Sofa · Brown leather',
      price: 8500,
      location: 'HSR Layout',
      postedAgo: '5h ago',
      icon: '🛋️',
    },
    participant: {
      id: 'priya-m',
      name: 'Priya M.',
      initials: 'PM',
      memberSince: 'Aug 2023',
      listingCount: 8,
      rating: 4.5,
      reviewCount: 6,
    },
    messages: [
      {
        id: '1',
        type: 'received',
        text: 'Is it still available?',
        time: 'Yesterday',
        senderInitials: 'PM',
      },
    ],
  },
  'suresh-rent': {
    id: 'suresh-rent',
    listing: {
      id: '2bhk-rent',
      title: '2BHK for rent - Furnished',
      price: 18000,
      priceLabel: '₹18,000/mo',
      location: 'Indiranagar',
      postedAgo: '1d ago',
      icon: '🏠',
    },
    participant: {
      id: 'suresh-p',
      name: 'Suresh P.',
      initials: 'SP',
      memberSince: 'Mar 2021',
      listingCount: 15,
      rating: 4.8,
      reviewCount: 22,
    },
    messages: [
      {
        id: '1',
        type: 'received',
        text: 'Can we schedule a visit this weekend?',
        time: 'Mon',
        senderInitials: 'SP',
      },
    ],
  },
};

export function getConversation(id: string): Conversation {
  return conversations[id] ?? conversations.demo;
}
