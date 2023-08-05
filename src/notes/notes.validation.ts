/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { Joi } from 'express-validation';

export const noteSchema = Joi.object({
  title: Joi.string().required().min(1).max(16),
  content: Joi.required(),
  tags: Joi.any(),
  category: Joi.string(),
});
