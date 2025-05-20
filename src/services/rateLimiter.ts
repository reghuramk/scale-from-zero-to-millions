import Redis from 'ioredis';
import { Request, Response, NextFunction } from 'express';

const redis = new Redis(); // Defaults to localhost:6379

interface RateLimitOptions {
  windowInSeconds: number;
  maxRequests: number;
}

export const rateLimiter = (keyPrefix: string, options: RateLimitOptions) => {
  const { windowInSeconds, maxRequests } = options;

  return async (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip;
    const key = `${keyPrefix}:${ip}`;

    const current = await redis.incr(key);

    if (current === 1) {
      await redis.expire(key, windowInSeconds);
    }

    if (current > maxRequests) {
      return res.status(429).json({ error: 'Too Many Requests. Try again later.' });
    }

    next();
  };
};
