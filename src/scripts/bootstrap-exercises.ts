import path from 'path';
import fs from 'fs/promises';
import Exercise from '../models/exercise';

export default async function loadExercisesIntoDatabase() {
  try {
    const dataPath = path.join(__dirname, '../../assets/exercises.json');
    const fileContent = await fs.readFile(dataPath, 'utf-8');
    const exercises = JSON.parse(fileContent);

    const count = await Exercise.countDocuments();
    console.log(`Current exercise count: ${count}`);
    if (!count) {
      await Exercise.insertMany(exercises);
      console.log(`Inserted ${exercises.length} exercises into the database.`);
    }
    return;
  } catch (err) {
    console.error('Error bootstrapping exercises:', err);
  }
}
