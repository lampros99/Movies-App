import { Navigate} from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const DEMO = import.meta.env.VITE_DEMO === 'true';

  const token = localStorage.getItem("token");
  if(!DEMO && !token){
    return <Navigate to="/login" replace />
  }
  
  return children;
};


export default ProtectedRoute;