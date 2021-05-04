import { Document } from 'mongoose'
import { question } from './question.interface'

export interface quizDoc extends Document {
  name: string
  questions: question[]
  rightAnswers: number[]
}
