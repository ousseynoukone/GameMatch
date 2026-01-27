import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGameById } from "@/lib/get_games";
import { useFavorites } from "@/context/FavoritesContext.jsx";

export default function GameDetail() {
  const { jeuId } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const data = await getGameById(jeuId);
        if (!data || data.status === 0) {
          setError("Game not found.");
        } else {
          setGame(data);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load game details.");
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [jeuId]);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading game details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (!game) {
    return null;
  }

  const fav = isFavorite(game.id);
  const handleFavoriteClick = () => toggleFavorite(game);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full md:w-1/2 rounded-lg shadow-md object-cover"
        />
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl font-bold">{game.title}</h1>
            <button
              type="button"
              onClick={handleFavoriteClick}
              className="text-red-500 hover:text-red-600 text-2xl"
            >
              {fav ? <i class="fa-solid fa-heart"></i> : <i class="fa-regular fa-heart"></i>}
            </button>
          </div>
          <p className="text-sm text-gray-600">{game.short_description}</p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {game.genre}
            </span>
            <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">
              {game.platform}
            </span>
            {game.publisher && (
              <span className="text-xs font-medium bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                {game.publisher}
              </span>
            )}
          </div>
          {game.release_date && (
            <p className="text-xs text-gray-500">
              Release date: {game.release_date}
            </p>
          )}
          {game.description && (
            <p className="text-sm text-gray-700 mt-4 whitespace-pre-line">
              {game.description}
            </p>
          )}
          {game.game_url && (
            <a
              href={game.game_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 mt-4"
            >
              Play / View on site
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

