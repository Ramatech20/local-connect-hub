import express from 'express';
import crypto from 'crypto';
import https from 'https';
import { supabase } from '../lib/supabaseClient.js';
const router = express.Router();

// Helper: verify transaction with Flutterwave
async function verifyWithFlutterwave(txId, txRef) {
  const secret = process.env.FLUTTERWAVE_SECRET_KEY || process.env.FLW_SECRET || '';
  const base = process.env.FLUTTERWAVE_API_URL || 'https://api.flutterwave.com';

  // Prefer global fetch when available (Node 18+). Fallback to https.request.
  if (typeof fetch === 'function') {
    try {
      if (txId) {
        const resp = await fetch(`${base}/v3/transactions/${txId}/verify`, {
          headers: { Authorization: `Bearer ${secret}` },
        });
        return await resp.json();
      }
      if (txRef) {
        const resp = await fetch(`${base}/v3/transactions/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${secret}` },
          body: JSON.stringify({ tx_ref: txRef }),
        });
        return await resp.json();
      }
    } catch (err) {
      return { error: String(err) };
    }
  }

  // Fallback: simple https request
  return new Promise((resolve) => {
    try {
      if (txId) {
        const url = `${base}/v3/transactions/${txId}/verify`;
        https.get(url, { headers: { Authorization: `Bearer ${secret}` } }, (res) => {
          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => {
            try {
              resolve(JSON.parse(data));
            } catch (e) {
              resolve({ error: 'invalid-json' });
            }
          });
        }).on('error', (e) => resolve({ error: String(e) }));
        return;
      }

      if (txRef) {
        const body = JSON.stringify({ tx_ref: txRef });
        const u = new URL(`${base}/v3/transactions/verify`);
        const opts = {
          method: 'POST',
          hostname: u.hostname,
          path: u.pathname,
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(body),
            Authorization: `Bearer ${secret}`,
          },
        };
        const req = https.request(opts, (res) => {
          let data = '';
          res.on('data', (c) => (data += c));
          res.on('end', () => {
            try {
              resolve(JSON.parse(data));
            } catch (e) {
              resolve({ error: 'invalid-json' });
            }
          });
        });
        req.on('error', (e) => resolve({ error: String(e) }));
        req.write(body);
        req.end();
        return;
      }

      resolve({ error: 'no-tx-id-or-ref' });
    } catch (err) {
      resolve({ error: String(err) });
    }
  });
}

// Flutterwave webhook endpoint — verifies signature and processes event.
router.post('/webhook', async (req, res) => {
  const secret = process.env.FLUTTERWAVE_SECRET_KEY || process.env.FLW_SECRET || '';
  const signatureHeader = req.headers['verif-hash'] || req.headers['flutterwave-signature'] || req.headers['x-flw-signature'];

  // req.body is a Buffer because we used raw body parser for this route
  const raw = req.body;
  const computed = crypto.createHmac('sha512', secret).update(raw).digest('hex');

  if (!signatureHeader || signatureHeader !== computed) {
    return res.status(400).send('invalid signature');
  }

  let payload;
  try {
    payload = JSON.parse(raw.toString());
  } catch (e) {
    return res.status(400).send('invalid json');
  }

  // Example: payload.data.tx_ref, payload.event, payload.data.status, payload.data.id
  const tx = payload.data || {};
  const txRef = tx.tx_ref || tx.flw_ref || null;
  const txId = tx.id || null;

  // Perform server-side verification with Flutterwave to ensure transaction finality
  let verification = { skipped: true };
  try {
    verification = await verifyWithFlutterwave(txId, txRef);
  } catch (err) {
    verification = { error: String(err) };
  }

  // Store transaction record (best-effort; adjust columns to match schema)
  try {
    await supabase.from('payments').insert({
      tx_ref: txRef,
      tx_id: txId,
      status: tx.status || payload.event || 'unknown',
      verification: verification,
      raw: payload,
      received_at: new Date().toISOString(),
    });
  } catch (err) {
    console.warn('failed to store payment record', err);
  }

  // respond quickly to webhook
  res.json({ received: true });
});

export default router;
