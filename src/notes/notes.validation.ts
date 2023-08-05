import { Joi } from 'express-validation';

export const noteSchema = Joi.object({
  title: Joi.string().required().min(1).max(16),
  content: Joi.required(),
  tags: Joi.any(),
  category: Joi.string(),
});
