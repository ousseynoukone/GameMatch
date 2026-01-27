let cacheAllGames = null;
const api = "https://free-to-play-games-database.p.rapidapi.com/api";
const headers = {
  "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
  "x-rapidapi-key": "8ad313d678msh75b549a9788401dp1746d2jsn218aa5b681d9",
};
const size = 20;

// Fetch all games with optional filters (no React hooks here)
async function getAllGames(genre = [], platform = "", sortBy = "") {
  let apiUrl = api + "/games";

  if (genre.length !== 0) {
    apiUrl += "?category=" + genre.join("&?category=");
  }
  if (platform) {
    apiUrl += (genre.length === 0 ? "?" : "&?") + "platform=" + platform;
  }
  if (sortBy) {
    apiUrl +=
      (genre.length === 0 && !platform ? "?" : "&?") + "sort-by=" + sortBy;
  }

  try {
    const response = await fetch(apiUrl, { headers });
    const data = await response.json();

    // Cache only the unfiltered list for search
    if (genre.length === 0 && !platform && !sortBy) {
      cacheAllGames = data;
    }

    return data;
  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
}

// Paginated games for Home (uses startIndex, platform, genre, sortBy)
export async function getGames(
  startIndex,
  genre = [],
  platform = null,
  sortBy = null
) {
  const allGames = await getAllGames(genre, platform || "", sortBy || "");
  const games = allGames.slice(startIndex, startIndex + size);
  return games;
}

export async function getGameById(id) {
  const apibyId = api + "/game?id=" + id;
  return fetch(apibyId, { headers })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error("Error fetching game by ID:", error));
}

export async function getGamesByString(str) {
  const allGames = cacheAllGames || (await getAllGames());
  const allGamesByString = [];

  allGames.forEach((game) => {
    const nameGame = game.title;
    if (nameGame.toLowerCase().includes(str.toLowerCase())) {
      allGamesByString.push(game);
    }
  });

  if (allGamesByString.length > 0) {
    return allGamesByString;
  } else {
    return null;
  }
}

