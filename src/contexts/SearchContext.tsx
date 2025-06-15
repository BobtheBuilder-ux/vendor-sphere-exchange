
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/types/firestore';

interface SearchFilters {
  query: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  vendor: string;
  minRating: number;
  location: string;
  sortBy: 'price-low' | 'price-high' | 'rating' | 'newest' | 'popularity';
  inStock: boolean;
}

interface SearchContextType {
  filters: SearchFilters;
  updateFilters: (updates: Partial<SearchFilters>) => void;
  resetFilters: () => void;
  searchResults: Product[];
  setSearchResults: (results: Product[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const defaultFilters: SearchFilters = {
  query: '',
  category: 'all',
  minPrice: 0,
  maxPrice: 1000,
  vendor: 'all',
  minRating: 0,
  location: '',
  sortBy: 'popularity',
  inStock: false
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const updateFilters = (updates: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...updates }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  return (
    <SearchContext.Provider value={{
      filters,
      updateFilters,
      resetFilters,
      searchResults,
      setSearchResults,
      isLoading,
      setIsLoading
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
