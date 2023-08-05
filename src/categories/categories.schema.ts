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
  name: string;

  /**
   * The description of the category.
   * @type {string}
   * @required
   * @example "Electronics"
   */
  description?: {
    en: string;
    ar: string;
    fr: string;
  };

  /**
   * The status of the category.
   * @type {boolean}
   * @required
   * @example Published
   */
  status: boolean;

  /**
   * The timestamp when the category was created.
   * @type {Date}
   * @default Date.now()
   */
  createdAt?: Date;

  /**
   * The timestamp when the category was last updated.
   * @type {Date}
   * @default Date.now()
   */
  updatedAt?: Date;

  /**
   * The ID of the user who created the category.
   * @type {Schema.Types.ObjectId}
   * @reference 'user'
   * @example ObjectId("617f2e42b55b7708ff48f4a6")
   */
  createdBy: Schema.Types.ObjectId;

  /**
   * The ID of the user who updated the category.
   * @type {Schema.Types.ObjectId}
   * @reference 'user'
   * @example ObjectId("617f2e42b55b7708ff48f4a6")
   */
  updatedBy?: Schema.Types.ObjectId;
}

/**
 * The Category Mongoose Schema.
 * @class CategorySchema
 */
export const CategorySchema = new Schema<CategoryDocument>({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 255,
  },
  description: {
    type: Object,
  },
  status: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
});

/* Indexes */
CategorySchema.index({ createdBy: -1 });
CategorySchema.index({ name: -1 });
CategorySchema.index({ updatedAt: -1 });

/**
 * The Category Mongoose Model.
 * @class CategoryModel
 * @type {import('mongoose').Model<CategoryDocument>}
 */
export const CategoryModel = mongoose.model<CategoryDocument>('category', CategorySchema);
