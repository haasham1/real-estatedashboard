import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Property } from '../types/Property';
import PriceChart from './PriceChart';
import PropertyMap from './PropertyMap';
import './PropertyDetails.css';

interface PropertyDetailsProps {
  properties: Property[];
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ properties }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const property = properties.find(p => p.id === parseInt(id || '0'));

  if (!property) {
    return (
      <div className="property-details-error">
        <h2>Property not found</h2>
        <button onClick={() => navigate('/')} className="back-button">
          Back to Properties
        </button>
      </div>
    );
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
    <div className="property-details">
      <button onClick={() => navigate('/')} className="back-button">
        ← Back to Properties
      </button>
      
      <div className="property-details-content">
        <div className="property-header">
          <div className="property-image-large">
            <img src={property.image} alt={property.title} />
          </div>
          
          <div className="property-info">
            <h1>{property.title}</h1>
            <div className="price-large">{formatPrice(property.price)}</div>
            <div className="property-specs">
              <div className="spec">
                <span className="spec-label">Bedrooms:</span>
                <span className="spec-value">{property.bedrooms}</span>
              </div>
              <div className="spec">
                <span className="spec-label">Location:</span>
                <span className="spec-value">{property.location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="property-sections">
          <div className="section">
            <h2>Price History</h2>
            <PriceChart property={property} />
          </div>
          
          <div className="section">
            <h2>Location</h2>
            <PropertyMap property={property} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
