const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      protocol: 'postgres',
      logging: false,
    })
  : new Sequelize(
      process.env.DB_NAME || 'movies_db',
      process.env.DB_USER || 'postgres',
      process.env.DB_PASSWORD || '123456',
      {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
        logging: false,
      }
    );

module.exports = sequelize;
