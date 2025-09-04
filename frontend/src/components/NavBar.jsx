import { Link, useNavigate, useLocation } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAuth } from "../hooks/useAuth";
import '../../style.css';

function NavBar() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const DOCS_URL = `${import.meta.env.VITE_API_URL}/api-docs`;

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  // Κρύβω ολόκληρο το NavBar σε login/register.
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-indigo-600 text-white px-6 h-14 flex items-center justify-between shadow-md z-50">
      <div className="navbar-brand text-xl font-bold">
        <Link to="/" className="hover:text-indigo-300">Movies App</Link>
      </div>
      <div className="navbar-links flex items-center gap-6">
        {token && (
          <>
            <Link to="/home" className="nav-link hover:text-indigo-300">Home</Link>
            <Link to="/favorites" className="nav-link flex items-center gap-1 hover:text-indigo-300">
              <FavoriteIcon fontSize="small" /> Favorites
            </Link>
          </>
        )}
        <div className="flex items-center gap-5 ml-auto">
          {token && user ? (
            <>
              <span className="leading-none">Welcome, {user.name || user.email}</span>
              <button onClick={handleLogout}
               className="inline-flex items-center justify-center h-8 px-3 rounded-md
                           bg-red-600 hover:bg-red-500 text-white text-sm font-medium
                           shadow transition duration-200">
                Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
