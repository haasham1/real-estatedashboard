import React from 'react';
import { useComparison } from '../contexts/ComparisonContext';
import './ComparisonPanel.css';

const ComparisonPanel: React.FC = () => {
  const { compareList, removeFromCompare, clearCompare } = useComparison();

  if (compareList.length === 0) {
    return null;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="comparison-panel">
      <div className="comparison-header">
        <h3>Compare Properties ({compareList.length}/3)</h3>
        <button className="clear-comparison" onClick={clearCompare}>
          Clear All
        </button>
      </div>
      
      <div className="comparison-grid">
        {compareList.map((property) => (
          <div key={property.id} className="comparison-card">
            <button 
              className="remove-from-compare"
              onClick={() => removeFromCompare(property.id)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2"/>
                <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
            
            <div className="comparison-image">
              <img src={property.image} alt={property.title} />
            </div>
            
            <div className="comparison-content">
              <h4>{property.title}</h4>
              <div className="comparison-price">{formatPrice(property.price)}</div>
              
              <div className="comparison-specs">
                <div className="spec-row">
                  <span className="spec-label">Bedrooms:</span>
                  <span className="spec-value">{property.bedrooms}</span>
                </div>
                {property.bathrooms && (
                  <div className="spec-row">
                    <span className="spec-label">Bathrooms:</span>
                    <span className="spec-value">{property.bathrooms}</span>
                  </div>
                )}
                {property.sqft && (
                  <div className="spec-row">
                    <span className="spec-label">Square Feet:</span>
                    <span className="spec-value">{property.sqft.toLocaleString()}</span>
                  </div>
                )}
                <div className="spec-row">
                  <span className="spec-label">Location:</span>
                  <span className="spec-value">{property.location}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {compareList.length < 3 && (
          <div className="comparison-placeholder">
            <div className="placeholder-content">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="2"/>
                <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <p>Add property to compare</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonPanel;
