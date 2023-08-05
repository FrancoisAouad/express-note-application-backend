/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const tagSchema = new Schema({
  tagName: {
    type: String,
    required: true,
  },
  creatorsID: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'user',
    },
  ],
});

tagSchema.index({ tagSchema: -1 });
tagSchema.index({ creatorsID: -1 });
export default mongoose.model('tags', tagSchema);
