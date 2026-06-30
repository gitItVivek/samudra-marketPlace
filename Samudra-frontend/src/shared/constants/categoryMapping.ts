import type { CategoryType } from '@/shared/types/api';

const UI_TO_API: Record<string, CategoryType> = {
  electronics: 'ELECTRONICS',
  vehicles: 'VEHICLES',
  property: 'PROPERTY',
  furniture: 'FURNITURE_HOME',
  fashion: 'FASHION',
  books: 'BOOKS_MEDIA',
  sports: 'SPORTS_FITNESS',
  services: 'SERVICES',
  jobs: 'JOBS',
  pets: 'PETS',
  home: 'FURNITURE_HOME',
  other: 'OTHER',
};

const API_TO_ICON: Record<CategoryType, string> = {
  ELECTRONICS: '📱',
  VEHICLES: '🏍️',
  PROPERTY: '🏠',
  FURNITURE_HOME: '🛋️',
  FASHION: '👕',
  BOOKS_MEDIA: '📚',
  SPORTS_FITNESS: '⚽',
  SERVICES: '🔧',
  JOBS: '💼',
  PETS: '🐾',
  AGRICULTURE: '🌾',
  OTHER: '📦',
};

export function uiCategoryToApi(categoryId: string): CategoryType | undefined {
  if (categoryId === 'all') return undefined;
  return UI_TO_API[categoryId];
}

export function categoryTypeIcon(categoryType: CategoryType): string {
  return API_TO_ICON[categoryType] ?? '📦';
}

export function uiCategoryToApiForCommunity(categoryId: string): CategoryType {
  return UI_TO_API[categoryId] ?? 'OTHER';
}

export const CONDITION_UI_TO_API: Record<string, string> = {
  New: 'NEW',
  'Used — Good': 'GOOD',
  'Used — Fair': 'FAIR',
  'For parts': 'FOR_PARTS',
};
