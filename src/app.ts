import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import leaderboardRouter  from './routes/LeaderBoard.routes';

dotenv.config();

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/leaderboard', leaderboardRouter);

export default app;
