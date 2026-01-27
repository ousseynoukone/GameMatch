import { useRef } from "react";

let cacheAllGames = null;
const api = "api/games";
const size = 20;

function getAllGames(API) {
    return fetch(API)
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
    apibyId = "api/game?id=" + id
    return fetch(apibyId)
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.error("Error fetching game by ID:", error));
}