import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';

const app = express();

const allowedOrigins = (process.env.CLIENT_URLS || process.env.CLIENT_URL || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const defaultDevOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
];

app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser clients (curl/postman) and configured frontend dev origins.
      if (!origin) return callback(null, true);
      const originAllowed = [...allowedOrigins, ...defaultDevOrigins].includes(origin);
      return callback(originAllowed ? null : new Error(`CORS blocked origin: ${origin}`), originAllowed);
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));

app.use('/api', routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
