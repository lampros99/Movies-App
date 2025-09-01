const sequelize = require('./db');
const Favorite = require('./models/Favorites');
const User = require('./models/User');

(async () => {
  try {
    await sequelize.authenticate();

    // Φέρε όλα τα favorites με το user τους
    const favs = await Favorite.findAll({
      include: [{ model: User, attributes: ['id', 'email'] }],
      order: [['userId', 'ASC'], ['id', 'ASC']]
    });

    console.log(JSON.stringify(favs, null, 2));
    process.exit(0);
  } catch (err) {
    console.error('Error fetching favorites:', err);
    process.exit(1);
  }
})();
