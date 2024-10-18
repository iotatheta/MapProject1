import React, { useState } from 'react';
import { fetchPopularPlaces } from './PlaceService';
import { fetchWikipediaDescription } from './WikipediaService';
import MapComponent from './MapComponent';

const PopularPlaces = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLocationSelect = async ({ lat, lng }) => {
    setLoading(true);
    try {
      // Fetch places using Overpass API
      const placesData = await fetchPopularPlaces(lat, lng);
      
      // For each place, fetch Wikipedia description
      const placesWithDescription = await Promise.all(
        placesData.map(async (place) => {
          const description = await fetchWikipediaDescription(place.name);
          return { ...place, description };
        })
      );
      setPlaces(placesWithDescription);
    } catch (error) {
      console.error('Error fetching places or descriptions:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Popular Places Nearby</h1>
      <h3>Choose the location from the map to get the result</h3>
      <MapComponent onLocationSelect={handleLocationSelect} />
      {loading && <p>Loading...</p>}
      <ul>
        {places.map((place) => (
          <li key={place.id}>
            <h3>{place.name}</h3>
            <p>Category: {place.category}</p>
            <p>{place.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularPlaces;
