const { z } = require('zod');

const AddFavoriteDTO = z.object({
  movieId: z.string().min(1, 'movieId is required'),
  title: z.string().min(1, 'title is required'),
  posterPath: z.string().optional().nullable(),
});

const DeleteFavoriteParamsDTO = z.object({
  movieId: z.string().min(1, 'movieId param is required'),
});

// RESPONSE DTO mapper (επιστρέφουμε σταθερό shape)
function toFavoriteDTO(fav) {
  const plain = typeof fav.toJSON === 'function' ? fav.toJSON() : fav;
  return {
    id: plain.id,
    movieId: plain.movieId,         // έρχεται από field 'movie_id' μέσω model
    title: plain.title,
    posterPath: plain.posterPath ?? null,
    userId: plain.userId,
    createdAt: plain.created_at ?? plain.createdAt ?? null,
    updatedAt: plain.updated_at ?? plain.updatedAt ?? null,
  };
}

function toFavoritesDTO(list) {
  return (list || []).map(toFavoriteDTO);
}

module.exports = {
  AddFavoriteDTO,
  DeleteFavoriteParamsDTO,
  toFavoriteDTO,
  toFavoritesDTO,
};
