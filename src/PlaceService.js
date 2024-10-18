import axios from 'axios';

// Function to fetch nearby popular places using Overpass API
export const fetchPopularPlaces = async (lat, lng) => {
  const query = `
    [out:json];
    (
      node["tourism"="attraction"](around:1500,${lat},${lng});
      node["amenity"="restaurant"](around:1500,${lat},${lng});
      node["amenity"="cafe"](around:1500,${lat},${lng});
      node["leisure"="park"](around:1500,${lat},${lng});
    );
    out body;
  `;

  const response = await axios.post('https://overpass-api.de/api/interpreter', query, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return response.data.elements.map((place) => ({
    id: place.id,
    name: place.tags.name || 'Unknown Place',
    lat: place.lat,
    lon: place.lon,
    category: place.tags.tourism || place.tags.amenity || place.tags.leisure || 'Unknown Category',
  }));
};
