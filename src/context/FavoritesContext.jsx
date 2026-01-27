import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // 1er chargmen,t
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // SAuvegarde quand setFavorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(game) {
    setFavorites(prev => {
      const exists = prev.find(g => g.id === game.id);

      if (exists) {
        return prev.filter(g => g.id !== game.id);
      }

      return [...prev, game];
    });
  }

  function isFavorite(id) {
    return favorites.some(g => g.id === id);
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
