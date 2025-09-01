export const logout = () => {
 
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('userToken');
  window.location.href = '/login';
};

export const registerUser = async (email, password) => {
  const res = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  return res.json();
};
