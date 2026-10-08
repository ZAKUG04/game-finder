const FAVORITES_KEY = 'game-finder-favorites';

export function getFavorites() {
  try {
    return JSON.parse(
      localStorage.getItem(FAVORITES_KEY)
    ) || [];
  } catch (error) {
    console.error('Error reading favorites:', error);
    return [];
  }
}

export function isFavorite(gameId) {
  return getFavorites().some(
    (game) => String(game.id) === String(gameId)
  );
}

export function toggleFavorite(game) {
  const favorites = getFavorites();

  const exists = favorites.some(
    (item) => String(item.id) === String(game.id)
  );

  const updatedFavorites = exists
    ? favorites.filter(
        (item) => String(item.id) !== String(game.id)
      )
    : [...favorites, game];

  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(updatedFavorites)
  );

  return !exists;
}