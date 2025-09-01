import axios from 'axios';

const API_URL = 'http://localhost:5000/api/favorites';

export const getFavorites = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const addFavorite = async (movie, token) => {
  const res = await axios.post(API_URL, movie, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const removeFavorite = async (id, token) => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
