import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import RegisterForm from '../components/RegisterForm';

function Register() {
  useEffect(() => {
    document.title = "Register | Movies App";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col gap-4 p-8 rounded-2xl shadow-lg w-full max-w-sm bg-white">
        <h1 className="text-2xl font-semibold text-center text-indigo-600 mb-6">
          Create Account
        </h1>
        <RegisterForm />
        <p className="text-center text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-indigo-600 hover:text-indigo-800 font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;