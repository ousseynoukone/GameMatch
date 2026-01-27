import { useRef } from "react";

let cacheAllGames = null;
const api = "https://free-to-play-games-database.p.rapidapi.com/api";
const headers = {
    "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    "x-rapidapi-key": "8ad313d678msh75b549a9788401dp1746d2jsn218aa5b681d9"
};
const size = 20;

function getAllGames(API) {
    return fetch(API + "/games", { headers })
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.error("Error fetching games:", error));
}

export async function getGames(startIndex) {
    // Si le cache est vide, on remplit la variable globale
    if (!cacheAllGames) {
        cacheAllGames = await getAllGames(api);
    }

    if (!cacheAllGames || cacheAllGames.length === 0) {
        return [];
    }

    // Extraction des jeux
    const games = cacheAllGames.slice(startIndex, startIndex + size);
    return games;
}

export async function getGameById(id) {
    const apibyId = api + "/game?id=" + id;
    return fetch(apibyId, { headers })
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.error("Error fetching game by ID:", error));
}