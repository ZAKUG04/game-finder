
import '../css/style.css';

import {
  getPopularGames,
  searchGames,
  getNewReleases
} from './GameData.mjs';

import {
  getFavorites,
  isFavorite,
  toggleFavorite
} from './Favorites.mjs';

// ========================================
// HELPERS
// ========================================

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return entities[char];
  });
}

function createPlaceholderCards(amount) {
  return Array.from({ length: amount }, () => `
    <article class="game-card placeholder-card">
      <div class="placeholder-image"></div>
      <div class="game-info">
        <div class="placeholder-title"></div>
        <div class="placeholder-text"></div>
      </div>
    </article>
  `).join('');
}

// ========================================
// APP LAYOUT
// ========================================

document.querySelector('#app').innerHTML = `
  <div class="app-layout">

    <aside class="sidebar">
      <div class="brand">
        <span class="brand-icon">G</span>
        <span>GAME FINDER</span>
      </div>

      <nav class="sidebar-nav">
        <a href="#home" class="nav-item active" id="home-link">
          <span class="nav-icon">⌂</span>
          <span>Home</span>
        </a>

        <a href="#find-my-game" class="nav-item" id="find-game-link">
          <span class="nav-icon">◎</span>
          <span>Find My Game</span>
        </a>

        <a href="#search" class="nav-item" id="search-link">
          <span class="nav-icon">⌕</span>
          <span>Search</span>
        </a>

        <a href="#deals" class="nav-item" id="deals-link">
          <span class="nav-icon">%</span>
          <span>PC Deals</span>
        </a>

        <a href="#my-games" class="nav-item" id="my-games-link">
          <span class="nav-icon">♡</span>
          <span>My Games</span>
        </a>
      </nav>

      <div class="sidebar-footer">
        <span class="sidebar-footer-dot"></span>
        YOUR NEXT ADVENTURE AWAITS
      </div>
    </aside>

    <main class="main-content">

      <header class="topbar">
        <div class="search-box">
          <span>⌕</span>
          <input
            type="search"
            id="game-search"
            placeholder="Search for a game..."
            aria-label="Search for a game"
          >
        </div>

        <div class="topbar-label">DISCOVER YOUR WORLD</div>

        <button class="profile-button" type="button"
          aria-label="Profile">
          ◉
        </button>
      </header>

      <!-- HOME -->

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
            Discover new adventures and build your
            personal gaming universe.
          </p>

          <button class="primary-button" type="button"
            id="hero-search-button">
            EXPLORE GAMES
            <span>→</span>
          </button>
        </div>

        <div class="hero-decoration" aria-hidden="true">G</div>
      </section>

      <section class="game-section" id="popular-section">
        <div class="section-header">
          <div>
            <span class="section-label">TRENDING NOW</span>
            <h2>Popular Right Now</h2>
          </div>
          <span class="section-decoration">✦ DISCOVER</span>
        </div>

        <div class="games-row" id="popular-games">
          ${createPlaceholderCards(5)}
        </div>
      </section>

      <section class="game-section" id="new-releases-section">
        <div class="section-header">
          <div>
            <span class="section-label">FRESH ADVENTURES</span>
            <h2>New Releases</h2>
          </div>
        </div>

        <div class="games-row" id="new-releases">
          ${createPlaceholderCards(5)}
        </div>
      </section>

      <section class="game-section" id="deals-section">
        <div class="section-header">
          <div>
            <span class="section-label">SAVE MONEY</span>
            <h2>PC Deals</h2>
          </div>
          <span class="coming-soon-label">COMING SOON</span>
        </div>

        <div class="games-row">
          ${createPlaceholderCards(5)}
        </div>
      </section>

      <!-- MY GAMES LIBRARY -->

      <section class="my-games-page" id="my-games-page" hidden>
        <div class="my-games-atmosphere"></div>

        <div class="my-games-content">

          <div class="library-heading">
            <div class="library-heading-copy">
              <span class="section-label">
                YOUR PERSONAL UNIVERSE
              </span>

              <h1>My <span>Library.</span></h1>

              <p>
                Your favorite worlds, all in one place.
              </p>
            </div>

            <div class="library-heading-actions">
              <span class="library-status">
                <span class="status-dot"></span>
                PERSONAL COLLECTION
              </span>

              <button class="customize-button" disabled>
                ✦ Customize
                <span>SOON</span>
              </button>
            </div>
          </div>

          <div class="library-showcase">

            <div class="library-section-heading">
              <div>
                <span class="section-label">
                  THE COLLECTION
                </span>

                <h2>Choose your next adventure</h2>
              </div>

              <span class="library-hint">
                SELECT A GAME TO EXPLORE
              </span>
            </div>

            <div id="favorites-carousel"></div>

            <div id="selected-game-info"></div>

          </div>

          <div class="library-dashboard">

            <div class="dashboard-panel">
              <div class="dashboard-panel-heading">
                <span class="section-label">
                  YOUR JOURNEY
                </span>
                <h2>Game Progress</h2>
              </div>

              <p>
                Your adventures deserve their own story.
              </p>

              <div class="progress-preview">
                <div class="progress-preview-icon">◈</div>

                <div>
                  <strong>Progress tracking</strong>
                  <span>
                    Track your gaming journey soon.
                  </span>
                </div>

                <span class="panel-tag">SOON</span>
              </div>
            </div>

            <div class="dashboard-panel">
              <div class="dashboard-panel-heading">
                <span class="section-label">
                  STAY CONNECTED
                </span>
                <h2>Gaming News</h2>
              </div>

              <p>
                What's happening in the gaming world?
              </p>

              <div class="news-preview">
                <div class="news-preview-icon">✦</div>

                <div>
                  <strong>More adventures incoming</strong>
                  <span>
                    Gaming updates are coming soon.
                  </span>
                </div>

                <span class="panel-tag">SOON</span>
              </div>
            </div>

          </div>

          <div class="library-bottom-note">
            ✦ EVERY GREAT GAME HAS A STORY
          </div>

        </div>
      </section>

    </main>
  </div>
`;

// ========================================
// GAME CARDS
// ========================================

function createGameCard(game) {
  const genres = (game.genres || [])
    .slice(0, 2)
    .map((genre) => genre.name)
    .join(' · ');

  const favorite = isFavorite(game.id);

  const name = escapeHTML(game.name);
  const image = escapeHTML(game.background_image || '');
  const rating = escapeHTML(game.rating ?? 'N/A');
  const year = escapeHTML(
    game.released?.slice(0, 4) || 'N/A'
  );

  return `
    <article
      class="game-card real-game-card"
      data-id="${escapeHTML(game.id)}"
    >
      <div class="game-image-container">
        <img
          src="${image}"
          alt="${name}"
          class="game-image"
          loading="lazy"
        >

        <div class="rating">
          <span>★</span> ${rating}
        </div>

        <button
          class="favorite-button ${favorite ? 'is-favorite' : ''}"
          type="button"
          data-favorite-id="${escapeHTML(game.id)}"
          aria-label="Toggle favorite for ${name}"
          aria-pressed="${favorite}"
        >
          ${favorite ? '♥' : '♡'}
        </button>
      </div>

      <div class="game-info">
        <h3>${name}</h3>

        <div class="game-meta">
          <span>${escapeHTML(genres || 'Game')}</span>
          <span>${year}</span>
        </div>
      </div>
    </article>
  `;
}

// ========================================
// POPULAR GAMES
// ========================================

const popularContainer =
  document.querySelector('#popular-games');

let searchRequestId = 0;

async function loadPopularGames() {
  const requestId = ++searchRequestId;

  try {
    const games = await getPopularGames();

    if (requestId !== searchRequestId) return;

    popularContainer.innerHTML = games.length
      ? games.map(createGameCard).join('')
      : '<p class="error-message">No games available.</p>';
  } catch (error) {
    if (requestId !== searchRequestId) return;

    console.error('Popular games error:', error);

    popularContainer.innerHTML =
      '<p class="error-message">Unable to load games.</p>';
  }
}

// ========================================
// SEARCH
// ========================================

const searchInput =
  document.querySelector('#game-search');

async function handleGameSearch(query) {
  const searchTerm = query.trim();

  if (!searchTerm) {
    await loadPopularGames();
    return;
  }

  const requestId = ++searchRequestId;

  popularContainer.innerHTML =
    '<p class="loading-message">Searching games...</p>';

  try {
    const games = await searchGames(searchTerm);

    if (requestId !== searchRequestId) return;

    popularContainer.innerHTML = games.length
      ? games.map(createGameCard).join('')
      : '<p class="error-message">No games found.</p>';
  } catch (error) {
    if (requestId !== searchRequestId) return;

    console.error('Search error:', error);

    popularContainer.innerHTML =
      '<p class="error-message">Unable to search games.</p>';
  }
}

// ========================================
// NEW RELEASES
// ========================================

async function loadNewReleases() {
  const container =
    document.querySelector('#new-releases');

  try {
    const games = await getNewReleases();

    container.innerHTML = games.length
      ? games.map(createGameCard).join('')
      : '<p class="error-message">No releases available.</p>';
  } catch (error) {
    console.error('New releases error:', error);

    container.innerHTML =
      '<p class="error-message">Unable to load releases.</p>';
  }
}

// ========================================
// PAGE NAVIGATION
// ========================================

const homeLink =
  document.querySelector('#home-link');

const myGamesLink =
  document.querySelector('#my-games-link');

const searchLink =
  document.querySelector('#search-link');

const findGameLink =
  document.querySelector('#find-game-link');

const dealsLink =
  document.querySelector('#deals-link');

const myGamesPage =
  document.querySelector('#my-games-page');

const homeSections =
  document.querySelectorAll('.hero, .game-section');

function setActiveNavigation(activeLink) {
  document.querySelectorAll('.nav-item')
    .forEach((item) => item.classList.remove('active'));

  activeLink.classList.add('active');
}

function showHome() {
  homeSections.forEach((section) => {
    section.hidden = false;
  });

  myGamesPage.hidden = true;
  setActiveNavigation(homeLink);
}

function showMyGames() {
  homeSections.forEach((section) => {
    section.hidden = true;
  });

  myGamesPage.hidden = false;
  setActiveNavigation(myGamesLink);

  renderFavoritesCarousel();
}

homeLink.addEventListener('click', (event) => {
  event.preventDefault();
  showHome();
});

myGamesLink.addEventListener('click', (event) => {
  event.preventDefault();
  showMyGames();
});

searchLink.addEventListener('click', (event) => {
  event.preventDefault();
  showHome();
  searchInput.focus();
});

findGameLink.addEventListener('click', (event) => {
  event.preventDefault();
  showHome();
  searchInput.focus();
});

dealsLink.addEventListener('click', (event) => {
  event.preventDefault();
  showHome();

  document.querySelector('#deals-section')
    .scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('#hero-search-button')
  .addEventListener('click', () => {
    searchInput.focus();
  });

searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    showHome();
    handleGameSearch(searchInput.value);
  }
});

// ========================================
// FAVORITES
// ========================================

document.addEventListener('click', async (event) => {
  const button =
    event.target.closest('.favorite-button');

  if (!button || button.disabled) return;

  const gameCard = button.closest('.game-card');
  if (!gameCard) return;

  const gameId = gameCard.dataset.id;

  button.disabled = true;

  try {
    const savedGame = getFavorites().find(
      (game) => String(game.id) === String(gameId)
    );

    let game = savedGame;

    if (!game) {
      const url = new URL(
        `https://api.rawg.io/api/games/${encodeURIComponent(gameId)}`
      );

      url.searchParams.set(
        'key',
        import.meta.env.VITE_RAWG_API_KEY
      );

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Unable to load game details');
      }

      game = await response.json();
    }

    const added = toggleFavorite(game);

    document.querySelectorAll('.favorite-button')
      .forEach((favoriteButton) => {
        if (
          favoriteButton.dataset.favoriteId === String(gameId)
        ) {
          favoriteButton.classList.toggle(
            'is-favorite',
            added
          );

          favoriteButton.textContent =
            added ? '♥' : '♡';

          favoriteButton.setAttribute(
            'aria-pressed',
            String(added)
          );
        }
      });

    if (!myGamesPage.hidden) {
      renderFavoritesCarousel();
    }
  } catch (error) {
    console.error('Favorite error:', error);
  } finally {
    button.disabled = false;
  }
});

// ========================================
// GAMING LIBRARY CAROUSEL
// ========================================

let activeGameIndex = 0;

function getCarouselOffset(index, activeIndex, total) {
  let offset = index - activeIndex;

  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;

  return offset;
}

function updateSelectedGame() {
  const container =
    document.querySelector('#selected-game-info');

  const favorites = getFavorites();

  if (!container) return;

  if (favorites.length === 0) {
    container.innerHTML = '';
    return;
  }

  const game = favorites[activeGameIndex];

  if (!game) return;

  const genres = (game.genres || [])
    .slice(0, 3)
    .map((genre) => genre.name)
    .join(' · ');

  const rating = escapeHTML(game.rating ?? 'N/A');

  const year = escapeHTML(
    game.released?.slice(0, 4) || 'N/A'
  );

  container.innerHTML = `
    <div class="selected-game">
      <div class="selected-game-copy">
        <span class="selected-eyebrow">
          ✦ SELECTED ADVENTURE
        </span>

        <h3>${escapeHTML(game.name)}</h3>

        <p>
          ${escapeHTML(genres || 'Your saved adventure')}
        </p>
      </div>

      <div class="selected-game-meta">
        <span class="selected-rating">
          ★ ${rating}
        </span>

        <span class="selected-year">
          ${year}
        </span>
      </div>
    </div>
  `;
}

function updateCarouselPositions() {
  const favorites = getFavorites();
  const total = favorites.length;

  if (!total) return;

  const cards = document.querySelectorAll(
    '#favorites-carousel .carousel-game'
  );

  cards.forEach((card) => {
    const index = Number(card.dataset.index);

    const offset = getCarouselOffset(
      index,
      activeGameIndex,
      total
    );

    const distance = Math.abs(offset);

    card.style.setProperty('--offset', offset);
    card.style.setProperty('--distance', distance);

    card.dataset.active = String(offset === 0);

    card.setAttribute(
      'aria-pressed',
      String(offset === 0)
    );

    card.setAttribute(
      'aria-label',
      `${card.dataset.name}${offset === 0 ? ', selected' : ''}`
    );
  });

  const counter = document.querySelector(
    '#favorites-carousel .carousel-counter'
  );

  if (counter) {
    counter.innerHTML = `
      ${String(activeGameIndex + 1).padStart(2, '0')}
      <span>/</span>
      ${String(total).padStart(2, '0')}
    `;
  }

  updateSelectedGame();
}

function renderFavoritesCarousel() {
  const container =
    document.querySelector('#favorites-carousel');

  const favorites = getFavorites();

  if (!container) return;

  if (favorites.length === 0) {
    container.innerHTML = `
      <div class="empty-collection">
        <span class="empty-icon">♡</span>

        <h3>Your adventure starts here</h3>

        <p>
          Save your favorite games from Home
          to build your personal library.
        </p>
      </div>
    `;

    updateSelectedGame();
    return;
  }

  activeGameIndex =
    ((activeGameIndex % favorites.length) + favorites.length)
    % favorites.length;

  const cards = favorites.map((game, index) => {
    const offset = getCarouselOffset(
      index,
      activeGameIndex,
      favorites.length
    );

    const name = escapeHTML(
      game.name || 'Unknown Game'
    );

    const image = escapeHTML(
      game.background_image || ''
    );

    return `
      <button
        class="carousel-game"
        type="button"
        data-index="${index}"
        data-name="${name}"
        data-active="${offset === 0}"
        style="
          --offset: ${offset};
          --distance: ${Math.abs(offset)};
        "
        aria-label="Select ${name}"
        aria-pressed="${offset === 0}"
      >
        <img
          src="${image}"
          alt="${name}"
          loading="lazy"
        >

        <span class="carousel-game-title">
          ${name}
        </span>
      </button>
    `;
  }).join('');

  container.innerHTML = `
    <div class="favorites-stage">
      ${cards}
    </div>

    <div class="carousel-controls">
      <button
        id="carousel-prev"
        type="button"
        aria-label="Previous game"
      >
        ❮
      </button>

      <span class="carousel-counter"></span>

      <button
        id="carousel-next"
        type="button"
        aria-label="Next game"
      >
        ❯
      </button>
    </div>
  `;

  updateCarouselPositions();
}

function moveFavoritesCarousel(direction) {
  const favorites = getFavorites();

  if (favorites.length < 2) return;

  activeGameIndex =
    (activeGameIndex + direction + favorites.length)
    % favorites.length;

  updateCarouselPositions();
}

// ========================================
// CAROUSEL EVENTS
// ========================================

document.addEventListener('click', (event) => {
  const favorites = getFavorites();

  if (!favorites.length) return;

  if (event.target.closest('#carousel-prev')) {
    moveFavoritesCarousel(-1);
    return;
  }

  if (event.target.closest('#carousel-next')) {
    moveFavoritesCarousel(1);
    return;
  }

  const card = event.target.closest('.carousel-game');

  if (card) {
    const selectedIndex = Number(card.dataset.index);

    const offset = getCarouselOffset(
      selectedIndex,
      activeGameIndex,
      favorites.length
    );

    if (offset !== 0) {
      moveFavoritesCarousel(offset);
    }
  }
});

// ========================================
// INITIALIZATION
// ========================================

loadPopularGames();
loadNewReleases();
