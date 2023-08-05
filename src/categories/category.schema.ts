import mongoose, { Schema, Document } from 'mongoose';

export interface CategoryDocument extends Document {
  categoryName: string;
  createdDate?: Date;
  updatedDate?: Date;
  creatorID?: Schema.Types.ObjectId;
  creatorName?: string;
  creatorEmail?: string;
}

export const CategorySchema = new Schema<CategoryDocument>({
  categoryName: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
  updatedDate: {
    type: Date,
    default: Date.now(),
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
});

CategorySchema.index({
  creatorID: -1,
  creatorName: -1,
});
CategorySchema.index({ creatorID: -1 });
CategorySchema.index({ categoryName: -1 });
CategorySchema.index({ updatedDate: -1 });

export const CategoryModel = mongoose.model<CategoryDocument>('category', CategorySchema);
