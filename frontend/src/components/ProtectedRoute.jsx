// import { Navigate} from 'react-router-dom';
// // import { useAuth } from '../contexts/AuthContext';

// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem("token");
//   if(!token){
//     return <Navigate to="/login" replace />
//   }
  
//   return children;
// };


// export default ProtectedRoute;

import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();   // από το context, ΟΧΙ από localStorage
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
