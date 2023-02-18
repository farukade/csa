import { Schema, model, connect } from 'mongoose';
import { IUser } from '../types/user.interface';

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: String
});

export const User = model<IUser>('User', userSchema);