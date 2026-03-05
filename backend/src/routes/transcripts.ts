import { Router, Request, Response } from 'express';
import { fetchYoutubeTranscript } from '../services/youtubeService';

export function createTranscriptsRouter() {
  const router = Router();

  // POST fetch YouTube transcript
  router.post('/fetch', async (req: Request, res: Response) => {
    const { url } = req.body;

    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'URL is required' });
    }

    try {
      const transcript = await fetchYoutubeTranscript(url);
      res.json(transcript);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  return router;
}
