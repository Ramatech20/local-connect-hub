import express from 'express';
import request from 'supertest';
import { describe, it, expect } from 'vitest';
import requireAuth from '../src/middleware/auth.js';

describe('auth middleware', () => {
  it('returns 401 when authorization header missing', async () => {
    const app = express();
    app.get('/p', requireAuth, (req, res) => res.json({ ok: true }));

    const res = await request(app).get('/p');
    expect(res.status).toBe(401);
  });
});
