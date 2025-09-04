import FavoriteIcon from '@mui/icons-material/Favorite';
import useFavorites from '../hooks/useFavorites';

function MovieCard({ movie }) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  // const isFavorite = favorites.some((m) => m.id === movie.id);
  const tmdbId = String(movie.movieId || movie.id);
  const isFavorite = favorites.some((m) => String(m.movieId) === tmdbId);

  function onFavoriteClick(e) {
    e.preventDefault();
    if (isFavorite) {
      // removeFavorite(movie.id);
      removeFavorite(tmdbId);
    } else {
      addFavorite(movie);
    }
  }

  const path = movie.poster_path || movie.posterPath; // TMDB ή DB
  const imgUrl = path
    ? `https://image.tmdb.org/t/p/w500${path}`
    : "https://via.placeholder.com/500x750?text=No+Image"; 

  return (
    <div className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="movie-poster relative">
        <img
          src={imgUrl}
          alt={movie.title}
          className="w-full h-57 object-cover block"
        />
        <button
          className={`absolute top-2 right-2 p-1 rounded-full bg-white bg-opacity-75 hover:bg-opacity-100 transition ${
            isFavorite ? 'text-red-500' : 'text-gray-400'
          }`}
          onClick={onFavoriteClick}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <FavoriteIcon />
        </button>
      </div>
      <div className="p-3 movie-info">
        <h3 className="text-lg font-semibold mb-1">{movie.title}</h3>
        <p className="text-sm text-gray-500">{movie.release_date}</p>
      </div>
    </div>
  );
}

export default MovieCard;
