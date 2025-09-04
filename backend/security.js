const cors = require('cors');

function applySecurity(app) {
  app.set('trust proxy', 1);

  const PORT = process.env.PORT || 5000;

  // Origins από .env (π.χ. http://localhost:5173,https://lampros99.github.io,...)
  const ORIGINS = (process.env.FRONTEND_ORIGIN || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  // Επιτρέπω το ίδιο origin του backend για το Swagger.
  const SAME_ORIGINS = new Set([
    `http://localhost:${PORT}`,
    `http://127.0.0.1:${PORT}`,
  ]);

  app.use(cors({
    origin: (origin, cb) => {
      // Χωρίς origin Postman επιτρέπεται.
      if (!origin) return cb(null, true);

      // Ιδιο origin με τον backend Swagger επιτρέπεται.
      if (SAME_ORIGINS.has(origin)) return cb(null, true);

      // Οτι υπάρχει στο FRONTEND_ORIGIN whitelist επιτρέπεται.
      if (ORIGINS.includes(origin)) return cb(null, true);

      // Αλλιώς απαγορεύεται.
      return cb(new Error(`CORS blocked: ${origin}`));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
  }));
}

module.exports = applySecurity;
