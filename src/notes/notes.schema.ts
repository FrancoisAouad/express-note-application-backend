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

export interface NoteDocument extends Document {
  title: string;
  content?: string;
  tags?: Schema.Types.ObjectId[];
  imageLocation?: string[];
  attachmentLocation?: string[];
  categoryID?: Schema.Types.ObjectId;
  creatorID?: Schema.Types.ObjectId;
  creatorName?: string;
  creatorEmail?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const NoteSchema = new Schema<NoteDocument>({
  title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
  },

  tags: [{ type: Schema.Types.ObjectId, ref: 'tags' }],

  imageLocation: [
    {
      type: String,
      default: null,
    },
  ],

  attachmentLocation: [
    {
      type: String,
      default: null,
    },
  ],

  categoryID: {
    type: Schema.Types.ObjectId,
    ref: 'category',
  },

  creatorID: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },

  creatorName: {
    type: String,
  },

  creatorEmail: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

// Indexes for getNotes
NoteSchema.index({ category: -1, creatorID: -1, tags: -1 });
NoteSchema.index({ creatorID: -1, tags: -1 });
NoteSchema.index({ category: -1, creatorID: -1 });

// Compound schema index for aggregation
NoteSchema.index({
  creatorID: -1,
  creatorName: -1,
});

export const NoteModel = model<NoteDocument>('notes', NoteSchema);
