import { Schema } from 'mongoose'
import { v5 as uuidv5 } from 'uuid'

export const QuizSchema = new Schema({
  name: { type: String, required: true },
  questions: [
    {
      id: { type: String, required: true, default: uuidv5 },
      title: { type: String, required: true },
      img: { type: String, required: false },
      questionType: { type: String, required: true },
      description: { type: String, required: false },
      answers: [{ type: String, required: false }],
    },
  ],
  rightQuestions: [{ type: String, required: true }],
  takers: [
    {
      name: { type: String, required: true },
      surename: { type: String, required: true },
      answers: [{ type: String, required: true }],
      score: { type: [Number, undefined] },
    },
  ],
  quizKey: { type: String, required: true,  default: () => generateKey() },
})
