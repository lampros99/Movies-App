const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js'); // Sequelize model
const { toUserDTO } = require('../dtos/auth.dto.js');

function signToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

async function register(req, res) {
  // Παίρνουμε τα validated δεδομένα (fallback στο body αν δεν υπάρχουν)
  const { name, email, password } = req.validated?.body ?? req.body;

  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    const token = signToken(newUser.id);

    return res.status(201).json({
      message: 'User registered successfully',
      token,
      user: toUserDTO(newUser),
    });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
}

async function login(req, res) {
  const { email, password } = req.validated?.body ?? req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = signToken(user.id);

    return res.json({
      message: 'Login successful',
      token,
      user: toUserDTO(user),
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
}

module.exports = { register, login};
