import '../css/style.css';
import { getPopularGames } from './GameData.mjs';

document.querySelector('#app').innerHTML = `
  <div class="app-layout">

    <aside class="sidebar">
      <div class="brand">
        <span class="brand-icon">G</span>
        <span>GAME FINDER</span>
      </div>

      <nav class="sidebar-nav">
        <a href="#" class="nav-item active">
          <span class="nav-icon">⌂</span>
          <span>Home</span>
        </a>

        <a href="#" class="nav-item">
          <span class="nav-icon">◎</span>
          <span>Find My Game</span>
        </a>

        <a href="#" class="nav-item">
          <span class="nav-icon">⌕</span>
          <span>Search</span>
        </a>

        <a href="#" class="nav-item">
          <span class="nav-icon">%</span>
          <span>PC Deals</span>
        </a>

        <a href="#" class="nav-item">
          <span class="nav-icon">♡</span>
          <span>My Games</span>
        </a>
      </nav>
    </aside>

    <main class="main-content">

      <header class="topbar">
        <div class="search-box">
          <span>⌕</span>
          <input
            type="search"
            id="game-search"
            placeholder="Search for a game..."
          >
        </div>

        <button class="profile-button" aria-label="Profile">
          ◉
        </button>
      </header>

      <section class="hero">
        <div class="hero-glow"></div>

        <div class="hero-content">
          <span class="hero-label">GAME DISCOVERY</span>

          <h1>
            FIND YOUR
            <span>NEXT GAME</span>
          </h1>

          <p>
            Tired of playing the same games?
            Tell us what you're in the mood for and discover
            something new.
          </p>

          <button class="primary-button">
            HELP ME FIND A GAME
            <span>→</span>
          </button>
        </div>
      </section>

      <section class="game-section">
        <div class="section-header">
          <div>
            <span class="section-label">TRENDING</span>
            <h2>Popular Right Now</h2>
          </div>

          <a href="#">View all →</a>
        </div>

        <div class="games-row" id="popular-games">
          ${createPlaceholderCards(5)}
        </div>
      </section>

      <section class="game-section">
        <div class="section-header">
          <div>
            <span class="section-label">DISCOVER</span>
            <h2>New Releases</h2>
          </div>

          <a href="#">View all →</a>
        </div>

        <div class="games-row">
          ${createPlaceholderCards(5)}
        </div>
      </section>

      <section class="game-section">
        <div class="section-header">
          <div>
            <span class="section-label">SAVE MONEY</span>
            <h2>PC Deals</h2>
          </div>

          <a href="#">View all →</a>
        </div>

        <div class="games-row">
          ${createPlaceholderCards(5)}
        </div>
      </section>

    </main>

  </div>
`;

function createPlaceholderCards(amount) {
  let cards = '';

  for (let i = 0; i < amount; i++) {
    cards += `
      <article class="game-card placeholder-card">
        <div class="placeholder-image"></div>

        <div class="game-info">
          <div class="placeholder-title"></div>
          <div class="placeholder-text"></div>
        </div>
      </article>
    `;
  }

  return cards;
}

function createGameCard(game) {
  const genres = game.genres
    .slice(0, 2)
    .map((genre) => genre.name)
    .join(' · ');

  return `
    <article class="game-card real-game-card" data-id="${game.id}">
      <div class="game-image-container">
        <img
          src="${game.background_image}"
          alt="${game.name}"
          class="game-image"
          loading="lazy"
        >

        <div class="rating">
          <span>★</span>
          ${game.rating}
        </div>
      </div>

      <div class="game-info">
        <h3>${game.name}</h3>

        <div class="game-meta">
          <span>${genres || 'Game'}</span>
          <span>${game.released?.slice(0, 4) || 'N/A'}</span>
        </div>
      </div>
    </article>
  `;
}

async function loadPopularGames() {
  const gamesContainer = document.querySelector('#popular-games');
  const games = await getPopularGames();

  if (games.length === 0) {
    gamesContainer.innerHTML = `
      <p class="error-message">
        Unable to load games right now.
      </p>
    `;
    return;
  }

  gamesContainer.innerHTML = games
    .map((game) => createGameCard(game))
    .join('');
}

loadPopularGames();