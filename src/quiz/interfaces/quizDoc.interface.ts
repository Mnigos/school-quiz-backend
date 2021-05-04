import { Document } from 'mongoose'
import { Question } from './question.interface'

export interface QuizDoc extends Document {
  name: string
  questions: Question[]
  rightAnswers: number[]
}
