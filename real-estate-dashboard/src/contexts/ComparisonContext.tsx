import React, { createContext, useContext, useState } from 'react';
import { Property, ComparisonContextType } from '../types/Property';

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const ComparisonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [compareList, setCompareList] = useState<Property[]>([]);

  const addToCompare = (property: Property) => {
    setCompareList(prev => {
      if (prev.length >= 3) {
        // Replace the first item if we already have 3
        return [property, ...prev.slice(0, 2)];
      }
      if (!prev.find(p => p.id === property.id)) {
        return [property, ...prev];
      }
      return prev;
    });
  };

  const removeFromCompare = (propertyId: number) => {
    setCompareList(prev => prev.filter(p => p.id !== propertyId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const isInCompare = (propertyId: number) => {
    return compareList.some(p => p.id === propertyId);
  };

  return (
    <ComparisonContext.Provider value={{ 
      compareList, 
      addToCompare, 
      removeFromCompare, 
      clearCompare, 
      isInCompare 
    }}>
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};
