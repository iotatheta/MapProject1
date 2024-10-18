import axios from 'axios';

export const fetchWikipediaDescription = async (placeName) => {
  try {
    const response = await axios.get(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${placeName}`
    );

    if (response.data.extract) {
      return response.data.extract;
    } else {
      return 'No description available';
    }
  } catch (error) {
    console.error(`Error fetching Wikipedia description for ${placeName}:`, error);
    return 'No description available';
  }
};
