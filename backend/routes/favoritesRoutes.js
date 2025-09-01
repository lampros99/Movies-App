const express = require('express');
const { getFavorites, postFavorite, deleteFavorite } = require('../controllers/favoritesController');
const authenticateToken = require('../middleware/auth'); // όπως ήδη το έχεις
const validate = require('../middleware/validate');
const { AddFavoriteDTO, DeleteFavoriteParamsDTO } = require('../dtos/favorite.dto.js');

const router = express.Router();

router.get('/', authenticateToken, getFavorites);
router.post('/', authenticateToken, validate(AddFavoriteDTO, 'body'), postFavorite);
router.delete('/:movieId', authenticateToken, validate(DeleteFavoriteParamsDTO, 'params'), deleteFavorite);

module.exports = router;
