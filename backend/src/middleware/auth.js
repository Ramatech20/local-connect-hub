import { supabase } from '../lib/supabaseClient.js';

// Server-side auth middleware for Express
// Expects header: `Authorization: Bearer <access_token>`
export default async function requireAuth(req, res, next) {
  try {
    const auth = req.headers.authorization || '';
    if (!auth.startsWith('Bearer ')) return res.status(401).send('Unauthorized');

    const token = auth.split(' ')[1];
    if (!token) return res.status(401).send('Unauthorized');

    // Try to get the user from Supabase using the provided access token
    // supabase.auth.getUser(token) returns { data, error } in @supabase/supabase-js v2
    let user = null;
    try {
      if (supabase && typeof supabase.auth?.getUser === 'function') {
        const result = await supabase.auth.getUser(token);
        // result.data.user OR result.data
        user = (result && result.data && (result.data.user || result.data)) || null;
      }
    } catch (e) {
      // fallthrough — verification may not be supported in older SDKs
      console.warn('supabase.auth.getUser error', e && e.message ? e.message : e);
    }

    if (!user) {
      // last-resort: reject — we require a valid supabase session token for API access
      return res.status(401).send('Unauthorized');
    }

    // attach user to request for handlers
    req.user = user;
    next();
  } catch (err) {
    console.error('auth middleware error', err);
    res.status(500).send('Internal Server Error');
  }
}
