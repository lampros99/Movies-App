import api from '../api';

export const getFavorites = async () => {
  const res = await api.get('/api/favorites');
  return res.data;
};

export const addFavorite = async (movie) => {
  const res = await api.post('/api/favorites', movie);
  return res.data;
};

export const removeFavorite = async (id) => {
  await api.delete(`/api/favorites/${id}`);
};
