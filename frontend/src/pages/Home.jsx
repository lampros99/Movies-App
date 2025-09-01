import MovieCard from "../components/MovieCard";
import { useState, useEffect } from 'react';
import { searchMovies, getPopularMovies } from "../services/api"; 
import '../../style.css';

function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { 
       const token = localStorage.getItem("token");
       if (!token) return;
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies); // <-- TMDb επιστρέφει {results: [...]}
            } catch (err) {
                console.error("Failed to fetch popular movies:", err);
                setError("Failed to load movies. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        loadPopularMovies();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!searchQuery.trim() || loading) return;

        setLoading(true);

        if(loading) return; 
        setSearchQuery(''); 
        
        try {
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);
        } catch (err) {
            console.error("Search failed:", err);
            setError("Failed to search movies. Please try again later.");
        } finally { 
            setLoading(false);
        }
    };

   return (
    <div className="home p-6">
      <form onSubmit={handleSearch} className="flex mb-6 gap-2">
        <input 
          type="text"
          placeholder="Search for movies..." 
          className="flex-grow border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        /> 
        <button 
          type="submit" 
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          disabled={loading}
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies && movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          !loading && <p className="text-center text-gray-600">No movies found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
