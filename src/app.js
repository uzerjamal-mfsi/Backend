import express from 'express';
import logger from './middleware/logger.js';
import config from './config/config.js';
import connectDB from './config/mongoose.js';
import { authRouter } from './routes/auth-routes.js';
import { handleError } from './middleware/error-handler.js';
import { dashboardRouter } from './routes/dashboard-routes.js';
import loadExercisesIntoDatabase from '../scripts/bootstrap-exercises.js';
import cors from 'cors';
import { workoutRouter } from './routes/workout-routes.js';

const app = express();
connectDB().then(async () => {
  await loadExercisesIntoDatabase();
});

app.use(express.json());
app.use(logger);
app.use(cors());

app.use('/auth', authRouter);
app.use('/dashboard', dashboardRouter);
app.use('/workouts', workoutRouter);

app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use(handleError);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

export default app;
