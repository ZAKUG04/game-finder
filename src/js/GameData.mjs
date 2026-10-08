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
  export async function searchGames(query) {
  const url = new URL(`${BASE_URL}/games`);

  url.searchParams.set('key', API_KEY);
  url.searchParams.set('search', query);
  url.searchParams.set('page_size', '12');

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`RAWG request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.results ?? [];
  } catch (error) {
    console.error('Error searching games:', error);
    throw error;
  }
}
export async function getNewReleases() {
  const today = new Date();
  const monthAgo = new Date();

  monthAgo.setMonth(today.getMonth() - 1);

  const startDate = monthAgo.toISOString().split('T')[0];
  const endDate = today.toISOString().split('T')[0];

  const url = new URL(`${BASE_URL}/games`);

  url.searchParams.set('key', API_KEY);
  url.searchParams.set('dates', `${startDate},${endDate}`);
  url.searchParams.set('ordering', '-released');
  url.searchParams.set('page_size', '5');

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`RAWG request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.results ?? [];
  } catch (error) {
    console.error('Error loading new releases:', error);
    return [];
  }
}