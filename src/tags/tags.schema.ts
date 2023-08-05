/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { Schema, Document, model, Types } from 'mongoose';

/**
 * Represents a tag document in the database.
 * @interface TagDocument
 */
export interface TagDocument extends Document {
  /**
   * The name of the tag.
   * @type {string}
   * @required
   * @example "Technology"
   */
  name: string;

  /**
   * An array of ObjectIds representing the users who created the tag.
   * @type {Types.ObjectId}
   * @reference 'user'
   * @example ObjectId("617f2e42b55b7708ff48f4a6")
   */
  createdBy: Types.ObjectId;
}

/**
 * The Tag Mongoose Schema.
 * @class TagSchema
 */
const TagSchema = new Schema<TagDocument>({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 255,
  },
  createdBy: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
});

/* Indexes */
TagSchema.index({ name: -1 });
TagSchema.index({ createdBy: -1 });

/**
 * The Tag Mongoose Model.
 * @class TagModel
 * @type {import('mongoose').Model<TagDocument>}
 */
export const TagModel = model<TagDocument>('tags', TagSchema);
