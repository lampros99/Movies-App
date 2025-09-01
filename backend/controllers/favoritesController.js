const Favorite = require('../models/Favorites');
const { toFavoriteDTO, toFavoritesDTO } = require('../dtos/favorite.dto');

// GET /api/favorites
const getFavorites = async (req, res) => {
  try {
    const userId = Number(req.user.id);
    if (!userId) return res.status(400).json({ error: 'Invalid user id' });

    const favorites = await Favorite.findAll({
      where: { userId },
      order: [['created_at', 'DESC']],
    });

    res.json(toFavoritesDTO(favorites));
  } catch (err) {
    console.error('getFavorites error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// POST /api/favorites
const postFavorite = async (req, res) => {
  try {
    const userId = Number(req.user.id);
    if (!userId) return res.status(400).json({ error: 'Invalid user id' });

    const { movieId, title, posterPath = null } = req.validated?.body ?? req.body;

    const [fav, created] = await Favorite.findOrCreate({
      where: { userId, movieId },
      defaults: { title, posterPath },
    });

    return res.status(created ? 201 : 200).json(toFavoriteDTO(fav));
  } catch (err) {
    console.error('postFavorite error:', err);

    if (err.name === 'SequelizeUniqueConstraintError') {
      try {
        const userId = Number(req.user.id);
        const { movieId } = req.validated?.body ?? req.body;
        const existing = await Favorite.findOne({ where: { userId, movieId } });
        if (existing) return res.status(200).json(toFavoriteDTO(existing));
      } catch (_) {}
    }

    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE /api/favorites/:movieId
const deleteFavorite = async (req, res) => {
  try {
    const userId = Number(req.user.id);
    if (!userId) return res.status(400).json({ error: 'Invalid user id' });

    const { movieId } = req.validated?.params ?? req.params;

    const deleted = await Favorite.destroy({ where: { userId, movieId } });
    if (!deleted) return res.status(404).json({ message: 'Favorite not found' });

    res.json({ message: 'Removed' });
  } catch (err) {
    console.error('deleteFavorite error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getFavorites, postFavorite, deleteFavorite };
