import { Property } from '../types/Property';

const API_URL = 'https://s3.us-central-1.wasabisys.com/mashvisor-cdn/task-fe-listings.json';

export const fetchProperties = async (): Promise<Property[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch properties');
    }
    const data = await response.json();
    
    // Enhance properties with additional mock data for better interactivity
    const enhancedProperties = data.map((property: Property, index: number) => ({
      ...property,
      bathrooms: index === 0 ? 2 : 3,
      sqft: index === 0 ? 1200 : 1800,
      yearBuilt: index === 0 ? 2018 : 2015,
      propertyType: index === 0 ? 'Apartment' : 'House',
      description: index === 0 
        ? 'Beautiful modern apartment with stunning city views, updated kitchen, and premium finishes throughout.'
        : 'Spacious family home in quiet neighborhood with large backyard, updated bathrooms, and excellent schools nearby.',
      images: [
        property.image,
        'https://i.postimg.cc/Bvmy8d3Y/images-1.jpg',
        'https://i.postimg.cc/85Fy7ctc/images-2.jpg'
      ]
    }));
    
    return enhancedProperties;
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
};
