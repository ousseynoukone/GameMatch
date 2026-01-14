import { useRef } from "react";

let cacheAllGames = null;

function getAllGames(API) {
    return fetch(API)
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.error("Error fetching games:", error));
}

export async function getGames(startIndex) {
    const api = "api/games";
    const size = 20;

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