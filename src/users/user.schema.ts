import { Schema, model, Document } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  emailToken?: string;
  isVerified?: boolean;
  isAdmin?: boolean;
}

export const UserSchema = new Schema<UserDocument>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  emailToken: {
    type: String,
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

UserSchema.index({ email: -1 });
UserSchema.index({ emailToken: -1 });

export const UserModel = model<UserDocument>('user', UserSchema);
