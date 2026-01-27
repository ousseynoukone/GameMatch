import React from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "@/context/FavoritesContext.jsx";

export default function GameCard({ game }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(game.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(game);
  };

  return (
    <Link
      to={`/detail-jeu/${game.id}`}
      className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 block"
    >
      <img
        src={game.thumbnail}
        alt={game.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold">{game.title}</h2>
          <button
            type="button"
            onClick={handleFavoriteClick}
            className="text-red-500 hover:text-red-600 text-xl"
          >
            {fav ? <i class="fa-solid fa-heart"></i> : <i class="fa-regular fa-heart"></i>}

          </button>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          {game.short_description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {game.genre}
          </span>
          <span className="text-sm font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">
            {game.platform}
          </span>
        </div>
      </div>
    </Link>
  );
}