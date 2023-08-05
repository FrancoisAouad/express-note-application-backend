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

/**
 * Represents a category document in the database.
 * @interface CategoryDocument
 */
export interface CategoryDocument extends Document {
  /**
   * The name of the category.
   * @type {string}
   * @required
   * @example "Electronics"
   */
  categoryName: string;

  /**
   * The timestamp when the category was created.
   * @type {Date}
   * @default Date.now()
   */
  createdDate?: Date;

  /**
   * The timestamp when the category was last updated.
   * @type {Date}
   * @default Date.now()
   */
  updatedDate?: Date;

  /**
   * The ID of the user who created the category.
   * @type {Schema.Types.ObjectId}
   * @reference 'user'
   * @example ObjectId("617f2e42b55b7708ff48f4a6")
   */
  creatorID?: Schema.Types.ObjectId;

  /**
   * The name of the user who created the category.
   * @type {string}
   * @example "John Doe"
   */
  creatorName?: string;

  /**
   * The email of the user who created the category.
   * @type {string}
   * @example "john@example.com"
   */
  creatorEmail?: string;
}

/**
 * The Category Mongoose Schema.
 * @class CategorySchema
 */
export const CategorySchema = new Schema<CategoryDocument>({
  categoryName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 255,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
  creatorID: {
    type: Schema.Types.ObjectId,
    ref: 'user', // Assuming there is a 'user' collection for user details
  },
  creatorName: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  creatorEmail: {
    type: String,
    trim: true,
    lowercase: true,
    maxlength: 255,
  },
});

/* Indexes */
CategorySchema.index({ creatorID: -1, creatorName: -1 });
CategorySchema.index({ creatorID: -1 });
CategorySchema.index({ categoryName: -1 });
CategorySchema.index({ updatedDate: -1 });

/**
 * The Category Mongoose Model.
 * @class CategoryModel
 * @type {import('mongoose').Model<CategoryDocument>}
 */
export const CategoryModel = mongoose.model<CategoryDocument>('category', CategorySchema);
