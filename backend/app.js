const express = require('express');
require('dotenv').config();

const applySecurity = require('./security');
const authRoutes = require('./routes/authRoutes');
const favoritesRoutes = require('./routes/favoritesRoutes');
const sequelize = require('./db'); 
const createDefaultUser = require('./config/createDefaultUser'); 

const app = express();

// Ρυθμίσεις ασφάλειας (trust proxy, CORS)
applySecurity(app);

// Body parser
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoritesRoutes);

// Swagger /api-docs
if (process.env.NODE_ENV !== 'production') {
  require('./swagger')(app);
}

// Health check
app.get('/health', (req, res) => res.send('Backend is running!'));

// Start server αφού είναι έτοιμη η βάση.
(async () => {
  try {
    await sequelize.authenticate(); 
    await sequelize.sync();         
    await createDefaultUser();  // Δημιουργία προεπιλεγμένου χρήστη αν δεν υπάρχει

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, '0.0.0.0', () =>
      console.log(`Server running on port ${PORT}`)
    );
  } catch (err) {
    console.error('❌ Σφάλμα εκκίνησης:', err);
  }
})();
