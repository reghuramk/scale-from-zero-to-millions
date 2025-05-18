import express from 'express';
import { query } from '../services/db';
import { getCache, setCache } from '../services/cache';

const router = express.Router();

router.get('/:id', async (req:any, res:any) => {
  const id = req.params.id;
  const cacheKey = `user:${id}`;

  const cached = await getCache(cacheKey);
  if (cached) {
    return res.json({ source: 'cache', data: JSON.parse(cached) });
  }

  const result = await query('SELECT * FROM users WHERE id = $1', [id]);
  const user = result.rows[0];

  if (!user) return res.status(404).json({ error: 'User not found' });

  await setCache(cacheKey, JSON.stringify(user), 30);
  res.json({ source: 'db', data: user });
});

export default router;
