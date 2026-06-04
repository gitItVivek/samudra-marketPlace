import type { Conversation } from '@/shared/types';

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
};

export function getConversation(id: string): Conversation {
  return conversations[id] ?? conversations.demo;
}
