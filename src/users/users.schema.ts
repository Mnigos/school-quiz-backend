import { Schema } from 'mongoose'

export const UserSchema = new Schema({
  name: { type: String, required: true },
  pass: { type: String, required: true },
})
