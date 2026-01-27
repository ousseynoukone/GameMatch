import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("favorites");
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load favorites from localStorage", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (e) {
      console.error("Failed to save favorites to localStorage", e);
    }
  }, [favorites]);

  const isFavorite = (id) => favorites.some((g) => g.id === id);

  const toggleFavorite = (game) => {
    setFavorites((prev) => {
      if (!game || !game.id) return prev;
      if (prev.some((g) => g.id === game.id)) {
        return prev.filter((g) => g.id !== game.id);
      }
      const minimal = {
        id: game.id,
        title: game.title,
        thumbnail: game.thumbnail,
        genre: game.genre,
        platform: game.platform,
        short_description: game.short_description || game.description || "",
      };
      return [...prev, minimal];
    });
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return ctx;
}

