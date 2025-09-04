import Favorites from './pages/Favorites';
import { useEffect } from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';
import useAuth from './hooks/useAuth';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import { FavoritesProvider } from './contexts/FavoritesContext';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './pages/Register';
import '../style.css';
import Login from './pages/Login';
import Footer from './components/footer';
// import api from './api';




function App() {
//  const token = localStorage.getItem("token");
const {token} = useAuth();

 useEffect(() => {
    // console.log("API =", api.defaults.baseURL);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* <FavoritesProvider> */}
        <NavBar />
        <main className="flex-grow p-4 pt-16 pb-16 max-w-7xl mx-auto w-full">
          <Routes>
            <Route path="/" element={ token ? <Navigate to="/home" /> : <Navigate to="/login" />} />
            <Route path='/home' element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }/>
            <Route path="/favorites" element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
              } />
            <Route path="/login" element={token ? <Navigate to="/home"/> :<Login />} />
            <Route path="/register" element={token ? <Navigate to="/home" /> : <Register />} />
            <Route path="/not-found" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      {/* </FavoritesProvider> */}
    </div>
  );

}

export default App;
