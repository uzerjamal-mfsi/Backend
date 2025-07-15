import Joi from 'joi';

export const workoutSchema = Joi.object({
  exercises: Joi.array()
    .items(
      Joi.object({
        exercise: Joi.string().hex().length(24).required(),
        sets: Joi.number().integer().min(1).optional(),
        reps: Joi.number().integer().min(1).optional(),
        weight: Joi.number().min(0).optional(),
        caloriesBurned: Joi.number().min(0).optional(),
      }),
    )
    .min(1)
    .required(),
  date: Joi.date().optional(),
  note: Joi.string().trim().optional(),
});
