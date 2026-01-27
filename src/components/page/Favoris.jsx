import { Link } from "react-router-dom";
import { useFavorites } from "@/context/FavoritesContext.jsx";

export default function Favoris() {
  const { favorites } = useFavorites();

  if (!favorites.length) {
    return (
      <div className="p-6 text-center text-gray-500">
        You have no favorite games yet.
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your favorite games</h1>
      <div className="grid grid-cols-3 gap-6">
        {favorites.map((game) => (
          <Link
            key={game.id}
            to={`/detail-jeu/${game.id}`}
            className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 block"
          >
            <img
              src={game.thumbnail}
              alt={game.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{game.title}</h2>
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
        ))}
      </div>
    </div>
  );
}

