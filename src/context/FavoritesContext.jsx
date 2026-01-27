import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [hydrated, setHydrated] = useState(false); 

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites, hydrated]);

  function toggleFavorite(game) {
    setFavorites(prev => {
      const exists = prev.find(g => g.id === game.id);
      if (exists) return prev.filter(g => g.id !== game.id);
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
