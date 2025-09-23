import React from 'react';
import { Property } from '../types/Property';
import PropertyCard from './PropertyCard';
import './PropertyList.css';

interface PropertyListProps {
  properties: Property[];
  onPropertyClick: (property: Property) => void;
}

const PropertyList: React.FC<PropertyListProps> = ({ properties, onPropertyClick }) => {
  if (properties.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-content">
          <h3>No properties found. Try adjusting your filters.</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="property-list">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          onClick={onPropertyClick}
        />
      ))}
    </div>
  );
};

export default PropertyList;
