import type { CategoryItem } from '@/shared/types';

export const LISTING_CATEGORIES: CategoryItem[] = [
  { id: 'all', label: 'All', color: '#2d8a6e', icon: '📦' },
  { id: 'electronics', label: 'Electronics', color: '#dbeafe', icon: '📱' },
  { id: 'vehicles', label: 'Vehicles', color: '#ffedd5', icon: '🏍️' },
  { id: 'property', label: 'Property', color: '#fce7f3', icon: '🏠' },
  { id: 'furniture', label: 'Furniture', color: '#ede9fe', icon: '🛋️' },
  { id: 'jobs', label: 'Jobs', color: '#d1fae5', icon: '💼' },
  { id: 'services', label: 'Services', color: '#ffedd5', icon: '🔧' },
  { id: 'fashion', label: 'Fashion', color: '#f3f4f6', icon: '👕' },
  { id: 'books', label: 'Books', color: '#fef3c7', icon: '📚' },
  { id: 'sports', label: 'Sports', color: '#ccfbf1', icon: '⚽' },
  { id: 'pets', label: 'Pets', color: '#ffe4e6', icon: '🐾' },
];

export const GRID_PAGE_SIZE = 12;
