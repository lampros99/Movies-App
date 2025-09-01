const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Favorite = sequelize.define('Favorite', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  movieId: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'movie_id', 
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  posterPath: {
    type: DataTypes.STRING,
    field: 'poster_path', 
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'userId',
    references: {
      model: 'users', 
      key: 'id',
    },
    onDelete: 'CASCADE', // αν διαγραφεί ο χρήστης, διαγράφονται και τα favorites
  },
}, {
  tableName: 'Favorites', 
  timestamps: true,       // Sequelize => createdAt, updatedAt
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      unique: true,
      fields: ['userId', 'movie_id'], 
    },
  ],
});

// Συσχέτιση Favorite σε User
User.hasMany(Favorite, { foreignKey: 'userId', onDelete: 'CASCADE' });
Favorite.belongsTo(User, { foreignKey: 'userId' });

module.exports = Favorite;
