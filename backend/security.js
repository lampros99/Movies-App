const cors = require('cors');

function applySecurity(app) {
  app.set('trust proxy', 1);

  // Π.χ. FRONTEND_ORIGIN="http://localhost:5173,https://cf7-final-project.onrender.com"
  const ORIGINS = (process.env.FRONTEND_ORIGIN || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  app.use(cors({
    origin: (origin, cb) => {
      // Επιτρέπει requests χωρίς Origin (π.χ. curl/Postman)
      if (!origin) return cb(null, true);
      if (ORIGINS.includes(origin)) return cb(null, true);
      return cb(new Error(`CORS blocked: ${origin}`));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false, // δεν χρησιμοποιείς cookies, οπότε off
  }));
}

module.exports = applySecurity;
