const sequelize = require('./db');
const User = require('./models/User'); 
const Favorite = require('./models/Favorites'); 

(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connection ok');
    await sequelize.sync({ alter: true }); // ή { force: true } αν θέλω να σβήσει και να ξαναφτιάξει
    console.log('Models synced (tables created/updated)');
    process.exit(0);
  } catch (err) {
    console.error('Sync error:', err);
    process.exit(1);
  }
})();
