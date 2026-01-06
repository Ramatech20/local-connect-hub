import express from 'express';
import { supabase } from '../lib/supabaseClient.js';
import requireAuth from '../middleware/auth.js';
const router = express.Router();

// Create a booking (simple availability check placeholder)
router.post('/', requireAuth, async (req, res) => {
  const { service_id, provider_id, start_time, end_time, customer_id } = req.body;
  if (!service_id || !provider_id || !start_time || !end_time || !customer_id) {
    return res.status(400).json({ error: 'missing required fields' });
  }

  // Basic availability check: ensure no overlapping bookings for the provider
  const { data: overlapping, error: overlapErr } = await supabase
    .from('bookings')
    .select('*')
    .eq('provider_id', provider_id)
    .or(`and(start_time.gte.${start_time},start_time.lt.${end_time}),and(end_time.gt.${start_time},end_time.lte.${end_time})`)
    .limit(1);

  if (overlapErr) return res.status(500).json({ error: overlapErr });
  if (overlapping && overlapping.length) {
    return res.status(409).json({ error: 'provider not available for requested time' });
  }

  const booking = {
    service_id,
    provider_id,
    start_time,
    end_time,
    customer_id,
    status: 'pending',
    created_at: new Date().toISOString(),
  };

  const { data, error } = await supabase.from('bookings').insert(booking).select().single();
  if (error) return res.status(500).json({ error });
  res.status(201).json(data);
});

export default router;
