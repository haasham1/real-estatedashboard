import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Property } from '../types/Property';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface PropertyMapProps {
  property: Property;
}

const PropertyMap: React.FC<PropertyMapProps> = ({ property }) => {
  // Mock coordinates based on location for demonstration
  const getCoordinates = (location: string) => {
    const locationMap: { [key: string]: [number, number] } = {
      'Downtown': [40.7589, -73.9851], // NYC Downtown
      'Suburbs': [40.7282, -73.7949], // NYC Suburbs
      'Midtown': [40.7549, -73.9840], // NYC Midtown
      'Brooklyn': [40.6782, -73.9442], // Brooklyn
      'Queens': [40.7282, -73.7949], // Queens
    };
    
    return locationMap[location] || [40.7589, -73.9851]; // Default to NYC
  };

  const [lat, lng] = getCoordinates(property.location);

  return (
    <div style={{ height: '300px', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
          <Popup>
            <div>
              <strong>{property.title}</strong><br />
              {property.location}<br />
              ${property.price.toLocaleString()}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default PropertyMap;
