const express = require('express');
require('dotenv').config();

const applySecurity = require('./security'); // κάνει trust proxy + CORS
const authRoutes = require('./routes/authRoutes');
const favoritesRoutes = require('./routes/favoritesRoutes');

const app = express();

// Ρυθμίσεις ασφάλειας (trust proxy, CORS)
applySecurity(app);

// Body parser
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoritesRoutes);

// Swagger /api-docs
require('./swagger')(app);

// Health check
app.get('/health', (req, res) => res.send('Backend is running!'));

// Start server (Render χρειάζεται host 0.0.0.0)
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
