/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { Schema, model, Document } from 'mongoose';

/**
 * Represents a user document in the database.
 * @interface UserDocument
 */
export interface UserDocument extends Document {
  /**
   * The user's full name.
   * @type {string}
   * @required
   * @example John Doe
   */
  name: string;

  /**
   * The user's email address.
   * @type {string}
   * @required
   * @lowercase
   * @unique
   * @example john@example.com
   */
  email: string;

  /**
   * The user's password (hashed and salted for security).
   * @type {string}
   * @required
   * @example P@ssw0rd
   * @private
   */
  password: string;

  /**
   * The timestamp when the user account was created.
   * @type {Date}
   * @default Date.now()
   */
  createdAt?: Date;

  /**
   * The email verification token used during registration.
   * @type {string}
   * @example e52a4f3b0d6e4
   */
  emailToken?: string;

  /**
   * Indicates if the user's email address is verified.
   * @type {boolean}
   * @default false
   */
  isVerified?: boolean;

  /**
   * Indicates if the user is an administrator.
   * @type {boolean}
   * @default false
   */
  isAdmin?: boolean;
}

/**
 * The User Mongoose Schema.
 * @class UserSchema
 */
export const UserSchema = new Schema<UserDocument>({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
    maxlength: 255,
    match: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  emailToken: {
    type: String,
    index: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

/* Indexes */
UserSchema.index({ email: -1 });
UserSchema.index({ emailToken: -1 });

/**
 * The User Mongoose Model.
 * @class UserModel
 * @type {import('mongoose').Model<UserDocument>}
 */
export const UserModel = model<UserDocument>('user', UserSchema);
