import { Schema } from 'mongoose'

export const QuizSchema = new Schema({
  name: { type: String, required: true },
  questions: [
    {
      title: { type: String, required: true },
      img: { type: String, required: false },
      questionType: { type: String, required: true },
      description: { type: String, required: false },
      answers: [{ type: String, required: false }],
    },
  ],
  rightQuestions: [{ type: Number, required: true }],
})
