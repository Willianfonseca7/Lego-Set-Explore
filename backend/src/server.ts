import express, { type Request, type Response } from 'express';
import cors from 'cors';
import { PORT } from './config/env.js';
import { logger } from './lib/logger.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
