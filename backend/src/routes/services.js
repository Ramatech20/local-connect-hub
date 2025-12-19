import express from 'express';
import { supabase } from '../lib/supabaseClient.js';
const router = express.Router();

router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('services').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
});

router.post('/', async (req, res) => {
  const service = req.body;
  const { data, error } = await supabase.from('services').insert(service).select().single();
  if (error) return res.status(500).json({ error });
  res.status(201).json(data);
});

export default router;
