import { Request, Response, NextFunction } from "express";
import { prisma } from "../db/prisma";
import { redis } from "../db/redis";

export async function idempotency(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const key = req.header("Idempotency-Key");
  if (!key) return next();

  const redisKey = `idem-lock:${key}`;

  // FIXED modern Redis set syntax
  // Try to acquire the lock (NX only)
const acquired = await redis.setnx(redisKey, "1");

if (!acquired) {
  return res.status(409).json({
    success: false,
    message: "Duplicate request detected"
  });
}

// Set expiration separately (EX)
await redis.expire(redisKey, 10);

  // Check DB cache
  const cached = await prisma.idempotencyKey.findUnique({
    where: { key }
  });

  if (cached?.response) {
    return res.json(cached.response);
  }

  // Intercept JSON output to store response
  const originalJson = res.json.bind(res);
  res.json = (body: any) => {
    prisma.idempotencyKey.upsert({
      where: { key },
      update: { response: body },
      create: { key, response: body }
    }).catch(console.error);

    return originalJson(body);
  };

  next();
}
