import { Router, Request, Response } from 'express';
import sqlite3 from 'sqlite3';

export function createCardsRouter(db: sqlite3.Database) {
  const router = Router();

  // GET all cards or cards by board
  router.get('/', (req: Request, res: Response) => {
    const { board_id } = req.query;

    let query = 'SELECT * FROM cards ORDER BY position_index ASC, created_at DESC';
    let params: any[] = [];

    if (board_id) {
      query = 'SELECT * FROM cards WHERE board_id = ? ORDER BY position_index ASC, created_at DESC';
      params = [board_id];
    }

    db.all(query, params, (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    });
  });

  // POST create card
  router.post('/', (req: Request, res: Response) => {
    const {
      board_id,
      type,
      title,
      content,
      youtube_url,
      youtube_video_id,
      transcript,
      thumbnail_url,
      position_index,
    } = req.body;

    if (!board_id || !type || !title) {
      return res.status(400).json({ error: 'board_id, type, and title are required' });
    }

    db.run(
      `INSERT INTO cards (board_id, type, title, content, youtube_url, youtube_video_id, transcript, thumbnail_url, position_index)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        board_id,
        type,
        title,
        content || null,
        youtube_url || null,
        youtube_video_id || null,
        transcript || null,
        thumbnail_url || null,
        position_index || 0,
      ],
      function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        db.get('SELECT * FROM cards WHERE id = ?', [this.lastID], (err, row) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.status(201).json(row);
        });
      }
    );
  });

  // PATCH update card
  router.patch('/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title && !content) {
      return res.status(400).json({ error: 'At least one field is required' });
    }

    const updates: string[] = [];
    const values: any[] = [];

    if (title) {
      updates.push('title = ?');
      values.push(title);
    }
    if (content) {
      updates.push('content = ?');
      values.push(content);
    }

    values.push(id);

    db.run(
      `UPDATE cards SET ${updates.join(', ')} WHERE id = ?`,
      values,
      function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        db.get('SELECT * FROM cards WHERE id = ?', [id], (err, row) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.json(row);
        });
      }
    );
  });

  // POST duplicate card
  router.post('/:id/duplicate', (req: Request, res: Response) => {
    const { id } = req.params;

    db.get('SELECT * FROM cards WHERE id = ?', [id], (err, card: any) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!card) {
        return res.status(404).json({ error: 'Card not found' });
      }

      db.run(
        `INSERT INTO cards (board_id, type, title, content, youtube_url, youtube_video_id, transcript, thumbnail_url, position_index)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          card.board_id,
          card.type,
          `${card.title} (Copy)`,
          card.content,
          card.youtube_url,
          card.youtube_video_id,
          card.transcript,
          card.thumbnail_url,
          card.position_index + 1,
        ],
        function (err) {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          db.get('SELECT * FROM cards WHERE id = ?', [this.lastID], (err, row) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }
            res.status(201).json(row);
          });
        }
      );
    });
  });

  // DELETE card
  router.delete('/:id', (req: Request, res: Response) => {
    const { id } = req.params;

    db.run('DELETE FROM cards WHERE id = ?', [id], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ success: true });
    });
  });

  return router;
}
