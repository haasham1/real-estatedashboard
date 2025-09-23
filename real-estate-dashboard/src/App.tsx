import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Property, FilterState } from './types/Property';
import { fetchProperties } from './services/api';
import { FavoritesProvider, useFavorites } from './contexts/FavoritesContext';
import { ComparisonProvider } from './contexts/ComparisonContext';
import Filters from './components/Filters';
import PropertyList from './components/PropertyList';
import PropertyDetails from './components/PropertyDetails';
import ComparisonPanel from './components/ComparisonPanel';
import './App.css';

const HomePage: React.FC<{ properties: Property[] }> = ({ properties }) => {
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  const [filters, setFilters] = useState<FilterState>({
    minBedrooms: 0,
    maxPrice: 1000000,
    minPrice: 0,
    sortBy: 'none',
    searchQuery: '',
    propertyType: '',
    showFavoritesOnly: false,
  });

  const filteredProperties = useMemo(() => {
    let filtered = properties.filter((property) => {
      // Filter by minimum bedrooms
      if (filters.minBedrooms > 0 && property.bedrooms < filters.minBedrooms) {
        return false;
      }

      // Filter by price range
      if (property.price < filters.minPrice || property.price > filters.maxPrice) {
        return false;
      }

      // Filter by property type
      if (filters.propertyType && property.propertyType !== filters.propertyType) {
        return false;
      }

      // Filter by search query (case-insensitive)
      if (filters.searchQuery && !property.title.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return false;
      }

      // Filter by favorites only
      if (filters.showFavoritesOnly && !favorites.includes(property.id)) {
        return false;
      }

      return true;
    });

    // Sort properties
    if (filters.sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'newest') {
      filtered.sort((a, b) => (b.yearBuilt || 0) - (a.yearBuilt || 0));
    } else if (filters.sortBy === 'oldest') {
      filtered.sort((a, b) => (a.yearBuilt || 0) - (b.yearBuilt || 0));
    }

    return filtered;
  }, [properties, filters, favorites]);

  const handlePropertyClick = (property: Property) => {
    navigate(`/property/${property.id}`);
  };

  return (
    <div className="home-page">
      <header className="app-header">
        <h1>Real Estate Dashboard</h1>
        <p>Find your perfect property</p>
      </header>
      
      <Filters 
        filters={filters} 
        onFiltersChange={setFilters}
        totalProperties={properties.length}
        filteredCount={filteredProperties.length}
      />
      <PropertyList properties={filteredProperties} onPropertyClick={handlePropertyClick} />
      <ComparisonPanel />
    </div>
  );
};

function App() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const data = await fetchProperties();
        setProperties(data);
      } catch (err) {
        setError('Failed to load properties. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner"></div>
        <p>Loading properties...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-error">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <FavoritesProvider>
      <ComparisonProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<HomePage properties={properties} />} />
              <Route path="/property/:id" element={<PropertyDetails properties={properties} />} />
            </Routes>
          </div>
        </Router>
      </ComparisonProvider>
    </FavoritesProvider>
  );
}

export default App;
