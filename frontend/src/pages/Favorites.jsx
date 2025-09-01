import React, { useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import '../../style.css';
import useFavorites from '../hooks/useFavorites';
function Favorites() {
  const {favorites, fetchFavorites} = useFavorites();

  useEffect(() => {
    document.title = "Favorites | Movies App";
    fetchFavorites();
  }, [fetchFavorites]);

  if (favorites && favorites.length > 0) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Your Favorite Movies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 text-center text-gray-600">
      <h1 className="text-xl font-semibold mb-2">No Favorite Movies Yet</h1>
      <p>Start adding movies to your favorites and they will appear here</p>
    </div>
  );
}

export default Favorites;
