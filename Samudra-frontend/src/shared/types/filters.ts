export type SortOption = 'recommended' | 'price_low' | 'price_high' | 'newest' | 'nearest';

export type DateListedOption = 'all' | '24h' | '7d' | '30d';

export type AvailabilityOption = 'available' | 'all';

export interface ListingFiltersState {
  location: string;
  sort: SortOption;
  priceMin: string;
  priceMax: string;
  conditions: string[];
  dateListed: DateListedOption;
  availability: AvailabilityOption;
  negotiableOnly: boolean;
}

export const defaultListingFilters: ListingFiltersState = {
  location: '',
  sort: 'recommended',
  priceMin: '',
  priceMax: '',
  conditions: [],
  dateListed: 'all',
  availability: 'available',
  negotiableOnly: false,
};
