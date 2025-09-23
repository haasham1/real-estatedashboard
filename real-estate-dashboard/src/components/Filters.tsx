import React, { useState } from 'react';
import { FilterState } from '../types/Property';
import { useFavorites } from '../contexts/FavoritesContext';
import './Filters.css';

interface FiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  totalProperties: number;
  filteredCount: number;
}

const Filters: React.FC<FiltersProps> = ({ filters, onFiltersChange, totalProperties, filteredCount }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const { favorites } = useFavorites();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({
      ...filters,
      searchQuery: e.target.value,
    });
  };

  const handleBedroomsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      minBedrooms: parseInt(e.target.value),
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      sortBy: e.target.value as FilterState['sortBy'],
    });
  };

  const handlePropertyTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      propertyType: e.target.value,
    });
  };

  const handlePriceRangeChange = (type: 'min' | 'max', value: number) => {
    onFiltersChange({
      ...filters,
      [type === 'min' ? 'minPrice' : 'maxPrice']: value,
    });
  };

  const handleFavoritesToggle = () => {
    onFiltersChange({
      ...filters,
      showFavoritesOnly: !filters.showFavoritesOnly,
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      minBedrooms: 0,
      maxPrice: 1000000,
      minPrice: 0,
      sortBy: 'none',
      searchQuery: '',
      propertyType: '',
      showFavoritesOnly: false,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="filters">
      <div className="filters-header">
        <div className="search-container">
          <div className="search-input-wrapper">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <input
              type="text"
              placeholder="Search properties..."
              value={filters.searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
            {filters.searchQuery && (
              <button 
                className="clear-search"
                onClick={() => handleSearchChange({ target: { value: '' } } as any)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2"/>
                  <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            )}
          </div>
        </div>
        
        <div className="filter-summary">
          <span className="results-count">
            {filteredCount} of {totalProperties} properties
          </span>
          <button 
            className="advanced-toggle"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <line x1="4" y1="21" x2="4" y2="14" stroke="currentColor" strokeWidth="2"/>
              <line x1="4" y1="10" x2="4" y2="3" stroke="currentColor" strokeWidth="2"/>
              <line x1="12" y1="21" x2="12" y2="12" stroke="currentColor" strokeWidth="2"/>
              <line x1="12" y1="8" x2="12" y2="3" stroke="currentColor" strokeWidth="2"/>
              <line x1="20" y1="21" x2="20" y2="16" stroke="currentColor" strokeWidth="2"/>
              <line x1="20" y1="12" x2="20" y2="3" stroke="currentColor" strokeWidth="2"/>
              <line x1="1" y1="14" x2="7" y2="14" stroke="currentColor" strokeWidth="2"/>
              <line x1="9" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="2"/>
              <line x1="17" y1="16" x2="23" y2="16" stroke="currentColor" strokeWidth="2"/>
            </svg>
            {showAdvanced ? 'Hide Filters' : 'More Filters'}
          </button>
        </div>
      </div>
      
      <div className="filter-controls">
        <div className="filter-row">
          <div className="filter-group">
            <label htmlFor="bedrooms">Bedrooms:</label>
            <select
              id="bedrooms"
              value={filters.minBedrooms}
              onChange={handleBedroomsChange}
              className="filter-select"
            >
              <option value={0}>Any</option>
              <option value={1}>1+</option>
              <option value={2}>2+</option>
              <option value={3}>3+</option>
              <option value={4}>4+</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="sort">Sort by:</label>
            <select
              id="sort"
              value={filters.sortBy}
              onChange={handleSortChange}
              className="filter-select"
            >
              <option value="none">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>

          <div className="filter-group">
            <button 
              className={`favorites-toggle ${filters.showFavoritesOnly ? 'active' : ''}`}
              onClick={handleFavoritesToggle}
              disabled={favorites.length === 0}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill={filters.showFavoritesOnly ? '#ef4444' : 'none'}
                  stroke={filters.showFavoritesOnly ? '#ef4444' : 'currentColor'}
                  strokeWidth="2"
                />
              </svg>
              Favorites ({favorites.length})
            </button>
          </div>
        </div>

        {showAdvanced && (
          <div className="advanced-filters">
            <div className="filter-row">
              <div className="filter-group">
                <label htmlFor="propertyType">Property Type:</label>
                <select
                  id="propertyType"
                  value={filters.propertyType}
                  onChange={handlePropertyTypeChange}
                  className="filter-select"
                >
                  <option value="">All Types</option>
                  <option value="House">House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Condo">Condo</option>
                  <option value="Townhouse">Townhouse</option>
                </select>
              </div>
            </div>

            <div className="price-range-group">
              <label>Price Range:</label>
              <div className="price-range-controls">
                <div className="price-input-group">
                  <label>Min:</label>
                  <input
                    type="range"
                    min="0"
                    max="1000000"
                    step="10000"
                    value={filters.minPrice}
                    onChange={(e) => handlePriceRangeChange('min', parseInt(e.target.value))}
                    className="price-slider"
                  />
                  <span className="price-value">{formatPrice(filters.minPrice)}</span>
                </div>
                <div className="price-input-group">
                  <label>Max:</label>
                  <input
                    type="range"
                    min="0"
                    max="1000000"
                    step="10000"
                    value={filters.maxPrice}
                    onChange={(e) => handlePriceRangeChange('max', parseInt(e.target.value))}
                    className="price-slider"
                  />
                  <span className="price-value">{formatPrice(filters.maxPrice)}</span>
                </div>
              </div>
            </div>

            <div className="filter-actions">
              <button className="clear-filters" onClick={clearAllFilters}>
                Clear All Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;
