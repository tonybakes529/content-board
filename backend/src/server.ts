import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sqlite3 from 'sqlite3';
import path from 'path';
import { initializeDatabase, getDatabase } from './db/init';
import { createBoardsRouter } from './routes/boards';
import { createCardsRouter } from './routes/cards';
import { createTranscriptsRouter } from './routes/transcripts';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database and start server
async function startServer() {
  try {
    // Initialize database
    const db = await initializeDatabase() as sqlite3.Database;
    console.log('Database initialized');

    // Get database instance
    const dbInstance = await getDatabase();

    // Routes
    app.use('/api/boards', createBoardsRouter(dbInstance));
    app.use('/api/cards', createCardsRouter(dbInstance));
    app.use('/api/transcripts', createTranscriptsRouter());

    // Health check
    app.get('/health', (req, res) => {
      res.json({ status: 'ok' });
    });

    // Error handling middleware
    app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
