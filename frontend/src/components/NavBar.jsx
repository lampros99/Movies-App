import { Link, useNavigate, useLocation } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAuth } from "../hooks/useAuth";
import '../../style.css';

function NavBar() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  // Κρύβω ολόκληρο το NavBar σε login/register.
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return (
    <nav className="bg-indigo-600 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <div className="navbar-brand text-xl font-bold">
        <Link to="/" className="hover:text-indigo-300">Movies App</Link>
      </div>
      <div className="navbar-links flex space-x-6 items-center">
        {token && (
          <>
            <Link to="/home" className="nav-link hover:text-indigo-300">Home</Link>
            <Link to="/favorites" className="nav-link flex items-center gap-1 hover:text-indigo-300">
              <FavoriteIcon fontSize="small" /> Favorites
            </Link>
          </>
        )}
        <div className="flex gap-4 ml-auto">
          {token && user ? (
            <>
              <span>Welcome, {user.name || user.email}</span>
              <button onClick={handleLogout} className="underline">Logout</button>
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
