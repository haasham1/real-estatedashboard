import React, { useState } from 'react';
import { Property } from '../types/Property';
import { useFavorites } from '../contexts/FavoritesContext';
import { useComparison } from '../contexts/ComparisonContext';
import { useToast } from '../contexts/ToastContext';
import ContactModal from './ContactModal';
import './PropertyCard.css';

interface PropertyCardProps {
  property: Property;
  onClick: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCompare, removeFromCompare, isInCompare } = useComparison();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(property.id);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInCompare(property.id)) {
      removeFromCompare(property.id);
    } else {
      addToCompare(property);
    }
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property: ${property.title}`,
        url: window.location.href + `property/${property.id}`,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href + `property/${property.id}`);
      // You could add a toast notification here
    }
  };

  return (
    <div className="property-card" onClick={() => onClick(property)}>
      <div className="property-image">
        <img src={property.image} alt={property.title} />
        <div className="property-actions">
          <button 
            className={`action-btn favorite-btn ${isFavorite(property.id) ? 'active' : ''}`}
            onClick={handleFavoriteClick}
            title={isFavorite(property.id) ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path 
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill={isFavorite(property.id) ? '#ef4444' : 'none'}
                stroke={isFavorite(property.id) ? '#ef4444' : 'currentColor'}
                strokeWidth="2"
              />
            </svg>
          </button>
          <button 
            className={`action-btn compare-btn ${isInCompare(property.id) ? 'active' : ''}`}
            onClick={handleCompareClick}
            title={isInCompare(property.id) ? 'Remove from comparison' : 'Add to comparison'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button 
            className="action-btn share-btn"
            onClick={handleShareClick}
            title="Share property"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path 
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="property-badge">
          {property.propertyType || 'House'}
        </div>
      </div>
      <div className="property-content">
        <h3 className="property-title">{property.title}</h3>
        <div className="property-price">{formatPrice(property.price)}</div>
        <div className="property-specs">
          <div className="spec-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2"/>
              <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span>{property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}</span>
          </div>
          {property.bathrooms && (
            <div className="spec-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 6V4a2 2 0 012-2h2a2 2 0 012 2v2" stroke="currentColor" strokeWidth="2"/>
                <path d="M20 19v-8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2z" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>{property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}</span>
            </div>
          )}
          {property.sqft && (
            <div className="spec-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M9 9h6v6H9z" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>{property.sqft.toLocaleString()} sqft</span>
            </div>
          )}
        </div>
        <div className="property-location">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/>
            <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span>{property.location}</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
