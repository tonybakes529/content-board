import { Router, Request, Response } from 'express';
import sqlite3 from 'sqlite3';

export function createBoardsRouter(db: sqlite3.Database) {
  const router = Router();

  // GET all boards
  router.get('/', (req: Request, res: Response) => {
    db.all('SELECT * FROM boards ORDER BY created_at DESC', (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    });
  });

  // POST create board
  router.post('/', (req: Request, res: Response) => {
    const { name } = req.body;

    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'Name is required' });
    }

    db.run(
      'INSERT INTO boards (name) VALUES (?)',
      [name],
      function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        db.get(
          'SELECT * FROM boards WHERE id = ?',
          [this.lastID],
          (err, row) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }
            res.status(201).json(row);
          }
        );
      }
    );
  });

  // PATCH update board
  router.patch('/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'Name is required' });
    }

    db.run(
      'UPDATE boards SET name = ? WHERE id = ?',
      [name, id],
      function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        db.get('SELECT * FROM boards WHERE id = ?', [id], (err, row) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.json(row);
        });
      }
    );
  });

  // DELETE board
  router.delete('/:id', (req: Request, res: Response) => {
    const { id } = req.params;

    db.run('DELETE FROM boards WHERE id = ?', [id], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ success: true });
    });
  });

  return router;
}
