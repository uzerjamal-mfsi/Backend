import express from 'express';
import logger from './middleware/logger';
import config from './config/config';
import connectDB from './config/mongoose';
import { authRouter } from './routes/auth-routes';
import { handleError } from './middleware/error-handler';
import loadExercisesIntoDatabase from './scripts/bootstrap-exercises';
import cors from 'cors';
import { workoutRouter } from './routes/workout-routes';
import { analyticsRouter } from './routes/analytics-routes';
import { goalRouter } from './routes/goal-routes';

const app = express();
connectDB().then(async () => {
  await loadExercisesIntoDatabase();
});

app.use(express.json());
app.use(logger);
app.use(cors());

app.use('/auth', authRouter);
app.use('/workouts', workoutRouter);
app.use('/goals', goalRouter);
app.use('/analytics', analyticsRouter);

app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use(handleError);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

export default app;
