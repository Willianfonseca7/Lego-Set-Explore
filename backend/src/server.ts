import express, { type Request, type Response } from 'express';
import cors from 'cors';
import { PORT } from './config/env.js';
import { logger } from './lib/logger.js';
import { authRouter } from './features/index.js';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use('/auth', authRouter);

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
