import express from 'express';
import { query } from '../services/db';
import { encodeBase62 } from '../services/shortener';

const router = express.Router();

router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;
  const insertRes = await query(
    'INSERT INTO urls (long_url, short_code) VALUES ($1, $2) RETURNING *',
    [longUrl, 'temp']
  );

  const row = insertRes.rows[0];
  const shortCode = encodeBase62(row.id);

  // Update with real shortCode
  await query('UPDATE urls SET short_code = $1 WHERE id = $2', [shortCode, row.id]);

  res.json({ shortUrl: `http://localhost:3000/${shortCode}` });
});

router.get('/:code', async (req: any, res: any) => {
  const code = req.params.code;
  const result = await query('SELECT long_url FROM urls WHERE short_code = $1', [code]);

  if (result.rows.length === 0) {
    return res.status(404).send('URL not found');
  }

  res.redirect(result.rows[0].long_url);
});

export default router;
