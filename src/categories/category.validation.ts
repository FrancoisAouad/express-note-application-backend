import { Joi } from 'express-validation';

export const categorySchema = Joi.object({
  categoryName: Joi.string().required(),
});
