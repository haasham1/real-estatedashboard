export interface Property {
  id: number;
  title: string;
  price: number;
  bedrooms: number;
  location: string;
  image: string;
  bathrooms?: number;
  sqft?: number;
  yearBuilt?: number;
  propertyType?: string;
  description?: string;
  images?: string[];
}

export interface FilterState {
  minBedrooms: number;
  maxPrice: number;
  minPrice: number;
  sortBy: 'price-asc' | 'price-desc' | 'newest' | 'oldest' | 'none';
  searchQuery: string;
  propertyType: string;
  showFavoritesOnly: boolean;
}

export interface FavoritesContextType {
  favorites: number[];
  toggleFavorite: (propertyId: number) => void;
  isFavorite: (propertyId: number) => boolean;
}

export interface ComparisonContextType {
  compareList: Property[];
  addToCompare: (property: Property) => void;
  removeFromCompare: (propertyId: number) => void;
  clearCompare: () => void;
  isInCompare: (propertyId: number) => boolean;
}
