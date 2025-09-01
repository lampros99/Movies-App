const Favorite = require('../models/Favorites');

async function getFavoritesByUserId(userId) {
  return await Favorite.findAll({
    where: { userId: Number(userId) }, 
    order: [['createdAt', 'DESC']],
  });
}

async function addFavorite(userId, movieId, title, posterPath) {
  const userIdInt = Number(userId);
  const movieIdStr = String(movieId); // cast σε string

  // Έλεγχος αν υπάρχει ήδη
  const existing = await Favorite.findOne({ where: { userId: userIdInt, movieId: movieIdStr } });
  if (existing) return null;

  const fav = await Favorite.create({ userId: userIdInt, movieId: movieIdStr, title, posterPath });
  return fav;
}

async function removeFavorite(userId, movieId) {
  const userIdInt = Number(userId);
  const movieIdStr = String(movieId); // cast σε string

  await Favorite.destroy({ where: { userId: userIdInt, movieId: movieIdStr } });
  return true;
}

module.exports = { getFavoritesByUserId, addFavorite, removeFavorite };
