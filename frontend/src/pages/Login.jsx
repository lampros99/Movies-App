import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import useAuth from '../hooks/useAuth';
import '../../style.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login | Movies App";
  }, []);

  // Δέχεται το data από το LoginForm και αποθηκεύει το token αν υπάρχει
  const handleLogin = (data) => {
    if (data?.token) {
      login(data.user, data.token)
    }
    navigate('/');
  };

  const handleGoogleLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/');
  };

  return (
    <div className="home min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-20">
      <div className="flex flex-col gap-6 p-8 sm:p-10 rounded-3xl shadow-xl w-full max-w-sm bg-white">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-indigo-600 mb-6">
          Movies App
        </h1>

        {/* Login Form */} 
        <LoginForm onLogin={handleLogin} />

        {/* Separator */}
        <div className="flex items-center justify-center my-2">
          <span className="text-gray-400 font-medium">or</span>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="bg-red-600 text-white px-5 py-3 rounded-lg hover:bg-red-700 transition-all w-full font-semibold shadow-md"
        >
          Login with Google
        </button>

        {/* Sign up link */}
        <p className="text-center mt-6 text-gray-500 text-sm sm:text-base">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-indigo-600 hover:text-indigo-800 font-semibold"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;