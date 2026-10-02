const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

export async function getPopularGames() {
  const url = `${BASE_URL}/games?key=${API_KEY}&ordering=-rating&page_size=5`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`RAWG request failed: ${response.status}`);
    }

    const data = await response.json();

    return data.results;
  } catch (error) {
    console.error('Error loading games from RAWG:', error);
    return [];
  }
}