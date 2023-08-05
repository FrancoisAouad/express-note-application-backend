/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import mongoose, { Schema, Document } from 'mongoose';

export interface TagDocument extends Document {
  tagName: string;
  creatorsID: mongoose.Types.ObjectId[];
}

const tagSchema = new Schema<TagDocument>({
  tagName: {
    type: String,
    required: true,
  },
  creatorsID: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
});

tagSchema.index({ tagName: -1 });
tagSchema.index({ creatorsID: -1 });

export default mongoose.model<TagDocument>('tags', tagSchema);
