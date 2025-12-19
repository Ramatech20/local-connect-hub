import express from 'express';
import crypto from 'crypto';
import { supabase } from '../lib/supabaseClient.js';
const router = express.Router();

// Flutterwave webhook endpoint — verifies signature and processes event.
router.post('/webhook', async (req, res) => {
  const secret = process.env.FLW_SECRET || '';
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

  // Example: payload.data.tx_ref, payload.event, payload.data.status
  // TODO: implement payment verification with Flutterwave verify endpoint if needed

  // Store transaction record (best-effort; adjust columns to match schema)
  try {
    const tx = payload.data || {};
    await supabase.from('payments').insert({
      tx_ref: tx.tx_ref || null,
      status: tx.status || payload.event || 'unknown',
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
