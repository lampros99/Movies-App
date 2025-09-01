import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

// eslint-disable-next-line react-refresh/only-export-components
export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [favorites, setFavorites] = useState([]);

  // Φέρνω τα favorites από το backend
  const fetchFavorites = useCallback(async () => {
    if (!token) return;
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const res = await axios.get(`${apiUrl}/api/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites(res.data || []);
    } catch (err) {
      console.error("Error fetching favorites:", err);
    }
  }, [token]);

  useEffect(() => {
    if (user && token) {
      fetchFavorites();
    } else {
      setFavorites([]);
    }
  }, [user, token, fetchFavorites]);

  // Προσθήκη favorite
  const addFavorite = async (movie) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const movieId = String(movie.id);                     // ✅ στείλ’ το ως string
      const poster = movie.poster_path || movie.posterPath; // ✅ μπορεί να λείπει
      const data = poster
        ? { movieId, title: movie.title, posterPath: poster }
        : { movieId, title: movie.title };

      const res = await axios.post(`${apiUrl}/api/favorites`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data) {
        setFavorites((prev) => {
          // Αποφυγή διπλοεγγραφής με βάση το movieId
          const exists = prev.some(
            (m) => String(m.movieId) === String(res.data.movieId)
          );
          return exists ? prev : [res.data, ...prev];
        });
      }
    } catch (err) {
      // console.error("Error adding favorite:", err);
      console.error("Error adding favorite:", err.response?.data || err);
    }
  };

  // Αφαίρεση favorite
  const removeFavorite = async (movieId) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      await axios.delete(`${apiUrl}/api/favorites/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Φιλτράρισμα με βάση το TMDB id (movieId), όχι το auto id της DB
      setFavorites((prev) =>
        prev.filter((m) => String(m.movieId) !== String(movieId))
      );
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, fetchFavorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
