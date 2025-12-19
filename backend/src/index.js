import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import providersRouter from './routes/providers.js';
import servicesRouter from './routes/services.js';
import bookingsRouter from './routes/bookings.js';
import paymentsRouter from './routes/payments.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Use raw body for payment webhook route; JSON for everything else
app.use((req, res, next) => {
  if (req.originalUrl && req.originalUrl.startsWith('/payments/webhook')) {
    bodyParser.raw({ type: '*/*' })(req, res, next);
  } else {
    bodyParser.json()(req, res, next);
  }
});

app.get('/health', (req, res) => res.json({ ok: true }));

app.use('/providers', providersRouter);
app.use('/services', servicesRouter);
app.use('/bookings', bookingsRouter);
app.use('/payments', paymentsRouter);

app.listen(PORT, () => console.log(`Backend listening on http://localhost:${PORT}`));
