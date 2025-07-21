import Joi from 'joi';

export const goalSchema = Joi.object({
  type: Joi.string().valid('workout_per_week', 'weight_target').required(),
  target: Joi.number().required(),
  endDate: Joi.date().optional(),
  note: Joi.string().trim().optional(),
});

export const weightEntrySchema = Joi.object({
  weight: Joi.number().min(0).required(),
  date: Joi.date().optional(),
});
