const User = require('../models/User');

async function findUserByEmail(email) {
  // Sequelize
  return await User.findOne({ where: { email } });
}

async function createUser(name, email, hashedPassword) {
  const newUser = await User.create({ name, email, password: hashedPassword });
  console.log('Sequelize: User created with ID:', newUser.id);
  return newUser;
} 

module.exports = { findUserByEmail, createUser };
